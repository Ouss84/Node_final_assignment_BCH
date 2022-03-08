"use strict";

const { CODES, TYPE, MESSAGES } = require("./statusCodes");

const sql = require("./sqlStatements.json");

const getAllSql = sql.getAll.join(" ");
const getSql = sql.get.join(" ");
const insertSql = sql.insert.join(" ");
const updateSql = sql.update.join(" ");
const removeSql = sql.remove.join(" ");
const PRIMARY_KEY = sql.primaryKey;

const { insertHelper, updateHelper } = require("./helpers");

const Database = require("./database");

const databasePrams = require("./databaseParams.json");

module.exports = class Datastorage {
  constructor() {
    this.db = new Database(databasePrams);
  }
  get CODES() {
    return CODES;
  }
  //
  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.db.doQuery(getAllSql);
        resolve(res.queryResult);
      } catch (error) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
  //
  get(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.db.doQuery(getSql, [key]);
        if (res.queryResult.length > 0) {
          resolve(res.queryResult[0]);
          //   console.log(res.queryResult)
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key));
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
  //
  remove(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.db.doQuery(removeSql, [key]);
        if (res.queryResult.rowsChanged === 1) {
          resolve(MESSAGES.DELETE_OK(PRIMARY_KEY, key));
        } else {
          resolve(MESSAGES.NOT_DELETED(PRIMARY_KEY, key));
        }
      } catch (error) {
        console.log(error); // debugging
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
  //
  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.doQuery(insertSql, insertHelper(data));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, data[PRIMARY_KEY]));
      } catch (error) {
        console.log(error);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(key, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (key && data) {
          if (data[PRIMARY_KEY] != key) {
            reject(MESSAGES.KEYS_DO_NOT_MATCH(data[PRIMARY_KEY], key));
          } else {
            const fecthData = await this.db.doQuery(getSql, [key]);
            // console.log(fecthData);
            if (fecthData.queryResult.length > 0) {
              const res = await this.db.doQuery(updateSql, updateHelper(data));
              if (res.queryResult.rowsChanged !== 0) {
                resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, data[PRIMARY_KEY]));
              } else {
                resolve(MESSAGES.NOT_UPDATED());
              }
            } else {
              this.insert(data)
                .then((status) => resolve(status))
                .catch((error) => reject(error));
            }
          }
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } catch (error) {
        console.log(error);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};

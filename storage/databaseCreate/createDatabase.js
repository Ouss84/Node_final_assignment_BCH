"use strict";

// calling the database creation class
const Database = require("../database");

// importing the statements
let createStatements = "./Bahri_Oussama_product_createStatements.json";
// fetching the statements file from the prompt
if (process.argv.length > 2) {
  createStatements = `./${process.argv[2]}`;
}

// helper functions to print result in the console
const printMessage = (message) => console.log(message);

const printStatement = (statement) => printMessage(`${statement};`);

const errMessage = (message) => printMessage(`#### ${message} ####`);

// function to create a database passing statements
const createDatabase = async (statementsCreation) => {
  const options = {
    host: statementsCreation.host,
    port: statementsCreation.port,
    user: statementsCreation.admin,
    password: statementsCreation.adminpassword,
  };
  const DEBUG = statementsCreation.debug;
  const db = new Database(options);
  const user = `'${statementsCreation.user}'@'${statementsCreation.host}'`;
  const DB = statementsCreation.database;
  const dropDatabaseSql = `drop database if exists ${statementsCreation.database}`;
  const createDatabaseSql = `create database ${statementsCreation.database}`;
  const dropUserSql = `drop user if exists ${user}`;
  const createUserSql =
    `create user if not exists ${user} ` +
    `identified by '${statementsCreation.userpassword}'`;
  const grantPrivilegesSql = `grant all privileges on ${DB}.* to ${user}`;
  try {
    await db.doQuery(dropDatabaseSql);
    if (DEBUG) printStatement(dropDatabaseSql);
    await db.doQuery(createDatabaseSql);
    if (DEBUG) printStatement(createDatabaseSql);
    if (statementsCreation.dropUser) {
      await db.doQuery(dropUserSql);
      if (DEBUG) printStatement(dropUserSql);
    }
    await db.doQuery(createUserSql);
    if (DEBUG) printStatement(createUserSql);
    await db.doQuery(grantPrivilegesSql);
    if (DEBUG) printStatement(grantPrivilegesSql);
    for (let table of statementsCreation.tables) {
      if (table.columns && table.columns.length > 0) {
        const createTableSql =
          `create table ${statementsCreation.database}.${table.tableName}(` +
          `\n\t${table.columns.join(",\n\t")}` +
          ")";
        await db.doQuery(createTableSql);
        if (DEBUG) printStatement(createTableSql);
      } else {
        if (DEBUG) printMessage("Table columns missing. Table was not created");
      }
      if (table.data && table.data.length > 0) {
        const rows = [];
        for (let data of table.data) {
          const insertSql = `insert into ${statementsCreation.database}.${
            table.tableName
          } values(${Array(data.length).fill("?").join(",")})`;
          rows.push(db.doQuery(insertSql, data));
        }
        await Promise.all(rows);
        if (DEBUG) printMessage("data added");
      } else {
        if (DEBUG) printMessage("data missing");
      }
    }
  } catch (error) {
    errMessage(error.message);
  }
};

// creating the database
try {
  createDatabase(require(createStatements));
} catch (error) {
  console.log(error.message);
}

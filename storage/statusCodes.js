"use strict";
const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  DELETE_OK: 5,
  NOT_DELETED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
  KEYS_DO_NOT_MATCH: 9,
};

const TYPE = {
  ERROR: "error",
  INFO: "info",
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "An error in the program has been detected!",
    code: CODES.PROGRAM_ERROR,
    type: TYPE.ERROR,
  }),
  NOT_FOUND: (key, value) => ({
    message: `No ressource found with ${key} ${value}`,
    code: CODES.NOT_FOUND,
    type: TYPE.INFO,
  }),
  INSERT_OK: (key, value) => ({
    message: `Data with ${key} ${value} was inserted successfully`,
    code: CODES.INSERT_OK,
    type: TYPE.INFO,
  }),
  NOT_INSERTED: () => ({
    message: `Failed to insert data!`,
    code: CODES.NOT_INSERTED,
    type: TYPE.ERROR,
  }),
  ALREADY_IN_USE: (key, value) => ({
    message: `Data with ${key} ${value} is already in use!`,
    code: CODES.ALREADY_IN_USE,
    type: TYPE.ERROR,
  }),
  DELETE_OK: (key, value) => ({
    message: `Data with ${key} ${value} was successfully deleted`,
    code: CODES.DELETE_OK,
    type: TYPE.INFO,
  }),
  NOT_DELETED: (key, value) => ({
    message: `NO Data with ${key} ${value} was found! Failed to delete!`,
    code: CODES.NOT_DELETED,
    type: TYPE.INFO,
  }),
  UPDATE_OK: (key, value) => ({
    message: `Data with ${key} ${value} was updated`,
    code: CODES.UPDATE_OK,
    type: TYPE.INFO,
  }),
  NOT_UPDATED: () => ({
    message: "Data was not updated!",
    code: CODES.NOT_UPDATED,
    type: TYPE.INFO,
  }),
  KEYS_DO_NOT_MATCH: (key, storedKey) => ({
    message: `The stored data key ${storedKey} doesn't match the entered key ${key}`,
    code: CODES.KEYS_DO_NOT_MATCH,
    type: TYPE.ERROR,
  }),
};

module.exports = { CODES, TYPE, MESSAGES };

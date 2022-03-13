"use strict";
const Datastorage = require("./storage/dataAccessLayer");

const storage = new Datastorage();
const newProduct = {
  productId: 3,
  name: "table kitchen",
};
// storage.getAll().then(console.log).catch(console.log);
// storage.get(1).then(console.log).catch(console.log);
// storage.remove(1).then(console.log).catch(console.log);
storage.insert(newProduct).then(console.log).catch(console.log);
// storage.update(6, newProduct).then(console.log).catch(console.log);

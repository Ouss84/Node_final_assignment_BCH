"use strict";
// productId, name, model, type, price;
const insertHelper = (product) => [
  +product.productId,
  product.name,
  product.model,
  product.type,
  +product.price,
];

const updateHelper = (product) => [
  product.name,
  product.model,
  product.type,
  +product.price,
  +product.productId,
];

module.exports = { insertHelper, updateHelper };

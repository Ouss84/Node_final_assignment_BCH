"use strict";

(function () {
  let idInput;
  let nameInput;
  let modelInput;
  let typeInput;
  let priceInput;
  let searchState = true;
  document.addEventListener("DOMContentLoaded", init);
  function init() {
    idInput = document.getElementById("productId");
    nameInput = document.getElementById("name");
    modelInput = document.getElementById("model");
    typeInput = document.getElementById("type");
    priceInput = document.getElementById("price");
    updateFields();
    document.getElementById("submit").addEventListener("click", send);
    idInput.addEventListener("focus", clearAll);
  }

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessageArea();
    }
  }

  function updateFields() {
    if (searchState) {
      idInput.removeAttribute("readonly");
      nameInput.setAttribute("readonly", true);
      modelInput.setAttribute("readonly", true);
      typeInput.setAttribute("readonly", true);
      priceInput.setAttribute("readonly", true);
    } else {
      idInput.setAttribute("readonly", true);
      nameInput.removeAttribute("readonly");
      modelInput.removeAttribute("readonly");
      typeInput.removeAttribute("readonly");
      priceInput.removeAttribute("readonly");
    }
  }

  function updateProductValues(product) {
    idInput.value = product.productId;
    nameInput.value = product.name;
    modelInput.value = product.model;
    typeInput.value = product.type;
    priceInput.value = product.price;
    searchState = false;
    updateFields();
  }

  function clearFieldValues() {
    idInput.value = "";
    nameInput.value = "";
    modelInput.value = "";
    typeInput.value = "";
    priceInput.value = "";
    searchState = true;
    updateFields();
  }

  async function send() {
    try {
      if (searchState) {
        clearMessageArea();
        const productId = idInput.value;
        const options = {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
        };
        const data = await fetch("/getOne", options);
        const getResult = await data.json();
        if (getResult) {
          if (getResult.message) {
            updateMessageArea(getResult.message, getResult.type);
          } else {
            updateProductValues(getResult);
          }
        } else {
          updateMessageArea("Product Not Found", "error");
        }
      } else {
        const product = {
          productId: +idInput.value,
          name: nameInput.value,
          model: modelInput.value,
          type: typeInput.value,
          price: +priceInput.value,
        };
        const options = {
          method: "POST",
          body: JSON.stringify(product),
          headers: { "Content-Type": "application/json" },
        };
        const data = await fetch("/update", options);
        const resultJson = await data.json();
        if (resultJson.message) {
          updateMessageArea(resultJson.message, resultJson.type);
        }
        searchState = true;
        updateFields();
      }
    } catch (err) {
      updateMessageArea(err.message, "error");
    }
  }
})();

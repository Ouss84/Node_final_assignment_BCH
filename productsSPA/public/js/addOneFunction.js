"use strict";

(function () {
  let idInput;
  let nameInput;
  let modelInput;
  let typeInput;
  let priceInput;
  document.addEventListener("DOMContentLoaded", init);
  function init() {
    idInput = document.getElementById("productId");
    nameInput = document.getElementById("name");
    modelInput = document.getElementById("model");
    typeInput = document.getElementById("type");
    priceInput = document.getElementById("price");
    document.getElementById("submit").addEventListener("click", send);
  }
  async function send() {
    clearMessageArea();
    const product = {
      productId: idInput.value,
      name: nameInput.value,
      model: modelInput.value,
      type: typeInput.value,
      price: priceInput.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch("/add", options);
      const result = await data.json();
      if (result.message) {
        updateMessageArea(result.message, result.type);
      }
    } catch (err) {
      updateMessageArea(err.message, "error");
    }
  }
})();

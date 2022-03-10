"use strict";

(function () {
  let resultArea;
  let inputField;
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultArea = document.getElementById("resultArea");
    inputField = document.getElementById("productId");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    resultArea.innerHTML = "";
    const id = inputField.value; // check if the id has to be changed to productId
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch("/getOne", options);
      const result = await data.json();
      updatePage(result);
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
  function updatePage(result) {
    if (result) {
      if (result.message) {
        updateMessageArea(result.message, result.type);
      } else {
        updateProduct(result);
      }
    } else {
      updateMessageArea("Not Found", "error");
    }
  }
  function updateProduct(product) {
    resultArea.innerHTML = `
    <p><span class="bold">Product ID:</span> ${product.productId}</p>
    <p><span class="bold">Name:</span> ${product.name}</p>
    <p><span class="bold">Product ID:</span> ${product.model}</p>
    <p><span class="bold">Product ID:</span> ${product.type}</p>
    <p><span class="bold">Product ID:</span> ${product.price}</p>
    `;
  }
})();

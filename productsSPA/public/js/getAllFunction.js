"use strict";
(function () {
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    try {
      const data = await fetch("/getAll");
      const products = await data.json();
      const displayedResult = document.getElementById("displayedResult");
      //   console.log(products);
      for (let product of products) {
        const tr = document.createElement("tr");
        tr.appendChild(addToTable(product.productId));
        tr.appendChild(addToTable(product.name));
        tr.appendChild(addToTable(product.model));
        tr.appendChild(addToTable(product.type));
        tr.appendChild(addToTable(product.price));
        displayedResult.appendChild(tr);
      }
    } catch (err) {
      document.getElementById(
        "textArea"
      ).innerHTML = ` <p class="error">${err.message}</p>`;
    }
  }
  function addToTable(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();

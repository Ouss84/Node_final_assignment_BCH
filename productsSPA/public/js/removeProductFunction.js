"use strict";

(function () {
  let idInput;
  document.addEventListener("DOMContentLoaded", init);
  function init() {
    idInput = document.getElementById("productId");
    document.getElementById("submit").addEventListener("click", send);
  }
  async function send() {
    clearMessageArea();
    const productId = idInput.value;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch("/remove", options);
      const result = await data.json();
      if (result.message) {
        updateMessageArea(result.message, result.type);
      }
    } catch (err) {
      updateMessageArea(err.message, "error");
    }
  }
})();

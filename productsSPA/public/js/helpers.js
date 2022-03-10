"use strict";

function updateMessageArea(message, type) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
  messageArea.setAttribute("class", type);
}

function clearMessageArea() {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = "";
  messageArea.removeAttribute("class");
}

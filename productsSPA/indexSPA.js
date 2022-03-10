"use strict";

const http = require("http");
const path = require("path");
const cors = require("cors");

const express = require("express");
const fetch = require("node-fetch");

const app = express();

const { host, port } = require("./serverConfig.json");

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "menu.html")));

app.get("/getAll", (req, res) => {
  fetch("http://localhost:4000/api/products", { mode: "cors" })
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/getOne", (req, res) => {
  const productId = req.body.productId;
  if (productId && productId > 0) {
    fetch(`http://localhost:4000/api/products/${productId}`, { mode: "cors" })
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "No Id entered!", type: "error" });
  }
});

app.post("/add", (req, res) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  };
  fetch("http://localhost:4000/api/products", options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/remove", (req, res) => {
  const productId = req.body.productId;
  if (productId && productId.length > 0) {
    fetch(`http://localhost:4000/api/products/${productId}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "No Id entered!", type: "error" });
  }
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} is running...`)
);

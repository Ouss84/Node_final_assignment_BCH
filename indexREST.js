"use strict";

const http = require("http");

const path = require("path");

const cors = require("cors");

const express = require("express");

const app = express();

const { host, port } = require(path.join(__dirname, "./serverConfig.json"));

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const Datastorage = require(path.join(
  __dirname,
  "storage",
  "dataAccessLayer.js"
));

const storage = new Datastorage();

app.get("/api/products", (req, res) =>
  storage
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/products/:id", (req, res) =>
  storage
    .get(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);
app.post("/api/products", (req, res) => {
  const product = req.body;
  storage
    .insert(product)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.put("/api/products/:id", (req, res) => {
  const product = req.body;
  const productId = req.params.id;
  storage
    .update(productId, product)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/api/products/:id", (req, res) => {
  storage
    .remove(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.all("*", (req, res) => res.json("Invalid data!"));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available`)
);

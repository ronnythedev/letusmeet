require("dotenv").config();
const express = require("express");
const user = require("./user.js");
const item = require("./item.js");
const items = require("./items.js");
const newsletter = require("./newsletter.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/item", item);
app.use("/api/items", items);
app.use("/api/newsletter", newsletter);

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});

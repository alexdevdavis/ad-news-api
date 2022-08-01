const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics.controller");

app.get("/api/topics", getTopics);

app.all("*", function (req, res, next) {
  res.status(404).send({ msg: "not found" });
  next();
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else res.status(500).send({ msg: "Internal Server Error" });
  next();
});

module.exports = app;

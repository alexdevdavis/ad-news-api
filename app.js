const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics.controller");
const { getArticle } = require("./controllers/articles.controller");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticle);

app.all("*", function (req, res, next) {
  res.status(404).send({ msg: "not found" });
  next();
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
  if (err.status === 404) {
    res.status(404).send({ msg: "Not Found" });
  }
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;

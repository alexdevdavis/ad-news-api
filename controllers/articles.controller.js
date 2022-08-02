const { fetchArticle } = require("../models/articles.model");

exports.getArticle = (req, res) => {
  const { article_id: id } = req.params;
  fetchArticle(id).then((article) => {
    res.status(200).send({ article });
  });
};

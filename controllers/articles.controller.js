const { fetchArticle } = require("../models/articles.model");

exports.getArticle = (req, res, next) => {
  const { article_id: id } = req.params;
  fetchArticle(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

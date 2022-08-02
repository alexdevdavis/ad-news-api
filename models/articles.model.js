const db = require("../db/connection");

exports.fetchArticle = async (id) => {
  if (typeof parseInt(id) !== "number") {
    return Promise.reject({ status: 400 });
  }
  const { rows: article } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );
  if (article.length < 1) {
    return Promise.reject({ status: 404 });
  }
  return article[0];
};

const db = require("../db/connection");

exports.fetchArticle = async (id) => {
  const { rows: article } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );
  return article[0];
};

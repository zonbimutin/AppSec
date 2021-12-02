const sql = require("../services/db.js");

// constructor
const Article = function(article) {
    this.title = article.title;
    this.content = article.content;
};

Article.findById = (id, result) => {
    sql.query(`SELECT * FROM articles WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found article: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Article.getAll = (result) => {
    let query = "SELECT * FROM articles";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("articles: ", res);
        result(null, res);
    });
};

module.exports = User;
const sql = require("../services/db.js");

// constructor
const Blog = function(blog) {
    this.title = blog.title;
    this.content = blog.content;
};

Blog.create = (title, content, user_id, result) => {
    sql(`INSERT INTO blogs (title, content, user_id) VALUE (?, ?, ?)`, [
        title, content, user_id
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, true);
    })
}

Blog.delete = (id, result) => {
    sql(`DELETE FROM blogs WHERE id = ?`, [
        id
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, true);
    })
}

Blog.findById = (id, result) => {
    sql(`SELECT * FROM blogs WHERE id = ?`, [
        id
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found blogs: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Blog.getAll = (user_id, result) => {
    let query = "SELECT * FROM blogs";
    let value = [];

    if (user_id) {
        query += ` WHERE user_id = ?`;
        value.push(user_id);
    }

    sql(query, value, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("blogs: ", res);
        result(null, res);
    });
};

module.exports = Blog;
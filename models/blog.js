const sql = require("../services/db.js");

// constructor
const Blog = function(blog) {
    this.id = blog.id
    this.user_id = blog.user_id
    this.title = blog.title;
    this.content = blog.content;
    this.createAt = blog.createAt;
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

Blog.findById = async (id) => {

    let query = `SELECT * FROM blogs WHERE id = ?`
    try {
        const res = await sql( query, [id] );
        if(res.lenght < 1) throw new Error('')
        let blog = new Blog(res[0])
        return blog
    }
    catch (er){
        console.log(er)
        return null
    }

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

Blog.update = async (blog) => {

    let query = `UPDATE blogs SET title=?, content=?, user_id=? WHERE blogs.id = ?`

    try{
        const res = await sql( query, [blog.title, blog.content, blog.user_id, blog.id] );
        return res[0]
    }
    catch (er) {
        console.log(er)
        return null
    }

};

module.exports = Blog;
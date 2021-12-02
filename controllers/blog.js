const Blog = require("../models/blog.js");

exports.create = (req, res) => {
    var content = "qsdjfbqdbfqsd qhdsbf qjsbf kqjs fqkbfq";
    Blog.create('test', content, '2', (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating user."
            });
        else res.send(data);
    })
}
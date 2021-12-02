const Blog = require("../models/blog.js");

exports.create = (req, res) => {
    var user = req.user;
    if (!user.role.can_write) return res.status(401).send({message: "unauthorized"});
    var {title, content} = req.body
    Blog.create(title, content, user.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating user."
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    var user = req.user;
    if (!user.role.can_delete) return res.status(401).send({message: "unauthorized"});
    var {id} = req.body
    Blog.delete(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting user."
            });
        else res.send(data);
    })
}

exports.read = (req, res) => {
    var user = req.user;
    if (!user.role.can_read) return res.status(401).send({message: "unauthorized"});
    Blog.getAll(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting user."
            });
        else res.send(data);
    })
}



exports.update = async (req, res) => {
    let user = req.user
    if(!user) return
    if(user.role.can_update){
        try {
            let blogUpdate = req.body
            let blog = await Blog.findById(blogUpdate.id)
            console.log(blog)
            if(!blog)  return

            let blogres = await Blog.update({...blog, ...blogUpdate})
            res.send(blogres)
        }
        catch (er) {
            console.log(er)
        }


    }

}
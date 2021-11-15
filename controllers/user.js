const User = require("../models/user.js");

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    // const title = req.query.title;

    User.getAll('', (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
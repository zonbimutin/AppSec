const User = require("../models/user.js");
const Role = require("../models/role.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.login = async (req, res) => {

    let username = req.body.username
    let password = req.body.password

    try {
        let {id} = await User.getIdByUsername(username)
        if(!id) throw new Error('username or password incorrect')

        let user = await User.findById(id)
        let role = await Role.findById(user.role)

        user.role = {...role}

        let token = await bcrypt.compare(password, user.password, (err, result) => {
            if (result) {

                const payload = {...user}
                delete payload.password
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                });
                res.send(token)

            }
            else {
                return null
            }
        });


    }
    catch (er) {
        console.log(er)
        res.send(null)
    }

}

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    // const title = req.query.title;

    User.getAll('', (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        }
        else {
            res.send(data);
        }
    });

};
exports.findById = async (req, res) => {
    try{

        let user = await User.findById(1)
        let role = await Role.findById(user.role)
        user.role = role
        res.send(user)
    }
    catch (er) {
        console.log(er)
        return null
    }

}

exports.create = (req, res) => {
    var {username, password} = req.body;
    User.create(username, password, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating user."
            });
        else res.send(data);
    })
}
// exports.login = (req, res) => {
//     User.login('test', 'test', (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating user."
//             });
//         }
//         else res.send(data);
//     })
// }
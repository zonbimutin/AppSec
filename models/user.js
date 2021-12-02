const sql = require("../services/db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;



// constructor
const User = function(user) {
    this.id = user.id
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.createAt = user.createAt;
};

User.create = (username, password, result) => {
    
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        sql(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
    
            result(null, true);
        })
    });
}

User.getIdByUsername = async (username) => {
    let query = `SELECT id FROM users WHERE username = ?`
    let res = await sql(query, [username])
    if(!res) return null
    return res[0]
}

User.findById = async (id) => {

    let query = `SELECT * FROM users WHERE id = ?`

    const res = await sql( query, [id] );
    let user = new User(res[0])

    return user
};

User.getAll = (username, result) => {
    let query = "SELECT u.id, u.username, u.createAt, r.label, r.can_read, r.can_delete, r.can_write, r.can_update from users u, roles r WHERE u.role = r.id ";

    sql(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(res)
        result(null, res);
    });
};

module.exports = User;
const sql = require("../services/db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = "teqdfqsdfqsdfkqjsndfqksdjfnqsdfnqsfl";

// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
};

User.create = (username, password, result) => {
    
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        sql.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [
            username,
            hash
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
    
            result(null, true);
        })
    });
}

User.login = (username, password, result) => {
    sql.query(`SELECT * FROM users WHERE username = ?`, [
        username
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            bcrypt.compare(password, res[0].password, (err, res) => {
                if (res) {
                    const payload = { username };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '30d'
                    });
                    result(null, {success: true, token});
                    return;
                }
                else {
                    result({ error: "incorrect username or password"}, null);
                    return;
                }
            });
        } else {
            result({ kind: "not_found" }, null);
        }

    })
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ?`, [
        id
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (username, result) => {
    let query = "SELECT u.id, u.username, u.createAt, r.label, r.can_read, r.can_delete, r.can_write, r.can_update from users u, roles r WHERE u.role = r.id ";

    sql.query(query, (err, res) => {
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
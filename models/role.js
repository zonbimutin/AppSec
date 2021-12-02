const sql = require("../services/db.js");

// constructor
const Role = function(role) {
    this.id = role.id;
    this.label = role.label;
    this.can_write = role.can_write;
    this.can_read = role.can_read;
    this.can_update = role.can_update;
    this.can_delete = role.can_delete;
};

Role.findById = (id, result) => {
    sql.query(`SELECT * FROM roles WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Role;
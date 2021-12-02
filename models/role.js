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

Role.findById = async (id) => {
    let query = `SELECT * FROM roles WHERE id = ${id}`
    const res = await sql( query )
    return res[0]
};

module.exports = Role;
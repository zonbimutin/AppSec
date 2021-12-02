const mysql = require('mysql');
const util = require('util');
const config = require('../db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// node native promisify
const query = util.promisify(connection.query).bind(connection);

module.exports = query;
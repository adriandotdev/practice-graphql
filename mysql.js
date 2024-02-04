const mysql2 = require('mysql2')

const pool = mysql2.createPool({

    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'emsp'
})

pool.getConnection((err, connection) => {

    if (err) {
        console.log("MySQL Error: " + err.message)
    }

    if (connection) {
        console.log("Connected to Database");
        connection.release();
    }
})

pool.on('release', (connection) => {

    console.log("Connection %d released", connection.threadId);
})

module.exports = pool;

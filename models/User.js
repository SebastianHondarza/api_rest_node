'use strict'

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
    // insecureAuth: true
});

exports.get = (idUser, callback) => {
    
    let queryString = 'SELECT * FROM users WHERE id = ?';
    connection.query(queryString, [idUser], (err, rows, fields) => {

        if(err){
            console.log('Error al ejecutar la query ' + err);
            callback('Error al ejecutar la Query ' + err);
        }

        console.log('LAS ROWS ==> ' + rows);
        

        const users = rows.map((row) => {
            return {name: row.name, email: row.email}
        });

        callback(null, users);
        return callback;
    })
};
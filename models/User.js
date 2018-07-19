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

exports.getAll = (callback) => {

    let queryString = 'SELECT * FROM users';
    connection.query(queryString, (err, rows, fields) => {
        
        if(err){
            console.log('Error al ejecutar la query ' + err);
            callback('Error al ejecutar la query ' + err);
        }

        console.log('Las Rows ==> ' + rows);
        const users = rows.map((row) => {
            return {name: row.name, email: row.email}
        });

        callback(null, users);
        return callback;
    })
}

exports.create = (user, callback) => {

    let queryString = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(queryString, [user.name, user.email], (err, rows, fields) => {

        if(err){
            callback('Error al crear el usuario');
            console.log('Error al crear el usuario ' + err);
        }

        callback(null, 'Usuario creado correctamente');
        return callback;
    });
}

exports.update = (user, callback ) => {

    let queryString = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    connection.query(queryString, [user.name, user.email, user.id], (err, rows, fields) => {
        
        if(err){
            console.log('Error al ejecutar la query ' + err);
            callback('Error al ejecutar la Query ' + err)
        }

        if(rows.affectedRows === 1){
            callback(null, {message: 'Usuario actualizado correctamente'});
        } else {
            callback(null, {message: 'Error al actualizar el usuario'});
        }

        console.log('Rows ==> ' + rows);
        console.log('Fields ==> ' + fields);
        
        return callback;
    });
}

exports.destroy = function(userId, callback){
    
    let queryString = 'DELETE FROM users WHERE id = ?';
    connection.query(queryString, [userId], (err, rows, fields) => {

        if(err){
            console.log('Error al eliminar el usuario');
            callback({message: 'Error al eliminar el usuario'});
        }

        callback(null, {message: 'Usuario eliminado correctamente'});
        return callback;
    });
}
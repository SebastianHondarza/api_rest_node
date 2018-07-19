'use strict'

const express = require('express');
const api = express.Router(); 
const auth = require('../middlewares/auth');

//llamar el resto de las rutas (controllers)
const userController = require('../controllers/userController');

api.get('/users', userController.getAll);
api.get('/users/:id', userController.get);
api.post('/users', userController.create);
api.put('/users/:id', userController.update);
api.delete('/users/:id', userController.destroy);
api.post('/users/signin', userController.signIn);
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Acceso correcto!'})
});

module.exports = api;
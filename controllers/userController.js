'use strict'

const User = require('../models/User');
const service = require('../services/index');

function signIn(req, res){
    /**
     * Lo ideal seria realizarlo mediante una consulta a la DB
     * en este caso será estatico solo a modo de ejemplo
     */

    let name = req.body.name;
    let pass = req.body.pass;

    let user = {
        _id: 1313
    }

    if(name === 'root' && pass === 'root'){
        res.status(200).send({
            message: 'Has ingresado correctamente',
            token: service.createToken(user)
        })
    } else {
        res.status(500).send({message: 'Error al ingresar'})
    }
}

function getAll(req, res){
    
}

function get(req, res){
    
    let userId = req.params.id;
    User.get(userId, (err, user) => {
        
        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        res.status(200).send(user);
    }) 
}

function privateUser(){
    let userId = req.params.id;
    User.get(userId, (err, user) => {
        
        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        res.status(200).send(user);
    }) 
}

module.exports = {
    signIn,
    get,
    getAll,
    privateUser
}
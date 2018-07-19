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
    
    User.getAll( (err, users) => {
        if(err) return res.status(500).send({message: 'No se pudo realizar la petición'})
        if(!users) return res.status(404).send({message: 'No existe el listado'})
        res.status(200).send(users);
    });

}

function get(req, res){
    
    let userId = req.params.id;
    User.get(userId, (err, user) => {
        
        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        res.status(200).send(user);
    });
}

function destroy(req, res){

    let userId = req.params.id;
    User.destroy(userId, (err, user) => {

        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})
        
        res.status(200).send(user);
    });
}

function create(req, res){

    let newUser = {
        name: req.body.name,
        email: req.body.email
    }

    User.create(newUser, (err, user) => {

        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'});
        if(!user) return res.status(404).send({message: 'No se pudo insertar el usuario'});

        res.status(200).send(user);
    });
}

function update(req, res){

    let user = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email
    }

    User.update(user, (err, user) => {
        
        if(err) return res.status(500).send({message: 'No se pudo realizar la peticion'})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        res.status(200).send(user);
    });

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
    create,
    update,
    destroy,
    privateUser
}
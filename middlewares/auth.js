'use strict'

const services = require('../services/index');

function isAuth(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tiene permiso'})
    }

    // const token = req.headers.authorization.split(" ")[1];
    const token = req.headers['authorization'];
    services.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(err => {
            res.status(err.status).send({message: 'ERROR!!!'})
        })
}

module.exports = isAuth;
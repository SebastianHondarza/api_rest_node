'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./routes/routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('Respondiendo desde la raiz...');
    res.send('Hola desde la raiz');    
});

app.use(api);

app.listen(3003, () => {
    console.log('Servidor corriendo en el puerto 3003');
});

var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var dotenv = require('dotenv');
var mariadb = require('mariadb');

dotenv.config();

//Rutas
var usuariosRourter = require('./src/routes/users_api');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(cors());
app.use(helmet());

//Definicion rutas
app.use('/api/usuarios', usuariosRourter);

mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
.then(()=>{
    console.log('coneccion a base de datos exitosa');
    app.listen(3000, function(){
        console.log('hola mundo node.js');
    })
})
.catch((err)=>{
    console.log('ocurrio un error en la coneccion a la base de datos');
    console.log(err);
})

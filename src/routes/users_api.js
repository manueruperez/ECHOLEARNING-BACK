var express = require('express');
var router = express.Router();

var usersView = require('../services/users/usersViewClass');
var view = new usersView();

var usersTC = require('../services/users/usersTransaccionalClass');
var tranUs = new usersTC();

router.get('', async function(req,res,next){
    view.getUsers()
    .then((result)=>{
        var users = result;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users, null, 4));
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.get('/:idUsuario', async function(req,res,next){
    view.getUserById(req.params.idUsuario)
    .then((result)=>{
        var users = result;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users, null, 4));
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.post('/crear', async function(req,res,next){
    tranUs.createUser(req.body).then((result)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(true, null, 4));
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.put('/editar/:idUsuario', async function(req,res,next){
    req.body.idUsuario = req.params.idUsuario;
    console.log(req.body);
    tranUs.upDateUser(req.body).then((result)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(true, null, 4));
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.delete('/eliminar/:idUsuario', async function(req,res,next){
    tranUs.deleteUser(req.params.idUsuario)
    .then((result)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(true, null, 4));
    })
    .catch((err)=>{
        console.log(err);
    });
});

module.exports = router;
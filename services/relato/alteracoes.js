var mongoose = require('mongoose');
var schemas = require('./schemas');
var express = require('express');
var auth = require('./auth');
var router = express.Router()

var Cedente = schemas.Cedente;
var Sacado = schemas.Sacado;
var Titulo = schemas.Titulo;
var ObjectId = mongoose.Types.ObjectId;

//router.use(auth);

router.put('/cedente', async function(req, res){
    let cedente = req.body.cedente;
    try {
        let newCedente = await Cedente.findByIdAndUpdate({ '_id': ObjectId(cedente._id) }, cedente, { 'new': true }).exec();
        res.json({ cedente: newCedente });
    } catch(e) {
        console.log(e);
    }
});

router.put('/sacado', async function(req, res){
    let sacado = req.body.sacado;
    try {
        let newSacado = await Sacado.findByIdAndUpdate({ '_id': ObjectId(sacado._id) }, sacado, { 'new': true }).exec();
        res.json({ sacado: newSacado });
    } catch(e) {
        console.log(e);
    }
});

router.put('/titulo', async function(req, res){
    let titulo = req.body.titulo;
    try {
        let newTitulo = await Titulo.findByIdAndUpdate({ '_id': ObjectId(titulo._id) }, titulo, { 'new': true }).
            populate('O_SACADO_CNPJ').
            populate('O_CEDENTE_CNPJ').
            exec();
        res.json({ titulo: newTitulo });
    } catch(e) {
        console.log(e);
    }
});

module.exports = router
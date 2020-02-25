var mongoose = require('mongoose');
var schemas = require('./schemas');
var express = require('express');
var auth = require('./auth');
var router = express.Router()

var Titulo = schemas.Titulo;
var Cedente = schemas.Cedente;
var Sacado = schemas.Sacado;
var Config = schemas.Config;
var ObjectId = mongoose.Types.ObjectId;

router.use(auth);

router.post('/cedente', function(req, res){
    let cedente = new Cedente(req.body);
    cedente.save((err, data) => res.json({ cedente: data }));
});

router.post('/sacado', function(req, res){
    let sacado = new Sacado(req.body);
    sacado.save((err, data) => res.json({ sacado: data }));
});

router.post('/titulo', function(req, res){
    Promise.all([Cedente.findOne({'S_ID': req.body.O_CEDENTE_CNPJ}), Sacado.findOne({'S_ID': req.body.O_SACADO_CNPJ})]).then((values) => {
        req.body.O_SACADO_CNPJ = ObjectId(values[1]._id);
        req.body.O_CEDENTE_CNPJ = ObjectId(values[0]._id);
        let titulo = new Titulo(req.body);
        titulo.save((err, data) => res.json({ titulo: data }));
    });
});

router.post('/configs', function(req, res){
    if(req.body && req.body._id){
        Config.findOneAndUpdate({'_id': ObjectId(req.body._id)}, {S_EMPRESA_CNPJ: req.body.S_EMPRESA_CNPJ}, { 'new': true }, (err, data) => {
            if(err) console.log(err);
            else res.json({ config: data });
        });
    } else {
        let config = new Config(req.body);
        config.save((err, data) => res.json({ config: data }));
    }
});

module.exports = router;
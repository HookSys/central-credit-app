var mongoose = require('mongoose');
var schemas = require('./schemas');
var express = require('express');
var auth = require('./auth');
var router = express.Router()

var Titulo = schemas.Titulo;
var Cedente = schemas.Cedente;
var Sacado = schemas.Sacado;
var Envio = schemas.Envio;
var User = schemas.User;
var Config = schemas.Config;
var ObjectId = mongoose.Types.ObjectId;

router.use(auth);

router.get('/cedentes', function(req, res){
    let params = {};
    let cedente = req.query.cedente;
    if(cedente != null) params.O_CEDENTE_ORIGIN = ObjectId(cedente);

    Cedente.find(params).lean().exec((err, cedentes) => {
        Titulo.find({'D_DATA_PAGAMENTO': null}).populate('O_CEDENTE_CNPJ').exec((err, titulos) => {
            cedentes = cedentes.map((ced) => {
                let titulosOfCed = titulos.filter((titulo) => ced.S_CNPJ == titulo.O_CEDENTE_CNPJ.S_CNPJ);

                ced.B_TITULOS_ABERTOS = false;
                ced.B_TITULOS_ATRASADOS = false;
                if(titulosOfCed.length > 0){
                    ced.B_TITULOS_ABERTOS = true;
                    ced.B_TITULOS_ATRASADOS = titulosOfCed.filter((titulo) => new Date(titulo.D_DATA_VENCIMENTO) < new Date()).length > 0;
                }

                return ced;
            });
            res.json({ cedentes });
        });
    });
});

router.get('/sacados', function(req, res){
    Sacado.find().lean().exec((err, sacados) => {
        Titulo.find({'D_DATA_PAGAMENTO': null}).populate('O_SACADO_CNPJ').exec((err, titulos) => {
            sacados = sacados.map((sac) => {
                let titulosOfSac = titulos.filter((titulo) => sac.S_CNPJ == titulo.O_SACADO_CNPJ.S_CNPJ);

                sac.B_TITULOS_ABERTOS = false;
                sac.B_TITULOS_ATRASADOS = false;
                if(titulosOfSac.length > 0){
                    sac.B_TITULOS_ABERTOS = true;
                    sac.B_TITULOS_ATRASADOS = titulosOfSac.filter((titulo) => new Date(titulo.D_DATA_VENCIMENTO) < new Date()).length > 0;
                }

                return sac;
            });
            res.json({ sacados });
        });
    });
});

router.get('/titulos', function(req, res){
    let params = {};

    let cedente = req.query.cedente;
    let sacado = req.query.sacado;
    let periodo_inicial = req.query.periodo_inicial;
    let periodo_final = req.query.periodo_final;

    if(sacado != null) params.O_SACADO_CNPJ = ObjectId(sacado);
    if(cedente != null) params.O_CEDENTE_CNPJ = ObjectId(cedente);
    if(periodo_inicial != null && periodo_final != null) params.D_DATA_EMISSAO = { $gt: periodo_inicial, $lt: periodo_final };

    Titulo.find(params).
        populate('O_SACADO_CNPJ').
        populate('O_CEDENTE_CNPJ').
        exec((err, data) => res.json({ titulos: data }));
});

router.get('/envios', function(req, res){
    Envio.find().exec((err, data) => res.json({ envios: data }));
});

router.get('/usuarios', function(req, res){
    User.find().exec((err, data) => res.json({ usuarios: data }));
});

router.get('/configs', function(req, res){
    Config.find().exec((err, data) => res.json({ configs: data }));
});

module.exports = router
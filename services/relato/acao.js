var mongoose = require('mongoose');
var schemas = require('./schemas');
var express = require('express');
var auth = require('./auth');
var router = express.Router()

var Titulo = schemas.Titulo;
var Cedente = schemas.Cedente;
var Sacado = schemas.Sacado;
var Envio = schemas.Envio;

router.use(auth);

async function payTitles() {
    return new Promise((resolve) => {
        Titulo.find().exec(async (err, titulos) => {
            for(let titulo of titulos) {
                if(titulo.D_DATA_PAGAMENTO == null && titulo.D_DATA_VENCIMENTO < new Date()){
                    titulo.D_DATA_PAGAMENTO = titulo.D_DATA_VENCIMENTO;
                    await titulo.save();
                }
            }
            resolve();
        });
    });
}

router.post('/pagarTitulos', function(req, res){
    payTitles().then(() => {
        res.json({ result: true });
    })
});

router.post('/fecharTitulos', function(req, res){
    Titulo.find().exec(function (err, titulos) {
        titulos.map((titulo, i) => {
            titulo.D_DATA_PAGAMENTO = new Date();
            titulo.save();
            if(i == titulos.length-1) res.json({ result: true });
        });
    });
});

router.get('/isAuthenticated', function(req, res){
    res.json({ success: true });
});

router.post('/cleanCollections', function(req, res){
    let promises = [];
    if(req.body.titulos) promises.push(Titulo.collection.drop());
    if(req.body.cedentes) promises.push(Cedente.collection.drop());
    if(req.body.sacados) promises.push(Sacado.collection.drop());

    Promise.all(promises).then(() => res.json({ success: true }));
});

module.exports = {
    router,
    payTitles
};
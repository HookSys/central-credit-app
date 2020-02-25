var mongoose = require('mongoose');
var schemas = require('./schemas');
var express = require('express');
var auth = require('./auth');
var fs = require('fs');
var router = express.Router();
var datesBetween = require('dates-between');
var dateFormat = require('dateformat');
var config = require('./const');

var Titulo = schemas.Titulo;
var Cedente = schemas.Cedente;
var Sacado = schemas.Sacado;
var Config = schemas.Config;
var Envio = schemas.Envio;
var ObjectId = mongoose.Types.ObjectId;

async function getSacado(S_SACADO_CNPJ, cedente, relacionamentos){
    try {
        let sac = await Sacado.findOne({'S_CNPJ': String(S_SACADO_CNPJ)}).exec();
        if(sac)
            return sac._id;
        
        let relacionamento = relacionamentos.filter((relacionamento) => relacionamento.S_SACADO_CNPJ == S_SACADO_CNPJ);
        let sacado = new Sacado({
            S_CNPJ: S_SACADO_CNPJ,
            S_RAZAO_SOCIAL: S_SACADO_CNPJ,
            D_CLIENTE_DESDE: relacionamento[0] ? relacionamento[0].S_CLIENTE_DESDE : new Date(),
            S_TIPO_CLIENTE: relacionamento[0] ? relacionamento[0].S_TIPO_CLIENTE : '2',
            S_RELACIONADO: true,
            O_CEDENTE_ORIGIN: ObjectId(cedente)
        });
        sac = await sacado.save();
        return sac._id;
    } catch(e) {
        console.log(e);
    }
}
async function getCedente(S_CEDENTE_CNPJ){
   try {
       let cen = await Cedente.findOne({'S_CNPJ': String(S_CEDENTE_CNPJ)}).exec();
        if(cen)
            return cen._id;

        let cedente = new Cedente({
            S_CNPJ: S_CEDENTE_CNPJ,
            S_RAZAO_SOCIAL: S_CEDENTE_CNPJ
        });
        cen = await cedente.save();
        return cen._id;
    } catch(e) {
        console.log(e);
    }
}

async function tituloExists(S_NUMERO_TITULO){
    try {
        let titulo = await Titulo.findOne({'S_NUMERO_TITULO': String(S_NUMERO_TITULO)}).exec();
         if(titulo)
            return true;
        return false;
     } catch(e) {
        console.log(e);
    }
 }

async function save(titulos, relacionamentos){
    let i = 0;
    for(i=0; i<titulos.length; i++){
        let titulo = await tituloExists(titulos[i].S_NUMERO_TITULO);
        if(!titulo){
            let cedente = await getCedente(titulos[i].S_CEDENTE_CNPJ);
            let sacado = await getSacado(titulos[i].S_SACADO_CNPJ, cedente, relacionamentos);

            let regTitulo = new Titulo({
                O_SACADO_CNPJ: sacado,
                S_NUMERO_TITULO: titulos[i].S_NUMERO_TITULO,
                D_DATA_EMISSAO: titulos[i].D_DATA_EMISSAO,
                S_VALOR_TITULO: titulos[i].S_VALOR_TITULO,
                D_DATA_VENCIMENTO: titulos[i].D_DATA_VENCIMENTO,
                D_DATA_PAGAMENTO: titulos[i].D_DATA_PAGAMENTO,
                O_CEDENTE_CNPJ: cedente,
                D_ULTIMO_ENVIO: null
            });

            await regTitulo.save();
        }
    };
}

function load_file_relato(file, cb) {
    fs.readFile(file, 'utf8', async (err, fileContents) => {
        if (err) cb(err)
        else {
            let lines = fileContents.split('\r\n');
            let titulos = [];
            let relacionamentos = [];

            lines.map((line, i) => {
                if(i != 0 || i != lines.length-1 && line.length == 129){
                    if(line.slice(16, 18) == '05' || line.slice(16, 18) == '09') {
                        titulos.push({
                            S_SACADO_CNPJ: line.slice(2, 16),
                            S_NUMERO_TITULO: line.slice(18, 28),
                            D_DATA_EMISSAO: new Date(line.slice(32, 34) + '/' + line.slice(34, 36) + '/' + line.slice(28, 32)),
                            S_VALOR_TITULO: line.slice(36, 49),
                            D_DATA_VENCIMENTO: new Date(line.slice(53, 55) + '/' + line.slice(55, 57) + '/' + line.slice(49, 53)),
                            D_DATA_PAGAMENTO: line.slice(57, 65).trim() != '' ? new Date(line.slice(61, 63) + '/' + line.slice(63, 65) + '/' + line.slice(57, 61)) : null,
                            S_CEDENTE_CNPJ: line.slice(100, 115),
                        });
                    } else if(line.slice(16, 18) == '01' || line.slice(16, 18) == '08') {
                        relacionamentos.push({
                            S_SACADO_CNPJ: line.slice(2, 16),
                            S_CLIENTE_DESDE: new Date(line.slice(22, 24) + '/' + line.slice(24, 26) + '/' + line.slice(18, 22)),
                            S_TIPO_CLIENTE: line.slice(26, 27)
                        });
                    }
                }
            });

            await save(titulos, relacionamentos);
            
            cb(null, titulos);
        }
    });
}

function load_file_relato_2(file, cb) {
    fs.readFile(file, 'utf8', async (err, fileContents) => {
        if (err) cb(err)
        else {
            let lines = fileContents.split('\r\n');
            let titulos = [];
            let relacionamentos = [];

            lines.map((line, i) => {
                if(i != 0 || i != lines.length-1){
                    if(line.slice(12, 14) == '02') {
                        titulos.push({
                            S_SACADO_CNPJ: line.slice(2, 12),
                            S_NUMERO_TITULO: line.slice(17, 27),
                            D_DATA_EMISSAO: new Date(line.slice(31, 33) + '/' + line.slice(33, 35) + '/' + line.slice(27, 31)),
                            S_VALOR_TITULO: line.slice(35, 48),
                            D_DATA_VENCIMENTO: new Date(line.slice(52, 54) + '/' + line.slice(54, 56) + '/' + line.slice(48, 52)),
                            D_DATA_PAGAMENTO: line.slice(56, 64).trim() != '' && line.slice(56, 64).trim() != '00000000' ? new Date(line.slice(60, 62) + '/' + line.slice(62, 63) + '/' + line.slice(56, 60)) : null,
                            S_CEDENTE_CNPJ: '27907423000146',
                        });
                    } else if(line.slice(12, 14) == '01') {
                        relacionamentos.push({
                            S_SACADO_CNPJ: line.slice(2, 12),
                            S_CLIENTE_DESDE: new Date(line.slice(18, 20) + '/' + line.slice(20, 22) + '/' + line.slice(14, 18)),
                            S_TIPO_CLIENTE: line.slice(22, 23)
                        });
                    }
                }
            });

            await save(titulos, relacionamentos);
            
            cb(null, titulos);
        }
    });
}

function deleteFile(file){
    return new Promise((resolve) => {
        fs.unlink(file, () => resolve());
    });
}

function append(file, line) {
    return new Promise((resolve) => {
        fs.appendFile(file, line, () => resolve());
    });
}

function appendItens(itens, file){
    return new Promise((resolve) => {
        if(itens.length == 0) resolve();
        itens.map(async (item, i) => {
            await append(file, Object.values(item).join('')+'\r\n');
            if(i == itens.length-1) resolve();
        });
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generate_file_relato(periodo_inicio, periodo_fim, quantidade = false, cb) {
    let data = new Date().toLocaleDateString().split('-');
    let fileName = 'relato_'+data[0]+data[1]+data[2]+'.txt'
    let file = __dirname + '/files_relato/' + fileName;
    
    await deleteFile(file);
    Config.getHeaderRelato(periodo_inicio, periodo_fim, (header) => {
        Titulo.getRelatoRegs(periodo_inicio, periodo_fim, !quantidade, async (data) => {
            if(data.titulos.length > 0) {
                if(quantidade !== false) {
                    let titulos = [];
                    if(quantidade > 0){ 
                        let rand = getRandom(0, data.titulos.length-1);
                        while(titulos.length < quantidade) {
                            if(titulos.filter((titulo) => titulo.S_NUMERO_TITULO == data.titulos[rand].S_NUMERO_TITULO).length == 0){
                                titulos.push(data.titulos[rand]);
                            }
                            rand = getRandom(0, data.titulos.length-1);
                        } 
                    } else {
                        titulos = data.titulos;
                    }

                    cb({
                        status: true,
                        titulos
                    });
                } else {
                    await append(file, Object.values(header).join('')+'\r\n');
                    await appendItens(data.relacionamentos, file);
                    await appendItens(data.titulos, file);
                    await append(file, Object.values(data.trailer).join(''));
                    cb({
                        status: true,
                        fileName: fileName
                    });
                }
            } else {
                cb({
                    status: false,
                    message: 'Não existem titulos nesse período'
                });
            }
        });
    });
}

function addDays(date, days) {
    let retnDate = new Date(date);
    return new Date(retnDate.setDate(date.getDate() + days));
}

function isWeekend(date) {
    if(date) {
        const weekDay = date.getDay();
        if (weekDay == 6)
            return 2;
        if (weekDay == 0)
            return 2;
    }
    return 0;
}

function getDaysOfMonth(date) {
    if(date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }
    return 0;
}

async function generate_email_regs(quantidade_cedentes, quantidade_sacados_por_cedente, dateToGenerate, cb) {
    const sacados = [];
    const cedentes = [];

    let i = 0;
    const cedentesSize = await Cedente.find().count().exec();
    while(i < quantidade_cedentes) {
        let cedenteRand = getRandom(0, cedentesSize-1);
        let cedente = await Cedente.findOne().skip(cedenteRand).exec();

        if(cedentes.filter((ced) => ced.id == cedente.id).length == 0
        && !cedente.S_DESATIVADO){
            let j = 0;
            let sacadosIn = await Sacado.find({ O_CEDENTE_ORIGIN: cedente }).populate('O_CEDENTE_ORIGIN').exec();
            while(j < quantidade_sacados_por_cedente) {
                let sacadoRand = getRandom(0, sacadosIn.length-1);
                let sacado = sacadosIn[sacadoRand];
                if(sacados.filter((sac) => sac.id == sacado.id).length == 0){
                    sacados.push(sacado);
                    j++;
                } else if(sacadosIn.length == 1) {
                    j = quantidade_sacados_por_cedente;
                }
            }
            cedentes.push(cedente);
            i++;
        }
    }

    /**  Configs -------------------------------- */
    let valor_inicio = "10000"; // R$100,00
    let valor_fim = "150000"; // R$1500,00
    let titulo_inicio = "1234567";
    let titulo_fim = "7654321";
    /** ----------------------------------------- */

    i = 0;
    let currentDate = new Date(dateToGenerate);
    while(i < sacados.length) {
        let randomValor = schemas.LFILLZEROS(getRandom(parseInt(valor_inicio), parseInt(valor_fim)).toString(), 13);
        let randomTitulo = schemas.LFILLZEROS(getRandom(parseInt(titulo_inicio), parseInt(titulo_fim)).toString(), 10);
        let expirityDate = addDays(currentDate, getDaysOfMonth(currentDate));

        if(!await tituloExists(randomTitulo)) {
            let regTitulo = new Titulo({
                O_SACADO_CNPJ: ObjectId(sacados[i]._id),
                S_NUMERO_TITULO: randomTitulo,
                D_DATA_EMISSAO: currentDate,
                S_VALOR_TITULO: randomValor,
                D_DATA_VENCIMENTO: addDays(expirityDate, isWeekend(expirityDate)),
                D_DATA_PAGAMENTO: null,
                O_CEDENTE_CNPJ: ObjectId(sacados[i].O_CEDENTE_ORIGIN._id),
                D_ULTIMO_ENVIO: null
            });
            await regTitulo.save();
            i++;
        }
    }

    cb({
        success: true,
    });
}

async function generate_random_regs(periodo_inicio, periodo_fim, valor_inicio, valor_fim, titulo_inicio, titulo_fim, 
                                    quantidade_sacados, cedente, quantidade, dias_inicio_vencimento, dias_fim_vencimento,
                                    dias_inicio_pagamento, quantidade_pagamento, cb) {
    let i = 0;
    let sacados = [];
    let sacadosSize = await Sacado.count().exec();
    while(i < quantidade_sacados) {
        let rand = getRandom(0, sacadosSize);
        let sacadoRetn = await Sacado.findOne().skip(rand).exec();
        if(sacados.filter((sacado) => sacado._id == sacadoRetn._id).length == 0){
            sacados.push(sacadoRetn);
            i++;
        }
    }


    i = 0;
    let titulos = [];
    let pagamentosSkiped = 0;
    let dates = Array.from(datesBetween(new Date(periodo_inicio), new Date(periodo_fim)));
    while(i < parseInt(quantidade)) {
        let randomDate = dates[getRandom(0, dates.length-1)];
        let randomValor = schemas.LFILLZEROS(getRandom(parseInt(valor_inicio), parseInt(valor_fim)).toString(), 13);
        let randomTitulo = schemas.LFILLZEROS(getRandom(parseInt(titulo_inicio), parseInt(titulo_fim)).toString(), 10);
        let randomSacado = sacados[getRandom(0, quantidade_sacados-1)];

        let randomDiasVencimento = getRandom(parseInt(dias_inicio_vencimento), parseInt(dias_fim_vencimento));
        let randomVencimento = addDays(randomDate, randomDiasVencimento);

        let randomDiasPagamento = getRandom(parseInt(dias_inicio_pagamento), parseInt(dias_inicio_vencimento));
        let datesPagamento = Array.from(datesBetween(addDays(randomDate, parseInt(randomDiasPagamento)), randomVencimento));
        let randomPagamento = datesPagamento.length > 0 ? datesPagamento[getRandom(0, datesPagamento.length-1)] : null;

        if(!await tituloExists(randomTitulo)
        && titulos.filter((titulo) => titulo.S_NUMERO_TITULO == randomTitulo).length == 0) {
            if(pagamentosSkiped < parseInt(quantidade_pagamento) || randomPagamento > new Date()) {
                pagamentosSkiped++;
                randomPagamento = null;
                if(randomVencimento < new Date())
                    randomPagamento = randomVencimento;
            }                

            titulos.push({
                S_SACADO_CNPJ: randomSacado.S_CNPJ,
                O_SACADO_CNPJ: ObjectId(randomSacado._id),
                S_NUMERO_TITULO: randomTitulo,
                D_DATA_EMISSAO: randomDate,
                S_VALOR_TITULO: randomValor,
                D_DATA_VENCIMENTO: addDays(randomVencimento, isWeekend(randomVencimento)),
                D_DATA_PAGAMENTO: randomPagamento,
                O_CEDENTE_CNPJ: ObjectId(cedente),
            });
            i++;
        }
    }
    cb({
        success: true,
        titulos
    });
}

async function generate_file_by_titulos(periodo_inicio, periodo_fim, titulos, cb) {
    let data = new Date().toLocaleDateString().split('-');
    let fileName = 'relato_'+data[0]+data[1]+data[2]+'.txt'
    let file = __dirname + '/files_relato/' + fileName;

    await deleteFile(file);
    Config.getHeaderRelato(periodo_inicio, periodo_fim, (header) => {
        Sacado.getRelacionados(titulos, async ({relacionados: relacionamentos}) => {
            await append(file, Object.values(header).join('')+'\r\n');
            await appendItens(relacionamentos, file);
            await appendItens(titulos, file);
            await append(file, Object.values({
                    S_IDENTIFICACAO: '99',
                    S_QUANTIDADE_RELACIONAMENTO: schemas.LFILLZEROS(relacionamentos.length.toString(), 11),
                    S_BRANCO: schemas.BRANCO(44),
                    S_QUANTIDADE_TITULO: schemas.LFILLZEROS(titulos.length.toString(), 11),
                    S_BRANCO_2: schemas.BRANCO(61)
                }).join(''));

            let envio = new Envio({
                D_PERIODO_INICIO: new Date(periodo_inicio),
                D_PERIODO_FIM: new Date(periodo_fim),
                D_ENVIO: new Date(),
                A_TITULOS: titulos,
                N_QNTD_TITULOS: titulos.length,
                N_QNTD_RELACION: relacionamentos.length
            });
            await envio.save();

            cb({
                status: true,
                fileName: fileName
            });
        })
    });
}

router.use(auth);

function getFileName(data_to_generate, only_payments, cb){
    let data_base = new Date(data_to_generate);
    let first_date = new Date(data_base);
    let last_date = new Date(data_base);
    let date_to_generate = new Date(data_base);

    if(data_base.getDay() == 1) {
        first_date = new Date(first_date.setDate(first_date.getDate()-4));
        last_date = new Date(last_date.setDate(last_date.getDate()-2));
        date_to_generate = new Date(date_to_generate.setDate(date_to_generate.getDate()-3));
    } else if(data_base.getDay() == 2) {
        first_date = new Date(first_date.setDate(first_date.getDate()-4));
        date_to_generate = new Date(date_to_generate.setDate(date_to_generate.getDate()-1));
    } else {
        first_date = new Date(first_date.setDate(first_date.getDate()-2));
        date_to_generate = new Date(date_to_generate.setDate(date_to_generate.getDate()-1));
    }

    if(!only_payments) {
        if (config.selectedCompany === config.COMPANY.CENTRAL
          || config.selectedCompany === config.COMPANY.CONSULT) {
            generate_email_regs(2, 2, date_to_generate, (data) => {
                if(data.success) {
                    generate_file_relato(dateFormat(first_date.setHours(23,59,59), 'mm/dd/yyyy HH:MM:ss'), dateFormat(last_date, 'mm/dd/yyyy HH:MM:ss'), false, (data) => {
                        cb(data);
                    });
                }
            });
        } else if (config.selectedCompany === config.COMPANY.GOLD) {
            generate_email_regs(2, 1, date_to_generate, (data) => {
                if(data.success) {
                    generate_file_relato(dateFormat(first_date.setHours(23,59,59), 'mm/dd/yyyy HH:MM:ss'), dateFormat(last_date, 'mm/dd/yyyy HH:MM:ss'), false, (data) => {
                        cb(data);
                    });
                }
            });
        }
    } else {
        generate_file_relato(dateFormat(first_date.setHours(23,59,59), 'mm/dd/yyyy HH:MM:ss'), dateFormat(last_date, 'mm/dd/yyyy HH:MM:ss'), false, (data) => {
            cb(data);
        });   
    }
}

router.post('/salvarRandomicos', async function(req, res){
    let { titulos } = req.body;
    for(let i = 0; i < titulos.length; i++) {
        let regTitulo = new Titulo({
            O_SACADO_CNPJ: ObjectId(titulos[i].O_SACADO_CNPJ),
            S_NUMERO_TITULO: titulos[i].S_NUMERO_TITULO,
            D_DATA_EMISSAO: titulos[i].D_DATA_EMISSAO,
            S_VALOR_TITULO: titulos[i].S_VALOR_TITULO,
            D_DATA_VENCIMENTO: titulos[i].D_DATA_VENCIMENTO,
            D_DATA_PAGAMENTO: titulos[i].D_DATA_PAGAMENTO,
            O_CEDENTE_CNPJ: ObjectId(titulos[i].O_CEDENTE_CNPJ),
            D_ULTIMO_ENVIO: null
        });
        await regTitulo.save();
    }

    res.json({ success: true });
});

router.post('/gerarRandomicos', function(req, res){
    let {   periodo_inicio, periodo_fim, valor_inicio, valor_fim, titulo_inicio, titulo_fim, 
            quantidade_sacados, cedente, quantidade, dias_inicio_vencimento, dias_fim_vencimento,
            dias_inicio_pagamento, quantidade_pagamento   } = req.body;
    generate_random_regs(periodo_inicio, periodo_fim, valor_inicio, valor_fim, titulo_inicio, titulo_fim, 
                        quantidade_sacados, cedente, quantidade, dias_inicio_vencimento, dias_fim_vencimento,
                        dias_inicio_pagamento, quantidade_pagamento, (data) => res.json(data));
});

router.post('/gerarArquivo', function(req, res){
    let {periodo_inicio, periodo_fim, titulos} = req.body;
    generate_file_by_titulos(periodo_inicio, periodo_fim, titulos, (data) => res.json(data));
});

router.post('/gerarEnvio', function(req, res){
    let {periodo_inicio, periodo_fim, quantidade} = req.body;
    generate_file_relato(periodo_inicio, periodo_fim, quantidade, (data) => res.json(data));
});

router.post('/gerar', function(req, res){
    let {periodo_inicio, periodo_fim} = req.body;
    generate_file_relato(periodo_inicio, periodo_fim, false, (data) => res.json(data));
});

router.get('/download/:fileName', function(req, res){
    let fileName = req.params.fileName;
    let file = __dirname + '/files_relato/' + fileName;
    res.download(file);
  });

router.post('/upload', function(req, res){
    req.files.file.mv(__dirname + '/files_upload/' + req.files.file.name, (err) => {
        if(err) res.json({ result: false });
        else load_file_relato(__dirname + '/files_upload/' + req.files.file.name, (err, data) => {
            if(err) res.json({ result: false });
            else res.json({ result: data });
        });
    });
});

module.exports = {
    router,
    getFileName
};
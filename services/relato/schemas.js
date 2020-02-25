var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('./const');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

if (config.selectedCompany === config.COMPANY.CONSULT) {
    mongoose.connect('mongodb://central-credit_01:daniel234@cluster0-shard-00-00-esq5v.mongodb.net:27017,cluster0-shard-00-01-esq5v.mongodb.net:27017,cluster0-shard-00-02-esq5v.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin', { useMongoClient: false });
} else if (config.selectedCompany === config.COMPANY.GOLD) {
    mongoose.connect('mongodb://dcfranco:daniel234@homolog-shard-00-00-2ygy8.mongodb.net:27017,homolog-shard-00-01-2ygy8.mongodb.net:27017,homolog-shard-00-02-2ygy8.mongodb.net:27017/test?ssl=true&replicaSet=Homolog-shard-0&authSource=admin', { useMongoClient: false });
} else if (config.selectedCompany === config.COMPANY.CENTRAL) {
    mongoose.connect('mongodb://dcfranco:daniel234@francosexperian-shard-00-00-xa0zt.mongodb.net:27017,francosexperian-shard-00-01-xa0zt.mongodb.net:27017,francosexperian-shard-00-02-xa0zt.mongodb.net:27017/test?ssl=true&replicaSet=FrancosExperian-shard-0&authSource=admin', { useMongoClient: false });
}

autoIncrement.initialize(mongoose.connection);

const BRANCO = (x) => Array(x+1).join(' ');
const LFILLZEROS = (WORD, SIZE) => WORD.length < SIZE ? Array((SIZE+1)-WORD.length).join('0') + WORD : WORD;
const RFILLZEROS = (WORD, SIZE) => WORD.length < SIZE ? WORD + Array((SIZE+1)-WORD.length).join('0') : WORD;
const CONVERTDATE = (DATE) => {
    let dt = DATE.toLocaleDateString().split('-');
    return dt[0]+LFILLZEROS(dt[1],2)+LFILLZEROS(dt[2],2);
}

var UserSchema = new Schema({
    S_ID:       Number,
    S_NOME:     String,
    S_USERID:   String,
    S_USERPASS: String,
    D_CADASTRO: Date
});
UserSchema.plugin(autoIncrement.plugin, { field: 'S_ID', model: 'User' });
var User = mongoose.model('User', UserSchema);

var EnvioSchema = new Schema({
    D_PERIODO_INICIO:   Date,
    D_PERIODO_FIM:      Date,
    D_ENVIO:            Date,
    A_TITULOS:          Array,
    N_QNTD_TITULOS:     Number,
    N_QNTD_RELACION:    Number
});
var Envio = mongoose.model('Envio', EnvioSchema);

var CedenteSchema = new Schema({
    S_ID:               Number,
    S_CNPJ:             String,
    S_RAZAO_SOCIAL:     String,
    S_DESATIVADO:       Boolean,
});
CedenteSchema.plugin(autoIncrement.plugin, { field: 'S_ID', model: 'Cedente' });
var Cedente = mongoose.model('Cedente', CedenteSchema);

var SacadoSchema = new Schema({
    S_ID:               Number,
    S_CNPJ:             String,
    S_RAZAO_SOCIAL:     String,
    D_CLIENTE_DESDE:    Date,
    S_TIPO_CLIENTE:     String,
    S_RELACIONADO:      Boolean,
    O_CEDENTE_ORIGIN:   { type: ObjectId, ref: 'Cedente' },
});
SacadoSchema.plugin(autoIncrement.plugin, { field: 'S_ID', model: 'Sacado' });
SacadoSchema.statics.setRelacionado = function(id, relacionado, cb) {
    this.findOneAndUpdate({'S_ID': id}, {S_RELACIONADO: relacionado}, { 'new': true }, cb);
}

SacadoSchema.statics.getRelacionados = async function(titulos, cb) {
    let relacionados = [];
    if(titulos.length > 0) {
        let i = 0;
        while(i < titulos.length){
            let sacado = await this.find({ 'S_CNPJ': titulos[i].S_SACADO_CNPJ }).exec();
            if(sacado && sacado[0] && !sacado[0].S_RELACIONADO) {
                relacionados.push({
                    S_IDENTIFICACAO: '01',
                    S_SACADO_CNPJ: sacado[0].S_CNPJ,
                    S_TIPO_SACADO: '01',
                    S_CLIENTE_DESDE: sacado[0].D_CLIENTE_DESDE ? CONVERTDATE(sacado[0].D_CLIENTE_DESDE) : BRANCO(8),
                    S_TIPO_CLIENTE: sacado[0].S_TIPO_CLIENTE,
                    S_BRANCO: BRANCO(102)
                });
                 Sacado.setRelacionado(sacado[0].S_ID, true, function(err){
                    if(err) console.log(err);
                });
            }
            Titulo.findOneAndUpdate({'S_NUMERO_TITULO': titulos[i].S_NUMERO_TITULO}, {D_ULTIMO_ENVIO: new Date()}, function(err){
                if(err) console.log(err);
            });
            i++;
        }
    }
    cb({
        relacionados
    });
}

var Sacado = mongoose.model('Sacado', SacadoSchema);

var TituloSchema = new Schema({
    S_ID:               Number,
    O_SACADO_CNPJ:      { type: ObjectId, ref: 'Sacado' },
    S_NUMERO_TITULO:    String,
    D_DATA_EMISSAO:     Date,
    S_VALOR_TITULO:     String,
    D_DATA_VENCIMENTO:  Date,
    D_DATA_PAGAMENTO:   Date,
    O_CEDENTE_CNPJ:    { type: ObjectId, ref: 'Cedente' },
    D_ULTIMO_ENVIO:     Date
});
TituloSchema.plugin(autoIncrement.plugin, { field: 'S_ID', model: 'Titulo' });
TituloSchema.statics.getRelatoRegs = function(periodo_inicio, periodo_fim, envio = true, cb){
    this.find({ "$or": [
        {'D_DATA_EMISSAO': { $gt: new Date(periodo_inicio), $lt: new Date(periodo_fim) }},
        {'D_DATA_PAGAMENTO': { $gt: new Date(periodo_inicio), $lt: new Date(periodo_fim) }}
    ]}).populate('O_SACADO_CNPJ').
        populate('O_CEDENTE_CNPJ').
        exec((err, data) => {
            let relacionamentos = [];

            let titulos = data.map((item) => {
                let sacado = item.O_SACADO_CNPJ;
                if(relacionamentos.filter((relacionamento) => relacionamento.S_SACADO_CNPJ == sacado.S_CNPJ).length == 0 && !sacado.S_RELACIONADO){
                    relacionamentos.push({
                        S_IDENTIFICACAO: '01',
                        S_SACADO_CNPJ: sacado.S_CNPJ,
                        S_TIPO_SACADO: '01',
                        S_CLIENTE_DESDE: sacado.D_CLIENTE_DESDE ? CONVERTDATE(sacado.D_CLIENTE_DESDE) : BRANCO(8),
                        S_TIPO_CLIENTE: sacado.S_TIPO_CLIENTE,
                        S_BRANCO: BRANCO(102)
                    });
                    if(envio) {
                        Sacado.setRelacionado(sacado.S_ID, true, function(err){
                            if(err) console.log(err);
                        });
                    }
                }

                if(envio) {
                    this.findOneAndUpdate({'_id': item._id}, {D_ULTIMO_ENVIO: new Date()}, function(err){
                        if(err) console.log(err);
                    });
                }

                return {
                    S_IDENTIFICACAO: '01',
                    S_SACADO_CNPJ: item.O_SACADO_CNPJ.S_CNPJ,
                    S_TIPO_SACADO: '05',
                    S_NUMERO_TITULO: LFILLZEROS(item.S_NUMERO_TITULO, 10),
                    S_DATA_EMISSAO: item.D_DATA_EMISSAO ? CONVERTDATE(item.D_DATA_EMISSAO) : BRANCO(8),
                    S_VALOR_TITULO: LFILLZEROS(item.S_VALOR_TITULO, 13),
                    D_DATA_VENCIMENTO: item.D_DATA_VENCIMENTO ? CONVERTDATE(item.D_DATA_VENCIMENTO) : BRANCO(8),
                    D_DATA_PAGAMENTO: item.D_DATA_PAGAMENTO ? CONVERTDATE(item.D_DATA_PAGAMENTO) : BRANCO(8),
                    S_ZERO: LFILLZEROS('0', 34),
                    S_BRANCO: BRANCO(1),
                    S_CEDENTE_CNPJ: item.O_CEDENTE_CNPJ.S_CNPJ,
                    S_TIPO_DOCUMENTO: 'DP',
                    S_BRANCO_2: BRANCO(1),
                    S_TIPO_NEGOCIO: 'CO',
                    S_TIPO_INFORMACAO: 'CE',
                    S_TIPO_CARTEIRA: 'CS',
                    S_BRANCO_3: BRANCO(5)
                }
            });

            cb({
                titulos,
                relacionamentos,
                trailer: {
                    S_IDENTIFICACAO: '99',
                    S_QUANTIDADE_RELACIONAMENTO: LFILLZEROS(relacionamentos.length.toString(), 11),
                    S_BRANCO: BRANCO(44),
                    S_QUANTIDADE_TITULO: LFILLZEROS(titulos.length.toString(), 11),
                    S_BRANCO_2: BRANCO(61)
                }
            });

            if(envio) {
                let envio = new Envio({
                    D_PERIODO_INICIO: new Date(periodo_inicio),
                    D_PERIODO_FIM: new Date(periodo_fim),
                    D_ENVIO: new Date(),
                    A_TITULOS: titulos,
                    N_QNTD_TITULOS: titulos.length,
                    N_QNTD_RELACION: relacionamentos.length
                });
                envio.save();
            }
        });
}
var Titulo = mongoose.model('Titulo', TituloSchema);

var ConfigSchema = new Schema({
    S_EMPRESA_CNPJ:     String
});
ConfigSchema.statics.getHeaderRelato = function(periodo_inicio, periodo_fim, cb){
    this.findOne(function(err, data){
        const new_day_end = new Date(periodo_fim).getDate()-1;
        const date_end = new Date(periodo_fim).setDate(new_day_end);

        const new_day_ini = new Date(periodo_inicio).getDate();
        const date_ini = new Date(periodo_inicio).setDate(new_day_ini);
        cb({
            S_IDENTIFICACAO: '00',
            S_CONST_RELATO: 'RELATO COMP NEGOCIOS',
            S_EMPRESA_CNPJ: data.S_EMPRESA_CNPJ,
            S_PERIODO_DATA_INICIO: CONVERTDATE(new Date(date_ini)),
            S_PERIODO_DATA_FIM: CONVERTDATE(new Date(date_end)),
            S_PERIODICIDADE: 'D',
            S_BRANCO_1: BRANCO(15),
            S_CODIGO_SEGMENTO: '028',
            S_BRANCO_2: BRANCO(29),
            S_VERSAO_LAYOUT: 'V.01',
            S_BRANCO_3: BRANCO(25)
        });
    });
}
var Config = mongoose.model('Config', ConfigSchema);

module.exports = {
    Titulo,
    Sacado,
    Cedente,
    Config,
    Envio,
    User,
    LFILLZEROS,
    RFILLZEROS,
    BRANCO,
    CONVERTDATE
}
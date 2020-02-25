var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var fileUpload = require("express-fileupload");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var schedule = require("node-schedule");
var dateFormat = require("dateformat");

var alteracoes = require("./alteracoes");
var consultas = require("./consultas");
var cadastros = require("./cadastros");
var relato = require("./relato");
var acao = require("./acao");
var email = require("./email");

var { User, Config } = require("./schemas");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use("/alterar", alteracoes);
app.use("/consulta", consultas);
app.use("/cadastro", cadastros);
app.use("/relato", relato.router);
app.use("/acao", acao.router);
app.use("/email", email.router);

app.post("/setup", function(req, res) {
  let user = new User({
    S_NOME: "Jean Carlos Franco",
    S_USERID: "jcfranco",
    S_USERPASS: "123456",
    D_CADASTRO: new Date()
  });
  user.save(function() {
    res.json({
      success: true
    });
  });
});

app.post("/company", function(req, res) {
  let config = new Config({
    S_EMPRESA_CNPJ: "45204936000172"
  });
  config.save(function() {
    res.json({
      success: true
    });
  });
});

app.post("/authenticate", async function(req, res) {
  try {
    let user = await User.findOne({ S_USERID: req.body.S_USERID }).exec();
    if (user && user.S_USERPASS == req.body.S_USERPASS) {
      const payload = {
        S_NOME: user.S_NOME,
        S_USERID: user.S_USERID,
        D_CADASTRO: user.D_CADASTRO
      };

      let token = jwt.sign(payload, "superpasstokenuser", {
        expiresIn: "24h"
      });
      res.json({
        success: true,
        token: token
      });
    } else {
      res.json({
        success: false
      });
    }
  } catch (e) {
    console.log(e);
  }
});

var checkdirs = function() {
  let dirs = ["/files_upload", "/files_relato"];
  dirs.map(dir => {
    if (!fs.existsSync(__dirname + dir)) {
      fs.mkdirSync(__dirname + dir);
      console.log(`Created dir: ${__dirname + dir}`);
    }
  });
};

app.listen(process.env.PORT || 5000, function() {
  process.env.TZ = "America/Sao_Paulo";
  console.log(`Relato listening on port ${process.env.PORT}!`);
  checkdirs();

  // schedule.scheduleJob('00 08 * * *', function(){
  //     const currentDate = new Date();
  //     if(currentDate.getDay() != 0 && currentDate.getDay() != 6) {
  //         acao.payTitles().then(() => {
  //             email.generateAndSendFile(dateFormat(currentDate, 'mm/dd/yyyy'), false, () => {
  //                 console.log('Sended');
  //             })
  //         });
  //     }
  // });
});

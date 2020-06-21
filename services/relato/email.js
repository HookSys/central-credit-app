var mongoose = require('mongoose')
var express = require('express')
var auth = require('./auth')
var router = express.Router()
var nodemailer = require('nodemailer')
var dateFormat = require('dateformat')
var config = require('./const')

var { getFileName } = require('./relato')
var { payTitles } = require('./acao')

//router.use(auth);

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'dann.c@live.com',
    pass: 'daniel098'
  }
})

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function generateAndSendFile(date, only_payments, cb) {
  const date_obj = new Date(date)

  getFileName(date, only_payments, data => {
    if (data.fileName) {
      var mailOptions = {
        from: 'dann.c@live.com',
        // to: 'franco@serasablumenau.com.br',
        to: 'dann.c@live.com',
        subject: `Arquivo Serasa ${zeroFill(date_obj.getDate() - 1)}/${zeroFill(
          date_obj.getMonth() + 1
        )}/${date_obj.getFullYear()} - ${config.selectedCompany}`,
        text: 'Segue arquivo do Serasa em anexo',
        attachments: [
          {
            path: __dirname + '/files_relato/' + data.fileName
          }
        ]
      }
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error)
          cb({ sended: false })
        } else {
          console.log('Email sent: ' + info.response)
          cb({ sended: true })
        }
      })
    } else {
      cb({ sended: false })
    }
  })
}

function sendTest() {
  var mailOptions = {
    from: 'dafrannco@gmail.com',
    to: 'dann.c@live.com',
    subject: 'Arquivo Serasa',
    text: 'Teste de hora'
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

router.post('/send', function(req, res) {
  const { database, only_payments } = req.body
  payTitles().then(() => {
    generateAndSendFile(new Date(database), only_payments === 'S', sended => {
      res.json({ sended: sended })
    })
  })
})

module.exports = {
  router,
  sendTest,
  generateAndSendFile
}

const SMS = require('./send-sms');
const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fs = require('fs');
const Promise = require('bluebird');

module.exports = function (app) {
    app.post("/sms/send", function (req, res) {
        
        switch (req.body.idStatus) {
            case 1:
                this.message = "Teste 1";
                break;
            case 2:
                this.message = "Teste 2";
                break;
            case 3:
                this.message = "Teste 3";
                break;
            case 4:
                this.message = "Teste 4";
                break;
            case 5:
                this.message = "Teste 5";
                break;
            case 6:
                this.message = "Teste 6";
                break;
            case 7:
                this.message = "Teste 7";
                break;
            case 8:
                this.message = "Teste 8";
                break;
        }

        var req = {
            method: 'GET',
            url: '/phonebyquote?quoteId=' + that.IdQuote,
            dataType: 'json',
        }

        const data = $http(req)
            .then(function (res) {
                return res.data[0];
            })
            .catch(function (err) {
                console.log(err);
            });
        
        if (data.length) {
            return new Promise(function (resolve, reject) {
                new SMS({ number: data, message: this.message });
                    mensagem.send()
                    .then(sucess => console.log(sucess))
                    .catch(err => console.log)
            });
        }
    });
}
const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const Connection = require('../config/database');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render("home", {
            page: { url: 'home' },
        });
    });

    app.get('/loja', function (req, res) {
        res.render("loja", {
            page: { url: 'loja' },
        });
    });

    app.get('/home', function (req, res) {
        res.render("home", {
            page: { url: 'home' },
        });
    });

    app.get('/carro/:clientId', function (req, res) {
        res.render("carro", {
            page: { url: 'carro' }
        });
    });

    app.get('/cliente', function (req, res) {
        res.render("cliente", {
            page: { url: 'cliente' },
        });
    });

    app.get('/orcamento/:orcamento/step', function (req, res) {
        res.render("orcamentoStep", {
            page: { url: 'orcamentoStep' },
        });
    });

    app.get('/orcamento/:vehicleId', function (req, res) {
        res.render("orcamento", {
            page: { url: 'orcamento' },
        });
    });



    app.get('/orcamento/:orcamento/aceite', function (req, res) {
        res.render("orcamentoAceite", {
            page: { url: 'orcamentoAceite' },
        });
    });
}


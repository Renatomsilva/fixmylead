const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const Connection = require('../config/database');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render("index", {
            page: { url: 'index' },
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
            page: { url: 'carro' },
            clientId : req.params.clientId
        });
    });

    app.get('/cliente', function (req, res) {
        res.render("cliente", {
            page: { url: 'cliente' },
        });
    });

    app.get('/orcamento/:vehicleId', function (req, res) {
        res.render("orcamento", {
            page: { url: 'orcamento' },
        });
    });
}


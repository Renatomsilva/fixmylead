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

    app.get('/carro', function (req, res) {
        res.render("carro", {
            page: { url: 'carro' },
        });
    });
}


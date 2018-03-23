const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const Connection = require('../config/database');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile('./public/index.html', { root: '.' });

        const conn = Connection.getSqlConnection();
    });
    
}


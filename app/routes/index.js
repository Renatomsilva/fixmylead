const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile('./public/index.html', { root: '.' });
    });
    
}


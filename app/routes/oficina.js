const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fs = require('fs');


module.exports = function (app) {
    app.get("/oficina", function (req, res) {
        console.log(process.env.CACHE_PASSWORD);
    });
}
const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fs = require('fs');
const Connection = require('../config/database');
const Promise = require('bluebird');

module.exports = function (app) {
    app.post("/oficina", function (req, res) {
        const name = 'Renato';
        console.log(process.env.CACHE_PASSWORD);
        const query = 'select * from tb_Cliente where nome = ?;';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query,[name] )
          .then((rows) => {
            console.log(rows)
          })).catch(err => {
              console.log(err);
          })
    });

    app.get("/cliente/:name", function (req, res) {
        const name = 'Renato';
        console.log(process.env.CACHE_PASSWORD);
        const query = 'select * from tb_Cliente where nome = ?;';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query,[req.params.name] )
          .then((rows) => {
            console.log(rows)
            res.status(200).send(rows);
          })).catch(err => {
              console.log(err);
              res.status(200).send('erro');
          })
    });
}
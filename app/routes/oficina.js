const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fs = require('fs');
const Connection = require('../config/database');
const Promise = require('bluebird');

module.exports = function (app) {
    app.post("/client/insert", function (req, res) {
        const query = 'INSERT INTO tb_Cliente (nome, cpf, email, telefone) VALUES (?, ?, ?, ?);';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.name, req.body.cpf, req.body.email, req.body.phone])
          .then(() => {
            res.status(200).send({
                'sucess': true,
                'message': 'Cadastro realizado com sucesso!'
            });
          })).catch(err => {
            res.status(200).send(err);
          })
    });

    app.get("/client/:name", function (req, res) {
        const query = 'SELECT nome, cpf, email, telefone, dataInclusao FROM tb_Cliente WHERE nome LIKE ?;';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, '%' + [req.params.name] + '%')
          .then((rows) => {
            res.status(200).send(rows);
          })).catch(err => {
            res.status(200).send(err);
          })
    });

    app.post("/vehicle/insert", function (req, res) {
        const query = 'INSERT INTO tb_Veiculo (idCliente, placa, marca, modelo, versao, ano) VALUES (?, ?, ?, ?, ?, ?);';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.clientId, req.body.plate, req.body.make, req.body.model, req.body.version, req.body.year])
          .then(() => {
            res.status(200).send({
                'sucess': true,
                'message': 'Cadastro realizado com sucesso!'
            });
          })).catch(err => {
            res.status(200).send(err);
          })
    });

    app.get("/vehicle", function (req, res) {
        const query = 'SELECT C.nome, C.email, C.cpf, C.telefone, V.placa, V.marca, V.modelo, V.versao, V.ano FROM tb_Veiculo V JOIN tb_Cliente C ON V.idCliente = C.idCliente WHERE (C.nome LIKE ? OR ? is null) AND (C.email LIKE ? OR ? is null) AND (C.cpf LIKE ? OR ? is null) AND (V.placa LIKE ? OR ? is null) AND (V.marca LIKE ? OR ? is null) AND (V.modelo LIKE ? OR ? is null) AND (V.versao LIKE ? OR ? is null) AND (V.ano LIKE ? OR ? is null);';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [ ('%' + req.query.clientName + '%' || null), (req.query.clientName || null), ('%' + req.query.email + '%' || null), (req.query.email || null), ('%' + req.query.cpf + '%' || null), (req.query.cpf || null), ('%' + req.query.plate + '%' || null), (req.query.plate || null), ('%' + req.query.make + '%' || null), (req.query.make || null), ('%' + req.query.model + '%' || null), (req.query.model || null), ( '%' + req.query.version + '%' || null), (req.query.version || null), ('%' + req.query.year + '%' || null), ( req.query.year || null) ])
          .then((rows) => {
            res.status(200).send(rows);
          })).catch(err => {
            res.status(200).send(err);
          })
    });

    app.post("/service/insert", function (req, res) {
        const query = 'INSERT INTO tb_OrdemServico (descricao, orcamento, prazoEstimado, idVeiculo, idStatus) VALUES (?, ?, ?, ?, ?);';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.description, req.body.quote, req.body.deadline, req.body.vehicleId, req.body.statusId])
          .then(() => {
            res.status(200).send({
                'sucess': true,
                'message': 'Cadastro realizado com sucesso!'
            });
          })).catch(err => {
            res.status(200).send(err);
          })
    });

    app.get("/service", function (req, res) {
        const query = 'select C.nome, C.email, C.cpf, C.telefone, V.marca, V.modelo, V.versao, V.ano, V.placa, OS.descricao, OS.orcamento, OS.prazoEstimado from tb_OrdemServico OS JOIN tb_Veiculo V ON OS.idVeiculo = V.idVeiculo JOIN tb_Cliente C ON V.idCliente = C.idCliente WHERE (C.nome LIKE ? OR ? is null) AND (C.email LIKE ? OR ? is null) AND (C.cpf LIKE ? OR ? is null) AND (V.placa LIKE ? OR ? is null) AND (V.marca LIKE ? OR ? is null) AND (V.modelo LIKE ? OR ? is null) AND (V.versao LIKE ? OR ? is null) AND (V.ano LIKE ? OR ? is null);';
        return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [ ('%' + req.query.clientName + '%' || null), (req.query.clientName || null), ('%' + req.query.email + '%' || null), (req.query.email || null), ('%' + req.query.cpf + '%' || null), (req.query.cpf || null), ('%' + req.query.plate + '%' || null), (req.query.plate || null), ('%' + req.query.make + '%' || null), (req.query.make || null), ('%' + req.query.model + '%' || null), (req.query.model || null), ( '%' + req.query.version + '%' || null), (req.query.version || null), ('%' + req.query.year + '%' || null), ( req.query.year || null) ])
          .then((rows) => {
            res.status(200).send(rows);
          })).catch(err => {
            res.status(200).send(err);
          })
    });
}
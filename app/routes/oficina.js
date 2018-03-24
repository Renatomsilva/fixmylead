const config = require('nconf');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fs = require('fs');
const Connection = require('../config/database');
const Promise = require('bluebird');
const SMS = require('../helpers/send-sms');

module.exports = function (app) {
  app.post("/client/insert", function (req, res) {
    const query = 'INSERT INTO tb_Cliente (nome, email, telefone) VALUES (?, ?, ?); SELECT LAST_INSERT_ID() AS idCliente;';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.name, req.body.email, req.body.phone])
      .then((rows) => {
        res.status(200).send({
          'success': true,
          'message': 'Cadastro realizado com sucesso!',
          'idCliente': rows[1][0].idCliente
        });
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.get("/client", function (req, res) {
    const query = 'SELECT idCliente, nome, email, telefone, dataInclusao FROM tb_Cliente WHERE (nome LIKE ? OR ? is null) AND (email LIKE ? OR ? is null);';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [('%' + req.query.clientName + '%' || null), (req.query.clientName || null), ('%' + req.query.email + '%' || null), (req.query.email || null)])
      .then((rows) => {
        res.status(200).send(rows);
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.post("/vehicle/insert", function (req, res) {
    const query = 'INSERT INTO tb_Veiculo (idCliente, placa, marca, modelo, versao, ano) VALUES (?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID() AS idVeiculo;';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.clientId, req.body.plate, req.body.make, req.body.model, req.body.version, req.body.year])
      .then((rows) => {
        res.status(200).send({
          'success': true,
          'message': 'Cadastro realizado com sucesso!',
          'idVeiculo': rows[1][0].idVeiculo
        });
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.get("/vehicle", function (req, res) {
    const query = 'SELECT C.nome, C.email, C.telefone, V.placa, V.marca, V.modelo, V.versao, V.ano FROM tb_Veiculo V JOIN tb_Cliente C ON V.idCliente = C.idCliente WHERE (C.nome LIKE ? OR ? is null) AND (C.email LIKE ? OR ? is null) AND (V.placa LIKE ? OR ? is null) AND (V.marca LIKE ? OR ? is null) AND (V.modelo LIKE ? OR ? is null) AND (V.versao LIKE ? OR ? is null) AND (V.ano LIKE ? OR ? is null);';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [('%' + req.query.clientName + '%' || null), (req.query.clientName || null), ('%' + req.query.email + '%' || null), (req.query.email || null), ('%' + req.query.plate + '%' || null), (req.query.plate || null), ('%' + req.query.make + '%' || null), (req.query.make || null), ('%' + req.query.model + '%' || null), (req.query.model || null), ('%' + req.query.version + '%' || null), (req.query.version || null), ('%' + req.query.year + '%' || null), (req.query.year || null)])
      .then((rows) => {
        res.status(200).send(rows);
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.post("/service/insert", function (req, res) {
    const query = 'INSERT INTO tb_OrdemServico (descricao, orcamento, prazoEstimado, idVeiculo, idStatus) VALUES (?, ?, ?, ?, ?);';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [req.body.description, req.body.quote, req.body.deadline, req.body.vehicleId, req.body.statusId])
      .then((rows) => {
        res.status(200).send({
          'success': true,
          'message': 'Cadastro realizado com sucesso!'
        });
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.get("/service", function (req, res) {
    const query = 'select C.nome, C.email, C.telefone, V.marca, V.modelo, V.versao, V.ano, V.placa, OS.descricao, OS.orcamento, OS.prazoEstimado, OS.idOrdemServico as idOrdemServico,  SC.idStatus as idStatus, SC.descricao as status from tb_OrdemServico OS JOIN tb_Veiculo V ON OS.idVeiculo = V.idVeiculo JOIN tb_Cliente C ON V.idCliente = C.idCliente JOIN tb_statusConserto SC ON OS.idStatus = SC.idStatus AND SC.Ativo = 1 WHERE (C.nome LIKE ? OR ? is null) AND (C.email LIKE ? OR ? is null) AND (V.placa LIKE ? OR ? is null) AND (V.marca LIKE ? OR ? is null) AND (V.modelo LIKE ? OR ? is null) AND (V.versao LIKE ? OR ? is null) AND (V.ano LIKE ? OR ? is null) AND SC.idStatus not in (4, 8) AND (C.idCliente LIKE ? OR ? is null) AND (OS.idOrdemServico LIKE ? OR ? is null);';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [('%' + req.query.clientName + '%' || null), (req.query.clientName || null), ('%' + req.query.email + '%' || null), (req.query.email || null), ('%' + req.query.plate + '%' || null), (req.query.plate || null), ('%' + req.query.make + '%' || null), (req.query.make || null), ('%' + req.query.model + '%' || null), (req.query.model || null), ('%' + req.query.version + '%' || null), (req.query.version || null), ('%' + req.query.year + '%' || null), (req.query.year || null), ('%' + req.query.idCliente + '%' || null), (req.query.idCliente || null), ('%' + req.query.idOrdemServico + '%' || null), (req.query.idOrdemServico || null)])
      .then((rows) => {
        res.status(200).send(rows);
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.get("/status", function (req, res) {
    const query = 'select idStatus, descricao from tb_statusConserto where ativo = 1;';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query)
      .then((rows) => {
        res.status(200).send(rows);
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.get("/phonebyquote", function (req, res) {
    const query = 'select C.telefone from tb_Cliente C JOIN tb_Veiculo V ON C.idCliente = V.idCliente JOIN tb_OrdemServico OS ON V.idVeiculo = OS.idVeiculo WHERE OS.idOrdemServico = ?;';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [(req.query.idQuote)])
      .then((rows) => {
        res.status(200).send(rows);
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.post("/updatestatus", function (req, res) {
    const query = 'UPDATE tb_OrdemServico SET idStatus = ? WHERE idOrdemServico = ?;';
    return Promise.using(Connection.getSqlConnection(), connection => connection.query(query, [(req.body.idStatus),(req.body.idQuote)])
      .then(() => {
        res.status(200).send({
          'success': true
        });
      })).catch(err => {
        res.status(200).send(err);
      })
  });

  app.post("/send", function (req, res) {

    const idStatus = req.body.idStatus;
    const idQuote = req.body.idQuote;
    let mensagem = "";

    switch (idStatus) {
      case 1:
        mensagem = "Teste 1";
        break;
      case 2:
        mensagem = "Teste 2";
        break;
      case 3:
        mensagem = "Teste 3";
        break;
      case 4:
        mensagem = "Teste 4";
        break;
      case 5:
        mensagem = "Teste 5";
        break;
      case 6:
        mensagem = "Teste 6";
        break;
      case 7:
        mensagem = "Teste 7";
        break;
      case 8:
        mensagem = "Teste 8";
        break;
    }

    var req = {
      method: 'GET',
      url: 'http://localhost:4000/phonebyquote?idQuote=' + idQuote,
      json: true
    }

    var req2 = {
      method: 'POST',
      uri: 'http://localhost:4000/updatestatus',
      json: true,
      body: {
        'idStatus': idStatus,
        'idQuote': idQuote
      }
    }

    return rp(req2)
      .then(result => {
        return rp(req)
      })
      .then(function (res) {
        const message = new SMS({ number: res[0].telefone, message: mensagem });
        return message.send()
      })
      .then(sucess => res.status(200).send({ success: true, message: 'Status Modificado com Sucesso', idStatus: idStatus }))
      .catch(err => {
        console.log(err)
      });
  });
}
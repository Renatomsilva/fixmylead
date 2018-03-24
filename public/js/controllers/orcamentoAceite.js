angular.module('fixMyLead').controller('OrcamentoAceiteController', OrcamentoAceiteController);

OrcamentoAceiteController.$inject = ['$scope', 'toastr', '$cookies', '$http' , '$location'];

function OrcamentoAceiteController($scope, toastr, $cookies, $http, $location) {

  var vm = this;

  vm.aceito = aceito;
  vm.orcamento = {};

  function aceito(orcamento, status) {

    if(orcamento.idStatus == 5)
      toastr.success('Orçamento já aceito', 'Sucesso');
    if(orcamento.idStatus == 4)
      toastr.success('Orçamento já recusado', 'Sucesso');
    else {
    var req = {
      method: 'POST',
      url: '/send',
      dataType: 'json',
      data: {
        idQuote : parseInt(orcamento.idOrdemServico),
        idStatus : status ? 5 : 4,
        name: orcamento.nome,
        make: orcamento.marca,
        model: orcamento.modelo
      }
    }

    return $http(req)
      .then(function (res) {
        if(res.data.success){
          toastr.success('Status alterado com sucesso', 'Sucesso');
          vm.orcamento.idStatus = res.data.idStatus;
        }else
          toastr.success('Erro ao alterar o status', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }

  function getOrcamento(orcamento) {

    var req = {
      method: 'GET',
      url: '/service?idOrdemServico=' + parseInt(orcamento.idOrdemServico),
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        if(res.data){
          vm.orcamento = res.data[0];
        }else
          toastr.error('Erro ao Buscar Orçamento', 'Erro');
      })
      .catch(function (err) {
        console.log(err);
      })

  }
  
  function init(){
    vm.orcamento.idOrdemServico = $location.absUrl().split('/')[4] || null ;
    getOrcamento(vm.orcamento);
  }

  init();
}
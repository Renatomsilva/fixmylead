angular.module('fixMyLead').controller('OrcamentoStepController', OrcamentoStepController);

OrcamentoStepController.$inject = ['$scope', 'toastr', '$cookies', '$http' , '$location'];

function OrcamentoStepController($scope, toastr, $cookies, $http, $location) {

  var vm = this;

  vm.chageStatus = changeStatus;
  vm.compare = compare;
  vm.orcamento = {};

  function changeStatus(orcamento, status) {

    var req = {
      method: 'POST',
      url: '/send',
      dataType: 'json',
      data: {
        idQuote : parseInt(orcamento.idOrdemServico),
        idStatus : status
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

  function getOrcamento(orcamento) {

    var req = {
      method: 'GET',
      url: '/service?idOrdemServico' + parseInt(orcamento.idOrdemServico),
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
  
  function compare(status , compare){
      return status === compare ? true : false; 
  }

  function init(){
    vm.orcamento.idOrdemServico = $location.absUrl().split('/')[4] || null ;
    getOrcamento(vm.orcamento);
  }

  init();
}
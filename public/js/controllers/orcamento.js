angular.module('fixMyLead').controller('OrcamentoController', OrcamentoController);

OrcamentoController.$inject = ['$scope', 'toastr', '$cookies', '$http' , '$location'];

function OrcamentoController($scope, toastr, $cookies, $http, $location) {

  var vm = this;

  vm.save = save;
  vm.search = search;
  vm.searchId = searchId;
  vm.viewOrcamento = false;
  vm.orcamento = {};
  vm.populateCombos = populateCombos;

  function save(orcamento) {

    var req = {
      method: 'POST',
      url: '/service/insert',
      dataType: 'json',
      data: {
        description: orcamento.descricao,
        quote: orcamento.orcamento,
        deadline: orcamento.prazoEstimado,
        vehicleId: parseInt(orcamento.vehicleId),
        statusId: parseInt($scope.selected)
      }
    }

    return $http(req)
      .then(function (res) {
        if(res.data.success) {
          toastr.success('Ordem de Serviço cadastrada com sucesso', 'Sucesso');
        } else
          toastr.success('Erro ao cadastrar o Ordem de Serviço', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  function search(query) {
    var req = {
      method: 'GET',
      url: '/service?plate=' + query.plate,
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        if(res.data.length){  
          vm.find = true;
          vm.orcamento = res.data[0];
        }
        else {
          vm.find = false;
        }
        vm.viewOrcamento = true;
        if(vm.orcamento && vm.orcamento.idStatus)
          $scope.selected = vm.orcamento.idStatus.toString();
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  function searchId(idVeiculo) {
    var req = {
      method: 'GET',
      url: '/service?idVeiculo=' + idVeiculo,
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        if(res.data.length){  
          vm.find = true;
          vm.orcamento = res.data[0];
        }
        else {
          vm.find = false;
        }
        vm.viewOrcamento = true;
        $scope.selected = vm.orcamento.idStatus.toString();
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  function init(){
    vm.orcamento.vehicleId = $location.absUrl().split('/')[4] || null ;
    if(vm.orcamento && vm.orcamento.vehicleId)
      vm.searchId(vm.orcamento.vehicleId);
  }

  function populateCombos(){
    var req = {
        method: 'GET',
        url: '/status',
        dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        vm.listStatus = res.data;
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  init();
}
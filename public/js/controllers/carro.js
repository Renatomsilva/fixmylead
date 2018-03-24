angular.module('fixMyLead').controller('CarroController', CarroController);

CarroController.$inject = ['$scope', 'toastr', '$cookies', '$http' , '$location'];

function CarroController($scope, toastr, $cookies, $http, $location) {

  var vm = this;

  vm.save = save;
  vm.search = search;
  vm.viewCarro = false;
  vm.carro = {};

  function save(carro) {

    var req = {
      method: 'POST',
      url: '/vehicle/insert',
      dataType: 'json',
      data: {
        clientId : parseInt(carro.clientId),
        plate : carro.placa,
        make : carro.marca,
        model : carro.modelo,
        version : carro.versao,
        year : carro.ano,
      }
    }

    return $http(req)
      .then(function (res) {
        if(res.data.success){
          toastr.success('Carro cadastrado com sucesso', 'Sucesso');
          vm.carro = {};
        }else
          toastr.success('Erro ao cadastrar o carro', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
      })


  }

  function search(query) {
    var req = {
      method: 'GET',
      url: '/vehicle?plate=' + query.plate,
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        if(res.data.length){  
          vm.find = true;
          vm.carro = res.data[0];
        }
        else {
          vm.carro.placa = query.plate ;
          vm.find = false;
        }
        vm.viewCarro = true;
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  function init(){
    vm.carro.clientId = $location.absUrl().split('/')[4] || null ;
  }

  init();
}
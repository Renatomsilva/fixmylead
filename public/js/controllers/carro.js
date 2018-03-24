angular.module('fixMyLead').controller('CarroController', CarroController);

CarroController.$inject = ['$scope', 'toastr', '$cookies', '$http'];

function CarroController($scope, toastr, $cookies, $http) {

  var vm = this;

  vm.save = save;
  vm.search = search;

  function save(carro) {

    var req = {
      method: 'POST',
      url: '/vehicle/insert',
      dataType: 'json',
      data: {
        clientId : 1 , //carro.clientId,
        plate : carro.plate,
        make : carro.make,
        model : carro.model,
        version : carro.version,
        year : carro.year,
      }
    }

    return $http(req)
      .then(function (res) {
        if(res.data.success) 
          toastr.success('Carro cadastrado com sucesso', 'Sucesso');
        else
          toastr.success('Erro ao cadastrar o carro', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
      })


  }

  function search(carro) {
    var req = {
      method: 'GET',
      url: '/client/Renato',
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      })

  }
}
angular.module('fixMyLead').controller('ClienteController', ClienteController);

ClienteController.$inject = ['$scope', 'toastr', '$cookies', '$http'];

function ClienteController($scope, toastr, $cookies, $http) {

  var vm = this;

  vm.save = save;
  vm.listaClientes = listaClientes;

  function save(cliente) {

    var req = {
      method: 'POST',
      url: '/client/insert',
      dataType: 'json',
      data: {
        name : cliente.name,
        plate : cliente.plate,
        make : cliente.make,
        model : cliente.model,
        version : cliente.version,
        year : cliente.year,
      }
    }

    return $http(req)
      .then(function (res) {
        if(res.data.success) 
          toastr.success('cliente cadastrado com sucesso', 'Sucesso');
        else
          toastr.success('Erro ao cadastrar o cliente', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
      })


  }

  function listaClientes(cliente) {
    var req = {
      method: 'GET',
      url: '/client/',
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
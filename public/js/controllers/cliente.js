angular.module('fixMyLead').controller('ClienteController', ClienteController);

ClienteController.$inject = ['$scope', 'toastr', '$cookies', '$http', '$location'];

function ClienteController($scope, toastr, $cookies, $http, $location) {

  var vm = this;

  vm.save = save;
  vm.search = search;
  vm.newVehicle = newVehicle;
  vm.viewCliente = false;

  function save(cliente) {

    var req = {
      method: 'POST',
      url: '/client/insert',
      dataType: 'json',
      data: {
        name : cliente.nome,
        email : cliente.email,
        phone : cliente.telefone
      }
    };

    return $http(req)
      .then(function (res) {
        if(res.data.success) {
          toastr.success('cliente cadastrado com sucesso', 'Sucesso');
          setTimeout(() => {
              window.location = "/carro/" + res.data.idCliente;
          }, 1000);
        }
        else
          toastr.success('Erro ao cadastrar o cliente', 'Sucesso');
      })
      .catch(function (err) {
        console.log(err);
    });
  }

  function search(query) {
    var req = {
      method: 'GET',
      url: '/client?email=' + query.email,
      dataType: 'json',
    }

    return $http(req)
      .then(function (res) {
        if (res.data.length){
            vm.find = true;
            vm.cliente = res.data[0];
        }
        else {
            vm.cliente = { email : query.email };
            vm.find = false;
        }

        vm.viewCliente = true;
      })
      .catch(function (err) {
        console.log(err);
    });
  }

  function newVehicle(cliente) {
        window.location = "/carro/" + cliente.idCliente;
  }
}
angular.module('fixMyLead').controller('CarroController', CarroController);

CarroController.$inject = ['$scope', 'toastr', '$cookies', '$http'];

function CarroController($scope, toastr, $cookies, $http) {

  var vm = this;

  vm.save = save;
  vm.search = search;

  function save(carro) {
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
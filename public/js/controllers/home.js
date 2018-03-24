angular.module('fixMyLead').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'toastr', '$cookies', '$http'];

function HomeController($scope, toastr, $cookies, $http) {

    var vm = this;

    vm.listaCarros = listaCarros;

    function listaCarros () {

      var req = {
        method: 'GET',
        url: '/service/',
        dataType: 'json',
      }
  
      return $http(req)
        .then(function (res) {
          vm.carros = res.data;
        })
        .catch(function (err) {
          console.log(err);
        })
    }
}
angular.module('fixMyLead').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'toastr', '$cookies'];

function HomeController($scope, toastr, $cookies) {

    var vm = this;

    vm.listaCarros = listaCarros;

    function listaCarros () {

      vm.carros = [{
        placa : "AAA-123",
        modelo : "CIVIC",
        order : {
          status : "em andamento"
        }
      },{
        placa : "AAA-456",
        modelo : "FUSCA",
        order : {
          status : "em andamento"
        }
      },{
        placa : "AAA-982",
        modelo : "MAREA",
        order : {
          status : "em andamento"
        }
      },{
        placa : "AAA-213",
        modelo : "MAVERIC",
        order : {
          status : "em andamento"
        }
      },{
        placa : "AAA-213",
        modelo : "MAVERIC",
        order : {
          status : "em andamento"
        }
      },{
        placa : "AAA-213",
        modelo : "MAVERIC",
        order : {
          status : "em andamento"
        }
      }]

    }
}
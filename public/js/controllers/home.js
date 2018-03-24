angular.module('fixMyLead').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'toastr', '$cookies', '$http'];

function HomeController($scope, toastr, $cookies, $http) {

    var vm = this;

    vm.listaCarros = listaCarros;
    vm.setDays = setDays;

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

    function setDays (hours) {
      const hoursLeft = hours % 24;
      const days = (hours - hoursLeft) / 24;
      if( hoursLeft > 0 && days > 0 )
        return ' ' + days + ' dias e ' + hoursLeft + ' horas';
      if( hoursLeft > 0 && days <= 0 )
        return ' ' +  hoursLeft + ' horas';
      if( hoursLeft <= 0 && days > 0 )
        return ' ' + days + ' dias ';
    }
}
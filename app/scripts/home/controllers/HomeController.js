'use strict';

/**
 * @ngdoc function
 * @name bmIonic.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('bmIonic.home')
  .controller('HomeController', function($scope, $state, ExampleService, $ionicLoading) {


  var vm = angular.extend(this, {
    myHtml: [],
    navigate: navigate,
    refresh: refresh
  });


  var navigate = function (id) {
    $state.go('app.home.somewhere', { id: id });
  };

  function refresh() {
    getSomething();
  }


  function getSomething() {
    $ionicLoading.show({
        noBackdrop: false
      });

    ExampleService.doSomethingAsync()
      .then(ExampleService.fetchSomethingFromServer)
      .then(function(response) {
          vm.myHTML = response.data.text;
          // close pull to refresh loader
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
      });
  };


  refresh();

});

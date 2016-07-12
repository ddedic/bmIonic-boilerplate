'use strict';

/**
 * @ngdoc overview
 * @name bmIonic.dummy
 * @description
 * # Initializes bmIonic Dummy module
 *
 * Dummy module of the application.
 */


angular.module('bmIonic.regions', [
    'ionic',
    'ngCordova',
    'ngResource'
])


  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

    // Application routing
    $stateProvider
      .state('app.dummy', {
        url: '/dummy'
      });

  });
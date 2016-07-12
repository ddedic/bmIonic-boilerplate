'use strict';

/**
 * @ngdoc overview
 * @name bmIonic.home
 * @description
 * # Initializes bmIonic Home module
 *
 * Home module of the application.
 */


angular.module('bmIonic.home', [
    'ionic',
    'ngCordova',
    'ngResource'
])


  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

    // Application routing
    $stateProvider
      .state('app.home', {
        url: '/home',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'templates/home/views/main.html',
            controller: 'HomeController as vm'
          }
        }
      });

  });



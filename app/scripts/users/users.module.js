'use strict';

/**
 * @ngdoc overview
 * @name bmIonic.home
 * @description
 * # Initializes bmIonic Users module
 *
 * Users module of the application.
 */


angular.module('bmIonic.users', [
    'ionic',
    'ngCordova',
    'ngResource',
    'satellizer',
    'bmIonic.common'
])



  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $authProvider, ApiServiceProvider) {
      // Application routing
      $stateProvider
        .state('app.user-login', {
          url: '/user/login',
          cache: false,
          views: {
            'tab-user': {
              templateUrl: 'templates/users/views/login.html',
              controller: 'LoginController as vm'
            }
          },
          data: {
            requiredLogin: false
          },
          resolve: {
            skipIfAuthenticated: _skipIfAuthenticated
          }
        })
        .state('app.user-register', {
          url: '/user/register',
          cache: false,
          views: {
            'tab-user': {
              templateUrl: 'templates/users/views/register.html',
              controller: 'RegisterController as vm'
            }
          },
          data: {
            requiredLogin: false
          },
          resolve: {
            skipIfAuthenticated: _skipIfAuthenticated
          }
        })
        .state('app.user', {
          url: '/user/profile',
          cache: false,
          views: {
            'tab-user': {
              templateUrl: 'templates/users/views/profile.html',
              controller: 'ProfileController as vm'
            }
          },
          data: {
            requiredLogin: true
          },
          resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
          }
        });

      $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
      $authProvider.loginOnSignup = true;
      $authProvider.baseUrl = ApiServiceProvider.$get().getEndpoint();
      $authProvider.signupRedirect = '/user/login';
      $authProvider.loginUrl = '/auth/login';
      $authProvider.signupUrl = '/auth/register';
      $authProvider.loginRoute = '/user/login';
      $authProvider.signupRoute = '/user/register';
      $authProvider.unlinkUrl = '/auth/unlink/';
      $authProvider.withCredentials = false;
      $authProvider.platform = 'mobile'; // or 'mobile'

      $authProvider.facebook({
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 580, height: 400 }
      });

      function _skipIfAuthenticated($q, $state, $auth) {
        var defer = $q.defer();
        if($auth.isAuthenticated()) {
          defer.reject(); /* (1) */
        } else {
          defer.resolve(); /* (2) */
        }
        return defer.promise;
      }
       
      function _redirectIfNotAuthenticated($q, $state, $auth) {
        console.log('defer if not authenticated');

        var defer = $q.defer();
        if($auth.isAuthenticated()) {
          console.log('resolve');
          defer.resolve(); /* (3) */
        } else {
          $timeout(function () {
            console.log('redirect to login...');
            $state.go('app.user-login'); /* (4) */
          });
          defer.reject();
        }
        return defer.promise;
      }


  })


  .run(function ($rootScope, $state, $auth) {

    console.log('User authenticated: ' + $auth.isAuthenticated());
    console.log($auth);


    
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        var requiredLogin = false;
        // check if this state need login
        if (toState.data && toState.data.requiredLogin)
          requiredLogin = true;
        
        // if yes and if this user is not logged in, redirect him to login page
        if (requiredLogin && !$auth.isAuthenticated()) {
          event.preventDefault();
          $state.go('app.user-login');
        }
      });
    
});
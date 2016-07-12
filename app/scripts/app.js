'use strict';

/**
 * @ngdoc overview
 * @name bmIonic
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('bmIonic', [
    'ionic',
    'ngCordova',
    'ngResource',
    'ui.router',
    'ngAnimate',
    'satellizer',
    'toastr',
    'ionicLazyLoad',
    'bmIonic.common',
    'bmIonic.home',
    'bmIonic.users'
])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider, toastrConfig) {

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/common/views/layout.html'
      });



    $httpProvider.interceptors.push(['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {
        return {
            request: function(config) {
                if ($window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/users/login');
                    //$state.go('app.user-login');
                    console.log('Unauthorized!');
                }

                return $q.reject(response);
            }
        };
    }]);


    angular.extend(toastrConfig, {
      autoDismiss: true,
      containerId: 'toast-container',
      maxOpened: 0,    
      newestOnTop: true,
      positionClass: 'toast-top-full-width',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });    


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');


    // catch JavaScript errors
    window.onerror = function(message, url, line, col, error){
    var stopPropagation = false;
    var data = {};
    if(message)       { data.message      = message;      }
    if(url)           { data.fileName     = url;          }
    if(line)          { data.lineNumber   = line;         }
    if(col)           { data.columnNumber = col;          }
    if(error){
      if(error.name)  { data.name         = error.name;   }
      if(error.stack) { data.stack        = error.stack;  }
    }
    if(navigator){
      if(navigator.userAgent)   { data['navigator.userAgent']     = navigator.userAgent;    }
      if(navigator.platform)    { data['navigator.platform']      = navigator.platform;     }
      if(navigator.vendor)      { data['navigator.vendor']        = navigator.vendor;       }
      if(navigator.appCodeName) { data['navigator.appCodeName']   = navigator.appCodeName;  }
      if(navigator.appName)     { data['navigator.appName']       = navigator.appName;      }
      if(navigator.appVersion)  { data['navigator.appVersion']    = navigator.appVersion;   }
      if(navigator.product)     { data['navigator.product']       = navigator.product;      }
    }
    Logger.error('JavaScript error: '+data.message, {cause: data.cause, stack: data.stack});
    return stopPropagation;
    };    


  })



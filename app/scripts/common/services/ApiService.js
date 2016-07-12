'use strict';

/**
 * @ngdoc service
 * @name bmIonic.common.services:ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/appConstants.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('bmIonic.common')
  .factory('ApiService', function($window, $http, API_ENDPOINT) {

    var _api = API_ENDPOINT;
    var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);

    // activate for basic auth
    if (_api.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
    }

      if (_api.needsToken) {
        $http.defaults.headers.common = { 'x-auth' : _api.token };
      }    

    // public api
    return {
      getEndpoint: function() { return endpoint; }
    };

  });


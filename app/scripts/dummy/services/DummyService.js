'use strict';

/**
 * @ngdoc function
 * @name bmIonic.regions:DummyService
 * @description
 * # DummyService
 */
angular.module('bmIonic.dummy')

  // use factory for services
  .factory('DummyService', function($http, $timeout, $q, _, ApiService, DummyMapTransformer, DummyTransformer) {


    var apiEndpoint = ApiService.getEndpoint();

    var api = {
      dummies: apiEndpoint + '/dummies',
      dummy: apiEndpoint + '/dummy'
    };

    var dummies = [];
    var dummy = [];


    var getDummies = function() {
           
      return $http.get(api.dummies)
        .then(function(response) {
          dummies = [];
          _.each(response.data.dummies, function(dummy) {

            dummies.push(DummyTransformer.transform(dummy));
            
          });

          return dummies;
        });

    };
        
    var getDummy = function(id) {
           
      return $http.get(api.dummy + '/' + id)
        .then(function(response) {
          dummy = [];

          dummy = {
            info: DummyTransformer.transform(response.data.dummy),
            map: DummyMapTransformer.transform(response.data.mapOptions)
          };

          return dummy;
        });

    };


    // public api
    return {
      getDummies: getDummies,
      getDummy: getDummy
    };

  });

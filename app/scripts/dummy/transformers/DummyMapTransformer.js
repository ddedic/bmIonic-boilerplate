'use strict';

/**
 * @ngdoc function
 * @name bmIonic.dummy:DummyMapTransformer
 * @description
 * # DummyMapTransformer
 */
angular.module('bmIonic.dummy')

  .factory('DummyMapTransformer', function($q, _) {

    var transform = function(data) {

      var map = [];
      
      map = {
        origin: {
          lat: data.center.lat,
          lon: data.center.lng
        },
        zoom: 10,
        markers: parseMarkers(data.markers)
      };


      return map;     

    };


    function parseMarkers(data) {
      var markers = [];

      _.each(data, function(data) {
        markers.push({
          name: data.name,
          lat: data.pos.lat,
          lon: data.pos.lng
        });
      });      

      return markers;
    };

    return {
      transform: transform
    };

  });

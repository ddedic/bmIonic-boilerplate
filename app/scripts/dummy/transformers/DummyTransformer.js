'use strict';

/**
 * @ngdoc function
 * @name bmIonic.regions:DummyTransformer
 * @description
 * # RegionTransformer
 */
angular.module('bmIonic.regions')

  .factory('DummyTransformer', function($q, _, ImageService) {

    var transform = function(data) {

      var dummy = [];
      
      dummy = {
        id:           data.id,
        slug:         data.slug,
        name:         data.name,
        image:        ImageService.getImageUrl(data.filedir, data.extension)
      };


      return dummy;     

    };
    

    return {
      transform: transform
    };

  });

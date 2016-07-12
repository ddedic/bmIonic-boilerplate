'use strict';

/**
 * @ngdoc service
 * @name bmIonic.common.services:ImageService
 * @description
 * # ImageService
 * Retrieves image urls.
 * Uses settings from S3_CONFIG and APP_CONFIG defined in /config/appConstants.js
 *
 *
 */
angular.module('bmIonic.common')
  .factory('ImageService', function(S3_CONFIG, APP_CONFIG) {

    var _s3 = S3_CONFIG;

    var _defaultImage = APP_CONFIG.defaultImage;

    var path = _s3.folder ? (_s3.bucket + '/' + _s3.folder + '/') : (_s3.bucket + '/');

  

    var getImageUrl = function(folder, ext, type) {

      if (type === undefined) {
        type = "medium";
      }

      var imageUrl = _defaultImage;

      if ((folder.length > 0) && (ext.length > 0)) {

        imageUrl = path + folder + '/' + type + '.' + ext;

      }

      return imageUrl;
    }



    // public api
    return {
      getImageUrl: getImageUrl
    };

  });


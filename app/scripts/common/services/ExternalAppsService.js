'use strict';

/**
 * @ngdoc service
 * @name bmIonic.common.services:ExternalAppsService
 * @description
 * # ExternalAppsService
 */
angular.module('bmIonic.common')
  .factory('ExternalAppsService', function($window) {

		function openMapsApp(coords) {
			var q;
			if (ionic.Platform.isAndroid()) {
				q = 'geo:' + coords;
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			$window.location.href = q;
		};

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		};


    // public api
    return {
		openMapsApp: openMapsApp,
		openExternalUrl: openExternalUrl
    };

  });


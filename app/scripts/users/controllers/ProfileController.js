'use strict';

/**
 * @ngdoc function
 * @name bmIonic.controller:ProfileController
 * @description
 * # ProfileController
 */
angular.module('bmIonic.users')
  .controller('ProfileController', function($scope, $state, $auth) {


	var logout = function() {
		console.log('Logging out...');

		$auth.logout().then(function(response) {
		    console.log(response);
		    $state.go('app.home');
		  });
	};



	var vm = angular.extend(this, {
		logout: logout
	});

  });

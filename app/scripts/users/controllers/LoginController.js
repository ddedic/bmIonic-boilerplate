'use strict';

/**
 * @ngdoc function
 * @name bmIonic.controller:LoginController
 * @description
 * # LoginController
 */
angular.module('bmIonic.users')
  .controller('LoginController', function($scope, $state, $auth, $ionicPopup) {

	function login() {
		var user = {
		  email: vm.user.email,
		  password: vm.user.password
		};

		$auth.login(user)
		  .then(function(response) {
		    // Redirect user here after a successful log in.
		    console.log(response);
		    $state.go('app.user');
		  })
		  .catch(function(error) {
	          $ionicPopup.alert({
	            title: 'Error',
	            content: error.statusText
	          });
		    //toastr.error(error.statusText);
		    console.log(error);
		  });
	};


	var loginSocial = function(provider) {
		console.log('Social login using: ' + provider);
		$auth.authenticate(provider);
	};


	var vm = angular.extend(this, {
		login: login,
		loginSocial: loginSocial
	});


  });
'use strict';

/**
 * @ngdoc function
 * @name bmIonic.controller:RegisterController
 * @description
 * # RegisterController
 */
angular.module('bmIonic.users')
.controller('RegisterController', function ($scope, $state, $auth, $ionicPopup) {

    function register() {
        var user = {
            firstname: vm.user.firstname,
            name: vm.user.name,
            password: vm.user.password,
            password_confirmation: vm.user.password_confirmation,
            street: vm.user.street,
            zip: vm.user.zip,
            city: vm.user.city,
            country: vm.user.country,
            phone: vm.user.phone,
            email: vm.user.email
        };

        $auth.signup(user)
        .then(function (response) {
            console.log(response);
            if (typeof response.data.error !== "undefined") {
                var errorMsg = '';
                for (var key in response.data.error) {
                    if (response.data.error.hasOwnProperty(key)) {
                        var errorBlock = response.data.error[key];
                        console.log(errorBlock);
                        errorBlock.forEach(function(msg){
                            errorMsg += msg + '<br />';
                        });
                    }
                }
                
                $ionicPopup.alert({
                    title: 'Error',
                    content: errorMsg
                });
            } else {
                $state.go('app.user');
            }
        })
        .catch(function (error) {
            $ionicPopup.alert({
                title: 'Error',
                content: error.statusText
            });
            //toastr.error(error.statusText);
            console.log(error);
        });
    };

    var vm = angular.extend(this, {
        register: register
    });

});

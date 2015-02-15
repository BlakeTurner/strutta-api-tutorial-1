'use strict';

angular.module('myApp.registration', [
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  // Registration (create participant)
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'RegistrationController'
  });
  // Sign In (renew token)
  $routeProvider.when('/sign-in', {
    templateUrl: 'registration/sign-in.html',
    controller: 'SignInController'
  });
}])
.controller('RegistrationController', function($scope, $http, $localStorage, $location) {

  $scope.regError = false;

  // Form submit passed registration request to Strutta API
  $scope.registration = function() {

    var redirect = $location.search().redirect || '/';

    // POST to dummy login app (create Strutta Participant)
    $http.post('http://localhost:4567/register', { name: $scope.name, email: $scope.email })
    .success(function(data, status, headers, config) {
      // Store user data in localStorage
      $localStorage.struttaParticipant = data;

      // Redirect on success
      $location.path(redirect);
    })
    .error(function(data, status, headers, config) {
      $scope.regError = true;
      $scope.errorMsg = data.message;
    });
  };
})
.controller('SignInController', function($scope, $http, $localStorage, $location) {

  // Form submit passed registration request to Strutta API
  $scope.signIn = function() {

    var redirect = $location.search().redirect || '/';

    // POST to dummy login app (Renew Participant token)
    $http.post('http://localhost:4567/renew', { email: $scope.email })
    .success(function(data, status, headers, config) {
      // Save updated participant data to localStorage
      $localStorage.struttaParticipant = data;

      // Redirect on success
      $location.path(redirect);
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });
  };
});

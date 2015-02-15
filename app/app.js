'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.registration',
  'myApp.sweeps',
  'myApp.home',
  'myApp.thanks',
  'mgcrea.ngStrap',
  'ngStorage'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/'});

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller('MainCtrl', function($scope, $localStorage) {
  $scope.$storage = $localStorage;

  // Flag to see if a user is registered - watched by Menu UI
  $scope.registered = function() {
    $scope.$storage.hasOwnProperty('struttaParticipant');
  };

  // Reset localStorage for a user
  $scope.signOut = function() {
    $scope.$storage.$reset();
  };
});

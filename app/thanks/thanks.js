'use strict';

angular.module('myApp.thanks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/thanks', {
    templateUrl: 'thanks/thanks.html',
    controller: 'thanksCtrl'
  });
}])
.controller('thanksCtrl', function($scope, $localStorage, $location, $http) {
  // Redirect to entry page if user has not yet entered
  if (!$localStorage.hasOwnProperty('entry') || !$localStorage.entry.hasOwnProperty('firstId')) {
    $location.path("/sweeps")
  }

  // Give the UI easy access to localStorage
  $scope.storage = $localStorage;

  // https://developers.facebook.com/docs/sharing/reference/share-dialog
  $scope.fbShare = function() {
    FB.ui({
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, function(response) {
      // Create a second Entry with the Strutta API
      $http.post(STRUTTA_API_URI + '/entries', $localStorage.entry)
      .success(function(data, status, headers, config) {
        // On success, add trackers for doubleup
        $localStorage.entry.doubleUp = true;
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });
    });
  };
});

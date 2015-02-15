'use strict';

angular.module('myApp.sweeps', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sweeps', {
    templateUrl: 'sweeps/sweeps.html',
    controller: 'sweepsCtrl'
  });
}])
.controller('sweepsCtrl', function($scope, $localStorage, $location, $http) {
  // Redirect to registration page if user has not yet registered
  if (!$localStorage.hasOwnProperty('struttaParticipant')) $location.path("/registration").search('redirect', '/sweeps');

  $scope.sweeps_submit = function() {
    // Create entry for API
    var entry = {
      participant_id: $localStorage.struttaParticipant.id,
      metadata: $scope.entryData,
      token: $localStorage.struttaParticipant.token
    };

    // Save entry data for Double-up entry
    $localStorage.entry = entry

    // Create Entry on the Strutta API
    $http.post(STRUTTA_API_URI + '/entries', entry)
    .success(function(data, status, headers, config) {
      // On success, add trackers for doubleup
      $localStorage.entry.firstId = data.id;
      $localStorage.entry.doubleUp = false;

      // Go to thanks page
      $location.path("/thanks");
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });
  };
});

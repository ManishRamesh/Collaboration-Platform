/**
 * User Controller
 */

app.controller('UserCtrl', function($scope, UserService, $location, $rootScope,
		$cookieStore) {

	$scope.registration = function(user) {
		UserService.registration(user).then(function(response) {
			$location.path('/login')
		}, function(response) {
			$scope.error = response.data
		})
	}

	$scope.login = function(user) {
		UserService.login(user).then(function(response) {
			$rootScope.user = response.data
			$cookieStore.put('loggedInUser', response.data)
			$location.path('/home')
		}, function(response) {
			$scope.error = response.data
		})
	}

})
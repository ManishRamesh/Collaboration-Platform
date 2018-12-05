 /**
 * UserService
 */

app.factory('UserService', function($http) {

	var userService = {}

	userService.registration = function(user) {
		return $http.post("http://localhost:8080/Middleware/register", user)
	}

	userService.login = function(user) {
		return $http.put("http://localhost:8080/Middleware/login", user)
	}

	userService.logout = function() {
		return $http.put("http://localhost:8080/Middleware/logout")
	}

	return userService;

})
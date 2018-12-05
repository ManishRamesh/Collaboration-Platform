/**
 * 
 */

app.factory("FriendService", function($http) {

	var friendService = {}

	friendService.getAllSuggestedUsers = function() {
		return $http.get("http://localhost:8080/Middleware/suggestedUsers")
	}

	friendService.sendFriendRequest = function(user) {
		return $http.post("http://localhost:8080/Middleware/friendrequest",user)
	}

	friendService.getPendingRequests = function() {
		return $http.get("http://localhost:8080/Middleware/pendingrequests")
	}

	friendService.acceptRequest = function(friendRequest) {
		return $http.put("http://localhost:8080/Middleware/acceptrequest",friendRequest)
	}

	friendService.deleteRequest = function(friendRequest) {
		return $http.put("http://localhost:8080/Middleware/deleterequest",friendRequest)
	}

	friendService.getAllFriends = function() {
		return $http.get("http://localhost:8080/Middleware/friends")
	}
	return friendService;

})
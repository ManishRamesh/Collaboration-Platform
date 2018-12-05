 /**
 * 
 */

app.factory('NotificationService', function($http) {
	var notificationService = {}

	notificationService.getAllNotifications = function() {
		return $http.get("http://localhost:8080/Middleware/getallnotifications")
	}

	notificationService.getNotification = function(notificationId) {
		return $http.get("http://localhost:8080/Middleware/getnotification/"+notificationId)
	}

	notificationService.updateNotification = function(notificationId) {
		return $http.put("http://localhost:8080/Middleware/updatenotification/"+notificationId)
	}

	return notificationService;

})
/**
 * 
 */

app.factory('JobService', function($http) {
	var jobService = {}

	jobService.addJob = function(job) {
		return $http.post("http://localhost:8080/Middleware/addjob", job)
	}

	jobService.getAllJobs = function() {
		return $http.get("http://localhost:8080/Middleware/getalljobs")
	}
	return jobService;

})
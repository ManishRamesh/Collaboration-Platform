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
	
	jobService.addJobApplication=function(job){
		return $http.post("http://localhost:8080/Middleware/addJobApplication", job)
	}
	return jobService;

})
/**
 * 
 */

app.controller('BlogCtrl', function($scope, BlogService, $location, $rootScope, $routeParams) {
	$scope.addBlog = function(blog) {
		BlogService.addBlog(blog).then(function(response) {
			console.log('Blog Inserted Successfully and it is waiting for approval')
			alert('Blog Inserted Successfully and it is waiting for approval')
			$location.path('/home')
		}, function(response) {
			$scope.error = response.data
			if (response.status == 401)
				$location.path('/login')
		})
	}
	if($rootScope.user!= undefined){
		if($rootScope.user.role =='ADMIN' && $routeParams.id==1)
			BlogService.getBlogsWaitingForApproval().then(function(response){
				$scope.blogsWaitingForApproval=response.data
			},function(response){
				$scope.error=response.data
				console.log($scope.error)
				if(response.status==401 && $scope.error.errorCode==5)
					$location.path('/login')
			})
	}
	else{
		$location.path('/login')
	}
	
	if($rootScope.user!=undefined){
		if($routeParams.id==2)
			BlogService.getBlogsApproved().then(function(response){
				console.log(response.data)
				$scope.blogs=response.data
			},function(response){
				if(response.status==401)
					$location.path('/login')
				
			})
	}
	else{
		$location.path('/login')
	}
	
})
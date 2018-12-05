/**
 * 
 */

app.controller('BlogInDetailCtrl', function($scope, $rootScope, $location,
		$routeParams, BlogService, $sce) {

	var blogPostId = $routeParams.id;
	$scope.isRejected = false
	if (blogPostId != undefined) {

		BlogService.getBlog(blogPostId).then(function(response) {
			$scope.blogPost = response.data
			$scope.content = $sce.trustAsHtml($scope.blogPost.blogContent)
		}, function(response) {
			$scope.error = response.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')

		})

		BlogService.hasUserLikedBlogPost(blogPostId).then(function(response) {
			if (response.data == '')
				$scope.isLiked = false
			else
				$scope.isLiked = true

		}, function(response) {
			$scope.error = response.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')

		})
	}

	$scope.approve = function(blogPost) {
		BlogService.approve(blogPost).then(function(response) {
			$location.path('/blogsWaitingForApproval/1')
		}, function(response) {
			$scope.error = reponse.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')

		})
	}

	$scope.reject = function(blogPost, rejectionReason) {
		if (rejectionReason == undefined)
			rejectionReason = 'Not Mentioned by ADMIN'

		BlogService.reject(blogPost, rejectionReason).then(function(response) {
			$location.path('/blogsWaitingForApproval/1')
		}, function(response) {
			$scope.error = response.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')
		})
	}

	$scope.showTxtForRejectionReason = function() {
		$scope.isRejected = !$scope.isRejected
	}

	$scope.updateLikes = function(blogPostId) {
		BlogService.updateLikes(blogPostId).then(function(response) {
			$scope.blogPost = response.data
			$scope.isLiked = !$scope.isLiked
		}, function(response) {
			$scope.error = response.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')
		})
	}

	$scope.addBlogComment = function(blogPost, commentTxt) {
		var blogComment = {}
		blogComment.blogPost = blogPost
		blogComment.commentTxt = commentTxt
		BlogService.addBlogComment(blogComment).then(function(response) {
			$scope.blogComment = response.data
			$scope.commentTxt = ""
		}, function(response) {
			$scope.error = response.data
			if (response.status == 401 && response.data.errorCode == 5)
				$location.path('/login')
		})
	}

	$scope.getAllBlogComments = function() {
		if (blogPostId != undefined) {
			$scope.showComments = !$scope.showComments
			BlogService.getAllBlogComments(blogPostId).then(function(response) {
				$scope.blogComments = response.data
			}, function(response) {
				$scope.error = response.data
				if (response.status == 401 && response.data.errorCode == 5)
					$location.path('/login')
			})
		}
	}

})
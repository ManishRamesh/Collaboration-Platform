/**
 * 
 */

app.factory('BlogService', function($http){
	var blogService={}
	
	blogService.addBlog=function(blog){
		return $http.post("http://localhost:8080/Middleware/addblogpost",blog)
	}
	
	blogService.getBlogsWaitingForApproval=function(){
		return $http.get("http://localhost:8080/Middleware/blogswaitingforapproval")
	}
	
	blogService.getBlogsApproved=function(){
		return $http.get("http://localhost:8080/Middleware/blogsapproved")
	}
	
	blogService.getBlog=function(blogPostId){
		return $http.get("http://localhost:8080/Middleware/getBlog/"+blogPostId)
	}
	
	blogService.approve=function(blogPost){
		return $http.put("http://localhost:8080/Middleware/approve",blogPost)
	}
	
	blogService.reject=function(blogPost,rejectionReason){
		return $http.put("http://localhost:8080/Middleware/reject/"+rejectionReason,blogPost)
	}
	
	blogService.hasUserLikedBlogPost=function(blogPostId){
		return $http.get("http://localhost:8080/Middleware/hasUserLikedBlogPost/"+blogPostId)
	}
	
	blogService.updateLikes=function(blogPostId){
		return $http.put("http://localhost:8080/Middleware/updateLikes/"+blogPostId)
	}
	
	blogService.addBlogComment=function(blogComment){
		return $http.post("http://localhost:8080/Middleware/addblogcomment",blogComment)
	}
	
	blogService.getAllBlogComments=function(blogPostId){
		return $http.get("http://localhost:8080/Middleware/getblogcomments/"+blogPostId)
	}
	
	
	return blogService;
	
})
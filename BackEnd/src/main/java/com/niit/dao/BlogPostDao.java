package com.niit.dao;

import java.util.List;

import com.niit.models.BlogPost;

public interface BlogPostDao {

	void addBlogPost(BlogPost blogpost);

	List<BlogPost> blogsWaitingForApproval();

	List<BlogPost> blogsApproved();

	BlogPost getBlog(int blogPostId);

	void updateBlogPost(BlogPost blogPost);

	void deleteBlogPost(BlogPost blogPost);

}

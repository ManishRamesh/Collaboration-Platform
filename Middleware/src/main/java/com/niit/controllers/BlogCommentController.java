package com.niit.controllers;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.niit.dao.BlogCommentDao;
import com.niit.dao.UserDao;
import com.niit.models.BlogComment;
import com.niit.models.ErrorClazz;

@Controller
public class BlogCommentController {

	@Autowired
	private BlogCommentDao blogPostCommentDao;
	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "/addblogcomment", method = RequestMethod.POST)
	public ResponseEntity<?> addBlogComment(@RequestBody BlogComment blogComment, HttpSession session) {
		String email = (String) session.getAttribute("email");
		if (email == null) {
			ErrorClazz errorClazz = new ErrorClazz(5, "Unauthorized access..Please Login");
			return new ResponseEntity<ErrorClazz>(errorClazz, HttpStatus.UNAUTHORIZED);
		}
		blogComment.setCommentedBy(userDao.getUser(email));
		blogComment.setCommentedOn(new Date());
		blogPostCommentDao.addBlogComment(blogComment);
		return new ResponseEntity<BlogComment>(blogComment, HttpStatus.OK);
	}

	@RequestMapping(value = "/getblogcomments/{blogPostId}", method = RequestMethod.GET)
	public ResponseEntity<?> getBlogComments(@PathVariable int blogPostId, HttpSession session) {
		String email = (String) session.getAttribute("email");
		if (email == null) {
			ErrorClazz errorClazz = new ErrorClazz(5, "Unauthorized access..Please Login");
			return new ResponseEntity<ErrorClazz>(errorClazz, HttpStatus.UNAUTHORIZED);
		}
		List<BlogComment> blogComments = blogPostCommentDao.getAllBlogComment(blogPostId);
		return new ResponseEntity<List<BlogComment>>(blogComments, HttpStatus.OK);
	}
}

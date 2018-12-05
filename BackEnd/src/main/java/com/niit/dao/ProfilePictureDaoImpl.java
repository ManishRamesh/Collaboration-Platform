package com.niit.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.models.ProfilePicture;

@Repository
@Transactional
public class ProfilePictureDaoImpl implements ProfilePictureDao {

	@Autowired
	private SessionFactory sessionFactory;

	public ProfilePicture saveOrUpdateProfilePic(ProfilePicture profilePicture) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(profilePicture);
		return profilePicture;
	}

	public ProfilePicture getImage(String email) {
		Session session = sessionFactory.getCurrentSession();
		ProfilePicture profilePicture = (ProfilePicture) session.get(ProfilePicture.class, email);
		return profilePicture;
	}

}

package com.niit.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.models.JobApplication;

@Repository
@Transactional
public class JobApplicationDaoImpl implements JobApplicationDao {

	@Autowired
	private SessionFactory sessionFactory;

	public void addJobApplication(JobApplication jobApplication) {
		Session session = sessionFactory.getCurrentSession();
		session.save(jobApplication);

	}

}

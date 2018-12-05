package com.niit.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.models.Friend;
import com.niit.models.User;

@Repository
@Transactional
public class FriendDaoImpl implements FriendDao {
	@Autowired
	private SessionFactory sessionFactory;

	public List<User> getAllSuggestedUsers(String email) {
		String queryString = "select * from Proj2_User where email in  " + "(select email from Proj2_User where email!=?  "
				+ " minus  " + "(select toId_email from Proj2_Friend where fromId_email=?  " + " union  "
				+ "select fromId_email from Proj2_Friend where toId_email=?))";

		Session session = sessionFactory.getCurrentSession();
		SQLQuery sqlQuery = session.createSQLQuery(queryString);
		sqlQuery.addEntity(User.class);
		sqlQuery.setString(0, email);
		sqlQuery.setString(1, email);
		sqlQuery.setString(2, email);
		List<User> suggestedUsers = sqlQuery.list();
		return suggestedUsers;
	}

	public void addFriendRequest(Friend friend) {
		Session session = sessionFactory.getCurrentSession();
		session.save(friend);
	}

	public List<Friend> getPendingRequests(String email) {
		Session session = sessionFactory.getCurrentSession();
		String queryString = "from Friend where toId.email=? and status=?";
		Query query = session.createQuery(queryString);
		query.setString(0, email);
		query.setCharacter(1, 'P');
		return query.list();
	}

	public void acceptRequest(Friend friendRequest) {
		Session session = sessionFactory.getCurrentSession();
		friendRequest.setStatus('A');
		session.update(friendRequest);
	}

	public void deleteRequest(Friend friendRequest) {
		Session session = sessionFactory.getCurrentSession();
		friendRequest.setStatus('D');
		session.update(friendRequest);
	}

	public List<User> listOfFriends(String email) {
		Session session = sessionFactory.getCurrentSession();
		Query query1 = session.createQuery("select f.toId from Friend f where f.fromId.email=? and f.status=?");
		query1.setString(0, email);
		query1.setCharacter(1, 'A');
		List<User> list1 = query1.list();

		Query query2 = session.createQuery("select f.fromId from Friend f where f.toId.email=? and f.status=?");
		query2.setString(0, email);
		query2.setCharacter(1, 'A');
		List<User> list2 = query2.list();
		list1.addAll(list2);

		return list1;
	}

}

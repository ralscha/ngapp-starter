package ch.rasc.ngstart.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.rasc.ngstart.JPAQueryFactory;
import ch.rasc.ngstart.entity.QUser;
import ch.rasc.ngstart.entity.User;

@RestController
public class UserController {

	private final JPAQueryFactory jpaQueryFactory;
	
	public UserController(JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@GetMapping("/be/users")
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<User> getUsers() {
		return this.jpaQueryFactory.selectFrom(QUser.user).fetch();
	}
	
}

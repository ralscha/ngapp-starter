package ch.rasc.ngstart.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ch.rasc.ngstart.JPAQueryFactory;
import ch.rasc.ngstart.entity.QUser;
import ch.rasc.ngstart.entity.User;

@RestController
@Transactional
public class UserController {

	private final JPAQueryFactory jpaQueryFactory;

	private final PasswordEncoder passwordEncoder;

	public UserController(JPAQueryFactory jpaQueryFactory,
			PasswordEncoder passwordEncoder) {
		this.jpaQueryFactory = jpaQueryFactory;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping("/be/users")
	@PreAuthorize("hasAuthority('ADMIN')")
	@Transactional(readOnly = true)
	public List<User> getUsers() {
		return this.jpaQueryFactory.selectFrom(QUser.user).fetch();
	}

	@PostMapping("/be/user-save")
	@PreAuthorize("hasAuthority('ADMIN')")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void saveUser(@RequestBody User user) {
		if (StringUtils.hasText(user.getPasswordHash())) {
			user.setPasswordHash(this.passwordEncoder.encode(user.getPasswordHash()));
		}
		else if (user.getId() != null) {
			user.setPasswordHash(this.jpaQueryFactory.select(QUser.user.passwordHash)
					.from(QUser.user).where(QUser.user.id.eq(user.getId())).fetchOne());
		}
		this.jpaQueryFactory.getEntityManager().merge(user);
	}

	@PostMapping("/be/user-delete")
	@PreAuthorize("hasAuthority('ADMIN')")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteUser(@RequestBody long userId) {
		User user = this.jpaQueryFactory.getEntityManager().find(User.class, userId);
		this.jpaQueryFactory.getEntityManager().remove(user);
	}

}

package ch.rasc.ngstart.service;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;

import ch.rasc.ngstart.JPAQueryFactory;
import ch.rasc.ngstart.dto.CrudDeleteResponse;
import ch.rasc.ngstart.dto.CrudUpdateResponse;
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
	public CrudUpdateResponse saveUser(@RequestBody @Valid User user,
			BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return CrudUpdateResponse.error(bindingResult);
		}

		JPAQuery<Integer> query = this.jpaQueryFactory.selectOne().from(QUser.user)
				.where(QUser.user.userName.equalsIgnoreCase(user.getUserName()));
		if (user.getId() != null) {
			query.where(QUser.user.id.ne(user.getId()));
		}
		if (query.fetch().size() > 0) {
			bindingResult.rejectValue("userName", "Username already taken");
			return CrudUpdateResponse.error(bindingResult);
		}

		if (StringUtils.hasText(user.getPasswordHash())) {
			user.setPasswordHash(this.passwordEncoder.encode(user.getPasswordHash()));
		}
		else if (user.getId() != null) {
			user.setPasswordHash(this.jpaQueryFactory.select(QUser.user.passwordHash)
					.from(QUser.user).where(QUser.user.id.eq(user.getId())).fetchOne());
		}
		this.jpaQueryFactory.getEntityManager().merge(user);
		return CrudUpdateResponse.updatedSuccessful();
	}

	@PostMapping("/be/user-delete")
	@PreAuthorize("hasAuthority('ADMIN')")
	public CrudDeleteResponse deleteUser(@RequestBody long userId) {
		if (!isLastAdmin(userId)) {
			User user = this.jpaQueryFactory.getEntityManager().find(User.class, userId);
			this.jpaQueryFactory.getEntityManager().remove(user);
			return CrudDeleteResponse.buildSuccess();
		}

		return CrudDeleteResponse.buildError("Can't delete last ADMIN user");
	}

	private boolean isLastAdmin(Long id) {
		JPAQuery<Integer> query = this.jpaQueryFactory.select(Expressions.ONE)
				.from(QUser.user)
				.where(QUser.user.id.ne(id).and(QUser.user.enabled.isTrue())
						.and(QUser.user.authorities.eq("ADMIN")));

		return query.fetchFirst() == null;
	}

}

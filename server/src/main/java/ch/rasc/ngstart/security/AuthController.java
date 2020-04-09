package ch.rasc.ngstart.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.rasc.ngstart.JPAQueryFactory;
import ch.rasc.ngstart.entity.QUser;
import ch.rasc.ngstart.entity.User;

@RestController
public class AuthController {

	private final PasswordEncoder passwordEncoder;

	private final JPAQueryFactory jpaQueryFactory;

	private final String userNotFoundEncodedPassword;

	public AuthController(PasswordEncoder passwordEncoder,
			JPAQueryFactory jpaQueryFactory) {
		this.passwordEncoder = passwordEncoder;
		this.jpaQueryFactory = jpaQueryFactory;
		this.userNotFoundEncodedPassword = this.passwordEncoder
				.encode("userNotFoundPassword");
	}

	@GetMapping("/be/authenticate")
	@PreAuthorize("isFullyAuthenticated()")
	public String authenticate(@AuthenticationPrincipal AppUserDetail user) {
		return "\"" + user.getAuthorities().iterator().next().getAuthority() + "\"";
	}

	@PostMapping("/be/login")
	@Transactional(readOnly = true)
	public ResponseEntity<String> login(String username, String password) {

		User user = this.jpaQueryFactory.selectFrom(QUser.user)
				.where(QUser.user.userName.eq(username)).fetchOne();

		if (user != null) {
			boolean pwMatches = this.passwordEncoder.matches(password,
					user.getPasswordHash());
			if (pwMatches && user.isEnabled()) {
				AppUserDetail userDetail = new AppUserDetail(user);
				UserAuthentication userAuthentication = new UserAuthentication(
						userDetail);
				SecurityContextHolder.getContext().setAuthentication(userAuthentication);
				return ResponseEntity.ok().body("\"" + user.getAuthorities() + "\"");
			}
		}
		else {
			this.passwordEncoder.matches(password, this.userNotFoundEncodedPassword);
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

}

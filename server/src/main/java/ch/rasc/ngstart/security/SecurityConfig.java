package ch.rasc.ngstart.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Bean
	AuthenticationManager authenticationManager() {
		return authentication -> {
			throw new AuthenticationServiceException(
					"Cannot authenticate " + authentication);
		};
	}

	@Bean
	DelegatingSecurityContextRepository delegatingSecurityContextRepository() {
		return new DelegatingSecurityContextRepository(
				new RequestAttributeSecurityContextRepository(),
				new HttpSessionSecurityContextRepository());
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new Argon2PasswordEncoder(16, 32, 8, 1 << 18, 4);
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(customizer -> customizer.disable())
				.securityContext(securityContext -> securityContext
						.securityContextRepository(delegatingSecurityContextRepository()))
				.authorizeHttpRequests(customizer -> {
					customizer
							.requestMatchers("/", "/assets/**", "/svg/**", "/*.br",
									"/*.gz", "/*.html", "/*.js", "/*.css")
							.permitAll().requestMatchers("/be/authenticate", "/be/login")
							.permitAll().anyRequest().authenticated();
				})
				.logout(customizer -> customizer.logoutUrl("/be/logout")
						.logoutSuccessHandler(
								new HttpStatusReturningLogoutSuccessHandler()));
		return http.build();
	}

}

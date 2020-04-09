package ch.rasc.ngstart.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Bean
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return authentication -> {
			throw new AuthenticationServiceException(
					"Cannot authenticate " + authentication);
		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf(customizer -> customizer.disable()).authorizeRequests(customizer -> {
			customizer.antMatchers("/be/authenticate", "/be/login").permitAll()
					.anyRequest().authenticated();
		}).logout(customizer -> customizer.logoutUrl("/be/logout")
				.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()));
	}

}

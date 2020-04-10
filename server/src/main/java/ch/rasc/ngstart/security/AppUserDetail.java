package ch.rasc.ngstart.security;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import ch.rasc.ngstart.entity.User;

public class AppUserDetail {

	private final Long appUserId;

	private final String email;

	private final boolean enabled;

	private final Set<GrantedAuthority> authorities;

	public AppUserDetail(User user) {
		this.appUserId = user.getId();
		this.email = user.getEmail();
		this.authorities = Set.of(new SimpleGrantedAuthority(user.getAuthorities()));
		this.enabled = user.isEnabled();
	}

	public Long getAppUserId() {
		return this.appUserId;
	}

	public String getEmail() {
		return this.email;
	}

	public Set<GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	public boolean isEnabled() {
		return this.enabled;
	}

}

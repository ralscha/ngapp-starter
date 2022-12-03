package ch.rasc.ngstart.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.data.jpa.domain.AbstractPersistable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "AppUser")
@JsonInclude(Include.NON_NULL)
public class User extends AbstractPersistable<Long> {

	@NotBlank
	@Size(max = 255)
	@Column(unique = true)
	private String userName;

	@NotBlank
	@Size(max = 255)
	private String lastName;

	@NotBlank
	@Size(max = 255)
	private String firstName;

	@Email
	@Size(max = 255)
	@NotBlank
	@Column(unique = true)
	private String email;

	@NotBlank
	private String authorities;

	@Size(max = 255)
	private String passwordHash;

	private boolean enabled;

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAuthorities() {
		return this.authorities;
	}

	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}

	@JsonIgnore
	public String getPasswordHash() {
		return this.passwordHash;
	}

	@JsonProperty("passwordHash")
	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public boolean isEnabled() {
		return this.enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

}

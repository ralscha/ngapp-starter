package ch.rasc.ngstart.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class ValidationCode {

	private final String code;

	private final Object[] args;

	public ValidationCode(String code, Object[] args) {
		this.code = code;
		this.args = args;
	}

	public String getCode() {
		return this.code;
	}

	public Object[] getArgs() {
		return this.args;
	}

}

package ch.rasc.ngstart.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class CrudDeleteResponse {
	private final boolean success;

	private final String error;

	private CrudDeleteResponse(boolean success, String error) {
		this.success = success;
		this.error = error;
	}

	public static CrudDeleteResponse success() {
		return new CrudDeleteResponse(true, null);
	}

	public static CrudDeleteResponse error(String errorMsg) {
		return new CrudDeleteResponse(false, errorMsg);
	}

	public boolean isSuccess() {
		return this.success;
	}

	public String getError() {
		return this.error;
	}

}

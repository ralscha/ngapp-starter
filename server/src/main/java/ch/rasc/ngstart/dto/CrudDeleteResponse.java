package ch.rasc.ngstart.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public record CrudDeleteResponse(boolean success, String error) {

	public static CrudDeleteResponse buildSuccess() {
		return new CrudDeleteResponse(true, null);
	}

	public static CrudDeleteResponse buildError(String errorMsg) {
		return new CrudDeleteResponse(false, errorMsg);
	}

}

package ch.rasc.ngstart.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class CrudUpdateResponse {
	private final boolean success;

	private final Map<String, List<ValidationCode>> fieldErrors;

	private final String globalError;

	public CrudUpdateResponse(boolean success,
			Map<String, List<ValidationCode>> fieldErrors, String globalError) {
		this.success = success;
		this.fieldErrors = fieldErrors;
		this.globalError = globalError;
	}

	public static CrudUpdateResponse updatedSuccessful() {
		return new CrudUpdateResponse(true, null, null);
	}

	public static CrudUpdateResponse error(BindingResult bindingResult) {
		return new CrudUpdateResponse(false, convert(bindingResult), null);
	}

	public static CrudUpdateResponse globalError(String errorMsg) {
		return new CrudUpdateResponse(false, null, errorMsg);
	}

	private static Map<String, List<ValidationCode>> convert(
			BindingResult bindingResult) {
		Map<String, List<ValidationCode>> errorMap = new HashMap<>();
		for (FieldError fieldError : bindingResult.getFieldErrors()) {
			errorMap.computeIfAbsent(fieldError.getField(), _ -> new ArrayList<>()).add(
					new ValidationCode(fieldError.getCode(), fieldError.getArguments()));
		}
		return errorMap;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public Map<String, List<ValidationCode>> getFieldErrors() {
		return this.fieldErrors;
	}

	public String getGlobalError() {
		return this.globalError;
	}

}

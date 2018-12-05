package com.niit.models;

public class ErrorClazz  {

	private int errorcode;
	private String message;

	public int getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(int errorcode) {
		this.errorcode = errorcode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ErrorClazz(int errorcode, String message) {
		super();
		this.errorcode = errorcode;
		this.message = message;

	}

	public ErrorClazz(String message) {
		super();

		this.message = message;
	}

}

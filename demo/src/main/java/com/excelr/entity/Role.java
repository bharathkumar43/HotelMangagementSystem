package com.excelr.entity;

public enum Role {

	ADMIN,
	USER;
	
	public String getAuthority() {
		return name();
	}
}

package com.excelr.entity;

public enum Role {

	Role_ADMIN,
	Role_USER;
	
	public String getAuthority() {
		return name();
	}
}

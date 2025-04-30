package com.excelr.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.entity.User;
import com.excelr.service.UserService;

@RestController
@RequestMapping("api/user")

public class UserController {

	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<?> getAllUsers(){
		return service.getAllUsers();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Integer id){
		return service.getUserById(id);
	}
	
	@GetMapping("/{name}")
	public ResponseEntity<?> getUserByName(@PathVariable String name){
		return service.getUserByName(name);
	}
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createUser(@RequestPart User user, @RequestPart("image") MultipartFile image){
		return service.createUser(user, image);
	}
	
	@PutMapping(value= "/{id}", consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> updateUser(@RequestPart User user, @PathVariable Integer id, @RequestPart MultipartFile image){
		return service.updateUser(user,id, image);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id){
		return service.deleteUser(id);
	}
}

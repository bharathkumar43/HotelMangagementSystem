package com.excelr.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.entity.User;
import com.excelr.repo.UserRepo;
import com.excelr.util.S3Util;

@Service
public class UserService {

	@Autowired
	private UserRepo repo;
	
	@Autowired
	private S3Util util;
	
	public ResponseEntity<?> getAllUsers(){
		List<User> response= repo.findAll();
		return ResponseEntity.ok().body(response);
	}
	public ResponseEntity<?> getUserById(Integer id){
		Optional<User> useropt= repo.findById(id);
		if(useropt.isPresent()) {
			return ResponseEntity.ok().body(useropt);
		}else {
			return ResponseEntity.status(404).body("user not found");
		}
	}
	
	public ResponseEntity<?> getUserByName(String name){
		Optional<User> useropt= repo.FindByName(name);
		if(useropt.isPresent()) {
			return ResponseEntity.ok().body(useropt);
		}else {
			return ResponseEntity.status(404).body("user not found");
		}
	}
	
	public ResponseEntity<?> createUser(User user, MultipartFile image){
		String imageurl= util.uploadFile(image);
		user.setImage(imageurl);
		repo.save(user);
		return ResponseEntity.ok().body("user data saved succesfully");
	}
	public ResponseEntity<?> updateUser(User user, Integer id, MultipartFile image){
		Optional<User> useropt= repo.findById(id);
		if(useropt.isPresent()) {
			User user1= useropt.get();
			String imageurl= user1.getImage();
			String newurl=util.updateFile(imageurl, image);
			user1.setName(user.getName());
			user1.setEmail(user.getEmail());
			user1.setMobile_number(user.getMobile_number());
			user1.setPassword(user.getPassword());
			user1.setRole(user.getRole());
			user1.setImage(newurl);
			return ResponseEntity.ok().body("User Updated Sucessfully");
		}else {
			return ResponseEntity.ok().body("user not found");
		}
	}
	
	public ResponseEntity<?> deleteUser(Integer id){
		Optional<User> useropt = repo.findById(id);
		if(useropt.isPresent()) {
			User uws=useropt.get();
			String imagurl=uws.getImage();
			util.deleteFile(imagurl);
			repo.deleteById(id);
			return ResponseEntity.ok().body("User deleted successfully");
		}else {
			return ResponseEntity.ok().body("User doesnot exist");
		}
	}
}

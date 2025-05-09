package com.excelr.service;

<<<<<<< HEAD
import com.excelr.model.Room;
import com.excelr.model.User;
import com.excelr.repo.RoomRepository;
import com.excelr.repo.UserRepo;
=======
>>>>>>> 7c1ffd08e58720d4f7269ce61d1b0af3a06d03bd

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
=======
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.entity.User;
import com.excelr.repo.UserRepo;
import com.excelr.util.S3Util;
>>>>>>> 7c1ffd08e58720d4f7269ce61d1b0af3a06d03bd

@Service
public class UserService {

<<<<<<< HEAD
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoomRepository roomRepo;

    // Create a new room
    public ResponseEntity<?> createRoom(Room room) {
        roomRepo.save(room);
        return ResponseEntity.ok("Room Created Successfully");
    }

    // Get all rooms
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    // Get a room by ID
    public ResponseEntity<?> getRoomById(Long id) {
        Optional<Room> optionalRoom = roomRepo.findById(id);
        return optionalRoom.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a room
    public ResponseEntity<?> updateRoom(Long id, Room updatedRoom) {
        Optional<Room> optionalRoom = roomRepo.findById(id);
        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setRoomNumber(updatedRoom.getRoomNumber());
            room.setCapacity(updatedRoom.getCapacity());
            room.setRoomType(updatedRoom.getRoomType());
            room.setPicture(updatedRoom.getPicture());
            roomRepo.save(room);
            return ResponseEntity.ok("Room Updated Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a room
    public ResponseEntity<?> deleteRoom(Long id) {
        if (roomRepo.existsById(id)) {
            roomRepo.deleteById(id);
            return ResponseEntity.ok("Room Deleted Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> createUser(User user) {
        // Encrypt the password before saving
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepo.save(user);
        return ResponseEntity.ok("User Created");
    }
}
=======
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
		Optional<User> useropt= repo.findByName(name);
		if(useropt.isPresent()) {
			return ResponseEntity.ok().body(useropt);
		}else {
			return ResponseEntity.status(404).body("user not found");
		}
	}
	
	public ResponseEntity<?> createUser(User user, MultipartFile image){
		String imageurl = util.uploadFile(image);
		user.setImage(imageurl);
		repo.save(user);
		return ResponseEntity.ok().body("user data saved succesfully");
	}
	public ResponseEntity<?> updateUser(User user, Integer id, MultipartFile image){
		Optional<User> useropt= repo.findById(id);
		if(useropt.isPresent()) {
			User user1= useropt.get();
			util.updateFile(user1.getImage(), image);
			user1.setName(user.getName());
			user1.setEmail(user.getEmail());
			user1.setMobile_number(user.getMobile_number());
			user1.setPassword(user.getPassword());
			user1.setRole(user.getRole());
			return ResponseEntity.ok().body("User Updated Sucessfully");
		}else {
			return ResponseEntity.ok().body("user not found");
		}
	}
	
	public ResponseEntity<?> deleteUser(Integer id){
		Optional<User> useropt = repo.findById(id);
		if(useropt.isPresent()) {
			User user = useropt.get();
			String imageurl = user.getImage();
			util.deleteFile(imageurl);
			repo.deleteById(id);
			return ResponseEntity.ok().body("User deleted successfully");
		}else {
			return ResponseEntity.ok().body("User doesnot exist");
		}
	}
}
>>>>>>> 7c1ffd08e58720d4f7269ce61d1b0af3a06d03bd

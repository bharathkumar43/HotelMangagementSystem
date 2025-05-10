package com.excelr.service;

import com.excelr.model.Room;
import com.excelr.model.User;
import com.excelr.repo.RoomRepository;
import com.excelr.repo.UserRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

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

package com.excelr.controller;

import com.excelr.model.Room;
import com.excelr.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:5173") // Update this based on your frontend URL
public class RoomController {

    @Autowired
    private RoomRepository roomRepo;

    // Create a new room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody Room room) {
        roomRepo.save(room);
        return ResponseEntity.ok("Room Created Successfully");
    }

    // Get all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    // Get a room by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Long id) {
        Optional<Room> optionalRoom = roomRepo.findById(id);
        return optionalRoom.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a room
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        Optional<Room> optionalRoom = roomRepo.findById(id);
        if (optionalRoom.isPresent()) {
            Room existingRoom = optionalRoom.get();
            existingRoom.setRoomNumber(room.getRoomNumber());
            existingRoom.setCapacity(room.getCapacity());
            existingRoom.setRoomType(room.getRoomType());
            existingRoom.setPicture(room.getPicture());
            roomRepo.save(existingRoom);
            return ResponseEntity.ok("Room Updated Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a room
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        if (roomRepo.existsById(id)) {
            roomRepo.deleteById(id);
            return ResponseEntity.ok("Room Deleted Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

package com.excelr.service;

import com.excelr.entity.Rooms;
import com.excelr.repo.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomsService {

    @Autowired
    private RoomsRepo roomsRepo;

    // Get all rooms
    public List<Rooms> getAllRooms() {
        return roomsRepo.findAll();
    }

    // Get room by its ID
    public Optional<Rooms> getRoomById(Integer id) {
        return roomsRepo.findById(id);
    }

    // Create or update a room
    public Rooms saveRoom(Rooms room) {
        return roomsRepo.save(room);
    }

    // Delete a room
    public void deleteRoom(Integer id) {
        roomsRepo.deleteById(id);
    }
}

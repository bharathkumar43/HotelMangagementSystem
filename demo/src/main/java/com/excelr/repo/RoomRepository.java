package com.excelr.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.Room;
import com.excelr.model.RoomType;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByRoomType(RoomType roomType);
}

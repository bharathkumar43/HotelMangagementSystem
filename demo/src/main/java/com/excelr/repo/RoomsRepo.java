package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.Rooms;
@Repository
public interface RoomsRepo extends JpaRepository<Rooms, Integer> {

}

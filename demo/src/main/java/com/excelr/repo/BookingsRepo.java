package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.Bookings;
@Repository
public interface BookingsRepo extends JpaRepository<Bookings, Integer> {

}

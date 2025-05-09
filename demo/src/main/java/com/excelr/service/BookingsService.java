package com.excelr.service;

import com.excelr.entity.Bookings;
import com.excelr.repo.BookingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingsService {

    @Autowired
    private BookingsRepo bookingsRepo;

    // Get all bookings
    public List<Bookings> getAllBookings() {
        return bookingsRepo.findAll();
    }

    // Get a booking by its ID
    public Optional<Bookings> getBookingById(Integer id) {
        return bookingsRepo.findById(id);
    }

    // Create or update a booking
    public Bookings saveBooking(Bookings booking) {
        return bookingsRepo.save(booking);
    }

    // Delete a booking
    public void deleteBooking(Integer id) {
        bookingsRepo.deleteById(id);
    }
}

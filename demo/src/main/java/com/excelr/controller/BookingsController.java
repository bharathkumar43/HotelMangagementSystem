package com.excelr.controller;

import com.excelr.entity.Bookings;
import com.excelr.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;

    // Get all bookings
    @GetMapping
    public List<Bookings> getAllBookings() {
        return bookingsService.getAllBookings();
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Integer id) {
        Optional<Bookings> booking = bookingsService.getBookingById(id);
        if (booking.isPresent()) {
            return new ResponseEntity<>(booking.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create or update a booking
    @PostMapping
    public ResponseEntity<Bookings> createOrUpdateBooking(@RequestBody Bookings booking) {
        Bookings savedBooking = bookingsService.saveBooking(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer id) {
        bookingsService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

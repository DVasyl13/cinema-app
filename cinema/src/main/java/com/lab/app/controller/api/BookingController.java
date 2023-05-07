package com.lab.app.controller.api;

import com.lab.app.dto.NewBookingSubmission;
import com.lab.app.entity.Booking;
import com.lab.app.service.BookingService;
import com.lab.app.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/booking")
public class BookingController {
    private final BookingService service;

    @GetMapping
    @RequestMapping("/showtime/{showtimeId}")
    public Set<Booking> getBookingsByShowtimeId(@PathVariable("showtimeId") Long showtimeId) {
        return service.getBookingsByShowtimeId(showtimeId);
    }

    @PostMapping
    public ResponseEntity<Object> saveBooking(@RequestBody NewBookingSubmission bookingSubmission) {
        var booking = service.saveBooking(bookingSubmission);
        return ResponseHandler.generateResponse("Booking was successfully made", HttpStatus.OK, booking);
    }
}

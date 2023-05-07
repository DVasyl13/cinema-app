package com.lab.app.controller.api;

import com.lab.app.entity.Booking;
import com.lab.app.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/booking")
public class BookingController {
    private final BookingService service;

    @RequestMapping("/showtime/{showtimeId}")
    public Set<Booking> getBookingsByShowtimeId(@PathVariable("showtimeId") Long showtimeId) {
        return service.getBookingsByShowtimeId(showtimeId);
    }

}

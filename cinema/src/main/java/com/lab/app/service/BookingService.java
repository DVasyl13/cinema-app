package com.lab.app.service;

import com.lab.app.entity.Booking;
import com.lab.app.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Set;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repository;
    private final ShowtimeService showtimeService;
    @Transactional(readOnly = true)
    public Set<Booking> getBookingsByShowtimeId(Long showtimeId) {
        return showtimeService.getShowtimeById(showtimeId).getBookings();
    }
}

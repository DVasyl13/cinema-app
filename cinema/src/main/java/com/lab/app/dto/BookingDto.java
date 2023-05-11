package com.lab.app.dto;

import com.lab.app.entity.Seat;

import java.util.Date;
import java.util.Set;

public record BookingDto(Long id, Double totalPrice, Set<Seat> seats,
                         String movieName, Date startTime, Long cinemaHallId,
                         String address) {
}

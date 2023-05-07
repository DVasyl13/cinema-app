package com.lab.app.dto;

import java.util.Set;

public record NewBookingSubmission(Long userId, Long showtimeId, Set<SeatSubmission> seats) {
}

package com.lab.app.dto;

import java.util.Set;

public record UserFullDto(String name, String surname, String email, Set<BookingDto> bookings) {
}

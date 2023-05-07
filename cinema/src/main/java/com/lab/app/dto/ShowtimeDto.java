package com.lab.app.dto;

import java.util.Date;

public record ShowtimeDto(Long id, Date endTime, Date startTime, Long cinemaId, Long cinemaHallId) {
}

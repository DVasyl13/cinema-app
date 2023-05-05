package com.lab.app.dto;

import java.sql.Timestamp;

public record ShowtimeDTO(Long id, Timestamp endTime, Timestamp startTime, Long cinemaId) {
}

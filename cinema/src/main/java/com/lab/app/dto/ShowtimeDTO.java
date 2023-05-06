package com.lab.app.dto;

import java.sql.Timestamp;
import java.util.Date;

public record ShowtimeDTO(Long id, Date endTime, Date startTime, Long cinemaId) {
}

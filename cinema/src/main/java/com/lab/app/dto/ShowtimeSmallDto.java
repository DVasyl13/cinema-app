package com.lab.app.dto;

import java.util.Date;

public record ShowtimeSmallDto(Long id, Date endTime, Date startTime, String movieName, Long cinemaHallId, String poster) {
}

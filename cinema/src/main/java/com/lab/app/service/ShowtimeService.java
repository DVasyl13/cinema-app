package com.lab.app.service;

import com.lab.app.dto.ShowtimeSmallDto;
import com.lab.app.entity.Showtime;
import com.lab.app.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShowtimeService {
    private final ShowtimeRepository repository;

    @Cacheable(value = "showtime", key = "#id")
    @Transactional(readOnly = true)
    public Showtime getShowtimeById(Long id){
        return repository.findShowtimeById(id);
    }

    public ShowtimeSmallDto getShowtimeDtoById(Long id) {
        Showtime showtime = getShowtimeById(id);
        return new ShowtimeSmallDto(
                showtime.getId(),
                showtime.getEndTime(),
                showtime.getStartTime(),
                showtime.getMovie().getTitle(),
                showtime.getCinemaHall().getId()
        );
    }

}

package com.lab.app.service;

import com.lab.app.dto.ShowtimeSmallDto;
import com.lab.app.entity.Showtime;
import com.lab.app.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@CacheConfig(cacheNames = "showtime")
@RequiredArgsConstructor
public class ShowtimeService {
    private final ShowtimeRepository repository;

    @Cacheable(keyGenerator = "myKeyGenerator")
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
                showtime.getCinemaHall().getId(),
                showtime.getMovie().getPosterURL()
        );
    }

    @Bean
    public KeyGenerator myKeyGenerator() {
        return (target, method, params) -> "showtime-" + params[0];
    }
}

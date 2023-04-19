package com.lab.app.service;

import com.lab.app.entity.Cinema;
import com.lab.app.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    @Cacheable("cinemas")
    @Transactional
    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }
}
package com.lab.app.service;

import com.lab.app.controller.exception.MovieNotFoundException;
import com.lab.app.entity.Movie;
import com.lab.app.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository repository;

    @Cacheable("movies")
    @Transactional
    public List<Movie> getAllMovies() {
        return repository.findAll();
    }

    @Cacheable(value = "movie", key = "#id")
    @Transactional
    public Movie getMovieById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));
    }
}

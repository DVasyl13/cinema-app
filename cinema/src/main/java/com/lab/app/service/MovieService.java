package com.lab.app.service;

import com.lab.app.dto.*;
import com.lab.app.entity.Movie;
import com.lab.app.entity.Showtime;
import com.lab.app.repository.MovieRepository;
import com.lab.app.repository.ShowtimeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MovieService {
    @PersistenceContext
    private EntityManager entityManager;
    private final MovieRepository repository;
    private final ShowtimeRepository showtimeRepository;

    @Cacheable("movies")
    @Transactional(readOnly = true)
    public List<Movie> getAllMovies() {
        return repository.findAll();
    }


    @Cacheable(value = "movie", key = "#id")
    @Transactional(readOnly = true)
    public MovieDto getMovieById(Long id) {
        List<Showtime> showtime = showtimeRepository.findShowtimesByMovieId(id);
        List<ShowtimeDto> showtimeDTO = showtime.stream().map(e -> {
             return new ShowtimeDto(e.getId(),
                     e.getEndTime(),
                     e.getStartTime(),
                     e.getCinemaHall().getCinema().getId(),
                     e.getCinemaHall().getId());
        }).toList();

        Movie movie = showtime.get(0).getMovie();
        return new MovieDto(movie.getId(), movie.getDescription(), movie.getDuration(),
               movie.getPosterURL(), movie.getRating(),movie.getReleaseDate(),movie.getTitle(), movie.getTrailerURL(),
               movie.getAgeLimit(), movie.getWidePosterURL(), movie.getStartShowDate(),movie.getEndShowDate(),
               movie.getGenres(),movie.getActors(),movie.getDirectors(),showtimeDTO);

    }
}




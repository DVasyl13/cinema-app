package com.lab.app.controller.api;

import com.lab.app.dto.MovieDTO;
import com.lab.app.dto.MovieFullDTO;
import com.lab.app.entity.Movie;
import com.lab.app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public List<MovieDTO> getMovie() {
        return movieService.getAllMovies();
    }

    @GetMapping
    @RequestMapping("/{id}")
    public MovieFullDTO getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }
}

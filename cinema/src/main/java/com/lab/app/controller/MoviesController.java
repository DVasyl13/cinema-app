package com.lab.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MoviesController {

    @GetMapping
    public String getMoviesPage() {
        return "movies";
    }

    @GetMapping
    @RequestMapping("/{id}")
    public String getMoviePage(@PathVariable String id) {
        return "movie";
    }

    @GetMapping
    @RequestMapping("/{movieId}/booking/{id}")
    public String getBookingPage(@PathVariable String movieId, @PathVariable String id) {
        return "booking";
    }
}

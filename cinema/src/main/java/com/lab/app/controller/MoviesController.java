package com.lab.app.controller;

import com.lab.app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MoviesController {
    private final MovieService service;

    @GetMapping
    public String getMoviesPage() {
        return "";
    }

    @GetMapping
    @RequestMapping("/{id}")
    public String getMoviePage(@PathVariable String id) {
        return "movie";
    }
}

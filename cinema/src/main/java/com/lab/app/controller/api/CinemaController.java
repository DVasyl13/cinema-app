package com.lab.app.controller.api;

import com.lab.app.entity.Cinema;
import com.lab.app.repository.CinemaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cinema")
public class CinemaController {

    private final CinemaRepository repository;

    @Autowired
    public CinemaController(CinemaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Cinema> getCinemas() {
        return repository.findAll();
    }
}

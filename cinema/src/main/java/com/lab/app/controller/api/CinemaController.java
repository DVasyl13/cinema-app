package com.lab.app.controller.api;

import com.lab.app.entity.Cinema;

import com.lab.app.service.CinemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cinema")
@RequiredArgsConstructor
public class CinemaController {

    private final CinemaService cinemaService;

    @GetMapping
    public List<Cinema> getCinemas() {
        return cinemaService.getAllCinemas();
    }
}

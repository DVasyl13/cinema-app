package com.lab.app.controller.api;

import com.lab.app.dto.ShowtimeSmallDto;
import com.lab.app.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/showtime")
@RequiredArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    @RequestMapping("/{id}")
    public ShowtimeSmallDto getShowtime(@PathVariable("id") Long id) {
        return showtimeService.getShowtimeDtoById(id);
    }

//    @GetMapping
//    @RequestMapping("/{id}/booking")
//    public ShowtimeSmallDto getShowtimeBookings(@PathVariable("id") Long id) {
//        return showtimeService.getShowtimeDtoById(id);
//    }
}

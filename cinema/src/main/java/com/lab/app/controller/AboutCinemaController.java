package com.lab.app.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/info")
@RequiredArgsConstructor
public class AboutCinemaController {

    @GetMapping
    public String getPage() {
        return "contacts";
    }
}

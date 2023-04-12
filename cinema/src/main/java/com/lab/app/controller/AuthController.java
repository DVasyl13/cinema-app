package com.lab.app.controller;

import com.lab.app.dto.NewUserSubmission;
import com.lab.app.dto.UserSubmission;
import com.lab.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private UserService userService;

    @Transactional
    @PostMapping("/login")
    public boolean login(@RequestParam("user") UserSubmission userSubmission) {

        //userService .....

        return false;
    }

    @Transactional
    @PostMapping("/register")
    public boolean registration(@RequestParam("user") NewUserSubmission userSubmission) {

        //userService .....

        return false;
    }
}

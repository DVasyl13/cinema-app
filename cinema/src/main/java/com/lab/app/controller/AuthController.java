package com.lab.app.controller;

import com.lab.app.dto.NewUserSubmission;
import com.lab.app.dto.UserSubmission;
import com.lab.app.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserSubmission userSubmission, HttpSession session) {
        if (userService.authenticateUser(userSubmission.email(), userSubmission.password())) {
            session.setAttribute("email", userSubmission.email()); // може спрацює
            session.setAttribute("password", userSubmission.password());
            return new ResponseEntity<>("Вхід успішний", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Такого користувача не існує", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registration(@RequestBody NewUserSubmission userSubmission, HttpSession session) {
        boolean isCreated = userService.saveUser(userSubmission);

        if (isCreated) {
            session.setAttribute("email", userSubmission.email()); // може спрацює
            session.setAttribute("password", userSubmission.password());
            return new ResponseEntity<>("Аккаунт створено", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Цей email вже зайнято", HttpStatus.FORBIDDEN);
        }
    }
}

package com.lab.app.controller;

import com.lab.app.controller.exception.UserAlreadyExistException;
import com.lab.app.controller.exception.UserNotFoundException;
import com.lab.app.dto.NewUserSubmission;
import com.lab.app.dto.UserSubmission;
import com.lab.app.entity.User;
import com.lab.app.service.UserService;
import com.lab.app.util.ResponseHandler;
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
    public ResponseEntity<Object> login(@RequestBody UserSubmission userSubmission, HttpSession session) {
        User user = userService.authenticateUser(userSubmission.email(), userSubmission.password());
        session.setAttribute("email", userSubmission.email()); // може спрацює
        session.setAttribute("password", userSubmission.password());
        return ResponseHandler.generateResponse("Login is successful", HttpStatus.OK, user);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registration(@RequestBody NewUserSubmission userSubmission, HttpSession session) {
        System.out.println(userSubmission);
        User user = userService.saveUser(userSubmission);
        session.setAttribute("email", userSubmission.email()); // може спрацює
        session.setAttribute("password", userSubmission.password());
        return ResponseHandler.generateResponse("Account has been created", HttpStatus.OK, user);
    }
}

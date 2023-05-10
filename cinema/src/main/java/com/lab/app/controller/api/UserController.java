package com.lab.app.controller.api;

import com.lab.app.dto.UserDto;
import com.lab.app.entity.User;
import com.lab.app.service.UserService;
import com.lab.app.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Object> getUserDetails(@RequestBody UserDto userDto) {
        User user = userService.getUser(userDto);
        return ResponseHandler.generateResponse("User has been found.", HttpStatus.OK, user);
    }
}

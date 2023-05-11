package com.lab.app.controller.api;

import com.lab.app.dto.UserDto;
import com.lab.app.dto.UserFullDto;
import com.lab.app.dto.UserFullSubmission;
import com.lab.app.entity.User;
import com.lab.app.service.UserService;
import com.lab.app.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Object> getUserDetails(@RequestBody UserDto userDto) {
        UserFullDto user = userService.getUser(userDto);
        return ResponseHandler.generateResponse("User has been found.", HttpStatus.OK, user);
    }

    @PutMapping
    public ResponseEntity<Object> putUserDetails(@RequestBody UserFullSubmission userFullSubmission) {
        int count = userService.putUserChanges(userFullSubmission);
        return ResponseHandler.generateResponse("User fields were changed.", HttpStatus.OK, count);
    }
}

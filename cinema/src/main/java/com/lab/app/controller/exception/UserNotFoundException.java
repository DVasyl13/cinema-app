package com.lab.app.controller.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super("Could not find user by email [" + email +"]");
    }
}

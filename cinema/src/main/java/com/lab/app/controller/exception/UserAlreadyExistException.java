package com.lab.app.controller.exception;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(String email) {
        super("[" + email + "] is already in use");
    }
}

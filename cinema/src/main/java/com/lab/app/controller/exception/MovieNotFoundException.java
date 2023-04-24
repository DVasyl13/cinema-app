package com.lab.app.controller.exception;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(Long id) {
        super("[Movie with ID " + id + " not found]");
    }
}

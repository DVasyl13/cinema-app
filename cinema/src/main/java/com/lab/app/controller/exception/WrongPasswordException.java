package com.lab.app.controller.exception;

public class WrongPasswordException extends RuntimeException{
    public WrongPasswordException(String email){
        super("User with ["+email+"] email has sent wrong password!");
    }
}

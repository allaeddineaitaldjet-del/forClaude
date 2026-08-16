package com.mylogin.loginpage.exception;

public class PasswordMissmatchException extends RuntimeException {
    public PasswordMissmatchException(String message) {
        super(message);
    }
}

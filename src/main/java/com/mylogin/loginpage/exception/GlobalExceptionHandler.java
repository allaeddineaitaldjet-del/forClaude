package com.mylogin.loginpage.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.mylogin.loginpage.dto.ErrorResponseDTO;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(409, ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<ErrorResponseDTO> handleEmailAlreadyExists(EmailAlreadyExistException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(409, ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(PasswordMissmatchException.class)
    public ResponseEntity<ErrorResponseDTO> handlePasswordMismatch(PasswordMissmatchException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(400, ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    //handles validation failures from @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        ErrorResponseDTO error = new ErrorResponseDTO(400, message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // catches any other unhandled exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneral(Exception ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(500, "Something went wrong");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidCredentials(BadCredentialsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(401, ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);  
}
}
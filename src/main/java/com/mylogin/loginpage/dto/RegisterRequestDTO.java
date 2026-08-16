 package com.mylogin.loginpage.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(
    @Email(message = "Email is invalid") String email,
    @NotBlank(message = "Username is required") String username,
    @NotBlank(message = "Password is required") String password,
    @NotBlank(message = "Confirm Password is required") String confirmPassword
) {}
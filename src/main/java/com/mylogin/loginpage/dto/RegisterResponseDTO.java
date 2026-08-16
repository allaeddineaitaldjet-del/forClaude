package com.mylogin.loginpage.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterResponseDTO(

    @Email(message = "Email is invalid") String email,
    @NotBlank(message = "Username is required") String username
) {}

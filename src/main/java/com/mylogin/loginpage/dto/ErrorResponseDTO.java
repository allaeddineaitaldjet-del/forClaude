package com.mylogin.loginpage.dto;

public record ErrorResponseDTO(
    int statusCode,
    String message
) {}
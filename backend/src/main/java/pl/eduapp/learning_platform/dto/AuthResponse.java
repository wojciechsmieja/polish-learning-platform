package pl.eduapp.learning_platform.dto;

public record AuthResponse(String token, String role, String username) {}

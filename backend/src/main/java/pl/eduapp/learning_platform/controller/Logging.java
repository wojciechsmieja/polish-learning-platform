package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.AuthRequest;
import pl.eduapp.learning_platform.dto.AuthResponse;
import pl.eduapp.learning_platform.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class Logging {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

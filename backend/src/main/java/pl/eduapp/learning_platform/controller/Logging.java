package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.AuthRequest;
import pl.eduapp.learning_platform.dto.AuthResponse;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import pl.eduapp.learning_platform.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class Logging {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register/student")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request, String role) {
        return ResponseEntity.ok(authService.register(request, "STUDENT"));
    }
    @PostMapping("/register/teacher")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request, "TEACHER"));
    }
}

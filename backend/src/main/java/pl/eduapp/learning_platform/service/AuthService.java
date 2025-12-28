package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import pl.eduapp.learning_platform.dto.AuthRequest;
import pl.eduapp.learning_platform.dto.AuthResponse;
import pl.eduapp.learning_platform.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var user = userRepository.findByUsername(request.username()).orElseThrow();
        var token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
}

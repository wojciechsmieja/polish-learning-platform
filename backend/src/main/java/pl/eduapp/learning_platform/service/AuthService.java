package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.dto.AuthRequest;
import pl.eduapp.learning_platform.dto.AuthResponse;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserProfile;
import pl.eduapp.learning_platform.repository.UserProfileRepository;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var user = userRepository.findByUsername(request.username()).orElseThrow();
        var token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getRole());
    }
    @Transactional
    public AuthResponse register(RegisterRequest request, String role) {
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username is already in use");
        }
        if(request.getPassword().length() < 7){
            throw new RuntimeException("Password must be at least 7 characters");
        }
        User user = new User();
        String upperRole = role.toUpperCase();
        if("STUDENT".equals(upperRole) || "TEACHER".equals(upperRole)){
            user.setRole(upperRole);
        }
        else{
            throw new RuntimeException("Invalid role" + upperRole);
        }
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        User savedUser = userRepository.save(user);

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(savedUser);
        userProfile.setTotalStars(0L);
        userProfile.setTotalPoints(0L);
        userProfile.setLevel(1);
        userProfileRepository.save(userProfile);

        String token = jwtService.generateToken(savedUser);
        return new AuthResponse(token, user.getRole());
    }

}

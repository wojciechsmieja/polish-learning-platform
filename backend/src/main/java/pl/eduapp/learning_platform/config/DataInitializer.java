package pl.eduapp.learning_platform.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.time.OffsetDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("testuser").isEmpty()) {
            User user = new User();
            user.setUsername("testuser");
            // hashcoded password
            user.setPassword(passwordEncoder.encode("password123"));
            user.setRole("USER");
            user.setEmail("test@test.pl");
            user.setCreatedAt(OffsetDateTime.now());
            user.setUpdatedAt(OffsetDateTime.now());
            userRepository.save(user);
            System.out.println("Dodano testowego użytkownika: testuser / password123");
        }
    }
}

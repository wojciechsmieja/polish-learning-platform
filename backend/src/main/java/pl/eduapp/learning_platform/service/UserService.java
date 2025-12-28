package pl.eduapp.learning_platform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private void checkUsernameDuplication(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username " + username + " already exists");
        }
    }

    public User registerStudent(RegisterRequest request) {
        checkUsernameDuplication(request.getUsername());
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("STUDENT");
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        userRepository.save(user);
        return user;
    }
    public User registerTeacher(RegisterRequest request) {
        checkUsernameDuplication(request.getUsername());
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("TEACHER");
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        userRepository.save(user);
        return user;
    }
    //TO DO: UPDATE USER
    /*public User updateUser(RegisterRequest request) {
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (request.getPassword()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if(request.getEmail()) {
            user.setEmail(request.getEmail());
        }
        userRepository.save(user);
        return user;
    }
*/
}

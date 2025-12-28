package pl.eduapp.learning_platform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import pl.eduapp.learning_platform.dto.UpdateUserRequest;
import pl.eduapp.learning_platform.dto.UserDTO;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.mapper.UserMapper;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    private void checkUsernameDuplication(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username " + username + " already exists");
        }
    }

    public UserDTO registerStudent(RegisterRequest request) {
        checkUsernameDuplication(request.getUsername());
        User user = userMapper.toEntity(request);
        //user.setUsername(request.getUsername());
        //user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("STUDENT");
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }
    public UserDTO registerTeacher(RegisterRequest request) {
        checkUsernameDuplication(request.getUsername());
        User user = userMapper.toEntity(request);
        //user.setUsername(request.getUsername());
        //user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("TEACHER");
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }
    //TO DO: UPDATE USER

    @Transactional
    public User updateUser(UpdateUserRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Username " + request.getUsername() + " not found"));
        if(StringUtils.hasText(request.getPassword())){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if(StringUtils.hasText(request.getEmail())){
            user.setEmail(request.getEmail());
        }
        user.setUpdatedAt(OffsetDateTime.now());
        userRepository.save(user);
        return user;
    }

}

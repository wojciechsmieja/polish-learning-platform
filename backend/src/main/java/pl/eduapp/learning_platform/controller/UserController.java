package pl.eduapp.learning_platform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.repository.UserRepository;
import pl.eduapp.learning_platform.service.UserService;

@RestController
@RequestMapping("/api/register")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/student")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest request){
            try{
                User savedUser = userService.registerStudent(request);
                return ResponseEntity.ok("User (student) registered succesfully");
            }catch (Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    }
    @PostMapping("/teacher")
    public ResponseEntity<?> registerTeacher(@RequestBody RegisterRequest request){
        try{
            User savedUser = userService.registerTeacher(request);
            return ResponseEntity.ok("User (teacher) registered succesfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

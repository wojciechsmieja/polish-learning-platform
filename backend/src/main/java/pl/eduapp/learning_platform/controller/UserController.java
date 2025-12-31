package pl.eduapp.learning_platform.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.UpdateUserRequest;
import pl.eduapp.learning_platform.dto.UserDTO;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.repository.UserRepository;
import pl.eduapp.learning_platform.service.UserService;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/student")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest request){
            try{
                UserDTO savedUser = userService.registerStudent(request);
                return ResponseEntity.ok("User (student) registered succesfully");
            }catch (Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    }
    @PostMapping("/teacher")
    public ResponseEntity<?> registerTeacher(@RequestBody RegisterRequest request){
        try{
            UserDTO savedUser = userService.registerTeacher(request);
            return ResponseEntity.ok("User (teacher) registered succesfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request){
        try{
            User savedUser = userService.updateUser(request);
            return ResponseEntity.ok("User updated succesfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}

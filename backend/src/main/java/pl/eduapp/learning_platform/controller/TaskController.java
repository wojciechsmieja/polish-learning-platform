package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.dto.TaskRequestDTO;
import pl.eduapp.learning_platform.dto.TaskResponseDTO;
import pl.eduapp.learning_platform.service.TaskService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO dto, Principal principal){
        return ResponseEntity.ok(taskService.createTask(dto, principal.getName()));
    }
    @GetMapping("/my")
    public ResponseEntity<List<TaskResponseDTO>> getMyTasks(Principal principal){
        return ResponseEntity.ok(taskService.getUserTasks(principal.getName()));
    }
    @GetMapping("/public/{type}")
    public ResponseEntity<List<TaskResponseDTO>> getPublicSpecifiedTasks(@PathVariable TaskType type){
        return ResponseEntity.ok(taskService.getTasksByTypeAndPublic(type));
    }
}

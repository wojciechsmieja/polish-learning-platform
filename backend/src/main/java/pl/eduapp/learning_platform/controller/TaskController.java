package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.dto.*;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO dto, Principal principal){
        return ResponseEntity.ok(taskService.createTask(dto, principal.getName()));
    }
    @GetMapping("/my")
    public ResponseEntity<List<TaskResponseDTO>> getMyTasks(Principal principal){
        return ResponseEntity.ok(taskService.getUserTasks(principal.getName()));
    }
    @GetMapping("/public/{type}")
    public ResponseEntity<List<TaskShortResponse>> getPublicSpecifiedTasks(@PathVariable TaskType type, Principal principal){
        //type = TaskType.valueOf(type.toString().toUpperCase());
        String username = (principal != null) ? principal.getName() : null;
        return ResponseEntity.ok(taskService.getTasksByTypeAndPublic(type, username));
    }
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id){
        return ResponseEntity.ok(taskService.getTaskById(id));
    }
    @GetMapping("/{taskId}/leaderboard")
    public ResponseEntity<List<TaskLeaderboardDTO>> getTaskLeaderboard(@PathVariable Long taskId){
        return ResponseEntity.ok(taskService.getTaskLeaderboard(taskId));
    }
    @PatchMapping("/{id}/visibility")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> changeVisibility(@PathVariable Long id, @RequestParam(name="isPublic") Boolean visibility){
        taskService.updateVisibility(id, visibility);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/admin/all")
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks(){
        return ResponseEntity.ok(taskService.getAllTasks());
    }

}

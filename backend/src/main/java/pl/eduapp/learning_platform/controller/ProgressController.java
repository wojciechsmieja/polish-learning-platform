package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.TaskResultResponse;
import pl.eduapp.learning_platform.dto.TaskSubmissionDTO;
import pl.eduapp.learning_platform.service.ProgressService;

import java.security.Principal;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressService progressService;

    @PostMapping("/submit")
    public ResponseEntity<TaskResultResponse> submit(@RequestBody TaskSubmissionDTO dto, Principal principal){
        String username = (principal != null) ? principal.getName() : null;
        return ResponseEntity.ok(progressService.submitTask(dto, username));
    }

}

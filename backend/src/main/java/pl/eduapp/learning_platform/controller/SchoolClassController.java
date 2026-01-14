package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.ClassDetailsResponse;
import pl.eduapp.learning_platform.dto.CreateClassRequest;
import pl.eduapp.learning_platform.dto.JoinClassRequest;
import pl.eduapp.learning_platform.dto.SchoolClassResponse;
import pl.eduapp.learning_platform.entity.SchoolClass;
import pl.eduapp.learning_platform.service.ProgressService;
import pl.eduapp.learning_platform.service.SchoolClassService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class SchoolClassController {
    private final SchoolClassService schoolClassService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<SchoolClassResponse> addSchoolClass(@RequestBody CreateClassRequest schoolClass, Principal principal) {
        return ResponseEntity.ok(schoolClassService.createClass(schoolClass, principal.getName()));
    }
    @PostMapping("/join")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<SchoolClassResponse> joinSchoolClass(@RequestBody JoinClassRequest joinClassRequest, Principal principal) {
        return ResponseEntity.ok(schoolClassService.joinClass(joinClassRequest.getJoinCode(), principal.getName()));
    }
    @GetMapping("/teacher")
    public ResponseEntity<List<SchoolClassResponse>> getAllTeachersClasses(Principal principal) {
        return ResponseEntity.ok(schoolClassService.getTeacherSchoolClasses(principal.getName()));
    }
    @GetMapping("/student")
    public ResponseEntity<List<SchoolClassResponse>> getAllStudentsClasses(Principal principal) {
        return ResponseEntity.ok(schoolClassService.getStudentSchoolClasses(principal.getName()));
    }
    @GetMapping("/{id}/details")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<ClassDetailsResponse> getClassDetails(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(schoolClassService.getClassDetails(id, principal.getName()));
    }
    @PatchMapping("/deactivate/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<String> deactivateClass(@PathVariable Long id, Principal principal) {
        schoolClassService.deactivateClass(id, principal.getName());
        return ResponseEntity.ok("Klasa została usunięta");
    }

}

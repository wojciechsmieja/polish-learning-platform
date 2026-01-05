package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.ProfileResponseDTO;
import pl.eduapp.learning_platform.dto.UpdateBioRequest;
import pl.eduapp.learning_platform.entity.UserProfile;
import pl.eduapp.learning_platform.service.ProfileService;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponseDTO> getMyProfile(Principal principal){
        return ResponseEntity.ok(profileService.getFullProfile(principal.getName()));
    }
    @PatchMapping("/bio")
    public ResponseEntity<String> updateBio(@RequestBody Map<String, String> request, Principal principal){
        UserProfile profile = profileService.updateBio(request.get("bio"), principal.getName());
        return ResponseEntity.ok(profile.getBio());
    }
}

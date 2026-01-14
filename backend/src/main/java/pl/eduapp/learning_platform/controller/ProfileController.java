package pl.eduapp.learning_platform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eduapp.learning_platform.dto.*;
import pl.eduapp.learning_platform.entity.UserProfile;
import pl.eduapp.learning_platform.service.ProfileService;

import java.security.Principal;
import java.util.List;
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
    @GetMapping("/user/{username}")
    public ResponseEntity<ProfileResponseDTO> getUserProfile(@PathVariable String username){
        return ResponseEntity.ok(profileService.getPublicProfile(username));
    }

    @PatchMapping("/bio")
    public ResponseEntity<String> updateBio(@RequestBody Map<String, String> request, Principal principal){
        UserProfile profile = profileService.updateBio(request.get("bio"), principal.getName());
        return ResponseEntity.ok(profile.getBio());
    }
    @GetMapping("/leaderboard")
    public ResponseEntity<LeaderboardResponse> getLeaderboard(Principal principal){
        return ResponseEntity.ok(profileService.getGlobalLeaderboard(principal.getName()));
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal principal){
        try{
            profileService.changePassword(principal.getName(), request);
            return ResponseEntity.ok("Hasło zostało zmienione");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

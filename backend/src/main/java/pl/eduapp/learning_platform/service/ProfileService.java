package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.eduapp.learning_platform.dto.AchievementDTO;
import pl.eduapp.learning_platform.dto.ProfileResponseDTO;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserProfile;
import pl.eduapp.learning_platform.repository.AchievementRepository;
import pl.eduapp.learning_platform.repository.UserAchievementRepository;
import pl.eduapp.learning_platform.repository.UserProfileRepository;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final UserAchievementRepository userAchievementRepository;

    public ProfileResponseDTO getFullProfile(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found"));
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(()-> new RuntimeException("UserProfile not found"));
        List<AchievementDTO> badges = userAchievementRepository.findAllByUser(user)
                .stream()
                .map(ua -> new AchievementDTO(
                        ua.getAchievement().getName(),
                        ua.getAchievement().getDescription(),
                        ua.getAchievement().getBadgeIcon(),
                        ua.getAchievement().getCategory()
                )).toList();
        return new ProfileResponseDTO(
                user.getUsername(),
                user.getEmail(),
                profile.getBio(),
                profile.getTotalPoints(),
                profile.getTotalStars(),
                profile.getLevel(),
                badges
        );
    }

    public UserProfile updateBio(String bio, String username){
        User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        UserProfile profile = userProfileRepository.findByUser(user).orElseThrow(()-> new RuntimeException("UserProfile not found"));
        profile.setBio(bio);
        return userProfileRepository.save(profile);
    }
}

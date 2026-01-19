package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import pl.eduapp.learning_platform.dto.*;
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
    private final PasswordEncoder passwordEncoder;

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

    public LeaderboardResponse getGlobalLeaderboard(String username){
        Pageable topTenPage = PageRequest.of(0, 10);
        List<LeaderboardEntryDTO> topTen = userProfileRepository.findTopStudents(topTenPage)
                .stream()
                .map(p->new LeaderboardEntryDTO(
                        p.getUser().getUsername(),
                        p.getLevel(),
                        p.getTotalPoints(),
                        p.getTotalStars(),
                        p.getAvatarUrl()
                )).toList();
        LeaderboardEntryDTO currentUserEntry = null;
        Long rank = null;

        if(username != null){
            User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
            UserProfile profile = userProfileRepository.findByUser(user).orElseThrow(()-> new RuntimeException("UserProfile not found"));
            if(profile != null){
                rank = userProfileRepository.calculateRank(profile.getTotalPoints());
                currentUserEntry = new LeaderboardEntryDTO(
                        username, profile.getLevel(), profile.getTotalPoints(), profile.getTotalStars(), profile.getAvatarUrl()
                );
            }
        }
        return new LeaderboardResponse(topTen, currentUserEntry, rank);
    }
    public void changePassword(String username, ChangePasswordRequest request){
        User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("Nie znaleziono użytkownika"));
        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())){
            throw new RuntimeException("Obecne hasło jest nieprawidłowe");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
    public ProfileResponseDTO getPublicProfile(String username){
        User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        UserProfile profile = userProfileRepository.findByUser(user).orElseThrow(()-> new RuntimeException("UserProfile not found"));
        List<AchievementDTO> badges = userAchievementRepository.findAllByUser(user)
                .stream()
                .map(ua-> new AchievementDTO(
                        ua.getAchievement().getName(),
                        ua.getAchievement().getDescription(),
                        ua.getAchievement().getBadgeIcon(),
                        ua.getAchievement().getCategory()
                )).toList();
        return new ProfileResponseDTO(
                user.getUsername(),
                null,
                profile.getBio(),
                profile.getTotalPoints(),
                profile.getTotalStars(),
                profile.getLevel(),
                badges
        );
    }
}

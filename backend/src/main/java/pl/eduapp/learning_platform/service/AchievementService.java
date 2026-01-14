package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.*;
import pl.eduapp.learning_platform.repository.AchievementRepository;
import pl.eduapp.learning_platform.repository.UserAchievementRepository;
import pl.eduapp.learning_platform.repository.UserProfileRepository;
import pl.eduapp.learning_platform.repository.UserTaskAttemptRepository;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final UserTaskAttemptRepository userTaskAttemptRepository;
    private final UserProfileRepository userProfileRepository;

    @Transactional
    public List<Achievement> checkAndAward(User user, UserTaskAttempt lastAttempt, UserProfile profile) {
        List<Long> ownedIds = userAchievementRepository.findAllByUser(user)
                .stream().map(ua -> ua.getAchievement().getId()).toList();
        List<Achievement> unearned = achievementRepository.findAll().stream()
                .filter(a -> !ownedIds.contains(a.getId())).toList();
        List<Achievement> newlyEarned = new ArrayList<>();
        for(Achievement a : unearned) {
            if(isCriteriaMet(user, a, lastAttempt, profile)){
                UserAchievement ua = new UserAchievement();
                ua.setUser(user);
                ua.setAchievement(a);
                ua.setEarnedAt(OffsetDateTime.now());
                userAchievementRepository.save(ua);
                newlyEarned.add(a);
            }
        }
        return newlyEarned;
    }

    private boolean isCriteriaMet(User user, Achievement a, UserTaskAttempt lastAttempt, UserProfile profile){
        Map<String, Object> c = a.getCriteria();
        String type = (String) c.get("type");
        int target = (int) c.get("value");
        return switch (type) {
            case "TOTAL_TASKS" -> userTaskAttemptRepository.countByUser(user) >= target;
            case "PERFECT_SCORE" -> lastAttempt.getScorePercentage()>= 100.0;
            case "TOTAL_STARS" -> profile.getTotalStars() >= target;
            case "MIN_LEVEL" -> profile.getLevel() >= target;
            case "MAX_TIME" -> lastAttempt.getTimeSpent().getSeconds() <= target;
            case "TASK_TYPE_COUNT" -> {
                String reqTaskType = (String) c.get("taskType");
                yield userTaskAttemptRepository.countByUserAndTaskTaskType(user, TaskType.valueOf(reqTaskType)) >= target;
            }
            default -> false;
        };
    }
}

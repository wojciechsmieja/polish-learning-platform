package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.eduapp.learning_platform.entity.Achievement;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskResultResponse {
    private double scorePercentage;
    private int stars;
    private long pointsEarned;
    private boolean isCompleted;
    private boolean isLevelUp;
    private List<String> newBadges;
}

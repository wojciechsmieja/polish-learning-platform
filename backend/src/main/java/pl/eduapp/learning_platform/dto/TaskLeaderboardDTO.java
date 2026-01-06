package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TaskLeaderboardDTO {
    private String username;
    private long secondsSpent;
    public TaskLeaderboardDTO(String username, java.time.Duration duration) {
        this.username = username;
        this.secondsSpent = (duration != null) ? duration.getSeconds() : 0;
    }
}

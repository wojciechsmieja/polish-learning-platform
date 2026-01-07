package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
public class StudentTaskProgressDTO {
    private String taskTitle;
    private String taskDescription;
    private Double bestScore;
    private Integer bestStars;
    private Long secondsSpent;
    private OffsetDateTime lastAttemptAt;
}

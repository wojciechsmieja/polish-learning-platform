package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class TaskSubmissionDTO {
    private Long taskId;
    private Map<Long, String> answers;
    private Long timeSpentSeconds;
}

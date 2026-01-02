package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class TaskResultRequest {
    private Long taskId;
    private Map<Long, Long> quizAnswers;
    private Map<Long, String> sentenceAnswers;
}

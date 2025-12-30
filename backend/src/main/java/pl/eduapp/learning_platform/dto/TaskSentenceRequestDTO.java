package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskSentenceRequestDTO {
    private String sentence;
    private String coveredWords;
}

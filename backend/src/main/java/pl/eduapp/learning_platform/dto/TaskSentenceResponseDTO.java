package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskSentenceResponseDTO {
    private String sentence;
    private String coveredWords;
    private String baseWord;
    private String grammarHint;
    private String explenation;
    private Integer sentenceOrder;
}

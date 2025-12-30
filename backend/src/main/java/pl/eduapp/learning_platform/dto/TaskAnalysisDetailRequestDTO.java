package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class TaskAnalysisDetailRequestDTO {
    private String sentence;
    private Map<String, String> wordsAndVariety;
}

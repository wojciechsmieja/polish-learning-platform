package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskQuizOptionResponseDTO {
    private Long id;
    private String optionText;
    private Boolean correctOption;
    private Integer optionOrder;
}

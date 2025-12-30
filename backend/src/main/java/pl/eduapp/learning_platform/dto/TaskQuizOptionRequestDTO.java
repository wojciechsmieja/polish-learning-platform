package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskQuizOptionRequestDTO {
    private String optionText;
    private Boolean correctOption;
    private Integer optionOrder;
}

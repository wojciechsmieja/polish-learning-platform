package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TaskQuizDetailRequestDTO {
    private String question;
    private List<TaskQuizOptionRequestDTO> options;
}

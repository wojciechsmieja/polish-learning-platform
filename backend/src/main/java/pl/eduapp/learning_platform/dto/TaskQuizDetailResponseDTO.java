package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TaskQuizDetailResponseDTO {
    private Long id;
    private String question;
    private List<TaskQuizOptionResponseDTO> options;
}

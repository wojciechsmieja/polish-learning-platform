package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;
import pl.eduapp.learning_platform.constant.TaskType;

@Getter
@Setter
public class TaskResponseDTO {
    private Integer id;
    private String title;
    private String description;
    private TaskType taskType;
    private Integer difficulty;
    private Boolean publicTask;
    private Long createdById;
    private String createdByUsername;
}

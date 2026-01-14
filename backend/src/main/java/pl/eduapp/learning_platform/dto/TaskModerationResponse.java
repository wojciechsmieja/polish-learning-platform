package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;
import pl.eduapp.learning_platform.constant.TaskType;

import java.util.List;

@Getter
@Setter
public class TaskModerationResponse {
    private Long id;
    private String title;
    private String description;
    private TaskType taskType;
    private Integer difficulty;
    private Boolean publicTask;
    private Long createdById;
    private String createdByUsername;
    private String syntaxType;
    private String subject;
    private List<TaskQuizDetailResponseDTO> quizDetails;
    private List<TaskSentenceResponseDTO> sentenceDetails;
    private List<TaskAnalysisDetailResponseDTO> analysisDetails;
}

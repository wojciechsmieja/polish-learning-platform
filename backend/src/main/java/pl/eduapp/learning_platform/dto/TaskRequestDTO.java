package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.TaskQuizDetail;

import java.util.List;

@Getter
@Setter
public class TaskRequestDTO {
    private String title;
    private String description;
    private TaskType taskType;
    private Integer difficulty;
    private Boolean publicTask;
    private List<TaskQuizDetailRequestDTO> quizDetails;
    private List<TaskSentenceRequestDTO> sentenceDetails;
    private List<TaskAnalysisDetailRequestDTO> analysisDetails;
}

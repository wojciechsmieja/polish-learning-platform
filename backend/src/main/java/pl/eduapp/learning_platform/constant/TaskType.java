package pl.eduapp.learning_platform.constant;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TaskType {
    QUIZ,
    COMPLETE_SENTENCE,
    ANALYSIS;
    //JsonCreator change json which comes into the application
    @JsonCreator
    public static TaskType fromString(String text) {
        return text == null ? null : TaskType.valueOf(text.toUpperCase());
    }
}

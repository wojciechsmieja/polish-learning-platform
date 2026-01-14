package pl.eduapp.learning_platform.constant;


import com.fasterxml.jackson.annotation.JsonCreator;

public enum TaskStatus {
    PENDING,
    APPROVED,
    REJECTED;

    @JsonCreator
    public static TaskStatus fromString(String text) {
        return text == null ? null : TaskStatus.valueOf(text.toUpperCase());
    }
}

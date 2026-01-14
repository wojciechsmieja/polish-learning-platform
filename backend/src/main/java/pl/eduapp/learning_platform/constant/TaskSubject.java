package pl.eduapp.learning_platform.constant;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TaskSubject {
    POLSKI,
    MATEMATYKA,
    ANGIELSKI;

    @JsonCreator
    public static TaskSubject fromString(String text) {
        return text == null ? null : TaskSubject.valueOf(text.toUpperCase());
    }
}

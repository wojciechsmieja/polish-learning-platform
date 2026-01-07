package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class SchoolClassResponse {
    private Long id;
    private String name;
    private String description;
    private String joinCode;
    private String teacherUsername;
    private OffsetDateTime createdAt;
    private boolean active;
    private int memberCount;
}

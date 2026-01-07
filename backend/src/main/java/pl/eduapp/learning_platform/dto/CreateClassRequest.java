package pl.eduapp.learning_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateClassRequest {
    private String name;
    private String description;
}

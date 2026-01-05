package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AchievementDTO {
    private String name;
    private String description;
    private String badgeIcon;
    private String category;
}

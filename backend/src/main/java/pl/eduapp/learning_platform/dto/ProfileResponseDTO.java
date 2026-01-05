package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProfileResponseDTO {
    private String username;
    private String email;
    private String bio;
    private Long totalPoints;
    private Long totalStars;
    private Integer level;
    private List<AchievementDTO> achievements;
}

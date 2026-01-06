package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LeaderboardEntryDTO {
    private String username;
    private Integer level;
    private Long totalPoints;
    private Long totalStars;
    private String avatarUrl;
}

package pl.eduapp.learning_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LeaderboardResponse {
    private List<LeaderboardEntryDTO> topTen;
    private LeaderboardEntryDTO currentUserEntry;
    private Long currentUserRank;
}

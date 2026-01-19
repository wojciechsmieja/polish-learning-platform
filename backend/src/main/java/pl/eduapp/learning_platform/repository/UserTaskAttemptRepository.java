package pl.eduapp.learning_platform.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.dto.TaskLeaderboardDTO;
import pl.eduapp.learning_platform.entity.Task;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserTaskAttempt;

import java.util.List;
@Repository
public interface UserTaskAttemptRepository extends JpaRepository<UserTaskAttempt, Long> {
    List<UserTaskAttempt> findByUser(User user);
    Long countByUser(User user);
    Long countByUserAndTaskTaskType(User user, TaskType taskType);

    boolean existsByUserAndTaskAndCompletedTrue(User user, Task task);
    @Query("SELECT MAX(a.stars) FROM UserTaskAttempt a WHERE a.user = :user AND a.task = :task")
    Integer findMaxStarsByUserAndTask(User user, Task task);
    @Query("SELECT MAX(a.scorePercentage) FROM UserTaskAttempt a WHERE a.user = :user AND a.task = :task")
    Double findMaxScoreByUserAndTask(User user, Task task);
    //taskLeaderboard
    @Query("SELECT new pl.eduapp.learning_platform.dto.TaskLeaderboardDTO(a.user.username, MIN(a.timeSpent)) FROM UserTaskAttempt a WHERE a.task.id = :taskId AND a.scorePercentage = 100.0 AND UPPER(a.user.role)='STUDENT' GROUP BY a.user.username ORDER BY MIN(a.timeSpent) ASC, MIN(a.completedAt) ASC")
    List<TaskLeaderboardDTO> findTopSpeedTest(@Param("taskId") Long taskId, Pageable pageable);
}

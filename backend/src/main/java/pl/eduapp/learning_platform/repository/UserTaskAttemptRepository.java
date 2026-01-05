package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.Task;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserTaskAttempt;

import java.util.List;
@Repository
public interface UserTaskAttemptRepository extends JpaRepository<UserTaskAttempt, Long> {
    List<UserTaskAttempt> findByUser(String user);
    Long countByUser(User user);
    Long countByUserAndTaskTaskType(User user, TaskType taskType);

    boolean existsByUserAndTaskAndCompletedTrue(User user, Task task);
    @Query("SELECT MAX(a.stars) FROM UserTaskAttempt a WHERE a.user = :user AND a.task = :task")
    Integer findMaxStarsByUserAndTask(User user, Task task);
    @Query("SELECT MAX(a.scorePercentage) FROM UserTaskAttempt a WHERE a.user = :user AND a.task = :task")
    Double findMaxScoreByUserAndTask(User user, Task task);
}

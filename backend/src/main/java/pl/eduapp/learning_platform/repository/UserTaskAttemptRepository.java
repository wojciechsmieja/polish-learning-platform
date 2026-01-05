package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserTaskAttempt;

import java.util.List;

public interface UserTaskAttemptRepository extends JpaRepository<UserTaskAttempt, Long> {
    List<UserTaskAttempt> findByUser(String user);
    Long countByUser(User user);
    Long countByUserAndTaskTaskType(User user, TaskType taskType);
}

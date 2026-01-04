package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eduapp.learning_platform.entity.UserTaskAttempt;

public interface UserTaskAttemptRepository extends JpaRepository<UserTaskAttempt, Long> {
    UserTaskAttempt findByUser(String user);
}

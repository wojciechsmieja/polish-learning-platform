package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCreatedByUsername(String username);
    List<Task> findByPublicTaskTrue();
    List<Task> findByTaskType(TaskType taskType);
    List<Task> findByTaskTypeAndPublicTaskTrue(TaskType taskType);
}


package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.constant.TaskStatus;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.Task;

import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCreatedByUsername(String username);
    List<Task> findByPublicTaskTrue();
    List<Task> findByTaskType(TaskType taskType);
    List<Task> findByTaskTypeAndPublicTaskTrueAndStatusOrderByIdDesc(TaskType taskType, TaskStatus status);
    Task findById(long id);
    List<Task> findByStatus(TaskStatus status);
}


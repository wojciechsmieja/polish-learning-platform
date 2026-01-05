package pl.eduapp.learning_platform.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.dto.TaskRequestDTO;
import pl.eduapp.learning_platform.dto.TaskResponseDTO;
import pl.eduapp.learning_platform.dto.TaskShortResponse;
import pl.eduapp.learning_platform.entity.*;
import pl.eduapp.learning_platform.mapper.TaskMapper;
import pl.eduapp.learning_platform.repository.TaskRepository;
import pl.eduapp.learning_platform.repository.UserRepository;
import pl.eduapp.learning_platform.repository.UserTaskAttemptRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserRepository userRepository;
    private final UserTaskAttemptRepository userTaskAttemptRepository;

    private void validateTask(TaskRequestDTO taskRequestDTO) {
        if(taskRequestDTO.getTaskType()==TaskType.QUIZ && (taskRequestDTO.getQuizDetails()==null || taskRequestDTO.getQuizDetails().isEmpty())){
            throw new RuntimeException("Quiz task must have at least one question");
        }
        if(taskRequestDTO.getTaskType()==TaskType.COMPLETE_SENTENCE && (taskRequestDTO.getSentenceDetails()==null || taskRequestDTO.getSentenceDetails().isEmpty())){
            throw new RuntimeException("Sentence task must have at least one sentence");
        }
        if(taskRequestDTO.getTaskType()==TaskType.ANALYSIS && (taskRequestDTO.getAnalysisDetails()==null || taskRequestDTO.getAnalysisDetails().isEmpty())){
            throw new RuntimeException("Analysis task must have at least one item");
        }
    }

    public TaskResponseDTO createTask(TaskRequestDTO dto, String username) {
        validateTask(dto);
        Task task = taskMapper.toEntity(dto);
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found while trying to create the task"));
        task.setCreatedBy(user);
        System.out.println("haloloooo");
        System.out.println("Analysis details count: " + (task.getAnalysisDetails() != null ? task.getAnalysisDetails().size() : 0));
        if(task.getQuizDetails() != null) {
            for(TaskQuizDetail detail : task.getQuizDetails()) {
                detail.setTask(task);
                if(detail.getOptions() != null) {
                    for(TaskQuizOption option : detail.getOptions()) {
                        option.setQuizDetail(detail);
                    }
                }
            }
        }
        if(task.getSentenceDetails() != null) {
            task.getSentenceDetails().forEach(s -> s.setTask(task));
        }
        if(task.getAnalysisDetails() != null) {
            task.getAnalysisDetails().forEach(s -> s.setTask(task));
        }
        Task savedTask = taskRepository.save(task);
        System.out.println("Saved task!!! ");
        return taskMapper.toDTO(savedTask);
    }
    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getUserTasks(String username){
        return taskRepository.findByCreatedByUsername(username)
                .stream()
                .map(taskMapper::toDTO)
                .toList();
    }

    public List<TaskResponseDTO> getPublicTasks(String username){
        return taskRepository.findByPublicTaskTrue()
                .stream()
                .map(taskMapper::toDTO)
                .toList();

    }
    public List<TaskResponseDTO> getTasksByType(TaskType taskType){
        return taskRepository.findByTaskType(taskType)
                .stream()
                .map(taskMapper::toDTO)
                .toList();

    }
    public List<TaskShortResponse> getTasksByTypeAndPublic(TaskType taskType, String username) {
        //get tasks
        List<Task> tasks = taskRepository.findByTaskTypeAndPublicTaskTrue(taskType);
        //get user
        User user = (username != null) ? userRepository.findByUsername(username).orElse(null) :null;
        return tasks.stream().map(task -> {
            TaskShortResponse dto = taskMapper.toShortDTO(task);

            if (user != null) {
                Integer maxStars = userTaskAttemptRepository.findMaxStarsByUserAndTask(user, task);
                dto.setUserStars(maxStars);
                boolean completed = userTaskAttemptRepository.existsByUserAndTaskAndCompletedTrue(user, task);
                dto.setCompleted(completed);
            } else {
                dto.setUserStars(0);
                dto.setCompleted(false);
            }
            return dto;
        }).toList();
    }

    @Transactional(readOnly = true)
    public TaskResponseDTO getTaskById(Long id){
        Task task =  taskRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Task not found while trying to get the task"));
        return taskMapper.toDTO(task);
    }
}

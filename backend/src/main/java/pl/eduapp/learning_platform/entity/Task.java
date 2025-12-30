package pl.eduapp.learning_platform.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.eduapp.learning_platform.constant.TaskType;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(name="task_type", nullable = false)
    private TaskType taskType;
    @Column(name="difficulty_level", nullable = false)
    private Integer difficulty;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="created_by")
    private User createdBy;
    @Column(name="is_public", nullable=false)
    private Boolean publicTask;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskQuizDetail> quizDetails = new ArrayList<>();

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskSentenceDetail> sentenceDetails = new ArrayList<>();

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskAnalysisDetail> analysisDetails = new ArrayList<>();
}

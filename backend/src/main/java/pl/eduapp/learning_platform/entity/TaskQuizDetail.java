package pl.eduapp.learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="task_quiz_details")
public class TaskQuizDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="task_id")
    private Task task;
    @Column(nullable = false)
    private String question;
    @OneToMany(mappedBy="quizDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskQuizOption> options = new ArrayList<>();
}

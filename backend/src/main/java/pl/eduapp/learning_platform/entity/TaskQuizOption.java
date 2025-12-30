package pl.eduapp.learning_platform.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task_quiz_options")
public class TaskQuizOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="quiz_details_id")
    private TaskQuizDetail quizDetail;

    @Column(name="option_text",nullable = false)
    private String optionText;
    @Column(name="is_correct", nullable = false)
    private Boolean correctOption;
    @Column(name = "option_order", nullable = true)
    private Integer optionOrder;


}

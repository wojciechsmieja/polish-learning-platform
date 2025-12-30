package pl.eduapp.learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="task_complete_sentence_details")
public class TaskSentenceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="task_id", nullable = false)
    private Task task;
    @Column(name="sentence",nullable = false)
    private String sentence;
    @Column(name="covered_words",nullable = false)
    private String coveredWords;
}

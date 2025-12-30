package pl.eduapp.learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="task_analysis_details")
public class TaskAnalysisDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="task_id")
    private Task task;
    @Column(name="sentence", nullable = false)
    private String sentence;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name="words_and_variety", columnDefinition = "jsonb")
    private Map<String, String> wordsAndVariety;
}

package pl.eduapp.learning_platform.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;

import java.time.Duration;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name="user_task_attemps")
public class UserTaskAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name="task_id", nullable = false)
    private Task task;
    private Integer stars;
    private Integer points;

    @JdbcTypeCode(org.hibernate.type.SqlTypes.INTERVAL_SECOND)
    @Column(name="time_spent", nullable = false)
    private Duration timeSpent;
    @Column(name="completed_at", nullable = false)
    private OffsetDateTime completedAt;
    @Column(name="score_percentage", nullable=false)
    private Double scorePercentage;
    @Column(name="is_completed", nullable = false)
    private Boolean completed;

}

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
@Table(name="achievements")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(name="badge_icon", nullable = false)
    private String badgeIcon;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "criteria", nullable = false)
    private Map<String, Object> criteria;
    private String category;
}

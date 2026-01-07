package pl.eduapp.learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="classes")
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name="created_by",nullable = false)
    private User createdBy; //teacher
    @Column(name="join_code",nullable = false, unique = true)
    private String joinCode;
    @Column(name="created_at",nullable = false)
    private OffsetDateTime createdAt;
    @Column(name="is_active",nullable = false)
    private boolean activeClass;
}

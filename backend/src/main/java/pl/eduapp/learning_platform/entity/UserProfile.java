package pl.eduapp.learning_platform.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name="user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(name="avatar_url")
    private String avatarUrl;
    private String bio;

    @Column(name="total_points")
    private Long totalPoints;
    @Column(name="total_stars")
    private Long totalStars;
    private Integer level;

}

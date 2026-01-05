package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eduapp.learning_platform.entity.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

}

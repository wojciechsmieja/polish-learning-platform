package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.entity.Achievement;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {

}

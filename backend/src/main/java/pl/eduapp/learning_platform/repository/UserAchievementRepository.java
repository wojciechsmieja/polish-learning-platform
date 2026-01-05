package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserAchievement;

import java.util.List;
@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {

    List<UserAchievement> findAllByUser(User user);
}

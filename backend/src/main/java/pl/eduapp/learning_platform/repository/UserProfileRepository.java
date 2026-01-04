package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserProfile;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User user);
}

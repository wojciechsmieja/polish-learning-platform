package pl.eduapp.learning_platform.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.entity.User;
import pl.eduapp.learning_platform.entity.UserProfile;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User user);
    @Query("SELECT p FROM UserProfile p WHERE UPPER(p.user.role) = 'STUDENT' ORDER BY p.totalPoints DESC")
    List<UserProfile> findTopStudents(Pageable pageable);
    @Query("SELECT COUNT(p) + 1 FROM UserProfile p WHERE p.totalPoints > :points AND p.user.role = 'STUDENT'")
    Long calculateRank(@Param("points") Long points);
}

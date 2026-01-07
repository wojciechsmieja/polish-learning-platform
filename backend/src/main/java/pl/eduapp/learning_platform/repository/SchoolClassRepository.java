package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.entity.SchoolClass;
import pl.eduapp.learning_platform.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass,Long> {
    Optional<SchoolClass> findByJoinCode(String joinCode);
    List<SchoolClass> findAllByCreatedByAndActiveClassTrue(User teacher);
}

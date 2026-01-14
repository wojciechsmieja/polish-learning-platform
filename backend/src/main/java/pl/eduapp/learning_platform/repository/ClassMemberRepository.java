package pl.eduapp.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.eduapp.learning_platform.entity.ClassMember;
import pl.eduapp.learning_platform.entity.SchoolClass;
import pl.eduapp.learning_platform.entity.User;

import java.util.List;

@Repository
public interface ClassMemberRepository extends JpaRepository<ClassMember, Long> {
    List<ClassMember> findAllBySchoolClass(SchoolClass schoolClass);
    List<ClassMember> findAllByUserAndSchoolClassActiveClassTrue(User user);
    boolean existsBySchoolClassAndUser(SchoolClass schoolClass, User user);
}

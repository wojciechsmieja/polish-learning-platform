package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.dto.*;
import pl.eduapp.learning_platform.entity.*;
import pl.eduapp.learning_platform.repository.ClassMemberRepository;
import pl.eduapp.learning_platform.repository.SchoolClassRepository;
import pl.eduapp.learning_platform.repository.UserRepository;
import pl.eduapp.learning_platform.repository.UserTaskAttemptRepository;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SchoolClassService {
    private final SchoolClassRepository schoolClassRepository;
    private final UserRepository userRepository;
    private final ClassMemberRepository classMemberRepository;
    private final UserTaskAttemptRepository userTaskAttemptRepository;
    //teacher methods
    public SchoolClassResponse createClass(CreateClassRequest createClassRequest, String teacherUsername) {
        User teacher = userRepository.findByUsername(teacherUsername).orElseThrow(()->new RuntimeException("User not found"));
        if(!"TEACHER".equals(teacher.getRole())){
            throw new RuntimeException("Musisz być nauczycielem aby utworzyć klasę");
        }
        String newCode = CodeGenerator.generateCode();
        while(schoolClassRepository.findByJoinCode(newCode).isPresent()){
            newCode = CodeGenerator.generateCode();
        }
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setName(createClassRequest.getName());
        schoolClass.setDescription(createClassRequest.getDescription());
        schoolClass.setCreatedBy(teacher);
        schoolClass.setJoinCode(newCode);
        schoolClass.setCreatedAt(OffsetDateTime.now());
        schoolClass.setActiveClass(true);
        schoolClassRepository.save(schoolClass);

        return mapToResponse(schoolClass, 0);
    }

    public List<SchoolClassResponse> getTeacherSchoolClasses(String teacherUsername) {
        User teacher= userRepository.findByUsername(teacherUsername).orElseThrow(()->new RuntimeException("User not found"));
        List<SchoolClass> teacherClasses = schoolClassRepository.findAllByCreatedByAndActiveClassTrue(teacher);
        return teacherClasses.stream()
                .map(sc -> {
                    int count = classMemberRepository.findAllBySchoolClass(sc).size();
                    return mapToResponse(sc, count);
                })
                .toList();
    }
    @Transactional(readOnly = true)
    public ClassDetailsResponse getClassDetails(Long classId, String teacherUsername) {
        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono klasy"));
        if (!schoolClass.getCreatedBy().getUsername().equals(teacherUsername)) {
            throw new RuntimeException("Nie masz uprawnień do tej klasy");
        }
        List<ClassMember> members = classMemberRepository.findAllBySchoolClass(schoolClass);

        List<ClassStudentProgressDTO> studentProgress = members.stream().map(member -> {
            User student = member.getUser();

            List<UserTaskAttempt> allAttempts = userTaskAttemptRepository.findByUser(student);

            Map<Long, StudentTaskProgressDTO> bestResults = new HashMap<>();

            for (UserTaskAttempt attempt : allAttempts) {
                Long taskId = attempt.getTask().getId();
                if (!bestResults.containsKey(taskId) || attempt.getScorePercentage() > bestResults.get(taskId).getBestScore()) {
                    bestResults.put(taskId, new StudentTaskProgressDTO(
                            attempt.getTask().getId(),
                            attempt.getTask().getTitle(),
                            attempt.getTask().getTaskType(),
                            attempt.getTask().getDescription(),
                            attempt.getScorePercentage(),
                            attempt.getStars(),
                            attempt.getTimeSpent().getSeconds(),
                            attempt.getCompletedAt()
                    ));
                }
            }
            List<StudentTaskProgressDTO> sortedResults = bestResults.values().stream()
                    .sorted(Comparator.comparing(StudentTaskProgressDTO::getLastAttemptAt).reversed())
                    .toList();
            return new ClassStudentProgressDTO(student.getUsername(), sortedResults);
        }).toList();

        return new ClassDetailsResponse(schoolClass.getName(), studentProgress);
    }
    //student methods
    @Transactional
    public SchoolClassResponse joinClass(String joinCode, String studentUsername) {
        User student = userRepository.findByUsername(studentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SchoolClass schoolClass = schoolClassRepository.findByJoinCode(joinCode)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono klasy o podanym kodzie."));

        if (!schoolClass.isActiveClass()) {
            throw new RuntimeException("Ta klasa jest już nieaktywna.");
        }

        if (classMemberRepository.existsBySchoolClassAndUser(schoolClass, student)) {
            throw new RuntimeException("Już należysz do tej klasy.");
        }

        ClassMember membership = new ClassMember();
        membership.setSchoolClass(schoolClass);
        membership.setUser(student);
        membership.setRoleInClass("STUDENT");
        membership.setJoinedAt(OffsetDateTime.now());
        classMemberRepository.save(membership);

        int count = classMemberRepository.findAllBySchoolClass(schoolClass).size();
        return mapToResponse(schoolClass, count);
    }
    public List<SchoolClassResponse> getStudentSchoolClasses(String studentUsername) {
        User student = userRepository.findByUsername(studentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<ClassMember> memberships = classMemberRepository.findAllByUserAndSchoolClassActiveClassTrue(student);
        return memberships.stream()
                .map(m -> {
                    SchoolClass sc = m.getSchoolClass();
                    int count = classMemberRepository.findAllBySchoolClass(sc).size();
                    return mapToResponse(sc, count);
                })
                .toList();
    }
    @Transactional
    public void deactivateClass(Long classId, String teacherUsername) {
        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono klasy"));

        if (!schoolClass.getCreatedBy().getUsername().equals(teacherUsername)) {
            throw new RuntimeException("Nie masz uprawnień do usunięcia tej klasy");
        }
        schoolClass.setActiveClass(false);
        schoolClassRepository.save(schoolClass);
    }


    //mapper
    private SchoolClassResponse mapToResponse(SchoolClass schoolClass, int memberCount) {
        SchoolClassResponse response = new SchoolClassResponse();
        response.setId(schoolClass.getId());
        response.setName(schoolClass.getName());
        response.setDescription(schoolClass.getDescription());
        response.setJoinCode(schoolClass.getJoinCode());
        response.setTeacherUsername(schoolClass.getCreatedBy().getUsername());
        response.setCreatedAt(schoolClass.getCreatedAt());
        response.setActive(schoolClass.isActiveClass());
        response.setMemberCount(memberCount);
        return response;
    }
}

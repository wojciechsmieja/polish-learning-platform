package pl.eduapp.learning_platform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.dto.TaskResultResponse;
import pl.eduapp.learning_platform.dto.TaskSubmissionDTO;
import pl.eduapp.learning_platform.entity.*;
import pl.eduapp.learning_platform.repository.TaskRepository;
import pl.eduapp.learning_platform.repository.UserProfileRepository;
import pl.eduapp.learning_platform.repository.UserRepository;
import pl.eduapp.learning_platform.repository.UserTaskAttemptRepository;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProgressService {
    private final TaskRepository taskRepository;
    private final UserTaskAttemptRepository userTaskAttempRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final AchievementService achievementService;
    private final UserTaskAttemptRepository userTaskAttemptRepository;

    @Transactional
    public TaskResultResponse submitTask(TaskSubmissionDTO submission, String username){
        Task task = taskRepository.findById(submission.getTaskId()).orElseThrow();

        //current result
        double score = calculateScore(task, submission.getAnswers());
        int stars = calculateStars(score);
        int points = (int)(task.getDifficulty() *100*(score/100.0));
        //send this
        int starsToDisplay = stars;
        int pointsToDisplay = 0;
        boolean isLevelUp = false;
        List<Achievement> achievements = new ArrayList<>();

        //for authenticated users
        //best stars so far
        if(username != null) {
            User user = userRepository.findByUsername(username).orElseThrow();
            Integer bestStarsSoFar = userTaskAttemptRepository.findMaxStarsByUserAndTask(user, task);
            if (bestStarsSoFar == null) {
                bestStarsSoFar = 0;
            }

            //best score so far
            Double bestScoreSoFar = userTaskAttemptRepository.findMaxScoreByUserAndTask(user, task);
            if (bestScoreSoFar == null) {
                bestScoreSoFar = 0.0;
            }
            //this stars we add to profile
            int starsToAdd = Math.max(0, stars - bestStarsSoFar);
            //SAME WITH POINTS
            int bestPointsSoFar = (int) (task.getDifficulty() * 100 * (bestScoreSoFar / 100.0));
            int pointsToAdd = Math.max(0, points - bestPointsSoFar);

            //get profile
            UserProfile profile = userProfileRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            int oldLevel = profile.getLevel();
            //save attemp
            UserTaskAttempt attemp = new UserTaskAttempt();
            attemp.setUser(user);
            attemp.setTask(task);
            attemp.setScorePercentage(score);
            attemp.setStars(stars);
            attemp.setPoints(points);
            attemp.setTimeSpent(Duration.ofSeconds(submission.getTimeSpentSeconds()));
            attemp.setCompletedAt(OffsetDateTime.now());
            attemp.setCompleted(score >= 100.0);
            userTaskAttempRepository.save(attemp);

            //update statistics
            profile.setTotalStars(profile.getTotalStars() + starsToAdd);
            profile.setTotalPoints(profile.getTotalPoints() + pointsToAdd);

            int newLevel = (int) (profile.getTotalPoints() / 1000) + 1;
            profile.setLevel(newLevel);
            userProfileRepository.save(profile);

            isLevelUp = newLevel > oldLevel;
            achievements = achievementService.checkAndAward(user, attemp, userProfileRepository.findByUser(user).get());

            pointsToDisplay = pointsToAdd;
            starsToDisplay = starsToAdd;
        }else{
            pointsToDisplay = points;
        }

        return new TaskResultResponse(score, starsToDisplay, pointsToDisplay, score==100.0, isLevelUp,
                achievements.stream().map(Achievement::getName).toList());
    }

    private double calculateScore(Task task, Map<Long, String> userAnswers){
        if(userAnswers==null || userAnswers.isEmpty()){
            return 0.0;
        }
        double correctCount = 0.0;
        int totalItems = 0;
        switch (task.getTaskType()){
            case QUIZ:
                List<TaskQuizDetail> questions = task.getQuizDetails();
                totalItems = questions.size();
                for(TaskQuizDetail question : questions){
                    String selectedOptionIdStr = userAnswers.get(question.getId());
                    if(selectedOptionIdStr!=null){
                        Long selectedOptionId = Long.parseLong(selectedOptionIdStr);
                        boolean isCorrect = question.getOptions().stream()
                                .filter(opt -> opt.getId().equals(selectedOptionId))
                                .anyMatch(TaskQuizOption::getCorrectOption);

                        if(isCorrect){
                            correctCount++;
                        }
                    }
                }

                break;
            case COMPLETE_SENTENCE:
                List<TaskSentenceDetail> sentences = task.getSentenceDetails();
                totalItems = sentences.size();
                for(TaskSentenceDetail sentence : sentences){
                    String userAnswer = userAnswers.get(sentence.getId());
                    if(userAnswer!=null){
                        String cleanUserAnswer = userAnswer.trim().toLowerCase();
                        String cleanCorrectAnswer = sentence.getCoveredWords().trim().toLowerCase();
                        if(cleanUserAnswer.equals(cleanCorrectAnswer)){
                            correctCount++;
                        }
                    }
                }
                break;
            case ANALYSIS:
                break;
        }
        if(totalItems==0) return 0.0;

        return (correctCount/totalItems)*100.0;
    }
    private int calculateStars(double score){
        if(score >= 95) return 3;
        if(score >= 75) return 2;
        if(score >= 50) return 1;
        return 0;
    }

    private UserProfile updateUserProfile(User user, int stars, double score, int earnedPoints){
        //update userprofile
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(()->new RuntimeException("Profile not found"));
        profile.setTotalPoints(profile.getTotalPoints() + earnedPoints);
        profile.setTotalStars(profile.getTotalStars() + stars);
        int newLevel = (int)(profile.getTotalPoints()/1000)+1;
        profile.setLevel(newLevel);
        return userProfileRepository.save(profile);

    }
}

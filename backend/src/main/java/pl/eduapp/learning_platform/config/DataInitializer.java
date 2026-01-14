package pl.eduapp.learning_platform.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.eduapp.learning_platform.constant.TaskStatus;
import pl.eduapp.learning_platform.constant.TaskSubject;
import pl.eduapp.learning_platform.constant.TaskType;
import pl.eduapp.learning_platform.entity.*;
import pl.eduapp.learning_platform.repository.AchievementRepository;
import pl.eduapp.learning_platform.repository.TaskRepository;
import pl.eduapp.learning_platform.repository.UserProfileRepository;
import pl.eduapp.learning_platform.repository.UserRepository;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final AchievementRepository achievementRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileRepository userProfileRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 1. add achievements
        if (achievementRepository.count() == 0) {
            seedAchievements();
        }
        // 2. add users (admin, teacher i student)
        if (userRepository.count() == 0) {
            seedUsers();
        }
        // 3. add example tasks (2 quiz, 2 sentence)
        if (taskRepository.count() == 0) {
            seedTasks();
        }

    }
    private void seedAchievements() {
        Achievement achievement1 = new Achievement();
        achievement1.setName("Pierwszy krok");
        achievement1.setDescription("Rozwiązano pierwsze zadanie.");
        achievement1.setBadgeIcon("first_step.png");
        achievement1.setCriteria(Map.of("type", "TOTAL_TASKS", "value", 1));
        achievement1.setCategory("GENERAL");
        achievementRepository.save(achievement1);
        Achievement achievement2 = new Achievement();
        achievement2.setName("Perfekcjonista");
        achievement2.setDescription("Uzyskano 100% poprawności w dowolnym zadaniu.");
        achievement2.setBadgeIcon("perfect.png");
        achievement2.setCriteria(Map.of("type", "PERFECT_SCORE", "value", 1));
        achievement2.setCategory("ACCURACY");
        achievementRepository.save(achievement2);
        Achievement achievement3 = new Achievement();
        achievement3.setName("Mistrz Quizów");
        achievement3.setDescription("Rozwiązano 3 quizy.");
        achievement3.setBadgeIcon("quiz_master.png");
        achievement3.setCriteria(Map.of("type", "TASK_TYPE_COUNT", "value", 3, "taskType","QUIZ"));
        achievement3.setCategory("QUIZ");
        achievementRepository.save(achievement3);
        Achievement achievement4 = new Achievement();
        achievement4.setName("Kolekcjoner Gwiazdek");
        achievement4.setDescription("Zdobyto łącznie 10 gwiazdek.");
        achievement4.setBadgeIcon("star_collector.png");
        achievement4.setCriteria(Map.of("type", "TOTAL_STARS", "value", 10));
        achievement4.setCategory("STARS");
        achievementRepository.save(achievement4);
    }
    private void seedUsers() {
        //admin
        User user1 = new User();
        user1.setUsername("admin");
        user1.setPassword(passwordEncoder.encode("admin123"));
        user1.setRole("ADMIN");
        user1.setEmail("admin@app.com");
        userRepository.save(user1);
        UserProfile profile1 = new UserProfile();
        profile1.setUser(user1);
        profile1.setTotalPoints(0L);
        profile1.setTotalStars(0L);
        profile1.setLevel(1);
        userProfileRepository.save(profile1);
        //teacher
        User user2 = new User();
        user2.setUsername("teacher");
        user2.setPassword(passwordEncoder.encode("teacher123"));
        user2.setRole("TEACHER");
        user2.setEmail("teacher@app.com");
        userRepository.save(user2);
        UserProfile profile2 = new UserProfile();
        profile2.setUser(user2);
        profile2.setTotalPoints(0L);
        profile2.setTotalStars(0L);
        profile2.setLevel(1);
        userProfileRepository.save(profile2);
        //student
        User user3 = new User();
        user3.setUsername("student");
        user3.setPassword(passwordEncoder.encode("student123"));
        user3.setRole("STUDENT");
        user3.setEmail("student@app.com");
        userRepository.save(user3);
        UserProfile profile3 = new UserProfile();
        profile3.setUser(user3);
        profile3.setTotalPoints(0L);
        profile3.setTotalStars(0L);
        profile3.setLevel(1);
        userProfileRepository.save(profile3);
    }
    private void seedTasks() {
        Task task1 = new Task();
        task1.setTitle("Składnia języka polskiego");
        task1.setDescription("Rozpoznawanie podmiotu i orzeczenia");
        task1.setTaskType(TaskType.QUIZ);
        task1.setDifficulty(1);
        task1.setPublicTask(Boolean.TRUE);
        task1.setSyntaxType("Składnia");
        task1.setStatus(TaskStatus.APPROVED);
        task1.setSubject(TaskSubject.POLSKI);
        //questions
        TaskQuizDetail quizDetail1 = new TaskQuizDetail();
        quizDetail1.setQuestion("Którym członem zdania jest wyraz „kot” w zdaniu: Kot śpi na kanapie?");
        quizDetail1.setTask(task1);
        //options
        TaskQuizOption opt1 = new TaskQuizOption();
        opt1.setOptionText("Podmiot");
        opt1.setCorrectOption(true);
        opt1.setOptionOrder(1);
        opt1.setQuizDetail(quizDetail1);
        TaskQuizOption opt2 = new TaskQuizOption();
        opt2.setOptionText("Orzeczenie");
        opt2.setCorrectOption(false);
        opt2.setOptionOrder(2);
        opt2.setQuizDetail(quizDetail1);
        quizDetail1.setOptions(new ArrayList<>(List.of(opt1, opt2)));
        //questions
        TaskQuizDetail quizDetail2 = new TaskQuizDetail();
        quizDetail2.setQuestion("Którym członem zdania jest wyraz „czyta” w zdaniu: Ania czyta książkę?");
        quizDetail2.setTask(task1);
        //options
        TaskQuizOption opt3 = new TaskQuizOption();
        opt3.setOptionText("Podmiot");
        opt3.setCorrectOption(false);
        opt3.setOptionOrder(1);
        opt3.setQuizDetail(quizDetail2);
        TaskQuizOption opt4 = new TaskQuizOption();
        opt4.setOptionText("Orzeczenie");
        opt4.setCorrectOption(true);
        opt4.setOptionOrder(2);
        opt4.setQuizDetail(quizDetail2);
        quizDetail2.setOptions(new ArrayList<>(List.of(opt3, opt4)));
        //questions
        TaskQuizDetail quizDetail3 = new TaskQuizDetail();
        quizDetail3.setQuestion("Który wyraz jest podmiotem w zdaniu: Ala ma kota?");
        quizDetail3.setTask(task1);
        //options
        TaskQuizOption opt5 = new TaskQuizOption();
        opt5.setOptionText("Ala");
        opt5.setCorrectOption(true);
        opt5.setOptionOrder(1);
        opt5.setQuizDetail(quizDetail3);
        TaskQuizOption opt6 = new TaskQuizOption();
        opt6.setOptionText("ma");
        opt6.setCorrectOption(false);
        opt6.setOptionOrder(2);
        opt6.setQuizDetail(quizDetail3);
        TaskQuizOption opt7 = new TaskQuizOption();
        opt7.setOptionText("kota");
        opt7.setCorrectOption(false);
        opt7.setOptionOrder(3);
        opt7.setQuizDetail(quizDetail3);
        quizDetail3.setOptions(new ArrayList<>(List.of(opt5, opt6, opt7)));
        //questions
        TaskQuizDetail quizDetail4 = new TaskQuizDetail();
        quizDetail4.setQuestion("Którym członem jest wyraz „dziecko” w zdaniu: Dziecko śpi?");
        quizDetail4.setTask(task1);
        //options
        TaskQuizOption opt8 = new TaskQuizOption();
        opt8.setOptionText("Podmiot");
        opt8.setCorrectOption(true);
        opt8.setOptionOrder(1);
        opt8.setQuizDetail(quizDetail4);
        TaskQuizOption opt9 = new TaskQuizOption();
        opt9.setOptionText("Orzeczenie");
        opt9.setCorrectOption(false);
        opt9.setOptionOrder(2);
        opt9.setQuizDetail(quizDetail4);
        quizDetail4.setOptions(new ArrayList<>(List.of(opt8, opt9)));
        //questions
        TaskQuizDetail quizDetail5 = new TaskQuizDetail();
        quizDetail5.setQuestion("Co jest orzeczeniem w zdaniu: Tata codziennie pracuje?");
        quizDetail5.setTask(task1);
        //options
        TaskQuizOption opt10 = new TaskQuizOption();
        opt10.setOptionText("Tata");
        opt10.setCorrectOption(false);
        opt10.setOptionOrder(1);
        opt10.setQuizDetail(quizDetail5);
        TaskQuizOption opt11 = new TaskQuizOption();
        opt11.setOptionText("codziennie");
        opt11.setCorrectOption(false);
        opt11.setOptionOrder(2);
        opt11.setQuizDetail(quizDetail5);
        TaskQuizOption opt12 = new TaskQuizOption();
        opt12.setOptionText("pracuje");
        opt12.setCorrectOption(true);
        opt12.setOptionOrder(3);
        opt12.setQuizDetail(quizDetail5);
        quizDetail5.setOptions(new ArrayList<>(List.of(opt10, opt11, opt12)));
        task1.setQuizDetails(new ArrayList<>(List.of(quizDetail1, quizDetail2, quizDetail3, quizDetail4, quizDetail5)));
        taskRepository.save(task1);
        //second quiz
        Task task2 = new Task();
        task2.setTitle("Części mowy");
        task2.setDescription("Stopniowanie przymiotnika: określanie stopnia");
        task2.setTaskType(TaskType.QUIZ);
        task2.setDifficulty(1);
        task2.setPublicTask(Boolean.TRUE);
        task2.setSyntaxType("Przymiotnik");
        task2.setStatus(TaskStatus.APPROVED);
        task2.setSubject(TaskSubject.POLSKI);

        // question 1
        TaskQuizDetail quizDetail6 = new TaskQuizDetail();
        quizDetail6.setQuestion("Jaki to stopień przymiotnika: najmilszy?");
        quizDetail6.setTask(task2);

        TaskQuizOption opt13 = new TaskQuizOption();
        opt13.setOptionText("Stopień najwyższy");
        opt13.setCorrectOption(true);
        opt13.setOptionOrder(1);
        opt13.setQuizDetail(quizDetail6);

        TaskQuizOption opt14 = new TaskQuizOption();
        opt14.setOptionText("Stopień wyższy");
        opt14.setCorrectOption(false);
        opt14.setOptionOrder(2);
        opt14.setQuizDetail(quizDetail6);

        TaskQuizOption opt15 = new TaskQuizOption();
        opt15.setOptionText("Stopień równy");
        opt15.setCorrectOption(false);
        opt15.setOptionOrder(3);
        opt15.setQuizDetail(quizDetail6);

        quizDetail6.setOptions(new ArrayList<>(List.of(opt13, opt14, opt15)));

// question 2
        TaskQuizDetail quizDetail7 = new TaskQuizDetail();
        quizDetail7.setQuestion("Jaki to stopień przymiotnika: najlepszy?");
        quizDetail7.setTask(task2);

        TaskQuizOption opt16 = new TaskQuizOption();
        opt16.setOptionText("Stopień równy");
        opt16.setCorrectOption(false);
        opt16.setOptionOrder(1);
        opt16.setQuizDetail(quizDetail7);

        TaskQuizOption opt17 = new TaskQuizOption();
        opt17.setOptionText("Stopień wyższy");
        opt17.setCorrectOption(false);
        opt17.setOptionOrder(2);
        opt17.setQuizDetail(quizDetail7);

        TaskQuizOption opt18 = new TaskQuizOption();
        opt18.setOptionText("Stopień najwyższy");
        opt18.setCorrectOption(true);
        opt18.setOptionOrder(3);
        opt18.setQuizDetail(quizDetail7);

        quizDetail7.setOptions(new ArrayList<>(List.of(opt16, opt17, opt18)));

// question 3
        TaskQuizDetail quizDetail8 = new TaskQuizDetail();
        quizDetail8.setQuestion("Jaki to stopień przymiotnika: lepszy?");
        quizDetail8.setTask(task2);

        TaskQuizOption opt19 = new TaskQuizOption();
        opt19.setOptionText("Stopień równy");
        opt19.setCorrectOption(false);
        opt19.setOptionOrder(1);
        opt19.setQuizDetail(quizDetail8);

        TaskQuizOption opt20 = new TaskQuizOption();
        opt20.setOptionText("Stopień wyższy");
        opt20.setCorrectOption(true);
        opt20.setOptionOrder(2);
        opt20.setQuizDetail(quizDetail8);

        TaskQuizOption opt21 = new TaskQuizOption();
        opt21.setOptionText("Stopień najwyższy");
        opt21.setCorrectOption(false);
        opt21.setOptionOrder(3);
        opt21.setQuizDetail(quizDetail8);

        quizDetail8.setOptions(new ArrayList<>(List.of(opt19, opt20, opt21)));

// question 4
        TaskQuizDetail quizDetail9 = new TaskQuizDetail();
        quizDetail9.setQuestion("Jaki to stopień przymiotnika: większy?");
        quizDetail9.setTask(task2);

        TaskQuizOption opt22 = new TaskQuizOption();
        opt22.setOptionText("Stopień równy");
        opt22.setCorrectOption(false);
        opt22.setOptionOrder(1);
        opt22.setQuizDetail(quizDetail9);

        TaskQuizOption opt23 = new TaskQuizOption();
        opt23.setOptionText("Stopień wyższy");
        opt23.setCorrectOption(true);
        opt23.setOptionOrder(2);
        opt23.setQuizDetail(quizDetail9);

        TaskQuizOption opt24 = new TaskQuizOption();
        opt24.setOptionText("Stopień najwyższy");
        opt24.setCorrectOption(false);
        opt24.setOptionOrder(3);
        opt24.setQuizDetail(quizDetail9);

        quizDetail9.setOptions(new ArrayList<>(List.of(opt22, opt23, opt24)));

// question 5
        TaskQuizDetail quizDetail10 = new TaskQuizDetail();
        quizDetail10.setQuestion("Jaki to stopień przymiotnika: najładniejszy?");
        quizDetail10.setTask(task2);

        TaskQuizOption opt25 = new TaskQuizOption();
        opt25.setOptionText("Stopień najwyższy");
        opt25.setCorrectOption(true);
        opt25.setOptionOrder(1);
        opt25.setQuizDetail(quizDetail10);

        TaskQuizOption opt26 = new TaskQuizOption();
        opt26.setOptionText("Stopień wyższy");
        opt26.setCorrectOption(false);
        opt26.setOptionOrder(2);
        opt26.setQuizDetail(quizDetail10);

        TaskQuizOption opt27 = new TaskQuizOption();
        opt27.setOptionText("Stopień równy");
        opt27.setCorrectOption(false);
        opt27.setOptionOrder(3);
        opt27.setQuizDetail(quizDetail10);

        quizDetail10.setOptions(new ArrayList<>(List.of(opt25, opt26, opt27)));

        task2.setQuizDetails(new ArrayList<>(
                List.of(quizDetail6, quizDetail7, quizDetail8, quizDetail9, quizDetail10)
        ));

        taskRepository.save(task2);
        //sentences
        Task task3 = new Task();
        task3.setTitle("Części mowy");
        task3.setDescription("Odmiana przymiotnika – poziom łatwy");
        task3.setTaskType(TaskType.COMPLETE_SENTENCE);
        task3.setDifficulty(1);
        task3.setPublicTask(Boolean.TRUE);
        task3.setSyntaxType("Przymiotnik");
        task3.setStatus(TaskStatus.APPROVED);
        task3.setSubject(TaskSubject.POLSKI);

// sentence 1
        TaskSentenceDetail sentenceDetail11 = new TaskSentenceDetail();
        sentenceDetail11.setSentence("To jest bardzo ___ film.");
        sentenceDetail11.setCoveredWords("ciekawy");
        sentenceDetail11.setBaseWord("ciekawy");
        sentenceDetail11.setGrammarHint("l.poj., rodz. m.");
        sentenceDetail11.setSentenceOrder(1);
        sentenceDetail11.setExplenation("Przymiotnik zgadza się z rzeczownikiem „film”.");
        sentenceDetail11.setTask(task3);

// sentence 2
        TaskSentenceDetail sentenceDetail12 = new TaskSentenceDetail();
        sentenceDetail12.setSentence("Kupiłem ___ koszulę.");
        sentenceDetail12.setCoveredWords("nową");
        sentenceDetail12.setBaseWord("nowy");
        sentenceDetail12.setGrammarHint("l.poj., rodz. ż.");
        sentenceDetail12.setSentenceOrder(2);
        sentenceDetail12.setExplenation("KOGO? CO? „Koszulę” → rodzaj żeński");
        sentenceDetail12.setTask(task3);

// sentence 3
        TaskSentenceDetail sentenceDetail13 = new TaskSentenceDetail();
        sentenceDetail13.setSentence("To było ___ zadanie.");
        sentenceDetail13.setCoveredWords("łatwe");
        sentenceDetail13.setBaseWord("łatwy");
        sentenceDetail13.setGrammarHint("l.poj., rodz. n.");
        sentenceDetail13.setSentenceOrder(3);
        sentenceDetail13.setExplenation("„Zadanie” ma rodzaj nijaki, JAKIE? → „łatwe”.");
        sentenceDetail13.setTask(task3);

// sentence 4
        TaskSentenceDetail sentenceDetail14 = new TaskSentenceDetail();
        sentenceDetail14.setSentence("Mam ___ buty.");
        sentenceDetail14.setCoveredWords("czarne");
        sentenceDetail14.setBaseWord("czarny");
        sentenceDetail14.setGrammarHint("l.mn. rodz. n.");
        sentenceDetail14.setSentenceOrder(4);
        sentenceDetail14.setExplenation("Liczba mnoga: JAKIE → „czarne”.");
        sentenceDetail14.setTask(task3);

// sentence 5
        TaskSentenceDetail sentenceDetail15 = new TaskSentenceDetail();
        sentenceDetail15.setSentence("To jest ___ dom.");
        sentenceDetail15.setCoveredWords("duży");
        sentenceDetail15.setBaseWord("duży");
        sentenceDetail15.setGrammarHint("l.poj., rodz. m.");
        sentenceDetail15.setSentenceOrder(5);
        sentenceDetail15.setExplenation("Rodzaj męski, mianownik, JAKI → „duży”.");
        sentenceDetail15.setTask(task3);

        task3.setSentenceDetails(new ArrayList<>(
                List.of(sentenceDetail11, sentenceDetail12, sentenceDetail13, sentenceDetail14, sentenceDetail15)
        ));

        taskRepository.save(task3);
        //task5
        Task task5 = new Task();
        task5.setTitle("Składnia języka polskiego");
        task5.setDescription("Uzupełnianie zdań – orzeczenie i inne części zdania");
        task5.setTaskType(TaskType.COMPLETE_SENTENCE);
        task5.setDifficulty(1);
        task5.setPublicTask(Boolean.TRUE);
        task5.setSyntaxType("Składnia");
        task5.setStatus(TaskStatus.APPROVED);
        task5.setSubject(TaskSubject.POLSKI);

// sentence 1 – orzeczenie
        TaskSentenceDetail sentenceDetail21 = new TaskSentenceDetail();
        sentenceDetail21.setSentence("Ala ___ książkę.");
        sentenceDetail21.setCoveredWords("czyta");
        sentenceDetail21.setBaseWord("czytać");
        sentenceDetail21.setGrammarHint("orzeczenie, czas teraźniejszy");
        sentenceDetail21.setSentenceOrder(1);
        sentenceDetail21.setExplenation("Orzeczenie nazywa czynność wykonywaną przez podmiot.");
        sentenceDetail21.setTask(task5);

// sentence 2 – orzeczenie
        TaskSentenceDetail sentenceDetail22 = new TaskSentenceDetail();
        sentenceDetail22.setSentence("Pies ___ po ogrodzie.");
        sentenceDetail22.setCoveredWords("biega");
        sentenceDetail22.setBaseWord("biegać");
        sentenceDetail22.setGrammarHint("orzeczenie, l.poj.");
        sentenceDetail22.setSentenceOrder(2);
        sentenceDetail22.setExplenation("Czasownik odpowiada na pytanie: co robi?");
        sentenceDetail22.setTask(task5);

// sentence 3 – orzeczenie
        TaskSentenceDetail sentenceDetail23 = new TaskSentenceDetail();
        sentenceDetail23.setSentence("Dzieci ___ na podwórku.");
        sentenceDetail23.setCoveredWords("bawią się");
        sentenceDetail23.setBaseWord("bawić się");
        sentenceDetail23.setGrammarHint("orzeczenie, l.mn.");
        sentenceDetail23.setSentenceOrder(3);
        sentenceDetail23.setExplenation("Orzeczenie musi zgadzać się z podmiotem w liczbie.");
        sentenceDetail23.setTask(task5);

// sentence 4 – liczebnik
        TaskSentenceDetail sentenceDetail24 = new TaskSentenceDetail();
        sentenceDetail24.setSentence("Mam ___ zeszyty.");
        sentenceDetail24.setCoveredWords("trzy");
        sentenceDetail24.setBaseWord("trzy");
        sentenceDetail24.setGrammarHint("liczebnik, l.mn.");
        sentenceDetail24.setSentenceOrder(4);
        sentenceDetail24.setExplenation("Liczebnik określa liczbę przedmiotów.");
        sentenceDetail24.setTask(task5);

// sentence 5 – orzeczenie
        TaskSentenceDetail sentenceDetail25 = new TaskSentenceDetail();
        sentenceDetail25.setSentence("Tata ___ obiad.");
        sentenceDetail25.setCoveredWords("gotuje");
        sentenceDetail25.setBaseWord("gotować");
        sentenceDetail25.setGrammarHint("orzeczenie, czas teraźniejszy");
        sentenceDetail25.setSentenceOrder(5);
        sentenceDetail25.setExplenation("Orzeczenie jest najczęściej czasownikiem.");
        sentenceDetail25.setTask(task5);

        task5.setSentenceDetails(new ArrayList<>(
                List.of(
                        sentenceDetail21,
                        sentenceDetail22,
                        sentenceDetail23,
                        sentenceDetail24,
                        sentenceDetail25
                )
        ));

        taskRepository.save(task5);

    }
}

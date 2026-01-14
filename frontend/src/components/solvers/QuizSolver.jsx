import { useState } from 'react';
import api from '../../api';
import './QuizSolver.css';

function QuizSolver({ data, taskId, onFinish }) {
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [userAnswers, setUserAnswers] = useState({});
    const [isCurrentAnswerChecked, setIsCurrentAnswerChecked] = useState(false); 
    const [startTime] = useState(Date.now());
    const [isFinished, setIsFinished] = useState(false); 
    const [result, setResult] =useState('');

    const currentQuestion = data[currentIndex];

    const handleOptionChange = (questionId, optionId) => {
        if (isCurrentAnswerChecked) return; 
        setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleCheckCurrentQuestion = () => {
        if (!userAnswers[currentQuestion.id]) {
            alert("Wybierz jedną odpowiedź!");
            return;
        }
        setIsCurrentAnswerChecked(true);
    };

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsCurrentAnswerChecked(false);
        } else {
            submitFinalResults();
        }
    };

    const submitFinalResults = async () => {
        setResult('');
        try {
            const endTime = Date.now();
            const timeSpentSeconds = Math.floor((endTime - startTime) / 1000);
            const payload = {
                taskId: taskId,
                answers: userAnswers,
                timeSpentSeconds: timeSpentSeconds
            };
            const response = await api.post('/api/progress/submit', payload);
            console.log(response);
            const { scorePercentage, stars, pointsEarned, isLevelUp, newBadges } = response.data;

            let message = `Wynik: ${scorePercentage}% \nGwiazdki: ${stars} \nXP: +${pointsEarned} `;
            if (isLevelUp) message += "\n\nUdało ci się awansować na nowy poziom!";
            
            setResult(message);
            setIsFinished(true);
            if (onFinish) onFinish();
        } catch (error) {
            setResult("Nie udało się zapisać wyniku.");
        }
    };

    const getOptionClass = (opt) => {
        const isSelected = userAnswers[currentQuestion.id] === opt.id;
        if (!isCurrentAnswerChecked) {
            return isSelected ? "quiz-option selected" : "quiz-option";
        }
        if (opt.correctOption) return "quiz-option correct";
        if (isSelected && !opt.correctOption) return "quiz-option wrong";
        return "quiz-option disabled";
    };

    if (isFinished) {
        return (
            <div className='quiz-finish-screen'>
                <h2>Zadanie ukończone!</h2>
                {result && (
                    <p>{result}</p>
                )}
                <button onClick={() => window.location.reload()} className='nextBtn'>Zagraj jeszcze raz</button>
            </div>
        );
    }

    return (
        <div className='parentQuizSolver'>
            <div className="quiz-progress">
                Pytanie <span>{currentIndex + 1}</span> z {data.length}
            </div>

            <div className='question-card'>
                <h3 className='question-title'>{currentQuestion.question}</h3>
                
                <div className="options-container">
                    {currentQuestion.options.map((opt) => (
                        <label key={opt.id} className={getOptionClass(opt)}>
                            <input 
                                type="radio" 
                                name={`question-${currentQuestion.id}`}
                                checked={userAnswers[currentQuestion.id] === opt.id} 
                                onChange={() => handleOptionChange(currentQuestion.id, opt.id)}
                                disabled={isCurrentAnswerChecked}
                                style={{ display: 'none' }} 
                            />
                            <span className="option-indicator"></span>
                            {opt.optionText}
                        </label>
                    ))}
                </div>
            </div>

            <div className='quiz-actions'>
                {!isCurrentAnswerChecked ? (
                    <button onClick={handleCheckCurrentQuestion} className='checkBtn'>
                        Sprawdź odpowiedź!
                    </button>
                ) : (
                    <button onClick={handleNext} className='nextBtn'>
                        {currentIndex < data.length - 1 ? "Następne pytanie" : "Zakończ"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuizSolver;
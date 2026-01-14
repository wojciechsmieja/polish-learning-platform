import React, { useState, useEffect } from "react";
import api from '../../api';
import './SentenceSolver.css';

function SentenceSolver({ data, taskId, onFinish }) {
    // --- STANY ---
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({}); 
    const [isCurrentAnswerChecked, setIsCurrentAnswerChecked] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [isFinished, setIsFinished] = useState(false);
    const [backendResult, setBackendResult] = useState('');

    const currentItem = data[currentIndex];

    const handleInputChange = (id, value) => {
        if (isCurrentAnswerChecked) return; 
        setUserAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCheckCurrent = () => {
        const userAns = (userAnswers[currentItem.id] || "").trim().toLowerCase();
        const correctAns = currentItem.coveredWords.trim().toLowerCase();
        const isCorrect = userAns === correctAns;

        setResults(prev => ({ ...prev, [currentItem.id]: isCorrect }));
        setIsCurrentAnswerChecked(true);
    };

    const handleNextOrSubmit = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsCurrentAnswerChecked(false);
        } else {
            submitFinalResults();
        }
    };

    const submitFinalResults = async () => {
        setBackendResult('');
        try {
            const endTime = Date.now();
            const timeSpent = Math.floor((endTime - startTime) / 1000);
            
            const payload = {
                taskId: taskId,
                answers: userAnswers,
                timeSpentSeconds: timeSpent
            };

            const response = await api.post('/api/progress/submit', payload);
            const { scorePercentage, stars, pointsEarned, isLevelUp, newBadges } = response.data;
            
            let isGuest = !localStorage.getItem('token');
            let message = '';

            if (isGuest) {
                message = `Wynik: ${scorePercentage}%\n\nGdybyś był zalogowany, otrzymałbyś ${pointsEarned} XP!`;
            } else {
                message = `Zadanie zakończone! \nWynik: ${scorePercentage}% \nGwiazdki: ${stars} \nXP: +${pointsEarned}`;
                if (isLevelUp) message += "\n\nGratulacje! Awansowałeś/aś na nowy poziom.";
                if (newBadges?.length > 0) message += `\n\nNowe odznaki:\n- ${newBadges.join('\n- ')}`;
            }

            setBackendResult(message);
            setIsFinished(true);
            if (onFinish) onFinish();
        } catch (error) {
            console.error("Błąd zapisu postępu", error);
            alert("Nie udało się zapisać postępu na serwerze.");
        }
    };

    const reset = () => {
        setCurrentIndex(0);
        setUserAnswers({});
        setResults({});
        setIsCurrentAnswerChecked(false);
        setIsFinished(false);
        setStartTime(Date.now());
    };

    if (isFinished) {
        return (
            <div className="finish-card">
                <p>Udało Ci się uzupełnić wszystkie zdania!</p>
                {backendResult && (
                    <p>{backendResult}</p>
                )}
                <button onClick={() => window.location.reload()} className="nextBtn">Zagraj jeszcze raz</button>
            </div>
        );
    }

    const parts = currentItem.sentence.split(/_{2,}/);
    const correct = isCurrentAnswerChecked ? results[currentItem.id] : null;
    const inputClass = correct === null ? "" : (correct ? "input-correct" : "input-wrong");
    return (
        <div className="parentSentenceSolver">
            <div className="solver-progress">
                Zdanie <span>{currentIndex + 1}</span> z {data.length}
            </div>

            <div className="sentence-card">
                <div className="sentence-content">
                    <span className="text-part">{parts[0]}</span>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className={`sentence-input ${inputClass}`}
                            value={userAnswers[currentItem.id] || ''}
                            onChange={(e) => handleInputChange(currentItem.id, e.target.value)}
                            disabled={isCurrentAnswerChecked}
                            placeholder="..."
                        />
                        <span className="grammar-hint">
                            ({currentItem.baseWord} → {currentItem.grammarHint})
                        </span>
                    </div>
                    <span className="text-part">{parts[1]}</span>
                </div>

                {correct === false && (
                    <div className="explanation-bubble-help">
                        <span className="bulb"></span> {currentItem.explenation}
                    </div>
                )}
            </div>

            <div className="solver-actions">
                {!isCurrentAnswerChecked ? (
                    <button onClick={handleCheckCurrent} className="checkBtn">
                        Sprawdź! 
                    </button>
                ) : (
                    <button onClick={handleNextOrSubmit} className={`nextBtn ${correct ? 'pulse' : ''}`}>
                        {currentIndex < data.length - 1 ? "Następne zdanie" : "Zakończ zadanie"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default SentenceSolver;
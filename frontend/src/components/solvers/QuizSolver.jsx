import { useState, useEffect } from 'react';
import api from '../../api';
import './QuizSolver.css';
function QuizSolver({ data, taskId, onFinish }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [startTime, setStartTime] = useState(Date.now());

    const handleOptionChange = (questionId, optionId) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const checkQuiz = async () => {
        const newResults = {};
        data.forEach((question) => {
            const selectedOptionId = userAnswers[question.id];
            const selectedOption = question.options.find(opt => 
                opt.id === selectedOptionId);
            if(selectedOption){
                newResults[question.id]=selectedOption.correctOption;
            }else{
                newResults[question.id]=false;
            }
        });
        setResults(newResults);
        try{
            const endTime = Date.now();
            const timeSpentSeconds = Math.floor((endTime-startTime)/1000);
            const payload = {
                taskId: taskId,
                answers: userAnswers,
                timeSpentSeconds: timeSpentSeconds
            };
            const response = await api.post('/api/progress/submit', payload);
            const {scorePercentage, stars, pointsEarned, isLevelUp, newBadges} = response.data;
            let message = `Zadanie zakończone! \nWynik: ${scorePercentage}% \nGwiazdki: ${stars} \nXP: +${pointsEarned}`;
            if(isLevelUp){
                message += "Gratulacje! Awansowałeś/aś na nowy poziom.";
            }
            if(newBadges && newBadges.length>0){
                message += `\n\nZdobyte nowe odznaki:\n- ${newBadges.join('\n- ')}`;
            }
            console.log(response.data);
            alert(message);
            console.log(message);
            if(onFinish) onFinish();
        }catch (error){
            console.error("Błąd podczas wysyłania wyniku: ", error);
            alert("Nie udało się zapisać postepów");
        }
    };
    const isChecked = results !== null;
    const getOptionColor = (opt, qId) => {
        if (!isChecked) return '#eee';
        if (opt.correctOption) return 'green';
        if (userAnswers[qId] === opt.id && !opt.correctOption) return 'red';
        return '#eee';
    };
    useEffect(()=>{
        console.log(results);
    },[results]);
    //console.log(isChecked);
    return (
         <div className='parentQuizSolver'>
            {data.map((q) => (
                <div key={q.id} className='questionCard'>
                    <h4 className='h4QuizSolver'>{q.question}</h4>
                    {q.options.map((opt) => (
                        <div key={opt.id} className='quizOption'>
                            <label style={{ 
                                color: getOptionColor(opt, q.id),
                                fontWeight: isChecked && opt.correctOption ? 'bold' : 'normal',
                                cursor: isChecked ? 'default' : 'pointer'
                            }}>
                                <input 
                                    type="radio" 
                                    name={`question-${q.id}`}
                                    value = {opt.id}
                                    checked={userAnswers[q.id] === opt.id} 
                                    onChange={() => handleOptionChange(q.id, opt.id)}
                                    disabled={isChecked}
                                />
                                {opt.optionText}
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            <div style={{ marginTop: '20px' }}>
                {!isChecked ? (
                    <button onClick={checkQuiz}>Sprawdź odpowiedzi</button>
                ) : (
                    <button onClick={() => { setResults(null); setUserAnswers({}); setStartTime(Date.now()); }}>
                        Spróbuj ponownie
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuizSolver;
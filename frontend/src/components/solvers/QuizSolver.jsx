import { useState, useEffect } from 'react';
import api from '../../api';
function QuizSolver({ data, taskId }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [startTime] = useState(Date.now());

    const handleOptionChange = (questionId, optionId) => {
        setUserAnswers({ ...userAnswers, [questionId]: optionId });
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
        }catch (error){
            console.error("Błąd podczas wysyłania wyniku: ", error);
            alert("Nie udało się zapisać postepów");
        }
    };
    const isChecked = results !== null;
    const getOptionColor = (opt, qId) => {
        if (!isChecked) return 'black';
        if (opt.correctOption) return 'green';
        if (userAnswers[qId] === opt.id && !opt.correctOption) return 'red';
        return 'black';
    };
    useEffect(()=>{
        console.log(results);
    },[results]);

    return (
         <div style={{ padding: '20px' }}>
            {data.map((q) => (
                <div key={q.id} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px' }}>
                    <h4>{q.question}</h4>
                    
                    {q.options.map((opt) => (
                        <div key={opt.id}>
                            <label style={{ 
                                color: getOptionColor(opt, q.id),
                                fontWeight: isChecked && opt.correctOption ? 'bold' : 'normal',
                                cursor: isChecked ? 'default' : 'pointer'
                            }}>
                                <input 
                                    type="radio" 
                                    name={`question-${q.id}`} 
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
                    <button onClick={() => { setResults(null); setUserAnswers({}); }}>
                        Spróbuj ponownie
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuizSolver;
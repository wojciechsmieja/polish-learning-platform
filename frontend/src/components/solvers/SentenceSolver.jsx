import React from "react";
import { useState, useEffect } from 'react';
import api from '../../api';
function SentenceSolver({data, taskId}){

    useEffect(()=>{
        console.log("Dane: ", data);
    },[data]);
    console.log(data);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [startTime, setStartTime] = useState(Date.now());  
    const handleInputChange = (id, value) => {
        setUserAnswers(prev =>({
            ...prev,
            [id]: value
        }));
    };

    const checkAnswers = async() => {
        const newResults = {};
        data.forEach((item) => {
            const userAns = (userAnswers[item.id] || "").trim().toLowerCase();
            const correctAns = item.coveredWords.trim().toLowerCase();
            if(userAns===correctAns){
                newResults[item.id] = true;
            }else{
                newResults[item.id] = false;
            }
        });
        setResults(newResults);
        console.log("wyniki: ", newResults);
        console.log("odpowiedzi", userAnswers);

        try{
            const endTime = Date.now();
            const timeSpent = Math.floor((endTime-startTime)/1000);
            const payload = {
                taskId: taskId,
                answers: userAnswers,
                timeSpentSeconds:timeSpent
            };
            console.log("payload", payload);
            const response = await api.post('/api/progress/submit', payload);
            const {scorePercentage, stars, pointsEarned, isLevelUp, newBadges} = response.data;
            let message = `Zadanie zakończone! \nWynik: ${scorePercentage}% \nGwiazdki: ${stars} \nXP: +${pointsEarned}`;
            if(isLevelUp){
                message += "Gratulacje! Awansowałeś/aś na nowy poziom.";
            }
            if(newBadges && newBadges.length>0){
                message += `\n\nZdobyte nowe odznaki:\n- ${newBadges.join('\n- ')}`;
            }
            alert(message);
        }catch (error){
            console.error("Błąd zapisu postępu", error);
        }
    };
    const isChecked = results !== null;
    
    console.log(isChecked);
    return (
       <div style={{ padding: '20px', lineHeight: '2.5' }}>
            {data.map((item) => {
                const parts = item.sentence.split(/_{2,}/);
                const correct = results ? results[item.id] : null;
                return (
                    <div key={item.id} style={{ marginBottom: '20px', fontSize: '18px' }}>
                        <span>{parts[0]}</span>
                        <input
                            type="text"
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            disabled={isChecked}
                            placeholder="wpisz..."
                            style={{
                                border: 'none',
                                borderBottom: correct === null 
                                    ? '2px solid #333' 
                                    : (correct ? '3px solid green' : '3px solid red'),
                                outline: 'none',
                                padding: '0 5px',
                                width: '120px',
                                textAlign: 'center',
                                fontSize: '18px'
                            }}
                        />

                        <span> ({item.baseWord} {item.grammarHint}) </span>
                        <span>{parts[1]}</span>
                        {correct === false && (
                            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {item.explenation}
                            </p>
                        )}
                    </div>
                );
            })}       
            <div style={{ marginTop: '20px' }}>   
                {!isChecked ? (
                    <button 
                        onClick={()=>checkAnswers()}
                        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Sprawdź
                    </button>
                ):(
                    <button onClick={() => { setResults(null); setUserAnswers({}); setStartTime(Date.now()); }}>
                        Spróbuj ponownie
                    </button>
                )}
            </div> 
        </div>
    );
}
export default SentenceSolver;
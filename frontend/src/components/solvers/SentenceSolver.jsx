import React from "react";
import { useState, useEffect } from 'react';
import api from '../../api';
function SentenceSolver({data}){

    useEffect(()=>{
        console.log("Dane: ", data);
    },[data]);
    console.log(data);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(false);  
    const handleInputChange = (index, value) => {
        setUserAnswers({
            ...userAnswers,
            [index]: value
        });
    };
    const checkAnswers = () => {
        const newResults = {};
        data.forEach((item, index) => {
            const userAns = (userAnswers[index] || "").trim().toLowerCase();
            const correctAns = item.coveredWords.trim().toLowerCase();
            if(userAns===correctAns){
                newResults[index] = true;
            }else{
                newResults[index] = false;
            }
        });
        setResults(newResults);
        console.log("wyniki: ", newResults);
        try{
            const payload = {
                taskId: taskId,
                answers: userAnswers
            };
            //const response = await api.post('/api/progress/submit', payload);
            alert(`Gratulacje! Zdobyłeś/aś: ${response.data.pointsAwarded} punktów!`);

            if(response.data.newBadge){
                alert(`Odblokowałeś/aś nową odznakę: ${response.data.newBadge.name}!`);
            }

        }catch (error){
            console.error("Błąd zapisu postępu", error);
        }

    };
    return (
       <div style={{ padding: '20px', lineHeight: '2.5' }}>
            {data.map((item, index) => {
                const parts = item.sentence.split(/_{2,}/);
                const correct = results ? results[index] : null;
                return (
                    <div key={item.id || index} style={{ marginBottom: '20px', fontSize: '18px' }}>
                        <span>{parts[0]}</span>
                        <input
                            type="text"
                            value={userAnswers[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
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
            <button 
                onClick={()=>checkAnswers()}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Sprawdź
            </button>
        </div>
    );
}
export default SentenceSolver;
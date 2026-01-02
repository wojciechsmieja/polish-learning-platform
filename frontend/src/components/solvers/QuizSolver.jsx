import { useState, useEffect } from 'react';

function QuizSolver({ data }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    const handleOptionChange = (questionId, optionId) => {
        setUserAnswers({ ...userAnswers, [questionId]: optionId });
    };

    const checkQuiz = () => {
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
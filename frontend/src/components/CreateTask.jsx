import { useState } from 'react';
import api from '../api';

function CreateTask() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        taskType: 'QUIZ',
        difficulty: 1,
        publicTask: true,
        syntaxType: '',
        subject:'POLSKI',
        quizDetails: [],
        sentenceDetails: [],
        analysisDetails: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Wysyłany json:\n ",JSON.stringify(task, null, 2));
        try {
            await api.post('/api/tasks/create', task);
            if(localStorage.getItem('role')==="TEACHER"){
                alert("Zadanie dodane pomyślnie! Teraz czeka na akceptację u administratora.");
            }else{
                alert("Dodano zadanie!")
            }
        } catch (error) {
            alert("Błąd: " + (error.response?.data || "Nie udało się dodać zadania"));
        }
    };

    const addQuizQuestion = () => {
        setTask({
            ...task,
            quizDetails: [...task.quizDetails, { question: '', options: [] }]
        });
    };
    const addQuizOption = (qIdx) => {
        const newQuizDetails = [...task.quizDetails];
        newQuizDetails[qIdx].options.push({
            optionText: '',
            correctOption: false,
            optionOrder: newQuizDetails[qIdx].options.length+1
        });
        setTask({
            ...task,
            quizDetails: newQuizDetails
        });
    };
    const handleQuestionChange = (qIdx, value) => {
        const newQuizDetails = [...task.quizDetails];
        newQuizDetails[qIdx].question = value;
        setTask({...task, quizDetails: newQuizDetails});
    };
    const handleOptionChange = (qIdx, oIdx, field, value) => {
        const newQuizDetails = [...task.quizDetails];
        //update specific option
        newQuizDetails[qIdx].options[oIdx][field] = value;
        //check if one option is correct
        if(field === 'correctOption' && value===true){
            newQuizDetails[qIdx].options.forEach((opt, idx)=>{
                if(idx !== oIdx) opt.correctOption = false;
            });
        }
        setTask({...task, quizDetails: newQuizDetails});
    }
    const handleSentenceOptionChange = (qIdx, field, value) => {
        const newSentsDetails = [...task.sentenceDetails];
        newSentsDetails[qIdx][field] = value;
        setTask({...task, sentenceDetails: newSentsDetails});
    };
    const addSentence = () =>{
        setTask({
            ...task, 
            sentenceDetails: [
                ...task.sentenceDetails, 
                { 
                    sentence: '', 
                    coveredWords: '',
                    baseWord: '',
                    grammarHint: '',
                    sentenceOrder:task.sentenceDetails.length+1,
                    explenation:'' }]
        });
    };
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Stwórz nowe zadanie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Tytuł" 
                    value={task.title}
                    onChange={e => setTask({...task, title: e.target.value})} 
                    style={inputStyle} 
                />
                <input 
                    placeholder="Opis" 
                    value={task.description}
                    onChange={e => setTask({...task, description: e.target.value})} 
                    style={inputStyle} 
                />
                <select 
                    value={task.taskType} 
                    onChange={e => setTask({...task, taskType: e.target.value, quizDetails:[], sentenceDetails:[]})}
                    style={inputStyle}
                >
                    <option value="QUIZ">Quiz</option>
                    <option value="COMPLETE_SENTENCE">Uzupełnianie zdań</option>
                </select>
                
                <input 
                    type="number" min="1" max="3" 
                    value={task.difficulty}
                    onChange={e => setTask({...task, difficulty: parseInt(e.target.value) || 1})} 
                    style={inputStyle} 
                />

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input 
                        type="checkbox"  
                        checked={task.publicTask}
                        onChange={e => setTask({...task, publicTask: e.target.checked})} 
                    /> Publiczne zadanie?               
                </label>

                <input 
                    placeholder="Kategoria (np. Rzeczownik)" 
                    value={task.syntaxType}
                    onChange={e => setTask({...task, syntaxType: e.target.value})} 
                    style={inputStyle} 
                />

                {/*QUIZ*/}
                {task.taskType === 'QUIZ' && (
                    <div style={sectionStyle}>
                        <h3>Pytania Quizu</h3>
                        {task.quizDetails.map((q, qIdx) => (
                            <div key={qIdx} style={questionBoxStyle}>
                                <input 
                                    placeholder={`Pytanie nr ${qIdx + 1}`}
                                    value={q.question}
                                    onChange={e => handleQuestionChange(qIdx, e.target.value)}
                                    style={inputStyle}
                                />
                                
                                <div style={{ marginLeft: '20px' }}>
                                    {q.options.map((o, oIdx) => (
                                        <div key={oIdx} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                                            <input
                                                placeholder={`Odpowiedź ${oIdx + 1}`}
                                                value={o.optionText}
                                                onChange={e => handleOptionChange(qIdx, oIdx, 'optionText', e.target.value)}
                                            />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={o.correctOption}
                                                    onChange={e => handleOptionChange(qIdx, oIdx, 'correctOption', e.target.checked)}
                                                /> Poprawna?
                                            </label>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addQuizOption(qIdx)}>
                                        + Dodaj odpowiedź
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addQuizQuestion} style={{ marginTop: '10px' }}>
                            + Dodaj nowe pytanie
                        </button>
                    </div>
                )}

                {task.taskType === 'COMPLETE_SENTENCE' && (
                    <div style={sectionStyle}>
                        <h3>Zdania (użyj ___ dla luki)</h3>
                        {task.sentenceDetails.map((s, sIdx) => (
                            <div key={sIdx} style={questionBoxStyle}>
                                <input 
                                    placeholder="Zdanie, np: Ala ma ___." 
                                    value={s.sentence}
                                    onChange={e => handleSentenceOptionChange(sIdx, "sentence", e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    placeholder="Ukryte słowo (odpowiedź)" 
                                    value={s.coveredWords}
                                    onChange={e => handleSentenceOptionChange(sIdx, "coveredWords", e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    placeholder="Słowo bazowe" 
                                    value={s.baseWord}
                                    onChange={e => handleSentenceOptionChange(sIdx, "baseWord", e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    placeholder="Podpowiedź odnoście rodzaju/ liczby np. l. poj., rodz. m." 
                                    value={s.grammarHint}
                                    onChange={e => handleSentenceOptionChange(sIdx, "grammarHint", e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    placeholder="Wyjaśnienie" 
                                    value={s.explenation}
                                    onChange={e => handleSentenceOptionChange(sIdx, "explenation", e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addSentence}>
                            + Dodaj zdanie
                        </button>
                    </div>
                )}

                <button type="submit" style={submitBtnStyle}>Zapisz całe zadanie w bazie</button>
            </form>
        </div>
    );
}

const inputStyle = { width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' };
const sectionStyle = { border: '2px solid #007bff', padding: '15px', marginBottom: '20px', borderRadius: '8px' };
const questionBoxStyle = { border: '1px solid #3b3b3bff', padding: '10px', marginBottom: '15px', backgroundColor: '#969696ff' };
const submitBtnStyle = { backgroundColor: '#0084ffff', color: 'white', padding: '12px 24px', cursor: 'pointer', border: 'none', borderRadius: '4px', width: '100%', fontSize: '16px' };

export default CreateTask;
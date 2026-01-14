import { useState } from 'react';
import api from '../api';
import './CreateTask.css';

function CreateTask() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        taskType: 'QUIZ',
        difficulty: 1,
        publicTask: true,
        syntaxType: '',
        subject: 'POLSKI',
        quizDetails: [],
        sentenceDetails: [],
        analysisDetails: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/tasks/create', task);
            if (localStorage.getItem('role') === "TEACHER") {
                alert("Zadanie dodane pomyślnie! Teraz czeka na akceptację administratora.");
            } else {
                alert("Dodano zadanie!");
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
            optionOrder: newQuizDetails[qIdx].options.length + 1
        });
        setTask({ ...task, quizDetails: newQuizDetails });
    };

    const handleQuestionChange = (qIdx, value) => {
        const newQuizDetails = [...task.quizDetails];
        newQuizDetails[qIdx].question = value;
        setTask({ ...task, quizDetails: newQuizDetails });
    };

    const handleOptionChange = (qIdx, oIdx, field, value) => {
        const newQuizDetails = [...task.quizDetails];
        newQuizDetails[qIdx].options[oIdx][field] = value;
        if (field === 'correctOption' && value === true) {
            newQuizDetails[qIdx].options.forEach((opt, idx) => {
                if (idx !== oIdx) opt.correctOption = false;
            });
        }
        setTask({ ...task, quizDetails: newQuizDetails });
    };

    const handleSentenceOptionChange = (qIdx, field, value) => {
        const newSentsDetails = [...task.sentenceDetails];
        newSentsDetails[qIdx][field] = value;
        setTask({ ...task, sentenceDetails: newSentsDetails });
    };

    const addSentence = () => {
        setTask({
            ...task,
            sentenceDetails: [
                ...task.sentenceDetails,
                {
                    sentence: '',
                    coveredWords: '',
                    baseWord: '',
                    grammarHint: '',
                    sentenceOrder: task.sentenceDetails.length + 1,
                    explenation: ''
                }]
        });
    };

    return (
        <div className="creator-wrapper">
            <div className="creator-card">
                <h2>Stwórz nowe zadanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="base-info-section">
                        <label className="input-label">Tytuł zadania:</label>
                        <input
                            className="creator-input"
                            placeholder="Tytuł"
                            value={task.title}
                            onChange={e => setTask({ ...task, title: e.target.value })}
                        />
                        <label className="input-label">Opis:</label>
                        <input
                            className="creator-input"
                            placeholder="Opis"
                            value={task.description}
                            onChange={e => setTask({ ...task, description: e.target.value })}
                        />
                        <div className="input-row">
                            <div className="input-half">
                                <label className="input-label">Typ zadania:</label>
                                <select
                                    className="creator-input"
                                    value={task.taskType}
                                    onChange={e => setTask({ ...task, taskType: e.target.value, quizDetails: [], sentenceDetails: [] })}
                                >
                                    <option value="QUIZ">Quiz</option>
                                    <option value="COMPLETE_SENTENCE">Uzupełnianie zdań</option>
                                </select>
                            </div>
                            <div className="input-half">
                                <label className="input-label">Trudność (1-3):</label>
                                <input
                                    className="creator-input"
                                    type="number" min="1" max="3"
                                    value={task.difficulty}
                                    onChange={e => setTask({ ...task, difficulty: parseInt(e.target.value) || 1 })}
                                />
                            </div>
                        </div>

                        <input
                            className="creator-input"
                            placeholder="Kategoria (np. Rzeczownik)"
                            value={task.syntaxType}
                            onChange={e => setTask({ ...task, syntaxType: e.target.value })}
                        />

                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={task.publicTask}
                                onChange={e => setTask({ ...task, publicTask: e.target.checked })}
                            />
                            <span>Publiczne zadanie</span>
                        </label>
                    </div>


                    {task.taskType === 'QUIZ' && (
                        <div className="dynamic-section">
                            <h3>Pytania Quizu</h3>
                            {task.quizDetails.map((q, qIdx) => (
                                <div key={qIdx} className="question-box">
                                    <input
                                        className="creator-input"
                                        placeholder={`Treść pytania nr ${qIdx + 1}`}
                                        value={q.question}
                                        onChange={e => handleQuestionChange(qIdx, e.target.value)}
                                    />
                                    <div className="options-list">
                                        {q.options.map((o, oIdx) => (
                                            <div key={oIdx} className="option-row">
                                                <input
                                                    className="creator-input small-input"
                                                    placeholder={`Odpowiedź ${oIdx + 1}`}
                                                    value={o.optionText}
                                                    onChange={e => handleOptionChange(qIdx, oIdx, 'optionText', e.target.value)}
                                                />
                                                <label className="correct-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={o.correctOption}
                                                        onChange={e => handleOptionChange(qIdx, oIdx, 'correctOption', e.target.checked)}
                                                    /> Poprawna
                                                </label>
                                            </div>
                                        ))}
                                        <button className="add-item-btn" type="button" onClick={() => addQuizOption(qIdx)}>
                                            Dodaj odpowiedź
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="add-main-btn" type="button" onClick={addQuizQuestion}>
                                Dodaj nowe pytanie
                            </button>
                        </div>
                    )}


                    {task.taskType === 'COMPLETE_SENTENCE' && (
                        <div className="dynamic-section">
                            <h3>Zdania (użyj ___ dla luki)</h3>
                            {task.sentenceDetails.map((s, sIdx) => (
                                <div key={sIdx} className="question-box">
                                    <input
                                        className="creator-input"
                                        placeholder="Zdanie, np: Ala ma ___."
                                        value={s.sentence}
                                        onChange={e => handleSentenceOptionChange(sIdx, "sentence", e.target.value)}
                                    />
                                    <div className="input-row">
                                        <input
                                            className="creator-input input-half"
                                            placeholder="Odpowiedź (ukryte słowo)"
                                            value={s.coveredWords}
                                            onChange={e => handleSentenceOptionChange(sIdx, "coveredWords", e.target.value)}
                                        />
                                        <input
                                            className="creator-input input-half"
                                            placeholder="Słowo bazowe"
                                            value={s.baseWord}
                                            onChange={e => handleSentenceOptionChange(sIdx, "baseWord", e.target.value)}
                                        />
                                    </div>
                                    <input
                                        className="creator-input"
                                        placeholder="Podpowiedź gramatyczna"
                                        value={s.grammarHint}
                                        onChange={e => handleSentenceOptionChange(sIdx, "grammarHint", e.target.value)}
                                    />
                                    <textarea
                                        className="creator-input creator-textarea"
                                        placeholder="Wyjaśnienie błędu"
                                        value={s.explenation}
                                        onChange={e => handleSentenceOptionChange(sIdx, "explenation", e.target.value)}
                                    />
                                </div>
                            ))}
                            <button className="add-main-btn" type="button" onClick={addSentence}>
                                Dodaj nowe zdanie
                            </button>
                        </div>
                    )}

                    <button type="submit" className="submit-task-btn">Zapisz zadanie w bazie</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
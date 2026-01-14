import React from 'react';

function TaskPreview({ task }) {
    if (!task) return null;

    const renderQuiz = () => (
        <div>
            <h4>Pytania i odpowiedzi:</h4>
            {task.quizDetails?.map((q, i) => (
                <div key={q.id || i} style={itemContainerStyle}>
                    <p><strong>{i + 1}. {q.question}</strong></p>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {q.options?.map((opt, j) => (
                            <li key={opt.id || j} style={{ 
                                color: opt.correctOption ? '#28a745' : '#333',
                                fontWeight: opt.correctOption ? 'bold' : 'normal',
                                marginBottom: '4px'
                            }}>
                                {opt.correctOption ? 'poprawna' : 'zła '}
                                {opt.optionText}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderSentence = () => (
        <div>
            <h4>Zdania do uzupełnienia:</h4>
            {task.sentenceDetails?.map((s, i) => (
                <div key={s.id || i} style={itemContainerStyle}>
                    <p><strong>{s.sentenceOrder || i + 1}. Zdanie:</strong> {s.sentence}</p>
                    <p>
                        Poprawna odpowiedź: <span style={highlightStyle}>{s.coveredWords}</span>
                    </p>
                    <p style={hintStyle}>
                        <small>
                            Słowo bazowe: <strong>{s.baseWord || '---'}</strong> | 
                            Podpowiedź: <strong>{s.grammarHint || '---'}</strong>
                        </small>
                    </p>
                    {s.explenation && (
                        <p style={explanationStyle}>
                            <small>Wyjaśnienie: {s.explenation}</small>
                        </p>
                    )}
                </div>
            ))}
        </div>
    );

    const renderAnalysis = () => (
        <div>
            <h4>Analiza zdania:</h4>
            {task.analysisDetails?.map((a, i) => (
                <div key={a.id || i} style={itemContainerStyle}>
                    <p><strong>Zdanie:</strong> {a.sentence}</p>
                    <table style={miniTableStyle}>
                        <thead>
                            <tr style={{backgroundColor: '#eee'}}>
                                <th style={miniThStyle}>Słowo</th>
                                <th style={miniThStyle}>Analiza gramatyczna</th>
                            </tr>
                        </thead>
                        <tbody>
                            {a.wordsAndVariety && Object.entries(a.wordsAndVariety).map(([word, variety]) => (
                                <tr key={word} style={{borderBottom: '1px solid #ddd'}}>
                                    <td style={miniTdStyle}><strong>{word}</strong></td>
                                    <td style={miniTdStyle}>{variety}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );

    // Wybór widoku na podstawie typu
    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: '15px', color: '#555' }}>
                <strong>Opis zadania:</strong> {task.description || "Brak opisu"}
            </div>
            
            {task.taskType === 'QUIZ' && renderQuiz()}
            {task.taskType === 'COMPLETE_SENTENCE' && renderSentence()}
            {task.taskType === 'ANALYSIS' && renderAnalysis()}
            
            {(!task.quizDetails?.length && !task.sentenceDetails?.length && !task.analysisDetails?.length) && (
                <p style={{color: 'orange'}}>Uwaga: To zadanie nie posiada jeszcze żadnych szczegółów (pytań/zdań)!</p>
            )}
        </div>
    );
}

const containerStyle = {
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'left'
};

const itemContainerStyle = {
    marginBottom: '20px',
    padding: '10px',
    borderLeft: '4px solid #007bff',
    backgroundColor: '#f8f9fa'
};

const highlightStyle = {
    color: '#28a745',
    fontWeight: 'bold',
    backgroundColor: '#e9f7ef',
    padding: '2px 6px',
    borderRadius: '4px'
};

const hintStyle = {
    color: '#666',
    margin: '5px 0'
};

const explanationStyle = {
    fontStyle: 'italic',
    color: '#555',
    backgroundColor: '#fff3cd',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '5px'
};

const miniTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    fontSize: '0.9rem'
};

const miniThStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
};

const miniTdStyle = {
    padding: '8px'
};

export default TaskPreview;
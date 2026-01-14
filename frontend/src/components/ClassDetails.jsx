import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './ClassDetails.css';

function ClassDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedStudents, setExpandedStudents] = useState({});

    // STANY FILTRÓW
    const [filterType, setFilterType] = useState('ALL');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        api.get(`/api/classes/${id}/details`)
            .then(res => {
                setDetails(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const toggleStudent = (username) => {
        setExpandedStudents(prev => ({ ...prev, [username]: !prev[username] }));
    };

    if (loading) return <div className="loader">Ładowanie statystyk klasy...</div>;
    if (!details) return <div className="error-info">Błąd ładowania danych.</div>;

    const filteredStudents = details.students.map(student => {
        const filteredResults = student.taskResults.filter(res => {
            const matchesType = filterType === 'ALL' || res.taskType === filterType;
            const attemptDate = new Date(res.lastAttemptAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (end) end.setHours(23, 59, 59, 999);
            const matchesDate = (!start || attemptDate >= start) && (!end || attemptDate <= end);
            return matchesType && matchesDate;
        });
        return { ...student, taskResults: filteredResults };
    });

    return (
        <div className="details-container">
            <h2 className="details-title">Statystyki klasy: {details.className}</h2>

            {/* PASEK FILTRÓW */}
            <div className="filter-bar">
                <div className="filter-group">
                    <label>Typ zadania:</label>
                    <select className="kids-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                        <option value="ALL">Wszystko</option>
                        <option value="QUIZ">Quizy</option>
                        <option value="COMPLETE_SENTENCE">Uzupełnianie zdań</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Od:</label>
                    <input className="kids-input-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="filter-group">
                    <label>Do:</label>
                    <input className="kids-input-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <button className="reset-btn" onClick={() => {setFilterType('ALL'); setStartDate(''); setEndDate('');}}>
                    Resetuj filtry
                </button>
            </div>

            {/* LISTA UCZNIÓW */}
            <div className="students-list">
                {filteredStudents.map(student => {
                    const isExpanded = expandedStudents[student.username];
                    return (
                        <div key={student.username} className={`student-card ${isExpanded ? 'active' : ''}`}>
                            <div onClick={() => toggleStudent(student.username)} className="student-header">
                                <span className="student-info">
                                    <span className="avatar">👤</span> 
                                    <strong>{student.username}</strong> 
                                    <span className="task-count">({student.taskResults.length} zadań)</span>
                                </span>
                                <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
                            </div>

                            {isExpanded && (
                                <div className="student-content">
                                    {student.taskResults.length === 0 ? (
                                        <p className="no-results">Brak zadań spełniających kryteria filtra.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="stats-table">
                                                <thead>
                                                    <tr>
                                                        <th>Zadanie</th>
                                                        <th>Wynik</th>
                                                        <th>Gwiazdki</th>
                                                        <th>Data</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {student.taskResults.map((res, idx) => (
                                                        <tr key={idx}>
                                                            <td className="task-title-cell">{res.taskTitle}</td>
                                                            <td className="score-cell">
                                                                <span className={`score-badge ${res.bestScore >= 90 ? 'high' : ''}`}>
                                                                    {res.bestScore}%
                                                                </span>
                                                            </td>
                                                            <td className="stars-cell">{"⭐".repeat(res.bestStars)}</td>
                                                            <td className="date-cell">{new Date(res.lastAttemptAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ClassDetails;
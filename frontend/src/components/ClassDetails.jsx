import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

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
                alert("Błąd pobierania danych");
                setLoading(false);
            });
    }, [id]);

    const toggleStudent = (username) => {
        setExpandedStudents(prev => ({ ...prev, [username]: !prev[username] }));
    };

    if (loading) return <p>Ładowanie...</p>;
    if (!details) return <p>Błąd ładowania danych.</p>;

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ color: '#000' }}>Statystyki klasy: {details.className}</h2>

        
            <div style={filterBarStyle}>
                <div style={filterItem}>
                    <label>Typ zadania:</label>
                    <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                        <option value="ALL">Wszystko</option>
                        <option value="QUIZ">Quizy</option>
                        <option value="COMPLETE_SENTENCE">Uzupełnianie zdań</option>
                    </select>
                </div>
                <div style={filterItem}>
                    <label>Od:</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div style={filterItem}>
                    <label>Do:</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <button onClick={() => {setFilterType('ALL'); setStartDate(''); setEndDate('');}}>Resetuj</button>
            </div>

            {filteredStudents.map(student => {
                const isExpanded = expandedStudents[student.username];
                return (
                    <div key={student.username} style={studentCardStyle}>
                        <div onClick={() => toggleStudent(student.username)} style={headerStyle}>
                            <span>👤 {student.username} ({student.taskResults.length} zadań)</span>
                            <span>{isExpanded ? '🔼' : '🔽'}</span>
                        </div>

                        {isExpanded && (
                            <div style={{ padding: '15px' }}>
                                {student.taskResults.length === 0 ? (
                                    <p style={{ color: '#ddd' }}>Brak zadań spełniających kryteria filtra.</p>
                                ) : (
                                    <table style={tableStyle}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#9a9a9aff' }}>
                                                <th>Zadanie</th>
                                                <th>Wynik</th>
                                                <th>Gwiazdki</th>
                                                <th>Data ukończenia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student.taskResults.map((res, idx) => (
                                                <tr key={idx}>
                                                    <td style={tdStyle}>{res.taskTitle}</td>
                                                    <td style={tdStyle}>{res.bestScore}%</td>
                                                    <td style={tdStyle}>⭐ {res.bestStars}</td>
                                                    <td style={tdStyle}>{new Date(res.lastAttemptAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}


const filterBarStyle = {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#414141',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
};

const filterItem = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
};

const studentCardStyle = { border: '1px solid rgb(66, 66, 66)', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', backgroundColor:'#4d4d4d', color:'#ddd' };
const headerStyle = { padding: '10px 15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: 'rgb(61, 61, 61)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const tdStyle = { padding: '8px', borderBottom: '1px solid #ddd' };

export default ClassDetails;
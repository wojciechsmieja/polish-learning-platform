import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function ClassDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        api.get(`/api/classes/${id}/details`)
            .then(res => setDetails(res.data))
            .catch(err => alert("Błąd pobierania danych"));
    }, [id]);
    console.log(details);

    if (!details) return <p>Ładowanie szczegółów klasy...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Statystyki klasy: {details.className}</h2>
            
            {details.students.length === 0 ? <p style={{ color:'#000'}}>Brak uczniów w tej klasie.</p> : (
                details.students.map(student => (
                    <div key={student.username} style={studentCardStyle}>
                        <h3>Uczeń: {student.username}</h3>
                        {student.taskResults.length === 0 ? (
                            <p style={{ color: 'gray' }}>Ten uczeń nie rozwiązał jeszcze żadnych zadań.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                                        <th style={thStyle}>Zadanie</th>
                                        <th style={thStyle}>Opis</th>
                                        <th style={thStyle}>Najlepszy wynik</th>
                                        <th style={thStyle}>Gwiazdki</th>
                                        <th style={thStyle}>Czas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.taskResults.map((res, idx) => (
                                        <tr key={idx}>
                                            <td style={tdStyle}>{res.taskTitle}</td>
                                            <td style={tdStyle}>{res.taskDescription}</td>
                                            <td style={tdStyle}>{res.bestScore}%</td>
                                            <td style={tdStyle}>⭐ {res.bestStars}</td>
                                            <td style={tdStyle}>{res.secondsSpent}s</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

const studentCardStyle = { border: '1px solid #8d8d8dff', padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#b3b2b2ff', color:'#000' };
const thStyle = { textAlign: 'center', padding: '8px', color: '#555' };
const tdStyle = { padding: '8px' };

export default ClassDetails;
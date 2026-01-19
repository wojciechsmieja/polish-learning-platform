import { useEffect, useState } from 'react';
import api from '../api';
import './StudentClasses.css';

function StudentClasses() {
    const [classes, setClasses] = useState([]);
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMyClasses();
    }, []);

    const fetchMyClasses = async () => {
        try {
            const res = await api.get('/api/classes/student');
            setClasses(res.data);
        } catch (err) {
            console.error("Błąd pobierania Twoich klas:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/api/classes/join', { joinCode });
            setClasses([...classes, res.data]);
            setJoinCode('');
        } catch (err) {
            setError(err.response?.data?.message || "Kod jest niepoprawny lub już tu jesteś.");
        }
    };

    return (
        <div className="classes-page-container">
            <h2 className="classes-title">Moje Klasy i Grupy</h2>

            <div className="join-class-box">
                {/*<h4>Masz tajny kod od nauczyciela?</h4>*/}
                <p>Wpisz kod tutaj, aby dołączyć do nowej grupy:</p>
                {error && <div key={error} className="error-bubble">{error}</div>}
                <form onSubmit={handleJoin} className="join-form">
                    <input 
                        className="join-input-code"
                        placeholder="KOD-123" 
                        value={joinCode}
                        maxLength={8}
                        required
                        onChange={e => setJoinCode(e.target.value.toUpperCase())}
                    />
                    <button type="submit" className="join-btn">Dołącz!</button>
                </form>
                
            </div>

            <div className="divider-line"></div>

            {loading ? (
                <div className="loader">Ładowanie Twoich klas...</div>
            ) : (
                <div className="classes-grid">
                    {classes.length === 0 ? (
                        <p className="no-classes-info">Nie należysz jeszcze do żadnej klasy. Poproś nauczyciela o kod.</p>
                    ) : (
                        classes.map(c => (
                            <div key={c.id} className="class-card">
                                <div className="class-card-icon"></div>
                                <h3>{c.name}</h3>
                                <p>Nauczyciel: <span>{c.teacherUsername}</span></p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentClasses;
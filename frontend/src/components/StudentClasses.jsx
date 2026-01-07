import { useState, useEffect } from 'react';
import api from '../api';

function StudentClasses() {
    const [classes, setClasses] = useState([]);
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(true);

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
        try {
            const res = await api.post('/api/classes/join', { joinCode });
            setClasses([...classes, res.data]);
            setJoinCode('');
            alert("Dołączono do klasy: " + res.data.name);
        } catch (err) {
            alert(err.response?.data?.message || "Nieprawidłowy kod lub już należysz do tej klasy.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Twoje Klasy i Grupy</h2>

            {/* Dołączanie do klasy */}
            <div style={{ backgroundColor: '#a8a8a8ff', padding: '20px', borderRadius: '10px', marginBottom: '30px',color:'#000' }}>
                <h4>Masz kod od nauczyciela? Dołącz do nowej grupy:</h4>
                <form onSubmit={handleJoin} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        placeholder="Wpisz 8-znakowy kod" 
                        value={joinCode}
                        maxLength={8}
                        required
                        onChange={e => setJoinCode(e.target.value.toUpperCase())}
                    />
                    <button type="submit" style={{ backgroundColor: '#0084ffff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}>
                        Dołącz
                    </button>
                </form>
            </div>

            <hr />

            {loading ? <p>Ładowanie...</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {classes.length === 0 ? <p>Nie należysz jeszcze do żadnej klasy.</p> : 
                        classes.map(c => (
                            <div key={c.id} style={{ width: '200px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                <h3>{c.name}</h3>
                                <p style={{ fontSize: '14px' }}>Nauczyciel: <strong>{c.teacherUsername}</strong></p>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default StudentClasses;
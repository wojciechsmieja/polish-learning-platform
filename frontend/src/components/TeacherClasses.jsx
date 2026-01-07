import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function TeacherClasses() {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await api.get('/api/classes/teacher');
            setClasses(res.data);
        } catch (err) {
            console.error("Błąd pobierania klas:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/classes/create', newClass);
            setClasses([...classes, res.data]);
            setNewClass({ name: '', description: '' });
            alert("Klasa utworzona! Kod: " + res.data.joinCode);
        } catch (err) {
            alert("Błąd tworzenia klasy: " + (err.response?.data || "Błąd serwera"));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Panel Nauczyciela: Twoje Klasy</h2>
            
            {/* Formularz tworzenia */}
            <form onSubmit={handleCreate} style={formStyle}>
                <input 
                    placeholder="Nazwa klasy (np. 3A Angielski)" 
                    value={newClass.name}
                    required
                    onChange={e => setNewClass({...newClass, name: e.target.value})}
                />
                <input 
                    placeholder="Opis grupy" 
                    value={newClass.description}
                    onChange={e => setNewClass({...newClass, description: e.target.value})}
                />
                <button type="submit">Utwórz nową klasę</button>
            </form>

            <hr />

            {loading ? <p>Ładowanie klas...</p> : (
                <div style={listStyle}>
                    {classes.map(c => (
                        <div key={c.id} style={cardStyle} onClick={()=>navigate(`/teacher/classes/${c.id}/details`)}>
                            <h3>{c.name}</h3>
                            <p>{c.description}</p>
                            <div style={codeBox}>
                                <strong>KOD DOŁĄCZENIA:</strong> 
                                <span style={codeText}>{c.joinCode}</span>
                            </div>
                            <small>Uczniów w grupie: {c.memberCount}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Proste style
const formStyle = { display: 'flex', gap: '10px', marginBottom: '30px' };
const listStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', color:'#000000ff' };
const cardStyle = { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#a3a3a3ff',color:'#000' };
const codeBox = { margin: '10px 0', padding: '10px', backgroundColor: 'rgba(209, 209, 209, 1)', borderRadius: '5px', textAlign: 'center',color:'#000' };
const codeText = { display: 'block', fontSize: '20px', letterSpacing: '2px', color: '#005' };

export default TeacherClasses;
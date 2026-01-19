import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './TeacherClasses.css'; 

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
            // new alert
        } catch (err) {
            alert("Błąd tworzenia klasy: " + (err.response?.data || "Błąd serwera"));
        }
    };

    const handleDeleteClass = async (e, classId) => {
        e.stopPropagation(); 
        if (window.confirm("Czy na pewno chcesz usunąć tę klasę? Uczniowie stracą do niej dostęp.")) {
            try {
                await api.patch(`/api/classes/deactivate/${classId}`);
                setClasses(classes.filter(c => c.id !== classId));
            } catch (err) {
                console.error("Błąd usuwania:", err);
            }
        }
    };

    return (
        <div className="teacher-container">
            <h2 className="teacher-title">Panel Nauczyciela: Twoje Klasy</h2>
            
            <div className="create-class-card">
                <h3>Stwórz nową grupę</h3>
                <form onSubmit={handleCreate} className="teacher-form">
                    <input 
                        className="teacher-input"
                        placeholder="Nazwa klasy (np. 3A Angielski)" 
                        value={newClass.name}
                        required
                        onChange={e => setNewClass({...newClass, name: e.target.value})}
                    />
                    <input 
                        className="teacher-input"
                        placeholder="Krótki opis grupy" 
                        value={newClass.description}
                        onChange={e => setNewClass({...newClass, description: e.target.value})}
                    />
                    <button type="submit" className="create-btn">Dodaj klasę</button>
                </form>
            </div>

            <div className="divider-line"></div>

            {loading ? (
                <div className="loader">Ładowanie Twoich grup...</div>
            ) : (
                <div className="teacher-classes-grid">
                    {classes.map(c => (
                        <div key={c.id} className="teacher-class-card">
                            <div className="class-card-header">
                                <h3>{c.name}</h3>
                                <button 
                                    onClick={(e) => handleDeleteClass(e, c.id)}
                                    className="delete-icon-btn"
                                    title="Usuń klasę"
                                >
                                    Usuń
                                </button>
                            </div>
                            
                            <p className="class-description">{c.description || "Brak opisu klasy."}</p>
                            
                            <div className="join-code-box">
                                <small>KOD DOŁĄCZENIA</small>
                                <span className="join-code-text">{c.joinCode}</span>
                            </div>
                            
                            <div className="class-card-footer">
                                <span>👥 Uczniów: <strong>{c.memberCount}</strong></span>
                                <span className="go-details" onClick={() => navigate(`/teacher/classes/${c.id}/details`)}>Szczegóły</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TeacherClasses;
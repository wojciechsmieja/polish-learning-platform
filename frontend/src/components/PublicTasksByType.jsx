import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import './PublicTasksByType.css';

function PublicTasksByType() {
    const { type } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const typeLabel = {
        QUIZ: "QUIZY",
        COMPLETE_SENTENCE: "UZUPEŁNIANIE ZDAŃ",
        ANALYSIS: "ANALIZY"
    }
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/tasks/public/${type}`);
                setTasks(response.data);
            } catch (error) {
                console.error("Błąd pobierania zadań:", error);
                alert("Nie udało się pobrać zadań.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [type]); 
    if (loading) return <p>Ładowanie zadań...</p>;
    return (
        <div className="publicTaskParent">
            <h2>Dostępne {typeLabel[type] ?? type}</h2>
            {tasks.length === 0 ? (
                <p>Brak dostępnych zadań tego typu.</p>
            ) : (
                <ul className='taskGrid'>
                    {tasks.map(task => (
                        <li key={task.id} className='taskCard'>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <small>Trudność: {task.difficulty}/3</small>
                            <div className="stars">
                                {[1, 2, 3].map(star => (
                                    <span key={star} style={{ color: star <= task.userStars ? 'gold' : 'grey' }}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            <Link to={`/tasks/${task.id}`}>
                                <button style={{ backgroundColor: '#0084ffff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', marginTop:'10px' }}>Rozwiąż</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PublicTasksByType;
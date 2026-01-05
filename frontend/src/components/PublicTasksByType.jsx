import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function PublicTasksByType() {
    const { type } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div style={{ padding: '20px' }}>
            <h2>Zadania publiczne: {type}</h2>
            {tasks.length === 0 ? (
                <p>Brak dostępnych zadań tego typu.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <li key={task.id} style={{ 
                            border: '1px solid #ddd', 
                            marginBottom: '10px', 
                            padding: '15px',
                            borderRadius: '8px' 
                        }}>
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
                            {task.isCompleted && <span className="badge">ZALICZONE ✅</span>}
                            <br />
                            <Link to={`/tasks/${task.id}`}>
                                <button style={{ marginTop: '10px' }}>Rozwiąż</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PublicTasksByType;
import { useEffect, useState } from 'react';
import api from '../api';

function AdminTaskManage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await api.get('/api/tasks/admin/all'); 
        setTasks(res.data);
    };

    const handleToggleVisibility = async (taskId, currentStatus) => {
        try {
            await api.patch(`/api/tasks/${taskId}/visibility?isPublic=${!currentStatus}`);
            loadTasks(); 
        } catch (err) {
            alert("Błąd zmiany widoczności");
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm("Czy na pewno chcesz TRWALE usunąć to zadanie?")) {
            try {
                await api.delete(`/api/tasks/${taskId}`);
                setTasks(tasks.filter(t => t.id !== taskId)); 
            } catch (err) {
                alert("Błąd podczas usuwania");
            }
        }
    };

    return (
        <div style={{ padding: '20px', marginTop:'60px' }}>
            <h2>Zarządzaj zadaniami</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Typ</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t => (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>{t.taskType}</td>
                            <td>{t.publicTask ? "Publiczne" : "Ukryte"}</td>
                            <td>
                                <button style={{backgroundColor: '#0084ffff'}} onClick={() => handleToggleVisibility(t.id, t.publicTask)}>
                                    {t.publicTask ? "Ukryj" : "Opublikuj"}
                                </button>
                                {/*<button 
                                    onClick={() => handleDelete(t.id)} 
                                    style={{ marginLeft: '10px', color: 'red' }}
                                >
                                    Usuń trwale
                                </button>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminTaskManage;
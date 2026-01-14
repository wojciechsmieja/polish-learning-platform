import { useEffect, useState } from 'react';
import api from '../api';
import './AdminTaskManage.css';

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
        <div className="admin-wrapper">
            <div className="admin-card">
                <h2 className="admin-title">Zarządzaj zadaniami</h2>
                <table className="manage-table">
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
                                <td className="font-bold">{t.title}</td>
                                <td>{t.description}</td>
                                <td><span className="type-badge">{t.taskType}</span></td>
                                <td>
                                    <span className={t.publicTask ? "status-public" : "status-hidden"}>
                                        {t.publicTask ? "Publiczne" : "Ukryte"}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn-toggle" 
                                        onClick={() => handleToggleVisibility(t.id, t.publicTask)}
                                    >
                                        {t.publicTask ? "Ukryj" : "Opublikuj"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminTaskManage;
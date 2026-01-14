import { useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import TaskPreview from "../components/TaskPreview";
import './AdminModeration.css';

function AdminModeration() {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        fetchPendingTasks();
    }, []);

    const fetchPendingTasks = async () => {
        try {
            const res = await api.get('/api/tasks/pending');
            setPendingTasks(res.data);
        } catch (err) {
            console.error("Błąd pobierania zadań:", err);
            alert("Nie udało się pobrać listy oczekujących zadań.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            await api.patch(`/api/tasks/${taskId}/status`, null, {
                params: { status: newStatus }
            });
            setPendingTasks(pendingTasks.filter(task => task.id !== taskId));
        } catch (err) {
            console.error("Błąd zmiany statusu:", err);
            alert("Wystąpił błąd podczas próby zmiany statusu zadania.");
        }
    };

    if (loading) return <div className="loader">Ładowanie poczekalni...</div>;

    return (
        <div className="admin-wrapper">
            <div className="admin-card">
                <h2 className="admin-title">Panel Moderacji</h2>

                {pendingTasks.length === 0 ? (
                    <p className="no-tasks-info">Brak zadań do zatwierdzenia.</p>
                ) : (
                    <div className="table-container">
                        <table className="moderation-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tytuł</th>
                                    <th>Typ</th>
                                    <th>Przedmiot</th>
                                    <th>Kategoria</th>
                                    <th>Autor</th>
                                    <th>Trudność</th>
                                    <th>Treść</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingTasks.map(task => (
                                    <React.Fragment key={task.id}>
                                        <tr className={expandedTaskId === task.id ? "row-expanded" : ""}>
                                            <td>{task.id}</td>
                                            <td className="font-bold">{task.title}</td>
                                            <td><span className="badge-info">{task.taskType}</span></td>
                                            <td>{task.subject}</td>
                                            <td>{task.syntaxType}</td>
                                            <td>{task.createdByUsername}</td>
                                            <td><span className="difficulty-text">{task.difficulty}</span></td>
                                            <td>
                                                <button 
                                                    className="btn-preview"
                                                    onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                                                >
                                                    {expandedTaskId === task.id ? "Ukryj" : "Podgląd"}
                                                </button>
                                            </td>               
                                            <td className="actions-cell">
                                                <button 
                                                    onClick={() => handleStatusUpdate(task.id, 'APPROVED')}
                                                    className="btn-approve"
                                                >
                                                    Zatwierdź
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(task.id, 'REJECTED')}
                                                    className="btn-reject"
                                                >
                                                    Odrzuć
                                                </button>
                                            </td>
                                        </tr>
                                
                                        {expandedTaskId === task.id && (
                                            <tr>
                                                <td colSpan="9" className="preview-container">
                                                    <div className="preview-wrapper">
                                                        <TaskPreview task={task} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminModeration;
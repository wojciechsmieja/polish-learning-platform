import { useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import TaskPreview from "../components/TaskPreview"

function AdminModeration() {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    // get pending 
    useEffect(() => {
        fetchPendingTasks();
    }, []);

    const fetchPendingTasks = async () => {
        try {
            const res = await api.get('/api/tasks/pending');
            setPendingTasks(res.data);
            console.log(res.data);
        } catch (err) {
            console.error("Błąd pobierania zadań:", err);
            alert("Nie udało się pobrać listy oczekujących zadań.");
        } finally {
            setLoading(false);
        }
    };

    // approve/reject

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {

            await api.patch(`/api/tasks/${taskId}/status`, null, {
                params: { status: newStatus }
            });

            // Usuwamy zadanie z lokalnego stanu, żeby zniknęło z listy
            setPendingTasks(pendingTasks.filter(task => task.id !== taskId));
            
            alert(newStatus === 'APPROVED' ? "Zadanie zatwierdzone!" : "Zadanie odrzucone.");
        } catch (err) {
            console.error("Błąd zmiany statusu:", err);
            alert("Wystąpił błąd podczas próby zmiany statusu zadania.");
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Ładowanie poczekalni...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ borderBottom: '2px solid #0084ffff', paddingBottom: '10px' }}>
                🛡️ Panel Moderacji (Oczekujące)
            </h2>

            {pendingTasks.length === 0 ? (
                <p style={{ marginTop: '20px', color: '#666' }}>Brak zadań do zatwierdzenia.</p>
            ) : (
                <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={{ backgroundColor: '#464646' }}>
                                <th style={thStyle}>ID</th>
                                <th style={thStyle}>Tytuł</th>
                                <th style={thStyle}>Typ</th>
                                <th style={thStyle}>Przedmiot</th>
                                <th style={thStyle}>Zadanie o:</th>
                                <th style={thStyle}>Autor</th>
                                <th style={thStyle}>Trudność</th>
                                <th style={thStyle}>Rozwiń</th>
                                <th style={thStyle}>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingTasks.map(task => (
                                <React.Fragment key={task.id}>
                                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={tdStyle}>{task.id}</td>
                                        <td style={tdStyle}><strong>{task.title}</strong></td>
                                        <td style={tdStyle}>{task.taskType}</td>
                                        <td style={tdStyle}>{task.subject}</td>
                                        <td style={tdStyle}>{task.syntaxType}</td>
                                        <td style={tdStyle}>{task.createdByUsername}</td>
                                        <td style={tdStyle}>{task.difficulty}</td>
                                        <td>
                                            <button onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}>
                                                {expandedTaskId === task.id ? "Ukryj" : "Podgląd treści"}
                                            </button>
                                        </td>               
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button 
                                                    onClick={() => handleStatusUpdate(task.id, 'APPROVED')}
                                                    style={approveBtnStyle}
                                                >
                                                    Zatwierdź
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(task.id, 'REJECTED')}
                                                    style={rejectBtnStyle}
                                                >
                                                    Odrzuć
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                            
                                    {/* WIERSZ Z PODGLĄDEM */}
                                    {expandedTaskId === task.id && (
                                        <tr>
                                            <td colSpan="7" style={{ backgroundColor: '#f9f9f9', padding: '20px', border: '2px solid #007bff' }}>
                                                <TaskPreview task={task} />
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
    );
}

// --- STYLE ---
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
};

const thStyle = {
    padding: '12px',
    borderBottom: '2px solid #ddd'
};

const tdStyle = {
    padding: '12px'
};

const approveBtnStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const rejectBtnStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default AdminModeration;
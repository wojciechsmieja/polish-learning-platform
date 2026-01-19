import { useEffect, useState } from 'react';
import api from '../api';
import './AdminTaskManage.css';

function AdminTaskManage() {
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchId, setSearchId] = useState('');
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
    const filteredTasks = tasks.filter(task => {
        const matcherStatus = filterStatus === 'all' ||
            (filterStatus === 'public' && task.publicTask) ||
            (filterStatus === 'hidden' && !task.publicTask);
        const matcherId = searchId === '' || task.id.toString().includes(searchId);
        return matcherStatus && matcherId;
    })

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
                <div className='admin-filters'>
                    <div className='filter-group'>
                        <label htmlFor="status-filter">Status:</label>
                        <select id="status-filter"
                        value={filterStatus}
                        onChange={(e)=>setFilterStatus(e.target.value)}
                        className="filter-select"
                        >
                            <option value="all">Wszystkie</option>
                            <option value="hidden">Ukryte</option>
                            <option value="public">Publiczne</option>
                        </select>
                    </div>
                    <div className='filter-group'>
                        <label htmlFor='id-search'>Numer zadania:</label>
                        <input
                            id="id-search"
                            type='text'
                            placeholder='Wpisz numer zadania...'
                            value={searchId}
                            onChange={(e)=>setSearchId(e.target.value)}
                            className='filter-input'
                            ></input>
                    </div>
                </div>
                <table className="manage-table">
                    <thead>
                        <tr>
                            <th>Numer</th>
                            <th>Tytuł</th>
                            <th>Opis</th>
                            <th>Typ</th>
                            <th>Status</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(t => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
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
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './TaskLeaderboard.css';

function TaskLeaderboard({ taskId, refreshTrigger }) {
    const [entries, setEntries] = useState([]);

    const fetchLeaderboard = () => {
        api.get(`/api/tasks/${taskId}/leaderboard`)
            .then(res => setEntries(res.data))
            .catch(err => console.error("Leaderboard error:", err));
    };

    useEffect(()=>{
        fetchLeaderboard();

    },[taskId, refreshTrigger]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (entries.length === 0){ return (
        <div className="sidebarStyle">
                <h4 className='h4TaskLeaderboard'>🏆 Rekordy</h4>
                <p className="sidebarStyleP">Bądź pierwszy, który ukończy to zadanie na 100%!</p>
        </div>
    )}; 

    return (
        <div className="sidebarStyle">
            <h4 className='h4TaskLeaderboard'>Najszybsi użytkownicy (100%)</h4>
            <table style={{ width: '100%', fontSize: '14px' }}>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index} className={index === 0 ? 'firstPlaceTaskLeaderboard' : index === 1 ? 'secondPlaceTaskLeaderboard' : index === 2 ? 'thirdPlaceTaskLeaderboard' : 'entryStyle'}>
                            <td>
                                <Link to={`/profile/${entry.username}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                    {index + 1}. <strong>{entry.username}</strong>
                                </Link>
                            </td>
                            <td style={{ textAlign: 'center', color: '#666' }}>{entry.secondsSpent}s</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default TaskLeaderboard;
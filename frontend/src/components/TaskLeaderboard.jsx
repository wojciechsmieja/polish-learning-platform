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
                <h4 className='h4TaskLeaderboard'>Najszybsi użytkownicy (100%)</h4>
                <p className="sidebarStyleP">Bądź pierwszy, który ukończy to zadanie na 100%!</p>
        </div>
    )}; 

    return (
        <div className="sidebar-leaderboard">
            <h4 className='leaderboard-title'>Najszybsi (100%)</h4>
            <div className="leaderboard-list">
                {entries.map((entry, index) => (
                    <div 
                        key={index} 
                        className={`leaderboard-entry rank-${index + 1}`}
                    >
                        <div className="rank-badge">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </div>
                        <div className="user-info">
                            <Link to={`/profile/${entry.username}`} className="user-link">
                                {entry.username}
                            </Link>
                        </div>
                        <div className="time-value">
                            {formatTime(entry.secondsSpent)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default TaskLeaderboard;
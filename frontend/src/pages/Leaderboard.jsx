import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Leaderboard.css';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    useEffect(() => {
        api.get('/api/profile/leaderboard')
            .then(res => setLeaders(res.data))
            .catch(err => console.error(err));
    }, []);
    console.log(leaders);
    return (
        <div className='parent'>
            <h2>🏆 Ranking Globalny</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                        <th>#</th>
                        <th>Użytkownik</th>
                        <th>Poziom</th>
                        <th>Punkty XP</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.map((user, index) => (
                        
                        <tr key={user.username} className={index < 3 ? 'podium' : 'rest'}>
                            <td>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </td>
                            <td style={{ fontWeight: 'bold' }}>
                                <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                    {user.username}
                                </Link>
                            </td>
                                
                            <td>{user.level}</td>
                            <td>{user.totalPoints}</td>
                            
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
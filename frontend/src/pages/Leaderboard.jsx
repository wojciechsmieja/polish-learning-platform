import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Leaderboard.css';

function Leaderboard() {
    const [data, setData] = useState({ topTen: [], currentUserEntry: null, currentUserRank: null });
    const loggedInUser = localStorage.getItem('username'); 

    useEffect(() => {
        api.get('/api/profile/leaderboard')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    const isUserInTopTen = data.topTen.some(user => user.username === loggedInUser);

    return (
        <div className='parent'>
            <h2>Ranking Globalny</h2>
            <table className='leaderboard-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Użytkownik</th>
                        <th>Poziom</th>
                        <th>Punkty XP</th>
                    </tr>
                </thead>
                <tbody>
                    {data.topTen.map((user, index) => (
                        <tr 
                            key={user.username} 
                            
                            className={`${index < 3 ? 'podium' : 'rest'} ${user.username === loggedInUser ? 'is-me' : ''}`}
                        >
                            <td>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</td>
                            <td>
                                <Link to={`/profile/${user.username}`}>{user.username}</Link>
                                {user.username === loggedInUser && " (Ty)"}
                            </td>
                            <td>{user.level}</td>
                            <td>{user.totalPoints}</td>
                        </tr>
                    ))}

                    {!isUserInTopTen && data.currentUserEntry && localStorage.getItem('role')==='STUDENT' &&(
                        <>
                            <tr className='dots-row'><td colSpan="4">...</td></tr>
                            <tr className="is-me">
                                <td>{data.currentUserRank}</td>
                                <td>
                                    <Link to={`/profile/${data.currentUserEntry.username}`}>
                                        {data.currentUserEntry.username}
                                    
                                    </Link>
                                    {" (Ty)"}
                                </td>
                                <td>{data.currentUserEntry.level}</td>
                                <td>{data.currentUserEntry.totalPoints}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="navbar" >
            <Link to="/" className='navbarElement'>Strona Główna</Link>
            <Link to="/public/QUIZ" className='navbarElement'>Quizy</Link>
            <Link to="/public/COMPLETE_SENTENCE" className='navbarElement'>Uzupełnij Zdania</Link>
            <Link to="/public/ANALYSIS" className='navbarElement'>Analiza</Link>
            {(userRole=== 'ADMIN' || userRole==='TEACHER')&&(
                <Link to="/admin/create-task" className='navbarElement'>Dodaj zadanie</Link>
            )}
            {(userRole==='ADMIN')&&(
                <Link to="/admin/manage/tasks" className='navbarElement'>Zarządzaj</Link>
            )}
            {(userRole==='TEACHER')&&(
                <Link to="/teacher/classes" className='navbarElement'>Twoje klasy</Link>
            )}
            {(userRole==='STUDENT')&&(
                <Link to="/student/classes" className='navbarElement'>Twoje klasy</Link>
            )}
            {!token ? (
                <>
                    <Link to="/" className='navbarElement'>Logowanie</Link>
                </>
            ) : (
                <>
                    <Link to="/leaderboard" className='navbarElement'>Ranking</Link>
                    <span className="stretchSpan"></span>
                    <Link to="/profile" className='navbarElement'>Mój profil</Link>
                    <span>Witaj, {localStorage.getItem('username')}!</span>
                    <button onClick={handleLogout} style={{ backgroundColor: '#0084ffff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', marginTop:'10px' }}>Wyloguj</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="navbar" >
            <Link to="/" className='navbarElement'>Strona Główna</Link>
            <Link to="/public/QUIZ" className='navbarElement'>Quizy</Link>
            <Link to="/public/COMPLETE_SENTENCE" className='navbarElement'>Uzupełnij Zdania</Link>
            {(userRole=== 'ADMIN' || userRole==='TEACHER')&&(
                <Link to="/admin/create-task" className='navbarElement'>Dodaj zadanie</Link>
            )}
            {(userRole==='ADMIN')&&(
                <Link to="/admin/manage/tasks" className='navbarElement'>Zarządzaj</Link>
            )}
            {(userRole==='ADMIN')&&(
                <Link to="/admin/moderate/tasks/pending" className='navbarElement'>Moderuj</Link>
            )}
            {(userRole==='TEACHER')&&(
                <Link to="/teacher/classes" className='navbarElement'>Twoje klasy</Link>
            )}
            {(userRole==='STUDENT')&&(
                <Link to="/student/classes" className='navbarElement'>Twoje klasy</Link>
            )}
            {!token ? (
                <>
                    <Link to="/login" className='navbarElement'>Logowanie</Link>
                </>
            ) : (
                <>
                    <Link to="/leaderboard" className='navbarElement'>Ranking</Link>
                    <span className="stretchSpan"></span>
                    <Link to="/profile" className='navbarElement'>Mój profil</Link>
                    <span>Witaj, {localStorage.getItem('username')}!</span>
                    <button onClick={handleLogout} className='logout-btn'>Wyloguj</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
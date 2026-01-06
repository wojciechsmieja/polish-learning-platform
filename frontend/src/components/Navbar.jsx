import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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
            {!token ? (
                <>
                    <Link to="/register" className='navbarElement'>Logowanie</Link>
                </>
            ) : (
                <>
                    <Link to="/leaderboard" className='navbarElement'>Ranking</Link>
                    <span className="stretchSpan"></span>
                    <Link to="/profile" className='navbarElement'>Mój profil</Link>
                    <span>Witaj, {localStorage.getItem('username')}!</span>
                    <button onClick={handleLogout}>Wyloguj</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
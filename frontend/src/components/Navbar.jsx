import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
            <Link to="/">Strona Główna</Link>
            
            {!token ? (
                <>
                    <Link to="/login">Logowanie</Link>
                </>
            ) : (
                <>
                    <Link to="/tasks">Moje Zadania</Link>
                    <span>Witaj, {localStorage.getItem('username')}!</span>
                    <button onClick={handleLogout}>Wyloguj</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    const token = localStorage.getItem('token');
    return (
        <div style={{ padding: '20px' }}>
            <h1>Witaj w Learning Platform</h1>
            <p>To jest Twoja aplikacja do nauki składni jezyka polskiego.</p>
            {!token ? (
            <>
                <Link to="/register">Zarejestruj się</Link>
                <Link to="/login">Zaloguj się</Link>
            </>
            ) : (<></>)
            }
        </div>
    );
}

export default Home;
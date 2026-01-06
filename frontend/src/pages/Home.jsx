import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
function Home() {
    const token = localStorage.getItem('token');
    return (
        <div className='page'>
            <div className="parentHome">
                <h1>Witaj w Learning Platform</h1>
                <p>To jest Twoja aplikacja do nauki składni jezyka polskiego.</p>
                {!token ? (
                <>
                    <Link to="/register" className='rejestruj'>Zarejestruj się</Link>
                    <Link to="/login" className='rejestruj'>Zaloguj się</Link>
                </>
                ) : (<></>)
                }
            </div>
        </div>
    );
}

export default Home;
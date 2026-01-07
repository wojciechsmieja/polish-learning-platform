import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
function Home() {
    const token = localStorage.getItem('token');
    return (
        <div className='page'>
            <div className="parentHome">
                <h1>Witaj na stronie</h1>
                <p>To jest Twoja aplikacja do nauki składni jezyka polskiego.</p>
                {!token ? (
                <>
                    <Link to="/register" className='rejestruj' style={{ backgroundColor: '#0084ffff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', marginTop:'10px' }}>Zarejestruj się</Link>
                    <Link to="/login" className='rejestruj' style={{ backgroundColor: '#0084ffff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px',marginTop:'20px' }}>Zaloguj się</Link>
                </>
                ) : (<></>)
                }
            </div>
        </div>
    );
}

export default Home;
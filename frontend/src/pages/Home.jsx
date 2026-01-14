import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
function Home() {
    const token = localStorage.getItem('token');
    return (
        <div className='page'>
            <div className="parentHome">
                <h1>Witaj na stronie</h1>
                <p>To jest Twoja aplikacja do nauki składni języka polskiego. Możesz tutaj wykonywać zadania, aby poprawić swoje zdolności związane ze składnią i gramatyką języka polskiego.</p>
                {!token ? (
                <>
                    <Link to="/register" className='home-btn'>Zarejestruj się</Link>
                    <Link to="/login" className='home-btn' >Zaloguj się</Link>
                </>
                ) : (<></>)
                }
            </div>
        </div>
    );
}

export default Home;
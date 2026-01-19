import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', response.data.role);
            navigate('/');
            window.location.reload(); 
        } catch (error) {
            console.error("Błąd rejestracji:", error);
            const serverMessage = error.response?.data;
            setError('Błąd logowania');
            if(serverMessage && typeof serverMessage === 'object' && serverMessage.message){
                setError(serverMessage.message);
            }else if(typeof serverMessage === 'string'){
                setError(serverMessage);
            }else{
                setError("Wystąpił błąd podczas rejestracji");
            }

        }
    };

    return (
        <div className='login-wrapper'>
            <div className='login-card'>
                <h2 className='login-h2'>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Nazwa użytkownika:</label><br/>
                        <input className="login-input" placeholder='Twoja nazwa...' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>Hasło:</label><br/>
                        <input className="login-input" type="password" placeholder='Hasło...' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="error-bubble">{error}</div>}
                    <button type="submit" className='login-button'>Zaloguj się</button>
                </form>
                <div className="register-invitation">
                    <p>Jeszcze nie masz konta?</p>
                    <Link to="/register" className="register-link">Zarejestruj się!</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
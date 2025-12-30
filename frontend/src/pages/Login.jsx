import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { username, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            
            alert("Zalogowano pomyślnie!");
            navigate('/');
            window.location.reload(); 
        } catch (error) {
            alert("Błąd logowania: " + (error.response?.data || "Serwer nie odpowiada"));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Użytkownik:</label><br/>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Hasło:</label><br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br/>
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    );
}

export default Login;
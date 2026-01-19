import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Próba wysłania formularza dla:", formData.username);
        if (formData.password.length < 7) {
            setError("Twoje hasło jest za krótkie! Musi mieć przynajmniej 7 znaków.");
            return; 
        }
        if (formData.username.trim().length < 5) {
            console.log(formData.username);
        setError("Twoja nazwa jest za krótka! Napisz przynajmniej 6 znaków");
        return;
        }
        setLoading(true);
        try {
            const endpoint = `/api/auth/register/${formData.role}`;
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            };
            const response = await api.post(endpoint, payload);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error("Błąd rejestracji:", error);
            const serverMessage = error.response?.data;
            if(serverMessage && typeof serverMessage === 'object' && serverMessage.message){
                setError(serverMessage.message);
            }else if(typeof serverMessage === 'string'){
                setError(serverMessage);
            }else{
                setError("Wystąpił błąd podczas rejestracji");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Zarejestruj się</h2>
                
                {error &&  <div key={error} className="error-bubble">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa użytkownika:</label>
                        <input 
                            className="login-input"
                            type="text" 
                            name="username" 
                            placeholder="Wpisz swoje imię..."
                            required 
                            value={formData.username} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            className="login-input"
                            type="email" 
                            name="email" 
                            placeholder="Twój email..."
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Hasło:</label>
                        <input 
                            className="login-input"
                            type="password" 
                            name="password" 
                            placeholder="Twoje tajne hasło..."
                            required 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Kim jesteś?</label>
                        <select 
                            className="login-input" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="student">Uczeń / Student</option>
                            <option value="teacher">Nauczyciel</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                        style={loading ? { backgroundColor: '#ccc', boxShadow: 'none' } : {}}
                    >
                        {loading ? "CZEKAJ" : "STWÓRZ KONTO"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            localStorage.setItem('username', username);
            alert("Konto zostało utworzone pomyślnie!");
            navigate('/');
        } catch (error) {
            console.error("Błąd rejestracji:", error);
            alert("Błąd rejestracji: " + (error.response?.data || "Serwer nie odpowiada"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Zarejestruj się</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Nazwa użytkownika:</label><br/>
                    <input 
                        type="text" 
                        name="username" 
                        required 
                        value={formData.username} 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>Email:</label><br/>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>Hasło:</label><br/>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        value={formData.password} 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label>Kim jesteś?</label><br/>
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        style={inputStyle}
                    >
                        <option value="student">Uczeń / Student</option>
                        <option value="teacher">Nauczyciel</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ ...btnStyle, backgroundColor: loading ? '#ccc' : '#0084ffff' }}
                >
                    {loading ? "Rejestrowanie..." : "Stwórz konto"}
                </button>
            </form>
        </div>
    );
}

const inputStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' };

export default Register;
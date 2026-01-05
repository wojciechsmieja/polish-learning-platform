import React from "react";
import { useEffect, useState } from 'react';
import api from "../api"

function Profile(){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState('');

    useEffect(() => {
        fetchProfile();
    },[]);

    const fetchProfile =() => {
        api.get('/api/profile/me')
        .then(res=>{
            setProfile(res.data);
            setNewBio(res.data.bio || '');
            setLoading(false);
            setIsEditing(false);
        })
        .catch(error=>{
            console.error(error);
            setLoading(false);
        });
    }
    
    const handleUpdateBio = async () => {
        try{
            const response = await api.patch('api/profile/bio', {bio: newBio});
            setProfile({...profile, bio: response.data});
            setIsEditing(false);
        }catch (err){
            alert("Błąd podczas aktualizacji profilu");
        }
    };

    if(loading) return <p>Ładowanie profilu...</p>
    if(!profile) return <p>Błąd ładownaia danych.</p>

    return(
        <div className="profileParent" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                <h1>Profil użytkownika: {profile.username}</h1>
                {!isEditing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <p><em>{profile.bio || "Brak opisu profilu."}</em></p>
                        <button onClick={() => setIsEditing(true)}>Zmień opis</button>
                    </div>                    
                ):(
                    <div style={{ marginTop: '10px' }}>
                        <textarea 
                            value={newBio} 
                            onChange={(e) => setNewBio(e.target.value)}
                            style={{ width: '100%', minHeight: '80px', padding: '10px' }}
                            placeholder="Napisz coś o sobie..."
                        />
                        <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
                            <button onClick={handleUpdateBio} style={saveBtnStyle}>Zapisz</button>
                            <button onClick={() => setIsEditing(false)} style={cancelBtnStyle}>Anuluj</button>
                        </div>
                    </div>
                )} 
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={statBox}>
                    <h3>Poziom</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black'}}>{profile.level}</p>
                </div>
                <div style={statBox}>
                    <h3>Punkty XP</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{profile.totalPoints}</p>
                </div>
                <div style={statBox}>
                    <h3>Gwiazdki</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>⭐ {profile.totalStars}</p>
                </div>
            </div>

            <h2>Twoje Odznaki ({profile.achievements.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {profile.achievements.length > 0 ? (
                    profile.achievements.map((ach, idx) => (
                        <div key={idx} style={badgeCard}>
                            <div style={{ fontSize: '40px' }}>🏆</div>
                            <h4 style={{ margin: '5px 0' }}>{ach.name}</h4>
                            <small>{ach.description}</small>
                        </div>
                    ))
                ) : (
                    <p>Nie zdobyłeś jeszcze żadnych odznak. Rozwiązuj zadania, aby je odblokować!</p>
                )}
            </div>
        </div>
    );

}

const statBox = {
    flex: 1,
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: 'black'
};

const badgeCard = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff', color: 'black'
};
const saveBtnStyle = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' };
const cancelBtnStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' };

export default Profile;
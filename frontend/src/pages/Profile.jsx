import React from "react";
import { useEffect, useState } from 'react';
import api from "../api"
import './Profile.css';

function Profile(){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState('');

    const [isChangingPass, setIsChangingPass] = useState(false);
    const [passData, setPassData] = useState({currentPassword: '', newPassword: '', confirmPassword: ''});
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
    const handleChangePassword = async(e) => {
        e.preventDefault();
        setError('');
        if(passData.newPassword!==passData.confirmPassword){
            setError("Nowe hasła nie są identyczne");
            return;
        }
        if(passData.newPassword.length<7){
            setError("Twoje hasło jest za krótkie! Musi mieć przynajmniej 7 znaków.");
            return;
        }
        
        try{
            await api.post("/api/profile/change-password", {
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            });
            alert("Hasło zostało zmienione");
            setIsChangingPass(false);
            setPassData({currentPassword: '', newPassword: '', confirmPassword: ''});
        }catch (err){
            //console.error("Błąd zmiany hasła:", error);
            const serverMessage = error.response?.data;
            setError('Błąd zmiany hasła');
            if(serverMessage && typeof serverMessage === 'object' && serverMessage.message){
                setError(serverMessage.message);
            }else if(typeof serverMessage === 'string'){
                setError(serverMessage);
            }else{
                setError("Wystąpił błąd podczas zmiany hasła");
            }
        }
    };

    if(loading) return <p>Ładowanie profilu...</p>
    if(!profile) return <p>Błąd ładownaia danych.</p>
    return(
        <div className="profileParent" >
            {localStorage.getItem('role')==='STUDENT' && (
                <div className="generalInfo">
                    <h1>Twój profil</h1>
                    {!isEditing ? (
                        <div className="bio">
                            {profile.bio && (
                                <p><em>Opis profilu: {profile.bio || "Brak opisu profilu."}</em></p>
                            )}
                            {!profile.bio && (<p><em>Jeszcze nie ustawiłeś opisu swojego profilu. Zmień to i napisz coś o sobie.</em></p>
                            )}
                            <button onClick={() => setIsEditing(true)} className="changePassBtn">Zmień opis</button>
                        </div>                    
                    ):(
                        <div style={{ marginTop: '10px' }}>
                            <textarea 
                                value={newBio} 
                                onChange={(e) => setNewBio(e.target.value)}
                                placeholder="Napisz coś o sobie..."
                            />
                            <div className="buttonsContainer">
                                <button onClick={handleUpdateBio} className="saveBtn">Zapisz</button>
                                <button onClick={() => setIsEditing(false)} className="cancelBtn">Anuluj</button>
                            </div>
                        </div>
                    )} 
                </div>
            )}
            {localStorage.getItem('role')==='STUDENT' && (
                <div className="userStats">
                    <div className="statBox">
                        <h3>Poziom</h3>
                        <p className="statText">{profile.level}</p>
                    </div>
                    <div className="statBox">
                        <h3>Punkty XP</h3>
                        <p className="statText">{profile.totalPoints}</p>
                    </div>
                    <div className="statBox">
                        <h3>Gwiazdki</h3>
                        <p className="statText">⭐ {profile.totalStars}</p>
                    </div>
                </div>
            )}
            {localStorage.getItem('role')==='STUDENT' && (
                <>
                    <h2>Twoje Odznaki ({profile.achievements.length})</h2>
                    <div className="achievements">
                        {profile.achievements.length > 0 ? (
                            profile.achievements.map((ach, idx) => (
                                <div key={idx} className="badgeCard">
                                    <div style={{ fontSize: '40px' }}>🏆</div>
                                    <h4 style={{ margin: '5px 0' }}>{ach.name}</h4>
                                    <small>{ach.description}</small>
                                </div>
                            ))
                        ) : (
                            <>
                            <p></p>
                            <p>Nie zdobyłeś jeszcze żadnych odznak. Rozwiązuj zadania, aby je odblokować!</p>
                            <p></p>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className="profileChangePassContainer">
                {!isChangingPass ? (
                    <>
                        <p>Tutaj możesz zmienić swoje hasło</p>
                        <button onClick={() => {setIsChangingPass(true); setError('')}} className="changePassBtn">Zmień hasło</button>
                    </>
                ) : (
                    
                    <div className="profileFormChangePass">
                        {error &&  <div key={error} className="error-bubble">{error}</div>}
                        <h2>Zmiana hasła</h2>
                        <input 
                            type="password" 
                            placeholder="Obecne hasło" 
                            onChange={(e) => setPassData({...passData, currentPassword: e.target.value})}
                            className="profileInputChangePass"
                        />
                        <input 
                            type="password" 
                            placeholder="Nowe hasło" 
                            onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
                            className="profileInputChangePass"
                        />
                        <input 
                            type="password" 
                            placeholder="Powtórz nowe hasło" 
                            onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                            className="profileInputChangePass"
                        />

                        <div className="buttonsContainer">
                            <button onClick={(e)=>handleChangePassword(e)} className="saveBtn">Potwierdź zmianę</button>
                            <button onClick={() => {setIsChangingPass(false);setError('')}} className="cancelBtn">Anuluj</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Profile;
import React from "react";
import { useEffect, useState } from 'react';
import api from "../api"
import './PublicProfile.css';
import { useParams } from "react-router-dom";

function PublicProfile(){
    const {username} = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    },[username]);

    const fetchProfile =() => {
        api.get(`/api/profile/user/${username}`)
        .then(res=>{
            setProfile(res.data);
            setLoading(false);
        })
        .catch(error=>{
            console.error(error);
            setLoading(false);
        });
    }

    if(loading) return <p>Ładowanie profilu...</p>
    if(!profile) return <p>Błąd ładownaia danych.</p>
    return(
        <div className="profileParent" >
            <div className="generalInfo">
                <h1>Profil: {profile.username}</h1>
                {profile.bio &&(
                    <div className="bio">
                        <p><em>Opis profilu: {profile.bio || "Brak opisu profilu."}</em></p>
                    </div> 
                )}
                   
            </div>
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

            <h2>Odznaki ({profile.achievements.length})</h2>
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
                    <p>Użytkownik nie zdobył jeszcze żadnych odznak.</p>
                )}
            </div>
        </div>
    );

}

export default PublicProfile;
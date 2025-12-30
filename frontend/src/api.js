import axios from 'axios';
import { Airplay } from 'lucide-react';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }  
    return config;
});

export default api;

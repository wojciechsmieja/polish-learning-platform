import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PublicTasksByType from './components/PublicTasksByType';
import TaskSolver from './components/TaskSolver';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import PublicProfile from './components/PublicProfile';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/public/:type" element={<PublicTasksByType/>}/>
                <Route path="/tasks/:id" element={<TaskSolver/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/profile/:username" element={<PublicProfile/>}/>
            </Routes>
        </Router>
    );
}

export default App;
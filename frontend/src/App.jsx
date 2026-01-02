import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PublicTasksByType from './components/PublicTasksByType';
import TaskSolver from './components/TaskSolver';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/public/:type" element={<PublicTasksByType/>}/>
                <Route path="/tasks/:id" element={<TaskSolver/>}/>
            </Routes>
        </Router>
    );
}

export default App;
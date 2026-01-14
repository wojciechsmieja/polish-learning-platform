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
import CreateTask from './components/CreateTask';
import AdminTaskManage from './pages/AdminTaskManage';
import TeacherClasses from './components/TeacherClasses';
import StudentClasses from './components/StudentClasses';
import ClassDetails from './components/ClassDetails';
import AdminModeration from './pages/AdminModeration';
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
                <Route path="/admin/create-task" element={<CreateTask/>}/>
                <Route path="/admin/manage/tasks" element={<AdminTaskManage/>}/>
                <Route path="/teacher/classes" element={<TeacherClasses/>}/>
                <Route path="/student/classes" element={<StudentClasses/>}/>
                <Route path="/teacher/classes/:id/details" element={<ClassDetails/>}/>
                <Route path="/admin/moderate/tasks/pending" element={<AdminModeration/>}/>
            </Routes>
        </Router>
    );
}

export default App;
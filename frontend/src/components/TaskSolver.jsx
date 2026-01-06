import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import QuizSolver from './solvers/QuizSolver';
import SentenceSolver from './solvers/SentenceSolver';
import AnalysisSolver from './solvers/AnalysisSolver';
import TaskLeaderboard from './TaskLeaderboard';

function TaskSolver() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);
    const onTaskFinished = () => {
        setRefreshLeaderboard(prev => prev + 1);
    };

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                // getting full task
                const response = await api.get(`/api/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                alert("Błąd pobierania szczegółów zadania");
            } finally {
                setLoading(false);
            }
        };
        fetchTaskDetails();
    }, [id]);

    if (loading) return <p>Ładowanie zadania...</p>;
    if (!task) return <p>Nie znaleziono zadania.</p>;
    console.log(task);
    const renderSolver = () => {
        switch (task.taskType) {
            case 'QUIZ':
                return <QuizSolver data={task.quizDetails} taskId={task.id} onFinish={onTaskFinished}/>;
            case 'COMPLETE_SENTENCE':
                return <SentenceSolver data={task.sentenceDetails} taskId={task.id} onFinish={onTaskFinished}/>;
            case 'ANALYSIS':
                return <AnalysisSolver data={task.analysisDetails} />;
            default:
                return <p>Nieznany typ zadania.</p>;
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <hr />
                {renderSolver()}
            </div>
            <aside style={{ marginTop: '80px' }}>
                <TaskLeaderboard taskId={id} refreshTrigger={refreshLeaderboard} />
            </aside>
        </div>
    );
}

export default TaskSolver;
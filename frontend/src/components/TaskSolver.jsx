import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import QuizSolver from './solvers/QuizSolver';
import SentenceSolver from './solvers/SentenceSolver';
import AnalysisSolver from './solvers/AnalysisSolver';

function TaskSolver() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

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
                return <QuizSolver data={task.quizDetails} />;
            case 'COMPLETE_SENTENCE':
                return <SentenceSolver data={task.sentenceDetails} />;
            case 'ANALYSIS':
                return <AnalysisSolver data={task.analysisDetails} />;
            default:
                return <p>Nieznany typ zadania.</p>;
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <hr />
            {renderSolver()}
        </div>
    );
}

export default TaskSolver;
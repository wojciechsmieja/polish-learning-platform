import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import './PublicTasksByType.css';

function PublicTasksByType() {
    const { type } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState('ALL');
    const [onlyUncompleted, setOnlyUncompleted] = useState(false);
    const [expandedTitles, setExpandedTitles] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    const typeLabel = {
        QUIZ: "QUIZY",
        COMPLETE_SENTENCE: "UZUPEŁNIANIE ZDAŃ",
        ANALYSIS: "ANALIZA ZDAŃ"
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/tasks/public/${type}`);
                setTasks(response.data);
            } catch (error) {
                console.error("Błąd pobierania zadań:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [type]);

    const filteredTasks = tasks.filter(task => {
        const matchesDiff = difficulty === 'ALL' || task.difficulty.toString() === difficulty;
        const matchesUncompleted = !onlyUncompleted || !task.completed; 
        return matchesDiff && matchesUncompleted;
    }).sort((a,b) => a.difficulty - b.difficulty);

    const toggleCategory = (title, syntax) => {
        const key = `${title}-${syntax}`;
        setExpandedCategories(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleTitle = (title) => {
        setExpandedTitles(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const renderStars = (count) => {
        return [1, 2, 3].map(num => (
            <span key={num} className={num <= count ? "star gold" : "star gray"}>★</span>
        ));
    };

    const getDifficultyBadge = (diff) => {
        const labels = { 1: 'Łatwy', 2: 'Średni', 3: 'Trudny' };
        return <span className={`diff-badge diff-${diff}`}>{labels[diff]}</span>;
    };

    const groupedTasks = filteredTasks.reduce((groups, task) => {
        const title = task.title;
        const syntax = task.syntaxType || "OGÓLNE"; 
        if (!groups[title]) groups[title] = {};
        if (!groups[title][syntax]) groups[title][syntax] = [];
        groups[title][syntax].push(task);
        return groups;
    }, {});

    if (loading) return <div className="loader">Ładowanie zadań...</div>;

    return (
        <div className="tasks-container">
            <h2 className="tasks-main-title">
                {typeLabel[type] || type}
            </h2>
            {/*filters*/}
            <div className="filter-panel">
                <div className="filter-group">
                    <label>Trudność:</label>
                    <select 
                        onChange={(e) => setDifficulty(e.target.value)} 
                        value={difficulty}
                        className="kids-select"
                    >
                        <option value="ALL">Wszystkie</option>
                        <option value="1">Łatwe</option>
                        <option value="2">Średnie</option>
                        <option value="3">Trudne</option>
                    </select>
                </div>
                {localStorage.getItem('role') && (
                    <label className="kids-checkbox-label">
                        <input 
                            type="checkbox" 
                            checked={onlyUncompleted} 
                            onChange={(e) => setOnlyUncompleted(e.target.checked)} 
                        /> 
                        <span>Tylko nieukończone</span>
                    </label>
                )}
            </div>

            {Object.keys(groupedTasks).length === 0 ? (
                <p className="no-tasks-info">Brak zadań w tej kategorii.</p>
            ) : (
                Object.entries(groupedTasks).map(([title, syntaxGroups]) => (
                    <div key={title} className="group-card">
                        
                        <div onClick={() => toggleTitle(title)} className="group-header">
                            <span>{title.toUpperCase()}</span>
                            <span className="arrow">{expandedTitles[title] ? '▲' : '▼'}</span>
                        </div>
                
                        
                        {expandedTitles[title] && (
                            <div className="group-content">
                                {Object.entries(syntaxGroups).map(([syntax, tasks]) => {
                                    const categoryKey = `${title}-${syntax}`;
                                    const isCatExpanded = expandedCategories[categoryKey];
                                
                                    return (
                                        <div key={syntax} className="syntax-section">
                                            <div 
                                                onClick={() => toggleCategory(title, syntax)} 
                                                className={`syntax-header ${isCatExpanded ? 'open' : ''}`}
                                            >
                                                <span>{syntax}</span>
                                                <span className="task-count">
                                                    {isCatExpanded ? 'zwiń' : `Liczba zadań: ${tasks.length}`}
                                                </span>
                                            </div>
                                    
                                            {isCatExpanded && (
                                                <div className="tasks-list">
                                                    {tasks.map(task => (
                                                        <div key={task.id} className="task-row">
                                                            <div className="task-info">
                                                                <div className="task-top-line">
                                                                    <strong className="variant-label">Zadanie #{task.id}</strong>
                                                                    {getDifficultyBadge(task.difficulty)}
                                                                    {task.completed && <span className="completed-label">Ukończone</span>}
                                                                </div>
                                                                
                                                                <p className="task-desc">
                                                                    {task.description || "Kliknij, aby rozwiązać to zadanie"}
                                                                </p>
                                                                
                                                                {localStorage.getItem('role') && (
                                                                    <div className="stars-container">
                                                                        <small>Twoje gwiazdki: </small>
                                                                        {renderStars(task.userStars)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                    
                                                            <div className="task-action">
                                                                <Link to={`/tasks/${task.id}`}>
                                                                    <button className="solve-btn">Rozwiąż</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default PublicTasksByType;
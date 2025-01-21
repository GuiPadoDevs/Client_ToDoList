import React from 'react';
import '../styles/Home.css'

const TaskCard = ({ task, onUpdate, onDelete, onComplete, showCompleted }) => {
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <div className="task-card">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Type: {task.type}</p>
            <p>Term: {formatDate(task.term)}</p>
            <div className="task-card-buttons">
                {!showCompleted && <button onClick={() => onUpdate(task)} className="update-task-button">Update</button>}
                <button onClick={() => onDelete(task._id)} className="delete-task-button">Delete</button>
                {!showCompleted && <button onClick={() => onComplete(task._id)} className="complete-task-button">Complete</button>}
            </div>
        </div>
    );
};

export default TaskCard;

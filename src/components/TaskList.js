import React from 'react';
import TaskCard from './TaskCard';
import '../styles/Home.css';

const TaskList = ({ tasks, onUpdate, onDelete, onComplete, showCompleted }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    showCompleted={showCompleted}
                />
            ))}
        </div>
    );
};

export default TaskList;

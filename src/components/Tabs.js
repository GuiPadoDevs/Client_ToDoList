import React from 'react';
import '../styles/Home.css';

const Tabs = ({ showCompleted, setShowCompleted }) => {
    return (
        <div className="tabs">
            <button onClick={() => setShowCompleted(false)} className={!showCompleted ? 'active' : ''}>Active Tasks</button>
            <button onClick={() => setShowCompleted(true)} className={showCompleted ? 'active' : ''}>Completed Tasks</button>
        </div>
    );
};

export default Tabs;

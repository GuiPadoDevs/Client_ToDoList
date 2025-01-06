import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddTask.css';

const AddTask = ({ task, onTaskAddedOrUpdated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [type, setType] = useState('');
    const [term, setTerm] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            setPriority(task.priority);
            setType(task.type);
            setTerm(task.term.split('T')[0]);
        }
    }, [task]);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!description) newErrors.description = "Description is required";
        if (!priority) newErrors.priority = "Priority is required";
        if (!type) newErrors.type = "Type is required";
        if (!term) newErrors.term = "Term is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const taskData = { name, description, priority, type, term, completed: task ? task.completed : false }

        try {
            if (task) {
                const response = await axios.put('http://server-to-do-list.vercel.app/api/tasks/task', {
                    id: task._id,
                    ...taskData
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                const response = await axios.post('http://server-to-do-list.vercel.app/api/tasks/task', taskData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            onTaskAddedOrUpdated();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Priority:</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="form-group">
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                </select>
            </div>
            <div className="form-group">
                <label>Term:</label>
                <input type="date" value={term} onChange={(e) => setTerm(e.target.value)} required/>
            </div>
            <button type="submit" className="save-task-button">Save Task</button>
        </form>
    );
};

export default AddTask;

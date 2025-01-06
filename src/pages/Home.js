import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/Home.css'; // Importar o novo arquivo CSS
import AddTask from './AddTask';
import { useTheme } from '../ThemeContext';

Modal.setAppElement('#root');

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showCompleted, setShowCompleted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:5001/api/tasks/task', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const allTasks = response.data;
            setTasks(allTasks.filter(task => !task.completed));
            setCompletedTasks(allTasks.filter(task => task.completed));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5001/api/tasks/task`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { id: taskId }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdateTask = (task) => {
        setSelectedTask(task);
        setModalIsOpen(true);
    };

    const handleCompleteTask = async (taskId) => {
        try {
            alert(`Completing task with ID: ${taskId}`)
            const token = localStorage.getItem("token")
            alert(`Token: ${token}`)
            const response = await axios.put(`http://localhost:5001/api/tasks/task/complete/${taskId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert(`Response: ${response}`)
            alert(`Deu certo`);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            setCompletedTasks(prevCompletedTasks => [
                ...prevCompletedTasks,
                tasks.find(task => task._id === taskId)
            ]);
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleTaskAddedOrUpdated = () => {
        fetchTasks();
        closeModal();
    };

    const openModal = () => {
        setSelectedTask(null);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <div className={`task-list-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <h2>Task List</h2>
            <div className="tabs">
                <button onClick={() => setShowCompleted(false)} className={!showCompleted ? 'active' : ''}>Active Tasks</button>
                <button onClick={() => setShowCompleted(true)} className={showCompleted ? 'active' : ''}>Completed Tasks</button>
            </div>
            <div className={`task-list ${theme === 'dark' ? 'dark-mode' : ''}`}>
                {(showCompleted ? completedTasks : tasks).map(task => (
                    <div key={task._id} className="task-card">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Type: {task.type}</p>
                        <p>Term: {formatDate(task.term)}</p>
                        <div className="task-card-buttons">
                            {!showCompleted && <button onClick={() => handleUpdateTask(task)} className="update-task-button">Update</button>}
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-task-button">Delete</button>
                            {!showCompleted && <button onClick={() => handleCompleteTask(task._id)} className="complete-task-button">Complete</button>}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={openModal} className="create-task-button">+</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Task Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <AddTask task={selectedTask} onTaskAddedOrUpdated={handleTaskAddedOrUpdated} />
                <button onClick={closeModal} className="close-modal-button">Close</button>
            </Modal>
        </div>
    );
};

export default Home;
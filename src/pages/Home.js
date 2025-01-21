import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Modal from 'react-modal';
import '../styles/Home.css';
import AddTask from './AddTask';
import { useTheme } from '../ThemeContext';

import TaskList from '../components/TaskList';
import Tabs from '../components/Tabs';

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
            const response = await api.get('/tasks/task', {
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
            await api.delete(`/tasks/task`, {
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
            const token = localStorage.getItem("token")
            await api.put(`/tasks/task/complete/${taskId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
            <Tabs showCompleted={showCompleted} setShowCompleted={setShowCompleted} />
            <div className="task-list-content">
                <TaskList
                    tasks={showCompleted ? completedTasks : tasks}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onComplete={handleCompleteTask}
                    showCompleted={showCompleted}
                    theme={theme}
                />
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

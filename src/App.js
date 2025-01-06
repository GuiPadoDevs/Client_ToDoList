import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './Layout';
import { ThemeProvider } from './ThemeContext';
import './styles/App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState('login');

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleRegister = () => {
        setView('login');
    };

    return (
        <ThemeProvider>
            <div className="app">
                <Layout>
                    {!isAuthenticated ? (
                        view === 'login' ? (
                            <Login onLogin={handleLogin} onRegisterClick={() => setView('register')} />
                        ) : (
                            <Register onRegister={handleRegister} onLoginClick={() => setView('login')} />
                        )
                    ) : (
                        <Home />
                    )}
                </Layout>
            </div>
        </ThemeProvider>
    );
};

export default App;
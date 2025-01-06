import React from 'react';
import { useTheme } from './ThemeContext';
import './App.css';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
};

const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`app ${theme}`}>
            <ThemeToggleButton />
            {children}
        </div>
    );
};

export default Layout;
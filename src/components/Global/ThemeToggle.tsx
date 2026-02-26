import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true);

    // Initialise from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('corered-theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            setIsDark(false);
        }
    }, []);

    const toggle = () => {
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('corered-theme', next);
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="theme-toggle-btn relative p-2 rounded-full transition-all duration-300 group"
            style={{
                color: isDark ? 'var(--white-secondary)' : '#333',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }}
        >
            {isDark ? (
                <Sun className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
            ) : (
                <Moon className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
            )}
        </button>
    );
};

export default ThemeToggle;

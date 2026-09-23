'use client';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import './TopNav.css';

const TopNav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode from localStorage or system
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="topnav">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search personas, templates... (Ctrl+K)" 
          className="search-input"
        />
      </div>

      <div className="topnav-actions">
        <button className="action-btn" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="action-btn">
          <Bell size={20} />
        </button>
        <button className="profile-btn">
          <div className="avatar">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopNav;

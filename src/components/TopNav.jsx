'use client';
import { Search, Bell, Moon, Sun, User, Settings, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './TopNav.css';

const TopNav = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef(null);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    // Check initial dark mode from localStorage or system
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ctrl/Cmd+K focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/personas?q=${encodeURIComponent(q)}` : '/personas');
    setQuery('');
  };

  return (
    <header className="topnav">
      <form className="search-container" onSubmit={handleSearch}>
        <Search className="search-icon" size={20} />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search personas, templates... (Ctrl+K)"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search personas"
        />
      </form>

      <div className="topnav-actions">
        <button className="action-btn" onClick={toggleDarkMode} title="Toggle theme" aria-label="Toggle theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="nav-dropdown-wrapper" ref={bellRef}>
          <button
            className="action-btn"
            onClick={() => { setShowNotifications(v => !v); setShowProfile(false); }}
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />
          </button>
          {showNotifications && (
            <div className="nav-dropdown">
              <div className="nav-dropdown-header">Notifications</div>
              <div className="nav-dropdown-empty">You're all caught up.</div>
            </div>
          )}
        </div>

        <div className="nav-dropdown-wrapper" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => { setShowProfile(v => !v); setShowNotifications(false); }}
            aria-label="Profile menu"
            aria-expanded={showProfile}
          >
            <div className="avatar">
              <User size={18} />
            </div>
          </button>
          {showProfile && (
            <div className="nav-dropdown">
              <div className="nav-dropdown-header">Alex Johnson</div>
              <button className="nav-dropdown-item" onClick={() => { setShowProfile(false); router.push('/settings'); }}>
                <Settings size={16} /> Settings
              </button>
              <button className="nav-dropdown-item" onClick={() => { setShowProfile(false); router.push('/help'); }}>
                <User size={16} /> Help Center
              </button>
              <button className="nav-dropdown-item" onClick={() => setShowProfile(false)}>
                <X size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
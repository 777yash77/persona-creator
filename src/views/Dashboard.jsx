'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, Calendar, FileText, Share2, Plus, ArrowRight,
  MoreVertical, Star, Eye, Copy, Trash2, Upload
} from 'lucide-react';
import { dashboardStats } from '../data/mockData';
import { usePersona } from '../context/PersonaContext';
import './Dashboard.css';

const Dashboard = () => {
  const router = useRouter();
  const { personas, isLoaded, addPersona, deletePersona, duplicatePersona, toggleFavorite } = usePersona();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  const recentPersonas = isLoaded ? personas.slice(0, 4) : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        list.forEach((item) => {
          addPersona({
            name: item.name || 'Imported Persona',
            role: item.role || 'Persona',
            type: item.type || 'Imported',
            description: item.description || 'Imported persona.',
            avatarColor: item.avatarColor || `hsl(${Math.random() * 360}, 70%, 50%)`,
            ...item,
            id: undefined,
          });
        });
        showMessage(`Imported ${list.length} persona${list.length > 1 ? 's' : ''}.`);
      } catch (error) {
        console.error('Failed to import persona:', error);
        showMessage('Import failed: invalid JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleGenerateWithAI = () => {
    router.push('/create');
  };

  const handleUseTemplate = () => {
    router.push('/templates');
  };

  const handleDelete = (id, name) => {
    setOpenMenuId(null);
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deletePersona(id);
      showMessage('Persona deleted.');
    }
  };

  const handleDuplicate = (id) => {
    setOpenMenuId(null);
    const newId = duplicatePersona(id);
    if (newId) showMessage('Persona duplicated.');
  };

  const handleToggleFavorite = (id) => {
    setOpenMenuId(null);
    toggleFavorite(id);
  };

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="welcome-text">Good morning, Alex</h1>
          <p className="welcome-subtext">Build better products by understanding the people, businesses, and problems behind them.</p>
        </div>
      </div>

      {message && <div className="toast-message">{message}</div>}

      <div className="hero-cta-section">
        <button className="primary-cta-btn" onClick={() => router.push('/create')}>
          <Plus size={24} />
          <span>Create Persona</span>
        </button>
        <div className="secondary-ctas">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            hidden
          />
          <button className="secondary-btn" onClick={handleImportClick}>
            <Upload size={16} /> Import Persona
          </button>
          <button className="secondary-btn" onClick={handleUseTemplate}>Use Template</button>
          <button className="secondary-btn" onClick={handleGenerateWithAI}>Generate with AI</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Personas</span>
            <span className="stat-value">{personas ? personas.length : 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Created This Month</span>
            <span className="stat-value">{dashboardStats.thisMonth}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Drafts</span>
            <span className="stat-value">{dashboardStats.drafts}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Share2 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Shared</span>
            <span className="stat-value">{dashboardStats.shared}</span>
          </div>
        </div>
      </div>

      <div className="recent-personas-section">
        <div className="section-header">
          <h2>Recent Personas</h2>
          <Link href="/personas" className="view-all-link">
            View All Personas <ArrowRight size={16} />
          </Link>
        </div>

        {recentPersonas.length === 0 ? (
          <div className="empty-state">
            <Users size={48} className="empty-state-icon" />
            <h3>No personas yet</h3>
            <p className="text-secondary">Create your first persona to get started.</p>
            <button className="primary-cta-btn small-btn" onClick={() => router.push('/create')}>
              <Plus size={18} /> Create Persona
            </button>
          </div>
        ) : (
          <div className="personas-grid">
            {recentPersonas.map(persona => (
              <div
                key={persona.id}
                className="persona-card clickable"
                onClick={() => router.push(`/persona/${persona.id}`)}
              >
                <div className="persona-card-header">
                  <div
                    className="persona-avatar"
                    style={{ backgroundColor: persona.avatarColor }}
                  >
                    {persona.name.charAt(0)}
                  </div>
                  <div className="persona-actions" onClick={e => e.stopPropagation()}>
                    <button
                      className="icon-btn"
                      title={persona.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={() => toggleFavorite(persona.id)}
                    >
                      <Star size={16} className={persona.isFavorite ? 'favorite-icon filled' : 'favorite-icon'} />
                    </button>
                    <div className="card-menu-wrapper" ref={openMenuId === persona.id ? menuRef : null}>
                      <button
                        className="icon-btn"
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === persona.id}
                        onClick={() => setOpenMenuId(openMenuId === persona.id ? null : persona.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === persona.id && (
                        <div className="card-menu" role="menu">
                          <button className="card-menu-item" onClick={() => router.push(`/persona/${persona.id}`)}>
                            <Eye size={15} /> View
                          </button>
                          <button className="card-menu-item" onClick={() => handleDuplicate(persona.id)}>
                            <Copy size={15} /> Duplicate
                          </button>
                          <button className="card-menu-item" onClick={() => handleToggleFavorite(persona.id)}>
                            <Star size={15} /> {persona.isFavorite ? 'Unfavorite' : 'Favorite'}
                          </button>
                          <button className="card-menu-item text-danger" onClick={() => handleDelete(persona.id, persona.name)}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="persona-card-body">
                  <h3 className="persona-name">{persona.name}</h3>
                  <p className="persona-role">{persona.role}</p>
                  <div className="persona-meta">
                    <span className="persona-type">{persona.type}</span>
                    <span className={`persona-status ${persona.status ? persona.status.toLowerCase() : 'draft'}`}>
                      {persona.status || 'Draft'}
                    </span>
                  </div>
                  <div className="persona-tags">
                    {(persona.tags || []).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="persona-card-footer">
                  <span className="last-updated">Updated {persona.lastUpdated || persona.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
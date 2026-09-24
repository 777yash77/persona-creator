'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePersona } from '../context/PersonaContext';
import {
  Edit2, Copy, Share2, Download, Trash2,
  Star, Target, AlertTriangle, TrendingUp, Sparkles, Bot, User, MapPin, Briefcase,
  X, Send, Check
} from 'lucide-react';
import './PersonaDetail.css';

const PersonaDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getPersona, deletePersona, duplicatePersona, updatePersona, toggleFavorite, isLoaded } = usePersona();

  const persona = getPersona(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, from: 'ai', text: 'Hi! I can help you refine this persona. Ask me anything.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(''), 2500);
  };

  if (!isLoaded) return <div className="page-container p-lg">Loading...</div>;

  if (!persona) {
    return (
      <div className="page-container p-lg detail-not-found">
        <h1>Persona not found</h1>
        <p className="text-secondary">This persona may have been deleted or the link is invalid.</p>
        <button className="primary-cta-btn small-btn" onClick={() => router.push('/personas')}>
          Back to Personas
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this persona?')) {
      deletePersona(id);
      router.push('/personas');
    }
  };

  const handleDuplicate = () => {
    const newId = duplicatePersona(id);
    if (newId) router.push(`/persona/${newId}`);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/persona/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: persona.name, text: `Check out ${persona.name}`, url: shareUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Link copied to clipboard');
      } else {
        showToast(shareUrl);
      }
    } catch {
      // User cancelled share or clipboard unavailable
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([JSON.stringify(persona, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(persona.name || 'persona').replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Persona downloaded');
    } catch (error) {
      console.error('Download failed:', error);
      showToast('Download failed');
    }
  };

  const openEdit = () => {
    setFormData({
      name: persona.name || '',
      role: persona.role || '',
      type: persona.type || '',
      description: persona.description || '',
      status: persona.status || 'Draft',
    });
    setIsEditing(true);
  };

  const handleEditChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = () => {
    updatePersona(id, formData);
    setIsEditing(false);
    showToast('Persona updated');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'ai',
        text: `Here's a thought on "${text}": focus on ${persona.name}'s core motivation — ${persona.primaryGoal || 'achieving their primary goal faster'}.`
      }]);
    }, 500);
  };

  // Helper to extract dynamic fields
  const getDynamicFields = () => {
    const hiddenFields = ['id', 'name', 'role', 'type', 'avatarColor', 'description', 'status', 'lastUpdated', 'createdAt', 'owner', 'isFavorite', 'tags'];
    return Object.entries(persona).filter(([key, value]) =>
      !hiddenFields.includes(key) && value != null && String(value).trim() !== ''
    );
  };

  return (
    <div className="page-container detail-page-wrapper">
      <div className="detail-header-actions">
        <button className="back-link" onClick={() => router.push('/personas')}>← Back to Personas</button>
        <div className="action-buttons">
          <button className="icon-btn" title="Edit" onClick={openEdit}><Edit2 size={18} /></button>
          <button className="icon-btn" title="Duplicate" onClick={handleDuplicate}><Copy size={18} /></button>
          <button className="icon-btn" title="Share" onClick={handleShare}><Share2 size={18} /></button>
          <button className="icon-btn" title="Download" onClick={handleDownload}><Download size={18} /></button>
          <button
            className="icon-btn"
            title={persona.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(id)}
          >
            <Star size={18} className={persona.isFavorite ? 'favorite-icon filled' : ''} />
          </button>
          <button className="icon-btn text-danger" title="Delete" onClick={handleDelete}><Trash2 size={18} /></button>
        </div>
      </div>

      <div className="document-container">
        <div className="a4-document">
          <div className="doc-sidebar" style={{ background: `linear-gradient(180deg, ${persona.avatarColor} 0%, #1a1a1a 100%)` }}>
            <div className="doc-avatar-container">
              <div className="doc-avatar">
                {persona.name.charAt(0)}
              </div>
            </div>
            <h1 className="doc-name">{persona.name}</h1>
            <p className="doc-role">{persona.role}</p>
            <div className="doc-badge">{persona.type}</div>

            <div className="doc-sidebar-section">
              <h3>About</h3>
              <p className="doc-desc">{persona.description || 'No description provided.'}</p>
            </div>

            <div className="doc-sidebar-section">
              <h3>Demographics</h3>
              <ul className="doc-list">
                <li><User size={16} /> {persona.age || '32 years old'}</li>
                <li><MapPin size={16} /> {persona.location || 'Bangalore, India'}</li>
                <li><Briefcase size={16} /> {persona.education || 'MS Computer Science'}</li>
              </ul>
            </div>

            {persona.tags && persona.tags.length > 0 && (
              <div className="doc-sidebar-section">
                <h3>Tags</h3>
                <div className="doc-tags">
                  {persona.tags.map(tag => (
                    <span key={tag} className="doc-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="doc-main">
            <div className="doc-section">
              <div className="doc-section-header">
                <Target className="section-icon text-blue" />
                <h2>Goals & Objectives</h2>
              </div>
              <div className="doc-section-content">
                {persona.primaryGoal || persona.goals ? (
                  <p>{persona.primaryGoal || persona.goals}</p>
                ) : (
                  <ul className="doc-bullet-list">
                    <li>Increase user adoption of new features</li>
                    <li>Reduce time-to-market for product releases</li>
                    <li>Improve team collaboration and velocity</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="doc-section">
              <div className="doc-section-header">
                <AlertTriangle className="section-icon text-orange" />
                <h2>Pain Points & Challenges</h2>
              </div>
              <div className="doc-section-content">
                {persona.painPoints || persona.challenges ? (
                  <p>{persona.painPoints || persona.challenges}</p>
                ) : (
                  <ul className="doc-bullet-list">
                    <li>Siloed data across multiple tools</li>
                    <li>Difficulty aligning stakeholders on roadmap</li>
                    <li>Lack of visibility into engineering capacity</li>
                  </ul>
                )}
              </div>
            </div>

            {getDynamicFields().length > 0 && (
              <div className="doc-section">
                <div className="doc-section-header">
                  <TrendingUp className="section-icon text-green" />
                  <h2>Additional Information</h2>
                </div>
                <div className="doc-dynamic-grid">
                  {getDynamicFields().map(([key, value]) => (
                    <div key={key} className="doc-dynamic-field">
                      <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="doc-section insights-section">
              <div className="doc-section-header">
                <Sparkles className="section-icon text-purple" />
                <h2>AI Insights</h2>
              </div>
              <div className="insight-box highlight">
                <h4>Key Insight</h4>
                <p>This persona is highly sensitive to tool fragmentation. The best way to market to them is by emphasizing "All-in-one" capabilities and seamless integrations.</p>
              </div>
              <div className="insight-box">
                <h4>Messaging Suggestion</h4>
                <p>"Stop switching tabs. Manage your entire workflow in one place."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Persona</h2>
              <button className="icon-btn" onClick={() => setIsEditing(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-input"
                  value={formData.name}
                  onChange={e => handleEditChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  className="form-input"
                  value={formData.role}
                  onChange={e => handleEditChange('role', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  className="form-input"
                  value={formData.type}
                  onChange={e => handleEditChange('type', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-input"
                  value={formData.status}
                  onChange={e => handleEditChange('status', e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={formData.description}
                  onChange={e => handleEditChange('description', e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="primary-cta-btn small-btn" onClick={handleEditSave}>
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chat Assistant */}
      <div className="floating-ai-assistant">
        {isChatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-header-title">
                <Bot size={18} /> AI Assistant
              </div>
              <button className="icon-btn" onClick={() => setIsChatOpen(false)} aria-label="Close chat"><X size={16} /></button>
            </div>
            <div className="chat-body">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`chat-bubble ${msg.from}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chat-footer" onSubmit={handleSendChat}>
              <input
                className="chat-input"
                placeholder="Ask about this persona..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button className="chat-send-btn" type="submit" aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
        <button className="chat-fab" onClick={() => setIsChatOpen(prev => !prev)} aria-label="Toggle AI assistant">
          {isChatOpen ? <X size={24} /> : <Bot size={24} />}
        </button>
      </div>

      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
};

export default PersonaDetail;
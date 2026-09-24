'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePersona } from '../context/PersonaContext';
import { 
  Edit2, Copy, Share2, Download, Archive, Trash2, MoreHorizontal,
  Star, Target, AlertTriangle, TrendingUp, Sparkles, MessageSquare, Bot, User, MapPin, Briefcase
} from 'lucide-react';
import './PersonaDetail.css';

const PersonaDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getPersona, deletePersona, duplicatePersona } = usePersona();
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    if (id) {
      const found = getPersona(id);
      if (found) setPersona(found);
    }
  }, [id, getPersona]);

  if (!persona) return <div className="page-container p-lg">Loading...</div>;

  const handleDelete = () => {
    if(confirm('Are you sure you want to delete this persona?')) {
      deletePersona(id);
      router.push('/personas');
    }
  };

  const handleDuplicate = () => {
    const newId = duplicatePersona(id);
    if(newId) router.push(`/persona/${newId}`);
  };

  // Helper to extract dynamic fields
  const getDynamicFields = () => {
    const hiddenFields = ['id', 'name', 'role', 'type', 'avatarColor', 'description', 'status', 'lastUpdated', 'createdAt', 'owner', 'isFavorite', 'tags'];
    return Object.entries(persona).filter(([key]) => !hiddenFields.includes(key));
  };

  return (
    <div className="page-container detail-page-wrapper">
      <div className="detail-header-actions">
        <button className="back-link" onClick={() => router.push('/personas')}>← Back to Personas</button>
        <div className="action-buttons">
          <button className="icon-btn" title="Edit"><Edit2 size={18} /></button>
          <button className="icon-btn" title="Duplicate" onClick={handleDuplicate}><Copy size={18} /></button>
          <button className="icon-btn" title="Share"><Share2 size={18} /></button>
          <button className="icon-btn" title="Download"><Download size={18} /></button>
          <button className="icon-btn" title="Favorite"><Star size={18} /></button>
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
                <li><User size={16}/> {persona.age || '32 years old'}</li>
                <li><MapPin size={16}/> {persona.location || 'Bangalore, India'}</li>
                <li><Briefcase size={16}/> {persona.education || 'MS Computer Science'}</li>
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
      
      {/* Floating AI Chat Assistant */}
      <div className="floating-ai-assistant">
        <button className="chat-fab">
          <Bot size={24} />
        </button>
      </div>
    </div>
  );
};

export default PersonaDetail;

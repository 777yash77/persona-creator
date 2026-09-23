import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, FileText, Share2, Plus, ArrowRight,
  MoreVertical, Star, PenTool
} from 'lucide-react';
import { dashboardStats, recentPersonas } from '../data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="welcome-text">Good morning, Alex</h1>
          <p className="welcome-subtext">Build better products by understanding the people, businesses, and problems behind them.</p>
        </div>
      </div>

      <div className="hero-cta-section">
        <button className="primary-cta-btn" onClick={() => navigate('/create')}>
          <Plus size={24} />
          <span>Create Persona</span>
        </button>
        <div className="secondary-ctas">
          <button className="secondary-btn">Import Persona</button>
          <button className="secondary-btn">Use Template</button>
          <button className="secondary-btn">Generate with AI</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Personas</span>
            <span className="stat-value">{dashboardStats.total}</span>
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
          <Link to="/personas" className="view-all-link">
            View All Personas <ArrowRight size={16} />
          </Link>
        </div>

        <div className="personas-grid">
          {recentPersonas.map(persona => (
            <div key={persona.id} className="persona-card">
              <div className="persona-card-header">
                <div 
                  className="persona-avatar" 
                  style={{ backgroundColor: persona.avatarColor }}
                >
                  {persona.name.charAt(0)}
                </div>
                <div className="persona-actions">
                  {persona.isFavorite && <Star size={16} className="favorite-icon filled" />}
                  <button className="icon-btn"><MoreVertical size={16} /></button>
                </div>
              </div>
              <div className="persona-card-body">
                <h3 className="persona-name">{persona.name}</h3>
                <p className="persona-role">{persona.role}</p>
                <div className="persona-meta">
                  <span className="persona-type">{persona.type}</span>
                  <span className={`persona-status ${persona.status.toLowerCase()}`}>
                    {persona.status}
                  </span>
                </div>
                <div className="persona-tags">
                  {persona.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="persona-card-footer">
                <span className="last-updated">Updated {persona.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

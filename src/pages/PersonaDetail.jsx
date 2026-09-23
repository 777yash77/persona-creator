import { useState } from 'react';
import { 
  Edit2, Copy, Share2, Download, Archive, Trash2, MoreHorizontal,
  Star, Target, AlertTriangle, TrendingUp, Sparkles, MessageSquare
} from 'lucide-react';
import './PersonaDetail.css';

const tabs = ['Overview', 'Insights', 'Journey', 'Goals', 'Pain Points', 'Behavior', 'Notes', 'Activity'];

const PersonaDetail = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const persona = {
    name: 'Arjun',
    role: 'SaaS Product Manager',
    type: 'Person Persona',
    template: 'Product User Persona',
    status: 'Complete',
    lastUpdated: '2 hours ago',
    avatarColor: '#7f56d9',
    tags: ['B2B', 'Tech', 'Manager']
  };

  return (
    <div className="page-container detail-page">
      <div className="detail-header-actions">
        <button className="back-link">← Back to Personas</button>
        <div className="action-buttons">
          <button className="icon-btn"><Edit2 size={18} /></button>
          <button className="icon-btn"><Copy size={18} /></button>
          <button className="icon-btn"><Share2 size={18} /></button>
          <button className="icon-btn"><Download size={18} /></button>
          <button className="icon-btn"><Star size={18} /></button>
          <button className="icon-btn text-danger"><Trash2 size={18} /></button>
          <button className="icon-btn"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="detail-header">
        <div className="detail-avatar" style={{ backgroundColor: persona.avatarColor }}>
          {persona.name.charAt(0)}
        </div>
        <div className="detail-info">
          <h1>{persona.name}</h1>
          <p className="detail-role">{persona.role}</p>
          <div className="detail-meta">
            <span className="badge">{persona.type}</span>
            <span className="badge outline">{persona.template}</span>
            <span className="text-muted">Updated {persona.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="detail-tabs">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="detail-content">
        {activeTab === 'Overview' && (
          <div className="overview-grid">
            <div className="detail-card profile-card">
              <h3>Demographics</h3>
              <ul>
                <li><strong>Age:</strong> 32</li>
                <li><strong>Location:</strong> Bangalore, India</li>
                <li><strong>Education:</strong> MS Computer Science</li>
                <li><strong>Income:</strong> High</li>
              </ul>
            </div>
            
            <div className="detail-card">
              <div className="card-header-icon">
                <Target size={20} className="text-blue" />
                <h3>Primary Goals</h3>
              </div>
              <ul className="list-styled">
                <li>Increase user adoption of new features</li>
                <li>Reduce time-to-market for product releases</li>
                <li>Improve team collaboration and velocity</li>
              </ul>
            </div>

            <div className="detail-card">
              <div className="card-header-icon">
                <AlertTriangle size={20} className="text-orange" />
                <h3>Top Pain Points</h3>
              </div>
              <ul className="list-styled">
                <li>Siloed data across multiple tools</li>
                <li>Difficulty aligning stakeholders on roadmap</li>
                <li>Lack of visibility into engineering capacity</li>
              </ul>
            </div>
            
            <div className="detail-card col-span-2">
              <div className="card-header-icon">
                <TrendingUp size={20} className="text-green" />
                <h3>Behavior & Preferences</h3>
              </div>
              <p>Prefers asynchronous communication and highly values data-driven decision making. Highly active on professional networks (LinkedIn) and tech communities (ProductHunt). Evaluates tools based on API integrations and ease of onboarding.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'Insights' && (
          <div className="ai-insights-container">
            <div className="insight-card highlight">
              <Sparkles size={24} className="text-purple" />
              <div>
                <h3>Key Insight</h3>
                <p>Arjun is highly sensitive to tool fragmentation. The best way to market to him is by emphasizing "All-in-one" capabilities and seamless integrations with Jira and Slack.</p>
              </div>
            </div>
            
            <div className="insight-card">
              <MessageSquare size={20} />
              <div>
                <h3>Messaging Suggestion</h3>
                <p>"Stop switching tabs. Manage your entire product lifecycle in one place."</p>
              </div>
            </div>
          </div>
        )}
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

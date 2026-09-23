import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Plus, MoreVertical, Star, LayoutGrid, List
} from 'lucide-react';
import { recentPersonas } from '../data/mockData';
import '../pages/Dashboard.css'; // Reusing some card styles
import './PersonaLibrary.css';

const PersonaLibrary = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <div className="page-container library-page">
      <div className="library-header">
        <div>
          <h1>All Personas</h1>
          <p className="text-secondary">Manage and organize your persona workspace.</p>
        </div>
        <button className="primary-cta-btn small-btn" onClick={() => navigate('/create')}>
          <Plus size={18} /> Create Persona
        </button>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <Search size={18} className="text-tertiary" />
          <input type="text" placeholder="Search personas by name, role, or tags..." />
        </div>
        
        <div className="control-actions">
          <button className="secondary-btn icon-text-btn">
            <Filter size={18} /> Filters
          </button>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`library-content ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {viewMode === 'grid' ? (
          <div className="personas-grid">
            {recentPersonas.map(persona => (
              <Link to={`/persona/${persona.id}`} key={persona.id} className="persona-card library-card">
                <div className="persona-card-header">
                  <div className="persona-avatar" style={{ backgroundColor: persona.avatarColor }}>
                    {persona.name.charAt(0)}
                  </div>
                  <div className="persona-actions" onClick={e => e.preventDefault()}>
                    {persona.isFavorite && <Star size={16} className="favorite-icon filled" />}
                    <button className="icon-btn"><MoreVertical size={16} /></button>
                  </div>
                </div>
                <div className="persona-card-body">
                  <h3 className="persona-name">{persona.name}</h3>
                  <p className="persona-role">{persona.role}</p>
                  <div className="persona-meta">
                    <span className="persona-type">{persona.type}</span>
                  </div>
                  <div className="persona-tags">
                    {persona.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="persona-card-footer">
                  <span className="last-updated">Updated {persona.lastUpdated}</span>
                  <span className={`persona-status ${persona.status.toLowerCase()}`}>
                    {persona.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="list-container">
            <table className="library-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentPersonas.map(persona => (
                  <tr key={persona.id} onClick={() => navigate(`/persona/${persona.id}`)}>
                    <td>
                      <div className="table-name-cell">
                        <div className="avatar-small" style={{ backgroundColor: persona.avatarColor }}>
                          {persona.name.charAt(0)}
                        </div>
                        <span className="font-semibold">{persona.name}</span>
                      </div>
                    </td>
                    <td className="text-secondary">{persona.role}</td>
                    <td><span className="badge">{persona.type}</span></td>
                    <td>
                      <span className={`persona-status ${persona.status.toLowerCase()}`}>
                        {persona.status}
                      </span>
                    </td>
                    <td className="text-tertiary">{persona.lastUpdated}</td>
                    <td className="text-right" onClick={e => e.stopPropagation()}>
                      <button className="icon-btn"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaLibrary;

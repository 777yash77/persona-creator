import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, BarChart2, MessageSquare, 
  Settings, HelpCircle, FolderOpen, Plus
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">P</div>
          <span className="logo-text">PersonaHub</span>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Workspace</h3>
          <NavLink to="/personas" className="nav-item">
            <Users size={20} />
            <span>All Personas</span>
          </NavLink>
          <NavLink to="/favorites" className="nav-item">
            <FolderOpen size={20} />
            <span>Favorites</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Create</h3>
          <NavLink to="/create" className={({isActive}) => isActive ? "nav-item create-btn active" : "nav-item create-btn"}>
            <Plus size={20} />
            <span>Create Persona</span>
          </NavLink>
        </div>
        
        <div className="sidebar-section">
          <h3 className="section-title">Resources</h3>
          <NavLink to="/templates" className="nav-item">
            <FileText size={20} />
            <span>Templates</span>
          </NavLink>
          <NavLink to="/analytics" className="nav-item">
            <BarChart2 size={20} />
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/ai-assistant" className="nav-item">
            <MessageSquare size={20} />
            <span>AI Assistant</span>
          </NavLink>
        </div>
      </div>

      <div className="sidebar-footer">
        <NavLink to="/help" className="nav-item">
          <HelpCircle size={20} />
          <span>Help Center</span>
        </NavLink>
        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

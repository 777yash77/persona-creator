'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, FileText, BarChart2, MessageSquare, 
  Settings, HelpCircle, FolderOpen, Plus
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const pathname = usePathname();

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
          <Link href="/" className={pathname === '/' ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Workspace</h3>
          <Link href="/personas" className={pathname === '/personas' ? "nav-item active" : "nav-item"}>
            <Users size={20} />
            <span>All Personas</span>
          </Link>
          <Link href="/favorites" className={pathname === '/favorites' ? "nav-item active" : "nav-item"}>
            <FolderOpen size={20} />
            <span>Favorites</span>
          </Link>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Create</h3>
          <Link href="/create" className={pathname === '/create' ? "nav-item create-btn active" : "nav-item create-btn"}>
            <Plus size={20} />
            <span>Create Persona</span>
          </Link>
        </div>
        
        <div className="sidebar-section">
          <h3 className="section-title">Resources</h3>
          <Link href="/templates" className={pathname === '/templates' ? "nav-item active" : "nav-item"}>
            <FileText size={20} />
            <span>Templates</span>
          </Link>
          <Link href="/analytics" className={pathname === '/analytics' ? "nav-item active" : "nav-item"}>
            <BarChart2 size={20} />
            <span>Analytics</span>
          </Link>
          <Link href="/ai-assistant" className={pathname === '/ai-assistant' ? "nav-item active" : "nav-item"}>
            <MessageSquare size={20} />
            <span>AI Assistant</span>
          </Link>
        </div>
      </div>

      <div className="sidebar-footer">
        <Link href="/help" className={pathname === '/help' ? "nav-item active" : "nav-item"}>
          <HelpCircle size={20} />
          <span>Help Center</span>
        </Link>
        <Link href="/settings" className={pathname === '/settings' ? "nav-item active" : "nav-item"}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

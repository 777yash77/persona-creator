import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import CreateWizard from './pages/CreateWizard';
import PersonaLibrary from './pages/PersonaLibrary';
import PersonaDetail from './pages/PersonaDetail';
import './index.css';

function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/create" element={<AppLayout><CreateWizard /></AppLayout>} />
        <Route path="/personas" element={<AppLayout><PersonaLibrary /></AppLayout>} />
        <Route path="/persona/:id" element={<AppLayout><PersonaDetail /></AppLayout>} />
        {/* Redirect unknown routes to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

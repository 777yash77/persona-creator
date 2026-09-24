'use client';
import { BarChart2, TrendingUp, Users } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import '../../views/Dashboard.css';

export default function Analytics() {
  const { personas } = usePersona();

  return (
    <div className="page-container p-lg">
      <div className="mb-lg">
        <h1>Analytics Overview</h1>
        <p className="text-secondary">Track the usage and growth of your persona workspace.</p>
      </div>

      <div className="stats-grid mb-xl">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue"><Users size={20} /></div>
          <div className="stat-content">
            <span className="stat-label">Total Personas</span>
            <span className="stat-value">{personas ? personas.length : 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green"><TrendingUp size={20} /></div>
          <div className="stat-content">
            <span className="stat-label">Growth (This Month)</span>
            <span className="stat-value">+12%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper purple"><BarChart2 size={20} /></div>
          <div className="stat-content">
            <span className="stat-label">Most Used Type</span>
            <span className="stat-value">Person</span>
          </div>
        </div>
      </div>

      <div className="detail-card">
        <h3>Persona Distribution</h3>
        <p className="text-secondary mb-md">Breakdown of personas by type.</p>
        <div className="p-lg bg-light rounded text-center">
          <p className="text-tertiary">Interactive chart visualization would be placed here.</p>
        </div>
      </div>
    </div>
  );
}

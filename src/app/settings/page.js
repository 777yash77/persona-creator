'use client';
import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  return (
    <div className="page-container p-lg">
      <div className="mb-lg">
        <h1>Settings</h1>
        <p className="text-secondary">Manage your account and application preferences.</p>
      </div>

      <div className="detail-content">
        <div className="detail-card mb-md">
          <div className="flex items-center gap-sm mb-md">
            <SettingsIcon size={20} className="text-primary" />
            <h3>General Settings</h3>
          </div>
          <div className="form-group">
            <label>Workspace Name</label>
            <input type="text" className="form-input" defaultValue="Alex's Workspace" />
          </div>
        </div>

        <div className="detail-card mb-md">
          <div className="flex items-center gap-sm mb-md">
            <Palette size={20} className="text-purple" />
            <h3>Appearance</h3>
          </div>
          <p className="text-secondary">Use the sun/moon toggle in the top navigation bar to switch between Light and Dark mode.</p>
        </div>

        <div className="detail-card">
          <div className="flex items-center gap-sm mb-md">
            <Bell size={20} className="text-orange" />
            <h3>Notifications</h3>
          </div>
          <div className="flex items-center gap-md">
            <input type="checkbox" id="email-notif" defaultChecked />
            <label htmlFor="email-notif">Email me when a team member shares a persona</label>
          </div>
        </div>
      </div>
    </div>
  );
}

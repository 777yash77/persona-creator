'use client';
import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Check } from 'lucide-react';

export default function Settings() {
  const [workspaceName, setWorkspaceName] = useState(() => {
    if (typeof window === 'undefined') return "Alex's Workspace";
    return localStorage.getItem('persona-hub-workspace') || "Alex's Workspace";
  });
  const [emailNotif, setEmailNotif] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('persona-hub-email-notif') !== 'false';
  });
  const [toast, setToast] = useState('');

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('persona-hub-workspace', workspaceName);
      localStorage.setItem('persona-hub-email-notif', String(emailNotif));
      showToast('Settings saved.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      showToast('Could not save settings.');
    }
  };

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
            <input
              type="text"
              className="form-input"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
        </div>

        <div className="detail-card mb-md">
          <div className="flex items-center gap-sm mb-md">
            <Palette size={20} className="text-purple" />
            <h3>Appearance</h3>
          </div>
          <p className="text-secondary">Use the sun/moon toggle in the top navigation bar to switch between Light and Dark mode.</p>
        </div>

        <div className="detail-card mb-md">
          <div className="flex items-center gap-sm mb-md">
            <Bell size={20} className="text-orange" />
            <h3>Notifications</h3>
          </div>
          <div className="flex items-center gap-md">
            <input
              type="checkbox"
              id="email-notif"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.target.checked)}
            />
            <label htmlFor="email-notif">Email me when a team member shares a persona</label>
          </div>
        </div>

        <div className="detail-card mb-md">
          <div className="flex items-center gap-sm mb-md">
            <Shield size={20} className="text-green" />
            <h3>Privacy</h3>
          </div>
          <p className="text-secondary">Your personas are stored locally in your browser. Nothing is uploaded to a server.</p>
        </div>

        <button className="primary-cta-btn" onClick={handleSave}>
          <Check size={18} /> Save Settings
        </button>
      </div>

      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
}
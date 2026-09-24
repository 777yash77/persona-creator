'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Search, ArrowRight } from 'lucide-react';
import { personaTypes } from '../../data/personaData';
import '../../views/Dashboard.css';
import '../../views/CreateWizard.css';

export default function Templates() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const allTemplates = personaTypes.flatMap(t =>
        t.templates.map(tpl => ({ ...tpl, typeTitle: t.title }))
    );
    const q = query.trim().toLowerCase();
    const filtered = q
        ? allTemplates.filter(t => t.name.toLowerCase().includes(q) || t.typeTitle.toLowerCase().includes(q))
        : allTemplates;

    return (
        <div className="page-container dashboard-page">
            <div className="library-header">
                <div>
                    <h1 className="welcome-text">Templates</h1>
                    <p className="welcome-subtext">Start faster with a pre-built persona template.</p>
                </div>
                <button className="primary-cta-btn small-btn" onClick={() => router.push('/create')}>
                    <FileText size={18} /> Create from scratch
                </button>
            </div>

            <div className="search-box">
                <Search size={18} className="text-tertiary" />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search templates"
                />
            </div>

            <div className="template-cards-grid">
                {filtered.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-card-image dynamic-bg">
                            <span className="template-initial">{template.name.charAt(0)}</span>
                        </div>
                        <div className="template-card-content">
                            <div className="template-card-header">
                                <span className="template-number">{template.typeTitle}</span>
                                <span className={`complexity-badge ${template.complexity.toLowerCase()}`}>
                                    {template.complexity}
                                </span>
                            </div>
                            <h3 className="template-title">{template.name}</h3>
                            <div className="template-meta">
                                <span>{template.sections} sections</span>
                            </div>
                            <div className="template-actions">
                                <button className="use-template-btn" onClick={() => router.push('/create')}>
                                    Use Template <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <Search size={48} className="empty-state-icon" />
                    <h3>No templates found</h3>
                    <p className="text-secondary">Try a different search term.</p>
                </div>
            )}
        </div>
    );
}
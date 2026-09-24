'use client';
import { useRouter } from 'next/navigation';
import { HelpCircle, Plus, FileText, Users, Sparkles } from 'lucide-react';

const topics = [
    { icon: Plus, title: 'Creating personas', desc: 'Use the Create Persona wizard to build a persona step by step.' },
    { icon: FileText, title: 'Using templates', desc: 'Start from a pre-built template in the Templates library.' },
    { icon: Users, title: 'Managing personas', desc: 'Search, filter, favorite, duplicate, or delete from All Personas.' },
    { icon: Sparkles, title: 'AI assistance', desc: 'Auto-fill fields or chat with the AI Assistant for suggestions.' },
];

export default function Help() {
    const router = useRouter();

    return (
        <div className="page-container dashboard-page">
            <div className="library-header">
                <div>
                    <h1 className="welcome-text">Help Center</h1>
                    <p className="welcome-subtext">Guides and answers to get the most out of PersonaHub.</p>
                </div>
                <button className="primary-cta-btn small-btn" onClick={() => router.push('/create')}>
                    <Plus size={18} /> Create Persona
                </button>
            </div>

            <div className="personas-grid">
                {topics.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="detail-card">
                        <div className="flex items-center gap-sm mb-md">
                            <Icon size={20} className="text-purple" />
                            <h3>{title}</h3>
                        </div>
                        <p className="text-secondary">{desc}</p>
                    </div>
                ))}
            </div>

            <div className="detail-card">
                <div className="flex items-center gap-sm mb-md">
                    <HelpCircle size={20} className="text-purple" />
                    <h3>Need more help?</h3>
                </div>
                <p className="text-secondary">Reach out at <strong>support@personahub.io</strong> and we will get back to you.</p>
            </div>
        </div>
    );
}
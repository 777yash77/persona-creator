'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Send, Sparkles } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import '../../views/Dashboard.css';
import '../../views/PersonaDetail.css';

const suggestions = [
    'Help me write a persona for a fintech app',
    'What questions should I ask a B2B buyer?',
    'Summarize my personas',
];

export default function AIAssistant() {
    const router = useRouter();
    const { personas } = usePersona();
    const [messages, setMessages] = useState([
        { id: 1, from: 'ai', text: 'Hi! I am your persona assistant. Ask me to draft, refine, or analyze a persona.' }
    ]);
    const [input, setInput] = useState('');

    const send = (text) => {
        const value = (text || input).trim();
        if (!value) return;
        setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: value }]);
        setInput('');
        setTimeout(() => {
            const count = personas?.length || 0;
            let reply = `Here is a starting point for "${value}". Focus on goals, pain points, and demographics to make it actionable.`;
            if (value.toLowerCase().includes('summar')) {
                reply = `You currently have ${count} persona${count === 1 ? '' : 's'} in your workspace. Head to All Personas to review them.`;
            }
            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'ai', text: reply }]);
        }, 500);
    };

    return (
        <div className="page-container dashboard-page">
            <div className="library-header">
                <div>
                    <h1 className="welcome-text">AI Assistant</h1>
                    <p className="welcome-subtext">Draft, refine, and analyze personas with AI.</p>
                </div>
                <button className="primary-cta-btn small-btn" onClick={() => router.push('/create')}>
                    <Sparkles size={18} /> Create Persona
                </button>
            </div>

            {messages.length <= 1 && (
                <div className="suggestion-row">
                    {suggestions.map(s => (
                        <button key={s} className="suggestion-chip" onClick={() => send(s)}>{s}</button>
                    ))}
                </div>
            )}

            <div className="detail-card chat-window">
                <div className="chat-body">
                    {messages.map(m => (
                        <div key={m.id} className={`chat-bubble ${m.from}`}>{m.text}</div>
                    ))}
                </div>
                <form className="chat-footer" onSubmit={(e) => { e.preventDefault(); send(); }}>
                    <Bot size={18} className="text-purple" />
                    <input
                        className="chat-input"
                        placeholder="Ask the AI assistant..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        aria-label="Message"
                    />
                    <button className="chat-send-btn" type="submit" aria-label="Send">
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
}
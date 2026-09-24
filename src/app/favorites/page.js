'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import '../../views/Dashboard.css';

export default function Favorites() {
    const router = useRouter();
    const { personas, isLoaded, toggleFavorite } = usePersona();

    const favorites = useMemo(
        () => (isLoaded ? personas.filter(p => p.isFavorite) : []),
        [personas, isLoaded]
    );

    return (
        <div className="page-container dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="welcome-text">Favorites</h1>
                    <p className="welcome-subtext">Your starred personas, all in one place.</p>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <Star size={48} className="empty-state-icon" />
                    <h3>No favorites yet</h3>
                    <p className="text-secondary">Star a persona to see it here.</p>
                    <button className="primary-cta-btn small-btn" onClick={() => router.push('/personas')}>
                        Browse Personas
                    </button>
                </div>
            ) : (
                <div className="personas-grid">
                    {favorites.map(persona => (
                        <Link href={`/persona/${persona.id}`} key={persona.id} className="persona-card clickable">
                            <div className="persona-card-header">
                                <div className="persona-avatar" style={{ backgroundColor: persona.avatarColor }}>
                                    {persona.name.charAt(0)}
                                </div>
                                <div className="persona-actions" onClick={e => e.preventDefault()}>
                                    <button
                                        className="icon-btn"
                                        title="Remove from favorites"
                                        onClick={() => toggleFavorite(persona.id)}
                                    >
                                        <Star size={16} className="favorite-icon filled" />
                                    </button>
                                </div>
                            </div>
                            <div className="persona-card-body">
                                <h3 className="persona-name">{persona.name}</h3>
                                <p className="persona-role">{persona.role}</p>
                                <div className="persona-meta">
                                    <span className="persona-type">{persona.type}</span>
                                </div>
                            </div>
                            <div className="persona-card-footer">
                                <span className="last-updated">Updated {persona.lastUpdated || persona.createdAt}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
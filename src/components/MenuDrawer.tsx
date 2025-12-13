import React from 'react';
import { X, Lock, Mail, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { features, getPremiumFeatures, getFreeFeatures } from '../data/features';
import { Button } from './Button';

interface MenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onFeatureClick: (featureId: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose, onFeatureClick }) => {
    const navigate = useNavigate();
    const premiumFeatures = getPremiumFeatures();
    const freeFeatures = getFreeFeatures();

    const handleFeatureClick = (feature: typeof features[0]) => {
        if (feature.isLocked) {
            onFeatureClick(feature.id);
        } else if (feature.route) {
            navigate(feature.route);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                    backdropFilter: 'blur(4px)',
                    animation: 'fadeIn 0.3s ease-out'
                }}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '320px',
                    maxWidth: '85vw',
                    backgroundColor: 'white',
                    zIndex: 1000,
                    boxShadow: 'var(--shadow-2xl)',
                    animation: 'slideInLeft 0.3s ease-out',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                            Nano Fresh
                        </h2>
                        <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: '0.25rem 0 0 0' }}>
                            Business Management
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'all var(--transition-base)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {/* Free Features Section */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.75rem',
                            letterSpacing: '0.05em'
                        }}>
                            Available Features
                        </h3>
                        {freeFeatures.map(feature => (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature)}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    marginBottom: '0.5rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'white',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-base)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    textAlign: 'left'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-brand-green)';
                                    e.currentTarget.style.background = 'var(--color-bg-subtle)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.background = 'white';
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                        {feature.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        {feature.description}
                                    </div>
                                </div>
                                <ChevronRight size={16} color="var(--color-text-muted)" />
                            </button>
                        ))}
                    </div>

                    {/* Premium Features Section */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            <h3 style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: 'var(--color-text-muted)',
                                letterSpacing: '0.05em',
                                margin: 0
                            }}>
                                Premium Features
                            </h3>
                            <span style={{
                                padding: '0.125rem 0.5rem',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--gradient-gold)',
                                color: 'white',
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                            }}>
                                Pro
                            </span>
                        </div>

                        {premiumFeatures.map(feature => (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature)}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    marginBottom: '0.5rem',
                                    border: '2px dashed var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'linear-gradient(135deg, rgba(243, 156, 18, 0.05) 0%, rgba(230, 126, 34, 0.05) 100%)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-base)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-accent-gold)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {feature.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        {feature.description}
                                    </div>
                                </div>
                                <Lock size={16} color="var(--color-accent-gold)" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-bg-subtle)'
                }}>
                    <Button
                        variant="gradient"
                        fullWidth
                        icon={<Mail size={18} />}
                        onClick={() => {
                            window.location.href = 'mailto:contact@nanofresh.com?subject=Upgrade%20to%20Pro';
                        }}
                    >
                        Contact for Upgrade
                    </Button>
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        marginTop: '0.75rem',
                        marginBottom: 0
                    }}>
                        Unlock all premium features
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes slideInLeft {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
};

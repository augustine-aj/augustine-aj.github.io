import React from 'react';
import { Lock, Database, Zap, TrendingUp } from 'lucide-react';
import { Button } from './Button';

export const CustomerManagementLocked: React.FC = () => {
    const handleUpgradeClick = () => {
        // Open email client or redirect to contact page
        window.location.href = 'mailto:contact@nanofresh.com?subject=Upgrade%20to%20Pro%20-%20Customer%20Database%20Integration';
    };

    return (
        <div
            style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(52, 152, 219, 0.05) 100%)',
                border: '2px dashed var(--color-border)',
                overflow: 'hidden'
            }}
        >
            {/* Background Pattern */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: 'var(--gradient-primary)',
                    opacity: 0.05,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none'
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Lock Icon */}
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--gradient-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    <Lock size={32} color="white" />
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block'
                    }}
                >
                    Unlock Customer Database Integration
                </h3>

                {/* Premium Badge */}
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--gradient-gold)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}
                >
                    Pro Feature
                </span>

                {/* Description */}
                <p
                    style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        marginTop: '1rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    Connect to your database for seamless customer management, auto-fill, and history tracking.
                    Upgrade to Pro for enhanced performance and unlimited storage.
                </p>

                {/* Features Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(46, 204, 113, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            <Database size={20} color="var(--color-brand-green)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                Database Integration
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                Connect your existing database
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(52, 152, 219, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            <Zap size={20} color="var(--color-brand-blue)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                Auto-Fill
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                Instant customer details
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(243, 156, 18, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            <TrendingUp size={20} color="var(--color-accent-gold)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                Unlimited Storage
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                No 3-invoice limit
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <Button
                    variant="gradient"
                    size="lg"
                    onClick={handleUpgradeClick}
                    icon={<Lock size={20} />}
                    style={{
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: 700
                    }}
                >
                    Contact for Upgrade
                </Button>

                {/* Footer Note */}
                <p
                    style={{
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-light)',
                        textAlign: 'center'
                    }}
                >
                    Get in touch to discuss custom database integration and pricing
                </p>
            </div>
        </div>
    );
};

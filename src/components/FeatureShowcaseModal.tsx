import React from 'react';
import { X, Lock, Check, Mail } from 'lucide-react';
import { getFeatureById } from '../data/features';
import { Button } from './Button';

interface FeatureShowcaseModalProps {
    isOpen: boolean;
    featureId: string | null;
    onClose: () => void;
}

export const FeatureShowcaseModal: React.FC<FeatureShowcaseModalProps> = ({
    isOpen,
    featureId,
    onClose
}) => {
    if (!isOpen || !featureId) return null;

    const feature = getFeatureById(featureId);
    if (!feature) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '1rem',
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.3s ease-out'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '700px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-2xl)',
                    animation: 'slideUp 0.4s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Gradient */}
                <div
                    style={{
                        background: 'var(--gradient-gold)',
                        color: 'white',
                        padding: '2rem',
                        position: 'relative'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}
                        >
                            {feature.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
                                    {feature.name}
                                </h2>
                                <Lock size={24} />
                            </div>
                            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
                                {feature.description}
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'inline-block',
                            padding: '0.375rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(255, 255, 255, 0.25)',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Premium Feature
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', overflowY: 'auto', maxHeight: 'calc(90vh - 250px)' }}>
                    {/* Marketing Message */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(52, 152, 219, 0.05) 100%)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                            Why Upgrade to Pro?
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                            {feature.id === 'analytics' && 'Unlock powerful business insights with real-time analytics. Track sales trends, identify top customers, and make data-driven decisions to grow your business.'}
                            {feature.id === 'customers' && 'Build stronger customer relationships with our comprehensive CRM. Store unlimited customer data, track purchase history, and auto-fill invoices in seconds.'}
                            {feature.id === 'inventory' && 'Streamline your operations with smart inventory management. Track stock levels, get low-stock alerts, and add products to invoices instantly from your catalog.'}
                            {feature.id === 'orders' && 'Never miss an order with our comprehensive order management system. Track deliveries, manage status updates, and keep customers informed every step of the way.'}
                            {feature.id === 'purchases' && 'Optimize your supply chain with intelligent purchase management. Track suppliers, automate reordering, and maintain optimal stock levels effortlessly.'}
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                            What You'll Get
                        </h3>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {feature.benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-bg-subtle)',
                                        transition: 'all var(--transition-base)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-brand-green-light)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--color-bg-subtle)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: 'var(--radius-full)',
                                            background: 'var(--color-brand-green)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        <Check size={14} color="white" />
                                    </div>
                                    <span style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing/Contact Section */}
                    <div
                        style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            textAlign: 'center'
                        }}
                    >
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            Ready to Upgrade?
                        </h3>
                        <p style={{ margin: '0 0 1.5rem 0', opacity: 0.9 }}>
                            Get in touch to discuss custom pricing and database integration
                        </p>
                        <Button
                            variant="secondary"
                            size="lg"
                            fullWidth
                            icon={<Mail size={20} />}
                            onClick={() => {
                                window.location.href = `mailto:contact@nanofresh.com?subject=Upgrade%20Request%20-%20${feature.name}`;
                            }}
                            style={{ background: 'white', color: 'var(--color-primary)' }}
                        >
                            Contact for Upgrade
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

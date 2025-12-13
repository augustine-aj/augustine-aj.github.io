import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, variant = 'default' }) => {
    const baseStyles = {
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    };

    const variantStyles = variant === 'glass'
        ? {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: 'var(--shadow-lg)'
        }
        : {
            backgroundColor: 'var(--color-bg-surface)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)'
        };

    return (
        <div
            className={`card-component ${className}`}
            style={{ ...baseStyles, ...variantStyles }}
        >
            {title && (
                <h3 className="font-bold mb-md text-xl text-primary border-b pb-2 mb-4" style={{ borderColor: 'var(--color-border)' }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}

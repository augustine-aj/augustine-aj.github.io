import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, className = '', fullWidth = true, ...props }) => {
    return (
        <div className={`flex flex-col gap-xs ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label className="text-sm font-medium text-muted ml-1 mb-1 block">
                    {label}
                </label>
            )}
            <input
                className={`input-component ${className}`}
                style={{
                    padding: '0.625rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.925rem',
                    width: '100%',
                    backgroundColor: 'var(--color-bg-surface)',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-green)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-brand-green-light)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                }}
                {...props}
            />
        </div>
    );
}

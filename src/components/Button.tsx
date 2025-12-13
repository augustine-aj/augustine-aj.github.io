import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'brand' | 'gradient' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...props
}) => {

    // Base styles
    const baseStyle: React.CSSProperties = {
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        border: 'none',
        transition: 'all var(--transition-base)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
        overflow: 'hidden',
        opacity: disabled || loading ? 0.6 : 1,
        ...(props.style || {})
    };

    // Size variants
    const paddingMap = {
        sm: '0.5rem 1rem',
        md: '0.625rem 1.5rem',
        lg: '0.875rem 2rem',
    };
    const fontSizeMap = {
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
    };

    // Color variants
    const getVariantStyle = (): React.CSSProperties => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-sm)',
                };
            case 'brand':
                return {
                    backgroundColor: 'var(--color-brand-green)',
                    color: 'white',
                    boxShadow: 'var(--shadow-md)',
                };
            case 'gradient':
                return {
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-md)',
                };
            case 'secondary':
                return {
                    backgroundColor: 'var(--color-bg-subtle)',
                    color: 'var(--color-text-main)',
                    border: '1px solid var(--color-border)',
                };
            case 'danger':
                return {
                    backgroundColor: 'var(--color-danger)',
                    color: 'white',
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    border: '2px solid var(--color-brand-green)',
                    color: 'var(--color-brand-green)',
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-main)',
                };
            default:
                return {};
        }
    };

    const combinedStyle = {
        ...baseStyle,
        padding: paddingMap[size],
        fontSize: fontSizeMap[size],
        ...getVariantStyle(),
    };

    const LoadingSpinner = () => (
        <svg
            className="animate-spin"
            style={{ width: '1em', height: '1em' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                style={{ opacity: 0.25 }}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                style={{ opacity: 0.75 }}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    return (
        <button
            style={combinedStyle}
            className={`btn-enhanced ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {!loading && icon && iconPosition === 'left' && icon}
            {children}
            {!loading && icon && iconPosition === 'right' && icon}
        </button>
    );
};

import React from 'react';
import { Menu } from 'lucide-react';

interface MenuButtonProps {
    onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--color-border)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-brand-green)';
                e.currentTarget.style.background = 'var(--color-brand-green-light)';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Open menu"
        >
            <Menu size={24} color="var(--color-primary)" />
        </button>
    );
};

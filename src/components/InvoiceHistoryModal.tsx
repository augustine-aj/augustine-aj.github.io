import React from 'react';
import { X, FileText, Trash2, Download } from 'lucide-react';
import type { InvoiceData } from '../types/Invoice';
import { getInvoiceHistory, deleteInvoiceFromHistory } from '../utils/storage';
import { Button } from './Button';

interface InvoiceHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadInvoice: (invoice: InvoiceData) => void;
}

export const InvoiceHistoryModal: React.FC<InvoiceHistoryModalProps> = ({
    isOpen,
    onClose,
    onLoadInvoice
}) => {
    const [invoices, setInvoices] = React.useState<InvoiceData[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            setInvoices(getInvoiceHistory());
        }
    }, [isOpen]);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this invoice from history?')) {
            deleteInvoiceFromHistory(id);
            setInvoices(getInvoiceHistory());
        }
    };

    const handleLoad = (invoice: InvoiceData) => {
        onLoadInvoice(invoice);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem',
                backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-2xl)',
                    animation: 'slideUp 0.3s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '1.5rem 2rem',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--gradient-primary)',
                        color: 'white'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FileText size={24} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                            Recent Invoices
                        </h2>
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

                {/* Content */}
                <div style={{ padding: '2rem', overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
                    {invoices.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 1.5rem',
                                    background: 'var(--color-bg-subtle)',
                                    borderRadius: 'var(--radius-full)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <FileText size={40} color="var(--color-text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                                No Invoices Yet
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Your last 3 downloaded invoices will appear here
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {invoices.map((invoice) => {
                                const total = invoice.items.reduce((sum, item) => sum + item.amount, 0);
                                const totalWithVat = total * (1 + invoice.vatRate);

                                return (
                                    <div
                                        key={invoice.id}
                                        style={{
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-lg)',
                                            padding: '1.5rem',
                                            transition: 'all var(--transition-base)',
                                            cursor: 'pointer',
                                            background: 'white'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.borderColor = 'var(--color-brand-green)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'var(--color-border)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>
                                                        Invoice #{invoice.invoiceNo}
                                                    </h3>
                                                    <span
                                                        style={{
                                                            fontSize: '0.75rem',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: 'var(--radius-full)',
                                                            background: 'var(--color-brand-green-light)',
                                                            color: 'var(--color-brand-green-dark)',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <Download size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                                        Downloaded
                                                    </span>
                                                </div>
                                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
                                                    {invoice.customer.businessName}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brand-green)' }}>
                                                    AED {totalWithVat.toFixed(2)}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    {new Date(invoice.downloadedAt || invoice.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                                            <Button
                                                variant="gradient"
                                                size="sm"
                                                onClick={() => handleLoad(invoice)}
                                                style={{ flex: 1 }}
                                            >
                                                Load Invoice
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(invoice.id);
                                                }}
                                                icon={<Trash2 size={16} />}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import type { InvoiceData } from '../types/Invoice';

const STORAGE_KEYS = {
    DRAFT: 'nano_fresh_draft_invoice',
    HISTORY: 'nano_fresh_invoice_history'
} as const;

const MAX_HISTORY_SIZE = 3;

/**
 * Generate a unique ID for invoices
 */
export const generateInvoiceId = (): string => {
    return `INV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Save current draft invoice to localStorage
 */
export const saveDraftInvoice = (invoice: InvoiceData): void => {
    try {
        const draftInvoice = {
            ...invoice,
            isDraft: true,
            id: invoice.id || generateInvoiceId()
        };
        localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draftInvoice));
    } catch (error) {
        console.error('Failed to save draft invoice:', error);
    }
};

/**
 * Load draft invoice from localStorage
 */
export const loadDraftInvoice = (): InvoiceData | null => {
    try {
        const draft = localStorage.getItem(STORAGE_KEYS.DRAFT);
        if (draft) {
            return JSON.parse(draft);
        }
        return null;
    } catch (error) {
        console.error('Failed to load draft invoice:', error);
        return null;
    }
};

/**
 * Clear draft invoice from localStorage
 */
export const clearDraftInvoice = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.DRAFT);
    } catch (error) {
        console.error('Failed to clear draft invoice:', error);
    }
};

/**
 * Save downloaded invoice to history (max 3)
 */
export const saveDownloadedInvoice = (invoice: InvoiceData): void => {
    try {
        const downloadedInvoice = {
            ...invoice,
            isDraft: false,
            downloadedAt: new Date().toISOString(),
            id: invoice.id || generateInvoiceId()
        };

        // Get current history
        const history = getInvoiceHistory();

        // Add new invoice at the beginning
        const updatedHistory = [downloadedInvoice, ...history];

        // Keep only last 3
        const limitedHistory = updatedHistory.slice(0, MAX_HISTORY_SIZE);

        // Save back to localStorage
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(limitedHistory));

        // Clear draft since it's now downloaded
        clearDraftInvoice();
    } catch (error) {
        console.error('Failed to save downloaded invoice:', error);
    }
};

/**
 * Get invoice history (last 3 downloaded invoices)
 */
export const getInvoiceHistory = (): InvoiceData[] => {
    try {
        const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (history) {
            return JSON.parse(history);
        }
        return [];
    } catch (error) {
        console.error('Failed to load invoice history:', error);
        return [];
    }
};

/**
 * Delete invoice from history by ID
 */
export const deleteInvoiceFromHistory = (id: string): void => {
    try {
        const history = getInvoiceHistory();
        const updatedHistory = history.filter(invoice => invoice.id !== id);
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Failed to delete invoice from history:', error);
    }
};

/**
 * Check if there's a draft invoice
 */
export const hasDraftInvoice = (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.DRAFT) !== null;
};

/**
 * Get storage statistics
 */
export const getStorageStats = () => {
    return {
        hasDraft: hasDraftInvoice(),
        historyCount: getInvoiceHistory().length,
        maxHistory: MAX_HISTORY_SIZE
    };
};

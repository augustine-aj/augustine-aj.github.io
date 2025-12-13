export interface InvoiceItem {
    id: string; // unique for React keys
    description: string;
    quantity: number;
    rate: number;
    amount: number; // calculated: quantity * rate
}

export interface CompanyDetails {
    name: string;
    addressLine1: string;
    addressLine2: string; // e.g. TRN
    mobile: string;
    logoUrl?: string; // Optional, maybe we use a default
}

export interface CustomerDetails {
    name: string;
    businessName: string;
    address: string;
    taxRegNo: string;
}

export interface InvoiceData {
    id: string; // Unique identifier for the invoice
    invoiceNo: string;
    date: string;
    company: CompanyDetails;
    customer: CustomerDetails;
    items: InvoiceItem[];
    vatRate: number; // e.g., 0.05 for 5%
    isDraft: boolean; // true if not downloaded yet
    downloadedAt?: string; // ISO timestamp when PDF was downloaded
}

// Default initial state
export const initialInvoiceData: InvoiceData = {
    id: '', // Will be generated when needed
    invoiceNo: '5039', // From sample
    date: new Date().toISOString().split('T')[0],
    company: {
        name: 'FLAVOURS FOODSTUFF TRADING LLC',
        addressLine1: 'International city dubai, UAE, Po box 78416',
        addressLine2: 'TRN: 100588993400003',
        mobile: '+971 56 622 1665'
    },
    customer: {
        name: 'CUSTOMER',
        businessName: 'SIP AND DINE RESTAURANT AND CAFETERIA',
        address: 'AL QUSAIS, DUBAI, UAE',
        taxRegNo: '1049944013100003'
    },
    items: [
        { id: '1', description: 'CARROT', quantity: 3.00, rate: 13, amount: 39.00 },
        { id: '2', description: 'KIYAAR', quantity: 1.00, rate: 18, amount: 18.00 },
        { id: '3', description: 'TOMATO', quantity: 1.00, rate: 10, amount: 10.00 },
        { id: '4', description: 'KASS', quantity: 1.00, rate: 20, amount: 20.00 },
        { id: '5', description: 'MANGO', quantity: 2.00, rate: 24, amount: 48.00 },
        { id: '6', description: 'LEMON', quantity: 1.00, rate: 41, amount: 41.00 },
        { id: '7', description: 'WATERMELON', quantity: 2.00, rate: 13, amount: 26.00 },
    ],
    vatRate: 0.05,
    isDraft: true
};


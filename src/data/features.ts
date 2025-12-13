// Feature definitions for the menu system
export interface Feature {
    id: string;
    name: string;
    icon: string;
    description: string;
    isLocked: boolean;
    category: 'free' | 'premium';
    benefits: string[];
    route?: string;
}

export const features: Feature[] = [
    // Free Features
    {
        id: 'invoice-generator',
        name: 'Invoice Generator',
        icon: '📄',
        description: 'Create professional invoices',
        isLocked: false,
        category: 'free',
        benefits: [],
        route: '/invoice'
    },
    {
        id: 'history',
        name: 'Invoice History',
        icon: '📜',
        description: 'Last 3 downloaded invoices',
        isLocked: false,
        category: 'free',
        benefits: [],
        route: '/invoice'
    },

    // Premium Features
    {
        id: 'analytics',
        name: 'Analytics Dashboard',
        icon: '📊',
        description: 'Business insights and performance metrics',
        isLocked: true,
        category: 'premium',
        benefits: [
            'Real-time sales trends and revenue charts',
            'Top customers and product performance',
            'Monthly comparisons and goal tracking',
            'Exportable reports (PDF, Excel)',
            'Custom date ranges and filters',
            'Predictive analytics for forecasting'
        ]
    },
    {
        id: 'customers',
        name: 'Customer Management',
        icon: '👥',
        description: 'Comprehensive CRM and customer database',
        isLocked: true,
        category: 'premium',
        benefits: [
            'Unlimited customer records',
            'Complete contact information management',
            'Full purchase history per customer',
            'Quick search and auto-fill',
            'Customer notes and preferences',
            'Customer segmentation and tagging',
            'Email integration for direct invoicing'
        ]
    },
    {
        id: 'inventory',
        name: 'Inventory Management',
        icon: '📦',
        description: 'Product catalog and stock tracking',
        isLocked: true,
        category: 'premium',
        benefits: [
            'Unlimited product catalog',
            'Real-time stock level tracking',
            'Low stock alerts and notifications',
            'Quick-add products to invoices',
            'Multiple pricing tiers',
            'Product images and categories',
            'Stock movement history',
            'Barcode scanning support'
        ]
    },
    {
        id: 'orders',
        name: 'Order Management',
        icon: '📋',
        description: 'Track and manage customer orders',
        isLocked: true,
        category: 'premium',
        benefits: [
            'Unlimited order history',
            'Order status tracking (Pending, Processing, Delivered)',
            'Delivery scheduling and management',
            'Order calendar and timeline view',
            'Customer notifications',
            'Order analytics and metrics',
            'Recurring order automation',
            'Delivery route optimization'
        ]
    },
    {
        id: 'purchases',
        name: 'Purchase Management',
        icon: '🛍️',
        description: 'Supplier and procurement management',
        isLocked: true,
        category: 'premium',
        benefits: [
            'Unlimited supplier database',
            'Purchase order creation and tracking',
            'Cost tracking and analysis',
            'Automated reorder points',
            'Supplier payment tracking',
            'Supplier performance metrics',
            'Stock receiving management',
            'Cost optimization insights'
        ]
    },

    // Additional Free Features
    {
        id: 'settings',
        name: 'Settings',
        icon: '⚙️',
        description: 'Application preferences',
        isLocked: false,
        category: 'free',
        benefits: [],
        route: '/settings'
    },
    {
        id: 'help',
        name: 'Help & Support',
        icon: '❓',
        description: 'Documentation and support',
        isLocked: false,
        category: 'free',
        benefits: [],
        route: '/help'
    }
];

export const getPremiumFeatures = () => features.filter(f => f.category === 'premium');
export const getFreeFeatures = () => features.filter(f => f.category === 'free');
export const getFeatureById = (id: string) => features.find(f => f.id === id);

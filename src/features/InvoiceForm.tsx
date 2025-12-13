import React from 'react';
import type { InvoiceData, InvoiceItem } from '../types/Invoice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CustomerManagementLocked } from '../components/CustomerManagementLocked';
import { Trash2, Plus } from 'lucide-react';

interface InvoiceFormProps {
    data: InvoiceData;
    onUpdate: (data: Partial<InvoiceData>) => void;
    totals: { subtotal: number; vatAmount: number; total: number };
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, onUpdate, totals }) => {

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ company: { ...data.company, [e.target.name]: e.target.value } });
    };

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ customer: { ...data.customer, [e.target.name]: e.target.value } });
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        // Recalculate amount if qty or rate changes
        if (field === 'quantity' || field === 'rate') {
            newItems[index].amount = Number(newItems[index].quantity) * Number(newItems[index].rate);
        }
        onUpdate({ items: newItems });
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0
        };
        onUpdate({ items: [...data.items, newItem] });
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onUpdate({ items: newItems });
    };

    return (
        <div className="flex flex-col gap-6">
            <Card title="Invoice Details">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Invoice No"
                        value={data.invoiceNo}
                        onChange={(e) => onUpdate({ invoiceNo: e.target.value })}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={data.date}
                        onChange={(e) => onUpdate({ date: e.target.value })}
                    />
                </div>
            </Card>

            {/* Locked Customer Management Feature */}
            <CustomerManagementLocked />

            <Card title="Customer Details">
                <div className="flex flex-col gap-4">
                    <Input
                        name="businessName"
                        label="Business Name"
                        value={data.customer.businessName}
                        onChange={handleCustomerChange}
                    />
                    <Input
                        name="address"
                        label="Address"
                        value={data.customer.address}
                        onChange={handleCustomerChange}
                    />
                    <Input
                        name="taxRegNo"
                        label="TRN"
                        value={data.customer.taxRegNo}
                        onChange={handleCustomerChange}
                    />
                </div>
            </Card>

            <Card title="Items">
                <div className="flex flex-col">
                    {/* Table Container with Border */}
                    <div style={{
                        border: '2px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden'
                    }}>
                        {/* Table Headers - Sticky */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                                gap: '0.75rem',
                                padding: '0.875rem 1rem',
                                background: 'var(--color-bg-subtle)',
                                borderBottom: '2px solid var(--color-border)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'var(--color-text-main)'
                            }}
                        >
                            <div>Description</div>
                            <div style={{ textAlign: 'center' }}>Quantity</div>
                            <div style={{ textAlign: 'center' }}>Rate (AED)</div>
                            <div style={{ textAlign: 'right' }}>Amount (AED)</div>
                            <div style={{ textAlign: 'center' }}>Delete</div>
                        </div>

                        {/* Item Rows */}
                        <div>
                            {data.items.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        alignItems: 'center',
                                        borderBottom: index < data.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                                        transition: 'background var(--transition-base)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-bg-subtle)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {/* Description */}
                                    <div>
                                        <Input
                                            placeholder="Item description"
                                            value={item.description}
                                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>

                                    {/* Rate */}
                                    <div>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={item.rate}
                                            onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>

                                    {/* Amount - Read Only */}
                                    <div style={{
                                        textAlign: 'right',
                                        fontWeight: 600,
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-brand-green)',
                                        padding: '0 0.5rem'
                                    }}>
                                        {item.amount.toFixed(2)}
                                    </div>

                                    {/* Delete Button */}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => removeItem(index)}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid var(--color-border)',
                                                background: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all var(--transition-base)',
                                                color: 'var(--color-danger)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-danger)';
                                                e.currentTarget.style.color = 'white';
                                                e.currentTarget.style.borderColor = 'var(--color-danger)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.color = 'var(--color-danger)';
                                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Item Button */}
                    <Button onClick={addItem} variant="secondary" className="mt-4 flex items-center justify-center gap-2">
                        <Plus size={16} /> Add Item
                    </Button>
                </div>

                <div className="mt-6 flex flex-col gap-2 text-right">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-bold">{totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                        <span>VAT ({(data.vatRate * 100)}%):</span>
                        <span>{totals.vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>{totals.total.toFixed(2)}</span>
                    </div>
                </div>
            </Card>

            <Card title="Company Settings (Hidden on Print)">
                <div className="flex flex-col gap-2">
                    <Input name="name" label="Company Name" value={data.company.name} onChange={handleCompanyChange} />
                    <Input name="mobile" label="Mobile" value={data.company.mobile} onChange={handleCompanyChange} />
                </div>
            </Card>
        </div>
    );
};

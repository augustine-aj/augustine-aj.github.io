import { forwardRef } from 'react';
import type { InvoiceData } from '../types/Invoice';
import './InvoicePreview.css'; // Import the new CSS

interface InvoicePreviewProps {
    data: InvoiceData;
    totals: {
        subtotal: number;
        vatAmount: number;
        total: number;
    };
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data, totals }, ref) => {
    return (
        <div id="invoice-preview">
            <div id="invoice-template" ref={ref}>
                <header>
                    <div className="seller-info">
                        <p className="company-name font-bold uppercase">{data.company.name}</p>
                        <p>{data.company.addressLine1}</p>
                        <p>TRN: <span>{data.company.addressLine2.replace('TRN: ', '')}</span></p>
                        <p>Mobile: {data.company.mobile}</p>
                    </div>
                    <div className="invoice-meta">
                        <h1>TAX INVOICE</h1>
                        <p>Date: <span>{data.date}</span></p>
                        <p>Invoice No: <span>{data.invoiceNo}</span></p>
                    </div>
                </header>

                <div className="customer-info">
                    <h2>CUSTOMER</h2>
                    <p className="customer-name font-bold uppercase"><span>{data.customer.businessName}</span></p>
                    <p className="uppercase">{data.customer.address}</p>
                    <p>TAX REGN NO: <span>{data.customer.taxRegNo}</span></p>
                </div>

                <table className="item-table">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ITEM DESCRIPTION</th>
                            <th>QTY</th>
                            <th>RATE</th>
                            <th>Net Total Excluding VAT</th>
                        </tr>
                    </thead>
                    <tbody id="pdf-item-rows">
                        {data.items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity.toFixed(2)}</td>
                                <td>{item.rate.toFixed(2)}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="total-label">TOTAL EXCUDING VAT</td>
                            <td className="total-value">{totals.subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="total-label">TOTAL VAT AMOUNT @{(data.vatRate * 100)}%</td>
                            <td className="total-value">{totals.vatAmount.toFixed(2)}</td>
                        </tr>
                        <tr className="final-total-row">
                            <td colSpan={4} className="total-label">TOTAL WITH VAT AFTER NET DISCOUNT</td>
                            <td className="total-value">{totals.total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="footer">
                    <p>RESH</p>
                    <p>FRUITS & VEGETABLES</p>
                    <p className="signature-line">RECEIVER- SIGN</p>
                </div>
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';

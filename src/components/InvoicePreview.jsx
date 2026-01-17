import React from 'react';

const InvoicePreview = ({ data, id, theme }) => {
    const { company, billTo, meta, items, taxRate, currency } = data;

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = subtotal * (taxRate / 100);
    const grandTotal = subtotal + taxAmount;

    const formatCurrency = (val) => {
        return `${currency}${val.toFixed(2)}`;
    };

    return (
        <div className="preview-panel">
            <div id={id} className={`invoice-paper ${theme}`}>
                <div className="invoice-header">
                    <div className="company-info-block">
                        {company.logo && (
                            <div className="company-logo-area" style={{ marginBottom: '1rem' }}>
                                <img src={company.logo} alt="Company Logo" className="company-logo-img" />
                            </div>
                        )}
                        <h2 className="entity-name" style={{ fontSize: '1.5rem' }}>{company.name || 'Company Name'}</h2>
                        <div className="entity-details" style={{ marginTop: '0.5rem' }}>
                            {company.details || 'Address\nDetails'}
                        </div>
                    </div>

                    <div className="invoice-title-block">
                        <h1 className="invoice-label">INVOICE</h1>
                        <div className="invoice-id"># {meta.invoiceNumber || '001'}</div>
                        <div className="invoice-id" style={{ fontSize: '1rem' }}>{meta.date}</div>
                    </div>
                </div>

                <div className="invoice-grid">
                    <div className="bill-to">
                        <div className="section-caption">Bill To</div>
                        <div className="entity-name">{billTo.name || 'Client Name'}</div>
                        <div className="entity-details">
                            {billTo.details || 'Client Address\nDetails'}
                        </div>
                    </div>
                </div>

                <table className="products-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Description</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">{formatCurrency(item.price)}</td>
                                <td className="text-right">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No items added</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="totals-section">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="total-row">
                        <span>Tax ({taxRate}%)</span>
                        <span>{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="total-row grand-total">
                        <span>Grand Total</span>
                        <span>{formatCurrency(grandTotal)}</span>
                    </div>
                </div>

                <div className="footer-notes">
                    <strong>Terms & Conditions:</strong><br />
                    Payment is due within 15 days. Thank you for your business.
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;

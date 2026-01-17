import React, { useRef } from 'react';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import TemplateSelector from './TemplateSelector';

const InvoiceEditor = ({ data, onChange, onDownload, currentTheme, onThemeSelect }) => {
    const fileInputRef = useRef(null);

    const handleCompanyChange = (field, value) => {
        onChange('company', { ...data.company, [field]: value });
    };

    const handleBillToChange = (field, value) => {
        onChange('billTo', { ...data.billTo, [field]: value });
    };

    const handleMetaChange = (field, value) => {
        onChange('meta', { ...data.meta, [field]: value });
    };

    const handleItemChange = (id, field, value) => {
        const newItems = data.items.map(item =>
            item.id === id ? { ...item, [field]: field === 'name' ? value : Number(value) } : item
        );
        onChange('items', newItems);
    };

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            name: '',
            quantity: 1,
            price: 0
        };
        onChange('items', [...data.items, newItem]);
    };

    const removeItem = (id) => {
        onChange('items', data.items.filter(item => item.id !== id));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleCompanyChange('logo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="editor-panel">
            <div className="form-section">
                <h3 className="section-title">Actions</h3>
                <button className="btn btn-primary" onClick={onDownload}>
                    <Download size={18} /> Download PDF
                </button>
            </div>

            <TemplateSelector currentTheme={currentTheme} onSelect={onThemeSelect} />

            <div className="form-section">
                <h3 className="section-title">Company Configuration</h3>
                <div className="input-group">
                    <label className="input-label">Company Logo</label>
                    <div className="upload-btn-wrapper">
                        <button className="btn btn-outline" onClick={() => fileInputRef.current.click()}>
                            <Upload size={16} /> {data.company.logo ? 'Change Logo' : 'Upload Logo'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleLogoUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label className="input-label">Company Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={data.company.name}
                        onChange={(e) => handleCompanyChange('name', e.target.value)}
                        placeholder="Your Business Name"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Address / Contact</label>
                    <textarea
                        className="form-textarea"
                        rows="3"
                        value={data.company.details}
                        onChange={(e) => handleCompanyChange('details', e.target.value)}
                        placeholder="123 Business Rd, City, Country&#10;email@example.com"
                    />
                </div>
            </div>

            <div className="form-section">
                <h3 className="section-title">Invoice Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                        <label className="input-label">Invoice Number</label>
                        <input
                            type="text"
                            className="form-input"
                            value={data.meta.invoiceNumber}
                            onChange={(e) => handleMetaChange('invoiceNumber', e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            className="form-input"
                            value={data.meta.date}
                            onChange={(e) => handleMetaChange('date', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3 className="section-title">Bill To</h3>
                <div className="input-group">
                    <label className="input-label">Client Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={data.billTo.name}
                        onChange={(e) => handleBillToChange('name', e.target.value)}
                        placeholder="Client Name"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Client Details</label>
                    <textarea
                        className="form-textarea"
                        rows="3"
                        value={data.billTo.details}
                        onChange={(e) => handleBillToChange('details', e.target.value)}
                        placeholder="Address, Email, etc."
                    />
                </div>
            </div>

            <div className="form-section">
                <h3 className="section-title">Items</h3>
                {data.items.map((item, index) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr auto', gap: '0.5rem', alignItems: 'end' }}>
                        <div className="input-group">
                            {index === 0 && <label className="input-label">Description</label>}
                            <input
                                type="text"
                                className="form-input"
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                placeholder="Product / Service"
                            />
                        </div>
                        <div className="input-group">
                            {index === 0 && <label className="input-label">Qty</label>}
                            <input
                                type="number"
                                className="form-input"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                min="1"
                            />
                        </div>
                        <div className="input-group">
                            {index === 0 && <label className="input-label">Price</label>}
                            <input
                                type="number"
                                className="form-input"
                                value={item.price}
                                onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <button
                            className="btn btn-danger"
                            style={{ marginBottom: '2px', padding: '0.625rem' }}
                            onClick={() => removeItem(item.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button className="btn btn-outline" style={{ marginTop: '0.5rem' }} onClick={addItem}>
                    <Plus size={16} /> Add Item
                </button>
            </div>

            <div className="form-section">
                <h3 className="section-title">Tax</h3>
                <div className="input-group">
                    <label className="input-label">Tax Rate (%)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={data.taxRate}
                        onChange={(e) => onChange('taxRate', Number(e.target.value))}
                        min="0"
                        step="0.1"
                    />
                </div>
            </div>
        </div>
    );
};

export default InvoiceEditor;

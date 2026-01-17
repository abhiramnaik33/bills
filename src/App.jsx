import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import InvoiceEditor from './components/InvoiceEditor';
import InvoicePreview from './components/InvoicePreview';
import './styles/main.css';

function App() {
  const [theme, setTheme] = useState('theme-standard');
  const [data, setData] = useState({
    company: {
      name: 'Business Name',
      logo: '',
      details: '123 Business Rd, Tech City\ncontact@business.com',
    },
    billTo: {
      name: 'Client Name',
      details: '456 Client St, Metro City\nclient@example.com',
    },
    meta: {
      invoiceNumber: 'INV-001',
      date: new Date().toISOString().split('T')[0],
    },
    items: [
      { id: 1, name: 'Web Development Services', quantity: 1, price: 1500 },
      { id: 2, name: 'Hosting Setup', quantity: 1, price: 200 },
    ],
    taxRate: 18,
    currency: '₹', // Enforced Currency
  });

  const handleChange = (section, value) => {
    setData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleDownloadPdf = () => {
    // Select the element to be converted
    const element = document.getElementById('invoice-preview-area');

    // Configure PDF options
    const opt = {
      margin: 0,
      filename: `Invoice-${data.meta.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">
          <FileText size={24} className="text-accent" />
          <span>BillGen</span>
        </div>
        <div className="header-actions">
          {/* Actions could go here */}
        </div>
      </header>

      <main className="main-content">
        <InvoiceEditor
          data={data}
          onChange={handleChange}
          onDownload={handleDownloadPdf}
          currentTheme={theme}
          onThemeSelect={setTheme}
        />

        <InvoicePreview
          data={data}
          id="invoice-preview-area"
          theme={theme}
        />
      </main>
    </div>
  );
}

export default App;

import React from 'react';

const themes = [
    { id: 'theme-standard', name: 'Standard', color: '#0f172a' },
    { id: 'theme-classic', name: 'Classic', color: '#000000' },
    { id: 'theme-modern-bold', name: 'Modern Bold', color: '#111111' },
    { id: 'theme-corporate', name: 'Corporate', color: '#0056b3' },
    { id: 'theme-minimal', name: 'Minimal', color: '#888888' },
    { id: 'theme-creative', name: 'Creative', color: '#8b5cf6' },
    { id: 'theme-tech', name: 'Tech', color: '#22c55e' },
    { id: 'theme-elegant', name: 'Elegant', color: '#d4af37' },
    { id: 'theme-compact', name: 'Compact', color: '#475569' },
    { id: 'theme-bold-color', name: 'Bold Color', color: '#dc2626' },
];

const TemplateSelector = ({ currentTheme, onSelect }) => {
    return (
        <div className="template-selector">
            <h3 className="section-title">Select Bill Pattern</h3>
            <div className="themes-grid">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => onSelect(theme.id)}
                        className={`theme-btn ${currentTheme === theme.id ? 'active' : ''}`}
                        style={{ '--theme-color': theme.color }}
                    >
                        <div className="theme-preview" style={{ backgroundColor: theme.color }}></div>
                        <span className="theme-name">{theme.name}</span>
                    </button>
                ))}
            </div>

            <style>{`
        .themes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .theme-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-btn:hover {
          border-color: var(--accent-color);
          background-color: var(--bg-color);
        }
        .theme-btn.active {
          border-color: var(--accent-color);
          background-color: aliceblue;
          box-shadow: 0 0 0 1px var(--accent-color);
        }
        .theme-preview {
          width: 100%;
          height: 40px;
          border-radius: var(--radius-sm);
        }
        .theme-name {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
};

export default TemplateSelector;

// src/components/debug/IconToggle.js
import React from 'react';

const IconToggle = ({ activeView, onChange }) => {
  // Define the three possible views
  const views = [
    { id: 'full', label: 'Full View', icon: '🔄' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'campaignsAndPrograms', label: 'Campaigns & Programs', icon: '📱' }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 999,
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        border: '1px solid #ddd',
        padding: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => onChange(view.id)}
          title={view.label}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeView === view.id ? '#e8f5e9' : 'transparent',
            color: activeView === view.id ? '#1A4C49' : '#666',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            outline: activeView === view.id ? '1px solid #4D9892' : 'none'
          }}
        >
          {view.icon}
        </button>
      ))}
    </div>
  );
};

export default IconToggle;
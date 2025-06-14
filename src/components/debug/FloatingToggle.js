// src/components/debug/FloatingToggle.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const FloatingToggle = ({ onViewChange, currentView }) => {
  const [portalElement, setPortalElement] = useState(null);
  
  // Set up a portal element on mount
  useEffect(() => {
    console.log('FloatingToggle mounted');
    
    // Create a div to use as our portal
    const el = document.createElement('div');
    el.setAttribute('id', 'floating-toggle-portal');
    document.body.appendChild(el);
    setPortalElement(el);
    
    // Cleanup on unmount
    return () => {
      console.log('FloatingToggle unmounting, removing portal');
      if (document.body.contains(el)) {
        document.body.removeChild(el);
      }
    };
  }, []);
  
  // If we don't have a portal yet, render nothing
  if (!portalElement) return null;
  
  // Render our toggle into the portal element
  return ReactDOM.createPortal(
    <div 
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        width: '200px',
        padding: '10px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        zIndex: 999999,
        border: '1px solid #1A4C49',
      }}
    >
      <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
        Dashboard View
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <button
          style={{
            padding: '8px',
            backgroundColor: currentView === 'mixed' ? '#e8f5e9' : '#f5f5f5',
            color: currentView === 'mixed' ? '#1A4C49' : '#666',
            border: '1px solid',
            borderColor: currentView === 'mixed' ? '#4D9892' : '#ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500
          }}
          onClick={() => onViewChange('mixed')}
        >
          Analytics Dashboard
        </button>
        
        <button
          style={{
            padding: '8px',
            backgroundColor: currentView === 'campaignsAndPrograms' ? '#e8f5e9' : '#f5f5f5',
            color: currentView === 'campaignsAndPrograms' ? '#1A4C49' : '#666',
            border: '1px solid',
            borderColor: currentView === 'campaignsAndPrograms' ? '#4D9892' : '#ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500
          }}
          onClick={() => onViewChange('campaignsAndPrograms')}
        >
          Campaigns & Programs
        </button>
      </div>
    </div>,
    portalElement
  );
};

export default FloatingToggle;
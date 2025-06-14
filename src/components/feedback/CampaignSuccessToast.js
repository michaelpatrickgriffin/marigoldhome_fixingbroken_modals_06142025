// src/components/feedback/CampaignSuccessToast.js
import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const CampaignSuccessToast = ({ message, onClose }) => {
  useEffect(() => {
    // Auto-close the toast after 5 seconds
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 1000,
      maxWidth: '90%',
      width: 'auto',
      border: `1px solid ${COLORS.green}`,
      animation: 'slideUp 0.3s ease'
    }}>
      <CheckCircle size={20} style={{ color: COLORS.green }} />
      <p style={{ margin: 0, color: COLORS.onyx, fontSize: '0.875rem' }}>
        {message || 'Campaign created successfully!'}
      </p>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          marginLeft: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={16} style={{ color: COLORS.onyxMedium }} />
      </button>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 1rem);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CampaignSuccessToast;
// src/components/common/ConstrainedModalWrapper.js
import React from 'react';

const ConstrainedModalWrapper = ({ 
  children, 
  maxWidth = '80rem', 
  centerContent = true,
  onClose
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <div 
      className="constrained-modal-overlay"
      onClick={handleBackdropClick}
    >
      <div 
        className={`constrained-modal-content ${centerContent ? 'centered' : ''}`}
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};

export default ConstrainedModalWrapper;
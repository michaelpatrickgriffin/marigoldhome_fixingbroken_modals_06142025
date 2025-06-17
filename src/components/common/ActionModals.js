// src/components/common/ActionModals.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { X, Check, Edit, Trash2, AlertTriangle, CheckCircle, Info, Clock, Zap } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { useModal } from './ModalManager';

// Action confirmation modal for recommendations
export const ActionModal = ({ 
  action, 
  program, 
  recommendation, 
  onConfirm, 
  onClose,
  // Modal system props
  isModal = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { closeModal } = useModal();

  const getActionDetails = () => {
    switch (action) {
      case 'implement':
        return {
          title: 'Implement Recommendation',
          description: 'This will create a new program based on this recommendation.',
          color: COLORS.evergreen,
          icon: Check
        };
      case 'modify':
        return {
          title: 'Modify Recommendation',
          description: 'You can customize this recommendation before implementing.',
          color: COLORS.blue,
          icon: Edit
        };
      case 'reject':
        return {
          title: 'Reject Recommendation',
          description: 'This recommendation will be marked as rejected.',
          color: COLORS.red,
          icon: Trash2
        };
      default:
        return {
          title: 'Confirm Action',
          description: 'Please confirm your action.',
          color: COLORS.onyx,
          icon: AlertTriangle
        };
    }
  };

  const actionDetails = getActionDetails();
  const IconComponent = actionDetails.icon;

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onConfirm) {
      onConfirm();
    }
    
    setIsProcessing(false);
    
    if (isModal) {
      closeModal();
    } else if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (isModal) {
      closeModal();
    } else if (onClose) {
      onClose();
    }
  };

  // Modal system automatically handles backdrop and positioning
  if (isModal) {
    return <ActionModalContent 
      actionDetails={actionDetails}
      IconComponent={IconComponent}
      recommendation={recommendation}
      program={program}
      isProcessing={isProcessing}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />;
  }

  // Legacy mode for backward compatibility
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 15000,
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          handleClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          zIndex: 15001
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ActionModalContent 
          actionDetails={actionDetails}
          IconComponent={IconComponent}
          recommendation={recommendation}
          program={program}
          isProcessing={isProcessing}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

// Reusable modal content component
const ActionModalContent = ({ 
  actionDetails, 
  IconComponent, 
  recommendation, 
  program, 
  isProcessing, 
  onConfirm, 
  onClose 
}) => (
  <div style={{ padding: '2rem' }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: `${actionDetails.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <IconComponent size={20} color={actionDetails.color} />
      </div>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
          {actionDetails.title}
        </h2>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: '0.25rem 0 0 0' }}>
          {actionDetails.description}
        </p>
      </div>
    </div>

    {/* Recommendation Details */}
    {recommendation && (
      <div style={{
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          {recommendation.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0, lineHeight: '1.4' }}>
          {recommendation.description}
        </p>
      </div>
    )}

    {/* Program Context */}
    {program && (
      <div style={{
        fontSize: '0.875rem',
        color: COLORS.onyxMedium,
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        For program: <strong>{program.title || program.name}</strong>
      </div>
    )}

    {/* Action Buttons */}
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
      <button
        onClick={onClose}
        disabled={isProcessing}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          color: COLORS.onyx,
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          opacity: isProcessing ? 0.6 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isProcessing}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: actionDetails.color,
          color: 'white',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          opacity: isProcessing ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s ease'
        }}
      >
        {isProcessing ? (
          <>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderTopColor: 'white', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            Processing...
          </>
        ) : (
          <>
            <IconComponent size={16} />
            Confirm
          </>
        )}
      </button>
    </div>
  </div>
);

// Feedback modal displayed after an action is taken
export const FeedbackModal = ({ 
  action, 
  program, 
  recommendation, 
  onClose,
  // Modal system props
  isModal = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getActionResult = () => {
    switch (action) {
      case 'implement':
        return {
          title: 'Recommendation Implemented!',
          description: 'The recommendation has been successfully implemented.',
          color: COLORS.evergreen,
          icon: CheckCircle
        };
      case 'modify':
        return {
          title: 'Changes Saved!',
          description: 'Your modifications have been saved and implemented.',
          color: COLORS.blue,
          icon: Edit
        };
      case 'reject':
        return {
          title: 'Recommendation Rejected',
          description: 'The recommendation has been marked as rejected.',
          color: COLORS.red,
          icon: Trash2
        };
      default:
        return {
          title: 'Action Completed',
          description: 'Your action has been processed successfully.',
          color: COLORS.evergreen,
          icon: CheckCircle
        };
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (isModal) {
      closeModal();
    } else if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const actionResult = getActionResult();
  const IconComponent = actionResult.icon;

  // Modal system automatically handles backdrop and positioning
  if (isModal) {
    return <FeedbackModalContent 
      actionResult={actionResult}
      IconComponent={IconComponent}
      recommendation={recommendation}
      program={program}
      onClose={handleClose}
    />;
  }

  // Legacy mode for backward compatibility
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 15000,
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          zIndex: 15001
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <FeedbackModalContent 
          actionResult={actionResult}
          IconComponent={IconComponent}
          recommendation={recommendation}
          program={program}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

// Reusable feedback modal content component
const FeedbackModalContent = ({ 
  actionResult, 
  IconComponent, 
  recommendation, 
  program, 
  onClose 
}) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    {/* Success Icon */}
    <div style={{
      width: '4rem',
      height: '4rem',
      borderRadius: '50%',
      backgroundColor: `${actionResult.color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto'
    }}>
      <IconComponent size={32} color={actionResult.color} />
    </div>

    {/* Title and Description */}
    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 1rem 0' }}>
      {actionResult.title}
    </h2>
    <p style={{ color: COLORS.onyxMedium, fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
      {actionResult.description}
    </p>

    {/* Context Information */}
    {recommendation && (
      <div style={{
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
        textAlign: 'left'
      }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.25rem' }}>
          {recommendation.title}
        </div>
        {program && (
          <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
            Program: {program.title || program.name}
          </div>
        )}
      </div>
    )}

    {/* Auto-close indicator */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: COLORS.onyxMedium,
      marginBottom: '1rem'
    }}>
      <Clock size={14} />
      This will close automatically
    </div>

    {/* Close Button */}
    <button
      onClick={onClose}
      style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        backgroundColor: actionResult.color,
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.2s ease'
      }}
    >
      Close
    </button>

    {/* CSS for spin animation */}
    <style>
      {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Quick Action Modal for simple confirmations
export const QuickActionModal = ({ 
  title, 
  message, 
  onConfirm, 
  onClose,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default', // 'default', 'danger', 'success'
  isModal = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { closeModal } = useModal();

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          color: COLORS.red,
          icon: AlertTriangle
        };
      case 'success':
        return {
          color: COLORS.evergreen,
          icon: CheckCircle
        };
      default:
        return {
          color: COLORS.blue,
          icon: Info
        };
    }
  };

  const typeConfig = getTypeConfig();
  const IconComponent = typeConfig.icon;

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    if (onConfirm) {
      await onConfirm();
    }
    
    setIsProcessing(false);
    
    if (isModal) {
      closeModal();
    } else if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (isModal) {
      closeModal();
    } else if (onClose) {
      onClose();
    }
  };

  const content = (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: `${typeConfig.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComponent size={16} color={typeConfig.color} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
          {title}
        </h2>
      </div>

      {/* Message */}
      <p style={{ 
        fontSize: '1rem', 
        color: COLORS.onyxMedium, 
        lineHeight: '1.5', 
        marginBottom: '2rem' 
      }}>
        {message}
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={handleClose}
          disabled={isProcessing}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            color: COLORS.onyx,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            opacity: isProcessing ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: typeConfig.color,
            color: 'white',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            opacity: isProcessing ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          {isProcessing ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid rgba(255,255,255,0.3)', 
                borderTopColor: 'white', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite' 
              }} />
              Processing...
            </>
          ) : (
            <>
              <IconComponent size={16} />
              {confirmText}
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Modal system automatically handles backdrop and positioning
  if (isModal) {
    return content;
  }

  // Legacy mode for backward compatibility
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 15000,
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          handleClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          zIndex: 15001
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};
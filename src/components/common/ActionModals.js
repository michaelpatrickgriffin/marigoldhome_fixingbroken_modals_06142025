// src/components/common/ActionModals.js
import React from 'react';
import { Check, Edit, X, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Action confirmation modal displayed before taking an action
export const ActionModal = ({ action, program, recommendation, onConfirm, onCancel }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  // Add escape key listener
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div>
      {/* Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100008, // ✅ FIXED: Increased from 200 to 100008 (above DetailView)
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 100009, // ✅ FIXED: Container above overlay
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: 'white'
        }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: action === 'implement' ? 'rgba(76, 175, 80, 0.1)' : 
                            action === 'modify' ? 'rgba(33, 150, 243, 0.1)' :
                            'rgba(244, 67, 54, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: action === 'implement' ? COLORS.green : 
                   action === 'modify' ? COLORS.blue : 
                   COLORS.red
          }}>
            {action === 'implement' && <CheckCircle size={20} />}
            {action === 'modify' && <Edit size={20} />}
            {action === 'reject' && <AlertTriangle size={20} />}
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: COLORS.onyx, 
              margin: 0 
            }}>
              {action === 'implement' && 'Implement Recommendation'}
              {action === 'modify' && 'Modify Recommendation'}
              {action === 'reject' && 'Reject Recommendation'}
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium, 
              margin: '0.25rem 0 0 0' 
            }}>
              {program?.title || 'Program'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '1.5rem',
          flex: 1
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: COLORS.onyx, 
              margin: '0 0 0.5rem 0' 
            }}>
              {recommendation?.title || 'Recommendation'}
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium, 
              margin: 0,
              lineHeight: 1.5
            }}>
              {recommendation?.description || 'No description available'}
            </p>
          </div>

          <p style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium, 
            margin: '0 0 1.5rem 0',
            lineHeight: 1.5
          }}>
            {action === 'implement' && 'This will create a new program based on this recommendation. You can modify the details before finalizing.'}
            {action === 'modify' && 'You can edit the recommendation details and implementation approach.'}
            {action === 'reject' && 'This recommendation will be marked as rejected and removed from active suggestions.'}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          backgroundColor: 'white'
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white',
              color: COLORS.onyxMedium,
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: action === 'implement' ? COLORS.green : 
                              action === 'modify' ? COLORS.blue : 
                              COLORS.red,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {action === 'implement' && (
              <>
                <Check size={16} />
                Implement
              </>
            )}
            {action === 'modify' && (
              <>
                <Edit size={16} />
                Save Changes
              </>
            )}
            {action === 'reject' && (
              <>
                <X size={16} />
                Reject
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Feedback modal displayed after an action is taken
export const FeedbackModal = ({ action, program, recommendation, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Add escape key listener and auto-close timer
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 3 seconds
    const timer = setTimeout(onClose, 3000);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div>
      {/* Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100010, // ✅ FIXED: Increased from 200 to 100010 (above ActionModal)
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 100011, // ✅ FIXED: Container above overlay
          overflow: 'hidden',
          padding: '2rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: action === 'implement' ? 'rgba(76, 175, 80, 0.2)' : 
                            action === 'modify' ? 'rgba(33, 150, 243, 0.2)' :
                            'rgba(244, 67, 54, 0.2)',
            color: action === 'implement' ? COLORS.green : 
                   action === 'modify' ? COLORS.blue : 
                   COLORS.red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            animation: 'pulse 1s ease-in-out'
          }}>
            {action === 'implement' && <CheckCircle size={24} />}
            {action === 'modify' && <Edit size={24} />}
            {action === 'reject' && <X size={24} />}
          </div>
          
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            margin: '0 0 0.5rem 0' 
          }}>
            {action === 'implement' && 'Recommendation Implemented!'}
            {action === 'modify' && 'Recommendation Modified!'}
            {action === 'reject' && 'Recommendation Rejected'}
          </h3>
          
          <p style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium, 
            margin: 0,
            lineHeight: 1.5
          }}>
            {action === 'implement' && `${recommendation?.title || 'The recommendation'} has been successfully implemented for ${program?.title || 'the program'}.`}
            {action === 'modify' && `Your changes to ${recommendation?.title || 'the recommendation'} have been saved.`}
            {action === 'reject' && `${recommendation?.title || 'The recommendation'} has been rejected and removed from suggestions.`}
          </p>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: COLORS.onyxMedium, 
            margin: 0,
            textAlign: 'center'
          }}>
            {action === 'implement' && 'You can view and manage the new program in your dashboard.'}
            {action === 'modify' && 'The updated recommendation is now available.'}
            {action === 'reject' && 'This action has been logged and won\'t affect other recommendations.'}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: COLORS.evergreen,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#155a56';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = COLORS.evergreen;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Add pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
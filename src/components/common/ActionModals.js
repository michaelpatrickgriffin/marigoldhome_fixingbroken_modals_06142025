// src/components/common/ActionModals.js
import React from 'react';
import { Check, X, Edit, ThumbsUp, ThumbsDown } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Action Modal for implementing, modifying, or rejecting recommendations
export const ActionModal = ({ action, program, recommendation, onClose, onConfirm }) => {
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
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 201,
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: action === 'implement' ? 'rgba(76, 175, 80, 0.05)' : 
                           action === 'modify' ? 'rgba(33, 150, 243, 0.05)' : 
                           'rgba(244, 67, 54, 0.05)'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: COLORS.onyx,
            display: 'flex',
            alignItems: 'center'
          }}>
            {action === 'implement' && (
              <Check size={20} style={{ color: COLORS.green, marginRight: '0.75rem' }} />
            )}
            {action === 'modify' && (
              <Edit size={20} style={{ color: COLORS.blue, marginRight: '0.75rem' }} />
            )}
            {action === 'reject' && (
              <X size={20} style={{ color: COLORS.red, marginRight: '0.75rem' }} />
            )}
            
            {action === 'implement' ? 'Implement Recommendation' : 
             action === 'modify' ? 'Modify Recommendation' : 
             'Reject Recommendation'}
          </h2>
          <button 
            onClick={onClose}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              color: COLORS.onyxMedium,
              transition: 'background 0.2s'
            }}
            className="hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
              Program
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
              {program.title}
            </p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
              Recommendation
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              {recommendation.title}
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
              {recommendation.description}
            </p>
          </div>
          
          {action === 'implement' && (
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.5rem', fontWeight: 500 }}>
                This will apply the recommended changes to the program immediately.
              </p>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                You can revert this action later if needed.
              </p>
            </div>
          )}
          
          {action === 'modify' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                Modifications
              </p>
              <textarea 
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  minHeight: '100px',
                  fontSize: '0.875rem'
                }}
                placeholder="Describe your modifications to this recommendation..."
              ></textarea>
            </div>
          )}
          
          {action === 'reject' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                Reason for Rejection
              </p>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <input type="radio" name="rejection-reason" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>Not relevant to our goals</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>This recommendation doesn't align with our current objectives</p>
                  </div>
                </label>
                
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <input type="radio" name="rejection-reason" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>Too resource intensive</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>We don't have the resources to implement this right now</p>
                  </div>
                </label>
                
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}>
                  <input type="radio" name="rejection-reason" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>Other reason</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Specify a different reason for rejection</p>
                  </div>
                </label>
              </div>
              
              <textarea 
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  minHeight: '60px',
                  fontSize: '0.875rem'
                }}
                placeholder="Additional comments (optional)..."
              ></textarea>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.15)',
              color: COLORS.onyxMedium,
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.375rem',
              backgroundColor: action === 'implement' ? COLORS.green : 
                              action === 'modify' ? COLORS.blue : 
                              COLORS.red,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {action === 'implement' && (
              <>
                <Check size={16} style={{ marginRight: '0.25rem' }} />
                Implement
              </>
            )}
            {action === 'modify' && (
              <>
                <Edit size={16} style={{ marginRight: '0.25rem' }} />
                Save Changes
              </>
            )}
            {action === 'reject' && (
              <>
                <X size={16} style={{ marginRight: '0.25rem' }} />
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
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 201,
          overflow: 'hidden',
          padding: '2rem'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: action === 'implement' ? 'rgba(76, 175, 80, 0.2)' : 
                            action === 'modify' ? 'rgba(33, 150, 243, 0.2)' : 
                            'rgba(244, 67, 54, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            {action === 'implement' && (
              <Check size={24} style={{ color: COLORS.green }} />
            )}
            {action === 'modify' && (
              <Edit size={24} style={{ color: COLORS.blue }} />
            )}
            {action === 'reject' && (
              <X size={24} style={{ color: COLORS.red }} />
            )}
          </div>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            {action === 'implement' ? 'Recommendation Implemented' : 
             action === 'modify' ? 'Recommendation Modified' : 
             'Recommendation Rejected'}
          </h2>
          
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
            {action === 'implement' ? 'The recommendation has been successfully implemented.' : 
             action === 'modify' ? 'Your changes to the recommendation have been saved.' : 
             'The recommendation has been rejected and won\'t be shown again.'}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.03)',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
            Program
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
            {program.title}
          </p>
          
          <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
            Recommendation
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
            {recommendation.title}
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '1rem' }}>
            Was this recommendation helpful?
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              color: COLORS.green,
              borderRadius: '0.375rem',
              fontWeight: 500,
              gap: '0.5rem'
            }}>
              <ThumbsUp size={16} />
              Yes
            </button>
            
            <button style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              color: COLORS.red,
              borderRadius: '0.375rem',
              fontWeight: 500,
              gap: '0.5rem'
            }}>
              <ThumbsDown size={16} />
              No
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
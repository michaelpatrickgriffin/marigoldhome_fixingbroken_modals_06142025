// src/components/common/AIResponseModal.js - FIXED MODAL Z-INDEX ISSUES
import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, Copy, RefreshCw, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const AIResponseModal = ({ 
  isOpen, 
  onClose, 
  response, 
  question, 
  onClearResponse,
  onPromptClick 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsMaximized(false);
      setIsCopied(false);
      setFeedback(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (response?.content) {
      try {
        await navigator.clipboard.writeText(response.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Handle feedback
  const handleFeedback = (type) => {
    setFeedback(type);
    // Here you would typically send feedback to your analytics service
    console.log(`AI Response feedback: ${type}`, { question, response });
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Generate follow-up questions based on response
  const getFollowUpQuestions = () => {
    if (!response?.followUpQuestions) {
      return [
        "How can I implement these recommendations?",
        "What would be the expected impact?",
        "Are there any risks I should consider?",
        "What's the best way to measure success?"
      ];
    }
    return response.followUpQuestions;
  };

  if (!isOpen || !response) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 20100, // FIXED: Use AI response modal z-index from standards
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMaximized ? '0' : '2rem',
        backdropFilter: 'blur(4px)'
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        style={{
          width: isMaximized ? '100%' : 'min(90vw, 800px)',
          height: isMaximized ? '100%' : 'min(85vh, 600px)',
          backgroundColor: 'white',
          borderRadius: isMaximized ? '0' : '1rem',
          boxShadow: isMaximized 
            ? 'none' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 20101, // FIXED: Above the backdrop
          transform: isMaximized ? 'none' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 20102 // FIXED: Above modal content
        }}>
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: COLORS.evergreen,
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                AI
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                AI Response
              </h3>
            </div>
            {question && (
              <p style={{ 
                fontSize: '0.875rem', 
                color: COLORS.onyxMedium, 
                margin: 0,
                fontStyle: 'italic'
              }}>
                "{question}"
              </p>
            )}
          </div>

          {/* Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              title="Copy Response"
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: isCopied ? COLORS.evergreen : COLORS.onyxMedium,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isCopied) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCopied) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Copy size={16} />
            </button>

            <button
              title={isMaximized ? "Restore" : "Maximize"}
              onClick={() => setIsMaximized(!isMaximized)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: COLORS.onyxMedium,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              title="Close"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: COLORS.onyxMedium,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.target.style.color = '#ef4444';
                e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = COLORS.onyxMedium;
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa'
          }}
        >
          {/* AI Response Content */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: COLORS.onyx,
              whiteSpace: 'pre-wrap'
            }}>
              {response.content}
            </div>
          </div>

          {/* Key Insights */}
          {response.insights && response.insights.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: COLORS.onyx,
                marginBottom: '1rem'
              }}>
                Key Insights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {response.insights.map((insight, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: `${COLORS.evergreen}08`,
                    borderRadius: '0.5rem',
                    borderLeft: `3px solid ${COLORS.evergreen}`
                  }}>
                    <div style={{
                      minWidth: '1.5rem',
                      height: '1.5rem',
                      backgroundColor: COLORS.evergreen,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      marginTop: '0.125rem'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyx,
                      lineHeight: 1.5
                    }}>
                      {insight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up Questions */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: COLORS.onyx,
              marginBottom: '1rem'
            }}>
              Follow-up Questions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {getFollowUpQuestions().map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onPromptClick(question);
                    onClose();
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'transparent',
                    border: `1px solid ${COLORS.evergreen}30`,
                    borderRadius: '0.5rem',
                    color: COLORS.evergreen,
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = `${COLORS.evergreen}10`;
                    e.target.style.borderColor = `${COLORS.evergreen}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = `${COLORS.evergreen}30`;
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 20102 // FIXED: Above modal content
        }}>
          {/* Feedback Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginRight: '0.5rem' }}>
              Was this helpful?
            </span>
            <button
              onClick={() => handleFeedback('positive')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: feedback === 'positive' ? `${COLORS.evergreen}20` : 'none',
                border: `1px solid ${feedback === 'positive' ? COLORS.evergreen : 'rgba(0, 0, 0, 0.1)'}`,
                color: feedback === 'positive' ? COLORS.evergreen : COLORS.onyxMedium,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (feedback !== 'positive') {
                  e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                  e.target.style.color = '#22c55e';
                }
              }}
              onMouseLeave={(e) => {
                if (feedback !== 'positive') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = COLORS.onyxMedium;
                }
              }}
            >
              <ThumbsUp size={14} />
            </button>
            <button
              onClick={() => handleFeedback('negative')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: feedback === 'negative' ? 'rgba(239, 68, 68, 0.1)' : 'none',
                border: `1px solid ${feedback === 'negative' ? '#ef4444' : 'rgba(0, 0, 0, 0.1)'}`,
                color: feedback === 'negative' ? '#ef4444' : COLORS.onyxMedium,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (feedback !== 'negative') {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.target.style.color = '#ef4444';
                }
              }}
              onMouseLeave={(e) => {
                if (feedback !== 'negative') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = COLORS.onyxMedium;
                }
              }}
            >
              <ThumbsDown size={14} />
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClearResponse}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: COLORS.onyxMedium,
                border: `1px solid rgba(0, 0, 0, 0.1)`,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Ask Another Question
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: COLORS.evergreen,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e5b57';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.evergreen;
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Copy Success Toast */}
      {isCopied && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 20103, // FIXED: Above the modal
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <Copy size={16} />
          Response copied to clipboard!
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AIResponseModal;
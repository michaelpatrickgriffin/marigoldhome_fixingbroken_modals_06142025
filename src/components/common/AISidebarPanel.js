// src/components/common/AISidebarPanel.js
import React, { useEffect } from 'react';
import { X, Bot, CheckCircle, TrendingUp, ChevronRight, ArrowUpRight, Loader, Sparkles } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const AISidebarPanel = ({ 
  isOpen, 
  onClose, 
  response, 
  question, 
  onClearResponse, 
  onPromptClick,
  onRecommendationImplement
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const highlightKeywords = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const keywords = [
      'revenue', 'sales', 'growth', 'customer', 'engagement', 'ROI', 'conversion', 
      'retention', 'Summit tier', 'Explorer tier', 'redemption', 'open rate', 
      'benchmark', 'loyalty', 'program', 'campaign', 'Champions', 'At Risk', 
      'Loyal Customers', 'Potential Loyalists', "Can't Lose", 'Trail Essentials',
      'Adventure Gear', 'Winter Gear', 'Spring Newsletter'
    ];
    
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, `<strong style="color: ${COLORS.evergreen}; font-weight: 600;">${keyword}</strong>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  if (!isOpen) return null;

  // Show loading state if response is not ready
  const isLoading = !response || response.loading;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 250,
          backdropFilter: 'blur(2px)'
        }}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '600px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 251,
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.03) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(26, 76, 73, 0.1)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.evergreen
            }}>
              {isLoading ? <Loader size={20} className="animate-spin" /> : <Bot size={20} />}
            </div>
            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: COLORS.onyx,
                margin: 0
              }}>
                {isLoading ? 'AI Assistant Thinking...' : 'AI Marketing Insights'}
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: COLORS.onyxMedium,
                margin: 0
              }}>
                {isLoading ? 'Analyzing your data...' : 'Analysis and recommendations'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'none',
              border: 'none',
              color: COLORS.onyxMedium,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0'
        }}>
          {/* Question Display */}
          {question && (
            <div style={{
              margin: '1.5rem',
              backgroundColor: 'rgba(26, 76, 73, 0.05)',
              borderRadius: '0.75rem',
              padding: '1rem',
              borderLeft: `3px solid ${COLORS.evergreen}`
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: COLORS.onyxMedium,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.5rem'
              }}>
                Your Question:
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: COLORS.onyx,
                fontWeight: 500
              }}>
                {question}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(26, 76, 73, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.evergreen,
                marginBottom: '1.5rem',
                animation: 'pulse 2s infinite'
              }}>
                <Bot size={40} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: COLORS.onyx,
                margin: '0 0 0.5rem 0'
              }}>
                Analyzing your marketing data...
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: COLORS.onyxMedium,
                margin: 0
              }}>
                This will just take a moment while I generate insights and recommendations.
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1.5rem'
              }}>
                <div className="loading-dot" style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: COLORS.evergreen,
                  borderRadius: '50%',
                  animation: 'loading-bounce 1.4s infinite ease-in-out'
                }}></div>
                <div className="loading-dot" style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: COLORS.evergreen,
                  borderRadius: '50%',
                  animation: 'loading-bounce 1.4s infinite ease-in-out',
                  animationDelay: '-0.16s'
                }}></div>
                <div className="loading-dot" style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: COLORS.evergreen,
                  borderRadius: '50%',
                  animation: 'loading-bounce 1.4s infinite ease-in-out',
                  animationDelay: '0s'
                }}></div>
              </div>
            </div>
          )}

          {/* AI Response */}
          {!isLoading && response && (
            <>
              {/* Direct Answer */}
              {response.directAnswer && (
                <div style={{
                  margin: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.04) 100%)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  borderLeft: `3px solid ${COLORS.green}`
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.green,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle size={14} />
                    Key Insight:
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: COLORS.onyx,
                    fontWeight: 500,
                    lineHeight: 1.6
                  }}>
                    {highlightKeywords(response.directAnswer)}
                  </div>
                </div>
              )}

              {/* Detailed Analysis */}
              {response.text && (
                <div style={{
                  margin: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: COLORS.onyx
                  }}>
                    <Bot size={16} />
                    <span>Detailed Analysis</span>
                  </div>
                  <div style={{
                    padding: '1.25rem',
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    lineHeight: 1.6
                  }}>
                    {highlightKeywords(response.text)}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {response.recommendations && response.recommendations.length > 0 && (
                <div style={{
                  margin: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(76, 175, 80, 0.05)',
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: COLORS.green
                  }}>
                    <Sparkles size={16} />
                    <span>Recommended Actions</span>
                  </div>
                  
                  {response.recommendations.map((rec, index) => (
                    <div key={index} style={{
                      padding: '1.25rem',
                      borderBottom: index < response.recommendations.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: COLORS.onyx,
                          margin: 0,
                          flex: 1,
                          minWidth: '200px'
                        }}>
                          {rec.title}
                        </h4>
                        {/* ✅ FIXED: Improved badge container with proper wrapping */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          alignItems: 'flex-end',
                          flexShrink: 0,
                          minWidth: '140px',
                          maxWidth: '140px'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            backgroundColor: rec.impact === 'high' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                            color: rec.impact === 'high' ? COLORS.green : '#FFC107',
                            whiteSpace: 'nowrap'
                          }}>
                            {rec.impact === 'high' ? <ArrowUpRight size={12} /> : <TrendingUp size={12} />}
                            {rec.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                          </span>
                          {rec.estimatedROI && (
                            <span style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              color: COLORS.blue,
                              textAlign: 'center',
                              wordBreak: 'break-word',
                              lineHeight: 1.3,
                              maxWidth: '140px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'normal'
                            }}>
                              <TrendingUp size={10} style={{ marginRight: '2px', verticalAlign: 'top' }} />
                              {rec.estimatedROI.replace('ROI: ', '').replace('+', '')}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        lineHeight: 1.6,
                        marginBottom: '1rem'
                      }}>
                        {highlightKeywords(rec.description)}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        justifyContent: 'flex-end'
                      }}>
                        <button style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                          backgroundColor: 'white',
                          color: COLORS.onyxMedium,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}>
                          View Details
                        </button>
                        <button 
                          onClick={() => onRecommendationImplement && onRecommendationImplement(rec)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            border: 'none',
                            backgroundColor: COLORS.evergreen,
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          Apply Recommendation
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Follow-up Questions */}
              {response.suggestedQuestions && response.suggestedQuestions.length > 0 && (
                <div style={{
                  margin: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: COLORS.onyx
                  }}>
                    Follow-up Questions
                  </div>
                  <div style={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {response.suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => onPromptClick && onPromptClick(question)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: 'white',
                          color: COLORS.onyx,
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.03)';
                          e.target.style.borderColor = 'rgba(26, 76, 73, 0.2)';
                          e.target.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        {question}
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            onClick={onClearResponse}
            disabled={isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              backgroundColor: 'white',
              color: COLORS.onyxMedium,
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = COLORS.evergreen;
                e.target.style.color = 'white';
                e.target.style.borderColor = COLORS.evergreen;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = COLORS.onyxMedium;
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)';
              }
            }}
          >
            {isLoading ? 'Please wait...' : 'Ask Another Question'}
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes loading-bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AISidebarPanel;
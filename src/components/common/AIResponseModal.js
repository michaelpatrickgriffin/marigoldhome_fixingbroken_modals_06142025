// src/components/common/AIResponseModal.js
import React, { useEffect } from 'react';
import { X, Bot, CheckCircle, TrendingUp, ChevronRight, ArrowUpRight, Loader } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const AIResponseModal = ({ 
  isOpen, 
  onClose, 
  response, 
  question, 
  onClearResponse, 
  onPromptClick 
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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const highlightKeywords = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const keywords = [
      'revenue', 'sales', 'growth', 'customer', 'engagement', 'ROI', 'conversion', 
      'retention', 'Summit tier', 'Explorer tier', 'redemption', 'open rate', 
      'benchmark', 'loyalty', 'program', 'campaign'
    ];
    
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, `<strong style="color: ${COLORS.evergreen}; font-weight: 600;">${keyword}</strong>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Show loading state if response is not ready
  const isLoading = !response || response.loading;

  return (
    <div className="ai-response-modal-overlay">
      <div className="ai-response-modal-container">
        {/* Header */}
        <div className="ai-response-modal-header">
          <div className="ai-response-modal-header-content">
            <div className="ai-response-modal-header-icon">
              {isLoading ? <Loader size={24} className="animate-spin" /> : <Bot size={24} />}
            </div>
            <div>
              <h2 className="ai-response-modal-title">
                {isLoading ? 'AI Assistant Thinking...' : 'AI Assistant Response'}
              </h2>
              <p className="ai-response-modal-subtitle">
                {isLoading ? 'Analyzing your data...' : 'Analysis and recommendations'}
              </p>
            </div>
          </div>
          <button 
            className="ai-response-modal-close-btn"
            onClick={onClose}
            aria-label="Close AI Response"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="ai-response-modal-content">
          {/* Question Display */}
          {question && (
            <div className="ai-response-question">
              <div className="ai-response-question-label">Your Question:</div>
              <div className="ai-response-question-text">{question}</div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="ai-response-loading">
              <div className="ai-response-loading-icon">
                <Bot size={48} />
              </div>
              <div className="ai-response-loading-text">
                <h3>Analyzing your marketing data...</h3>
                <p>This will just take a moment while I generate insights and recommendations.</p>
              </div>
              <div className="ai-response-loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            </div>
          )}

          {/* AI Response */}
          {!isLoading && response && (
            <>
              {/* Direct Answer */}
              {response.directAnswer && (
                <div className="ai-response-direct-answer">
                  <div className="ai-response-direct-answer-label">Key Insight:</div>
                  <div className="ai-response-direct-answer-text">
                    {highlightKeywords(response.directAnswer)}
                  </div>
                </div>
              )}

              {/* Detailed Analysis */}
              {response.text && (
                <div className="ai-response-analysis">
                  <div className="ai-response-analysis-header">
                    <Bot size={18} />
                    <span>Detailed Analysis</span>
                  </div>
                  <div className="ai-response-analysis-content">
                    {highlightKeywords(response.text)}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {response.recommendations && response.recommendations.length > 0 && (
                <div className="ai-response-recommendations">
                  <div className="ai-response-recommendations-header">
                    <CheckCircle size={18} />
                    <span>Recommended Actions</span>
                  </div>
                  
                  {response.recommendations.map((rec, index) => (
                    <div key={index} className="ai-response-recommendation-card">
                      <div className="ai-response-recommendation-header">
                        <h4 className="ai-response-recommendation-title">{rec.title}</h4>
                        <div className="ai-response-recommendation-badges">
                          <span className={`ai-response-impact-badge ${rec.impact}`}>
                            {rec.impact === 'high' ? (
                              <ArrowUpRight size={12} />
                            ) : (
                              <TrendingUp size={12} />
                            )}
                            {rec.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                          </span>
                          {rec.estimatedROI && (
                            <span className="ai-response-roi-badge">
                              <TrendingUp size={12} />
                              ROI: {rec.estimatedROI}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="ai-response-recommendation-description">
                        {highlightKeywords(rec.description)}
                      </p>
                      
                      <div className="ai-response-recommendation-actions">
                        <button className="ai-response-recommendation-btn-secondary">
                          View Details
                        </button>
                        <button className="ai-response-recommendation-btn-primary">
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
                <div className="ai-response-followup">
                  <div className="ai-response-followup-header">
                    <span>Follow-up Questions</span>
                  </div>
                  <div className="ai-response-followup-list">
                    {response.suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="ai-response-followup-btn"
                        onClick={() => onPromptClick && onPromptClick(question)}
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
        <div className="ai-response-modal-footer">
          <button 
            className="ai-response-modal-clear-btn"
            onClick={onClearResponse}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Ask Another Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIResponseModal;
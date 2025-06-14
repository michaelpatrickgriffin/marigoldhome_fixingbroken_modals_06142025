// src/components/dashboard/AICopilotResponse.js
import React from 'react';
import { 
  CheckCircle, TrendingUp, Bot, ChevronRight, X, ArrowUpRight
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { aiCopilotResponseConfig } from '../../data/SampleData';

const AICopilotResponse = ({ 
  aiResponse, 
  lastQuestion, 
  handleClearResponse, 
  highlightKeywords
}) => {
  // Import configuration from centralized data
  const {
    header,
    questionDisplay,
    responseContainer,
    recommendations,
    buttons,
    animations
  } = aiCopilotResponseConfig;

  if (!aiResponse) return null;

  // Get icon components based on configuration
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'CheckCircle': return CheckCircle;
      case 'ChevronRight': return ChevronRight;
      case 'ArrowUpRight': return ArrowUpRight;
      case 'TrendingUp': return TrendingUp;
      default: return CheckCircle;
    }
  };

  return (
    <div className="ai-response">
      {/* Response Header with Clear Button */}
      <div className="response-header">
        <h3 className="response-title">
          <Bot size={18} color={COLORS.evergreen} />
          {header.title}
        </h3>
        
        <button
          className="clear-button"
          onClick={handleClearResponse}
        >
          <X size={14} style={{ marginRight: '0.5rem' }} />
          {header.clearButtonText}
        </button>
      </div>
      
      {/* Question that was asked */}
      {lastQuestion && (
        <div 
          className="question-display"
          style={questionDisplay.styling}
        >
          <div style={{ minWidth: '1.5rem' }}>{questionDisplay.prefix}</div>
          <div>{lastQuestion}</div>
        </div>
      )}
      
      {/* Response Content */}
      <div className="response-content">
        <div className="response-icon">
          <Bot size={responseContainer.botIconSize} />
        </div>
        <div 
          className="response-text"
          style={{
            padding: responseContainer.padding,
            borderRadius: responseContainer.borderRadius,
            border: responseContainer.border,
            boxShadow: responseContainer.boxShadow,
            width: `calc(100% - ${responseContainer.containerSpacing})`
          }}
        >
          <div className="response-pattern"></div>
          {highlightKeywords(aiResponse.text)}
        </div>
      </div>
      
      {/* Recommendations from AI */}
      {aiResponse.recommendations && aiResponse.recommendations.length > 0 && (
        <div className="recommendations">
          <h4 
            className="recommendations-title"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {React.createElement(
              getIconComponent(recommendations.titleIcon), 
              { size: recommendations.titleIconSize, color: COLORS.evergreen }
            )}
            {recommendations.title}
          </h4>
          
          {aiResponse.recommendations.map((rec, idx) => {
            const impactConfig = recommendations.impactColors[rec.impact] || recommendations.impactColors.medium;
            const ImpactIcon = getIconComponent(impactConfig.icon);
            const ROIIcon = getIconComponent(recommendations.roiColors.icon);
            
            return (
              <div 
                key={idx} 
                className={`recommendation-card ${rec.impact}-impact`}
                style={{ 
                  animation: `fadeIn ${animations.fadeInDelay}s ease-in-out ${idx * animations.staggerDelay + animations.baseDelay}s`,
                  marginBottom: recommendations.cardSpacing,
                  padding: recommendations.cardPadding,
                  borderRadius: recommendations.cardBorderRadius
                }}
              >
                <div className="recommendation-header">
                  <h5 className="recommendation-title">{rec.title}</h5>
                  
                  <div className="recommendation-tags">
                    <div 
                      className="impact-tag"
                      style={{
                        color: impactConfig.color,
                        backgroundColor: impactConfig.backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600
                      }}
                    >
                      <ImpactIcon size={14} />
                      {rec.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                    </div>
                    
                    {rec.estimatedROI && (
                      <div 
                        className="roi-tag"
                        style={{
                          color: recommendations.roiColors.color,
                          backgroundColor: recommendations.roiColors.backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.8125rem',
                          fontWeight: 600
                        }}
                      >
                        <ROIIcon size={14} />
                        ROI: {rec.estimatedROI}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="recommendation-description">
                  {highlightKeywords(rec.description)}
                </p>
                
                <div className="recommendation-actions">
                  <button 
                    className="details-button"
                    style={{
                      ...buttons.details.styling,
                      color: COLORS.evergreen,
                      borderColor: COLORS.evergreen
                    }}
                  >
                    {buttons.details.text}
                  </button>
                  <button 
                    className="apply-button"
                    style={{
                      ...buttons.apply.styling,
                      background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {buttons.apply.text}
                    {React.createElement(
                      getIconComponent(buttons.apply.icon), 
                      { 
                        size: buttons.apply.iconSize, 
                        style: { marginLeft: '0.25rem' } 
                      }
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AICopilotResponse;
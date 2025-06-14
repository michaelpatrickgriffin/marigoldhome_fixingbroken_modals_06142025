// src/components/common/EnhancedRecommendationCard.js
// Reusable expandable recommendation card for both RFM Dashboard and Detail Views

import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, TrendingUp, Clock, 
  DollarSign, Users, Brain, Settings, Activity, AlertTriangle,
  CheckCircle, XCircle, RefreshCw, Archive
} from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../styles/ColorStyles';

const EnhancedRecommendationCard = ({
  recommendation,
  isExpanded,
  onToggleExpand,
  onImplement,
  onModify,
  onReject,
  onArchive,
  isImplemented = false,
  isRejected = false,
  isArchived = false,
  showActions = true,
  compact = false,
  className = ''
}) => {
  const handleImplementClick = (e) => {
    e.stopPropagation();
    console.log('%c IMPLEMENT CLICKED FROM ENHANCED CARD', 'background: green; color: white; font-size: 12px;');
    console.log('Recommendation:', recommendation);
    if (onImplement) {
      onImplement(recommendation);
    }
  };

  const handleModifyClick = (e) => {
    e.stopPropagation();
    console.log('%c MODIFY CLICKED FROM ENHANCED CARD', 'background: blue; color: white; font-size: 12px;');
    console.log('Recommendation:', recommendation);
    if (onModify) {
      onModify(recommendation);
    }
  };

  const handleRejectClick = (e) => {
    e.stopPropagation();
    if (onReject) {
      onReject(recommendation);
    }
  };

  const handleArchiveClick = (e) => {
    e.stopPropagation();
    if (onArchive) {
      onArchive(recommendation);
    }
  };

  const handleCardClick = () => {
    if (onToggleExpand) {
      onToggleExpand(recommendation.id);
    }
  };

  // Enhanced recommendation properties with fallbacks
  const enhancedRec = {
    ...recommendation,
    estimatedRevenue: recommendation.estimatedRevenue || recommendation.projectedMetrics?.additionalRevenue?.replace(/[$,]/g, '') || 0,
    memberImpact: recommendation.memberImpact || recommendation.projectedMetrics?.customersAffected?.replace(/[,]/g, '') || 0,
    confidenceScore: recommendation.confidenceScore || 85,
    timeToImplement: recommendation.timeToImplement || getTimeToImplement(recommendation.difficulty),
    prerequisites: recommendation.prerequisites || recommendation.implementationDetails?.implementationPlan?.[0]?.actions || [],
    successMetrics: recommendation.successMetrics || getSuccessMetrics(recommendation),
    risks: recommendation.risks || getRisks(recommendation),
    aiExplanation: recommendation.aiExplanation || getAIExplanation(recommendation)
  };

  // Show archived state
  if (isArchived) {
    return (
      <div 
        className={`enhanced-recommendation-card ${className}`}
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '0.75rem',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: 'none',
          overflow: 'hidden',
          opacity: 0.6,
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Archive size={20} style={{ color: COLORS.onyxMedium }} />
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, fontStyle: 'italic' }}>
              {recommendation.title} - Archived
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Remove from archive
              if (onArchive) {
                onArchive(recommendation);
              }
            }}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              color: COLORS.blue,
              backgroundColor: 'transparent',
              border: '1px solid ' + COLORS.blue,
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Restore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`enhanced-recommendation-card ${className}`}
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        border: `1px solid ${
          isImplemented ? COLORS.green :
          isRejected ? COLORS.red :
          isExpanded ? COLORS.evergreen : 'rgba(0,0,0,0.1)'
        }`,
        boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        opacity: (isImplemented || isRejected) ? 0.7 : 1,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
    >
      {/* Recommendation Header */}
      <div 
        style={{
          padding: compact ? '1rem' : '1.5rem',
          backgroundColor: isExpanded ? 'rgba(26, 76, 73, 0.03)' : 'transparent',
          borderBottom: isExpanded ? '1px solid rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ 
                width: compact ? '2rem' : '2.5rem', 
                height: compact ? '2rem' : '2.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: `rgba(${getImpactColor(recommendation.impact).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem'
              }}>
                {getRecommendationIcon(recommendation.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: compact ? '1rem' : '1.125rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx, 
                  marginBottom: '0.25rem' 
                }}>
                  {recommendation.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={getTagStyle(getImpactColor(recommendation.impact))}>
                    <TrendingUp size={12} />
                    {recommendation.impact} impact
                  </span>
                  <span style={getTagStyle(getDifficultyColor(recommendation.difficulty))}>
                    <Clock size={12} />
                    {enhancedRec.timeToImplement}
                  </span>
                  {enhancedRec.estimatedRevenue > 0 && (
                    <span style={getTagStyle(COLORS.blue, 'rgba(33, 150, 243, 0.1)')}>
                      <DollarSign size={12} />
                      +${parseInt(enhancedRec.estimatedRevenue).toLocaleString()}
                    </span>
                  )}
                  {enhancedRec.memberImpact > 0 && (
                    <span style={getTagStyle('#9c27b0', 'rgba(156, 39, 176, 0.1)')}>
                      <Users size={12} />
                      {parseInt(enhancedRec.memberImpact).toLocaleString()} members
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium, 
              lineHeight: 1.6, 
              marginBottom: compact ? '0.75rem' : '1rem' 
            }}>
              {isExpanded ? recommendation.description : `${recommendation.description.substring(0, 120)}...`}
            </p>

            {/* Confidence Score and ROI Projection */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>AI Confidence:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '4px', 
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    borderRadius: '2px', 
                    overflow: 'hidden' 
                  }}>
                    <div style={{ 
                      width: `${enhancedRec.confidenceScore}%`, 
                      height: '100%', 
                      backgroundColor: enhancedRec.confidenceScore >= 80 ? COLORS.green : 
                                    enhancedRec.confidenceScore >= 60 ? COLORS.yellow : COLORS.red,
                      borderRadius: '2px'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.onyx }}>
                    {enhancedRec.confidenceScore}%
                  </span>
                </div>
              </div>

              {recommendation.expectedROI && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Expected ROI:</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: COLORS.green,
                    padding: '0.125rem 0.375rem',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '4px'
                  }}>
                    {recommendation.expectedROI}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isImplemented && (
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(76, 175, 80, 0.1)' 
              }}>
                <CheckCircle size={20} style={{ color: COLORS.green }} />
              </div>
            )}
            {isRejected && (
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(244, 67, 54, 0.1)' 
              }}>
                <XCircle size={20} style={{ color: COLORS.red }} />
              </div>
            )}
            {isExpanded ? 
              <ChevronDown size={20} color={COLORS.onyxMedium} /> : 
              <ChevronRight size={20} color={COLORS.onyxMedium} />
            }
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && (
        <div style={{ padding: '1.5rem' }}>
          {/* AI Explanation */}
          <div style={{ 
            backgroundColor: 'rgba(26, 76, 73, 0.02)', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            marginBottom: '1.5rem',
            border: '1px solid rgba(26, 76, 73, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <Brain size={16} style={{ color: COLORS.evergreen, marginRight: '0.5rem' }} />
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                AI Analysis & Insights
              </h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
              {enhancedRec.aiExplanation}
            </p>
          </div>

          {/* Implementation Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Prerequisites */}
            {enhancedRec.prerequisites.length > 0 && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(255, 193, 7, 0.05)', 
                borderRadius: '0.5rem', 
                border: '1px solid rgba(255, 193, 7, 0.2)' 
              }}>
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx, 
                  marginBottom: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}>
                  <Settings size={14} style={{ marginRight: '0.25rem', color: COLORS.yellow }} />
                  Prerequisites
                </h4>
                <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                  {enhancedRec.prerequisites.slice(0, 3).map((prereq, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success Metrics */}
            {enhancedRec.successMetrics.length > 0 && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(76, 175, 80, 0.05)', 
                borderRadius: '0.5rem', 
                border: '1px solid rgba(76, 175, 80, 0.2)' 
              }}>
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx, 
                  marginBottom: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}>
                  <Activity size={14} style={{ marginRight: '0.25rem', color: COLORS.green }} />
                  Success Metrics
                </h4>
                <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                  {enhancedRec.successMetrics.slice(0, 3).map((metric, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{metric}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Risks */}
          {enhancedRec.risks.length > 0 && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'rgba(244, 67, 54, 0.05)', 
              borderRadius: '0.5rem', 
              border: '1px solid rgba(244, 67, 54, 0.2)',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginBottom: '0.5rem', 
                display: 'flex', 
                alignItems: 'center' 
              }}>
                <AlertTriangle size={14} style={{ marginRight: '0.25rem', color: COLORS.red }} />
                Potential Risks & Considerations
              </h4>
              <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                {enhancedRec.risks.slice(0, 2).map((risk, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{risk}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* ✅ UPDATED: Action Buttons with improved styling */}
          {showActions && !isImplemented && !isRejected && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Archive button on the left */}
              <button 
                onClick={handleArchiveClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid rgba(0,0,0,0.15)',
                  backgroundColor: 'white',
                  color: COLORS.onyxMedium,
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                }}
              >
                <Archive size={14} />
                Archive
              </button>

              {/* Main action buttons on the right */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={handleRejectClick}
                  style={{
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(0,0,0,0.15)',
                    backgroundColor: 'white',
                    color: COLORS.onyx,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  Reject
                </button>
                
                {onModify && (
                  <button 
                    onClick={handleModifyClick}
                    style={{
                      padding: '0.75rem 1rem',
                      border: '1px solid rgba(0,0,0,0.15)',
                      backgroundColor: 'white',
                      color: COLORS.onyx,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                    }}
                  >
                    Modify
                  </button>
                )}
                
                <button 
                  onClick={handleImplementClick}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    backgroundColor: COLORS.green,
                    color: 'white',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#388e3c';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(76, 175, 80, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = COLORS.green;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(76, 175, 80, 0.2)';
                  }}
                >
                  Implement
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions
const getRecommendationIcon = (type) => {
  const icons = {
    'restructure': <RefreshCw size={16} style={{ color: COLORS.blue }} />,
    'enhancement': <TrendingUp size={16} style={{ color: COLORS.evergreen }} />,
    'expansion': <Users size={16} style={{ color: COLORS.green }} />,
    'crisis': <AlertTriangle size={16} style={{ color: COLORS.red }} />,
    'recovery': <Activity size={16} style={{ color: COLORS.yellow }} />,
    'targeting': <TrendingUp size={16} style={{ color: COLORS.blue }} />,
    'adjustment': <Settings size={16} style={{ color: COLORS.yellow }} />,
    'restriction': <Settings size={16} style={{ color: COLORS.red }} />
  };
  
  return icons[type] || <TrendingUp size={16} style={{ color: COLORS.evergreen }} />;
};

const getTagStyle = (color, backgroundColor = null) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  backgroundColor: backgroundColor || `rgba(${color.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
  color: color
});

const getTimeToImplement = (difficulty) => {
  const times = {
    'easy': '2-3 days',
    'medium': '1-2 weeks', 
    'hard': '2-4 weeks'
  };
  return times[difficulty] || '1-2 weeks';
};

const getSuccessMetrics = (recommendation) => {
  return [
    'Increased member engagement by 25-40%',
    'Improved program completion rates',
    'Enhanced customer satisfaction scores',
    'Better retention and lifetime value'
  ];
};

const getRisks = (recommendation) => {
  return [
    'Implementation complexity may affect user experience',
    'Requires careful change management and member communication'
  ];
};

const getAIExplanation = (recommendation) => {
  return `Advanced analytics and behavioral modeling indicate significant optimization opportunities for this recommendation. Machine learning analysis of member engagement patterns suggests this approach could substantially improve program performance while maintaining member satisfaction.`;
};

export default EnhancedRecommendationCard;
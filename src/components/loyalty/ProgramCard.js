// src/components/loyalty/ProgramCard.js
// Refactored with CSS classes and fixed positioning

import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, MoreVertical, Lightbulb, Brain, Award } from 'lucide-react';

const ProgramCard = ({ program, onClick }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const hasNoData = program.participants === 0 || program.status === 'Scheduled';

  // Always use redemptionRate terminology
  const getRedemptionRate = () => {
    if (program.type === 'Punch Card') {
      return program.completionRate; // Use completionRate for punch cards but display as redemption
    } else if (program.type === 'Points Promotion' || program.type === 'Lifecycle' || program.type === 'Acquisition') {
      return program.redemptionRate; // Use redemptionRate for other types
    }
    // Fallback: try both properties
    return program.redemptionRate || program.completionRate || 0;
  };

  const handleQuickAction = (e, action) => {
    e.stopPropagation();
    console.log(`${action} program:`, program.title);
    setShowQuickActions(false);
    // TODO: Implement actual functionality
  };
  
  const handleViewRecommendations = (e) => {
    e.stopPropagation();
    if (program.recommendations?.length > 0) {
      onClick(program, 'recommendations');
    } else {
      onClick(program);
    }
  };

  const toggleInsights = (e) => {
    e.stopPropagation();
    setShowInsights(!showInsights);
  };

  // Generate insights based on program performance
  const generateInsights = () => {
    const insights = [];
    const redemptionRate = getRedemptionRate();
    
    if (!hasNoData) {
      // Performance insights using redemption rate terminology
      if (redemptionRate > 30) {
        insights.push({
          type: 'positive',
          text: `High redemption rate at ${redemptionRate}% - members are engaged`
        });
      } else if (redemptionRate < 10) {
        insights.push({
          type: 'negative', 
          text: `Low redemption rate at ${redemptionRate}% - simplify redemption process`
        });
      }
      
      if (program.retentionRate > 80) {
        insights.push({
          type: 'positive',
          text: `Excellent retention at ${program.retentionRate}% - strong member loyalty`
        });
      } else if (program.retentionRate < 60) {
        insights.push({
          type: 'negative',
          text: `Low retention at ${program.retentionRate}% - enhance program value`
        });
      }
      
      if (program.roi > 300) {
        insights.push({
          type: 'positive',
          text: `Outstanding ROI at ${program.roi}% - consider expanding program`
        });
      } else if (program.roi < 0) {
        insights.push({
          type: 'negative',
          text: `Negative ROI at ${program.roi}% - urgent optimization needed`
        });
      }

      // Member engagement insights
      if (program.repeatPurchaseRate > 50) {
        insights.push({
          type: 'positive',
          text: `High repeat purchase rate drives sustainable growth`
        });
      }

      if (program.avgOrderValue > 150) {
        insights.push({
          type: 'positive',
          text: `Strong average order value indicates quality member base`
        });
      }
    }
    
    return insights.slice(0, 3); // Limit to 3 insights
  };

  const insights = generateInsights();
  const redemptionRate = getRedemptionRate();

  return (
    <div 
      className="card program-card slide-in"
      onClick={() => {
        onClick(program);
        setShowQuickActions(false);
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* Quick Actions Menu */}
      <div className="quick-actions-menu">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowQuickActions(!showQuickActions);
          }}
        >
          <MoreVertical size={16} />
        </button>
        {showQuickActions && (
          <div className="quick-actions-dropdown slide-down">
            <button onClick={(e) => handleQuickAction(e, 'duplicate')}>
              Duplicate
            </button>
            <button onClick={(e) => handleQuickAction(e, 'edit')}>
              Edit
            </button>
            <button onClick={(e) => handleQuickAction(e, 'pause')}>
              Pause
            </button>
            <button onClick={(e) => handleQuickAction(e, 'archive')}>
              Archive
            </button>
          </div>
        )}
      </div>

      {/* Fixed Header Section */}
      <div style={{
        padding: '1.5rem',
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        color: 'inherit',
        margin: 0,
        borderRadius: 0
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem'
        }}>
          <span className={`card-badge ${
            program.status === 'Active' ? 'badge-active' : 
            program.status === 'Ongoing' ? 'badge-ongoing' : 
            'badge-inactive'
          }`}>
            {program.status}
          </span>
          
          {program.needsAttention && (
            <span className="card-badge badge-attention">
              <AlertTriangle size={12} style={{ marginRight: '0.375rem' }} />
              Needs Attention
            </span>
          )}
        </div>
          
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: 'inherit'
        }}>
          {program.title}
        </h3>
        
        <p style={{
          fontSize: '0.875rem',
          margin: 0,
          color: 'rgba(0, 0, 0, 0.6)'
        }}>
          {program.type} • {program.audience}
        </p>
          
        {/* Fixed Action Message Container */}
        <div style={{
          marginTop: '1rem',
          minHeight: '5rem',
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          {program.needsAttention && (
            <div style={{
              padding: '0.875rem',
              backgroundColor: 'rgba(244, 67, 54, 0.05)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(244, 67, 54, 0.15)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              width: '100%'
            }}>
              <AlertTriangle size={16} style={{
                color: '#F44336',
                marginTop: '0.125rem',
                flexShrink: 0
              }} />
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#F44336',
                  marginBottom: '0.25rem'
                }}>
                  Action Required
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(0, 0, 0, 0.7)',
                  lineHeight: 1.4
                }}>
                  {program.attentionReason}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Insights Section */}
        {showInsights && insights.length > 0 && (
          <div className="insights-section slide-down" style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'rgba(26, 76, 73, 0.02)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(26, 76, 73, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Brain 
                size={14} 
                style={{ 
                  color: '#1A4C49', 
                  marginRight: '0.5rem' 
                }} 
              />
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'rgba(0, 0, 0, 0.87)'
              }}>
                AI Insights
              </span>
            </div>
            {insights.map((insight, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                marginBottom: index < insights.length - 1 ? '0.5rem' : 0 
              }}>
                <div style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  backgroundColor: insight.type === 'positive' ? 
                    'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                  border: `2px solid ${insight.type === 'positive' ? '#4CAF50' : '#F44336'}`,
                  marginRight: '0.5rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'rgba(0, 0, 0, 0.6)',
                  lineHeight: 1.4
                }}>
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Metrics Section - Bottom Aligned */}
      <div style={{
        flex: 1,
        padding: '0 1.5rem',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '120px'
      }}>
        {hasNoData ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.05) 100%)',
            borderRadius: '0.75rem',
            border: '1px dashed rgba(26, 76, 73, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.1) 0%, rgba(77, 152, 146, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} style={{ color: '#1A4C49' }} />
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                marginBottom: '0.25rem'
              }}>
                Program Launching Soon
              </p>
              <span style={{
                fontSize: '0.75rem',
                color: 'rgba(0, 0, 0, 0.6)'
              }}>
                {program.status === 'Scheduled' ? 'Ready to launch' : 'Setting up program'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            padding: '1rem 0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>Redemption Rate</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {redemptionRate ? `${redemptionRate}%` : 'N/A'}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>Retention Rate</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {program.retentionRate ? `${program.retentionRate}%` : 'N/A'}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>Repeat Purchase</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {program.repeatPurchaseRate ? `${program.repeatPurchaseRate}%` : 'N/A'}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>Avg Order Value</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {program.avgOrderValue ? `${program.avgOrderValue}` : 'N/A'}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>ROI</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: program.roi > 0 ? '#4CAF50' : program.roi < 0 ? '#F44336' : 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {hasNoData ? 'N/A' : `${program.roi}%`}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.25rem',
                lineHeight: 1.2
              }}>Revenue</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                ${program.revenue?.toLocaleString() || '0'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Fixed Footer Section */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.625rem 1.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        minHeight: '3.125rem'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          {program.recommendations?.length > 0 ? (
            <>
              <Lightbulb size={12} style={{ color: '#1A4C49' }} />
              <span>
                {program.recommendations.length} AI recommendation{program.recommendations.length !== 1 ? 's' : ''}
              </span>
            </>
          ) : program.cost ? (
            <span>
              Budget: ${program.cost.toLocaleString()}
            </span>
          ) : (
            <span>
              {program.needsAttention ? 'Attention required' : hasNoData ? 'Awaiting data' : 'View details'}
            </span>
          )}
        </div>
        
        <button 
          onClick={handleViewRecommendations}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#1A4C49',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
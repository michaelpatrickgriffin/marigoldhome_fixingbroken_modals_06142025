// src/components/campaigns/CampaignCard.js
// Updated to match ProgramCard layout and structure

import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, MoreVertical, Lightbulb, Brain, Mail } from 'lucide-react';
import '../../styles/CardStyles.css'; // ✅ ADDED: Import card styles

const CampaignCard = ({ campaign, onClick }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const hasNoData = campaign.sent === 0 || campaign.status === 'Scheduled';

  const handleQuickAction = (e, action) => {
    e.stopPropagation();
    console.log(`${action} campaign:`, campaign.title);
    setShowQuickActions(false);
    // TODO: Implement actual functionality
  };
  
  const handleViewRecommendations = (e) => {
    e.stopPropagation();
    if (campaign.recommendations?.length > 0) {
      onClick(campaign, 'recommendations');
    } else {
      onClick(campaign);
    }
  };

  const toggleInsights = (e) => {
    e.stopPropagation();
    setShowInsights(!showInsights);
  };

  // Generate insights based on campaign performance
  const generateInsights = () => {
    const insights = [];
    
    if (!hasNoData) {
      const openRate = Math.round((campaign.opened / campaign.sent) * 100);
      const clickRate = Math.round((campaign.conversion / campaign.opened) * 100);
      const conversionRate = Math.round((campaign.conversion / campaign.sent) * 100);
      
      // Performance insights
      if (openRate > 25) {
        insights.push({
          type: 'positive',
          text: `Strong open rate at ${openRate}% (above industry average)`
        });
      } else if (openRate < 15) {
        insights.push({
          type: 'negative',
          text: `Low open rate at ${openRate}% - consider improving subject line`
        });
      }
      
      if (clickRate > 15) {
        insights.push({
          type: 'positive',
          text: `Good click-through rate at ${clickRate}%`
        });
      } else if (clickRate < 5) {
        insights.push({
          type: 'negative', 
          text: `Low click-through rate at ${clickRate}% - review content and CTAs`
        });
      }
      
      if (campaign.roi > 300) {
        insights.push({
          type: 'positive',
          text: `Excellent ROI at ${campaign.roi}% - consider scaling similar campaigns`
        });
      } else if (campaign.roi < 50) {
        insights.push({
          type: 'negative',
          text: `ROI needs improvement at ${campaign.roi}%`
        });
      }
    }
    
    return insights.slice(0, 2); // Limit to top 2 insights
  };

  const insights = generateInsights();

  return (
    <div 
      className="card"
      onClick={() => onClick(campaign)}
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
          style={{
            zIndex: 10
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

      {/* Fixed Header Section - SAME as Program Card */}
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
            campaign.status === 'Active' ? 'badge-active' : 
            campaign.status === 'Scheduled' ? 'badge-scheduled' : 
            'badge-draft'
          }`}>
            {campaign.status}
          </span>
          
          {campaign.needsAttention && (
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
          {campaign.title}
        </h3>
        
        <p style={{
          fontSize: '0.875rem',
          margin: 0,
          color: 'rgba(0, 0, 0, 0.6)'
        }}>
          {campaign.type} • {campaign.audience}
        </p>
          
        {/* ✅ FIXED: Action Message Container with fallback text */}
        <div style={{
          marginTop: '1rem',
          minHeight: '5rem',
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          {campaign.needsAttention && (
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
                  {campaign.attentionReason || 'This campaign needs immediate attention - optimization required'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Insights Section */}
        {insights.length > 0 && (
          <div style={{
            marginTop: 'auto',
            paddingTop: '1rem'
          }}>
            <button
              onClick={toggleInsights}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                color: 'rgba(0, 0, 0, 0.6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                width: '100%',
                justifyContent: 'flex-start'
              }}
            >
              <Brain size={14} style={{ color: '#1A4C49' }} />
              <span>AI Insights</span>
              <ArrowRight 
                size={12} 
                style={{ 
                  color: 'rgba(0, 0, 0, 0.4)',
                  transform: showInsights ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }} 
              />
            </button>
            
            {showInsights && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(26, 76, 73, 0.1)'
              }}>
                {insights.map((insight, index) => (
                  <div key={index} style={{
                    fontSize: '0.75rem',
                    color: insight.type === 'positive' ? '#4CAF50' : '#F44336',
                    marginBottom: index < insights.length - 1 ? '0.5rem' : 0,
                    lineHeight: 1.4
                  }}>
                    • {insight.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Performance Metrics Section */}
      <div style={{ 
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        padding: '1rem 1.5rem 0.75rem'
      }}>
        {hasNoData ? (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem 0',
            color: 'rgba(0, 0, 0, 0.6)'
          }}>
            <Mail size={24} style={{ 
              marginBottom: '0.5rem',
              color: 'rgba(0, 0, 0, 0.3)'
            }} />
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '0.25rem'
            }}>
              {campaign.status === 'Scheduled' ? 
                'Scheduled to launch soon' : 'Ready to send'}
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
              }}>Sent</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {campaign.sent ? campaign.sent.toLocaleString() : 'N/A'}
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
              }}>Opens</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {campaign.opened ? campaign.opened.toLocaleString() : 'N/A'}
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
              }}>Conversions</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                {campaign.conversion ? campaign.conversion.toLocaleString() : 'N/A'}
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
                ${campaign.revenue ? campaign.revenue.toLocaleString() : '0'}
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
                color: campaign.roi >= 100 ? '#4CAF50' : campaign.roi >= 50 ? '#FF9800' : '#F44336',
                lineHeight: 1.2
              }}>
                {campaign.roi}%
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
              }}>Cost</div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.87)',
                lineHeight: 1.2
              }}>
                ${campaign.cost ? campaign.cost.toLocaleString() : '0'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Fixed Footer Section - SAME as Program Card */}
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
          {campaign.recommendations?.length > 0 ? (
            <>
              <Lightbulb size={12} style={{ color: '#1A4C49' }} />
              <span>
                {campaign.recommendations.length} AI recommendation{campaign.recommendations.length !== 1 ? 's' : ''}
              </span>
            </>
          ) : campaign.cost ? (
            <span>
              Budget: ${campaign.cost.toLocaleString()}
            </span>
          ) : (
            <span>
              {campaign.needsAttention ? 'Attention required' : hasNoData ? 'Awaiting data' : 'View details'}
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

export default CampaignCard;
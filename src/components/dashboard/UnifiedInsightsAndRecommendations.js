// src/components/dashboard/UnifiedInsightsAndRecommendations.js
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, Info, ArrowUpRight, ChevronRight, 
  Target, Users, TrendingUp, Star, Award, Sparkles, RefreshCw, Check
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import EnhancedRecommendationCard from '../common/EnhancedRecommendationCard';
// ✅ FIXED: Import loyalty program data to find programs by ID
import { loyaltyProgramData as initialLoyaltyProgramData } from '../../data/SampleData';

// ===== CENTRALIZED INSIGHTS AND RECOMMENDATIONS COMPONENT =====
const UnifiedInsightsAndRecommendations = ({ 
  insightsData, 
  recommendationsData = [],
  onProgramClick, 
  onCampaignClick,
  onSegmentClick, // ✅ NEW: Separate prop for RFM segment navigation
  onImplementRecommendation,
  onModifyRecommendation,
  onRejectRecommendation,
  variant = 'standard' // 'standard' or 'rfm'
}) => {
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  
  // ✅ UPDATED: Session-only state management (no localStorage persistence)
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  const [archivedRecommendations, setArchivedRecommendations] = useState(new Set());

  // ✅ ADD: CSS for spin animation
  const spinKeyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  // Add the keyframes to the document head if not already added
  useEffect(() => {
    const styleId = 'unified-insights-spin-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = spinKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  // ✅ UPDATED: Helper to get minimalist insight type styling with subtle differentiation
  const getInsightTypeStyle = (type, severity = 'medium') => {
    const baseStyles = {
      attention: { 
        accentColor: '#FF8C00', 
        icon: AlertTriangle,
        borderAccent: 'rgba(255, 140, 0, 0.2)'
      },
      positive: { 
        accentColor: '#059669', 
        icon: CheckCircle,
        borderAccent: 'rgba(5, 150, 105, 0.2)'
      },
      neutral: { 
        accentColor: '#6B7280', 
        icon: Info,
        borderAccent: 'rgba(107, 114, 128, 0.2)'
      },
      negative: { 
        accentColor: '#DC2626', 
        icon: AlertTriangle,
        borderAccent: 'rgba(220, 38, 38, 0.2)'
      },
      opportunity: { 
        accentColor: '#FF9800', 
        icon: Target,
        borderAccent: 'rgba(255, 152, 0, 0.2)'
      }
    };
    
    return baseStyles[type] || baseStyles.neutral;
  };

  // Helper to handle insight clicks
  const handleInsightClick = (insight) => {
    console.log('Insight clicked:', insight);
    
    // ✅ FIXED: Handle program navigation for programs
    if (insight.programId && onProgramClick) {
      // Find the program by ID from the loyalty program data
      const program = initialLoyaltyProgramData.find(p => p.id === insight.programId);
      if (program) {
        console.log('Navigating to program:', program.title);
        // Navigate to program detail with recommendations tab if it's an action item
        const initialTab = insight.action === 'View Program Details' ? 'recommendations' : 'overview';
        onProgramClick(program, initialTab);
      } else {
        console.warn('Program not found for ID:', insight.programId);
      }
    } 
    // ✅ FIXED: Handle segment navigation for RFM segments
    else if (insight.action === 'View Segment Details' && variant === 'rfm' && onSegmentClick) {
      // Extract segment name for RFM navigation - handle both "segment" and "customers" patterns
      const segmentMatch = insight.text.match(/(\w+(?:\s+\w+)*)\s+(?:segment|customers)/i);
      if (segmentMatch && segmentMatch[1]) {
        console.log('Navigating to segment:', segmentMatch[1]);
        onSegmentClick(segmentMatch[1]); // This will trigger segment detail view
      }
    }
  };

  // Helper to handle recommendation actions
  const handleRecommendationImplement = (rec) => {
    console.log('Implement clicked for:', rec.id);
    if (onImplementRecommendation) {
      onImplementRecommendation(rec);
    }
    // ✅ UPDATED: Mark as implemented in session state
    const newImplemented = new Set([...implementedRecommendations, rec.id]);
    setImplementedRecommendations(newImplemented);
  };

  const handleRecommendationModify = (rec) => {
    console.log('Modify clicked for:', rec.id);
    if (onModifyRecommendation) {
      onModifyRecommendation(rec);
    }
    // ✅ UPDATED: Mark as implemented after modification
    const newImplemented = new Set([...implementedRecommendations, rec.id]);
    setImplementedRecommendations(newImplemented);
  };

  const handleRecommendationReject = (rec) => {
    console.log('Reject clicked for:', rec.id);
    if (onRejectRecommendation) {
      onRejectRecommendation(rec);
    }
    // ✅ UPDATED: Mark as rejected in session state
    const newRejected = new Set([...rejectedRecommendations, rec.id]);
    setRejectedRecommendations(newRejected);
  };

  // ✅ NEW: Handle archive action
  const handleRecommendationArchive = (rec) => {
    console.log('Archive clicked for:', rec.id);
    const newArchived = new Set([...archivedRecommendations, rec.id]);
    setArchivedRecommendations(newArchived);
  };

  // ✅ NEW: Reset all recommendations to initial state
  const handleResetRecommendations = () => {
    setImplementedRecommendations(new Set());
    setRejectedRecommendations(new Set());
    setArchivedRecommendations(new Set());
    setExpandedRecommendation(null);
    setBulkActionLoading(false);
  };

  // ✅ UPDATED: Bulk actions for RFM variant
  const handleBulkAction = async (action) => {
    if (variant !== 'rfm') return;
    
    setBulkActionLoading(true);
    
    for (const rec of activeRecommendations) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      if (action === 'implement') {
        handleRecommendationImplement(rec);
      } else if (action === 'reject') {
        handleRecommendationReject(rec);
      }
    }
    
    setBulkActionLoading(false);
  };

  const handleToggleExpand = (recommendationId) => {
    setExpandedRecommendation(expandedRecommendation === recommendationId ? null : recommendationId);
  };

  // ✅ UPDATED: Calculate summary metrics for RFM variant (exclude archived)
  const activeRecommendations = variant === 'rfm' 
    ? recommendationsData.filter(rec => 
        !implementedRecommendations.has(rec.id) && 
        !rejectedRecommendations.has(rec.id) && 
        !archivedRecommendations.has(rec.id)
      )
    : recommendationsData.filter(rec => !archivedRecommendations.has(rec.id));
    
  const totalPotentialRevenue = activeRecommendations.reduce((sum, rec) => sum + (rec.estimatedRevenue || 0), 0);
  const totalMemberImpact = activeRecommendations.reduce((sum, rec) => sum + (rec.memberImpact || 0), 0);

  // Sort recommendations to put punch card ones first (using activeRecommendations for RFM, all for standard)
  const sortedRecommendations = [...(variant === 'rfm' ? recommendationsData : recommendationsData)]
    .filter(rec => !archivedRecommendations.has(rec.id))
    .sort((a, b) => {
      const aPunchCard = a.title?.toLowerCase().includes('punch card') || a.type === 'punch_card' || false;
      const bPunchCard = b.title?.toLowerCase().includes('punch card') || b.type === 'punch_card' || false;
      
      if (aPunchCard && !bPunchCard) return -1;
      if (!aPunchCard && bPunchCard) return 1;
      
      // Secondary sort by priority
      const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
      const aPriority = priorityOrder[a.priority] || 1;
      const bPriority = priorityOrder[b.priority] || 1;
      
      return aPriority - bPriority;
    });

  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      marginBottom: '2rem'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem 2rem 1rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.01) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Sparkles size={20} style={{ color: COLORS.onyx, marginRight: '0.75rem' }} />
            <div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginBottom: '0.25rem',
                letterSpacing: '-0.01em'
              }}>
                Insights & Recommendations
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: COLORS.onyxMedium,
                margin: 0,
                fontWeight: 400
              }}>
                {variant === 'rfm' ? 'RFM segment optimization opportunities' : 'Performance insights and optimization opportunities'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ UPDATED: Insights Section - Clean Cards with Badge Differentiation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem',
        padding: '1.5rem 2rem'
      }}>
        {insightsData.performanceInsights?.map((insight, i) => {
          const typeStyle = getInsightTypeStyle(insight.type, insight.severity);
          const IconComponent = typeStyle.icon;
          
          // Determine if this insight needs a priority badge
          const needsBadge = insight.type === 'attention' || insight.type === 'negative' || insight.severity === 'high';
          const badgeText = insight.type === 'attention' ? 'Needs Attention' : 
                           insight.type === 'negative' ? 'Critical' : 
                           insight.type === 'positive' ? 'Success' : null;
          
          // NEW: Check for underperforming segment chip
          const hasUnderperformingChip = insight.segmentType === 'underperforming';
          
          return (
            <div 
              key={i}
              style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '0.875rem',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                cursor: insight.programId || insight.action ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onClick={() => handleInsightClick(insight)}
              onMouseEnter={(e) => {
                if (insight.programId || insight.action) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (insight.programId || insight.action) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                }
              }}
            >
              {/* Header with badges */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '0.5rem',
                  backgroundColor: `${typeStyle.accentColor}08`,
                  flexShrink: 0
                }}>
                  <IconComponent size={18} style={{ 
                    color: typeStyle.accentColor
                  }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  {badgeText && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.625rem',
                      backgroundColor: typeStyle.accentColor,
                      color: 'white',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.025em',
                      textTransform: 'uppercase'
                    }}>
                      {badgeText}
                    </div>
                  )}
                  
                  {/* NEW: Underperforming Segment Chip */}
                  {hasUnderperformingChip && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.625rem',
                      backgroundColor: 'rgba(255, 152, 0, 0.1)',
                      color: '#FF9800',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.025em',
                      textTransform: 'uppercase'
                    }}>
                      Underperforming Segment
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div style={{ marginBottom: '1rem' }}>
                <p style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#1F2937',
                  lineHeight: 1.5,
                  margin: '0 0 0.625rem 0',
                  letterSpacing: '-0.01em',
                  paddingRight: hasUnderperformingChip || badgeText ? '0' : '0'
                }}>
                  {insight.text}
                </p>
                
                {insight.impact && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 400
                  }}>
                    {insight.impact}
                  </p>
                )}
              </div>
              
              {/* Action button */}
              {(insight.programId || insight.action) && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '0.5rem',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.875rem',
                  color: '#475569',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}>
                  {insight.action || 'View Details'}
                  <ChevronRight size={14} style={{ marginLeft: '0.5rem' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recommendations Section - Full Width */}
      {recommendationsData.length > 0 && (
        <>
          <div style={{
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            margin: '0 2rem'
          }} />
          
          <div style={{ padding: '1.5rem 2rem 0.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <Award size={16} style={{ color: COLORS.onyxMedium, marginRight: '0.5rem' }} />
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: COLORS.onyx,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.025em'
              }}>
                Priority Recommendations
              </h4>
            </div>
          </div>

          {/* ✅ FIXED: Bulk Actions Summary Panel (shows when recommendations exist, not just active ones) */}
          {variant === 'rfm' && recommendationsData.length > 0 && (
            <div style={{
              margin: '0 2rem 1.5rem',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.05) 100%)',
              border: '1px solid rgba(26, 76, 73, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Sparkles size={24} style={{ color: COLORS.evergreen, marginRight: '0.75rem' }} />
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                      RFM Segment Optimization
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                      AI-powered insights for customer segment enhancement
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.evergreen, marginBottom: '0.25rem' }}>
                      {activeRecommendations.length}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Active</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669', marginBottom: '0.25rem' }}>
                      ${totalPotentialRevenue.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Revenue Potential</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.blue, marginBottom: '0.25rem' }}>
                      {totalMemberImpact.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Members Affected</p>
                  </div>
                </div>
              </div>

              {/* ✅ UPDATED: Bulk Actions with Reset Option */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                    Bulk Actions:
                  </span>
                  {activeRecommendations.length > 0 ? (
                    <button
                      onClick={() => handleBulkAction('implement')}
                      disabled={bulkActionLoading}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        backgroundColor: '#059669',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: bulkActionLoading ? 'not-allowed' : 'pointer',
                        opacity: bulkActionLoading ? 0.7 : 1,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!bulkActionLoading) {
                          e.target.style.backgroundColor = '#047857';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!bulkActionLoading) {
                          e.target.style.backgroundColor = '#059669';
                        }
                      }}
                    >
                      {bulkActionLoading ? (
                        <RefreshCw 
                          size={14} 
                          style={{ 
                            animation: 'spin 1s linear infinite',
                            transformOrigin: 'center'
                          }} 
                        />
                      ) : (
                        <Check size={14} />
                      )}
                      Implement All ({activeRecommendations.length})
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, fontStyle: 'italic' }}>
                        All recommendations completed
                      </span>
                    </div>
                  )}
                  
                  {/* ✅ NEW: Subtle Reset Button */}
                  <button
                    onClick={handleResetRecommendations}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: '1px solid rgba(0,0,0,0.1)',
                      backgroundColor: 'transparent',
                      color: COLORS.onyxMedium,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <RefreshCw size={14} />
                    Reset
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.5rem 1rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                  borderRadius: '0.375rem' 
                }}>
                  <Award size={16} style={{ color: COLORS.evergreen }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                    RFM Health: 
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#059669' }}>
                    Strong
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div style={{ padding: '0 2rem 2rem' }}>            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sortedRecommendations.map((recommendation) => (
                <EnhancedRecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  isExpanded={expandedRecommendation === recommendation.id}
                  onToggleExpand={handleToggleExpand}
                  onImplement={handleRecommendationImplement}
                  onModify={handleRecommendationModify}
                  onReject={handleRecommendationReject}
                  onArchive={handleRecommendationArchive}
                  isImplemented={implementedRecommendations.has(recommendation.id)}
                  isRejected={rejectedRecommendations.has(recommendation.id)}
                  isArchived={archivedRecommendations.has(recommendation.id)}
                  showActions={true}
                  compact={false}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UnifiedInsightsAndRecommendations;
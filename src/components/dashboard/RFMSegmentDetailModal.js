// src/components/dashboard/RFMSegmentDetailModal.js - Updated for Modal System
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Users, TrendingUp, TrendingDown, Target, DollarSign, Calendar, ShoppingCart, Zap, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle, Clock, Star, Gift, Percent } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { rfmDetailData } from '../../data/RFMAnalyticsData';
import { rfmSegments } from '../../data/RFMAnalyticsData';

const RFMSegmentDetailModal = ({ 
  segment,
  isOpen,
  onClose,
  comparisonPeriod = 'last_30_days',
  onNextSegment,
  onPrevSegment,
  onImplementRecommendation,
  // New modal system props
  onNavigate,
  onGoBack,
  currentView = 'main',
  viewData = {},
  canGoBack = false,
  modalId,
  isModal = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  // Get segment data
  const segmentData = rfmDetailData[segment] || rfmDetailData['Champions'];
  
  // Handle backdrop click for legacy mode
  const handleBackdropClick = (e) => {
    if (!isModal && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key for legacy mode
  useEffect(() => {
    const handleEscape = (e) => {
      if (!isModal && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (!isModal && isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, isModal]);

  // Handle segment navigation
  const handleNextSegment = () => {
    if (onNextSegment) {
      setIsAnimating(true);
      setTimeout(() => {
        onNextSegment();
        setIsAnimating(false);
      }, 150);
    } else if (onNavigate) {
      // Find next segment
      const currentIndex = rfmSegments.findIndex(s => s.toLowerCase() === segment.toLowerCase());
      const nextIndex = (currentIndex + 1) % rfmSegments.length;
      const nextSegment = rfmSegments[nextIndex];
      onNavigate('main', { segment: nextSegment });
    }
  };

  const handlePrevSegment = () => {
    if (onPrevSegment) {
      setIsAnimating(true);
      setTimeout(() => {
        onPrevSegment();
        setIsAnimating(false);
      }, 150);
    } else if (onNavigate) {
      // Find previous segment
      const currentIndex = rfmSegments.findIndex(s => s.toLowerCase() === segment.toLowerCase());
      const prevIndex = (currentIndex - 1 + rfmSegments.length) % rfmSegments.length;
      const prevSegment = rfmSegments[prevIndex];
      onNavigate('main', { segment: prevSegment });
    }
  };

  // Handle recommendation actions
  const handleImplementRecommendation = (recommendation) => {
    if (onImplementRecommendation) {
      onImplementRecommendation(recommendation);
    } else if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'implement',
        segment,
        segmentData
      });
    }
  };

  const handleModifyRecommendation = (recommendation) => {
    if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'modify',
        segment,
        segmentData
      });
    }
  };

  const handleRejectRecommendation = (recommendation) => {
    if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'reject',
        segment,
        segmentData
      });
    }
  };

  // Handle drill-down navigation
  const handleDrillDown = (type, data) => {
    if (onNavigate) {
      onNavigate('drill-down', {
        type,
        data,
        segment,
        segmentData
      });
    }
  };

  // Render different views based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'implementation':
        return (
          <RecommendationImplementationView
            recommendation={viewData.recommendation}
            action={viewData.action}
            segment={viewData.segment}
            segmentData={viewData.segmentData}
            onComplete={() => onNavigate('main')}
            onCancel={() => onNavigate('main')}
          />
        );
      case 'drill-down':
        return (
          <DrillDownView
            type={viewData.type}
            data={viewData.data}
            segment={viewData.segment}
            segmentData={viewData.segmentData}
            onGoBack={() => onNavigate('main')}
          />
        );
      default:
        return renderMainView();
    }
  };

  // Main view content
  const renderMainView = () => (
    <>
      {/* Custom Header for Modal System */}
      {isModal && (
        <div style={{ 
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <div style={{ 
            maxWidth: '80rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevSegment}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  color: COLORS.onyxMedium,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginRight: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Segment Title */}
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  color: COLORS.onyx, 
                  margin: '0 0 0.5rem 0'
                }}>
                  {segment} Segment
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={16} color={COLORS.onyxMedium} />
                    <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                      {segmentData.customerCount?.toLocaleString()} customers
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={16} color={COLORS.onyxMedium} />
                    <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                      {segmentData.revenueContribution}% of revenue
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleNextSegment}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  color: COLORS.onyxMedium,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginLeft: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                background: 'none',
                border: 'none',
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
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div style={{
        padding: '0 1.5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '80rem',
          width: '100%',
          display: 'flex',
          gap: '2rem'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: Users },
            { id: 'behavior', label: 'Behavior Analysis', icon: TrendingUp },
            { id: 'recommendations', label: 'Recommendations', icon: Target }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                  color: activeTab === tab.id ? COLORS.evergreen : COLORS.onyxMedium,
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        padding: '2rem 1.5rem',
        backgroundColor: '#fafbfc'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {activeTab === 'overview' && (
            <OverviewTab 
              segmentData={segmentData} 
              segment={segment}
              onDrillDown={handleDrillDown}
            />
          )}
          {activeTab === 'behavior' && (
            <BehaviorTab 
              segmentData={segmentData} 
              segment={segment}
              onDrillDown={handleDrillDown}
            />
          )}
          {activeTab === 'recommendations' && (
            <RecommendationsTab 
              segmentData={segmentData}
              segment={segment}
              onImplement={handleImplementRecommendation}
              onModify={handleModifyRecommendation}
              onReject={handleRejectRecommendation}
            />
          )}
        </div>
      </div>
    </>
  );

  // For legacy mode (when not using modal system)
  if (!isModal) {
    if (!isOpen) return null;
    
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 15150,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: isAnimating ? 0.7 : 1,
            transition: 'opacity 0.15s ease-in-out'
          }}
          onClick={e => e.stopPropagation()}
        >
          {renderMainView()}
        </div>
      </div>
    );
  }

  // For modal system mode
  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {renderCurrentView()}
    </div>
  );
};

// Tab Components
const OverviewTab = ({ segmentData, segment, onDrillDown }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
    {/* Key Metrics Cards */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
        Key Metrics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Average Order Value</span>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
            ${segmentData.averageOrderValue}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Purchase Frequency</span>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
            {segmentData.purchaseFrequency}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Last Purchase</span>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
            {segmentData.lastPurchase}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDrillDown('metrics', segmentData)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        View Details
      </button>
    </div>

    {/* Segment Characteristics */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
        Segment Characteristics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {segmentData.characteristics?.map((char, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} color={COLORS.evergreen} />
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>{char}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BehaviorTab = ({ segmentData, segment, onDrillDown }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
        Purchase Patterns
      </h3>
      <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        {segmentData.behaviorInsights}
      </p>
      <button
        onClick={() => onDrillDown('behavior', segmentData)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        Analyze Behavior
      </button>
    </div>
  </div>
);

const RecommendationsTab = ({ segmentData, segment, onImplement, onModify, onReject }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {segmentData.recommendations?.map((rec, index) => (
      <div key={index} style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            {rec.title}
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: '1.5' }}>
            {rec.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => onImplement(rec)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: COLORS.evergreen,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Implement
          </button>
          <button
            onClick={() => onModify(rec)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: COLORS.blue,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Modify
          </button>
          <button
            onClick={() => onReject(rec)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: COLORS.red,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Reject
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Recommendation Implementation View
const RecommendationImplementationView = ({ 
  recommendation, 
  action, 
  segment, 
  segmentData, 
  onComplete, 
  onCancel 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);
    setTimeout(() => onComplete(), 2000);
  };

  if (isComplete) {
    return (
      <div style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <CheckCircle size={48} color={COLORS.evergreen} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: '1rem 0' }}>
          Recommendation {action === 'implement' ? 'Implemented' : action === 'modify' ? 'Modified' : 'Rejected'}!
        </h2>
        <p style={{ color: COLORS.onyxMedium }}>
          Changes will be reflected in your {segment.toLowerCase()} segment strategy.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(26, 76, 73, 0.05)',
          borderRadius: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            {recommendation.title}
          </h3>
          <p style={{ color: COLORS.onyxMedium, fontSize: '0.875rem' }}>
            {recommendation.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white',
              color: COLORS.onyx,
              borderRadius: '0.5rem',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.6 : 1
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: action === 'implement' ? COLORS.evergreen : 
                              action === 'modify' ? COLORS.blue : COLORS.red,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.6 : 1
            }}
          >
            {isProcessing ? 'Processing...' : 
             action === 'implement' ? 'Implement' : 
             action === 'modify' ? 'Save Changes' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Drill Down View
const DrillDownView = ({ type, data, segment, segmentData, onGoBack }) => (
  <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
        {type === 'metrics' ? 'Detailed Metrics' : 
         type === 'behavior' ? 'Behavior Analysis' : 'Drill Down'} - {segment}
      </h2>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
          Detailed analysis for {segment.toLowerCase()} segment would be displayed here.
          This could include charts, tables, and deeper insights based on the drill-down type.
        </p>
      </div>
    </div>
  </div>
);

export default RFMSegmentDetailModal;
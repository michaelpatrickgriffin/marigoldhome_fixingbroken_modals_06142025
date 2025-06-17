// src/components/common/DetailView.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { X, Settings, Users, BarChart3, Lightbulb, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, Star, Calendar, Mail, Target, Gift, Zap, Play, Pause, Edit, Trash2, ArrowLeft, ArrowUpRight, DollarSign, Percent, Clock, Award } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const DetailView = ({ 
  program, 
  onClose, 
  onImplement, 
  onModify, 
  onReject,
  initialTab = 'overview',
  onProgramCreated,
  onNotificationCreated,
  // New modal navigation props
  onNavigate,
  onGoBack,
  currentView = 'main',
  viewData = {},
  canGoBack = false,
  modalId,
  isModal = false
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update active tab when initialTab changes (for deep linking)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!program) return null;

  // Handle recommendation actions using modal navigation instead of new modals
  const handleImplementRecommendation = (recommendation) => {
    if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'implement',
        program
      });
    }
  };

  const handleModifyRecommendation = (recommendation) => {
    if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'modify',
        program
      });
    }
  };

  const handleRejectRecommendation = (recommendation) => {
    if (onNavigate) {
      onNavigate('implementation', {
        recommendation,
        action: 'reject',
        program
      });
    }
  };

  // Handle program creation from implementation view
  const handleProgramCreated = (newProgram) => {
    console.log('Program created from DetailView:', newProgram);
    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }
    // Navigate back to main view
    if (onNavigate) {
      onNavigate('main');
    }
  };

  // Handle notification creation from implementation view
  const handleNotificationCreated = (notification) => {
    console.log('Notification created from DetailView:', notification);
    if (onNotificationCreated) {
      onNotificationCreated(notification);
    }
  };

  // Handle KPI drill-downs
  const handleKpiClick = (kpi) => {
    if (onNavigate) {
      onNavigate('kpi-detail', { kpi });
    }
  };

  // Handle audience segment drill-downs
  const handleSegmentClick = (segment) => {
    if (onNavigate) {
      onNavigate('audience-segment', { segment });
    }
  };

  // Handle program editing
  const handleEditProgram = () => {
    if (onNavigate) {
      onNavigate('edit-program', { program });
    }
  };

  // Render different views based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'implementation':
        return (
          <RecommendationImplementationView
            recommendation={viewData.recommendation}
            program={viewData.program}
            action={viewData.action}
            onProgramCreated={handleProgramCreated}
            onNotificationCreated={handleNotificationCreated}
            onCancel={() => onNavigate('main')}
          />
        );
      case 'kpi-detail':
        return (
          <KpiDetailView
            kpi={viewData.kpi}
            program={program}
            onDrillDown={(subKpi) => onNavigate('kpi-breakdown', { kpi: subKpi, parentKpi: viewData.kpi })}
          />
        );
      case 'kpi-breakdown':
        return (
          <KpiBreakdownView
            kpi={viewData.kpi}
            parentKpi={viewData.parentKpi}
            program={program}
          />
        );
      case 'audience-segment':
        return (
          <AudienceSegmentView
            segment={viewData.segment}
            program={program}
            onDrillDown={(subSegment) => onNavigate('audience-detail', { segment: subSegment })}
          />
        );
      case 'audience-detail':
        return (
          <AudienceDetailView
            segment={viewData.segment}
            program={program}
          />
        );
      case 'edit-program':
        return (
          <EditProgramView
            program={viewData.program}
            onSave={(updatedProgram) => {
              if (onProgramCreated) {
                onProgramCreated(updatedProgram);
              }
              onNavigate('main');
            }}
            onCancel={() => onNavigate('main')}
          />
        );
      default:
        return renderMainView();
    }
  };

  // Main view with tabs
  const renderMainView = () => {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'performance', label: 'Performance', icon: TrendingUp },
      { id: 'audience', label: 'Audience', icon: Users },
      { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const getTabContent = () => {
      switch (activeTab) {
        case 'overview':
          return (
            <OverviewTab 
              program={program} 
              onKpiClick={handleKpiClick}
              onEditProgram={handleEditProgram}
            />
          );
        case 'performance':
          return (
            <PerformanceTab 
              program={program}
              onKpiClick={handleKpiClick}
            />
          );
        case 'audience':
          return (
            <AudienceTab 
              program={program}
              onSegmentClick={handleSegmentClick}
            />
          );
        case 'recommendations':
          return (
            <RecommendationsTab 
              program={program} 
              onImplement={handleImplementRecommendation}
              onModify={handleModifyRecommendation}
              onReject={handleRejectRecommendation}
            />
          );
        case 'settings':
          return (
            <SettingsTab 
              program={program}
              onEditProgram={handleEditProgram}
            />
          );
        default:
          return <OverviewTab program={program} onKpiClick={handleKpiClick} />;
      }
    };

    return (
      <>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          flexShrink: 0
        }}>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  color: activeTab === tab.id ? COLORS.evergreen : COLORS.onyxMedium,
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = COLORS.onyx;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = COLORS.onyxMedium;
                  }
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto',
          backgroundColor: '#fafbfc'
        }}>
          {getTabContent()}
        </div>
      </>
    );
  };

  // For legacy mode (when not using modal system)
  if (!isModal) {
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
          zIndex: 15400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          style={{
            width: '90vw',
            maxWidth: '1200px',
            height: '85vh',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 15401
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Legacy Header */}
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            position: 'relative',
            zIndex: 15402
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                {program.title || program.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: '0.25rem 0 0 0' }}>
                {program.type || 'Campaign'} Details
              </p>
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
                color: COLORS.onyxMedium,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={20} />
            </button>
          </div>
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

// Helper function to get view titles
const getViewTitle = (view, data) => {
  switch (view) {
    case 'implementation':
      return `${data.action === 'implement' ? 'Implement' : data.action === 'modify' ? 'Modify' : 'Reject'} Recommendation`;
    case 'kpi-detail':
      return `${data.kpi?.name || 'KPI'} Details`;
    case 'kpi-breakdown':
      return `${data.kpi?.name || 'KPI'} Breakdown`;
    case 'audience-segment':
      return `${data.segment?.name || 'Segment'} Analysis`;
    case 'audience-detail':
      return `${data.segment?.name || 'Segment'} Details`;
    case 'edit-program':
      return 'Edit Program';
    default:
      return 'Details';
  }
};

// Recommendation Implementation View (previously a separate modal)
const RecommendationImplementationView = ({ 
  recommendation, 
  program, 
  action, 
  onProgramCreated, 
  onNotificationCreated,
  onCancel 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [customizations, setCustomizations] = useState({});
  const [rejectionReason, setRejectionReason] = useState('');

  const handleExecuteAction = async () => {
    if (!recommendation || !action) return;

    setIsProcessing(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Execute the action
    switch (action) {
      case 'implement':
        await handleImplement();
        break;
      case 'modify':
        await handleModify();
        break;
      case 'reject':
        await handleReject();
        break;
      default:
        console.error('Unknown action:', action);
    }

    setIsProcessing(false);
    setIsComplete(true);

    // Auto-navigate back after success
    setTimeout(() => {
      onCancel();
    }, 2000);
  };

  const handleImplement = async () => {
    console.log('Implementing recommendation:', recommendation.id);
    
    // Create a new program or modify existing based on recommendation type
    if (recommendation.title.toLowerCase().includes('program')) {
      const newProgram = {
        id: `program-${Date.now()}`,
        title: recommendation.implementationDetails?.title || recommendation.title,
        type: recommendation.implementationDetails?.type || 'Loyalty Program',
        status: 'Draft',
        audience: recommendation.implementationDetails?.audience || 'All Members',
        description: recommendation.implementationDetails?.description || recommendation.description,
        createdFrom: 'recommendation',
        originalRecommendation: recommendation
      };
      
      if (onProgramCreated) {
        onProgramCreated(newProgram);
      }
    }
    
    // Always create a notification
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'success',
        title: 'Recommendation Implemented',
        message: `Successfully implemented: ${recommendation.title}`,
        timestamp: new Date().toISOString(),
        action: 'implement',
        program: program,
        recommendation: recommendation
      });
    }
  };

  const handleModify = async () => {
    console.log('Modifying recommendation:', recommendation.id, customizations);
    
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'info',
        title: 'Recommendation Modified',
        message: `Modified and implemented: ${recommendation.title}`,
        timestamp: new Date().toISOString(),
        action: 'modify',
        program: program,
        recommendation: recommendation,
        customizations: customizations
      });
    }
  };

  const handleReject = async () => {
    console.log('Rejecting recommendation:', recommendation.id, rejectionReason);
    
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'warning',
        title: 'Recommendation Rejected',
        message: `Rejected: ${recommendation.title}`,
        timestamp: new Date().toISOString(),
        action: 'reject',
        program: program,
        recommendation: recommendation,
        reason: rejectionReason
      });
    }
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
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <CheckCircle size={32} color="#4CAF50" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 1rem 0' }}>
          {action === 'implement' ? 'Recommendation Implemented!' : 
           action === 'modify' ? 'Changes Saved!' : 
           'Recommendation Rejected'}
        </h2>
        <p style={{ color: COLORS.onyxMedium, fontSize: '1rem', lineHeight: '1.5' }}>
          {action === 'implement' ? 'The recommendation has been successfully implemented and will be activated shortly.' :
           action === 'modify' ? 'Your modifications have been saved and the recommendation has been implemented.' :
           'The recommendation has been rejected and will not be implemented.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Action Summary */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(26, 76, 73, 0.05)',
          borderRadius: '1rem',
          borderLeft: `4px solid ${COLORS.evergreen}`,
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
            {recommendation.title}
          </h3>
          <p style={{ color: COLORS.onyxMedium, fontSize: '0.875rem', margin: 0 }}>
            {recommendation.description}
          </p>
        </div>

        {/* Action-specific content */}
        {action === 'modify' && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Customization Options
            </h4>
            <textarea
              placeholder="Add your modifications..."
              value={customizations.notes || ''}
              onChange={(e) => setCustomizations(prev => ({ ...prev, notes: e.target.value }))}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )}

        {action === 'reject' && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Reason for Rejection
            </h4>
            <textarea
              placeholder="Please provide a reason for rejecting this recommendation..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white',
              color: COLORS.onyx,
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              opacity: isProcessing ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleExecuteAction}
            disabled={isProcessing || (action === 'reject' && !rejectionReason.trim())}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: action === 'implement' ? COLORS.evergreen : 
                              action === 'modify' ? COLORS.blue : 
                              COLORS.red,
              color: 'white',
              cursor: (isProcessing || (action === 'reject' && !rejectionReason.trim())) ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              opacity: (isProcessing || (action === 'reject' && !rejectionReason.trim())) ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            {isProcessing ? (
              <>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid rgba(255,255,255,0.3)', 
                  borderTopColor: 'white', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }} />
                Processing...
              </>
            ) : (
              <>
                {action === 'implement' ? 'Implement' : 
                 action === 'modify' ? 'Save Changes' : 
                 'Reject'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Tab Components with enhanced functionality
const OverviewTab = ({ program, onKpiClick, onEditProgram }) => {
  const mockKpis = [
    { name: 'Revenue', value: '$125K', change: '+12%', trend: 'up' },
    { name: 'Active Members', value: '2,341', change: '+8%', trend: 'up' },
    { name: 'Engagement Rate', value: '67%', change: '+5%', trend: 'up' },
    { name: 'Avg Order Value', value: '$89', change: '-2%', trend: 'down' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
          Program Overview
        </h3>
        <button
          onClick={onEditProgram}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Edit size={16} />
          Edit Program
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {mockKpis.map((kpi, index) => (
          <div
            key={index}
            onClick={() => onKpiClick(kpi)}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, fontWeight: 500 }}>
                {kpi.name}
              </span>
              <ArrowUpRight size={16} color={COLORS.onyxMedium} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.onyx }}>
                {kpi.value}
              </span>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: 500,
                color: kpi.trend === 'up' ? COLORS.evergreen : COLORS.red 
              }}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Program Details */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
          Program Details
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.5rem' }}>
              Program Type
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
              {program.type || 'Loyalty Program'}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.5rem' }}>
              Status
            </span>
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 500, 
              color: program.status === 'Active' ? COLORS.evergreen : COLORS.amber
            }}>
              {program.status || 'Active'}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.5rem' }}>
              Target Audience
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
              {program.audience || 'All Members'}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.5rem' }}>
              Launch Date
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
              {program.launchDate || 'January 15, 2024'}
            </span>
          </div>
        </div>
        
        {program.description && (
          <div style={{ marginTop: '1.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.5rem' }}>
              Description
            </span>
            <p style={{ fontSize: '1rem', color: COLORS.onyx, lineHeight: '1.5', margin: 0 }}>
              {program.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const PerformanceTab = ({ program, onKpiClick }) => {
  const performanceMetrics = [
    { name: 'Total Revenue', value: '$125,000', change: '+12%', trend: 'up', icon: DollarSign },
    { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', trend: 'up', icon: Percent },
    { name: 'Avg Session Duration', value: '4m 32s', change: '+15%', trend: 'up', icon: Clock },
    { name: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up', icon: Award }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
        Performance Metrics
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              onClick={() => onKpiClick(metric)}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={20} color={COLORS.evergreen} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, margin: 0 }}>
                    {metric.name}
                  </h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.onyx, margin: 0 }}>
                    {metric.value}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={16} color={COLORS.evergreen} />
                <span style={{ fontSize: '0.875rem', color: COLORS.evergreen, fontWeight: 500 }}>
                  {metric.change} from last period
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AudienceTab = ({ program, onSegmentClick }) => {
  const segments = [
    { name: 'VIP Members', size: 1250, percentage: '12%', revenue: '$45K' },
    { name: 'Regular Members', size: 3400, percentage: '35%', revenue: '$65K' },
    { name: 'New Members', size: 2100, percentage: '22%', revenue: '$15K' },
    { name: 'Inactive Members', size: 1800, percentage: '18%', revenue: '$8K' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
        Audience Segments
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            onClick={() => onSegmentClick(segment)}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                {segment.name}
              </h4>
              <ChevronRight size={20} color={COLORS.onyxMedium} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                  SIZE
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                  {segment.size.toLocaleString()}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                  PERCENTAGE
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                  {segment.percentage}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                  REVENUE
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                  {segment.revenue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecommendationsTab = ({ program, onImplement, onModify, onReject }) => {
  const recommendations = [
    {
      id: 1,
      title: 'Increase Email Frequency for Engaged Segments',
      description: 'Boost engagement by sending targeted emails to your most active customer segments twice weekly instead of once.',
      impact: 'High',
      effort: 'Low',
      expectedROI: '180%'
    },
    {
      id: 2,
      title: 'Launch Personalized Reward Campaigns',
      description: 'Create tailored reward campaigns based on customer purchase history and preferences.',
      impact: 'High',
      effort: 'Medium',
      expectedROI: '250%'
    },
    {
      id: 3,
      title: 'Implement Tiered Loyalty Structure',
      description: 'Add premium tiers to your loyalty program to incentivize higher spending and engagement.',
      impact: 'Medium',
      effort: 'High',
      expectedROI: '120%'
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
        AI-Powered Recommendations
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {recommendations.map((rec) => (
          <div key={rec.id} style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                  {rec.title}
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    backgroundColor: rec.impact === 'High' ? 'rgba(76, 175, 80, 0.1)' : 
                                    rec.impact === 'Medium' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: rec.impact === 'High' ? COLORS.evergreen : 
                           rec.impact === 'Medium' ? COLORS.amber : COLORS.onyxMedium,
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}>
                    {rec.impact} Impact
                  </span>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    backgroundColor: 'rgba(0, 123, 191, 0.1)',
                    color: COLORS.blue,
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}>
                    {rec.expectedROI} ROI
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: '1.5', margin: 0 }}>
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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1A4C49';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = COLORS.evergreen;
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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#005A8B';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = COLORS.blue;
                }}
              >
                Modify
              </button>
              <button
                onClick={() => onReject(rec)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: COLORS.red,
                  border: `1px solid ${COLORS.red}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = COLORS.red;
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = COLORS.red;
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsTab = ({ program, onEditProgram }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      Program Settings
    </h3>
    
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
          Program Configuration
        </h4>
        <button
          onClick={onEditProgram}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <Settings size={16} />
          Edit Settings
        </button>
      </div>
      
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Program configuration options and advanced settings would be displayed here.
        This includes targeting rules, reward structures, communication preferences, and integration settings.
      </p>
    </div>
  </div>
);

// Placeholder components for drill-down views
const KpiDetailView = ({ kpi, program, onDrillDown }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      {kpi?.name || 'KPI'} Analysis
    </h3>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5', marginBottom: '2rem' }}>
        Detailed analytics and breakdown for {kpi?.name || 'this KPI'} would be displayed here.
        This includes trend analysis, comparison data, and actionable insights.
      </p>
      <button 
        onClick={() => onDrillDown({ name: 'Sub-metric Analysis', parentKpi: kpi })}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        Drill Down Further
      </button>
    </div>
  </div>
);

const KpiBreakdownView = ({ kpi, parentKpi, program }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      {kpi?.name || 'KPI'} Breakdown
    </h3>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Parent KPI: {parentKpi?.name || 'N/A'}
      </p>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Detailed breakdown data and sub-metrics for {kpi?.name || 'this metric'} would be displayed here.
      </p>
    </div>
  </div>
);

const AudienceSegmentView = ({ segment, program, onDrillDown }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      {segment?.name || 'Segment'} Analysis
    </h3>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5', marginBottom: '2rem' }}>
        Segment analysis and behavioral insights for {segment?.name || 'this segment'} would be displayed here.
      </p>
      <button 
        onClick={() => onDrillDown({ name: 'Detailed Demographics', parentSegment: segment })}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        View Demographics
      </button>
    </div>
  </div>
);

const AudienceDetailView = ({ segment, program }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      {segment?.name || 'Segment'} Demographics
    </h3>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Detailed demographic information and customer profiles for {segment?.name || 'this segment'} would be displayed here.
      </p>
    </div>
  </div>
);

const EditProgramView = ({ program, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: program.title || program.name || '',
    type: program.type || 'Loyalty Program',
    status: program.status || 'Active',
    audience: program.audience || 'All Members',
    description: program.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...program, ...formData });
  };

  return (
    <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
          Edit Program
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Program Name
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Program Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            >
              <option value="Loyalty Program">Loyalty Program</option>
              <option value="Rewards Program">Rewards Program</option>
              <option value="VIP Program">VIP Program</option>
              <option value="Referral Program">Referral Program</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Paused">Paused</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Target Audience
            </label>
            <input
              type="text"
              value={formData.audience}
              onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: 'white',
                color: COLORS.onyx,
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: COLORS.evergreen,
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailView;
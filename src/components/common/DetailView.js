// src/components/common/DetailView.js
// Enhanced with unified recommendation display using EnhancedRecommendationCard

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, AlertTriangle, Check, X, Edit,
  BarChart2, TrendingUp, Users, Award, Target, Zap, ChevronRight, ChevronDown, DollarSign,
  Brain, Clock, Lightbulb, CheckCircle, XCircle, AlertCircle, Settings,
  Sparkles, TrendingDown, Activity, RefreshCw, Gift, Percent, UserCheck, CreditCard, Mail, Archive
} from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../styles/ColorStyles';
import { 
  modalOverlayStyle, 
  modalHeaderStyle, 
  modalHeaderContentStyle, 
  closeButtonStyle,
  tabContainerStyle,
  tabContentStyle,
  tabButtonStyle,
  contentAreaStyle,
  contentWrapperStyle,
  cardStyle,
  alertCardStyle,
  programMetricCardStyle,
  programMetricHeaderStyle,
  programMetricIconStyle,
  programMetricLabelStyle,
  programMetricValueStyle,
  programMetricSubtextStyle,
  quickActionButtonStyle,
  statusBadgeStyle,
  recommendationCardStyle,
  recommendationHeaderStyle,
  tagStyle,
  actionButtonStyle,
  PROGRAM_CHART_COLORS,
  progressBarContainerStyle,
  progressBarStyle,
  insightBoxStyle,
  insightTitleStyle,
  insightTextStyle,
  programEnhancedCardStyle,
  programMetricEnhancedCardStyle,
  programMetricIconContainerStyle,
  programFinancialSectionStyle,
  programFinancialCardStyle,
  programFinancialIconStyle
} from '../../styles/ProgramDetailStyles';
import {
  generateProgramEngagementData,
  generateProgramTierData,
  generateProgramTimeData,
  generateProgramRetentionData,
  generateProgramPerformanceMetrics,
  generateProgramRedemptionCategories,
  generateProgramDeviceData,
  generateProgramCohortData
} from '../../utils/ProgramDetailData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import RecommendationImplementationModal from '../loyalty/RecommendationImplementationModal';
import EnhancedRecommendationCard from './EnhancedRecommendationCard';
import { 
  getRecommendationById 
} from '../../data/RFMAnalyticsData';

const DetailView = ({ 
  program, 
  onClose, 
  onImplement, 
  onModify, 
  onReject,
  initialTab: propInitialTab = 'overview',
  setActiveTab: externalSetActiveTab = null,
  // ✅ CRITICAL: Callbacks for program creation and notifications
  onProgramCreated,
  onNotificationCreated
}) => {
  // ALL HOOKS MUST BE AT THE TOP - NO EXCEPTIONS
  const [activeTab, setActiveTab] = useState(propInitialTab);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  
  // ✅ FIXED: Session-only state management (no localStorage persistence) - matches main dashboard
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  const [archivedRecommendations, setArchivedRecommendations] = useState(new Set());
  
  // ✅ UPDATED: State for recommendation implementation modal with better debugging
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendationProgramData, setRecommendationProgramData] = useState(null);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  // Sync internal activeTab with prop
  useEffect(() => {
    setActiveTab(propInitialTab);
  }, [propInitialTab]);
  
  // ✅ FIXED: Handle deep linking to recommendations tab
  useEffect(() => {
    // If program has initial tab set and it's recommendations, set it
    if (program?.initialTab === 'recommendations') {
      setActiveTab('recommendations');
    }
  }, [program?.initialTab]);
  
  // Debug logging for the current program
  useEffect(() => {
    if (program) {
      console.log('%c DETAIL VIEW DEBUG', 'background: purple; color: white; font-size: 14px;');
      console.log('Current program:', program);
      console.log('Program title:', program.title);
      console.log('Program recommendations:', program.recommendations);
      if (program.recommendations) {
        program.recommendations.forEach((rec, index) => {
          console.log(`Recommendation ${index}:`, {
            id: rec.id,
            title: rec.title,
            type: rec.type
          });
        });
      }
    }
  }, [program]);

  // Debug logging for implementation modal state changes
  useEffect(() => {
    console.log('%c IMPLEMENTATION MODAL STATE DEBUG', 'background: orange; color: white; font-size: 12px;');
    console.log('showImplementationModal:', showImplementationModal);
    console.log('selectedRecommendation:', selectedRecommendation);
    console.log('recommendationProgramData:', recommendationProgramData);
  }, [showImplementationModal, selectedRecommendation, recommendationProgramData]);
  
  // NOW ALL OTHER LOGIC AFTER ALL HOOKS
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (externalSetActiveTab) {
      externalSetActiveTab(tab);
    }
  };
  
  // ✅ ENHANCED: Improved implement action with better debugging and validation
  const handleImplementAction = (recommendation) => {
    console.log('%c IMPLEMENT ACTION TRIGGERED', 'background: red; color: white; font-size: 16px;');
    console.log('Recommendation object received:', recommendation);
    console.log('Recommendation ID:', recommendation?.id);
    console.log('Recommendation title:', recommendation?.title);
    console.log('Recommendation type:', recommendation?.type);
    console.log('Program object:', program);
    console.log('Program title:', program?.title);
    console.log('Program ID:', program?.id);
    
    // ✅ VALIDATION: Ensure we have both recommendation and program data
    if (!recommendation) {
      console.error('❌ No recommendation provided to implement action');
      return;
    }
    
    if (!program) {
      console.error('❌ No program data available for implementation');
      return;
    }
    
    // ✅ ENHANCED: Set state with comprehensive debugging
    console.log('%c SETTING IMPLEMENTATION MODAL STATE', 'background: green; color: white; font-size: 14px;');
    
    // Set the recommendation data
    console.log('Setting selected recommendation:', {
      id: recommendation.id,
      title: recommendation.title,
      type: recommendation.type,
      fullRecommendation: recommendation
    });
    setSelectedRecommendation(recommendation);
    
    // Set the program data
    console.log('Setting program data:', {
      id: program.id,
      title: program.title,
      type: program.type,
      fullProgram: program
    });
    setRecommendationProgramData(program);
    
    // Open the modal
    console.log('Opening implementation modal...');
    setShowImplementationModal(true);
    
    // ✅ VERIFICATION: Verify state was set after a brief delay
    setTimeout(() => {
      console.log('%c VERIFYING MODAL STATE AFTER SETTING', 'background: blue; color: white; font-size: 12px;');
      console.log('Modal should be open:', true);
      console.log('Selected recommendation set:', !!recommendation);
      console.log('Program data set:', !!program);
    }, 100);
  };
  
  const handleModifyAction = (recommendation) => {
    console.log('%c MODIFY ACTION TRIGGERED', 'background: orange; color: white; font-size: 12px;');
    console.log('Recommendation to modify:', recommendation);
    if (onModify) {
      onModify(program, recommendation);
    }
  };
  
  const handleRejectAction = (recommendation) => {
    console.log('%c REJECT ACTION TRIGGERED', 'background: red; color: white; font-size: 12px;');
    console.log('Recommendation to reject:', recommendation);
    
    // ✅ FIXED: Update session state only (no localStorage)
    const newRejected = new Set([...rejectedRecommendations, recommendation.id]);
    setRejectedRecommendations(newRejected);
    
    if (onReject) {
      onReject(program, recommendation);
    }
  };

  // ✅ NEW: Handle archive action
  const handleArchiveAction = (recommendation) => {
    console.log('Archive recommendation:', recommendation.id);
    const newArchived = new Set([...archivedRecommendations, recommendation.id]);
    setArchivedRecommendations(newArchived);
  };

  // ✅ NEW: Reset all recommendations to initial state (matches main dashboard)
  const handleResetRecommendations = () => {
    setImplementedRecommendations(new Set());
    setRejectedRecommendations(new Set());
    setArchivedRecommendations(new Set());
    setExpandedRecommendation(null);
    setBulkActionLoading(false);
  };

  // ✅ ENHANCED: Handle implementation modal close with comprehensive cleanup
  const handleCloseImplementationModal = () => {
    console.log('%c CLOSING IMPLEMENTATION MODAL', 'background: blue; color: white; font-size: 14px;');
    console.log('Cleaning up modal state...');
    
    setShowImplementationModal(false);
    setSelectedRecommendation(null);
    setRecommendationProgramData(null);
    
    console.log('Modal state cleaned up');
  };

  // ✅ ENHANCED: Handle program creation from implementation modal with validation
  const handleProgramCreatedFromImplementation = (newProgram) => {
    console.log('%c PROGRAM CREATED FROM IMPLEMENTATION', 'background: green; color: white; font-size: 14px;');
    console.log('New program created:', newProgram);
    
    // Validate the new program data
    if (!newProgram) {
      console.error('❌ No program data received from implementation');
      return;
    }
    
    // ✅ FIXED: Mark the recommendation as implemented using session state
    if (selectedRecommendation) {
      console.log('Marking recommendation as implemented:', selectedRecommendation.id);
      const newImplemented = new Set([...implementedRecommendations, selectedRecommendation.id]);
      setImplementedRecommendations(newImplemented);
    }
    
    // Pass to parent if callback exists
    if (onProgramCreated) {
      console.log('Calling parent onProgramCreated callback');
      onProgramCreated(newProgram);
    } else {
      console.warn('⚠️ No onProgramCreated callback provided');
    }
    
    // Close the implementation modal
    handleCloseImplementationModal();
  };

  // ✅ ENHANCED: Handle notification creation from implementation modal
  const handleNotificationCreatedFromImplementation = (notification) => {
    console.log('%c NOTIFICATION CREATED FROM IMPLEMENTATION', 'background: blue; color: white; font-size: 14px;');
    console.log('Notification created:', notification);
    
    // Validate notification data
    if (!notification) {
      console.error('❌ No notification data received');
      return;
    }
    
    // Pass to parent if callback exists
    if (onNotificationCreated) {
      console.log('Calling parent onNotificationCreated callback');
      onNotificationCreated(notification);
    } else {
      console.warn('⚠️ No onNotificationCreated callback provided');
    }
  };

  // ✅ NEW: Handle toggle expand for unified recommendation cards
  const handleToggleExpand = (recommendationId) => {
    setExpandedRecommendation(expandedRecommendation === recommendationId ? null : recommendationId);
  };

  // ✅ ENHANCED: Bulk actions matching main dashboard functionality
  const handleBulkAction = async (action) => {
    console.log('%c BULK ACTION TRIGGERED', 'background: purple; color: white; font-size: 12px;');
    console.log('Bulk action type:', action);
    
    setBulkActionLoading(true);
    const activeRecommendations = enhancedRecommendations.filter(
      rec => !implementedRecommendations.has(rec.id) && 
             !rejectedRecommendations.has(rec.id) && 
             !archivedRecommendations.has(rec.id)
    );

    console.log('Active recommendations for bulk action:', activeRecommendations.length);

    for (const rec of activeRecommendations) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      if (action === 'implement') {
        console.log('Bulk implementing recommendation:', rec.id);
        const newImplemented = new Set([...implementedRecommendations, rec.id]);
        setImplementedRecommendations(newImplemented);
      } else if (action === 'reject') {
        console.log('Bulk rejecting recommendation:', rec.id);
        const newRejected = new Set([...rejectedRecommendations, rec.id]);
        setRejectedRecommendations(newRejected);
      }
    }
    
    setBulkActionLoading(false);
  };
  
  // Check if this is a program or campaign based on reliable properties
  const itemType = program && program.redemptionRate !== undefined ? 'program' : 'campaign';
  
  // Generate data using utility functions for programs
  const engagementData = generateProgramEngagementData(program);
  const tierData = generateProgramTierData(program);
  const timeData = generateProgramTimeData(program);
  const retentionData = generateProgramRetentionData(program);
  const performanceMetrics = generateProgramPerformanceMetrics(program);
  const redemptionCategories = generateProgramRedemptionCategories(program);
  const deviceData = generateProgramDeviceData(program);
  const cohortData = generateProgramCohortData(program);
  
  // ✅ UPDATED: Enhanced recommendations with AI explanations and RFM linking
  const enhancedRecommendations = program?.recommendations?.map(rec => {
    // Try to find matching RFM recommendation for enhanced data
    const rfmRecommendation = getRecommendationById(rec.id);
    
    return {
      ...rec,
      // Use RFM data if available, otherwise generate fallback data
      aiExplanation: rfmRecommendation?.aiExplanation || generateProgramAIExplanation(rec, program),
      estimatedRevenue: rfmRecommendation?.estimatedRevenue || generateProgramEstimatedRevenue(rec, program),
      memberImpact: rfmRecommendation?.memberImpact || generateMemberImpact(rec, program),
      timeToImplement: rfmRecommendation?.timeToImplement || generateProgramTimeToImplement(rec),
      confidenceScore: rfmRecommendation?.confidenceScore || generateProgramConfidenceScore(rec, program),
      prerequisites: rfmRecommendation?.prerequisites || generateProgramPrerequisites(rec),
      successMetrics: rfmRecommendation?.successMetrics || generateProgramSuccessMetrics(rec),
      risks: rfmRecommendation?.risks || generateProgramRisks(rec)
    };
  }) || [];
  
  // Debug the enhanced recommendations
  useEffect(() => {
    if (enhancedRecommendations.length > 0) {
      console.log('%c ENHANCED RECOMMENDATIONS DEBUG', 'background: cyan; color: black; font-size: 14px;');
      enhancedRecommendations.forEach((rec, index) => {
        console.log(`Enhanced Recommendation ${index}:`, {
          id: rec.id,
          title: rec.title,
          type: rec.type,
          hasRFMData: !!getRecommendationById(rec.id),
          originalRec: rec
        });
      });
    }
  }, [enhancedRecommendations]);
  
  // If no program data is provided, show a loading message
  if (!program) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f5f7f8',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>Loading program details...</p>
          <button 
            onClick={onClose} 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: COLORS.evergreen, 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.375rem', 
              cursor: 'pointer' 
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f5f7f8',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={modalHeaderStyle(program.needsAttention)}>
          <div style={modalHeaderContentStyle}>
            <div className="flex items-center">
              {program.needsAttention && (
                <AlertTriangle size={20} style={{ color: COLORS.red, marginRight: '0.75rem' }} />
              )}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {program.type} • {program.audience} • {program.status}
                </p>
              </div>
            </div>
            <button onClick={onClose} style={closeButtonStyle}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div style={tabContainerStyle}>
          <div style={tabContentStyle}>
            <button onClick={() => handleTabChange('overview')} style={tabButtonStyle(activeTab === 'overview')}>
              Overview
            </button>
            
            <button onClick={() => handleTabChange('performance')} style={tabButtonStyle(activeTab === 'performance')}>
              Performance
            </button>
            
            <button onClick={() => handleTabChange('recommendations')} style={tabButtonStyle(activeTab === 'recommendations')}>
              <Brain size={16} style={{ marginRight: '0.5rem' }} />
              AI Recommendations
              {enhancedRecommendations.length > 0 && (
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '0.5rem',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {enhancedRecommendations.length}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Modal Body with proper scrolling and constrained width */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: 0
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem'
          }} className="tab-transition-container">
            {activeTab === 'overview' && (
              <div className="slide-in-left" key="overview">
                <OverviewTab 
                  program={program}
                  performanceMetrics={performanceMetrics}
                  engagementData={engagementData}
                  onImplement={handleImplementAction}
                  setActiveTab={handleTabChange}
                />
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="slide-in-up" key="performance">
                <PerformanceTab 
                  program={program}
                  performanceMetrics={performanceMetrics}
                  engagementData={engagementData}
                  tierData={tierData}
                  timeData={timeData}
                  retentionData={retentionData}
                  redemptionCategories={redemptionCategories}
                  deviceData={deviceData}
                  cohortData={cohortData}
                />
              </div>
            )}
            
            {activeTab === 'recommendations' && (
              <div className="slide-in-right" key="recommendations">
                <UnifiedProgramRecommendationsTab
                  program={program}
                  recommendations={enhancedRecommendations}
                  expandedRecommendation={expandedRecommendation}
                  onToggleExpand={handleToggleExpand}
                  onImplement={handleImplementAction}
                  onModify={handleModifyAction}
                  onReject={handleRejectAction}
                  onArchive={handleArchiveAction}
                  onBulkAction={handleBulkAction}
                  onResetRecommendations={handleResetRecommendations}
                  bulkActionLoading={bulkActionLoading}
                  implementedRecommendations={implementedRecommendations}
                  rejectedRecommendations={rejectedRecommendations}
                  archivedRecommendations={archivedRecommendations}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ ENHANCED: Recommendation Implementation Modal with better debugging and validation */}
      {showImplementationModal && selectedRecommendation && recommendationProgramData && (
        <RecommendationImplementationModal
          isOpen={showImplementationModal}
          onClose={handleCloseImplementationModal}
          recommendation={selectedRecommendation}
          programData={recommendationProgramData}
          onProgramCreated={handleProgramCreatedFromImplementation}
          onNotificationCreated={handleNotificationCreatedFromImplementation}
        />
      )}

      {/* ✅ ENHANCED: Debug Panel with more detailed state information */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          backgroundColor: 'black',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.75rem',
          zIndex: 10002,
          maxWidth: '300px',
          display: 'none'
        }}>
          <div><strong>DetailView Debug Panel</strong></div>
          <div>Modal State: {showImplementationModal ? 'OPEN' : 'CLOSED'}</div>
          <div>Selected Rec: {selectedRecommendation?.id || 'NONE'}</div>
          <div>Rec Title: {selectedRecommendation?.title || 'NONE'}</div>
          <div>Rec Type: {selectedRecommendation?.type || 'NONE'}</div>
          <div>Program: {recommendationProgramData?.title || 'NONE'}</div>
          <div>Program ID: {recommendationProgramData?.id || 'NONE'}</div>
          <div>Active Tab: {activeTab}</div>
          <div>Enhanced Recs: {enhancedRecommendations.length}</div>
        </div>
      )}
    </div>
  );
};

// ✅ ENHANCED: Unified Program Recommendations Tab using EnhancedRecommendationCard with bulk actions
const UnifiedProgramRecommendationsTab = ({ 
  program,
  recommendations,
  expandedRecommendation, 
  onToggleExpand, 
  onImplement, 
  onModify, 
  onReject,
  onArchive,
  onBulkAction,
  onResetRecommendations,
  bulkActionLoading,
  implementedRecommendations,
  rejectedRecommendations,
  archivedRecommendations
}) => {
  // ✅ FIXED: Calculate active recommendations (exclude archived)
  const activeRecommendations = recommendations.filter(
    rec => !implementedRecommendations.has(rec.id) && 
           !rejectedRecommendations.has(rec.id) && 
           !archivedRecommendations.has(rec.id)
  );

  const implementedCount = implementedRecommendations.size;
  const rejectedCount = rejectedRecommendations.size;
  const totalPotentialRevenue = activeRecommendations.reduce((sum, rec) => sum + (rec.estimatedRevenue || 0), 0);
  const totalMemberImpact = activeRecommendations.reduce((sum, rec) => sum + (rec.memberImpact || 0), 0);

  // ✅ FIXED: Filter out archived recommendations for display
  const visibleRecommendations = recommendations.filter(rec => !archivedRecommendations.has(rec.id));

  if (!recommendations || recommendations.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Brain size={64} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
          No AI Recommendations Available
        </h3>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          Our AI is analyzing your loyalty program performance. Check back in a few minutes for optimization suggestions.
        </p>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ✅ ENHANCED: Program Recommendations Summary Header matching main dashboard */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.05) 100%)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid rgba(26, 76, 73, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Sparkles size={24} style={{ color: COLORS.evergreen, marginRight: '0.75rem' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                AI-Powered Program Optimization
              </h3>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                Advanced analytics and member behavior insights for {program.title}
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

        {/* ✅ ENHANCED: Bulk Actions matching main dashboard */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
              Bulk Actions:
            </span>
            {activeRecommendations.length > 0 ? (
              <button
                onClick={() => onBulkAction('implement')}
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
                  <CheckCircle size={14} />
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
            
            {/* ✅ NEW: Reset Button matching main dashboard */}
            <button
              onClick={onResetRecommendations}
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

          {/* Program Health Indicator */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '0.375rem' 
          }}>
            <Award size={16} style={{ color: program.roi > 0 ? COLORS.green : COLORS.red }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
              Program Health: 
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: program.roi > 200 ? COLORS.green : program.roi > 0 ? COLORS.yellow : COLORS.red }}>
              {program.roi > 200 ? 'Excellent' : program.roi > 0 ? 'Good' : 'Needs Attention'}
            </span>
          </div>
        </div>

        {/* Progress Summary */}
        {(implementedCount > 0 || rejectedCount > 0) && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} style={{ color: COLORS.green }} />
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {implementedCount} Implemented
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <XCircle size={16} style={{ color: COLORS.red }} />
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {rejectedCount} Rejected
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} style={{ color: COLORS.yellow }} />
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {activeRecommendations.length} Pending
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ ENHANCED: Recommendations List using EnhancedRecommendationCard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {visibleRecommendations.map((recommendation) => (
          <EnhancedRecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            isExpanded={expandedRecommendation === recommendation.id}
            onToggleExpand={onToggleExpand}
            onImplement={onImplement}
            onModify={onModify}
            onReject={onReject}
            onArchive={onArchive}
            isImplemented={implementedRecommendations.has(recommendation.id)}
            isRejected={rejectedRecommendations.has(recommendation.id)}
            isArchived={archivedRecommendations.has(recommendation.id)}
            showActions={true}
            compact={false}
          />
        ))}
      </div>

      {/* ✅ ADD: CSS for spin animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Overview and Performance tabs remain the same...
const OverviewTab = ({ program, performanceMetrics, engagementData, onImplement, setActiveTab }) => {
  const hasNoData = program.participants === 0 || program.status === 'Scheduled';
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Program Status Card */}
        <div style={program.needsAttention ? alertCardStyle() : programEnhancedCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>Program Status</h3>
            <div style={statusBadgeStyle(program.status)}>
              {program.status}
            </div>
          </div>
          
          {program.needsAttention && (
            <div style={insightBoxStyle(COLORS.red, 'rgba(244, 67, 54, 0.05)')}>
              <h4 style={insightTitleStyle}>Attention Required</h4>
              <p style={insightTextStyle}>{program.attentionReason}</p>
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p style={programMetricLabelStyle}>Program Type</p>
              <p style={programMetricValueStyle}>{program.type}</p>
            </div>
            <div>
              <p style={programMetricLabelStyle}>Target Audience</p>
              <p style={programMetricValueStyle}>{program.audience}</p>
            </div>
            <div>
              <p style={programMetricLabelStyle}>Total Participants</p>
              <p style={programMetricValueStyle}>{hasNoData ? 'N/A' : program.participants?.toLocaleString()}</p>
            </div>
            <div>
              <p style={programMetricLabelStyle}>ROI</p>
              <p style={{
                ...programMetricValueStyle,
                color: hasNoData ? COLORS.onyxMedium : program.roi > 0 ? COLORS.green : COLORS.red
              }}>
                {hasNoData ? 'N/A' : `${program.roi}%`}
              </p>
            </div>
          </div>
          
          {/* Financial Summary Section */}
          <div style={programFinancialSectionStyle}>
            <div style={programFinancialCardStyle('rgba(76, 175, 80, 0.05)', 'rgba(76, 175, 80, 0.2)')}>
              <div style={programFinancialIconStyle('rgba(76, 175, 80, 0.2)')}>
                <DollarSign size={20} color={COLORS.green} />
              </div>
              <div>
                <p style={programMetricLabelStyle}>Total Revenue</p>
                <p style={programMetricValueStyle}>${program.revenue?.toLocaleString() || '0'}</p>
              </div>
            </div>
            
            <div style={programFinancialCardStyle('rgba(33, 150, 243, 0.05)', 'rgba(33, 150, 243, 0.2)')}>
              <div style={programFinancialIconStyle('rgba(33, 150, 243, 0.2)')}>
                <Target size={20} color={COLORS.blue} />
              </div>
              <div>
                <p style={programMetricLabelStyle}>Program Cost</p>
                <p style={programMetricValueStyle}>${program.cost?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Overview */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Performance Overview
          </h3>
          
          {hasNoData ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Award size={48} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                No Data Available
              </h4>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                Program {program.status === 'Scheduled' ? 'is scheduled to launch' : 'has not started yet'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {performanceMetrics.map((metric, index) => (
                <div key={index} style={programMetricEnhancedCardStyle(metric.bgColor, metric.iconBg)}>
                  <div style={programMetricIconContainerStyle(metric.iconBg)}>
                    {metric.icon}
                  </div>
                  <div>
                    <p style={programMetricLabelStyle}>{metric.label}</p>
                    <p style={programMetricValueStyle}>{metric.value}</p>
                    <p style={programMetricSubtextStyle}>{metric.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Engagement Trend */}
        {!hasNoData && (
          <div style={programEnhancedCardStyle}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Engagement Over Time
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="month" stroke={COLORS.onyxMedium} fontSize={12} />
                <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="participants" 
                  stroke={COLORS.evergreen} 
                  fill={COLORS.evergreen}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="redemptions" 
                  stroke={COLORS.blue} 
                  fill={COLORS.blue}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Right Column - Quick Actions & Recommendations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Quick Actions */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Quick Actions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={quickActionButtonStyle('rgba(33, 150, 243, 0.1)', COLORS.blue)}>
              <Edit size={16} style={{ marginRight: '0.5rem' }} />
              Edit Program
            </button>
            
            <button style={quickActionButtonStyle('rgba(76, 175, 80, 0.1)', COLORS.green)}>
              <Target size={16} style={{ marginRight: '0.5rem' }} />
              Duplicate Program
            </button>
            
            <button style={quickActionButtonStyle('rgba(255, 193, 7, 0.1)', COLORS.yellow)}>
              <Users size={16} style={{ marginRight: '0.5rem' }} />
              Manage Members
            </button>
            
            <button style={quickActionButtonStyle('rgba(156, 39, 176, 0.1)', '#9c27b0')}>
              <Award size={16} style={{ marginRight: '0.5rem' }} />
              Adjust Rewards
            </button>
          </div>
        </div>
        
        {/* Key Metrics Summary */}
        {!hasNoData && (
          <div style={programEnhancedCardStyle}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Key Metrics
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Redemption Rate</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.redemptionRate}%
                </span>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle(program.redemptionRate, COLORS.evergreen)} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Retention Rate</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.retentionRate}%
                </span>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle(program.retentionRate, COLORS.blue)} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Repeat Purchase Rate</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.repeatPurchaseRate}%
                </span>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle(program.repeatPurchaseRate, COLORS.green)} />
              </div>
            </div>
          </div>
        )}
        
        {/* Top Recommendations Preview */}
        {program.recommendations && program.recommendations.length > 0 && (
          <div style={programEnhancedCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                AI Recommendations
              </h3>
              <button 
                onClick={() => setActiveTab('recommendations')}
                style={{ 
                  fontSize: '0.875rem', 
                  color: COLORS.evergreen, 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                View All
                <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </button>
            </div>
            
            {program.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} style={{ 
                padding: '0.75rem', 
                backgroundColor: 'rgba(26, 76, 73, 0.05)', 
                borderRadius: '0.5rem', 
                marginBottom: index < 1 ? '0.75rem' : 0,
                border: '1px solid rgba(26, 76, 73, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>{rec.title}</h4>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <span style={tagStyle(getImpactColor(rec.impact), `rgba(${getImpactColor(rec.impact).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`)}>
                      {rec.impact}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: 1.4 }}>
                  {rec.description.substring(0, 100)}...
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('%c OVERVIEW QUICK IMPLEMENT CLICKED', 'background: purple; color: white; font-size: 12px;');
                    console.log('Recommendation from overview:', rec);
                    onImplement(rec);
                  }}
                  style={{ 
                    fontSize: '0.75rem', 
                    color: COLORS.evergreen, 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    padding: 0
                  }}
                >
                  Quick Implement with Wizard →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PerformanceTab = ({ 
  program, 
  performanceMetrics, 
  engagementData, 
  tierData, 
  timeData, 
  retentionData, 
  redemptionCategories, 
  deviceData, 
  cohortData 
}) => {
  const hasNoData = program.participants === 0 || program.status === 'Scheduled';
  
  if (hasNoData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <BarChart2 size={64} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
          No Performance Data Available
        </h3>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          Program {program.status === 'Scheduled' ? 'is scheduled to launch' : 'has not started yet'}
        </p>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Performance Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {performanceMetrics.map((metric, index) => (
          <div key={index} style={programMetricEnhancedCardStyle(metric.bgColor, metric.iconBg)}>
            <div style={programMetricIconContainerStyle(metric.iconBg)}>
              {metric.icon}
            </div>
            <div>
              <p style={programMetricLabelStyle}>{metric.label}</p>
              <p style={programMetricValueStyle}>{metric.value}</p>
              <p style={programMetricSubtextStyle}>{metric.subtext}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Engagement Over Time */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Program Engagement
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="participants" stackId="1" stroke={COLORS.evergreen} fill={COLORS.evergreen} fillOpacity={0.6} name="Participants" />
              <Area type="monotone" dataKey="redemptions" stackId="2" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.6} name="Redemptions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Tier Performance */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Performance by Tier
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tierData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="tier" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Bar dataKey="redemptionRate" fill={COLORS.evergreen} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Retention Analysis */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Member Retention
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="retention" stroke={COLORS.blue} strokeWidth={3} dot={{ fill: COLORS.blue, strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Redemption Categories */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Redemption Categories
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={redemptionCategories}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {redemptionCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PROGRAM_CHART_COLORS[index % PROGRAM_CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Additional Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Device Usage */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Device Usage
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="device" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Bar dataKey="usage" fill={COLORS.evergreenLight} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Cohort Analysis */}
        <div style={programEnhancedCardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Member Cohorts
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="week" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="newMembers" stackId="1" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.6} />
              <Area type="monotone" dataKey="returningMembers" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Helper functions for generating enhanced program recommendation data (keep existing implementations)
const generateProgramAIExplanation = (rec, program) => {
  const explanations = {
    'crisis': `Critical analysis of ${program.title} reveals systemic failures with ${program.redemptionRate || 10}% completion rate causing customer frustration. Machine learning models trained on 50,000+ loyalty programs identify this as requiring immediate intervention to prevent permanent brand damage.`,
    'recovery': `Behavioral analysis using customer journey mapping shows ${program.title} participants have elevated churn propensity. Predictive models suggest significant recovery potential with targeted intervention within optimal time window.`,
    'restructure': `Comparative analysis reveals fundamental design opportunities in ${program.title}. A/B testing data shows optimized structure with milestone rewards can drive substantially higher completion rates through behavioral economics principles.`,
    'targeting': `Behavioral analysis of ${program.participants?.toLocaleString() || 'program'} members reveals significant segmentation opportunities. RFM modeling shows optimal targeting can improve engagement and ROI substantially.`,
    'adjustment': `Economic modeling of program mechanics indicates optimization opportunities. Elasticity analysis suggests strategic adjustments could improve unit economics while maintaining member satisfaction.`,
    'enhancement': `Content personalization analysis using collaborative filtering identifies opportunities to increase member engagement significantly through strategic program enhancements aligned with member preferences.`,
    'restriction': `Cost-benefit analysis reveals program inefficiencies affecting overall ROI. Predictive modeling shows strategic restrictions could improve unit economics while maintaining high engagement levels.`,
    'communication': `Engagement frequency analysis indicates communication gaps affecting member retention. Lifecycle stage modeling shows optimal touchpoint timing could increase retention rates substantially.`,
  };
  
  return explanations[rec.type] || explanations['enhancement'];
};

const generateProgramEstimatedRevenue = (rec, program) => {
  const baseRevenue = program.revenue || 50000;
  const multipliers = {
    'high': 0.3,
    'medium': 0.18,
    'low': 0.1
  };
  
  return Math.round(baseRevenue * (multipliers[rec.impact] || 0.18));
};

const generateProgramTimeToImplement = (rec) => {
  const times = {
    'easy': '2-3 days',
    'medium': '1-2 weeks', 
    'hard': '2-4 weeks'
  };
  
  return times[rec.difficulty] || '1-2 weeks';
};

const generateProgramConfidenceScore = (rec, program) => {
  const baseScore = 78;
  const impactBonus = { 'high': 12, 'medium': 8, 'low': 4 };
  const difficultyPenalty = { 'easy': 0, 'medium': -6, 'hard': -12 };
  const performanceBonus = program.roi > 100 ? 8 : program.roi > 0 ? 4 : -8;
  
  return Math.min(96, Math.max(65, baseScore + (impactBonus[rec.impact] || 8) + (difficultyPenalty[rec.difficulty] || -6) + performanceBonus));
};

const generateProgramPrerequisites = (rec) => {
  return [
    'Program audit and member data analysis required',
    'Technical infrastructure setup and configuration',
    'Member communication and change management strategy',
    'Testing and validation framework implementation'
  ];
};

const generateProgramSuccessMetrics = (rec) => {
  return [
    'Increased member engagement by 25-40%',
    'Improved program completion rates',
    'Enhanced customer satisfaction scores',
    'Better retention and lifetime value'
  ];
};

const generateProgramRisks = (rec) => {
  return [
    'Implementation complexity may affect user experience',
    'Requires careful change management and member communication'
  ];
};

const generateMemberImpact = (rec, program) => {
  const baseMembers = program.participants || 1000;
  const impactRatios = {
    'crisis': 0.95,
    'recovery': 0.65,
    'restructure': 0.90,
    'targeting': 0.65,
    'adjustment': 0.85,
    'enhancement': 0.75,
    'restriction': 0.45,
    'communication': 0.90
  };
  
  return Math.round(baseMembers * (impactRatios[rec.type] || 0.75));
};

export default DetailView;
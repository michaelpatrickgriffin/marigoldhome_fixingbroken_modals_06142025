// src/components/common/DetailView.js
// Enhanced with advanced recommendations system for loyalty programs and recommendation implementation

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, AlertTriangle, Check, X, Edit,
  BarChart2, TrendingUp, Users, Award, Target, Zap, ChevronRight, ChevronDown, DollarSign,
  Brain, Clock, Lightbulb, CheckCircle, XCircle, AlertCircle, Settings,
  Sparkles, TrendingDown, Activity, RefreshCw, Gift, Percent, UserCheck, CreditCard, Mail
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

const DetailView = ({ 
  program,
  item,
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
  // ✅ FIXED: ALL HOOKS MUST BE AT THE TOP - NO EXCEPTIONS
  const [activeTab, setActiveTab] = useState(propInitialTab);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  
  // ✅ UPDATED: State for recommendation implementation modal with better debugging
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  
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
    const programData = program || item;
    if (programData?.initialTab === 'recommendations') {
      setActiveTab('recommendations');
    }
  }, [program, item]);
  
  // Debug logging for the current program
  useEffect(() => {
    console.log('%c DETAIL VIEW PROP DEBUG', 'background: purple; color: white; font-size: 14px;');
    console.log('program prop:', program);
    console.log('item prop:', item);
    
    const programData = program || item;
    console.log('resolved programData:', programData);
    
    if (programData) {
      console.log('Program title:', programData.title);
      console.log('Program recommendations:', programData.recommendations);
      console.log('Program needsAttention:', programData.needsAttention);
      if (programData.recommendations) {
        programData.recommendations.forEach((rec, index) => {
          console.log(`Recommendation ${index}:`, {
            id: rec.id,
            title: rec.title,
            type: rec.type
          });
        });
      }
    }
  }, [program, item]);

  // Debug logging for implementation modal state changes
  useEffect(() => {
    console.log('%c IMPLEMENTATION MODAL STATE DEBUG', 'background: orange; color: white; font-size: 12px;');
    console.log('showImplementationModal:', showImplementationModal);
    console.log('selectedRecommendation:', selectedRecommendation);
  }, [showImplementationModal, selectedRecommendation]);

  // ✅ Debug the enhanced recommendations - ALL HOOKS MUST BE AT TOP
  useEffect(() => {
    const programData = program || item;
    const recs = programData?.recommendations?.map(rec => ({
      ...rec,
      aiExplanation: generateProgramAIExplanation(rec, programData),
      estimatedRevenue: generateProgramEstimatedRevenue(rec, programData),
      timeToImplement: generateProgramTimeToImplement(rec),
      confidenceScore: generateProgramConfidenceScore(rec, programData),
      prerequisites: generateProgramPrerequisites(rec),
      successMetrics: generateProgramSuccessMetrics(rec),
      risks: generateProgramRisks(rec),
      memberImpact: generateMemberImpact(rec, programData)
    })) || [];
    
    if (programData && recs.length > 0) {
      console.log('%c ENHANCED RECOMMENDATIONS DEBUG', 'background: cyan; color: black; font-size: 14px;');
      recs.forEach((rec, index) => {
        console.log(`Enhanced Recommendation ${index}:`, {
          id: rec.id,
          title: rec.title,
          type: rec.type,
          originalRec: rec
        });
      });
    }
  }, [program, item]);

  // ✅ NOW ALL NON-HOOK LOGIC AFTER ALL HOOKS
  
  // Enhanced recommendations generation - moved after all hooks
  const enhancedRecommendations = (program || item)?.recommendations?.map(rec => ({
    ...rec,
    aiExplanation: generateProgramAIExplanation(rec, program || item),
    estimatedRevenue: generateProgramEstimatedRevenue(rec, program || item),
    timeToImplement: generateProgramTimeToImplement(rec),
    confidenceScore: generateProgramConfidenceScore(rec, program || item),
    prerequisites: generateProgramPrerequisites(rec),
    successMetrics: generateProgramSuccessMetrics(rec),
    risks: generateProgramRisks(rec),
    memberImpact: generateMemberImpact(rec, program || item)
  })) || [];

  // ✅ NOW ALL OTHER LOGIC AFTER ALL HOOKS
  
  // If no program data is provided, show a loading message
  if (!(program || item)) {
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

  // Check if this is a program or campaign based on reliable properties
  const itemType = (program || item) && ((program || item).redemptionRate !== undefined || (program || item).completionRate !== undefined) ? 'program' : 'campaign';
  
  // Generate data using utility functions for programs
  const engagementData = generateProgramEngagementData(program || item);
  const tierData = generateProgramTierData(program || item);
  const timeData = generateProgramTimeData(program || item);
  const retentionData = generateProgramRetentionData(program || item);
  const performanceMetrics = generateProgramPerformanceMetrics(program || item);
  const redemptionCategories = generateProgramRedemptionCategories(program || item);
  const deviceData = generateProgramDeviceData(program || item);
  const cohortData = generateProgramCohortData(program || item);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (externalSetActiveTab) {
      externalSetActiveTab(tab);
    }
  };
  
  // ✅ ENHANCED: Improved implement action with better debugging and validation
  const handleImplementAction = (recommendation) => {
    const currentProgramData = program || item;
    console.log('%c IMPLEMENT ACTION TRIGGERED', 'background: red; color: white; font-size: 16px;');
    console.log('Recommendation object received:', recommendation);
    console.log('Recommendation ID:', recommendation?.id);
    console.log('Recommendation title:', recommendation?.title);
    console.log('Recommendation type:', recommendation?.type);
    console.log('Program object:', currentProgramData);
    console.log('Program title:', currentProgramData?.title);
    console.log('Program ID:', currentProgramData?.id);
    
    // ✅ VALIDATION: Ensure we have both recommendation and program data
    if (!recommendation) {
      console.error('❌ No recommendation provided to implement action');
      return;
    }
    
    if (!currentProgramData) {
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
    
    // Open the modal
    console.log('Opening implementation modal...');
    setShowImplementationModal(true);
    
    // ✅ VERIFICATION: Verify state was set after a brief delay
    setTimeout(() => {
      console.log('%c VERIFYING MODAL STATE AFTER SETTING', 'background: blue; color: white; font-size: 12px;');
      console.log('Modal should be open:', true);
      console.log('Selected recommendation set:', !!recommendation);
      console.log('Program data set:', !!currentProgramData);
    }, 100);
  };
  
  const handleModifyAction = (recommendation) => {
    const currentProgramData = program || item;
    console.log('%c MODIFY ACTION TRIGGERED', 'background: orange; color: white; font-size: 12px;');
    console.log('Recommendation to modify:', recommendation);
    if (onModify) {
      onModify(currentProgramData, recommendation);
    }
  };
  
  const handleRejectAction = (recommendation) => {
    const currentProgramData = program || item;
    console.log('%c REJECT ACTION TRIGGERED', 'background: red; color: white; font-size: 12px;');
    console.log('Recommendation to reject:', recommendation);
    setRejectedRecommendations(prev => new Set([...prev, recommendation.id]));
    if (onReject) {
      onReject(currentProgramData, recommendation);
    }
  };

  // ✅ ENHANCED: Handle implementation modal close with comprehensive cleanup
  const handleCloseImplementationModal = () => {
    console.log('%c CLOSING IMPLEMENTATION MODAL', 'background: blue; color: white; font-size: 14px;');
    console.log('Cleaning up modal state...');
    
    setShowImplementationModal(false);
    setSelectedRecommendation(null);
    
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
    
    // Mark the recommendation as implemented if we have one selected
    if (selectedRecommendation) {
      console.log('Marking recommendation as implemented:', selectedRecommendation.id);
      setImplementedRecommendations(prev => new Set([...prev, selectedRecommendation.id]));
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

  // Bulk actions
  const handleBulkAction = async (action) => {
    console.log('%c BULK ACTION TRIGGERED', 'background: purple; color: white; font-size: 12px;');
    console.log('Bulk action type:', action);
    
    setBulkActionLoading(true);
    const activeRecommendations = enhancedRecommendations.filter(
      rec => !implementedRecommendations.has(rec.id) && !rejectedRecommendations.has(rec.id)
    );

    console.log('Active recommendations for bulk action:', activeRecommendations.length);

    for (const rec of activeRecommendations) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      if (action === 'implement') {
        console.log('Bulk implementing recommendation:', rec.id);
        handleImplementAction(rec);
      } else if (action === 'reject') {
        console.log('Bulk rejecting recommendation:', rec.id);
        handleRejectAction(rec);
      }
    }
    
    setBulkActionLoading(false);
  };

  // ✅ FIXED: Enhanced modal header style function
  const getModalHeaderStyle = () => {
    const currentProgramData = program || item;
    const baseStyle = {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white'
    };
    
    // If program needs attention, apply pink/red background
    if (currentProgramData.needsAttention) {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(244, 67, 54, 0.08)',
        borderBottom: '1px solid rgba(244, 67, 54, 0.2)'
      };
    }
    
    return baseStyle;
  };
  
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
        {/* ✅ FIXED: Modal Header with proper attention styling */}
        <div style={getModalHeaderStyle()}>
          <div style={modalHeaderContentStyle}>
            <div className="flex items-center">
              {(program || item).needsAttention && (
                <AlertTriangle size={20} style={{ color: COLORS.red, marginRight: '0.75rem' }} />
              )}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
                  {(program || item).title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {(program || item).type} • {(program || item).audience} • {(program || item).status}
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
                  program={program || item}
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
                  program={program || item}
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
                <EnhancedProgramRecommendationsTab
                  program={program || item}
                  recommendations={enhancedRecommendations}
                  expandedRecommendation={expandedRecommendation}
                  setExpandedRecommendation={setExpandedRecommendation}
                  onImplement={handleImplementAction}
                  onModify={handleModifyAction}
                  onReject={handleRejectAction}
                  onBulkAction={handleBulkAction}
                  bulkActionLoading={bulkActionLoading}
                  implementedRecommendations={implementedRecommendations}
                  rejectedRecommendations={rejectedRecommendations}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ ENHANCED: Recommendation Implementation Modal with better debugging and validation */}
      {showImplementationModal && selectedRecommendation && (program || item) && (
        <RecommendationImplementationModal
          isOpen={showImplementationModal}
          onClose={handleCloseImplementationModal}
          recommendation={selectedRecommendation}
          programData={program || item}
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
          <div>Program: {(program || item)?.title || 'NONE'}</div>
          <div>Program ID: {(program || item)?.id || 'NONE'}</div>
          <div>Active Tab: {activeTab}</div>
          <div>Enhanced Recs: {enhancedRecommendations.length}</div>
          <div>Needs Attention: {(program || item)?.needsAttention ? 'YES' : 'NO'}</div>
        </div>
      )}
    </div>
  );
};

// Enhanced Program Recommendations Tab Component (unchanged from previous version)
const EnhancedProgramRecommendationsTab = ({ 
  program,
  recommendations,
  expandedRecommendation, 
  setExpandedRecommendation, 
  onImplement, 
  onModify, 
  onReject,
  onBulkAction,
  bulkActionLoading,
  implementedRecommendations,
  rejectedRecommendations
}) => {
  const activeRecommendations = recommendations.filter(
    rec => !implementedRecommendations.has(rec.id) && !rejectedRecommendations.has(rec.id)
  );

  const implementedCount = implementedRecommendations.size;
  const rejectedCount = rejectedRecommendations.size;
  const totalPotentialRevenue = recommendations.reduce((sum, rec) => sum + (rec.estimatedRevenue || 0), 0);
  const totalMemberImpact = recommendations.reduce((sum, rec) => sum + (rec.memberImpact || 0), 0);

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
      {/* Program Recommendations Summary Header */}
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
                AI-Powered Loyalty Program Optimization
              </h3>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                Advanced analytics and member behavior insights
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.evergreen, marginBottom: '0.25rem' }}>
                {recommendations.length}
              </p>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Recommendations</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.green, marginBottom: '0.25rem' }}>
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

        {/* Bulk Actions */}
        {activeRecommendations.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                Bulk Actions:
              </span>
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
                  backgroundColor: COLORS.green,
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: bulkActionLoading ? 'not-allowed' : 'pointer',
                  opacity: bulkActionLoading ? 0.7 : 1
                }}
              >
                {bulkActionLoading ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                Implement All ({activeRecommendations.length})
              </button>
              <button
                onClick={() => onBulkAction('reject')}
                disabled={bulkActionLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: `1px solid ${COLORS.red}`,
                  backgroundColor: 'white',
                  color: COLORS.red,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: bulkActionLoading ? 'not-allowed' : 'pointer',
                  opacity: bulkActionLoading ? 0.7 : 1
                }}
              >
                {bulkActionLoading ? <RefreshCw size={14} className="animate-spin" /> : <XCircle size={14} />}
                Reject All
              </button>
            </div>

            {/* Program Health Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.375rem' }}>
              <Award size={16} style={{ color: program.roi > 0 ? COLORS.green : COLORS.red }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                Program Health: 
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: program.roi > 200 ? COLORS.green : program.roi > 0 ? COLORS.yellow : COLORS.red }}>
                {program.roi > 200 ? 'Excellent' : program.roi > 0 ? 'Good' : 'Needs Attention'}
              </span>
            </div>
          </div>
        )}

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

      {/* Recommendations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {recommendations.map((recommendation, index) => {
          const isExpanded = expandedRecommendation === recommendation.id;
          const isImplemented = implementedRecommendations.has(recommendation.id);
          const isRejected = rejectedRecommendations.has(recommendation.id);
          
          return (
            <div key={recommendation.id} style={{
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
              transition: 'all 0.3s ease'
            }}>
              {/* Recommendation Header */}
              <div 
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? 'rgba(26, 76, 73, 0.03)' : 'transparent',
                  borderBottom: isExpanded ? '1px solid rgba(0,0,0,0.05)' : 'none'
                }}
                onClick={() => setExpandedRecommendation(isExpanded ? null : recommendation.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        borderRadius: '0.5rem', 
                        backgroundColor: `rgba(${getImpactColor(recommendation.impact).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.75rem'
                      }}>
                        {getProgramRecommendationIcon(recommendation.type)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                          {recommendation.title}
                        </h3>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{
                            ...tagStyle(getImpactColor(recommendation.impact), `rgba(${getImpactColor(recommendation.impact).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <TrendingUp size={12} />
                            {recommendation.impact} impact
                          </span>
                          <span style={{
                            ...tagStyle(getDifficultyColor(recommendation.difficulty), `rgba(${getDifficultyColor(recommendation.difficulty).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Clock size={12} />
                            {recommendation.timeToImplement}
                          </span>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            color: COLORS.blue,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <DollarSign size={12} />
                            +${recommendation.estimatedRevenue?.toLocaleString() || '0'}
                          </span>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            color: '#9c27b0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Users size={12} />
                            {recommendation.memberImpact?.toLocaleString() || '0'} members
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6, marginBottom: '1rem' }}>
                      {isExpanded ? recommendation.description : `${recommendation.description.substring(0, 120)}...`}
                    </p>

                    {/* Confidence Score and Member Impact */}
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
                              width: `${recommendation.confidenceScore}%`, 
                              height: '100%', 
                              backgroundColor: recommendation.confidenceScore >= 80 ? COLORS.green : 
                                            recommendation.confidenceScore >= 60 ? COLORS.yellow : COLORS.red,
                              borderRadius: '2px'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.onyx }}>
                            {recommendation.confidenceScore}%
                          </span>
                        </div>
                      </div>

                      {/* ROI Projection */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>ROI Impact:</span>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 600, 
                          color: COLORS.green,
                          padding: '0.125rem 0.375rem',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          borderRadius: '4px'
                        }}>
                          +{Math.round((recommendation.estimatedRevenue || 0) / (program.cost || 1000) * 100)}%
                        </span>
                      </div>
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
              
              {/* Expanded AI Details */}
              {isExpanded && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
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
                        AI Analysis & Member Behavior Insights
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                      {recommendation.aiExplanation}
                    </p>
                  </div>

                  {/* Implementation Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* Prerequisites */}
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 193, 7, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <Settings size={14} style={{ marginRight: '0.25rem', color: COLORS.yellow }} />
                        Prerequisites
                      </h4>
                      <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                        {recommendation.prerequisites.map((prereq, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{prereq}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Success Metrics */}
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(76, 175, 80, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <Activity size={14} style={{ marginRight: '0.25rem', color: COLORS.green }} />
                        Success Metrics
                      </h4>
                      <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                        {recommendation.successMetrics.map((metric, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Risks */}
                  {recommendation.risks.length > 0 && (
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: 'rgba(244, 67, 54, 0.05)', 
                      borderRadius: '0.5rem', 
                      border: '1px solid rgba(244, 67, 54, 0.2)',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <AlertTriangle size={14} style={{ marginRight: '0.25rem', color: COLORS.red }} />
                        Potential Risks & Considerations
                      </h4>
                      <ul style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                        {recommendation.risks.map((risk, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  {!isImplemented && !isRejected && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('%c REJECT BUTTON CLICKED', 'background: red; color: white; font-size: 12px;');
                          onReject(recommendation);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1rem',
                          border: `1px solid ${COLORS.red}`,
                          backgroundColor: 'white',
                          color: COLORS.red,
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <X size={16} />
                        Reject
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('%c MODIFY BUTTON CLICKED', 'background: orange; color: white; font-size: 12px;');
                          onModify(recommendation);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1rem',
                          border: `1px solid ${COLORS.yellow}`,
                          backgroundColor: 'white',
                          color: COLORS.yellow,
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <Edit size={16} />
                        Modify
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('%c IMPLEMENT BUTTON CLICKED - DETAILED DEBUG', 'background: green; color: white; font-size: 12px;');
                          console.log('Recommendation being implemented (from recommendations tab):', {
                            id: recommendation.id,
                            title: recommendation.title,
                            type: recommendation.type,
                            impact: recommendation.impact,
                            difficulty: recommendation.difficulty,
                            fullRecommendation: recommendation
                          });
                          onImplement(recommendation);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1rem',
                          border: 'none',
                          backgroundColor: COLORS.green,
                          color: 'white',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Check size={16} />
                        Implement with Wizard
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ✅ FIXED: Get redemption rate with proper fallback
const getRedemptionRate = (program) => {
  if (program.type === 'Punch Card') {
    return program.completionRate || program.redemptionRate || 0;
  }
  return program.redemptionRate || program.completionRate || 0;
};

// Overview and Performance tabs remain the same...
const OverviewTab = ({ program, performanceMetrics, engagementData, onImplement, setActiveTab }) => {
  const hasNoData = program.participants === 0 || program.status === 'Scheduled';
  const redemptionRate = getRedemptionRate(program);
  
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
                <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {program.type === 'Punch Card' ? 'Completion Rate' : 'Redemption Rate'}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                  {redemptionRate}%
                </span>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle(redemptionRate, COLORS.evergreen)} />
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
    'crisis': `Critical analysis of Trail Essentials Punch Card reveals systemic failures: 10% completion rate (vs 48% industry average), 67% abandonment after 2nd punch, and -39% ROI causing customer frustration. Machine learning models trained on 50,000+ loyalty programs identify this as a Category 5 program crisis requiring immediate intervention to prevent permanent brand damage.`,
    'recovery': `Behavioral analysis using customer journey mapping and engagement decay patterns shows Trail Essentials participants have 23% higher churn propensity than baseline. Predictive models suggest 35% recovery potential with targeted intervention within 30-day window. Sentiment analysis indicates transparency and premium incentives can restore trust.`,
    'restructure': `Comparative analysis against Adventure Gear Punch Card (48% completion, 900% ROI) reveals fundamental design flaws in Trail Essentials. A/B testing data from 15,000+ participants shows 3-punch structure with milestone rewards drives 340% higher completion vs current 5-punch model. Behavioral economics principles support simplified progression.`,
    'targeting': `Behavioral analysis of ${program.participants?.toLocaleString() || 'your'} members reveals significant segmentation opportunities. RFM modeling shows ${Math.round(getRedemptionRate(program) || 20)}% of participants account for 60% of redemptions. Advanced clustering algorithms identified 3 distinct behavioral patterns with varying engagement propensities.`,
    'adjustment': `Economic modeling of point values versus redemption behavior indicates suboptimal pricing structure. Elasticity analysis suggests current point values are ${getRedemptionRate(program) < 15 ? 'too high' : 'misaligned'}, leading to ${getRedemptionRate(program) < 15 ? 'low redemption rates' : 'frequent but low-value redemptions'}. Machine learning models trained on similar programs recommend strategic adjustments.`,
    'enhancement': `Content personalization analysis using collaborative filtering identifies opportunities to increase member engagement by 35%. Natural language processing of member feedback and behavioral data suggests specific improvements aligned with member preferences and usage patterns.`,
    'restriction': `Cost-benefit analysis reveals program inefficiencies affecting overall ROI. Predictive modeling shows that implementing strategic restrictions could improve unit economics by 25% while maintaining 85% of current engagement levels. Historical data from similar optimizations supports this approach.`,
    'communication': `Engagement frequency analysis and A/B testing data indicate communication gaps affecting member retention. Lifecycle stage modeling shows optimal touchpoint timing that could increase retention rates by 22%. Sentiment analysis of member communications reveals specific messaging improvements.`,
    'optimization': `Performance analysis reveals optimization opportunities in ${program.title}. Machine learning models identify specific areas where small adjustments could yield significant improvements in member satisfaction and program ROI.`
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
  const prerequisites = {
    'crisis': [
      'Immediate executive approval for program suspension',
      'Customer service team briefing and escalation protocols',
      'Legal review of customer communication messaging'
    ],
    'recovery': [
      'Customer segmentation data and risk scoring',
      'Automated email/SMS campaign infrastructure',
      'Customer service training for intervention calls'
    ],
    'restructure': [
      'Comprehensive program audit and member data analysis',
      'Design and development resources for new program structure',
      'Change management and member communication strategy'
    ],
    'targeting': [
      'Member segmentation data and analytics',
      'Customer behavior tracking capabilities',
      'Dynamic content delivery system'
    ],
    'adjustment': [
      'Current point economics analysis',
      'Member feedback and survey data',
      'Flexible point structure configuration'
    ],
    'enhancement': [
      'Member preference data collection',
      'Program engagement tracking',
      'A/B testing infrastructure'
    ],
    'restriction': [
      'Current program cost analysis',
      'Member behavior and value segmentation',
      'Gradual rollout capability'
    ],
    'communication': [
      'Member contact preferences',
      'Email automation platform',
      'Engagement analytics tools'
    ],
    'optimization': [
      'Current performance metrics',
      'Member behavior data',
      'Implementation resources'
    ]
  };
  
  return prerequisites[rec.type] || prerequisites['enhancement'];
};

const generateProgramSuccessMetrics = (rec) => {
  const metrics = {
    'crisis': [
      'Customer churn reduction to <5% within 30 days',
      'Brand sentiment improvement of 40+ NPS points',
      'Program ROI recovery to positive within 8 weeks'
    ],
    'recovery': [
      'Recovery of 35% of at-risk participants',
      'Customer satisfaction increase to 80%+',
      'Retention rate improvement of 25-30%'
    ],
    'restructure': [
      'Program completion rate increase to 45%+',
      'ROI improvement to 400%+ within 6 months',
      'Member satisfaction score >90%'
    ],
    'targeting': [
      'Segment-specific engagement lift of 40%',
      'Redemption rate improvement of 30%',
      'Member satisfaction score increase'
    ],
    'adjustment': [
      'Optimal redemption rate of 20-25%',
      'Improved program ROI by 25%',
      'Balanced cost per redemption'
    ],
    'enhancement': [
      'Member engagement increase of 35%',
      'Retention rate improvement of 20%',
      'Higher program satisfaction scores'
    ],
    'restriction': [
      'Program ROI improvement to positive',
      'Maintained member satisfaction >80%',
      'Cost reduction of 25-30%'
    ],
    'communication': [
      'Engagement recovery of 28%',
      'Reduced churn rate by 15%',
      'Improved member lifetime value'
    ],
    'optimization': [
      'Key metric improvement of 20%+',
      'Member satisfaction increase',
      'Positive ROI improvement'
    ]
  };
  
  return metrics[rec.type] || metrics['enhancement'];
};

const generateProgramRisks = (rec) => {
  const risks = {
    'crisis': [
      'Customer backlash if communication is not transparent',
      'Potential legal exposure from program changes'
    ],
    'recovery': [
      'Intervention fatigue if messaging frequency is too high',
      'Cost escalation if discount thresholds are set too low'
    ],
    'restructure': [
      'Member confusion during transition period',
      'Temporary disruption to program engagement metrics'
    ],
    'targeting': [
      'Potential reduction in overall program reach',
      'Requires accurate member segmentation'
    ],
    'adjustment': [
      'Member dissatisfaction if not communicated well',
      'Temporary disruption to redemption patterns'
    ],
    'enhancement': [
      'Implementation complexity may affect user experience',
      'Requires ongoing optimization and monitoring'
    ],
    'restriction': [
      'Risk of member attrition if restrictions are too severe',
      'Requires careful change management'
    ],
    'communication': [
      'Over-communication could lead to member fatigue',
      'Message relevance must be maintained'
    ],
    'optimization': [
      'May require temporary program adjustments',
      'Member communication is critical'
    ]
  };
  
  return risks[rec.type] || [];
};

const generateMemberImpact = (rec, program) => {
  const baseMembers = program.participants || 1000;
  const impactRatios = {
    'crisis': 0.95, // Crisis affects almost all participants
    'recovery': 0.65, // Recovery targets specific at-risk groups
    'restructure': 0.90, // Restructure affects most participants
    'targeting': 0.65,
    'adjustment': 0.85,
    'enhancement': 0.75,
    'restriction': 0.45,
    'communication': 0.90,
    'optimization': 0.70
  };
  
  return Math.round(baseMembers * (impactRatios[rec.type] || 0.75));
};

const getProgramRecommendationIcon = (type) => {
  const icons = {
    'crisis': <AlertTriangle size={16} style={{ color: COLORS.red }} />,
    'recovery': <UserCheck size={16} style={{ color: COLORS.yellow }} />,
    'restructure': <RefreshCw size={16} style={{ color: COLORS.blue }} />,
    'targeting': <Target size={16} style={{ color: COLORS.blue }} />,
    'adjustment': <Percent size={16} style={{ color: COLORS.yellow }} />,
    'enhancement': <Lightbulb size={16} style={{ color: COLORS.evergreen }} />,
    'restriction': <Settings size={16} style={{ color: COLORS.red }} />,
    'communication': <Mail size={16} style={{ color: COLORS.evergreen }} />,
    'optimization': <Activity size={16} style={{ color: COLORS.evergreen }} />
  };
  
  return icons[type] || <Gift size={16} style={{ color: COLORS.evergreen }} />;
};

export default DetailView;
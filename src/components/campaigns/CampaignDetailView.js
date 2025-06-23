// src/components/campaigns/CampaignDetailView.js
// Enhanced with advanced recommendations system for campaigns

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, AlertTriangle, Check, X, Edit,
  BarChart2, TrendingUp, Users, Award, Target, Zap, ChevronRight, ChevronDown, DollarSign,
  Brain, Clock, Lightbulb, CheckCircle, XCircle, AlertCircle, Settings,
  Sparkles, TrendingDown, Activity, RefreshCw, Gift, Percent, UserCheck, CreditCard, Mail, Calendar
} from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../styles/ColorStyles';
import { useMVPUI } from '../../contexts/MVPUIContext';
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
  performanceMetricCardStyle,
  metricHeaderStyle,
  metricIconStyle,
  metricLabelStyle,
  metricValueStyle,
  metricSubtextStyle,
  quickActionButtonStyle,
  statusBadgeStyle,
  recommendationCardStyle,
  recommendationHeaderStyle,
  tagStyle,
  actionButtonStyle,
  CHART_COLORS,
  progressBarContainerStyle,
  progressBarStyle,
  insightBoxStyle,
  insightTitleStyle,
  insightTextStyle
} from '../../styles/CampaignDetailStyles';
import {
  generateEngagementData,
  generateDeviceData,
  generateTimeData,
  generateAudienceData,
  generatePerformanceMetrics,
  generateContentPerformance,
  generateEmailClientData
} from '../../utils/CampaignDetailData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CampaignDetailView = ({ 
  campaign, 
  onClose, 
  onImplement, 
  onModify, 
  onReject,
  activeTab: initialActiveTab = 'overview',
  setActiveTab: externalSetActiveTab = null
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  
  // ✅ NEW: Add MVP UI context
  const { isMVPMode } = useMVPUI();
  
  // Sync internal activeTab with prop
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);
  
  // ✅ NEW: Handle MVP mode - switch to overview if currently on performance tab
  useEffect(() => {
    if (isMVPMode && activeTab === 'performance') {
      handleTabChange('overview');
    }
  }, [isMVPMode, activeTab]);
  
  // Function to update active tab that also calls external setter if provided
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (externalSetActiveTab) {
      externalSetActiveTab(tab);
    }
  };
  
  // Generate data using utility functions
  const engagementData = generateEngagementData(campaign);
  const deviceData = generateDeviceData(campaign);
  const timeData = generateTimeData(campaign);
  const audienceData = generateAudienceData(campaign);
  const performanceMetrics = generatePerformanceMetrics(campaign);
  const contentPerformance = generateContentPerformance(campaign);
  const emailClientData = generateEmailClientData();
  
  // Enhanced recommendations with AI explanations
  const enhancedRecommendations = campaign.recommendations?.map(rec => ({
    ...rec,
    aiExplanation: generateAIExplanation(rec, campaign),
    estimatedRevenue: generateEstimatedRevenue(rec, campaign),
    timeToImplement: generateTimeToImplement(rec),
    confidenceScore: generateConfidenceScore(rec, campaign),
    prerequisites: generatePrerequisites(rec),
    successMetrics: generateSuccessMetrics(rec),
    risks: generateRisks(rec)
  })) || [];
  
  // Handle recommendation actions with null checks
  const handleImplementAction = (recommendation) => {
    if (onImplement && campaign) {
      setImplementedRecommendations(prev => new Set([...prev, recommendation.id]));
      onImplement(campaign, recommendation);
    }
  };
  
  const handleModifyAction = (recommendation) => {
    if (onModify && campaign) {
      onModify(campaign, recommendation);
    }
  };
  
  const handleRejectAction = (recommendation) => {
    if (onReject && campaign) {
      setRejectedRecommendations(prev => new Set([...prev, recommendation.id]));
      onReject(campaign, recommendation);
    }
  };

  // Bulk actions
  const handleBulkAction = async (action) => {
    setBulkActionLoading(true);
    const activeRecommendations = enhancedRecommendations.filter(
      rec => !implementedRecommendations.has(rec.id) && !rejectedRecommendations.has(rec.id)
    );

    for (const rec of activeRecommendations) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      if (action === 'implement') {
        handleImplementAction(rec);
      } else if (action === 'reject') {
        handleRejectAction(rec);
      }
    }
    
    setBulkActionLoading(false);
  };
  
  // If no campaign data is provided, show a loading message
  if (!campaign) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f7f8',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>Loading campaign details...</p>
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
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f7f8',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Modal Header */}
        <div style={modalHeaderStyle(campaign.needsAttention)}>
          <div style={modalHeaderContentStyle}>
            <div className="flex items-center">
              {campaign.needsAttention && (
                <AlertTriangle size={20} style={{ color: COLORS.red, marginRight: '0.75rem' }} />
              )}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
                  {campaign.title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {campaign.type} • {campaign.audience} • {campaign.status}
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
            
            {/* ✅ NEW: Only show performance tab if NOT in MVP mode */}
            {!isMVPMode && (
              <button onClick={() => handleTabChange('performance')} style={tabButtonStyle(activeTab === 'performance')}>
                Performance
              </button>
            )}
            
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
        
        {/* Modal Body - FIXED: Proper scrolling container */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem'
          }} className="tab-transition-container">
            {activeTab === 'overview' && (
              <div className="slide-in-left" key="overview">
                <OverviewTab 
                  campaign={campaign}
                  performanceMetrics={performanceMetrics}
                  engagementData={engagementData}
                  onImplement={handleImplementAction}
                  setActiveTab={handleTabChange}
                />
              </div>
            )}
            
            {/* ✅ NEW: Only show performance tab content if NOT in MVP mode */}
            {!isMVPMode && activeTab === 'performance' && (
              <div className="slide-in-up" key="performance">
                <PerformanceTab 
                  campaign={campaign}
                  performanceMetrics={performanceMetrics}
                  engagementData={engagementData}
                  audienceData={audienceData}
                  timeData={timeData}
                  deviceData={deviceData}
                  contentPerformance={contentPerformance}
                  emailClientData={emailClientData}
                />
              </div>
            )}
            
            {activeTab === 'recommendations' && (
              <div className="slide-in-right" key="recommendations">
                <EnhancedRecommendationsTab
                  campaign={campaign}
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
    </div>
  );
};

// Enhanced Recommendations Tab Component
const EnhancedRecommendationsTab = ({ 
  campaign,
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

  if (!recommendations || recommendations.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Brain size={64} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
          No AI Recommendations Available
        </h3>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          Our AI is analyzing your campaign. Check back in a few minutes for optimization suggestions.
        </p>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Recommendations Summary Header */}
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
                AI-Powered Optimization Recommendations
              </h3>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                Based on campaign performance data and industry benchmarks
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.evergreen, marginBottom: '0.25rem' }}>
                {recommendations.length}
              </p>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Total Recommendations</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.green, marginBottom: '0.25rem' }}>
                ${totalPotentialRevenue.toLocaleString()}
              </p>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Potential Revenue</p>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {activeRecommendations.length > 0 && (
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
                        {getRecommendationIcon(recommendation.type)}
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
                        </div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6, marginBottom: '1rem' }}>
                      {isExpanded ? recommendation.description : `${recommendation.description.substring(0, 120)}...`}
                    </p>

                    {/* Confidence Score */}
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
                        AI Analysis & Explanation
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
                        Potential Risks
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
                        onClick={() => onReject(recommendation)}
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
                        onClick={() => onModify(recommendation)}
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
                        onClick={() => onImplement(recommendation)}
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
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <Check size={16} />
                        Implement
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

// Keep existing OverviewTab and PerformanceTab components unchanged...
const OverviewTab = ({ campaign, performanceMetrics, engagementData, onImplement, setActiveTab }) => {
  const hasNoData = campaign.sent === 0 || campaign.status === 'Scheduled';
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Campaign Status Card */}
        <div style={campaign.needsAttention ? alertCardStyle() : cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>Campaign Status</h3>
            <div style={statusBadgeStyle(campaign.status)}>
              {campaign.status}
            </div>
          </div>
          
          {campaign.needsAttention && (
            <div style={insightBoxStyle(COLORS.red, 'rgba(244, 67, 54, 0.05)')}>
              <h4 style={insightTitleStyle}>Attention Required</h4>
              <p style={insightTextStyle}>{campaign.attentionReason}</p>
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p style={metricLabelStyle}>Campaign Type</p>
              <p style={metricValueStyle}>{campaign.type}</p>
            </div>
            <div>
              <p style={metricLabelStyle}>Target Audience</p>
              <p style={metricValueStyle}>{campaign.audience}</p>
            </div>
            <div>
              <p style={metricLabelStyle}>Total Budget</p>
              <p style={metricValueStyle}>${campaign.cost?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <p style={metricLabelStyle}>ROI</p>
              <p style={{
                ...metricValueStyle,
                color: hasNoData ? COLORS.onyxMedium : campaign.roi > 0 ? COLORS.green : COLORS.red
              }}>
                {hasNoData ? 'N/A' : `${campaign.roi}%`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Performance Overview */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Performance Overview
          </h3>
          
          {hasNoData ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Mail size={48} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                No Data Available
              </h4>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                Campaign {campaign.status === 'Scheduled' ? 'is scheduled to run' : 'has not been sent yet'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {performanceMetrics.map((metric, index) => (
                <div key={index} style={performanceMetricCardStyle(metric.bgColor)}>
                  <div style={metricHeaderStyle}>
                    <div style={metricIconStyle}>
                      {metric.icon}
                    </div>
                    <p style={metricLabelStyle}>{metric.label}</p>
                  </div>
                  <p style={metricValueStyle}>{metric.value}</p>
                  <p style={metricSubtextStyle}>{metric.subtext}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Engagement Trend */}
        {!hasNoData && (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Engagement Over Time
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="time" stroke={COLORS.onyxMedium} fontSize={12} />
                <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="opens" 
                  stroke={COLORS.blue} 
                  strokeWidth={2}
                  dot={{ fill: COLORS.blue, strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={{ fill: COLORS.evergreen, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Right Column - Quick Actions & Recommendations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Quick Actions */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Quick Actions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={quickActionButtonStyle('rgba(33, 150, 243, 0.1)', COLORS.blue)}>
              <Edit size={16} style={{ marginRight: '0.5rem' }} />
              Edit Campaign
            </button>
            
            <button style={quickActionButtonStyle('rgba(76, 175, 80, 0.1)', COLORS.green)}>
              <Target size={16} style={{ marginRight: '0.5rem' }} />
              Duplicate Campaign
            </button>
            
            <button style={quickActionButtonStyle('rgba(255, 193, 7, 0.1)', COLORS.yellow)}>
              <Calendar size={16} style={{ marginRight: '0.5rem' }} />
              Schedule Send
            </button>
          </div>
        </div>
        
        {/* Top Recommendations Preview */}
        {campaign.recommendations && campaign.recommendations.length > 0 && (
          <div style={cardStyle}>
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
            
            {campaign.recommendations.slice(0, 2).map((rec, index) => (
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
                  onClick={() => onImplement(rec)}
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
                  Quick Implement →
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
  campaign, 
  performanceMetrics, 
  engagementData, 
  audienceData, 
  timeData, 
  deviceData, 
  contentPerformance, 
  emailClientData 
}) => {
  const hasNoData = campaign.sent === 0 || campaign.status === 'Scheduled';
  
  if (hasNoData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <BarChart2 size={64} style={{ color: COLORS.onyxSoft, marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
          No Performance Data Available
        </h3>
        <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          Campaign {campaign.status === 'Scheduled' ? 'is scheduled to run' : 'has not been sent yet'}
        </p>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Performance Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {performanceMetrics.map((metric, index) => (
          <div key={index} style={performanceMetricCardStyle(metric.bgColor)}>
            <div style={metricHeaderStyle}>
              <div style={metricIconStyle}>
                {metric.icon}
              </div>
              <p style={metricLabelStyle}>{metric.label}</p>
            </div>
            <p style={metricValueStyle}>{metric.value}</p>
            <p style={metricSubtextStyle}>{metric.subtext}</p>
          </div>
        ))}
      </div>
      
      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Engagement Over Time */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Engagement Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="opens" stroke={COLORS.blue} strokeWidth={2} name="Opens" />
              <Line type="monotone" dataKey="clicks" stroke={COLORS.evergreen} strokeWidth={2} name="Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Device Breakdown */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Device Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Send Time Analysis */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Send Time Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="hour" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Bar dataKey="opens" fill={COLORS.blue} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Audience Segments */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Audience Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={audienceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="segment" stroke={COLORS.onyxMedium} fontSize={12} />
              <YAxis stroke={COLORS.onyxMedium} fontSize={12} />
              <Tooltip />
              <Bar dataKey="openRate" fill={COLORS.evergreen} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Helper functions for generating enhanced recommendation data
const generateAIExplanation = (rec, campaign) => {
  const explanations = {
    'optimization': `Based on analysis of ${campaign.sent?.toLocaleString() || 'your'} sent emails and current ${Math.round((campaign.opened / campaign.sent) * 100) || 'low'}% open rate, our AI identified key optimization opportunities. Machine learning models trained on similar campaigns show that implementing this recommendation typically results in 15-35% performance improvement within 2-3 weeks.`,
    'timing': `Time-series analysis of your campaign data reveals suboptimal send timing patterns. Our AI analyzed engagement patterns across different time zones and demographic segments to identify peak engagement windows. This recommendation is based on behavioral data from over 50,000 similar campaigns.`,
    'targeting': `Advanced segmentation analysis using RFM modeling and engagement scoring indicates opportunities to better align content with audience preferences. Our AI identified micro-segments with 2.3x higher engagement potential than your current broad targeting approach.`,
    'enhancement': `Content performance analysis using natural language processing and engagement correlation models suggests specific improvements. A/B testing data from similar campaigns shows these enhancements drive average conversion increases of 22-28%.`,
    'expansion': `Market opportunity analysis indicates untapped audience segments with high propensity to engage. Predictive modeling suggests expanding to these segments could increase your addressable market by 35% while maintaining current engagement quality.`
  };
  
  return explanations[rec.type] || explanations['optimization'];
};

const generateEstimatedRevenue = (rec, campaign) => {
  const baseRevenue = campaign.revenue || 10000;
  const multipliers = {
    'high': 0.25,
    'medium': 0.15,
    'low': 0.08
  };
  
  return Math.round(baseRevenue * (multipliers[rec.impact] || 0.15));
};

const generateTimeToImplement = (rec) => {
  const times = {
    'easy': '1-2 days',
    'medium': '3-5 days', 
    'hard': '1-2 weeks'
  };
  
  return times[rec.difficulty] || '3-5 days';
};

const generateConfidenceScore = (rec, campaign) => {
  const baseScore = 75;
  const impactBonus = { 'high': 15, 'medium': 10, 'low': 5 };
  const difficultyPenalty = { 'easy': 0, 'medium': -5, 'hard': -10 };
  
  return Math.min(95, Math.max(60, baseScore + (impactBonus[rec.impact] || 10) + (difficultyPenalty[rec.difficulty] || -5)));
};

const generatePrerequisites = (rec) => {
  const prerequisites = {
    'optimization': [
      'Access to email platform analytics',
      'A/B testing capabilities enabled',
      'Current campaign performance baseline'
    ],
    'timing': [
      'Historical send time data',
      'Audience timezone information',
      'Scheduling automation tools'
    ],
    'targeting': [
      'Customer segmentation data',
      'Engagement history by segment',
      'Dynamic content capabilities'
    ],
    'enhancement': [
      'Content management system access',
      'Design and copywriting resources',
      'Template modification permissions'
    ],
    'expansion': [
      'Expanded audience list',
      'Additional email sending capacity',
      'Compliance review for new segments'
    ]
  };
  
  return prerequisites[rec.type] || prerequisites['optimization'];
};

const generateSuccessMetrics = (rec) => {
  const metrics = {
    'optimization': [
      'Open rate increase of 15-25%',
      'Click-through rate improvement of 20-30%', 
      'Overall campaign ROI increase by 18%'
    ],
    'timing': [
      'Optimal send time identification',
      '22% improvement in engagement rates',
      'Reduced unsubscribe rate by 8%'
    ],
    'targeting': [
      'Segment-specific engagement lift of 35%',
      'Conversion rate increase of 25%',
      'Reduced email fatigue indicators'
    ],
    'enhancement': [
      'Content engagement score improvement',
      '28% increase in click-to-conversion rate',
      'Better brand sentiment scores'
    ],
    'expansion': [
      '35% increase in total reach',
      'Maintain or improve engagement quality',
      'Revenue growth of 25-40%'
    ]
  };
  
  return metrics[rec.type] || metrics['optimization'];
};

const generateRisks = (rec) => {
  const risks = {
    'optimization': [
      'Temporary performance dip during testing phase',
      'Requires careful monitoring of metrics'
    ],
    'timing': [
      'May not align with all audience segments',
      'Requires ongoing schedule optimization'
    ],
    'targeting': [
      'Potential decrease in overall reach',
      'Requires accurate segmentation data'
    ],
    'enhancement': [
      'Brand consistency must be maintained',
      'May require additional content resources'
    ],
    'expansion': [
      'Could dilute engagement if not executed properly',
      'Requires careful audience qualification'
    ]
  };
  
  return risks[rec.type] || [];
};

const getRecommendationIcon = (type) => {
  const icons = {
    'optimization': <TrendingUp size={16} style={{ color: COLORS.green }} />,
    'timing': <Clock size={16} style={{ color: COLORS.blue }} />,
    'targeting': <Target size={16} style={{ color: COLORS.yellow }} />,
    'enhancement': <Lightbulb size={16} style={{ color: COLORS.evergreen }} />,
    'expansion': <Activity size={16} style={{ color: COLORS.red }} />
  };
  
  return icons[type] || <Lightbulb size={16} style={{ color: COLORS.evergreen }} />;
};

export default CampaignDetailView;
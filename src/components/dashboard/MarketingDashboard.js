// src/components/dashboard/MarketingDashboard.js
import React, { useState } from 'react';
import { 
  Play, Pause, AlertTriangle, TrendingUp, DollarSign, Target, 
  Calendar, Users, Award, Settings, ChevronRight, Plus, Filter,
  BarChart3, PieChart, Clock, CheckCircle, AlertCircle, XCircle,
  Activity, Zap, Eye, MessageSquare
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import AIPromptBar from '../common/AIPromptBar';
import '../../styles/MarketingDashboard.css';

const MarketingDashboard = ({ 
  aiState, 
  aiHandlers, 
  contextualPrompts = [], 
  placeholderText = "Ask me about your marketing performance, campaign optimization, or budget allocation...",
  onCampaignClick,
  onProgramClick 
}) => {
  // ✅ Use SHARED AI state from App.js
  const {
    isAIMinimized,
    aiResponse,
    lastQuestion,
    showAIResponse
  } = aiState || {};

  const {
    handleAIPromptSubmit,
    handleAIPromptClick,
    handleClearAIResponse,
    setIsAIMinimized
  } = aiHandlers || {};

  // Marketing-specific prompts
  const marketingPrompts = [
    "Which campaigns should I pause or optimize?",
    "What's my budget utilization vs target?",
    "Which loyalty programs need attention?",
    "What campaigns should I launch next?",
    "How can I improve my lowest performing campaign?",
    "What's my ROI across all active campaigns?",
    "Which customer segments are most profitable?",
    "What's my cost per acquisition by channel?",
    "How are my seasonal campaigns performing?",
    "What budget should I allocate to top performers?",
    "Which programs have the best engagement rates?",
    "What campaigns need immediate action today?"
  ];

  // Sample data - Marketing focused
  const marketingKpiData = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2",
      changeLabel: "this week",
      icon: "Play",
      iconBg: "rgba(33, 150, 243, 0.15)",
      iconColor: "#2196F3",
      changeColor: COLORS.green,
      onClick: () => handleDrillDown('active-campaigns')
    },
    {
      title: "Campaign ROI",
      value: "287%",
      change: "+23%",
      changeLabel: "vs last month",
      icon: "TrendingUp", 
      iconBg: "rgba(76, 175, 80, 0.15)",
      iconColor: "#4CAF50",
      changeColor: COLORS.green,
      onClick: () => handleDrillDown('campaign-roi')
    },
    {
      title: "Program Performance", 
      value: "4.2%",
      change: "-0.8%",
      changeLabel: "redemption rate",
      icon: "Award",
      iconBg: "rgba(255, 193, 7, 0.15)", 
      iconColor: "#FFC107",
      changeColor: COLORS.red,
      needsAttention: true,
      onClick: () => handleDrillDown('program-performance')
    },
    {
      title: "Budget Utilization",
      value: "68%",
      change: "$341K",
      changeLabel: "of $500K total",
      icon: "DollarSign",
      iconBg: "rgba(156, 39, 176, 0.15)",
      iconColor: "#9C27B0", 
      changeColor: COLORS.onyxMedium,
      onClick: () => handleDrillDown('budget-utilization')
    },
    {
      title: "Pipeline Health",
      value: "3",
      change: "Need Attention",
      changeLabel: "require action",
      icon: "AlertTriangle",
      iconBg: "rgba(244, 67, 54, 0.15)",
      iconColor: "#F44336",
      changeColor: COLORS.red,
      needsAttention: true,
      onClick: () => handleDrillDown('pipeline-health')
    }
  ];

  // Campaign performance matrix data - based on actual campaign data
  const campaignPerformanceData = [
    { name: "Winter Gear Sale", roi: 1001, budget: 12.5, status: "active", size: 45892, sent: 45892, revenue: 137640 },
    { name: "Summit Welcome", roi: 1777, budget: 5.0, status: "active", size: 3254, sent: 3254, revenue: 93840 },
    { name: "Spring Newsletter", roi: 68, budget: 7.5, status: "needs-attention", size: 52450, sent: 52450, revenue: 12600 },
    { name: "Summer Essentials", roi: 207, budget: 10.5, status: "active", size: 28750, sent: 28750, revenue: 32250 },
    { name: "Hiking Collection", roi: 0, budget: 8.5, status: "scheduled", size: 0, sent: 0, revenue: 0 }
  ];

  // Program ROI ranking data - based on actual program data
  const programRoiData = [
    { name: "Birthday Rewards", roi: 717, participants: 4578, status: "excellent", revenue: 412800, cost: 50500 },
    { name: "Double Points Weekend", roi: 400, participants: 12463, status: "good", revenue: 542000, cost: 108400 },
    { name: "Refer-a-Friend", roi: 207, participants: 2134, status: "good", revenue: 170625, cost: 55600 },
    { name: "First Purchase Bonus", roi: 155, participants: 1835, status: "fair", revenue: 18720, cost: 7350 },
    { name: "Summer Bundle", roi: 48, participants: 3827, status: "poor", revenue: 28050, cost: 18900 },
    { name: "Anniversary Bonus", roi: -50, participants: 8923, status: "critical", revenue: 22250, cost: 44615 }
  ];

  // Marketing calendar data
  const upcomingItems = [
    { 
      title: "Holiday Campaign Launch", 
      date: "Dec 1", 
      type: "campaign", 
      status: "ready",
      daysUntil: 3
    },
    { 
      title: "Q4 Budget Review", 
      date: "Dec 5", 
      type: "budget", 
      status: "pending",
      daysUntil: 7
    },
    { 
      title: "Winter Program Renewal", 
      date: "Dec 15", 
      type: "program", 
      status: "needs-review",
      daysUntil: 17
    }
  ];

  // ✅ ENHANCED: Action items with complete campaign/program data for detail modals
  const actionItems = [
    {
      id: 4, // Match campaign ID for detail modal
      title: "Spring Newsletter underperforming",
      description: "10% open rate, 60% below benchmark",
      urgency: "high",
      type: "campaign",
      action: "optimize",
      // ✅ COMPLETE CAMPAIGN DATA for detail modal
      campaignData: {
        id: 4,
        title: "Spring Adventure Newsletter",
        type: "Informational",
        status: "Active",
        audience: "All Members",
        sent: 52450,
        opened: 5245,
        conversion: 420,
        revenue: 12600,
        cost: 7500,
        roi: 68,
        needsAttention: true,
        attentionReason: "Extremely low open rate (10%)",
        recommendations: [
          {
            id: "rec-c4-1",
            title: "AI-Driven Content Personalization Engine",
            description: "Implement a sophisticated content personalization system using natural language processing and member behavior analysis. The AI engine dynamically assembles newsletter content based on individual interests, past engagement patterns, and predictive modeling. Testing shows this approach can increase open rates by 156% and click-through rates by 89% through hyper-relevant content delivery.",
            difficulty: "hard",
            impact: "high",
            type: "optimization"
          },
          {
            id: "rec-c4-2",
            title: "Circadian Rhythm-Based Send Time Optimization",
            description: "Deploy machine learning algorithms that analyze individual member activity patterns to determine optimal send times based on their digital behavior circadian rhythms. This goes beyond simple timezone optimization to consider personal email checking habits, work schedules, and engagement patterns. Can improve open rates by 45-67% through precision timing.",
            difficulty: "medium",
            impact: "high",
            type: "timing"
          }
        ]
      }
    },
    {
      id: 5, // Match program ID for detail modal  
      title: "Summer Bundle program has negative ROI", 
      description: "4.9% redemption rate, -6% ROI",
      urgency: "high", 
      type: "program",
      action: "restructure",
      // ✅ COMPLETE PROGRAM DATA for detail modal
      programData: {
        id: 4,
        title: "Summer Outdoor Bundle",
        type: "Purchase Incentive",
        status: "Active",
        audience: "All Tiers",
        participants: 3827,
        pointsIssued: 382700,
        redemptions: 187,
        redemptionRate: 4.9,
        retentionRate: 68,
        repeatPurchaseRate: 32,
        avgOrderValue: 150,
        revenue: 28050,
        cost: 18900,
        roi: 48,
        needsAttention: true,
        attentionReason: "Low redemption rate (4.9%)",
        recommendations: [
          {
            id: "rec-p4-1",
            title: "Cognitive Load Reduction & UX Optimization",
            description: "Implement comprehensive user experience optimization using behavioral psychology principles and A/B testing. Includes simplified redemption flows, progress visualization, clear value communication, and anxiety-reducing design elements. UX research shows that reducing cognitive load in loyalty programs can increase redemption rates by 340% while improving member satisfaction.",
            difficulty: "medium",
            impact: "high",
            type: "optimization"
          },
          {
            id: "rec-p4-2",
            title: "Dynamic Point Value Communication System",
            description: "Deploy real-time point value visualization that shows members exactly what their points are worth in dollars, products, and experiences. Includes gamified progress tracking, milestone celebrations, and personalized value demonstrations. Transparency in point value increases redemption likelihood by 156% and program trust by 78%.",
            difficulty: "easy",
            impact: "high",
            type: "enhancement"
          }
        ]
      }
    }
  ];

  // Marketing insights data for the new hero block - true narrative insights
  const marketingInsights = {
    headline: "Marketing Performance Highlights",
    summary: "Your campaigns are performing exceptionally well this month, with several standout successes worth noting and a couple areas that need your attention.",
    keyInsights: [
      {
        type: "success",
        title: "Winter Gear Sale is a breakout hit",
        description: "Generating 10x ROI with 45K+ customers reached. This seasonal approach is clearly resonating with your audience."
      },
      {
        type: "opportunity", 
        title: "Spring Newsletter needs immediate attention",
        description: "Open rates have dropped to 10% - well below your usual 24% benchmark. Worth investigating send times and subject lines."
      },
      {
        type: "trend",
        title: "Summit tier customers driving outsized returns",
        description: "Your premium segment continues to show 3.2x higher lifetime value. Consider expanding VIP-focused campaigns."
      }
    ],
    quickActions: [
      { label: "Analyze Top Performers", action: "top-performers" },
      { label: "Fix Underperformers", action: "optimize" },
      { label: "Review Budget Allocation", action: "budget" }
    ]
  };

  // Handle drill-down navigation
  const handleDrillDown = (section) => {
    console.log('Marketing drill-down:', section);
    // This will be connected to detail modals later
  };

  // ✅ ENHANCED: Handle action item clicks to open detail modals with better error handling
  const handleActionItemClick = (item) => {
    console.log('🔥 ACTION ITEM CLICKED:', item);
    console.log('🔥 Available handlers:', { onCampaignClick: !!onCampaignClick, onProgramClick: !!onProgramClick });
    
    if (item.type === 'campaign' && onCampaignClick && item.campaignData) {
      console.log('🚀 Opening campaign detail modal for:', item.campaignData.title);
      onCampaignClick(item.campaignData);
    } else if (item.type === 'program' && onProgramClick && item.programData) {
      console.log('🚀 Opening program detail modal for:', item.programData.title);
      onProgramClick(item.programData);
    } else {
      console.warn('⚠️ Missing handler or data:', {
        type: item.type,
        hasCampaignClick: !!onCampaignClick,
        hasProgramClick: !!onProgramClick,
        hasCampaignData: !!item.campaignData,
        hasProgramData: !!item.programData
      });
      // Fallback to generic drill down
      handleDrillDown(`action-${item.type}`);
    }
  };

  // Handle campaign/program actions
  const handleCampaignAction = (campaign, action) => {
    console.log('Campaign action:', action, campaign);
  };

  const handleProgramAction = (program, action) => {
    console.log('Program action:', action, program);
  };

  // Handle insights quick actions
  const handleInsightsAction = (action) => {
    console.log('Insights action:', action);
    // These can trigger AI prompts or navigate to specific views
    if (handleAIPromptSubmit) {
      switch (action) {
        case 'top-performers':
          handleAIPromptSubmit("Analyze my top performing campaigns and what makes them successful");
          break;
        case 'optimize':
          handleAIPromptSubmit("Which campaigns should I pause or optimize for better performance?");
          break;
        case 'budget':
          handleAIPromptSubmit("How should I reallocate my marketing budget based on current performance?");
          break;
        default:
          break;
      }
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return COLORS.green;
      case 'good': return COLORS.blue;
      case 'fair': return COLORS.yellow;
      case 'poor': return COLORS.red;
      case 'critical': return COLORS.red;
      case 'active': return COLORS.green;
      case 'scheduled': return COLORS.blue;
      case 'needs-attention': return COLORS.red;
      default: return COLORS.onyxMedium;
    }
  };

  return (
    <div className="space-y-6">
      {/* ✅ AI Assistant Prompt Bar */}
      {aiHandlers && (
        <AIPromptBar
          onSubmit={handleAIPromptSubmit}
          isMinimized={isAIMinimized}
          onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
          placeholderText={placeholderText}
          suggestedPrompts={contextualPrompts.length > 0 ? contextualPrompts : marketingPrompts}
        />
      )}

      {/* Marketing KPI Cards - Fixed Alignment */}
      <div className="marketing-kpi-grid mb-6">
        {marketingKpiData.map((kpi, index) => {
          const IconComponent = kpi.icon === 'Play' ? Play :
                              kpi.icon === 'TrendingUp' ? TrendingUp :
                              kpi.icon === 'Award' ? Award :
                              kpi.icon === 'DollarSign' ? DollarSign :
                              kpi.icon === 'AlertTriangle' ? AlertTriangle : Target;
          
          return (
            <div 
              key={index}
              className={`marketing-kpi-card ${kpi.needsAttention ? 'kpi-needs-attention' : ''}`}
              onClick={kpi.onClick}
            >
              <div className="marketing-kpi-content">
                <div 
                  className="marketing-kpi-icon"
                  style={{ 
                    backgroundColor: kpi.iconBg,
                    color: kpi.iconColor 
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div className="marketing-kpi-text">
                  <div className="marketing-kpi-label">{kpi.title}</div>
                  <div className="marketing-kpi-value">{kpi.value}</div>
                  <div className="marketing-kpi-change">
                    <span 
                      className={`marketing-kpi-change-indicator ${kpi.changeColor === COLORS.green ? 'positive' : 'negative'}`}
                      style={{ color: kpi.changeColor }}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <div className="marketing-kpi-secondary">{kpi.changeLabel}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero Insights Block + Action Items Row */}
      <div className="marketing-insights-row">
        
        {/* Marketing Insights Hero Block */}
        <div className="marketing-insights-hero">
          <div className="insights-hero-content">
            <div className="insights-hero-header">
              <div className="insights-hero-icon">
                <Activity size={20} color="white" />
              </div>
              <div className="insights-hero-title">
                <h2>{marketingInsights.headline}</h2>
                <p>{marketingInsights.summary}</p>
              </div>
            </div>
            
            <div className="insights-narrative-section">
              {marketingInsights.keyInsights.map((insight, index) => (
                <div key={index} className={`insight-item insight-${insight.type}`}>
                  <div className="insight-indicator">
                    {insight.type === 'success' && <CheckCircle size={16} />}
                    {insight.type === 'opportunity' && <AlertCircle size={16} />}
                    {insight.type === 'trend' && <TrendingUp size={16} />}
                  </div>
                  <div className="insight-content">
                    <h4>{insight.title}</h4>
                    <p>{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="insights-hero-actions">
              {marketingInsights.quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="insights-action-btn"
                  onClick={() => handleInsightsAction(action.action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Action Items */}
        <div className="marketing-action-items-compact">
          <div className="action-items-header">
            <AlertCircle size={18} color={COLORS.red} />
            <h3>Needs Attention</h3>
            <span className="action-count">{actionItems.length}</span>
          </div>
          
          <div className="action-items-list">
            {actionItems.map((item, index) => (
              <div 
                key={index}
                className="compact-action-item"
                onClick={() => handleActionItemClick(item)}
              >
                <div className="action-item-header">
                  <h4>{item.title}</h4>
                  <span className={`urgency-badge ${item.urgency}`}>
                    {item.urgency === 'high' ? 'High' : 'Medium'}
                  </span>
                </div>
                <p className="action-item-description">{item.description}</p>
                <button className="action-item-btn">
                  {item.action === 'optimize' ? 'Optimize' :
                   item.action === 'restructure' ? 'Review' :
                   'Take Action'}
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="view-all-actions"
            onClick={() => handleDrillDown('all-actions')}
          >
            View All Issues
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Marketing Command Center - Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Campaign Performance Matrix */}
        <div className="overview-card">
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', fontSize: '1rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.87)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Campaign Performance Matrix</span>
              <button 
                onClick={() => handleDrillDown('campaign-matrix')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '0.875rem', 
                  color: COLORS.evergreen,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                View All <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: '0.5rem 1rem 1rem', position: 'relative' }}>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart data={campaignPerformanceData} margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="budget" 
                  name="Budget"
                  tick={{ fontSize: 11, fill: COLORS.onyxMedium }}
                  label={{ value: 'Budget ($K)', position: 'insideBottom', offset: -10, style: { fontSize: '11px', fill: COLORS.onyxMedium } }}
                />
                <YAxis 
                  dataKey="roi" 
                  name="ROI"
                  tick={{ fontSize: 11, fill: COLORS.onyxMedium }}
                  label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft', style: { fontSize: '11px', fill: COLORS.onyxMedium } }}
                />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'ROI') return [`${value}%`, 'ROI'];
                    if (name === 'Budget') return [`$${value}K`, 'Budget'];
                    return [value, name];
                  }}
                  labelFormatter={(value, payload) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.name;
                    }
                    return '';
                  }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                />
                <Scatter 
                  dataKey="roi" 
                  fill={(entry) => {
                    switch (entry?.status) {
                      case 'active': return COLORS.green;
                      case 'scheduled': return COLORS.blue;
                      case 'needs-attention': return COLORS.red;
                      default: return COLORS.onyxMedium;
                    }
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Program ROI Ranking */}
        <div className="overview-card">
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', fontSize: '1rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.87)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Program ROI Ranking</span>
              <button 
                onClick={() => handleDrillDown('program-roi')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '0.875rem', 
                  color: COLORS.evergreen,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                View All <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </button>
            </div>
          </div>
          <div style={{ padding: '1rem', height: '220px', overflowY: 'auto' }}>
            {programRoiData.map((program, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => handleProgramAction(program, 'view')}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.02)'}
              >
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                    {program.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                    {program.participants.toLocaleString()} participants
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: getStatusColor(program.status)
                  }}>
                    {program.roi > 0 ? '+' : ''}{program.roi}%
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: getStatusColor(program.status),
                    textTransform: 'capitalize'
                  }}>
                    {program.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Calendar & Upcoming Items */}
      <div className="overview-card" style={{ height: 'auto' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', fontSize: '1rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.87)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Marketing Calendar & Pipeline</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.8125rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                <Calendar size={14} style={{ marginRight: '0.5rem' }} />
                This Month
              </button>
              <button 
                onClick={() => handleDrillDown('calendar')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '0.875rem', 
                  color: COLORS.evergreen,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                View Calendar <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {upcomingItems.map((item, index) => (
            <div 
              key={index}
              style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
              onClick={() => handleDrillDown(`calendar-${item.type}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                  {item.title}
                </h4>
                <span style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: item.status === 'ready' ? 'rgba(76, 175, 80, 0.1)' : 
                                 item.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' : 
                                 'rgba(244, 67, 54, 0.1)',
                  color: item.status === 'ready' ? COLORS.green : 
                         item.status === 'pending' ? COLORS.yellow : 
                         COLORS.red
                }}>
                  {item.status === 'ready' ? 'Ready' : 
                   item.status === 'pending' ? 'Pending' : 
                   'Needs Review'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  {item.date} • {item.type}
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.evergreen, fontWeight: 500 }}>
                  {item.daysUntil} days
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
// src/components/dashboard/NarrativeMarketingDashboard.js
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  ArrowRight, Zap, Target, Users, DollarSign, Mail,
  Award, Calendar, Eye, MousePointer, MessageSquare
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import AIPromptBar from '../common/AIPromptBar';
import '../../styles/NarrativeMarketing.css';

const NarrativeMarketingDashboard = ({ 
  aiState, 
  aiHandlers, 
  contextualPrompts = [], 
  placeholderText = "Ask me about your campaign performance or what you should focus on next...",
  onCampaignClick,
  onProgramClick,
  onViewAllCampaigns,
  onRevenueClick
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

  // Narrative-focused prompts for non-technical marketers
  const narrativePrompts = [
    "What campaigns should I focus on this week?",
    "Which campaigns are my biggest wins right now?",
    "What's going wrong with my underperforming campaigns?",
    "How can I quickly improve my worst campaign?",
    "What should I tell my boss about this month's performance?",
    "Which customers should I be targeting more?",
    "What's the easiest way to boost my results?",
    "How do I fix my low engagement rates?",
    "What campaigns should I pause or stop?",
    "Where should I spend more budget for better results?",
    "What trends should I be worried about?",
    "How can I replicate my most successful campaign?"
  ];

  // Campaign performance narrative data with complete campaign objects for modals
  const campaignStories = [
    {
      id: 4, // Spring Adventure Newsletter
      title: "Spring Adventure Newsletter",
      status: "needs-urgent-attention",
      headline: "Your Newsletter Needs Immediate Attention",
      summary: "This campaign is significantly underperforming and affecting your overall email reputation.",
      keyMetric: "10%",
      metricLabel: "Open Rate",
      benchmark: "24%",
      impact: "negative",
      priority: "high",
      quickFix: "Change subject lines and send time",
      aiPrompt: "How can I quickly improve my newsletter open rates?",
      // Complete campaign data for detail modal
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
            description: "Implement a sophisticated content personalization system using natural language processing and member behavior analysis.",
            difficulty: "hard",
            impact: "high",
            type: "optimization"
          }
        ]
      }
    },
    {
      id: 1, // Winter Gear Sale
      title: "Winter Gear Sale",
      status: "star-performer",
      headline: "Your Winter Campaign is a Massive Success",
      summary: "This campaign is your top performer and should be your template for future seasonal campaigns.",
      keyMetric: "1001%",
      metricLabel: "ROI",
      benchmark: "300%",
      impact: "positive",
      priority: "maintain",
      quickFix: "Extend the campaign duration",
      aiPrompt: "How can I replicate this successful campaign for other seasons?",
      // Complete campaign data for detail modal
      campaignData: {
        id: 1,
        title: "Winter Gear Sale",
        type: "Promotional",
        status: "Active",
        audience: "All Members",
        sent: 45892,
        opened: 18357,
        conversion: 2294,
        revenue: 137640,
        cost: 12500,
        roi: 1001,
        needsAttention: false,
        recommendations: [
          {
            id: "rec-c1-1",
            title: "Dynamic Subject Line Optimization with Weather API",
            description: "Implement real-time weather-based subject line personalization using machine learning algorithms.",
            difficulty: "medium",
            impact: "high",
            type: "optimization"
          }
        ]
      }
    },
    {
      id: 5, // Summer Camping
      title: "Summer Camping Essentials",
      status: "moderate-performer",
      headline: "Summer Campaign Shows Promise",
      summary: "This campaign is performing adequately but has room for improvement with some optimization.",
      keyMetric: "207%",
      metricLabel: "ROI",
      benchmark: "300%",
      impact: "neutral",
      priority: "optimize",
      quickFix: "Improve product recommendations",
      aiPrompt: "How can I boost the ROI of my summer campaign?",
      // Complete campaign data for detail modal
      campaignData: {
        id: 5,
        title: "Summer Camping Essentials",
        type: "Promotional",
        status: "Active",
        audience: "Outdoor Enthusiasts",
        sent: 28750,
        opened: 4312,
        conversion: 215,
        revenue: 32250,
        cost: 10500,
        roi: 207,
        needsAttention: false,
        recommendations: [
          {
            id: "rec-c5-1",
            title: "Smart Bundle Recommendation Algorithm",
            description: "Deploy advanced market basket analysis and collaborative filtering to create intelligent product bundles.",
            difficulty: "hard",
            impact: "high",
            type: "enhancement"
          }
        ]
      }
    }
  ];

  // Key insights with actionable recommendations
  const keyInsights = [
    {
      type: "urgent",
      icon: AlertTriangle,
      headline: "Newsletter Crisis Needs Immediate Action",
      insight: "Your Spring Adventure Newsletter has a 10% open rate — that's 60% below industry standards. This is hurting your sender reputation and could affect all your email campaigns.",
      action: "Switch to personalized subject lines and test different send times this week",
      timeframe: "This Week",
      difficulty: "Easy",
      aiPrompt: "What's the fastest way to fix my newsletter open rates?"
    },
    {
      type: "opportunity", 
      icon: TrendingUp,
      headline: "Winter Campaign Success Formula",
      insight: "Your Winter Gear Sale achieved 1001% ROI — more than 3x your typical performance. The combination of seasonal timing, weather-based messaging, and premium audience targeting is your winning formula.",
      action: "Apply this seasonal approach to your upcoming spring and summer campaigns",
      timeframe: "Next Month",
      difficulty: "Medium", 
      aiPrompt: "How can I replicate my winter campaign success for other seasons?"
    },
    {
      type: "warning",
      icon: Users,
      headline: "Customer Engagement Patterns Shifting",
      insight: "Your best customers are engaging 35% more on mobile, but your email designs aren't optimized for mobile viewing. You're missing engagement opportunities.",
      action: "Redesign your email templates with mobile-first approach",
      timeframe: "Next 2 Weeks",
      difficulty: "Medium",
      aiPrompt: "How should I optimize my campaigns for mobile engagement?"
    }
  ];

  // Handle campaign story click to open detail modal
  const handleStoryClick = (story) => {
    if (onCampaignClick && story.campaignData) {
      console.log('🚀 Opening campaign detail for:', story.campaignData.title);
      onCampaignClick(story.campaignData);
    }
  };

  // Handle insight action click
  const handleInsightAction = (insight) => {
    if (handleAIPromptSubmit) {
      handleAIPromptSubmit(insight.aiPrompt);
    }
  };

  // Get status styling - simplified without heavy borders
  const getStatusStyling = (status) => {
    switch (status) {
      case 'star-performer':
        return {
          iconColor: '#4CAF50',
          icon: TrendingUp
        };
      case 'needs-urgent-attention':
        return {
          iconColor: '#F44336',
          icon: AlertTriangle
        };
      case 'moderate-performer':
        return {
          iconColor: '#FFC107',
          icon: Target
        };
      default:
        return {
          iconColor: COLORS.onyxMedium,
          icon: Target
        };
    }
  };

  return (
    <div className="narrative-marketing-dashboard">
      {/* ✅ AI Assistant Prompt Bar */}
      {aiHandlers && (
        <AIPromptBar
          onSubmit={handleAIPromptSubmit}
          isMinimized={isAIMinimized}
          onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
          placeholderText={placeholderText}
          suggestedPrompts={contextualPrompts.length > 0 ? contextualPrompts : narrativePrompts}
        />
      )}

      {/* Executive Summary Section */}
      <div className="narrative-hero-section">
        <div className="narrative-hero-content">
          <h1 className="narrative-main-headline">
            Your Marketing Performance Overview
          </h1>
          <p className="narrative-main-subheading">
            Here's what's happening with your campaigns and what you should focus on next
          </p>
          
          <div className="narrative-summary-stats">
            <div 
              className="narrative-stat-item narrative-stat-clickable"
              onClick={() => onRevenueClick && onRevenueClick()}
            >
              <div className="narrative-stat-value success">$3.24M</div>
              <div className="narrative-stat-label">Total Revenue</div>
              <div className="narrative-stat-change positive">+12.7% vs last month</div>
            </div>
            <div 
              className="narrative-stat-item narrative-stat-clickable"
              onClick={() => onViewAllCampaigns && onViewAllCampaigns()}
            >
              <div className="narrative-stat-value">12</div>
              <div className="narrative-stat-label">Active Campaigns</div>
              <div className="narrative-stat-change neutral">3 need attention</div>
            </div>
            <div className="narrative-stat-item">
              <div className="narrative-stat-value warning">287%</div>
              <div className="narrative-stat-label">Average ROI</div>
              <div className="narrative-stat-change positive">Above 200% target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section - Moved under hero */}
      <div className="narrative-actions-section">
        <h2 className="narrative-section-title">
          Quick Actions You Can Take Today
        </h2>
        
        <div className="narrative-quick-actions-grid">
          <button 
            className="narrative-quick-action-card"
            onClick={() => handleAIPromptSubmit("What campaigns should I pause to improve my overall performance?")}
          >
            <div className="narrative-action-icon pause">
              <AlertTriangle size={20} />
            </div>
            <div className="narrative-action-content">
              <h4>Pause Underperformers</h4>
              <p>Stop campaigns that are hurting your metrics</p>
            </div>
          </button>

          <button 
            className="narrative-quick-action-card"
            onClick={() => handleAIPromptSubmit("How can I quickly boost engagement on my best performing campaigns?")}
          >
            <div className="narrative-action-icon boost">
              <TrendingUp size={20} />
            </div>
            <div className="narrative-action-content">
              <h4>Boost Top Performers</h4>
              <p>Double down on what's working well</p>
            </div>
          </button>

          <button 
            className="narrative-quick-action-card"
            onClick={() => handleAIPromptSubmit("What budget changes should I make based on current performance?")}
          >
            <div className="narrative-action-icon budget">
              <DollarSign size={20} />
            </div>
            <div className="narrative-action-content">
              <h4>Optimize Budget</h4>
              <p>Reallocate spend for better ROI</p>
            </div>
          </button>

          <button 
            className="narrative-quick-action-card"
            onClick={() => handleAIPromptSubmit("Show me a summary I can share with my manager about this month's performance")}
          >
            <div className="narrative-action-icon report">
              <Eye size={20} />
            </div>
            <div className="narrative-action-content">
              <h4>Create Report</h4>
              <p>Get a summary for your manager</p>
            </div>
          </button>
        </div>
      </div>

      {/* Campaign Performance Section */}
      <div className="narrative-campaigns-section">
        <h2 className="narrative-section-title">
          Campaign Performance Highlights
        </h2>
        <p className="narrative-section-subtitle">
          Here's how each of your key campaigns is performing and what you should do about it
        </p>

        <div className="narrative-campaign-grid">
          {campaignStories.map((story, index) => {
            const styling = getStatusStyling(story.status);
            const StatusIcon = styling.icon;
            
            return (
              <div 
                key={story.id}
                className="narrative-story-card"
                onClick={() => handleStoryClick(story)}
              >
                <div className="narrative-story-header">
                  <div className="narrative-story-icon" style={{ color: styling.iconColor }}>
                    <StatusIcon size={24} />
                  </div>
                  <div className="narrative-story-title-area">
                    <h3 className="narrative-story-headline">{story.headline}</h3>
                    <p className="narrative-story-campaign-name">{story.title}</p>
                  </div>
                </div>

                <div className="narrative-story-content">
                  <p className="narrative-story-summary">{story.summary}</p>
                  
                  <div className="narrative-story-metrics">
                    <div className="narrative-story-key-metric">
                      <span className="narrative-metric-value" style={{ color: styling.iconColor }}>
                        {story.keyMetric}
                      </span>
                      <span className="narrative-metric-label">{story.metricLabel}</span>
                      {story.benchmark && (
                        <span className="narrative-metric-benchmark">
                          vs {story.benchmark} benchmark
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="narrative-story-actions">
                    <div className="narrative-quick-fix">
                      <strong>Quick Fix:</strong> {story.quickFix}
                    </div>
                    <button 
                      className="narrative-ai-prompt-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAIPromptSubmit(story.aiPrompt);
                      }}
                    >
                      <Zap size={14} />
                      Ask AI: "{story.aiPrompt}"
                    </button>
                  </div>
                </div>

                <div className="narrative-story-footer">
                  <span className="narrative-view-details">
                    Click to view full campaign details <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights & Recommendations */}
      <div className="narrative-insights-section">
        <h2 className="narrative-section-title">
          Key Insights & Recommendations
        </h2>
        <p className="narrative-section-subtitle">
          The most important patterns we've identified and your action plan
        </p>

        <div className="narrative-insights-grid">
          {keyInsights.map((insight, index) => {
            const InsightIcon = insight.icon;
            
            return (
              <div 
                key={index}
                className="narrative-insight-card"
              >
                <div className="narrative-insight-header">
                  <div className="narrative-insight-icon">
                    <InsightIcon size={28} />
                  </div>
                  <div className="narrative-insight-meta">
                    <div className="narrative-insight-priority">
                      {insight.type === 'urgent' ? 'URGENT' : 
                       insight.type === 'opportunity' ? 'OPPORTUNITY' : 'ATTENTION NEEDED'}
                    </div>
                    <h3 className="narrative-insight-headline">{insight.headline}</h3>
                  </div>
                </div>

                <div className="narrative-insight-content">
                  <p className="narrative-insight-text">{insight.insight}</p>
                  
                  <div className="narrative-insight-action-plan">
                    <h4 className="narrative-action-title">What You Should Do:</h4>
                    <p className="narrative-action-text">{insight.action}</p>
                    
                    <div className="narrative-action-meta">
                      <span className="narrative-timeframe">
                        <Calendar size={14} />
                        {insight.timeframe}
                      </span>
                      <span className="narrative-difficulty">
                        <Target size={14} />
                        {insight.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="narrative-insight-footer">
                  <button 
                    className="narrative-insight-action-btn"
                    onClick={() => handleInsightAction(insight)}
                  >
                    <MessageSquare size={16} />
                    Get AI Help: "{insight.aiPrompt}"
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NarrativeMarketingDashboard;
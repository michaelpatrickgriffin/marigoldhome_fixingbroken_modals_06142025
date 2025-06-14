// Complete App.js with Enhanced Error Handling and Unified Insights and Recommendations

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ActionBarWithCopilot from './components/layout/ActionBarWithCopilot';
// Temporarily use detail view instead of enhanced detail view until we finish AI integration
import DetailView from './components/common/DetailView';
// import EnhancedDetailView from './components/common/EnhancedDetailView';
import { ActionModal, FeedbackModal } from './components/common/ActionModals';
import { KpiCards, RevenueChart, MembershipChart, CampaignPerformanceChart } from './components/dashboard/DashboardComponents';
import { ProgramList, ProgramModal } from './components/loyalty/ProgramList';
import { CampaignList, CampaignModal } from './components/campaigns/CampaignList';
import NotificationPanel from './components/layout/NotificationPanel';
import ProfilePanel from './components/layout/ProfilePanel';
import KpiAnalyticsModal from './components/analytics/KpiAnalyticsModal';
import { COLORS, darkMeshGradient } from './styles/ColorStyles';
import SplitCampaignCreationModal from './components/campaigns/SplitCampaignCreationModal';
import CampaignSuccessToast from './components/feedback/CampaignSuccessToast';
import RFMDashboard from './components/dashboard/RFMDashboard';
import RFMInfoCard from './components/dashboard/RFMInfoCard';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import DashboardKpiCards from './components/dashboard/DashboardKpiCards';
import MarketingDashboard from './components/dashboard/MarketingDashboard';
import NarrativeMarketingDashboard from './components/dashboard/NarrativeMarketingDashboard';
import UnifiedInsightsAndRecommendations from './components/dashboard/UnifiedInsightsAndRecommendations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles/DashboardToggle.css';
import './styles/OverviewDashboardStyles.css';
import './styles/AIDashboard.css';
import './styles/ProfileSwitch.css';
import './styles/NarrativeMarketing.css';
import './styles/FlyoutSidebarStyles.css';
import MarigoldAICopilot from './components/layout/MarigoldAICopilot';
// AI Integration imports
import AIPromptBar from './components/common/AIPromptBar';
import AIResponseModal from './components/common/AIResponseModal';
import { getResponseGenerator } from './components/dashboard/ResponseGenerators';
// New View Components
import MessagingView from './components/views/MessagingView';
import LoyaltyView from './components/views/LoyaltyView';
// ✅ UPDATED: Import centralized data
import {
  campaignData as initialCampaignData,
  loyaltyProgramData as initialLoyaltyProgramData,
  monthlyStats,
  membershipData,
  kpiCardsData,
  insightsData,
  columbiaKpiCardsData, // ✅ NEW: Import from centralized data
  userProfiles, // ✅ NEW: Import from centralized data
  dashboardConfigurations, // ✅ NEW: Import from centralized data
  profileDashboardOrder // ✅ NEW: Import from centralized data
} from './data/SampleData';

const App = () => {
  // Ultra-comprehensive ResizeObserver error suppression
  useEffect(() => {
    // Override ResizeObserver to catch errors at the source
    const originalResizeObserver = window.ResizeObserver;
    
    if (originalResizeObserver) {
      window.ResizeObserver = class extends originalResizeObserver {
        constructor(callback) {
          const wrappedCallback = (entries, observer) => {
            window.requestAnimationFrame(() => {
              try {
                callback(entries, observer);
              } catch (error) {
                if (error.message && error.message.includes('ResizeObserver loop')) {
                  // Silently suppress ResizeObserver loop errors
                  return;
                }
                throw error;
              }
            });
          };
          super(wrappedCallback);
        }
      };
    }

    const handleGlobalError = (event) => {
      // Suppress ResizeObserver loop errors
      if (event.message && (
        event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
        event.message.includes('ResizeObserver loop limit exceeded') ||
        event.message.includes('ResizeObserver loop') ||
        event.message.includes('ResizeObserver')
      )) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        return true;
      }
    };

    const handleUnhandledRejection = (event) => {
      if (event.reason && event.reason.message && 
          event.reason.message.includes('ResizeObserver')) {
        event.preventDefault();
        return true;
      }
    };

    // Override console.error to suppress ResizeObserver errors
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = (...args) => {
      if (args.length > 0 && typeof args[0] === 'string' && 
          args[0].includes('ResizeObserver')) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
      if (args.length > 0 && typeof args[0] === 'string' && 
          args[0].includes('ResizeObserver')) {
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // Add event listeners for all possible error sources
    window.addEventListener('error', handleGlobalError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    document.addEventListener('error', handleGlobalError, true);
    
    // Also add on regular phase as backup
    window.addEventListener('error', handleGlobalError, false);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, false);

    // Cleanup
    return () => {
      window.ResizeObserver = originalResizeObserver;
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      document.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('error', handleGlobalError, false);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, false);
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  // State variables for campaigns and loyalty programs
  const [campaigns, setCampaigns] = useState([...initialCampaignData]);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([...initialLoyaltyProgramData]);
  const [successToast, setSuccessToast] = useState(null);
  
  // State variables for navigation and panels
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuPinned, setIsMenuPinned] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [showLoyaltyDrilldown, setShowLoyaltyDrilldown] = useState(false);
  const [loyaltyFilter, setLoyaltyFilter] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [notificationCount, setNotificationCount] = useState(8); // Updated to include critical notification
  const [showCampaignCreationModal, setShowCampaignCreationModal] = useState(false);

  // Debounced menu pin handler to prevent ResizeObserver loops
  const menuPinTimeoutRef = useRef(null);
  const handleMenuPinChange = useCallback((newPinnedState) => {
    if (menuPinTimeoutRef.current) {
      clearTimeout(menuPinTimeoutRef.current);
    }
    
    menuPinTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsMenuPinned(newPinnedState);
      });
    }, 50); // Small delay to prevent rapid state changes
  }, []);

  // Cleanup menu pin timeout
  useEffect(() => {
    return () => {
      if (menuPinTimeoutRef.current) {
        clearTimeout(menuPinTimeoutRef.current);
      }
    };
  }, []);
  
  // State variables for detail views with deep linking support
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState(null);
  const [detailType, setDetailType] = useState(null);

  // State variables for KPI analytics modals
  const [showKpiAnalytics, setShowKpiAnalytics] = useState(false);
  const [kpiType, setKpiType] = useState(null);
  const [dateRange, setDateRange] = useState('last_30_days');
  
  // Dashboard toggle state - now includes narrative view
  const [dashboardView, setDashboardView] = useState('overview');
  const [showRFMInfo, setShowRFMInfo] = useState(false);
  const [hasShownPulse, setHasShownPulse] = useState(false);

  // ✅ UPDATED: Profile Management State using centralized data
  const [currentProfile, setCurrentProfile] = useState(userProfiles[0]); // Use first profile as default

  // ✅ SHARED AI Assistant state for ALL dashboards
  const [isAIMinimized, setIsAIMinimized] = useState(true);
  const [aiResponse, setAiResponse] = useState(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);

  // NEW: Track critical notifications (notifications are managed internally by NotificationPanel)
  const [hasCriticalNotifications, setHasCriticalNotifications] = useState(true);
  
  // ✅ UPDATED: Profile switching handler that properly updates avatar
  const handleProfileSwitch = (newProfile) => {
    console.log('Switching to profile:', newProfile);
    setCurrentProfile(newProfile);
    setDashboardView(newProfile.defaultDashboard);
  };
  
  // Initialize dashboard view based on current profile
  useEffect(() => {
    setDashboardView(currentProfile.defaultDashboard);
  }, [currentProfile]);
  
  // Show RFM info card when switching to RFM view for the first time
  useEffect(() => {
    if (dashboardView === 'rfm') {
      const hasSeenRFMInfo = localStorage.getItem('hasSeenRFMInfo');
      if (!hasSeenRFMInfo) {
        setShowRFMInfo(true);
        localStorage.setItem('hasSeenRFMInfo', 'true');
      }
    }
  }, [dashboardView]);
  
  // Add pulse animation to RFM button once
  useEffect(() => {
    if (!hasShownPulse && !localStorage.getItem('hasShownRFMPulse')) {
      setHasShownPulse(true);
      localStorage.setItem('hasShownRFMPulse', 'true');
      setTimeout(() => {
        setHasShownPulse(false);
      }, 5000);
    }
  }, [hasShownPulse]);

  // ✅ UPDATED: Contextual prompts including narrative dashboard
  const getDashboardPrompts = () => {
    switch (dashboardView) {
      case 'marketing':
        return [
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
      case 'narrative':
        return [
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
      case 'rfm':
        return [
          "What are the top 3 things I should focus on today?",
          "Which RFM segments should I focus on first?",
          "What should be my marketing priorities for rest of the month?",
          "What's the best strategy to win back At Risk customers?",
          "How can I improve retention for At Risk customers?",
          "What's the best strategy for Champions segment?",
          "How do I convert Potential Loyalists to Champions?",
          "Why are my Can't Lose customers declining in value?",
          "What campaigns work best for each RFM segment?",
          "How do my segment values compare to industry benchmarks?",
          "What's causing low retention in the At Risk segment?",
          "What's the lifetime value of each RFM segment?",
          "Which segments have the highest purchase frequency?",
          "How can I prevent Can't Lose customers from churning?"
        ];
      case 'standard':
        return [
          "How are my campaigns performing this month?",
          "Which loyalty programs have the best ROI?", 
          "What KPIs need immediate attention?",
          "How can I improve my email open rates?",
          "Which customer segments are most valuable?",
          "What's causing my low redemption rates?",
          "How do my metrics compare to benchmarks?",
          "What should I focus on to increase revenue?",
          "Which campaigns are underperforming?",
          "How can I boost loyalty program engagement?",
          "What's my customer acquisition cost trend?",
          "Which marketing channels work best?"
        ];
      default:
        return []; // Overview dashboard doesn't have AI prompts
    }
  };

  // ✅ UPDATED: Dashboard ordering with new narrative dashboard and centralized data
  const getAvailableDashboards = () => {
    // Get the dashboard order for current profile using centralized data
    const dashboardOrder = profileDashboardOrder[currentProfile.id] || profileDashboardOrder.default;
    
    // Return dashboards in the specified order, filtering to only include available ones
    return dashboardOrder
      .filter(dashboardKey => currentProfile.dashboards.includes(dashboardKey))
      .map(dashboardKey => dashboardConfigurations[dashboardKey])
      .filter(Boolean); // Remove any undefined dashboards
  };

  // ✅ UPDATED: Contextual placeholder text including narrative dashboard
  const getPlaceholderText = () => {
    switch (dashboardView) {
      case 'marketing':
        return "Ask me about your campaign performance, budget allocation, or marketing optimization...";
      case 'narrative':
        return "Ask me about your campaign performance or what you should focus on next...";
      case 'rfm':
        return "Ask me about your RFM segments, customer behavior, or retention strategies...";
      case 'standard':
        return "Ask me about your campaigns, loyalty programs, or KPIs...";
      default:
        return "Ask me anything about your marketing performance...";
    }
  };

  // ✅ SHARED AI Assistant handlers with faster response time
  const handleAIPromptSubmit = (query) => {
    setLastQuestion(query);
    setIsAIMinimized(true);
    
    // Clear any previous response
    setAiResponse(null);
    
    // Generate response after a shorter delay
    setTimeout(() => {
      const responseGenerator = getResponseGenerator(query);
      const response = responseGenerator();
      setAiResponse(response);
      setShowAIResponse(true);
    }, 600);
  };

  const handleAIPromptClick = (prompt) => {
    handleAIPromptSubmit(prompt);
  };

  const handleClearAIResponse = () => {
    setAiResponse(null);
    setLastQuestion('');
    setShowAIResponse(false);
    setIsAIMinimized(false);
  };

  // Enhanced handler functions with deep linking support
  const handleProgramClick = (program, initialTab = 'overview') => {
    console.log('Program clicked:', program.id, 'Initial tab:', initialTab);
    setSelectedProgram(initialTab !== 'overview' ? {...program, initialTab} : program);
    setDetailType('program');
    setShowProgramDetails(true);
  };
  
  const handleCampaignClick = (campaign, initialTab = 'overview') => {
    console.log('Campaign clicked:', campaign.id, 'Initial tab:', initialTab);
    setSelectedCampaign(initialTab !== 'overview' ? {...campaign, initialTab} : campaign);
    setDetailType('campaign');
    setShowProgramDetails(true);
  };

  // NEW: Handler for notification program clicks - deep links to program detail
  const handleNotificationProgramClick = (programId) => {
    console.log('Notification program click:', programId);
    const program = loyaltyPrograms.find(p => p.id === programId);
    if (program) {
      // Open program detail modal directly to the recommendations tab if it needs attention
      const initialTab = program.needsAttention ? 'recommendations' : 'overview';
      handleProgramClick(program, initialTab);
    }
  };

  // New handler for deep linking to recommendations
  const handleRecommendationsClick = (item, itemType = 'campaign') => {
    console.log('Recommendations clicked for:', item.id, 'Type:', itemType);
    if (itemType === 'campaign') {
      handleCampaignClick(item, 'recommendations');
    } else {
      handleProgramClick(item, 'recommendations');
    }
  };

  // New handler for deep linking to performance
  const handlePerformanceClick = (item, itemType = 'campaign') => {
    console.log('Performance clicked for:', item.id, 'Type:', itemType);
    if (itemType === 'campaign') {
      handleCampaignClick(item, 'performance');
    } else {
      handleProgramClick(item, 'performance');
    }
  };

  // New handler for deep linking to audience
  const handleAudienceClick = (item, itemType = 'campaign') => {
    console.log('Audience clicked for:', item.id, 'Type:', itemType);
    if (itemType === 'campaign') {
      handleCampaignClick(item, 'audience');
    } else {
      handleProgramClick(item, 'audience');
    }
  };

  // Handler for opening campaign creation modal
  const handleOpenCampaignModal = () => {
    setShowCampaignCreationModal(true);
  };

  // Handler for campaign creation
  const handleCampaignCreated = (newCampaign) => {
    setCampaigns(prevCampaigns => [newCampaign, ...prevCampaigns]);
    setSuccessToast({
      message: `${newCampaign.title || 'New campaign'} has been created successfully.`,
    });
    console.log('New campaign created:', newCampaign);
  };

  // ✅ UPDATED: Handler for loyalty program creation - now updates state properly
  const handleLoyaltyProgramCreated = (newProgram) => {
    console.log('New loyalty program created:', newProgram);
    
    // Add the new program to the loyalty programs state
    setLoyaltyPrograms(prevPrograms => [newProgram, ...prevPrograms]);
    
    // Show success toast
    setSuccessToast({
      message: `${newProgram.title || 'New loyalty program'} has been created successfully.`,
    });
  };

  // Handler for notification creation
  const handleNotificationCreated = (notification) => {
    setNotificationCount(prev => prev + 1);
    console.log('New notification created:', notification);
  };

  // Actions for recommendations
  const handleImplementRecommendation = (item, recommendation) => {
    console.log('Implementing recommendation:', recommendation.id, 'for item:', item.id);
    setTimeout(() => {
      setActiveRecommendation({ action: 'implement', program: item, recommendation });
    }, 500);
  };

  const handleModifyRecommendation = (item, recommendation) => {
    console.log('Modifying recommendation:', recommendation.id, 'for item:', item.id);
    setTimeout(() => {
      setActiveRecommendation({ action: 'modify', program: item, recommendation });
    }, 500);
  };

  const handleRejectRecommendation = (item, recommendation) => {
    console.log('Rejecting recommendation:', recommendation.id, 'for item:', item.id);
    setTimeout(() => {
      setActiveRecommendation({ action: 'reject', program: item, recommendation });
    }, 500);
  };

  // Handler for opening KPI analytics modals
  const openKpiAnalytics = (type) => {
    setKpiType(type);
    setShowKpiAnalytics(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7f8' }}>
      {/* Global CSS to prevent ResizeObserver loops */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        /* Optimize elements that might cause ResizeObserver loops */
        main, header, .max-w-7xl, .dashboard-view-container, .dashboard-view {
          will-change: auto;
          contain: layout style;
        }
        
        /* Prevent layout thrashing during transitions */
        .dashboard-view-container * {
          will-change: auto;
        }
        
        /* Suppress ResizeObserver errors globally */
        .resizeobserver-loop-limit {
          display: none !important;
        }
      `}</style>

      {/* Sidebar / Navigation Menu */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isMenuPinned={isMenuPinned}
        setIsMenuPinned={handleMenuPinChange}
      />
      
      {/* Header - receives currentProfile prop and critical notifications flag */}
      <Header 
        isMenuOpen={isMenuOpen}
        isMenuPinned={isMenuPinned}
        setIsMenuOpen={setIsMenuOpen}
        notificationCount={notificationCount}
        setIsNotificationPanelOpen={setIsNotificationPanelOpen}
        setIsProfilePanelOpen={setIsProfilePanelOpen}
        currentProfile={currentProfile}
        hasCriticalNotifications={hasCriticalNotifications} // NEW: Pass critical notifications flag
      />
      
      {/* Main Content */}
      <div className="flex justify-center" style={{ 
        marginLeft: (isMenuOpen && isMenuPinned) ? '280px' : '0',
        transition: 'margin-left 0.3s ease-in-out'
      }}>
        <main className="max-w-7xl w-full px-6 py-6">

          {/* Render appropriate view based on active tab */}
          {activeTab === 'messaging' || activeTab.startsWith('messaging-') ? (
            <MessagingView activeSubTab={activeTab} />
          ) : activeTab === 'loyalty' || activeTab.startsWith('loyalty-') ? (
            <LoyaltyView activeSubTab={activeTab} />
          ) : (
            <>
              {/* Dashboard View - Original Content */}
              <section className="mb-6">
                {/* Dashboard View Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#040403' }}>Program Performance</h2>
                  
                  <div className="flex items-center">
                    <div className="dashboard-toggle-container">
                      {getAvailableDashboards().map((dashboard) => (
                        <button
                          key={dashboard.key}
                          className={`dashboard-toggle-button ${dashboardView === dashboard.key ? 'active' : ''} ${dashboard.key === 'rfm' && !dashboardView === 'rfm' && hasShownPulse ? 'pulse' : ''}`}
                          onClick={() => setDashboardView(dashboard.key)}
                        >
                          {dashboard.label}
                        </button>
                      ))}
                    </div>
                    
                    <span style={{ fontSize: '0.875rem', color: '#666666', marginRight: '1rem' }}>Last 30 days</span>
                    <button style={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      borderRadius: '0.375rem',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#666666'
                    }}>
                      Export
                    </button>
                  </div>
                </div>
                
                {/* RFM Info Card */}
                {dashboardView === 'rfm' && showRFMInfo && (
                  <RFMInfoCard onClose={() => setShowRFMInfo(false)} />
                )}
                
                {/* Dashboard View Container with Animation */}
                <div className="dashboard-view-container">
                  <TransitionGroup>
                    <CSSTransition
                      key={dashboardView}
                      timeout={500}
                      classNames={dashboardView === 'standard' ? 'standard-view' : 
                                dashboardView === 'overview' ? 'standard-view' : 
                                dashboardView === 'marketing' ? 'marketing-view' :
                                dashboardView === 'narrative' ? 'marketing-view' :
                                'rfm-view'}
                    >
                      <div className="dashboard-view">
                        {dashboardView === 'overview' ? (
                          <OverviewDashboard 
                            kpiData={columbiaKpiCardsData} 
                            insightsData={insightsData}
                          />
                        ) : dashboardView === 'marketing' ? (
                          <MarketingDashboard 
                            key={`marketing-${dashboardView}`}
                            // ✅ Pass shared AI state to Marketing Dashboard
                            aiState={{
                              isAIMinimized,
                              aiResponse,
                              lastQuestion,
                              showAIResponse
                            }}
                            aiHandlers={{
                              handleAIPromptSubmit,
                              handleAIPromptClick,
                              handleClearAIResponse,
                              setIsAIMinimized
                            }}
                            contextualPrompts={getDashboardPrompts()}
                            placeholderText={getPlaceholderText()}
                            onCampaignClick={handleCampaignClick}
                            onProgramClick={handleProgramClick}
                          />
                        ) : dashboardView === 'narrative' ? (
                          <NarrativeMarketingDashboard 
                            key={`narrative-${dashboardView}`}
                            // ✅ Pass shared AI state to Narrative Dashboard
                            aiState={{
                              isAIMinimized,
                              aiResponse,
                              lastQuestion,
                              showAIResponse
                            }}
                            aiHandlers={{
                              handleAIPromptSubmit,
                              handleAIPromptClick,
                              handleClearAIResponse,
                              setIsAIMinimized
                            }}
                            contextualPrompts={getDashboardPrompts()}
                            placeholderText={getPlaceholderText()}
                            onCampaignClick={handleCampaignClick}
                            onProgramClick={handleProgramClick}
                            onViewAllCampaigns={() => setShowCampaignModal(true)}
                            onRevenueClick={() => openKpiAnalytics('revenue')}
                          />
                        ) : dashboardView === 'standard' ? (
                          <div>
                            {/* ✅ AI Assistant Prompt Bar with Shared State */}
                            <AIPromptBar
                              key={`standard-${dashboardView}`}
                              onSubmit={handleAIPromptSubmit}
                              isMinimized={isAIMinimized}
                              onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
                              placeholderText={getPlaceholderText()}
                              suggestedPrompts={getDashboardPrompts()}
                            />

                            <DashboardKpiCards 
                              data={columbiaKpiCardsData} 
                              onClick={(kpi) => openKpiAnalytics(kpi.title.toLowerCase())}
                            />
                            
                            {/* ✅ NEW: Full-width Unified Insights and Recommendations */}
                            <div className="mt-6">
                              <UnifiedInsightsAndRecommendations
                                insightsData={insightsData}
                                recommendationsData={[]} // Standard dashboard doesn't have structured recommendations yet
                                onProgramClick={handleProgramClick}
                                onCampaignClick={handleCampaignClick}
                                variant="standard"
                              />
                            </div>
                            
                            {/* ✅ NEW: Charts Row - 3 equal columns */}
                            <div className="mt-6">
                              <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr 1fr', 
                                gap: '1.5rem'
                              }}>
                                <RevenueChart data={monthlyStats} />
                                <MembershipChart data={membershipData} />
                                <CampaignPerformanceChart />
                              </div>
                            </div>
                            <ProgramList 
                              programs={loyaltyPrograms}
                              onViewAllClick={() => setShowLoyaltyDrilldown(true)}
                              onProgramClick={handleProgramClick}
                              // onRecommendationsClick={(program) => handleRecommendationsClick(program, 'program')}
                              // onPerformanceClick={(program) => handlePerformanceClick(program, 'program')}
                              // onAudienceClick={(program) => handleAudienceClick(program, 'program')}
                            />   
                                                         
                            <CampaignList 
                              campaigns={campaigns} 
                              onViewAllClick={() => setShowCampaignModal(true)}
                              onCampaignClick={handleCampaignClick}
                              // onRecommendationsClick={handleRecommendationsClick}
                              // onPerformanceClick={handlePerformanceClick}
                              // onAudienceClick={handleAudienceClick}
                            />
                          </div>
                        ) : (
                          <RFMDashboard 
                            key={`rfm-${dashboardView}`}
                            // ✅ Pass shared AI state to RFM Dashboard
                            aiState={{
                              isAIMinimized,
                              aiResponse,
                              lastQuestion,
                              showAIResponse
                            }}
                            aiHandlers={{
                              handleAIPromptSubmit,
                              handleAIPromptClick,
                              handleClearAIResponse,
                              setIsAIMinimized
                            }}
                            contextualPrompts={getDashboardPrompts()}
                            placeholderText={getPlaceholderText()}
                            onProgramCreated={handleLoyaltyProgramCreated}
                            onNotificationCreated={handleNotificationCreated}
                            onProgramClick={handleProgramClick} // ✅ FIXED: Pass program click handler
                          />
                        )}
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              </section>
            </>
          )}
          
          {/* Full-screen Campaign Modal */}
          <CampaignModal 
            isOpen={showCampaignModal}
            onClose={() => setShowCampaignModal(false)}
            campaigns={campaigns}
            filter={campaignFilter}
            setFilter={setCampaignFilter}
            onCampaignClick={handleCampaignClick}
            // onRecommendationsClick={handleRecommendationsClick}
            // onPerformanceClick={handlePerformanceClick}
            // onAudienceClick={handleAudienceClick}
          />
          
          {/* Full-screen Loyalty Program Modal */}
          <ProgramModal 
            isOpen={showLoyaltyDrilldown}
            onClose={() => setShowLoyaltyDrilldown(false)}
            programs={loyaltyPrograms}
            filter={loyaltyFilter}
            setFilter={setLoyaltyFilter}
            onProgramClick={handleProgramClick}
            // onRecommendationsClick={(program) => handleRecommendationsClick(program, 'program')}
            // onPerformanceClick={(program) => handlePerformanceClick(program, 'program')}
            // onAudienceClick={(program) => handleAudienceClick(program, 'program')}
          />
          
          {/* ✅ FIXED: Enhanced Program Detail View with Deep Linking and Proper Callbacks */}
          {showProgramDetails && (
            <DetailView 
              program={detailType === 'program' ? selectedProgram : selectedCampaign}
              onClose={() => setShowProgramDetails(false)}
              onImplement={handleImplementRecommendation}
              onModify={handleModifyRecommendation}
              onReject={handleRejectRecommendation}
              initialTab={detailType === 'program' ? selectedProgram?.initialTab : selectedCampaign?.initialTab}
              // ✅ CRITICAL FIX: Pass the required callbacks for recommendation implementation
              onProgramCreated={handleLoyaltyProgramCreated}
              onNotificationCreated={handleNotificationCreated}
            />
          )}
          
          {/* Action modals for recommendations */}
          {activeRecommendation && activeRecommendation.action && (
            <FeedbackModal 
              action={activeRecommendation.action}
              program={activeRecommendation.program}
              recommendation={activeRecommendation.recommendation}
              onClose={() => setActiveRecommendation(null)}
            />
          )}

          {/* KPI Analytics Modal */}
          <KpiAnalyticsModal
            isOpen={showKpiAnalytics}
            onClose={() => setShowKpiAnalytics(false)}
            kpiType={kpiType}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          {/* Campaign Creation Modal */}
          <SplitCampaignCreationModal
            isOpen={showCampaignCreationModal}
            onClose={() => setShowCampaignCreationModal(false)}
            onCampaignCreated={handleCampaignCreated}
            onNotificationCreated={handleNotificationCreated}
          />
        </main>
      </div>

      {/* Floating Action Button */}
      <div>
        <ActionBarWithCopilot 
          onEmailCampaignClick={handleCampaignCreated}
          onLoyaltyProgramCreated={handleLoyaltyProgramCreated}
          onNotificationCreated={handleNotificationCreated}
        />
      </div>
      
      {/* Notification Panel with program click handler */}
      <NotificationPanel 
        isOpen={isNotificationPanelOpen} 
        onClose={() => setIsNotificationPanelOpen(false)}
        notificationCount={notificationCount}
        setNotificationCount={setNotificationCount}
        onProgramClick={handleNotificationProgramClick} // Pass program click handler
        onCriticalNotificationsChange={setHasCriticalNotifications} // Pass critical notifications callback
      />

      {/* Profile Panel */}
      <ProfilePanel 
        isOpen={isProfilePanelOpen}
        onClose={() => setIsProfilePanelOpen(false)}
        currentProfile={currentProfile}
        onProfileSwitch={handleProfileSwitch}
      />
      
      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast 
          message={successToast.message}
          onClose={() => setSuccessToast(null)}
        />
      )}

      {/* ✅ SHARED AI Response Modal - Shows for Marketing, Narrative, Standard and RFM dashboards */}
      {(dashboardView === 'marketing' || dashboardView === 'narrative' || dashboardView === 'standard' || dashboardView === 'rfm') && (
        <AIResponseModal 
          isOpen={showAIResponse}
          onClose={() => setShowAIResponse(false)}
          response={aiResponse}
          question={lastQuestion}
          onClearResponse={handleClearAIResponse}
          onPromptClick={handleAIPromptClick}
        />
      )}
    </div>
  );
};

export default App;
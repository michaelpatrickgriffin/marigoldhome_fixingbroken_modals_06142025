// src/App.js - Complete File with Restored Original Dashboards
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ActionBarWithCopilot from './components/layout/ActionBarWithCopilot';

// Import Modal Management System
import { ModalProvider } from './components/common/ModalManager';

// Dashboard Components
import DashboardContent from './components/dashboard/DashboardContent';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import MarketingDashboard from './components/dashboard/MarketingDashboard';
import NarrativeMarketingDashboard from './components/dashboard/NarrativeMarketingDashboard';
import RFMDashboard from './components/dashboard/RFMDashboard';
import UnifiedInsightsAndRecommendations from './components/dashboard/UnifiedInsightsAndRecommendations';

// Legacy Modal Components (to be phased out)
import DetailView from './components/common/DetailView';
import { ActionModal, FeedbackModal } from './components/common/ActionModals';
import KpiAnalyticsModal from './components/analytics/KpiAnalyticsModal';
import SplitCampaignCreationModal from './components/campaigns/SplitCampaignCreationModal';
import CampaignSuccessToast from './components/feedback/CampaignSuccessToast';

// Layout Components
import NotificationPanel from './components/layout/NotificationPanel';
import ProfilePanel from './components/layout/ProfilePanel';

// AI Integration Components
import AIPromptBar from './components/common/AIPromptBar';
import AIResponseModal from './components/common/AIResponseModal';
import { getResponseGenerator } from './components/dashboard/ResponseGenerators';

// View Components
import MessagingView from './components/views/MessagingView';
import LoyaltyView from './components/views/LoyaltyView';

// Styles
import { COLORS, darkMeshGradient } from './styles/ColorStyles';
import './styles/DashboardToggle.css';
import './styles/OverviewDashboardStyles.css';
import './styles/AIDashboard.css';
import './styles/ProfileSwitch.css';
import './styles/NarrativeMarketing.css';
import './styles/FlyoutSidebarStyles.css';

// Data Imports
import {
  campaignData as initialCampaignData,
  loyaltyProgramData as initialLoyaltyProgramData,
  monthlyStats,
  membershipData,
  kpiCardsData,
  insightsData,
  columbiaKpiCardsData,
  userProfiles,
  dashboardConfigurations,
  profileDashboardOrder
} from './data/SampleData';

const App = () => {
  // State variables for campaigns and loyalty programs
  const [campaigns, setCampaigns] = useState([...initialCampaignData]);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([...initialLoyaltyProgramData]);
  const [successToast, setSuccessToast] = useState(null);
  
  // State variables for navigation and panels
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMenuPinned, setIsMenuPinned] = useState(true);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(userProfiles[0]);
  const [notifications, setNotifications] = useState([]);
  
  // Notification state for panel integration
  const [notificationCount, setNotificationCount] = useState(0);
  
  // AI Integration state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiResponseModalOpen, setIsAiResponseModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  
  // ✅ FIXED: Dashboard state management with all required properties
  const [dashboards, setDashboards] = useState(() => {
    // Get the dashboard order for current profile (or default)
    const userDashboardOrder = profileDashboardOrder[currentProfile.id] || profileDashboardOrder.default;
    
    // Map the dashboard keys to full dashboard objects with all required properties
    return userDashboardOrder.map((dashboardKey, index) => {
      const config = dashboardConfigurations[dashboardKey] || {};
      return {
        id: dashboardKey,
        key: dashboardKey,
        name: config.label || config.name || dashboardKey, // Use label as name if name doesn't exist
        label: config.label || dashboardKey,
        ...config,
        isActive: index === 0 // First dashboard is active by default
      };
    });
  });
  
  // Get active dashboard
  const activeDashboard = dashboards.find(d => d.isActive) || dashboards[0];
  
  // Update dashboard state when profile changes
  useEffect(() => {
    const userDashboardOrder = profileDashboardOrder[currentProfile.id] || profileDashboardOrder.default;
    
    setDashboards(userDashboardOrder.map((dashboardKey, index) => {
      const config = dashboardConfigurations[dashboardKey] || {};
      return {
        id: dashboardKey,
        key: dashboardKey,
        name: config.label || config.name || dashboardKey,
        label: config.label || dashboardKey,
        ...config,
        isActive: index === 0
      };
    }));
  }, [currentProfile.id]);
  
  // Legacy modal state (to be phased out)
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showKpiModal, setShowKpiModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  
  // Profile switching
  const handleProfileSwitch = (profile) => {
    setCurrentProfile(profile);
    setIsProfilePanelOpen(false);
  };
  
  // Dashboard switching
  const handleDashboardSwitch = (dashboardId) => {
    setDashboards(prev => 
      prev.map(dash => ({ ...dash, isActive: dash.id === dashboardId }))
    );
  };
  
  // Notification management
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Campaign management
  const handleCampaignCreated = (newCampaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
    setSuccessToast({
      message: `Campaign "${newCampaign.name}" created successfully!`
    });
    addNotification({
      type: 'success',
      title: 'Campaign Created',
      message: `Campaign "${newCampaign.name}" has been created and is ready for launch.`,
      actions: [
        { label: 'View Campaign', action: () => handleCampaignSelect(newCampaign) }
      ]
    });
  };
  
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailView(true);
  };
  
  // Loyalty program management
  const handleProgramCreated = (newProgram) => {
    setLoyaltyPrograms(prev => [newProgram, ...prev]);
    addNotification({
      type: 'success',
      title: 'Loyalty Program Created',
      message: `Program "${newProgram.title}" has been created successfully.`,
      actions: [
        { label: 'View Program', action: () => handleProgramSelect(newProgram) }
      ]
    });
  };
  
  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setShowDetailView(true);
  };
  
  // KPI modal management
  const handleKpiSelect = (kpi) => {
    setSelectedKpi(kpi);
    setShowKpiModal(true);
  };
  
  // Action modal management
  const handleActionSelect = (type, item) => {
    setActionType(type);
    setSelectedRecommendation(item);
    setShowActionModal(true);
  };
  
  const handleActionConfirm = () => {
    setShowActionModal(false);
    setShowFeedbackModal(true);
    
    addNotification({
      type: 'info',
      title: 'Action Processed',
      message: `${actionType} action has been processed for the selected recommendation.`
    });
  };
  
  // AI Integration handlers
  const handleAiPromptSubmit = async (prompt) => {
    console.log('AI Prompt submitted:', prompt);
    setAiQuestion(prompt);
    setAiPrompt('');
    
    try {
      const generator = getResponseGenerator(activeDashboard.id);
      const response = await generator(prompt, {
        campaigns,
        loyaltyPrograms,
        currentProfile,
        activeDashboard: activeDashboard.id
      });
      
      setAiResponse(response);
      setIsAiResponseModalOpen(true);
    } catch (error) {
      console.error('AI Response error:', error);
      setAiResponse({
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        type: 'error'
      });
      setIsAiResponseModalOpen(true);
    }
  };
  
  const handleAiResponseClose = () => {
    setIsAiResponseModalOpen(false);
    setAiResponse(null);
    setAiQuestion('');
  };
  
  const handleAiPromptClick = (prompt) => {
    handleAiPromptSubmit(prompt);
  };
  
  // Close handlers
  const handleCloseDetailView = () => {
    setShowDetailView(false);
    setSelectedProgram(null);
    setSelectedCampaign(null);
  };
  
  const handleCloseKpiModal = () => {
    setShowKpiModal(false);
    setSelectedKpi(null);
  };
  
  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setActionType(null);
    setSelectedRecommendation(null);
  };
  
  // Toast management
  const handleToastClose = () => {
    setSuccessToast(null);
  };
  
  // Get the appropriate KPI data based on current profile
  const getKpiData = () => {
    switch (currentProfile.id) {
      case 'columbia':
        return columbiaKpiCardsData;
      default:
        return kpiCardsData;
    }
  };
  
  // ✅ RESTORED: Original dashboard rendering with DashboardContent for main views
  const renderDashboardContent = () => {
    const kpiData = getKpiData();
    
    switch (activeDashboard.id) {
      case 'overview':
      case 'standard': 
      case 'rfm':
        // ✅ RESTORED: Use DashboardContent for main dashboard views (preserves toggle)
        return (
          <DashboardContent
            kpiCardsData={kpiData}
            monthlyStats={monthlyStats}
            membershipData={membershipData}
            insightsData={insightsData}
            onProgramClick={handleProgramSelect}
            onCampaignClick={handleCampaignSelect}
          />
        );
        
      case 'marketing':
        return (
          <MarketingDashboard
            campaigns={campaigns}
            loyaltyPrograms={loyaltyPrograms}
            onCampaignSelect={handleCampaignSelect}
            onProgramSelect={handleProgramSelect}
            kpiData={kpiData}
            monthlyStats={monthlyStats}
            membershipData={membershipData}
            aiState={{
              isAIMinimized: false,
              aiResponse: aiResponse,
              lastQuestion: aiQuestion,
              showAIResponse: isAiResponseModalOpen
            }}
            aiHandlers={{
              handleAIPromptSubmit: handleAiPromptSubmit,
              handleAIPromptClick: handleAiPromptClick,
              handleClearAIResponse: handleAiResponseClose,
              setIsAIMinimized: () => {}
            }}
          />
        );
        
      case 'narrative':
        return (
          <NarrativeMarketingDashboard
            campaigns={campaigns}
            loyaltyPrograms={loyaltyPrograms}
            onCampaignClick={handleCampaignSelect}
            onProgramClick={handleProgramSelect}
            onViewAllCampaigns={() => setActiveTab('campaigns')}
            onRevenueClick={handleKpiSelect}
            aiState={{
              isAIMinimized: false,
              aiResponse: aiResponse,
              lastQuestion: aiQuestion,
              showAIResponse: isAiResponseModalOpen
            }}
            aiHandlers={{
              handleAIPromptSubmit: handleAiPromptSubmit,
              handleAIPromptClick: handleAiPromptClick,
              handleClearAIResponse: handleAiResponseClose,
              setIsAIMinimized: () => {}
            }}
          />
        );
        
      case 'ai':
        return (
          <UnifiedInsightsAndRecommendations
            campaigns={campaigns}
            loyaltyPrograms={loyaltyPrograms}
            onActionSelect={handleActionSelect}
          />
        );
        
      default:
        // Fallback to DashboardContent for any unrecognized dashboard
        return (
          <DashboardContent
            kpiCardsData={kpiData}
            monthlyStats={monthlyStats}
            membershipData={membershipData}
            insightsData={insightsData}
            onProgramClick={handleProgramSelect}
            onCampaignClick={handleCampaignSelect}
          />
        );
    }
  };
  
  // Render view content based on active tab
  const renderViewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'messaging':
        return (
          <MessagingView
            campaigns={campaigns}
            onCampaignSelect={handleCampaignSelect}
            onCampaignCreated={handleCampaignCreated}
          />
        );
      case 'loyalty':
        return (
          <LoyaltyView
            programs={loyaltyPrograms}
            onProgramSelect={handleProgramSelect}
            onProgramCreated={handleProgramCreated}
          />
        );
      case 'ai':
        return (
          <UnifiedInsightsAndRecommendations
            campaigns={campaigns}
            loyaltyPrograms={loyaltyPrograms}
            onActionSelect={handleActionSelect}
          />
        );
      default:
        return renderDashboardContent();
    }
  };
  
  return (
    <ModalProvider>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#fafbfc',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar */}
        <Sidebar
          isOpen={isMenuOpen}
          isPinned={isMenuPinned}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onPin={() => setIsMenuPinned(!isMenuPinned)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dashboards={dashboards}
          activeDashboard={activeDashboard}
          onDashboardChange={handleDashboardSwitch}
          currentProfile={currentProfile}
        />
        
        {/* Header */}
        <Header
          isMenuOpen={isMenuOpen}
          isMenuPinned={isMenuPinned}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          onNotificationClick={() => setIsNotificationPanelOpen(true)}
          onProfileClick={() => setIsProfilePanelOpen(true)}
          currentProfile={currentProfile}
          notificationCount={notificationCount}
        />
        
        {/* Main Content */}
        <main style={{ 
          flex: 1,
          marginLeft: (isMenuOpen && isMenuPinned) ? '280px' : '0',
          padding: '2rem',
          transition: 'margin-left 0.3s ease'
        }}>
          {/* AI Prompt Bar */}
          <AIPromptBar
            prompt={aiPrompt}
            onChange={setAiPrompt}
            onSubmit={handleAiPromptSubmit}
            placeholder={`Ask anything about ${(activeDashboard.label || activeDashboard.name || 'your dashboard').toLowerCase()}...`}
            suggestions={activeDashboard.aiSuggestions || []}
          />
          
          {/* Action Bar with Copilot */}
          <ActionBarWithCopilot
            onCampaignCreated={handleCampaignCreated}
            onProgramCreated={handleProgramCreated}
            onNotificationCreated={addNotification}
          />
          
          {/* Dashboard Content */}
          {renderViewContent()}
        </main>
        
        {/* ✅ FIXED: Notification Panel with correct props */}
        <NotificationPanel
          isOpen={isNotificationPanelOpen}
          onClose={() => setIsNotificationPanelOpen(false)}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
          onProgramClick={handleProgramSelect}
          onCriticalNotificationsChange={() => {}} // No-op for now
        />
        
        {/* Profile Panel */}
        <ProfilePanel
          isOpen={isProfilePanelOpen}
          onClose={() => setIsProfilePanelOpen(false)}
          currentProfile={currentProfile}
          profiles={userProfiles}
          onProfileSwitch={handleProfileSwitch}
        />
        
        {/* LEGACY MODALS - TO BE PHASED OUT */}
        
        {/* Detail View Modal */}
        {showDetailView && (
          <DetailView
            program={selectedProgram || selectedCampaign}
            onClose={handleCloseDetailView}
            onProgramCreated={handleProgramCreated}
            onNotificationCreated={addNotification}
          />
        )}
        
        {/* KPI Analytics Modal */}
        {showKpiModal && selectedKpi && (
          <KpiAnalyticsModal
            kpi={selectedKpi}
            isOpen={showKpiModal}
            onClose={handleCloseKpiModal}
          />
        )}
        
        {/* Action Modal */}
        {showActionModal && (
          <ActionModal
            isOpen={showActionModal}
            onClose={() => setShowActionModal(false)}
            onConfirm={handleActionConfirm}
            actionType={actionType}
            recommendation={selectedRecommendation}
          />
        )}
        
        {/* Feedback Modal */}
        {showFeedbackModal && (
          <FeedbackModal
            isOpen={showFeedbackModal}
            onClose={handleCloseFeedbackModal}
            actionType={actionType}
          />
        )}
        
        {/* AI Response Modal */}
        {isAiResponseModalOpen && (
          <AIResponseModal
            isOpen={isAiResponseModalOpen}
            onClose={handleAiResponseClose}
            response={aiResponse}
            question={aiQuestion}
          />
        )}
        
        {/* Success Toast */}
        {successToast && (
          <CampaignSuccessToast
            message={successToast.message}
            onClose={handleToastClose}
          />
        )}
      </div>
    </ModalProvider>
  );
};

export default App;
// src/components/dashboard/DashboardComponents.js
import React, { useState } from 'react';
import { 
  Plus, Filter, Mail, Award, AlertTriangle, CheckCircle, ArrowUpRight, ChevronRight,
  BarChart3, TrendingUp, Users
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { 
  campaignData as initialCampaignData, 
  loyaltyProgramData as initialLoyaltyProgramData, 
  monthlyStats, 
  membershipData, 
  kpiCardsData, 
  insightsData 
} from '../../data/SampleData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import CampaignCard from '../campaigns/CampaignCard';
import CampaignDetailView from '../campaigns/CampaignDetailView';
import SplitCampaignCreationModal from '../campaigns/SplitCampaignCreationModal';
import CampaignSuccessToast from '../feedback/CampaignSuccessToast';
import ActionButton from '../layout/ActionButton';
import ProgramCard from '../loyalty/ProgramCard';
import FullScreenLoyaltyProgramModal from '../loyalty/FullScreenLoyaltyProgramModal';
import DashboardKpiCards from './DashboardKpiCards';
import { 
  DashboardRevenueChart, 
  DashboardMembershipChart, 
  DashboardInsightsCard,
  DashboardChartsContainer 
} from './DashboardCharts';
import DashboardContent from './DashboardContent';
import UnifiedInsightsAndRecommendations from './UnifiedInsightsAndRecommendations';
import AIPromptBar from '../common/AIPromptBar';
import AIResponseModal from '../common/AIResponseModal';
import { getResponseGenerator } from './ResponseGenerators';

// ===== NEW: Campaign Performance Chart =====
export const CampaignPerformanceChart = () => {
  // Sample campaign performance data
  const campaignPerformanceData = [
    { name: 'Winter Gear', roi: 1001, status: 'active' },
    { name: 'Summit Tier', roi: 1777, status: 'active' },
    { name: 'Summer Camping', roi: 207, status: 'active' },
    { name: 'Spring Adventure', roi: 68, status: 'active' },
    { name: 'Hiking Boot', roi: 0, status: 'scheduled' }
  ];

  const dashboardCardStyle = {
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    position: 'relative',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 0
  };

  const dashboardCardHeaderStyle = {
    padding: '1rem 1.25rem 0.75rem',
    margin: 0,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: COLORS.onyx,
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    flexShrink: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  };

  const chartContainerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    position: 'relative'
  };

  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Campaign Performance
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={campaignPerformanceData} 
            margin={{ top: 5, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: COLORS.onyx }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: COLORS.onyx }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'ROI']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                fontWeight: 500
              }}
            />
            <Bar 
              dataKey="roi" 
              name="ROI" 
              fill="#1A4C49" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Export the components with their original names for backward compatibility
export const KpiCards = DashboardKpiCards;
export const RevenueChart = DashboardRevenueChart;
export const MembershipChart = DashboardMembershipChart;

// ===== REMOVED: Original InsightsCard - replaced by UnifiedInsightsAndRecommendations =====

// Main Dashboard Component
const DashboardComponent = ({ setNotificationCount }) => {
  // Initialize state with spread operator for clean copies
  const [campaigns, setCampaigns] = useState([...initialCampaignData]);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([...initialLoyaltyProgramData]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal and toast state
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] = useState(false);
  const [isCreateLoyaltyModalOpen, setIsCreateLoyaltyModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(null);
  
  // Add state for selected campaign to enable detail view
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // AI Assistant state
  const [isAIMinimized, setIsAIMinimized] = useState(true);
  const [aiResponse, setAiResponse] = useState(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);
  
  // Standard dashboard prompts - different for each tab
  const getDashboardPrompts = () => {
    switch (activeTab) {
      case 'campaigns':
        return [
          "How are my campaigns performing this month?",
          "Which campaigns have the best ROI?",
          "What's causing low open rates in my newsletters?",
          "How can I improve campaign conversion rates?",
          "Which campaign types work best for my audience?",
          "What's the optimal send time for my campaigns?",
          "How do seasonal campaigns compare to evergreen ones?",
          "What campaign strategies should I focus on?"
        ];
      case 'loyalty':
        return [
          "Which loyalty programs have the best ROI?",
          "What's causing my low redemption rates?",
          "How can I improve loyalty program engagement?",
          "Which program types drive the most repeat purchases?",
          "How do my program tiers compare in performance?",
          "What rewards are most popular with members?",
          "How can I reduce program costs while maintaining value?",
          "What's the best way to promote my loyalty programs?"
        ];
      default:
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
    }
  };

  // AI Assistant handlers
  const handleAIPromptSubmit = (query) => {
    setLastQuestion(query);
    setIsAIMinimized(true);
    
    // Generate response after a delay
    setTimeout(() => {
      const responseGenerator = getResponseGenerator(query);
      const response = responseGenerator();
      setAiResponse(response);
      setShowAIResponse(true);
    }, 1500);
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
  
  // Handle campaign click
  const handleCampaignClick = (campaign) => {
    console.log('Clicked campaign:', campaign.id);
    setSelectedCampaign(campaign);
  };
  
  // Handle closing the campaign detail view
  const handleCloseDetail = () => {
    console.log('Closing campaign detail view');
    setSelectedCampaign(null);
  };
  
  // UPDATED: Handle loyalty program click with optional initial tab
  const handleProgramClick = (program, initialTab = 'overview') => {
    console.log('Clicked loyalty program:', program.title, 'Initial tab:', initialTab);
    // For now, just log - the actual program detail modal would be handled by parent component
    // This gets passed up to the main app component
  };
  
  // Handle campaign creation
  const handleCampaignCreated = (newCampaign) => {
    // Simple direct state update with new array
    setCampaigns([newCampaign, ...campaigns]);
    
    // Force switch to campaigns tab to see the new campaign
    setActiveTab('campaigns');
    
    // Show success toast
    setSuccessToast({
      message: `${newCampaign.title || 'New campaign'} has been created successfully.`,
    });
    
    // Console log in a more visible way
    console.log('%c NEW CAMPAIGN CREATED', 'background: green; color: white; font-size: 14px;');
    console.log(newCampaign);
  };

  // Handle loyalty program creation
  const handleLoyaltyProgramCreated = (newProgram) => {
    console.log('%c DASHBOARD: LOYALTY PROGRAM CREATION HANDLER CALLED', 'background: blue; color: white; font-size: 14px;');
    console.log('New program data:', newProgram);
    
    // Create a completely new array to ensure React detects the state change
    const updatedPrograms = [
      {
        ...newProgram,
        id: typeof newProgram.id === 'undefined' ? Date.now() : newProgram.id // Ensure ID exists
      }, 
      ...loyaltyPrograms
    ];
    
    console.log('Previous programs:', loyaltyPrograms);
    console.log('Updated programs array:', updatedPrograms);
    
    // Force update with timeout to ensure React processes the state change
    setTimeout(() => {
      setLoyaltyPrograms(updatedPrograms);
      console.log('%c LOYALTY PROGRAMS STATE UPDATED', 'background: green; color: white; font-size: 14px;');
      
      // Force switch to loyalty tab to see the new program
      setActiveTab('loyalty');
      
      // Show success toast
      setSuccessToast({
        message: `${newProgram.title || 'New loyalty program'} has been created successfully.`,
      });
    }, 0);
  };

  // Handle notification creation
  const handleNotificationCreated = (notification) => {
    // If setNotificationCount is available, increment the counter
    if (typeof setNotificationCount === 'function') {
      setNotificationCount(prevCount => prevCount + 1);
    }
    
    // Console log in a more visible way
    console.log('%c NEW NOTIFICATION CREATED', 'background: blue; color: white; font-size: 14px;');
    console.log(notification);
  };

  // Handle opening campaign modal from action button
  const handleOpenCampaignModal = () => {
    console.log('%c OPENING CAMPAIGN MODAL', 'background: orange; color: white; font-size: 14px;');
    setIsCreateCampaignModalOpen(true);
  };

  // Handle opening loyalty program modal from action button or dashboard
  const handleOpenLoyaltyModal = () => {
    console.log('%c OPENING LOYALTY PROGRAM MODAL', 'background: orange; color: white; font-size: 14px;');
    setIsCreateLoyaltyModalOpen(true);
  };

  // Implementation functions for recommendations
  const handleImplementRecommendation = (campaign, recommendation) => {
    console.log(`Implementing recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
  };

  const handleModifyRecommendation = (campaign, recommendation) => {
    console.log(`Modifying recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would show a modification dialog
  };

  const handleRejectRecommendation = (campaign, recommendation) => {
    console.log(`Rejecting recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
  };

  return (
    <div className="p-6">
      {/* AI Assistant Prompt Bar - placed at the top */}
      <AIPromptBar
        onSubmit={handleAIPromptSubmit}
        isMinimized={isAIMinimized}
        onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
        placeholderText={
          activeTab === 'campaigns' ? "Ask me about your campaigns, performance, or optimization strategies..." :
          activeTab === 'loyalty' ? "Ask me about your loyalty programs, redemption rates, or member engagement..." :
          "Ask me about your campaigns, loyalty programs, or KPIs..."
        }
        suggestedPrompts={getDashboardPrompts()}
      />

      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: COLORS.onyx }}>
          {activeTab === 'campaigns' ? 'Campaigns' : 
           activeTab === 'loyalty' ? 'Loyalty Programs' : 
           'Dashboard'}
        </h1>
        
        <div className="flex gap-3">
          <button 
            className="flex items-center px-3 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          
          <button 
            onClick={activeTab === 'campaigns' ? handleOpenCampaignModal : 
                    activeTab === 'loyalty' ? handleOpenLoyaltyModal : 
                    handleOpenCampaignModal}
            className="flex items-center px-4 py-2 rounded hover:bg-opacity-90"
            style={{ backgroundColor: COLORS.evergreen, color: 'white' }}
          >
            <Plus size={16} className="mr-2" />
            {activeTab === 'campaigns' ? 'Create Campaign' : 
             activeTab === 'loyalty' ? 'Create Program' : 
             'Create Campaign'}
          </button>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'dashboard' ? 'border-b-2 text-emerald-800' : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ 
            borderColor: activeTab === 'dashboard' ? COLORS.evergreen : undefined,
            color: activeTab === 'dashboard' ? COLORS.evergreen : undefined
          }}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        
        <button 
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'campaigns' ? 'border-b-2 text-emerald-800' : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ 
            borderColor: activeTab === 'campaigns' ? COLORS.evergreen : undefined,
            color: activeTab === 'campaigns' ? COLORS.evergreen : undefined
          }}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        
        <button 
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'loyalty' ? 'border-b-2 text-emerald-800' : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ 
            borderColor: activeTab === 'loyalty' ? COLORS.evergreen : undefined,
            color: activeTab === 'loyalty' ? COLORS.evergreen : undefined
          }}
          onClick={() => setActiveTab('loyalty')}
        >
          Loyalty Programs
        </button>
      </div>
      
      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* KPI Cards */}
          <DashboardKpiCards data={kpiCardsData} />
          
          {/* ✅ NEW: Full-width Unified Insights and Recommendations */}
          <UnifiedInsightsAndRecommendations
            insightsData={insightsData}
            recommendationsData={[]} // Standard dashboard doesn't have structured recommendations yet
            onProgramClick={handleProgramClick}
            onCampaignClick={handleCampaignClick}
            variant="standard"
          />
          
          {/* ✅ NEW: Charts Row - 3 equal columns */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <DashboardRevenueChart data={monthlyStats} />
            <DashboardMembershipChart data={membershipData} />
            <CampaignPerformanceChart />
          </div>
        </div>
      )}
      
      {/* Campaigns Tab Content */}
      {activeTab === 'campaigns' && (
        <div>
          {/* Campaign Filter Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button className="px-4 py-2 text-sm font-medium text-emerald-800 border-b-2 border-emerald-800">
              All Campaigns ({campaigns.length})
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Active
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Scheduled
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Completed
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Draft
            </button>
          </div>
          
          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridAutoRows: '1fr' }}>
            {campaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onClick={handleCampaignClick} 
              />
            ))}
          </div>
          
          {/* Empty State */}
          {campaigns.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Mail size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns yet</h3>
              <p className="text-gray-500 mb-4">Create your first campaign to start engaging with your audience</p>
              <button 
                onClick={handleOpenCampaignModal}
                className="px-4 py-2 rounded hover:bg-opacity-90"
                style={{ backgroundColor: COLORS.evergreen, color: 'white' }}
              >
                Create Campaign
              </button>
            </div>
          )}
          
          {/* Campaign Detail View */}
          {selectedCampaign && (
            <CampaignDetailView 
              campaign={selectedCampaign}
              onClose={handleCloseDetail}
              onImplement={handleImplementRecommendation}
              onModify={handleModifyRecommendation}
              onReject={handleRejectRecommendation}
            />
          )}
        </div>
      )}
      
      {/* Loyalty Programs Tab Content */}
      {activeTab === 'loyalty' && (
        <div>
          {/* Program Filter Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button className="px-4 py-2 text-sm font-medium text-emerald-800 border-b-2 border-emerald-800">
              All Programs ({loyaltyPrograms.length})
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Active
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Scheduled
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Completed
            </button>
          </div>
          
          {/* Directly map loyalty programs to cards */}
          {loyaltyPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridAutoRows: '1fr' }}>
              {loyaltyPrograms.map(program => (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  onClick={handleProgramClick} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Award size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No loyalty programs yet</h3>
              <p className="text-gray-500 mb-4">Create your first program to start engaging with your customers</p>
              <button 
                onClick={handleOpenLoyaltyModal}
                className="px-4 py-2 rounded hover:bg-opacity-90"
                style={{ backgroundColor: COLORS.evergreen, color: 'white' }}
              >
                Create Loyalty Program
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Campaign Creation Modal */}
      <SplitCampaignCreationModal 
        isOpen={isCreateCampaignModalOpen}
        onClose={() => setIsCreateCampaignModalOpen(false)}
        onCampaignCreated={handleCampaignCreated}
        onNotificationCreated={handleNotificationCreated}
      />
      
      {/* Loyalty Program Creation Modal (for direct launch from dashboard header) */}
      <FullScreenLoyaltyProgramModal 
        isOpen={isCreateLoyaltyModalOpen}
        onClose={() => setIsCreateLoyaltyModalOpen(false)}
        onProgramCreated={handleLoyaltyProgramCreated}
        onNotificationCreated={handleNotificationCreated}
      />
      
      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast 
          message={successToast.message}
          onClose={() => setSuccessToast(null)}
        />
      )}

      {/* Action Button */}
      <ActionButton 
        onEmailCampaignClick={handleOpenCampaignModal} 
        onLoyaltyProgramCreated={handleLoyaltyProgramCreated}
      />

      {/* AI Response Modal */}
      <AIResponseModal 
        isOpen={showAIResponse}
        onClose={() => setShowAIResponse(false)}
        response={aiResponse}
        question={lastQuestion}
        onClearResponse={handleClearAIResponse}
        onPromptClick={handleAIPromptClick}
      />
    </div>
  );
};

// Export the default component
export default DashboardComponent;
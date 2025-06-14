// src/components/dashboard/DashboardContent.js
import React, { useState, useEffect } from 'react';
import DashboardKpiCards from './DashboardKpiCards';
import { DashboardChartsContainer } from './DashboardCharts';
import { InsightsCard } from './DashboardComponents'; // Import the updated InsightsCard
import RFMDashboard from './RFMDashboard';
import RFMInfoCard from './RFMInfoCard';
import OverviewDashboard from './OverviewDashboard'; // Import the new component
import { COLORS } from '../../styles/ColorStyles';
import '../../styles/RFMDashboardStyles.css';
import '../../styles/OverviewDashboardStyles.css'; // Import the new styles

const DashboardContent = ({ 
  kpiCardsData, 
  monthlyStats, 
  membershipData, 
  insightsData, 
  onProgramClick, 
  onCampaignClick 
}) => {
  // Updated to include 'overview' as the default view
  const [dashboardView, setDashboardView] = useState('overview'); 
  const [showRFMInfo, setShowRFMInfo] = useState(false);
  
  // Show RFM info card when switching to RFM view for the first time
  useEffect(() => {
    if (dashboardView === 'rfm') {
      // Check if user has seen the info card before
      const hasSeenRFMInfo = localStorage.getItem('hasSeenRFMInfo');
      if (!hasSeenRFMInfo) {
        setShowRFMInfo(true);
        // Mark as seen
        localStorage.setItem('hasSeenRFMInfo', 'true');
      }
    }
  }, [dashboardView]);

  return (
    <div className="space-y-6">
      {/* Dashboard View Toggle - Updated with Overview option */}
      <div className="mb-6 flex justify-between items-center">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
          Marketing Performance
        </h2>
        
        <div className="flex bg-gray-100 p-1 rounded-md">
          {/* New Overview Toggle Button */}
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              dashboardView === 'overview'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setDashboardView('overview')}
          >
            Overview
          </button>
          
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              dashboardView === 'standard'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setDashboardView('standard')}
          >
            Standard View
          </button>
          
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              dashboardView === 'rfm'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setDashboardView('rfm')}
          >
            RFM View
          </button>
        </div>
      </div>
      
      {/* RFM Info Card */}
      {dashboardView === 'rfm' && showRFMInfo && (
        <RFMInfoCard onClose={() => setShowRFMInfo(false)} />
      )}
      
      {/* Show the appropriate dashboard based on selected view - now includes Overview */}
      {dashboardView === 'overview' ? (
        // Overview Dashboard Content
        <OverviewDashboard 
          kpiData={kpiCardsData} 
          insightsData={insightsData}
        />
      ) : dashboardView === 'standard' ? (
        // Standard Dashboard Content
        <>
          {/* KPI Cards */}
          <div className="mb-6">
            <DashboardKpiCards data={kpiCardsData} />
          </div>
          
          {/* Charts and Insights */}
          <DashboardChartsContainer 
            revenueData={monthlyStats}
            membershipData={membershipData}
            insightsData={insightsData}
            onProgramClick={onProgramClick}
            onCampaignClick={onCampaignClick}
          />
        </>
      ) : (
        // RFM Dashboard Content
        <RFMDashboard />
      )}
    </div>
  );
};

export default DashboardContent;
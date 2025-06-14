// src/components/dashboard/DashboardDemo.js
import React from 'react';
import DashboardContent from './DashboardContent';
import { 
  campaignData as initialCampaignData, 
  loyaltyProgramData as initialLoyaltyProgramData, 
  monthlyStats, 
  membershipData, 
  kpiCardsData, 
  insightsData 
} from '../../data/SampleData';

// This component demonstrates how to use the dashboard with the RFM toggle
const DashboardDemo = () => {
  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Marketing Dashboard
        </h1>
        
        <div className="flex gap-3">
          <button 
            className="flex items-center px-3 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter
          </button>
          
          <button 
            className="flex items-center px-4 py-2 rounded hover:bg-opacity-90 bg-teal-800 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create Report
          </button>
        </div>
      </div>
      
      {/* Main Dashboard Content with Toggle */}
      <DashboardContent 
        kpiCardsData={kpiCardsData} 
        monthlyStats={monthlyStats} 
        membershipData={membershipData} 
        insightsData={insightsData} 
      />
    </div>
  );
};

export default DashboardDemo;
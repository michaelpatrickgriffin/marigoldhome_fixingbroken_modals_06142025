// src/components/campaigns/detail/CampaignDetailTabs.js
import React from 'react';
import { COLORS } from '../../../styles/ColorStyles';

const CampaignDetailTabs = ({ activeTab, setActiveTab, recommendationsCount }) => {
  return (
    <div className="px-6 border-b border-gray-200 flex gap-8">
      <TabButton 
        id="overview"
        label="Overview"
        isActive={activeTab === 'overview'}
        onClick={() => setActiveTab('overview')}
      />
      
      <TabButton 
        id="recommendations"
        label="Recommendations"
        count={recommendationsCount}
        isActive={activeTab === 'recommendations'}
        onClick={() => setActiveTab('recommendations')}
      />
      
      <TabButton 
        id="performance"
        label="Performance"
        isActive={activeTab === 'performance'}
        onClick={() => setActiveTab('performance')}
      />
    </div>
  );
};

const TabButton = ({ id, label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="py-4 relative"
    style={{
      color: isActive ? COLORS.evergreen : COLORS.onyxMedium,
      fontWeight: isActive ? 600 : 500,
      fontSize: '0.875rem',
      borderBottom: isActive ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
    }}
  >
    <div className="flex items-center">
      {label}
      {count > 0 && (
        <span 
          className="ml-2 flex items-center justify-center rounded-full text-xs font-semibold w-6 h-6 text-white"
          style={{ backgroundColor: COLORS.evergreen }}
        >
          {count}
        </span>
      )}
    </div>
  </button>
);

export default CampaignDetailTabs;
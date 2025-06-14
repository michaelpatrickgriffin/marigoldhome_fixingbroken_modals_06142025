// src/components/campaigns/detail/CampaignDetailHeader.js
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { COLORS } from '../../../styles/ColorStyles';

const CampaignDetailHeader = ({ campaign, onClose }) => {
  return (
    <div 
      className="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      style={{ 
        backgroundColor: campaign.needsAttention ? 'rgba(244, 67, 54, 0.05)' : 'white'
      }}
    >
      <div className="flex items-center">
        {campaign.needsAttention && (
          <AlertTriangle size={20} className="text-red-500 mr-3" />
        )}
        <div>
          <h2 className="text-2xl font-semibold" style={{ color: COLORS.onyx }}>
            {campaign.title}
          </h2>
          <p className="text-sm" style={{ color: COLORS.onyxMedium }}>
            {campaign.type} • {campaign.audience} • {campaign.status}
          </p>
        </div>
      </div>
      
      <button 
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CampaignDetailHeader;
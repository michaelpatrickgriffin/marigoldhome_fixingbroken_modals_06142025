// src/components/layout/ActionBarWithCopilot.js
import React from 'react';
import ActionButton from './ActionButton';
import MarigoldAICopilot from './MarigoldAICopilot';

const ActionBarWithCopilot = ({ onEmailCampaignClick, onLoyaltyProgramCreated, onNotificationCreated }) => {
  // Ensure we pass all necessary props to the ActionButton
  return (
    <>
      
      {/* The ActionButton with full functionality */}
      <ActionButton 
        onEmailCampaignClick={onEmailCampaignClick}
        onLoyaltyProgramCreated={onLoyaltyProgramCreated}
        onNotificationCreated={onNotificationCreated}
      />
    </>
  );
};

export default ActionBarWithCopilot;
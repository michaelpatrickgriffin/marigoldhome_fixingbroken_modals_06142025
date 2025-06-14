// src/components/layout/ActionButton.js
import React, { useState } from 'react';
import { Plus, Mail, Target, Users, Calendar, Award } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { actionButtonConfig } from '../../data/SampleData';
import FullScreenLoyaltyProgramModal from '../loyalty/FullScreenLoyaltyProgramModal';
import CampaignSuccessToast from '../feedback/CampaignSuccessToast';
import SplitCampaignCreationModal from '../campaigns/SplitCampaignCreationModal';

// Icon mapping for action types
const iconMap = {
  'Mail': Mail,
  'Award': Award,
  'Target': Target,
  'Calendar': Calendar,
  'Users': Users
};

const ActionButton = ({ onEmailCampaignClick, onLoyaltyProgramCreated, onNotificationCreated }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  // Toggle the expanded state - this is the key function for showing/hiding options
  const toggleExpand = () => {
    console.log("Toggling expand state from", isExpanded, "to", !isExpanded);
    setIsExpanded(!isExpanded);
  };

  // Handle clicking on a specific action type from the menu
  const handleActionClick = (type) => {
    console.log(`Action clicked: ${type}`);
    setIsExpanded(false);
    
    if (type === 'campaign') {
      // Open our own campaign modal instead of calling the callback directly
      setIsCampaignModalOpen(true);
    } else if (type === 'loyalty') {
      // Open the loyalty program modal
      setIsLoyaltyModalOpen(true);
    } else {
      // For other action types that aren't implemented yet
      alert(`Action type '${type}' not implemented yet`);
    }
  };

  // Handle campaign creation from our own modal
  const handleCampaignCreated = (newCampaign) => {
    // Close the modal
    setIsCampaignModalOpen(false);
    
    console.log('%c ACTION BUTTON: CAMPAIGN CREATED', 'background: green; color: white; font-size: 14px;');
    console.log('New campaign data in ActionButton:', newCampaign);
    
    // Call the parent callback if it exists
    if (typeof onEmailCampaignClick === 'function') {
      onEmailCampaignClick(newCampaign);
    } else {
      console.error('onEmailCampaignClick is not a function in ActionButton');
    }
    
    // Show success toast with template message
    const messageTemplate = actionButtonConfig.successMessages.campaign;
    const message = messageTemplate.replace('{title}', newCampaign.title || 'New campaign');
    
    setSuccessToast({ message });
  };

  // Handle loyalty program creation
  const handleProgramCreated = (newProgram) => {
    // Close the modal
    setIsLoyaltyModalOpen(false);
    
    console.log('%c ACTION BUTTON: PROGRAM CREATED', 'background: orange; color: white; font-size: 14px;');
    console.log('New program data in ActionButton:', newProgram);
    
    // Call the parent callback if it exists
    if (typeof onLoyaltyProgramCreated === 'function') {
      onLoyaltyProgramCreated(newProgram);
    } else {
      console.error('onLoyaltyProgramCreated is not a function in ActionButton');
    }
    
    // Show success toast with template message
    const messageTemplate = actionButtonConfig.successMessages.loyalty;
    const message = messageTemplate.replace('{title}', newProgram.title || 'New loyalty program');
    
    setSuccessToast({ message });
  };

  // Handle notification creation
  const handleNotificationCreated = (notification) => {
    if (typeof onNotificationCreated === 'function') {
      onNotificationCreated(notification);
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 100
    }}>
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          bottom: '5rem',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-end'
        }}>
          {actionButtonConfig.actions.map(action => {
            const IconComponent = iconMap[action.icon];
            return (
              <div 
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }}
                title={action.description}
              >
                <span>{action.label}</span>
                {IconComponent && <IconComponent size={18} />}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Main Action Button */}
      <button
        onClick={toggleExpand}
        style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        <Plus size={24} />
      </button>

      {/* Campaign Creation Modal */}
      {isCampaignModalOpen && (
        <SplitCampaignCreationModal
          isOpen={isCampaignModalOpen}
          onClose={() => setIsCampaignModalOpen(false)}
          onCampaignCreated={handleCampaignCreated}
          onNotificationCreated={handleNotificationCreated}
        />
      )}

      {/* Loyalty Program Creation Modal */}
      {isLoyaltyModalOpen && (
        <FullScreenLoyaltyProgramModal
          isOpen={isLoyaltyModalOpen}
          onClose={() => setIsLoyaltyModalOpen(false)}
          onProgramCreated={handleProgramCreated}
        />
      )}

      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast 
          message={successToast.message}
          onClose={() => setSuccessToast(null)}
        />
      )}
    </div>
  );
};

export default ActionButton;
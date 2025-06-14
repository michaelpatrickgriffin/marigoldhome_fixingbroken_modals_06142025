// src/components/loyalty/LoyaltyProgramCreationHandler.js
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import FullScreenLoyaltyProgramModal from './FullScreenLoyaltyProgramModal';
import CampaignSuccessToast from '../feedback/CampaignSuccessToast';

const LoyaltyProgramCreationHandler = ({ 
  onProgramCreated, 
  onNotificationCreated,
  prepopulatedData = null,
  isModifyMode = false,
  buttonText = null
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  // Handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  // Handle program creation
  const handleProgramCreated = (newProgram) => {
    // Pass the program to parent component - CRITICAL FIX
    // This ensures the callback is correctly propagated to the dashboard
    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }
    
    // Show success toast
    setSuccessToast({
      message: `${newProgram.title || 'New loyalty program'} has been ${isModifyMode ? 'modified' : 'created'} successfully.`,
    });
    
    // Log the creation/modification
    console.log(`%c ${isModifyMode ? 'MODIFIED' : 'NEW'} LOYALTY PROGRAM CREATED IN HANDLER`, 'background: green; color: white; font-size: 14px;');
    console.log(newProgram);
  };

  // Handle notification creation 
  const handleNotificationCreated = (notification) => {
    // Pass the notification to parent component if callback exists
    if (onNotificationCreated) {
      onNotificationCreated(notification);
    }
    
    // Log the creation
    console.log('%c NEW NOTIFICATION CREATED', 'background: blue; color: white; font-size: 14px;');
    console.log(notification);
  };

  return (
    <>
      {/* Create Button */}
      <button 
        onClick={handleOpenModal}
        className="create-program-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.375rem',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Plus size={16} style={{ marginRight: '0.5rem' }} />
        {buttonText || (isModifyMode ? 'Modify Program' : 'Create New Program')}
      </button>
      
      {/* Full-screen Modal */}
      <FullScreenLoyaltyProgramModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProgramCreated={handleProgramCreated}
        onNotificationCreated={handleNotificationCreated}
        prepopulatedData={prepopulatedData}
        isModifyMode={isModifyMode}
      />
      
      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast 
          message={successToast.message}
          onClose={() => setSuccessToast(null)}
        />
      )}
    </>
  );
};

export default LoyaltyProgramCreationHandler;
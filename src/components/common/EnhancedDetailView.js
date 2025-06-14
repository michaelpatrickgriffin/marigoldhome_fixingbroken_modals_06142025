// src/components/common/EnhancedDetailView.js
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import ConstrainedModalWrapper from './ConstrainedModalWrapper';
import CampaignDetailView from '../campaigns/CampaignDetailView';
import ProgramDetailView from '../loyalty/ProgramDetailView';

const EnhancedDetailView = ({ 
  program, 
  onClose, 
  onImplement, 
  onModify, 
  onReject, 
  initialTab = 'overview',
  maxWidth = '80rem',
  centerContent = true
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Set initial tab when component mounts or initialTab changes
  useEffect(() => {
    if (initialTab && initialTab !== 'overview') {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Determine if this is a campaign or program
  const isCampaign = program && (program.type === 'Promotional' || program.type === 'Onboarding' || 
                                program.type === 'Product Launch' || program.type === 'Informational' ||
                                program.sent !== undefined);

  return (
    <ConstrainedModalWrapper 
      maxWidth={maxWidth} 
      centerContent={centerContent}
      onClose={onClose}
    >
      {isCampaign ? (
        <CampaignDetailView
          campaign={program}
          onClose={onClose}
          onImplement={onImplement}
          onModify={onModify}
          onReject={onReject}
          initialTab={activeTab}
          onTabChange={setActiveTab}
        />
      ) : (
        <ProgramDetailView
          program={program}
          onClose={onClose}
          onImplement={onImplement}
          onModify={onModify}
          onReject={onReject}
          initialTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </ConstrainedModalWrapper>
  );
};

export default EnhancedDetailView;
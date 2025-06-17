// src/components/layout/ActionButton.js - Updated for Modal System
import React, { useState } from 'react';
import { Plus, Zap, Mail, Gift, Users, Target, Calendar, TrendingUp } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { useCommonModals } from '../common/ModalManager';
import SplitCampaignCreationModal from '../campaigns/SplitCampaignCreationModal';
import FullScreenLoyaltyProgramModal from '../loyalty/FullScreenLoyaltyProgramModal';
import CampaignSuccessToast from '../feedback/CampaignSuccessToast';

const ActionButton = ({ 
  onCampaignCreated, 
  onProgramCreated, 
  onNotificationCreated 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(null);
  
  // Use the new modal system
  const { openCreationModal, openCampaignModal } = useCommonModals();

  // Menu items configuration
  const menuItems = [
    {
      id: 'campaign',
      label: 'Campaign',
      description: 'Create email or SMS campaign',
      icon: Mail,
      color: COLORS.blue,
      onClick: handleCreateCampaign
    },
    {
      id: 'loyalty',
      label: 'Loyalty Program',
      description: 'Build customer loyalty program',
      icon: Gift,
      color: COLORS.evergreen,
      onClick: handleCreateLoyaltyProgram
    },
    {
      id: 'automation',
      label: 'Automation',
      description: 'Set up automated workflows',
      icon: Zap,
      color: COLORS.purple,
      onClick: handleCreateAutomation
    },
    {
      id: 'segment',
      label: 'Audience Segment',
      description: 'Define customer segments',
      icon: Users,
      color: COLORS.orange,
      onClick: handleCreateSegment
    },
    {
      id: 'ab_test',
      label: 'A/B Test',
      description: 'Test campaign variations',
      icon: Target,
      color: COLORS.red,
      onClick: handleCreateABTest
    },
    {
      id: 'event',
      label: 'Event Campaign',
      description: 'Schedule promotional events',
      icon: Calendar,
      color: COLORS.amber,
      onClick: handleCreateEvent
    }
  ];

  // Action handlers using modal system
  function handleCreateCampaign() {
    setIsMenuOpen(false);
    
    openCampaignModal(null, {
      component: SplitCampaignCreationModal,
      fullscreen: true,
      props: {
        onCampaignCreated: handleCampaignCreated
      }
    });
  }

  function handleCreateLoyaltyProgram() {
    setIsMenuOpen(false);
    
    openCreationModal('loyalty', {
      component: FullScreenLoyaltyProgramModal,
      props: {
        onProgramCreated: handleProgramCreated
      }
    });
  }

  // Legacy handlers for items not yet converted to modal system
  function handleCreateAutomation() {
    setIsMenuOpen(false);
    console.log('Create Automation - Coming soon');
    showSuccessToast('Automation creation feature coming soon!');
  }

  function handleCreateSegment() {
    setIsMenuOpen(false);
    console.log('Create Segment - Coming soon');
    showSuccessToast('Segment creation feature coming soon!');
  }

  function handleCreateABTest() {
    setIsMenuOpen(false);
    console.log('Create A/B Test - Coming soon');
    showSuccessToast('A/B testing feature coming soon!');
  }

  function handleCreateEvent() {
    setIsMenuOpen(false);
    console.log('Create Event - Coming soon');
    showSuccessToast('Event campaign feature coming soon!');
  }

  // Success handlers
  const handleCampaignCreated = (newCampaign) => {
    console.log('Campaign created:', newCampaign);
    
    if (onCampaignCreated) {
      onCampaignCreated(newCampaign);
    }
    
    showSuccessToast(`Campaign "${newCampaign.name}" created successfully!`);
    
    if (onNotificationCreated) {
      onNotificationCreated({
        type: 'success',
        title: 'Campaign Created',
        message: `Campaign "${newCampaign.name}" has been created and is ready for launch.`,
        actions: [
          { label: 'View Campaign', action: () => console.log('View campaign:', newCampaign.id) }
        ]
      });
    }
  };

  const handleProgramCreated = (newProgram) => {
    console.log('Program created:', newProgram);
    
    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }
    
    showSuccessToast(`Program "${newProgram.title}" created successfully!`);
    
    if (onNotificationCreated) {
      onNotificationCreated({
        type: 'success',
        title: 'Loyalty Program Created',
        message: `Program "${newProgram.title}" has been created successfully.`,
        actions: [
          { label: 'View Program', action: () => console.log('View program:', newProgram.id) }
        ]
      });
    }
  };

  const showSuccessToast = (message) => {
    setSuccessToast({ message });
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const handleToastClose = () => {
    setSuccessToast(null);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Action Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: '1rem',
            width: '320px',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '1rem',
            zIndex: 1001,
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: COLORS.onyx,
            marginBottom: '1rem',
            paddingLeft: '0.5rem'
          }}>
            Create New
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${item.color}10`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComponent size={16} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: COLORS.onyx,
                      marginBottom: '0.125rem'
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: COLORS.onyxMedium,
                      lineHeight: '1.2'
                    }}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Quick Actions Footer */}
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              color: COLORS.onyxMedium,
              textAlign: 'center',
              marginBottom: '0.5rem'
            }}>
              Quick Actions
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  console.log('Quick import');
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: COLORS.onyxMedium,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Import
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  console.log('Quick duplicate');
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: COLORS.onyxMedium,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Duplicate
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  console.log('Quick template');
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: COLORS.onyxMedium,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 14px 0 rgba(26, 76, 73, 0.4)',
          transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
          position: 'relative',
          zIndex: 1002
        }}
        onMouseEnter={(e) => {
          if (!isMenuOpen) {
            e.target.style.transform = 'scale(1.1) rotate(0)';
            e.target.style.boxShadow = '0 6px 20px 0 rgba(26, 76, 73, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isMenuOpen) {
            e.target.style.transform = 'scale(1) rotate(0)';
            e.target.style.boxShadow = '0 4px 14px 0 rgba(26, 76, 73, 0.4)';
          }
        }}
      >
        <Plus size={24} />
      </button>

      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast 
          message={successToast.message}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default ActionButton;
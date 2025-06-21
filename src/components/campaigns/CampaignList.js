// src/components/campaigns/CampaignList.js
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import CampaignCard from './CampaignCard';
import CampaignDetailView from './CampaignDetailView';

// Campaign List Component
export const CampaignList = ({ campaigns, onViewAllClick, onCampaignClick }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    // We're no longer calling the parent onCampaignClick here
    // This prevents duplicate modals from being shown
  };

  const handleImplementRecommendation = (campaign, recommendation) => {
    console.log(`Implementing recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
    // Example: updateCampaignWithRecommendation(campaign.id, recommendation.id, 'implemented');
  };

  const handleModifyRecommendation = (campaign, recommendation) => {
    console.log(`Modifying recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would show a modification dialog
    // Example: setShowModificationModal({ campaign, recommendation });
  };

  const handleRejectRecommendation = (campaign, recommendation) => {
    console.log(`Rejecting recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
    // Example: updateCampaignWithRecommendation(campaign.id, recommendation.id, 'rejected');
  };

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
          Messaging
        </h2>
        <button 
          style={{ 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            color: COLORS.evergreen,
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
          onClick={onViewAllClick}
        >
          View All Campaigns
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.25rem' }}><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {campaigns.slice(0, 3).map(campaign => (
          <div 
            key={campaign.id}
            style={{ 
              overflow: 'hidden',
              borderRadius: '0.75rem',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
            }}
          >
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              onClick={handleCampaignClick}
            />
          </div>
        ))}
      </div>

      {/* Campaign Detail View - using the dedicated CampaignDetailView component */}
      {selectedCampaign && (
        <CampaignDetailView 
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onImplement={handleImplementRecommendation}
          onModify={handleModifyRecommendation}
          onReject={handleRejectRecommendation}
        />
      )}
    </section>
  );
};

// Full-screen Campaign Modal Component
export const CampaignModal = ({ 
  isOpen, 
  onClose, 
  campaigns, 
  filter, 
  setFilter, 
  onCampaignClick
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayCampaigns, setDisplayCampaigns] = useState(campaigns);

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    // Similarly, removing the parent callback here
    // to prevent duplicate modals
  };

  const handleImplementRecommendation = (campaign, recommendation) => {
    console.log(`Implementing recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
    // Example: updateCampaignWithRecommendation(campaign.id, recommendation.id, 'implemented');
  };

  const handleModifyRecommendation = (campaign, recommendation) => {
    console.log(`Modifying recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would show a modification dialog
    // Example: setShowModificationModal({ campaign, recommendation });
  };

  const handleRejectRecommendation = (campaign, recommendation) => {
    console.log(`Rejecting recommendation: ${recommendation.title} for campaign: ${campaign.title}`);
    // Here you would update your data or call an API
    // Example: updateCampaignWithRecommendation(campaign.id, recommendation.id, 'rejected');
  };

  const filteredCampaigns = () => {
    switch(filter) {
      case 'active':
        return campaigns.filter(campaign => campaign.status === 'Active');
      case 'scheduled':
        return campaigns.filter(campaign => campaign.status === 'Scheduled');
      case 'completed':
        return campaigns.filter(campaign => campaign.status === 'Completed');
      default:
        return campaigns;
    }
  };

  // Handle filter changes with animation
  React.useEffect(() => {
    if (!isOpen) return;
    
    setIsTransitioning(true);
    
    // Delay to allow fade out
    setTimeout(() => {
      setDisplayCampaigns(filteredCampaigns());
      setIsTransitioning(false);
    }, 200);
  }, [filter, isOpen]);

  // Initialize display campaigns when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setDisplayCampaigns(filteredCampaigns());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div>
      {/* Modal Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f7f8',
          zIndex: 101,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{ 
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              Marketing Campaigns
            </h2>
            <button 
              onClick={onClose}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            display: 'flex',
            gap: '2rem'
          }}>
            <button 
              onClick={() => setFilter('all')}
              style={{
                padding: '1rem 0',
                color: filter === 'all' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: filter === 'all' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: filter === 'all' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              All Campaigns
            </button>
            <button 
              onClick={() => setFilter('active')}
              style={{
                padding: '1rem 0',
                color: filter === 'active' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: filter === 'active' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: filter === 'active' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.375rem' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Active
            </button>
            <button 
              onClick={() => setFilter('scheduled')}
              style={{
                padding: '1rem 0',
                color: filter === 'scheduled' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: filter === 'scheduled' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: filter === 'scheduled' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Scheduled
            </button>
            <button 
              onClick={() => setFilter('completed')}
              style={{
                padding: '1rem 0',
                color: filter === 'completed' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: filter === 'completed' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: filter === 'completed' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Modal Body */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem'
          }}>
            {/* Campaign Count Display */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                margin: 0 
              }}>
                {filter === 'all' ? 'All Campaigns' : 
                 filter === 'active' ? 'Active Campaigns' :
                 filter === 'scheduled' ? 'Scheduled Campaigns' :
                 'Completed Campaigns'}
              </h3>
              <span style={{ 
                fontSize: '0.875rem', 
                color: COLORS.onyxMedium, 
                fontWeight: 500 
              }}>
                {displayCampaigns.length} campaigns
              </span>
            </div>
            
            {/* Grid of campaign cards */}
            <div 
              className="grid grid-cols-3 gap-6"
              style={{ 
                opacity: isTransitioning ? 0.3 : 1,
                transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {displayCampaigns.map((campaign, index) => (
                <div 
                  key={campaign.id} 
                  style={{ 
                    overflow: 'hidden',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
                    transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={(e) => {
                    if (!isTransitioning) {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isTransitioning) {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
                    }
                  }}
                >
                  <CampaignCard 
                    campaign={campaign}
                    onClick={handleCampaignClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Detail View - using the dedicated CampaignDetailView component */}
      {selectedCampaign && (
        <CampaignDetailView 
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onImplement={handleImplementRecommendation}
          onModify={handleModifyRecommendation}
          onReject={handleRejectRecommendation}
        />
      )}
    </div>
  );
};

export default CampaignList;
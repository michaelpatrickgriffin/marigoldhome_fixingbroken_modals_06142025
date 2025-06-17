// src/components/campaigns/CampaignList.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { Mail, Users, Calendar, TrendingUp, TrendingDown, MoreHorizontal, Play, Pause, Edit, Trash2, Copy, BarChart3, Target, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { useCommonModals } from '../common/ModalManager';
import DetailView from '../common/DetailView';
import SplitCampaignCreationModal from './SplitCampaignCreationModal';

export const CampaignList = ({ 
  campaigns = [], 
  onCampaignSelect, 
  onCampaignEdit,
  onCampaignDuplicate,
  onCampaignDelete 
}) => {
  const [hoveredCampaign, setHoveredCampaign] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  
  // Use the new modal system
  const { openDetailModal, openCampaignModal, openConfirmationModal } = useCommonModals();

  // Handle campaign selection using modal system
  const handleCampaignClick = (campaign) => {
    console.log('Opening campaign detail modal for:', campaign.name);
    
    openDetailModal(campaign, {
      component: DetailView,
      props: {
        program: campaign,
        onProgramCreated: (updatedCampaign) => {
          if (onCampaignEdit) {
            onCampaignEdit(updatedCampaign);
          }
        }
      }
    });
    
    // Call legacy handler if provided
    if (onCampaignSelect) {
      onCampaignSelect(campaign);
    }
  };

  // Handle campaign editing using modal system
  const handleEditCampaign = (campaign, e) => {
    e.stopPropagation(); // Prevent triggering campaign click
    
    openCampaignModal(campaign, {
      component: SplitCampaignCreationModal,
      fullscreen: true,
      props: {
        campaign: campaign, // Pass existing campaign for editing
        onCampaignCreated: (updatedCampaign) => {
          if (onCampaignEdit) {
            onCampaignEdit(updatedCampaign);
          }
        }
      }
    });
  };

  // Handle campaign duplication
  const handleDuplicateCampaign = (campaign, e) => {
    e.stopPropagation();
    
    const duplicatedCampaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    
    if (onCampaignDuplicate) {
      onCampaignDuplicate(duplicatedCampaign);
    }
  };

  // Handle campaign deletion with confirmation
  const handleDeleteCampaign = (campaign, e) => {
    e.stopPropagation();
    
    openConfirmationModal(
      'Delete Campaign',
      `Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`,
      () => {
        if (onCampaignDelete) {
          onCampaignDelete(campaign.id);
        }
      }
    );
  };

  // Sort campaigns
  const sortedCampaigns = React.useMemo(() => {
    const filtered = campaigns.filter(campaign => {
      if (filterBy === 'all') return true;
      return campaign.status.toLowerCase() === filterBy.toLowerCase();
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'performance':
          return (b.openRate || 0) - (a.openRate || 0);
        case 'date':
        default:
          return new Date(b.createdAt || b.launchDate || 0) - new Date(a.createdAt || a.launchDate || 0);
      }
    });
  }, [campaigns, sortBy, filterBy]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'sent':
        return COLORS.evergreen;
      case 'draft':
        return COLORS.amber;
      case 'scheduled':
        return COLORS.blue;
      case 'paused':
        return COLORS.onyxMedium;
      case 'completed':
        return COLORS.purple;
      default:
        return COLORS.onyxMedium;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return Play;
      case 'sent':
        return CheckCircle;
      case 'draft':
        return Edit;
      case 'scheduled':
        return Clock;
      case 'paused':
        return Pause;
      case 'completed':
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  if (campaigns.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Mail size={48} color={COLORS.onyxMedium} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
          No campaigns yet
        </h3>
        <p style={{ color: COLORS.onyxMedium, marginBottom: '2rem' }}>
          Create your first campaign to get started with engaging your customers.
        </p>
        <button
          onClick={() => openCampaignModal(null, {
            component: SplitCampaignCreationModal,
            fullscreen: true
          })}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Create Campaign
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters and Sort */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Status Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              color: COLORS.onyx,
              cursor: 'pointer'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="paused">Paused</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              color: COLORS.onyx,
              cursor: 'pointer'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="performance">Sort by Performance</option>
          </select>
        </div>

        <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          {sortedCampaigns.length} campaign{sortedCampaigns.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Campaign Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {sortedCampaigns.map((campaign) => {
          const StatusIcon = getStatusIcon(campaign.status);
          const statusColor = getStatusColor(campaign.status);
          
          return (
            <div
              key={campaign.id}
              onClick={() => handleCampaignClick(campaign)}
              onMouseEnter={() => setHoveredCampaign(campaign.id)}
              onMouseLeave={() => setHoveredCampaign(null)}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                transform: hoveredCampaign === campaign.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCampaign === campaign.id ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Status Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: statusColor,
                borderRadius: '1rem 1rem 0 0'
              }} />

              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <StatusIcon size={16} color={statusColor} />
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: statusColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {campaign.status}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4'
                  }}>
                    {campaign.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyxMedium,
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {campaign.description || campaign.type || 'Email Campaign'}
                  </p>
                </div>

                {/* Action Menu */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: hoveredCampaign === campaign.id ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                      border: 'none',
                      color: COLORS.onyxMedium,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  
                  {/* Quick Actions */}
                  {hoveredCampaign === campaign.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      zIndex: 10
                    }}>
                      <button
                        onClick={(e) => handleEditCampaign(campaign, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.onyx,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDuplicateCampaign(campaign, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.onyx,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Copy size={14} />
                        Duplicate
                      </button>
                      <button
                        onClick={(e) => handleDeleteCampaign(campaign, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.red,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {campaign.recipients || Math.floor(Math.random() * 10000) + 1000}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Recipients
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {campaign.openRate || `${(Math.random() * 40 + 10).toFixed(1)}%`}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Open Rate
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {campaign.clickRate || `${(Math.random() * 15 + 2).toFixed(1)}%`}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Click Rate
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium
                }}>
                  <Calendar size={12} />
                  {campaign.launchDate ? new Date(campaign.launchDate).toLocaleDateString() : 
                   campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 
                   'No date'}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium
                }}>
                  {campaign.type === 'email' ? <Mail size={12} /> : <Target size={12} />}
                  {campaign.type || 'Email'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Legacy CampaignModal component - kept for backward compatibility
export const CampaignModal = ({ 
  isOpen, 
  onClose, 
  campaign,
  onSave 
}) => {
  // This component is now handled by the modal system
  // Keeping it for backward compatibility but functionality moved to DetailView
  console.warn('CampaignModal is deprecated. Use DetailView through modal system instead.');
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 15200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Campaign Details
        </h2>
        <p style={{ color: COLORS.onyxMedium, marginBottom: '2rem' }}>
          This modal has been replaced by the new modal system. Please use DetailView through the modal system instead.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
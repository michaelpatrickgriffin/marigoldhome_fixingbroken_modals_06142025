// src/components/layout/ProfilePanel.js
import React, { useEffect, useState } from 'react';
import { X, User, Settings, HelpCircle, LogOut, Bell, ArrowUpRight, Zap, TrendingUp, Layers, Award, Users, BookOpen, Calendar, ChevronDown, Building2 } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { profilePanelConfig, profileRecommendationsData } from '../../data/SampleData';
import ProfileSwitchModal from './ProfileSwitchModal';
import '../../styles/ProfileSwitch.css';

// Icon mapping for menu items and recommendations
const iconMap = {
  'User': User,
  'Settings': Settings,
  'HelpCircle': HelpCircle,
  'LogOut': LogOut,
  'TrendingUp': TrendingUp,
  'Users': Users,
  'Layers': Layers,
  'Zap': Zap,
  'BookOpen': BookOpen,
  'Calendar': Calendar,
  'Award': Award,
  'Bell': Bell
};

const ProfilePanel = ({ isOpen, onClose, currentProfile, currentCompany, onProfileSwitch, onCompanySwitch }) => {
  const [showProfileSwitch, setShowProfileSwitch] = useState(false);
  const [recommendations, setRecommendations] = useState(profileRecommendationsData);

  const getProfileStats = () => {
    // Different stats based on role
    if (currentProfile?.id === 'janet_wilson') {
      return [
        { label: 'Active Campaigns', value: '8' },
        { label: 'This Month', value: '5' },
        { label: 'Pending', value: '2' }
      ];
    } else {
      return [
        { label: 'Campaigns', value: '12' },
        { label: 'Team Members', value: '8' },
        { label: 'Reports', value: '4' }
      ];
    }
  };

  const profileStats = getProfileStats();

  // Effect to prevent body scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      // Save the current overflow value to restore it later
      const originalOverflow = document.body.style.overflow;
      
      // Prevent scrolling on the main document
      document.body.style.overflow = 'hidden';
      
      // Clean up function to restore original scrolling
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const dismissRecommendation = (id) => {
    setRecommendations(prevRecs => prevRecs.filter(rec => rec.id !== id));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: 90,
          backdropFilter: 'blur(2px)'
        }}
        onClick={onClose}
      />

      {/* Full Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '360px',
          height: '100%',
          backgroundColor: 'white',
          boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header with user profile and metrics - PINNED */}
        <div style={{ 
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}>
          {/* Header with profile and close button on the same row */}
          <div style={{ 
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Profile info moved to the left side of the header - NOW CLICKABLE */}
            <button
              onClick={() => setShowProfileSwitch(true)}
              className="profile-clickable-area"
            >
              <div 
                style={{ 
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                {currentProfile?.avatar || 'AM'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.125rem', margin: 0 }}>
                    {currentProfile?.name || 'Alex Morgan'}
                  </p>
                  <ChevronDown size={16} style={{ color: COLORS.onyxMedium, marginLeft: '0.25rem' }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, margin: 0 }}>
                  {currentProfile?.title || 'Marketing Director'}
                </p>
              </div>
            </button>
            
            {/* Close button */}
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

          {/* ✅ NEW: Current Company Display (non-interactive) */}
          <div style={{ 
            padding: '0 1.5rem 1rem 1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '0.5rem'
            }}>
              <div 
                style={{ 
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.375rem',
                  backgroundColor: currentCompany?.color || COLORS.evergreen,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}
              >
                {currentCompany?.logo || 'OS'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: COLORS.onyx, marginBottom: '0.125rem' }}>
                  {currentCompany?.name || 'Outdoor Sportswear Co.'}
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25' }}>
                  {currentCompany?.industry || 'Retail - Outdoor Equipment'}
                </div>
              </div>
            </div>
          </div>
          
          {/* User stats */}
          <div style={{ 
            padding: '0 1.5rem 1.5rem 1.5rem',
          }}>
            <div style={{ display: 'flex' }}>
              {profileStats.map((stat, index) => (
                <div 
                  key={index}
                  style={{ 
                    flex: 1, 
                    textAlign: 'center', 
                    padding: '0.5rem',
                    ...(index !== 0 && index !== profileStats.length - 1 ? {
                      borderLeft: '1px solid rgba(0,0,0,0.08)',
                      borderRight: '1px solid rgba(0,0,0,0.08)'
                    } : index === 1 && profileStats.length === 3 ? {
                      borderLeft: '1px solid rgba(0,0,0,0.08)',
                      borderRight: '1px solid rgba(0,0,0,0.08)'
                    } : {})
                  }}
                >
                  <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>{stat.value}</p>
                  <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account navigation section - PINNED */}
        <div style={{ 
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}>
          {profilePanelConfig.menuItems.map((item, i) => {
            const IconComponent = iconMap[item.icon];
            return (
              <React.Fragment key={i}>
                <button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    width: '100%',
                    textAlign: 'left',
                    color: COLORS.onyx,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  className="hover:bg-gray-50"
                >
                  {IconComponent && <IconComponent size={18} style={{ color: COLORS.onyxMedium, marginRight: '0.75rem' }} />}
                  <span style={{ fontSize: '0.9375rem' }}>
                    {item.label}
                  </span>
                </button>
                {item.divider && (
                  <div style={{ 
                    margin: '0.5rem 0',
                    borderTop: '1px solid rgba(0,0,0,0.08)'
                  }}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Scrollable recommendations section - ONLY THIS SCROLLS */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: COLORS.onyxMedium, 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              letterSpacing: '0.05em'
            }}>
              {profilePanelConfig.sectionLabels.forYou}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recommendations.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div 
                    key={item.id}
                    style={{ 
                      padding: '1rem',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '0.75rem',
                      position: 'relative',
                      transition: 'background-color 0.2s'
                    }}
                    className="hover:bg-gray-50"
                  >
                    {/* Dismiss button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissRecommendation(item.id);
                      }}
                      style={{ 
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        color: 'rgba(0,0,0,0.3)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        opacity: 0.7,
                        transition: 'opacity 0.2s, background-color 0.2s'
                      }}
                      className="hover:bg-gray-200"
                      onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                      onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                      title="Dismiss"
                    >
                      <X size={14} />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        flexShrink: 0
                      }}>
                        {IconComponent && <IconComponent size={16} />}
                      </div>
                      
                      <div style={{ flex: 1, paddingRight: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                            {item.title}
                          </h5>
                          <ArrowUpRight size={14} style={{ color: COLORS.onyxMedium, marginTop: '0.2rem' }} />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: 1.5 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {recommendations.length === 0 && (
                <div style={{ 
                  padding: '2rem 1rem', 
                  textAlign: 'center', 
                  color: COLORS.onyxMedium,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: '0.75rem',
                }}>
                  <p>{profilePanelConfig.sectionLabels.noRecommendations}</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    {profilePanelConfig.sectionLabels.checkBackLater}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          backgroundColor: 'rgba(0,0,0,0.02)'
        }}>
          <div 
            style={{ 
              fontSize: '0.75rem', 
              color: COLORS.onyxMedium,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>{profilePanelConfig.footerInfo.product}</span>
            <span style={{ margin: '0 0.5rem', color: COLORS.onyxMedium }}>•</span>
            <span>{profilePanelConfig.footerInfo.version}</span>
          </div>
        </div>
      </div>
      
      {/* Profile Switch Modal */}
      <ProfileSwitchModal 
        isOpen={showProfileSwitch}
        onClose={() => setShowProfileSwitch(false)}
        currentProfile={currentProfile}
        currentCompany={currentCompany}
        onProfileSwitch={onProfileSwitch}
        onCompanySwitch={onCompanySwitch}
        isInitialSetup={false}
      />
    </>
  );
};

export default ProfilePanel;
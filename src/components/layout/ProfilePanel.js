// src/components/layout/ProfilePanel.js - FIXED Z-INDEX ISSUES
import React, { useState, useEffect } from 'react';
import { X, User, Settings, LogOut, Bell, Shield, HelpCircle, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { userProfiles } from '../../data/SampleData';

const ProfilePanel = ({ 
  isOpen, 
  onClose, 
  currentProfile, 
  onProfileSwitch 
}) => {
  const [selectedProfile, setSelectedProfile] = useState(currentProfile);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  // Update selected profile when current profile changes
  useEffect(() => {
    setSelectedProfile(currentProfile);
  }, [currentProfile]);

  // Handle profile selection
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    onProfileSwitch(profile);
    setShowProfileSelector(false);
  };

  // Handle logout
  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
    onClose();
  };

  // Handle settings
  const handleSettings = () => {
    alert('Settings functionality would be implemented here');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '350px',
        backgroundColor: 'white',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1200, // FIXED: Use profile panel z-index from standards
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 1201 // FIXED: Above panel content
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
            Profile
          </h2>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              color: COLORS.onyxMedium,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Profile Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.75rem',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: COLORS.evergreen,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 'bold'
          }}>
            {selectedProfile?.avatar || 'U'}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
              {selectedProfile?.name || 'User'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
              {selectedProfile?.role || 'Marketing Manager'}
            </p>
          </div>
          <button
            onClick={() => setShowProfileSelector(!showProfileSelector)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              color: COLORS.onyxMedium,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronRight 
              size={16} 
              style={{ 
                transition: 'transform 0.2s ease',
                transform: showProfileSelector ? 'rotate(90deg)' : 'rotate(0deg)'
              }} 
            />
          </button>
        </div>

        {/* Profile Selector */}
        {showProfileSelector && (
          <div style={{
            marginTop: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            {userProfiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => handleProfileSelect(profile)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: selectedProfile?.id === profile.id ? `${COLORS.evergreen}10` : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (selectedProfile?.id !== profile.id) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProfile?.id !== profile.id) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: COLORS.evergreen,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  {profile.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>
                    {profile.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                    {profile.role}
                  </div>
                </div>
                {selectedProfile?.id === profile.id && (
                  <Check size={16} color={COLORS.evergreen} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div style={{
        flex: 1,
        padding: '1rem 0',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Account Section */}
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: COLORS.onyxMedium,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 0.5rem 0',
              padding: '0 2rem'
            }}>
              Account
            </h4>
            
            {[
              { icon: User, label: 'Personal Information', action: handleSettings },
              { icon: Bell, label: 'Notification Settings', action: handleSettings },
              { icon: Shield, label: 'Privacy & Security', action: handleSettings }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <IconComponent size={18} color={COLORS.onyxMedium} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyx, fontWeight: 500 }}>
                    {item.label}
                  </span>
                  <ChevronRight size={16} color={COLORS.onyxLight} style={{ marginLeft: 'auto' }} />
                </button>
              );
            })}
          </div>

          {/* Support Section */}
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: COLORS.onyxMedium,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 0.5rem 0',
              padding: '0 2rem'
            }}>
              Support
            </h4>
            
            {[
              { icon: HelpCircle, label: 'Help Center', action: () => window.open('/help', '_blank') },
              { icon: Settings, label: 'App Settings', action: handleSettings }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <IconComponent size={18} color={COLORS.onyxMedium} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyx, fontWeight: 500 }}>
                    {item.label}
                  </span>
                  <ChevronRight size={16} color={COLORS.onyxLight} style={{ marginLeft: 'auto' }} />
                </button>
              );
            })}
          </div>

          {/* Profile Information */}
          <div style={{ marginTop: 'auto', padding: '0 2rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
                Current Dashboard
              </h4>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, margin: 0 }}>
                {selectedProfile?.defaultDashboard === 'marketing' ? 'Marketing Dashboard' :
                 selectedProfile?.defaultDashboard === 'rfm' ? 'RFM Analysis' :
                 selectedProfile?.defaultDashboard === 'narrative' ? 'Narrative Dashboard' :
                 'Standard Dashboard'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 1201 // FIXED: Above panel content
      }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
            e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
        
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'center', 
          fontSize: '0.75rem', 
          color: COLORS.onyxLight 
        }}>
          Marigold Engage v2.4.1
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
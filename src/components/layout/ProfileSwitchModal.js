// src/components/layout/ProfileSwitchModal.js
import React from 'react';
import { X, User, Users } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { userProfiles, dashboardConfigurations } from '../../data/SampleData';
import '../../styles/ProfileSwitch.css';

const ProfileSwitchModal = ({ isOpen, onClose, currentProfile, onProfileSwitch }) => {
  if (!isOpen) return null;

  const handleProfileSelect = (profile) => {
    onProfileSwitch(profile);
    onClose();
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
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 200,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 201,
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: COLORS.onyx,
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              Switch Profile
            </h2>
            <p style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium,
              margin: 0
            }}>
              Choose your role and dashboard view
            </p>
          </div>
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
              background: 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            className="hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Profile Options */}
        <div style={{ padding: '1rem' }}>
          {userProfiles.map((profile) => {
            const isSelected = currentProfile?.id === profile.id;
            
            return (
              <button
                key={profile.id}
                onClick={() => handleProfileSelect(profile)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  backgroundColor: isSelected ? 'rgba(26, 76, 73, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  border: isSelected ? `2px solid ${COLORS.evergreen}` : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                className={!isSelected ? "hover:bg-gray-50 hover:border-gray-200" : ""}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? COLORS.evergreen : COLORS.onyxMedium,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      flexShrink: 0
                    }}
                  >
                    {profile.avatar}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: COLORS.onyx,
                        margin: 0,
                        marginRight: '0.5rem'
                      }}>
                        {profile.name}
                      </h3>
                      {isSelected && (
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: COLORS.evergreen,
                          backgroundColor: 'rgba(26, 76, 73, 0.1)',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '1rem'
                        }}>
                          Current
                        </span>
                      )}
                    </div>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: COLORS.onyxMedium,
                      margin: 0,
                      marginBottom: '0.5rem'
                    }}>
                      {profile.title}
                    </p>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: COLORS.onyxMedium,
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {profile.description}
                    </p>
                    
                    {/* Dashboard badges */}
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {profile.dashboards.map((dashboard) => (
                        <span
                          key={dashboard}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: COLORS.onyxMedium,
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem'
                          }}
                        >
                          {dashboardConfigurations[dashboard]?.label || dashboard}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Footer */}
        <div style={{ 
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: COLORS.onyxMedium,
            margin: 0,
            textAlign: 'center'
          }}>
            Your dashboard preferences will be saved automatically
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileSwitchModal;
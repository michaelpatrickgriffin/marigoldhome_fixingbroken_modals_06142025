// src/components/layout/ProfileSwitchModal.js
import React, { useState, useEffect } from 'react';
import { X, User, Users, Building2, Settings } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { userProfiles, dashboardConfigurations } from '../../data/SampleData';
import { companyProfiles } from '../../data/CompanyDataManager';
import { useMVPUI } from '../../contexts/MVPUIContext';
import '../../styles/ProfileSwitch.css';

const ProfileSwitchModal = ({ isOpen, onClose, currentProfile, currentCompany, onProfileSwitch, onCompanySwitch, onApply, isInitialSetup = false }) => {
  const [selectedProfile, setSelectedProfile] = useState(currentProfile);
  const [selectedCompany, setSelectedCompany] = useState(currentCompany);
  const { isMVPMode, toggleMVPMode } = useMVPUI();

  // Update selections when props change (useful when modal reopens)
  useEffect(() => {
    setSelectedProfile(currentProfile);
    setSelectedCompany(currentCompany);
  }, [currentProfile, currentCompany]);

  if (!isOpen) return null;

  // ✅ UPDATED: Always use multi-select mode - no immediate application
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    // Always allow multiple selections before applying
  };

  const handleCompanySelect = (companyId) => {
    const company = companyProfiles.find(c => c.id === companyId);
    setSelectedCompany(company);
    // Always allow multiple selections before applying
  };

  // ✅ UPDATED: Unified apply handler for both modes
  const handleApply = () => {
    const profileChanged = selectedProfile?.id !== currentProfile?.id;
    const companyChanged = selectedCompany?.id !== currentCompany?.id;
    
    if (isInitialSetup && onApply) {
      // Initial setup mode - use the onApply callback
      onApply({
        profile: profileChanged ? selectedProfile : null,
        company: companyChanged ? selectedCompany.id : null
      });
    } else {
      // Profile panel mode - use individual callbacks
      if (profileChanged && onProfileSwitch) {
        onProfileSwitch(selectedProfile);
      }
      if (companyChanged && onCompanySwitch) {
        onCompanySwitch(selectedCompany.id);
      }
      onClose();
    }
  };

  // ✅ UPDATED: Check for any changes (for both modes)
  const hasChanges = selectedProfile?.id !== currentProfile?.id || selectedCompany?.id !== currentCompany?.id;

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
          width: '450px',
          maxHeight: '80vh',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 201,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
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
              {isInitialSetup ? 'Set Initial Context' : 'Switch Context'}
            </h2>
            <p style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium,
              margin: 0
            }}>
              {isInitialSetup ? 'Choose your company and profile to get started' : 'Choose your company and profile'}
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
        
        {/* Scrollable Content */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '1rem'
        }}>
          {/* Company Selection Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>
              <Building2 size={18} style={{ color: COLORS.onyxMedium, marginRight: '0.5rem' }} />
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: COLORS.onyx,
                margin: 0
              }}>
                Company
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {companyProfiles.map((company) => {
                const isSelected = selectedCompany?.id === company.id;
                return (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: isSelected ? 'rgba(26, 76, 73, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      border: isSelected ? `2px solid ${COLORS.evergreen}` : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                    className={!isSelected ? "hover:bg-gray-50 hover:border-gray-200" : ""}
                  >
                    <div 
                      style={{ 
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: company.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}
                    >
                      {company.logo}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: COLORS.onyx }}>
                          {company.name}
                        </div>
                        {isSelected && (
                          <span style={{
                            fontSize: '0.625rem',
                            fontWeight: 500,
                            color: COLORS.evergreen,
                            backgroundColor: 'rgba(26, 76, 73, 0.1)',
                            padding: '0.125rem 0.375rem',
                            borderRadius: '0.75rem',
                            marginLeft: '0.5rem'
                          }}>
                            Selected
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25' }}>
                        {company.industry}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25', marginTop: '0.25rem' }}>
                        {company.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Selection Section */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>
              <User size={18} style={{ color: COLORS.onyxMedium, marginRight: '0.5rem' }} />
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: COLORS.onyx,
                margin: 0
              }}>
                Profile & Role
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {userProfiles.map((profile) => {
                const isSelected = selectedProfile?.id === profile.id;
                
                return (
                  <button
                    key={profile.id}
                    onClick={() => handleProfileSelect(profile)}
                    style={{
                      width: '100%',
                      padding: '1rem',
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
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? COLORS.evergreen : COLORS.onyxMedium,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          flexShrink: 0
                        }}
                      >
                        {profile.avatar}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <h3 style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: 600, 
                            color: COLORS.onyx,
                            margin: 0,
                            marginRight: '0.5rem'
                          }}>
                            {profile.name}
                          </h3>
                          {isSelected && (
                            <span style={{
                              fontSize: '0.625rem',
                              fontWeight: 500,
                              color: COLORS.evergreen,
                              backgroundColor: 'rgba(26, 76, 73, 0.1)',
                              padding: '0.125rem 0.375rem',
                              borderRadius: '0.75rem'
                            }}>
                              Selected
                            </span>
                          )}
                        </div>
                        <p style={{ 
                          fontSize: '0.75rem', 
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
                                fontSize: '0.625rem',
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
          </div>

          {/* ✅ MVP UI Toggle Section */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>
              <Settings size={18} style={{ color: COLORS.onyxMedium, marginRight: '0.5rem' }} />
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: COLORS.onyx,
                margin: 0
              }}>
                UI Preferences
              </h3>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: COLORS.onyx, marginBottom: '0.25rem' }}>
                  Show only MVP UI
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25' }}>
                  Hide complex features and show simplified interface
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '44px',
                height: '24px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={isMVPMode}
                  onChange={toggleMVPMode}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: isMVPMode ? COLORS.evergreen : '#ccc',
                  transition: '0.3s',
                  borderRadius: '24px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '18px',
                    width: '18px',
                    left: isMVPMode ? '23px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.3s',
                    borderRadius: '50%'
                  }} />
                </span>
              </label>
            </div>
          </div>
        </div>
        
        {/* ✅ UPDATED: Footer - Always show apply/cancel pattern */}
        <div style={{ 
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: COLORS.onyxMedium,
            margin: 0
          }}>
            {hasChanges ? 'Click Apply to save your changes' : 'Select your preferences above'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                color: COLORS.onyxMedium,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="hover:bg-gray-50"
            >
              {isInitialSetup ? 'Skip' : 'Cancel'}
            </button>
            <button
              onClick={handleApply}
              disabled={!hasChanges}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: hasChanges ? COLORS.evergreen : 'rgba(0, 0, 0, 0.1)',
                color: hasChanges ? 'white' : COLORS.onyxMedium,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSwitchModal;
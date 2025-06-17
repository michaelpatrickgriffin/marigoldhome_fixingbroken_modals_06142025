// src/components/layout/Header.js - FIXED Z-INDEX CONFLICTS
import React, { useEffect, useState, useRef } from 'react';
import { Bell, HelpCircle, Bot, ChevronDown, Search, Sparkles } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import MarigoldAICopilot from './MarigoldAICopilot';

const Header = ({ 
  isMenuOpen, 
  isMenuPinned, 
  setIsMenuOpen, 
  notificationCount, 
  setIsNotificationPanelOpen, 
  setIsProfilePanelOpen,
  currentProfile,
  hasCriticalNotifications = false
}) => {
  const [shouldPulse, setShouldPulse] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const helpDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Trigger pulse animation when critical notifications are present
  useEffect(() => {
    if (hasCriticalNotifications && notificationCount > 0) {
      setShouldPulse(true);
      const timer = setTimeout(() => {
        setShouldPulse(false);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShouldPulse(false);
    }
  }, [hasCriticalNotifications, notificationCount]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setShowHelpDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchExpanded]);

  // Close dropdowns on window resize to prevent positioning issues
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      // Debounce resize handling to prevent loops
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setShowHelpDropdown(false);
        setIsSearchExpanded(false);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Suppress ResizeObserver errors in development
  useEffect(() => {
    const handleError = (event) => {
      if (event.message && event.message.includes('ResizeObserver loop completed')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Handle help option selection
  const handleHelpOptionClick = (type) => {
    setShowHelpDropdown(false);
    
    if (type === 'traditional') {
      // Open help center in new tab
      window.open('/help', '_blank');
    } else if (type === 'ai') {
      // Open the AI chatbot
      setShowAIChatbot(true);
    }
  };

  // Handle help button click
  const handleHelpButtonClick = () => {
    setShowHelpDropdown(prev => !prev);
  };

  // Handle search expansion
  const handleSearchClick = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, open AI chatbot with the search query
      setShowAIChatbot(true);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  // Unified icon button base style
  const iconButtonBaseStyle = {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: '1px solid transparent',
    cursor: 'pointer',
    color: COLORS.onyxMedium,
    position: 'relative',
    transition: 'all 0.2s ease-in-out'
  };

  // Active/hover state modifications
  const getIconButtonStyle = (isActive = false) => ({
    ...iconButtonBaseStyle,
    background: isActive ? 'rgba(26, 76, 73, 0.08)' : 'none',
    border: isActive ? '1px solid rgba(26, 76, 73, 0.15)' : '1px solid transparent',
    color: isActive ? COLORS.evergreen : COLORS.onyxMedium,
    boxShadow: isActive ? '0 1px 3px rgba(26, 76, 73, 0.1)' : 'none'
  });

  // Help button style (accommodates chevron)
  const getHelpButtonStyle = () => ({
    ...iconButtonBaseStyle,
    width: 'auto',
    minWidth: '2.25rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    gap: '0.25rem',
    background: showHelpDropdown ? 'rgba(26, 76, 73, 0.08)' : 'none',
    border: showHelpDropdown ? '1px solid rgba(26, 76, 73, 0.15)' : '1px solid transparent',
    color: showHelpDropdown ? COLORS.evergreen : COLORS.onyxMedium,
    boxShadow: showHelpDropdown ? '0 1px 3px rgba(26, 76, 73, 0.1)' : 'none'
  });

  // Search container style
  const getSearchContainerStyle = () => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '2.25rem',
    width: '2.25rem',
    transition: 'all 0.3s ease-in-out'
  });

  // Search box style (the actual expanding element)
  const getSearchBoxStyle = () => ({
    position: isSearchExpanded ? 'absolute' : 'relative',
    top: isSearchExpanded ? '0' : 'auto',
    right: isSearchExpanded ? '0' : 'auto',
    display: 'flex',
    alignItems: 'center',
    height: '2.25rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'white',
    transition: 'all 0.3s ease-in-out',
    width: isSearchExpanded ? '320px' : '2.25rem',
    boxShadow: isSearchExpanded ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
    zIndex: isSearchExpanded ? 400 : 'auto' // FIXED: Use consistent z-index from standards
  });

  // Avatar style (circular but consistent with icon family)
  const getAvatarStyle = () => ({
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.evergreen,
    color: 'white',
    cursor: 'pointer',
    border: '1px solid rgba(26, 76, 73, 0.2)',
    boxShadow: '0 1px 3px rgba(26, 76, 73, 0.15)',
    transition: 'all 0.2s ease-in-out',
    fontSize: '0.875rem',
    fontWeight: '600'
  });

  return (
    <>
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        marginLeft: (isMenuOpen && isMenuPinned) ? '280px' : '0',
        transition: 'margin-left 0.3s ease-in-out',
        position: 'relative', // FIXED: Ensure proper stacking context
        zIndex: 350 // FIXED: Use z-header from standards
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Hamburger menu button */}
            {(!isMenuOpen || !isMenuPinned) && (
              <button 
                style={{ 
                  ...getIconButtonStyle(),
                  marginRight: '1rem'
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onMouseEnter={(e) => {
                  if (!isMenuOpen || !isMenuPinned) {
                    e.currentTarget.style.background = 'rgba(26, 76, 73, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMenuOpen || !isMenuPinned) {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            )}
            
            {/* Logo in header when menu is closed */}
            {(!isMenuOpen || !isMenuPinned) && (
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                backgroundColor: COLORS.evergreen,
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>M</span>
              </div>
            )}
          </div>
          
          {/* Right side icons - consistent spacing */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            {/* Intelligent Search */}
            <div 
              ref={searchRef}
              style={getSearchContainerStyle()}
            >
              <div 
                style={getSearchBoxStyle()}
                onClick={handleSearchClick}
              >
                {!isSearchExpanded ? (
                  // Collapsed search button
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: COLORS.onyxMedium
                  }}>
                    <Search size={20} />
                  </div>
                ) : (
                  // Expanded search form
                  <form onSubmit={handleSearchSubmit} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      paddingLeft: '0.75rem',
                      color: COLORS.evergreen 
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask me anything about your marketing..."
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        background: 'transparent',
                        color: COLORS.onyx,
                        minWidth: 0
                      }}
                    />
                    {searchQuery && (
                      <button
                        type="submit"
                        style={{
                          padding: '0.25rem 0.5rem',
                          marginRight: '0.5rem',
                          background: COLORS.evergreen,
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        Ask
                      </button>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button 
                style={getIconButtonStyle()}
                onClick={() => {
                  setIsNotificationPanelOpen(true);
                  setIsProfilePanelOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 76, 73, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <div 
                    className={`notification-badge ${shouldPulse ? 'pulse-critical' : ''}`}
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      backgroundColor: '#F44336',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '9px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white',
                      boxShadow: hasCriticalNotifications ? '0 0 0 2px rgba(244, 67, 54, 0.2)' : 'none',
                      padding: '0 4px'
                    }}
                  >
                    {notificationCount}
                  </div>
                )}
              </button>
            </div>

            {/* Profile avatar */}
            <div 
              style={getAvatarStyle()}
              onClick={() => {
                setIsProfilePanelOpen(true);
                setIsNotificationPanelOpen(false);
                setShowHelpDropdown(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(26, 76, 73, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(26, 76, 73, 0.15)';
              }}
            >
              {currentProfile?.avatar || 'AM'}
            </div>

            {/* Help dropdown - positioned at far right */}
            <div className="relative" ref={helpDropdownRef} style={{ position: 'relative' }}>
              <button 
                style={getHelpButtonStyle()}
                onClick={handleHelpButtonClick}
                onMouseEnter={(e) => {
                  if (!showHelpDropdown) {
                    e.target.style.background = 'rgba(26, 76, 73, 0.05)';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showHelpDropdown) {
                    e.target.style.background = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <HelpCircle size={20} />
                <ChevronDown 
                  size={14} 
                  style={{ 
                    transition: 'transform 0.2s ease-in-out',
                    transform: showHelpDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </button>

              {/* Help dropdown menu - FIXED Z-INDEX */}
              {showHelpDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: '0',
                    minWidth: '220px',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    zIndex: 400, // FIXED: Use navigation z-index from standards
                    overflow: 'hidden'
                  }}
                >
                  {/* Traditional Help Option */}
                  <button
                    onClick={() => handleHelpOptionClick('traditional')}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.875rem 1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <HelpCircle size={18} style={{ marginRight: '0.75rem', color: COLORS.onyxMedium, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '500', color: COLORS.onyx, lineHeight: '1.25' }}>
                        Help Center
                      </div>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25' }}>
                        Documentation & guides
                      </div>
                    </div>
                  </button>

                  {/* AI Help Option */}
                  <button
                    onClick={() => handleHelpOptionClick('ai')}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.875rem 1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <Bot size={18} style={{ marginRight: '0.75rem', color: COLORS.evergreen, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '500', color: COLORS.onyx, lineHeight: '1.25' }}>
                        AI Assistant
                      </div>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, lineHeight: '1.25' }}>
                        Get instant help with AI
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* AI Chatbot - FIXED Z-INDEX */}
      {showAIChatbot && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20000, // FIXED: Use AI assistant z-index from standards
          pointerEvents: 'none'
        }}>
          <MarigoldAICopilot 
            isOpen={showAIChatbot}
            onClose={() => setShowAIChatbot(false)}
            initialQuery={searchQuery}
          />
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        .notification-badge.pulse-critical {
          animation: pulseCritical 2s infinite;
        }

        @keyframes pulseCritical {
          0% {
            box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
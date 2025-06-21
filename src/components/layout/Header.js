// src/components/layout/Header.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  
  const helpDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const pulseTimeoutRef = useRef(null);

  // Debounced resize handler to prevent errors
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      try {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          setIsMobile(newIsMobile);
          // Close dropdowns when switching to mobile
          if (newIsMobile) {
            setShowHelpDropdown(false);
            setIsSearchExpanded(false);
            setSearchQuery('');
          }
        }
      } catch (error) {
        console.debug('Resize handler error (suppressed):', error);
      }
    }, 150);
  }, [isMobile]);

  // Enhanced resize handling with ResizeObserver error suppression
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Suppress ResizeObserver loop errors
    const handleResizeObserverError = (event) => {
      if (event.message && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
      if (event.message && event.message.includes('ResizeObserver loop limit exceeded')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    window.addEventListener('error', handleResizeObserverError);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('error', handleResizeObserverError);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  // Trigger pulse animation when critical notifications are present
  useEffect(() => {
    if (hasCriticalNotifications && notificationCount > 0) {
      setShouldPulse(true);
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
      pulseTimeoutRef.current = setTimeout(() => {
        setShouldPulse(false);
      }, 10000);
    } else {
      setShouldPulse(false);
    }
    
    return () => {
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, [hasCriticalNotifications, notificationCount]);

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      try {
        if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
          setShowHelpDropdown(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setIsSearchExpanded(false);
          setSearchQuery('');
        }
      } catch (error) {
        console.warn('Click outside handler error:', error);
        // Fallback - close all dropdowns
        setShowHelpDropdown(false);
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
      const timer = setTimeout(() => {
        try {
          searchInputRef.current?.focus();
        } catch (error) {
          console.warn('Focus error:', error);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isSearchExpanded]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, []);

  // Handle help option selection
  const handleHelpOptionClick = (type) => {
    setShowHelpDropdown(false);
    
    if (type === 'traditional') {
      window.open('/help', '_blank');
    } else if (type === 'ai') {
      setShowAIChatbot(true);
    }
  };

  // Handle help button click
  const handleHelpButtonClick = () => {
    setShowHelpDropdown(prev => !prev);
  };

  // Handle search expansion
  const handleSearchClick = () => {
    if (!isSearchExpanded && !isMobile) {
      setIsSearchExpanded(true);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
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
    transition: 'all 0.2s ease-in-out',
    flexShrink: 0
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
    width: isMobile ? '2.25rem' : (isSearchExpanded ? '320px' : '2.25rem'),
    transition: 'all 0.3s ease-in-out'
  });

  // Search box style (the actual expanding element)
  const getSearchBoxStyle = () => ({
    position: isSearchExpanded && !isMobile ? 'absolute' : 'relative',
    top: isSearchExpanded && !isMobile ? '0' : 'auto',
    right: isSearchExpanded && !isMobile ? '0' : 'auto',
    display: 'flex',
    alignItems: 'center',
    height: '2.25rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'white',
    transition: 'all 0.3s ease-in-out',
    width: isSearchExpanded && !isMobile ? '320px' : '2.25rem',
    boxShadow: isSearchExpanded && !isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
    zIndex: isSearchExpanded && !isMobile ? 9998 : 'auto'
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
    fontWeight: '600',
    flexShrink: 0
  });

  return (
    <>
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        marginLeft: (isMenuOpen && isMenuPinned) ? '280px' : '0',
        transition: 'margin-left 0.3s ease-in-out',
        overflow: 'visible', // Allow dropdowns to extend beyond header
        position: 'relative',
        zIndex: 40 // Lower than sidebar (50) but above main content
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center" style={{ minWidth: 0 }}>
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
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>M</span>
              </div>
            )}
          </div>
          
          {/* Right side icons - consistent spacing */}
          <div className="flex items-center" style={{ gap: '0.5rem', flexShrink: 0 }}>
            {/* Intelligent Search - hide on mobile if needed */}
            {!isMobile && (
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
                        color: COLORS.evergreen,
                        flexShrink: 0
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
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          Ask
                        </button>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}

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

            {/* Help dropdown - positioned at far right with MAXIMUM z-index */}
            <div 
              className="relative" 
              ref={helpDropdownRef} 
              style={{ 
                position: 'relative',
                zIndex: 10000 // Maximum z-index for container
              }}
            >
              <button 
                style={getHelpButtonStyle()}
                onClick={handleHelpButtonClick}
                onMouseEnter={(e) => {
                  if (!showHelpDropdown) {
                    e.currentTarget.style.background = 'rgba(26, 76, 73, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showHelpDropdown) {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
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

              {/* Help dropdown menu - MAXIMUM Z-INDEX to appear above everything */}
              {showHelpDropdown && (
                <div 
                  style={{
                    position: 'fixed', // Changed to fixed for better positioning
                    top: '4rem', // Position below header
                    right: '1.5rem', // Align with right edge
                    minWidth: '220px',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    zIndex: 99999, // MAXIMUM z-index
                    overflow: 'hidden',
                    // Create new stacking context
                    isolation: 'isolate',
                    // Ensure it renders on top
                    transform: 'translateZ(0)',
                    willChange: 'transform'
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

      {/* AI Chatbot - Rendered conditionally */}
      {showAIChatbot && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          pointerEvents: 'none'
        }}>
          <MarigoldAICopilot 
            isOpen={showAIChatbot}
            onClose={() => setShowAIChatbot(false)}
            initialQuery={searchQuery}
          />
        </div>
      )}

      {/* CSS for animations and z-index management */}
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

        /* Prevent animation in reduced motion mode */
        @media (prefers-reduced-motion: reduce) {
          .notification-badge.pulse-critical {
            animation: none;
          }
        }

        /* Ensure header and dropdowns stay above all content */
        header {
          isolation: isolate;
        }
      `}</style>
    </>
  );
};

export default Header;
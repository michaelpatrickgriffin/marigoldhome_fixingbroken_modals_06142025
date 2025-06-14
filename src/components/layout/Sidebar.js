// src/components/layout/Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../styles/ColorStyles';
import { ChevronRight, LayoutDashboard, Mail, Award, TrendingUp, Users, Star } from 'lucide-react';
import { sidebarMenuConfig } from '../../data/SampleData';

// Icon mapping for menu items
const iconMap = {
  'LayoutDashboard': LayoutDashboard,
  'Mail': Mail,
  'Award': Award,
  'TrendingUp': TrendingUp,
  'Users': Users
};

const Sidebar = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen, isMenuPinned, setIsMenuPinned }) => {
  const [primaryFlyout, setPrimaryFlyout] = useState(null);
  const [secondaryFlyout, setSecondaryFlyout] = useState(null);
  const [primaryPosition, setPrimaryPosition] = useState({ top: 0 });
  const [secondaryPosition, setSecondaryPosition] = useState({ top: 0, left: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('sidebarFavorites');
    return saved ? JSON.parse(saved) : ['dashboard', 'loyalty-analytics', 'messaging-content'];
  });
  
  const primaryFlyoutRef = useRef(null);
  const secondaryFlyoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const secondaryHoverTimeoutRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);

  // Detect mobile viewport with debouncing and error suppression
  useEffect(() => {
    const checkMobile = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          try {
            const newIsMobile = window.innerWidth < 768 || window.innerHeight < 600;
            if (newIsMobile !== isMobile) {
              setIsMobile(newIsMobile);
              // Close flyouts when switching to mobile
              if (newIsMobile) {
                setPrimaryFlyout(null);
                setSecondaryFlyout(null);
                setShowTooltip(null);
              }
            }
          } catch (error) {
            console.debug('Mobile check error (suppressed):', error);
          }
        });
      }, 150);
    };
    
    // Suppress ResizeObserver loop errors
    const handleResizeObserverError = (event) => {
      if (event.message && (
        event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
        event.message.includes('ResizeObserver loop limit exceeded') ||
        event.message.includes('ResizeObserver loop')
      )) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('error', handleResizeObserverError);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('error', handleResizeObserverError);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sidebarFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Close flyouts when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideSidebar = sidebarRef.current && sidebarRef.current.contains(event.target);
      const isInsidePrimary = primaryFlyoutRef.current && primaryFlyoutRef.current.contains(event.target);
      const isInsideSecondary = secondaryFlyoutRef.current && secondaryFlyoutRef.current.contains(event.target);
      
      if (!isInsideSidebar && !isInsidePrimary && !isInsideSecondary) {
        setPrimaryFlyout(null);
        setSecondaryFlyout(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced resize handling with proper cleanup
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          try {
            // Close flyouts on resize to prevent positioning issues
            setPrimaryFlyout(null);
            setSecondaryFlyout(null);
            setShowTooltip(null);
          } catch (error) {
            console.debug('Resize cleanup error (suppressed):', error);
          }
        });
      }, 200); // Longer delay for resize cleanup
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (secondaryHoverTimeoutRef.current) clearTimeout(secondaryHoverTimeoutRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, []);

  // Toggle favorite status
  const toggleFavorite = (itemId, event) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Enhanced tooltip handling
  const showTooltipForItem = (item, event, delay = 800) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    
    // Extract rect information immediately before setting timeout
    const rect = event.currentTarget?.getBoundingClientRect();
    if (!rect) return;
    
    const tooltipData = {
      text: item.fullLabel || item.label,
      x: rect.right + 8,
      y: rect.top + (rect.height / 2)
    };
    
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(tooltipData);
    }, delay);
  };

  const hideTooltip = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(null);
  };

  // Calculate optimal flyout position with enhanced error handling
  const calculateFlyoutPosition = (triggerRect, isSecondary = false, parentFlyoutRect = null) => {
    try {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const flyoutWidth = isSecondary ? 280 : 320;
      const estimatedHeight = isSecondary ? 200 : 300;
      
      let top = triggerRect.top;
      let left = isSecondary ? (parentFlyoutRect ? parentFlyoutRect.right + 8 : triggerRect.right + 8) 
                            : (isMenuOpen ? 280 : 0) + 8;

      // Adjust vertical position if flyout would go off screen
      if (top + estimatedHeight > viewportHeight - 20) {
        top = Math.max(20, viewportHeight - estimatedHeight - 20);
      }

      // Adjust horizontal position if flyout would go off screen
      if (left + flyoutWidth > viewportWidth - 20) {
        left = isSecondary ? (parentFlyoutRect ? parentFlyoutRect.left - flyoutWidth - 8 : triggerRect.left - flyoutWidth - 8)
                          : viewportWidth - flyoutWidth - 20;
      }

      return { top, left };
    } catch (error) {
      console.warn('Error calculating flyout position:', error);
      return { top: 100, left: 300 }; // Fallback position
    }
  };

  // Handle primary flyout (from sidebar)
  const handlePrimaryMouseEnter = (item, event) => {
    if (isMobile) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setHoveredItem(item.id);

    if (item.expandable && item.subItems) {
      try {
        const rect = event.currentTarget?.getBoundingClientRect();
        if (!rect) return;
        
        const position = calculateFlyoutPosition(rect);
        setPrimaryPosition(position);
        
        hoverTimeoutRef.current = setTimeout(() => {
          setPrimaryFlyout(item);
          setSecondaryFlyout(null);
        }, 150);
      } catch (error) {
        console.warn('Error in primary mouse enter:', error);
      }
    }
  };

  // Handle secondary flyout (from primary flyout items)
  const handleSecondaryMouseEnter = (item, event) => {
    if (isMobile) return;
    
    if (secondaryHoverTimeoutRef.current) {
      clearTimeout(secondaryHoverTimeoutRef.current);
    }

    setHoveredItem(item.id);

    if (item.subItems && item.subItems.length > 0) {
      try {
        const rect = event.currentTarget?.getBoundingClientRect();
        const parentRect = primaryFlyoutRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const position = calculateFlyoutPosition(rect, true, parentRect);
        setSecondaryPosition(position);
        
        secondaryHoverTimeoutRef.current = setTimeout(() => {
          setSecondaryFlyout(item);
        }, 100);
      } catch (error) {
        console.warn('Error in secondary mouse enter:', error);
        setSecondaryFlyout(null);
      }
    } else {
      setSecondaryFlyout(null);
    }
  };

  // Handle mouse leave from sidebar
  const handleSidebarMouseLeave = () => {
    setHoveredItem(null);
    hideTooltip();
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setTimeout(() => {
      try {
        const isHoveringPrimary = primaryFlyoutRef.current?.matches(':hover');
        const isHoveringSecondary = secondaryFlyoutRef.current?.matches(':hover');
        
        if (!isHoveringPrimary && !isHoveringSecondary) {
          setPrimaryFlyout(null);
          setSecondaryFlyout(null);
        }
      } catch (error) {
        // Fallback - just close flyouts
        setPrimaryFlyout(null);
        setSecondaryFlyout(null);
      }
    }, 100);
  };

  // Handle mouse leave from primary flyout
  const handlePrimaryMouseLeave = () => {
    setTimeout(() => {
      try {
        const isHoveringSidebar = sidebarRef.current?.matches(':hover');
        const isHoveringSecondary = secondaryFlyoutRef.current?.matches(':hover');
        
        if (!isHoveringSidebar && !isHoveringSecondary) {
          setPrimaryFlyout(null);
          setSecondaryFlyout(null);
        }
      } catch (error) {
        // Fallback - just close flyouts
        setPrimaryFlyout(null);
        setSecondaryFlyout(null);
      }
    }, 100);
  };

  // Handle mouse leave from secondary flyout
  const handleSecondaryMouseLeave = () => {
    setTimeout(() => {
      try {
        const isHoveringPrimary = primaryFlyoutRef.current?.matches(':hover');
        const isHoveringSidebar = sidebarRef.current?.matches(':hover');
        
        if (!isHoveringPrimary && !isHoveringSidebar) {
          setSecondaryFlyout(null);
        }
      } catch (error) {
        setSecondaryFlyout(null);
      }
    }, 100);
  };

  // Handle click
  const handleClick = (item) => {
    if (isMobile) {
      if (item.expandable && item.subItems) {
        return;
      }
    }

    if (item.expandable && item.subItems) {
      if (primaryFlyout?.id === item.id) {
        setPrimaryFlyout(null);
        setSecondaryFlyout(null);
      } else {
        setPrimaryFlyout(item);
        setSecondaryFlyout(null);
      }
    } else {
      setActiveTab(item.id);
      setPrimaryFlyout(null);
      setSecondaryFlyout(null);
    }
  };

  // Handle secondary item click
  const handleSecondaryClick = (item) => {
    if (!item.subItems || item.subItems.length === 0) {
      setActiveTab(item.id);
      setPrimaryFlyout(null);
      setSecondaryFlyout(null);
    }
  };

  // Handle tertiary item click
  const handleTertiaryClick = (item) => {
    setActiveTab(item.id);
    setPrimaryFlyout(null);
    setSecondaryFlyout(null);
  };

  // Get all menu items including sub-items for favorites
  const getAllMenuItems = () => {
    const allItems = [];
    
    const addItems = (items, parentLabel = '') => {
      items.forEach(item => {
        const fullItem = {
          ...item,
          fullLabel: parentLabel ? `${parentLabel} > ${item.label}` : item.label,
          parentLabel
        };
        allItems.push(fullItem);
        
        if (item.subItems) {
          addItems(item.subItems, fullItem.fullLabel);
        }
      });
    };
    
    addItems(sidebarMenuConfig.menuItems);
    return allItems;
  };

  // Get favorite items with their full context
  const getFavoriteItems = () => {
    const allItems = getAllMenuItems();
    return favorites
      .map(favId => allItems.find(item => item.id === favId))
      .filter(Boolean);
  };

  // Enhanced text truncation function
  const truncateText = (text, maxLength = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 1) + '…';
  };

  // Extract the final item name from a path (for favorites display)
  const getFinalItemName = (fullPath) => {
    if (!fullPath) return fullPath;
    const parts = fullPath.split(' > ');
    return parts[parts.length - 1];
  };

  // Render a menu item with consistent layout
  const renderMenuItem = (item, isFavorite = false) => {
    const IconComponent = iconMap[item.icon];
    const isActive = activeTab === item.id || activeTab?.startsWith(item.id + '-');
    const isFav = favorites.includes(item.id);
    const isHovered = hoveredItem === item.id;
    
    // For favorites, show only the final item name, but keep full path for tooltip
    const displayText = isFavorite ? getFinalItemName(item.fullLabel || item.label) : item.label;
    const tooltipText = isFavorite ? (item.fullLabel || item.label) : item.label;
    const needsTruncation = displayText.length > 20;
    const truncatedText = truncateText(displayText, 20);
    
    const itemKey = isFavorite ? `fav-${item.id}` : item.id;

    return (
      <div
        key={itemKey}
        onClick={() => handleClick(item)}
        onMouseEnter={(e) => {
          handlePrimaryMouseEnter(item, e);
          // Show tooltip for favorites (to show full path) or truncated text
          if (isFavorite || needsTruncation) {
            // Shorter delay for favorites since they always show tooltips
            const delay = isFavorite ? 500 : 800;
            showTooltipForItem({ ...item, fullLabel: tooltipText }, e, delay);
          }
        }}
        onMouseLeave={() => {
          hideTooltip();
        }}
        className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.875rem 3rem 0.875rem 1.5rem', // Fixed right padding for star space
          cursor: 'pointer',
          backgroundColor: isActive ? '#cbd5e1' : isHovered ? '#e2e8f0' : 'transparent',
          color: isActive ? '#1e293b' : isHovered ? '#0f172a' : '#374151',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          borderRadius: isActive ? '0' : '0 0.5rem 0.5rem 0',
          margin: isActive ? '0 0 0.25rem 0' : '0 0.5rem 0.25rem 0',
          minHeight: '2.75rem' // Consistent height
        }}
      >
        {/* Left content - icon and text */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1,
          minWidth: 0, // Allow text to shrink
          overflow: 'hidden'
        }}>
          <span style={{ 
            marginRight: '0.75rem', 
            display: 'flex', 
            alignItems: 'center',
            flexShrink: 0 // Icon never shrinks
          }}>
            {IconComponent ? <IconComponent size={18} /> : null}
          </span>
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1
          }}>
            {truncatedText}
          </span>
        </div>

        {/* Right content - fixed position star and chevron */}
        <div style={{ 
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem',
          flexShrink: 0
        }}>
          {/* Favorite star - always in same position */}
          <button
            onClick={(e) => toggleFavorite(item.id, e)}
            className={`favorite-star ${isFav ? 'favorited' : ''}`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              opacity: isHovered ? 1 : (isFav ? 0.6 : 0),
              transition: 'all 0.2s ease-in-out',
              borderRadius: '50%'
            }}
          >
            <Star 
              size={14}
              fill={isFav ? '#FFC107' : 'none'} 
              stroke={isFav ? '#FFC107' : 'currentColor'}
            />
          </button>

          {/* Chevron for expandable items */}
          {item.expandable && item.subItems && !isMobile && (
            <ChevronRight 
              size={16} 
              style={{
                transition: 'transform 0.2s ease-in-out',
                transform: primaryFlyout?.id === item.id ? 'rotate(90deg)' : 'rotate(0deg)',
                flexShrink: 0
              }}
            />
          )}
        </div>
      </div>
    );
  };

  // Render primary flyout
  const renderPrimaryFlyout = () => {
    if (!primaryFlyout || !primaryFlyout.subItems || isMobile) return null;

    return (
      <div
        ref={primaryFlyoutRef}
        className="flyout-panel primary-flyout"
        style={{
          position: 'fixed',
          left: primaryPosition.left,
          top: primaryPosition.top,
          minWidth: '280px',
          width: 'max-content',
          maxWidth: '400px',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          zIndex: 60,
          maxHeight: `${Math.min(window.innerHeight - primaryPosition.top - 40, 500)}px`,
          overflowY: 'auto',
          transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
          opacity: 1,
          transform: 'translateX(0) scale(1)'
        }}
        onMouseLeave={handlePrimaryMouseLeave}
      >
        <div style={{ padding: '0.75rem 0' }}>
          {primaryFlyout.subItems.map(subItem => {
            const hasSubItems = subItem.subItems && subItem.subItems.length > 0;
            const isActive = activeTab === subItem.id;
            const isFav = favorites.includes(subItem.id);
            const isHovered = hoveredItem === subItem.id;
            const needsTruncation = subItem.label.length > 25;
            const truncatedText = truncateText(subItem.label, 25);

            return (
              <div
                key={subItem.id}
                onClick={() => handleSecondaryClick(subItem)}
                onMouseEnter={(e) => {
                  handleSecondaryMouseEnter(subItem, e);
                  // Show tooltip for all items in flyouts to show full context
                  showTooltipForItem({ ...subItem, fullLabel: subItem.label }, e);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  hideTooltip();
                }}
                className={`flyout-item ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 3rem 0.75rem 1.5rem', // Fixed right padding
                  cursor: hasSubItems ? 'default' : 'pointer',
                  backgroundColor: isActive ? '#cbd5e1' : isHovered ? '#e2e8f0' : 'transparent',
                  color: isActive ? '#1e293b' : isHovered ? '#0f172a' : '#1f2937',
                  fontWeight: isActive ? 600 : hasSubItems ? 600 : 500,
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  margin: '0 0.5rem',
                  borderRadius: '0.375rem',
                  position: 'relative',
                  minHeight: '2.5rem'
                }}
              >
                {/* Text content */}
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}>
                  {truncatedText}
                </span>

                {/* Fixed position controls */}
                <div style={{ 
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem'
                }}>
                  {/* Favorite star */}
                  <button
                    onClick={(e) => toggleFavorite(subItem.id, e)}
                    className={`favorite-star ${isFav ? 'favorited' : ''}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      opacity: isHovered ? 1 : (isFav ? 0.6 : 0),
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: '50%'
                    }}
                  >
                    <Star 
                      size={14}
                      fill={isFav ? '#FFC107' : 'none'} 
                      stroke={isFav ? '#FFC107' : 'currentColor'}
                    />
                  </button>

                  {/* Chevron for items with sub-items */}
                  {hasSubItems && (
                    <ChevronRight size={14} style={{ color: '#6b7280', flexShrink: 0 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render secondary flyout
  const renderSecondaryFlyout = () => {
    if (!secondaryFlyout || !secondaryFlyout.subItems || isMobile) return null;

    return (
      <div
        ref={secondaryFlyoutRef}
        className="flyout-panel secondary-flyout"
        style={{
          position: 'fixed',
          left: secondaryPosition.left,
          top: secondaryPosition.top,
          minWidth: '240px',
          width: 'max-content',
          maxWidth: '350px',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          zIndex: 61,
          maxHeight: `${Math.min(window.innerHeight - secondaryPosition.top - 40, 400)}px`,
          overflowY: 'auto',
          transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
          opacity: 1,
          transform: 'translateX(0) scale(1)'
        }}
        onMouseLeave={handleSecondaryMouseLeave}
      >
        <div style={{ padding: '0.75rem 0' }}>
          {secondaryFlyout.subItems.map(tertiaryItem => {
            const isActive = activeTab === tertiaryItem.id;
            const isFav = favorites.includes(tertiaryItem.id);
            const isHovered = hoveredItem === tertiaryItem.id;
            const needsTruncation = tertiaryItem.label.length > 22;
            const truncatedText = truncateText(tertiaryItem.label, 22);

            return (
              <div
                key={tertiaryItem.id}
                onClick={() => handleTertiaryClick(tertiaryItem)}
                onMouseEnter={(e) => {
                  setHoveredItem(tertiaryItem.id);
                  // Show tooltip for all items in secondary flyouts
                  showTooltipForItem({ ...tertiaryItem, fullLabel: tertiaryItem.label }, e);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  hideTooltip();
                }}
                className={`flyout-item ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.625rem 2.5rem 0.625rem 1.25rem', // Fixed right padding
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#cbd5e1' : isHovered ? '#e2e8f0' : 'transparent',
                  color: isActive ? '#1e293b' : isHovered ? '#0f172a' : '#1f2937',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  margin: '0 0.5rem',
                  borderRadius: '0.25rem',
                  position: 'relative',
                  minHeight: '2.25rem'
                }}
              >
                {/* Text content */}
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}>
                  {truncatedText}
                </span>

                {/* Fixed position favorite star */}
                <button
                  onClick={(e) => toggleFavorite(tertiaryItem.id, e)}
                  className={`favorite-star ${isFav ? 'favorited' : ''}`}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    opacity: isHovered ? 1 : (isFav ? 0.6 : 0),
                    transition: 'all 0.2s ease-in-out',
                    borderRadius: '50%'
                  }}
                >
                  <Star 
                    size={14}
                    fill={isFav ? '#FFC107' : 'none'} 
                    stroke={isFav ? '#FFC107' : 'currentColor'}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const favoriteItems = getFavoriteItems();

  return (
    <>
      <div 
        ref={sidebarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: isMenuOpen ? '280px' : '0px',
          backgroundColor: 'white',
          boxShadow: isMenuOpen ? '0 0 15px rgba(0,0,0,0.1)' : 'none',
          zIndex: 50, // Higher than header (40) to ensure sidebar controls are accessible
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden'
        }}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo and close button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: isMenuPinned ? 'space-between' : 'flex-end', 
            alignItems: 'center', 
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(0,0,0,0.08)'
          }}>
            {isMenuPinned && (
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                backgroundColor: COLORS.evergreen,
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' 
              }}>
                <div style={{ width: '30px', height: '30px', backgroundColor: COLORS.evergreen, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>M</span>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                onClick={() => setIsMenuPinned(!isMenuPinned)}
                style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isMenuPinned ? COLORS.evergreen : '#6b7280',
                  backgroundColor: isMenuPinned ? 'rgba(26, 76, 73, 0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '50%'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="17" x2="12" y2="22"></line>
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                </svg>
              </button>
              
              {!isMenuPinned && (
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Navigation Menu Items */}
          <div style={{ padding: '1rem 0', flex: 1, overflowY: 'auto' }}>
            {/* Favorites Section */}
            {favoriteItems.length > 0 && (
              <div className="favorites-section">
                <div className="favorites-header" style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 1rem 0.5rem 1rem',
                  background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.08) 0%, rgba(255, 193, 7, 0.02) 100%)',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(255, 193, 7, 0.1)',
                  cursor: 'help',
                  title: 'Hover over items to see their full paths'
                }}>
                  <Star size={12} fill="#FFC107" stroke="#FFC107" />
                  Favorites
                </div>
                {favoriteItems.map(item => renderMenuItem(item, true))}
                
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
                  margin: '1rem 1.5rem'
                }} />
              </div>
            )}

            {/* Regular Menu Items */}
            {sidebarMenuConfig.menuItems.map(item => renderMenuItem(item))}
          </div>
          
          {/* Menu Footer */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div 
              style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ color: COLORS.evergreen, fontWeight: 500 }}>
                {sidebarMenuConfig.footerInfo.brand}
              </span>
              <span>{sidebarMenuConfig.footerInfo.product}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Primary Flyout Panel */}
      {renderPrimaryFlyout()}
      
      {/* Secondary Flyout Panel */}
      {renderSecondaryFlyout()}
      
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            left: showTooltip.x,
            top: showTooltip.y,
            transform: 'translateY(-50%)',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            zIndex: 1000,
            maxWidth: '250px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {showTooltip.text}
        </div>
      )}
      
      {/* Backdrop when menu is open */}
      {isMenuOpen && !isMenuPinned && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 45 // Between main content and header
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
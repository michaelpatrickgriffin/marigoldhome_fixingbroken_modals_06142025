// src/components/layout/NotificationPanel.js
import React, { useEffect, useState } from 'react';
import { 
  X, Bell, MessageSquare, ShoppingBag, Calendar, ArrowUpRight, 
  AlertTriangle, Check, CheckCircle, Mail, Instagram, Facebook, Smartphone, Globe
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { notificationConfig } from '../../data/SampleData';

const NotificationPanel = ({ 
  isOpen, 
  onClose, 
  notificationCount, 
  setNotificationCount, 
  notifications, 
  setNotifications,
  onProgramClick // NEW: Add callback for program clicks
}) => {
  // Handle notifications data - if not passed as props, use internal state with critical punch card notification
  const [internalNotifications, setInternalNotifications] = useState([
    {
      id: 'critical-punch-card',
      type: 'alert',
      title: 'Trail Essentials Punch Card program shows optimization opportunity with 10% completion rate',
      message: 'Program structure improvements could unlock $120K additional revenue potential',
      time: 'Just now',
      icon: 'AlertTriangle',
      color: COLORS.red,
      priority: 'high',
      programId: 2, // Links to Trail Essentials Punch Card in SampleData.js
      actionable: true
    },
    {
      id: 1,
      type: 'alert',
      title: 'Hiking Gear Bonus Points',
      message: 'This program has negative ROI and needs attention.',
      time: '10 mins ago',
      icon: 'AlertTriangle',
      color: COLORS.red,
      priority: 'high',
      programId: 7 // Links to Hiking Gear Bonus Points program
    },
    {
      id: 2,
      type: 'message',
      title: 'Marketing Team Meeting',
      message: 'Reminder: Strategy meeting today at 2pm',
      time: '1 hour ago',
      icon: 'MessageSquare',
      color: COLORS.blue,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Summer Outdoor Bundle',
      message: 'Low redemption rate (4.9%) detected.',
      time: '3 hours ago',
      icon: 'ShoppingBag',
      color: COLORS.yellow,
      priority: 'medium',
      programId: 6 // Links to Summer Outdoor Bundle program
    },
    {
      id: 4,
      type: 'event',
      title: 'Winter Sports Challenge',
      message: 'Program scheduled to launch next week',
      time: 'Yesterday',
      icon: 'Calendar',
      color: COLORS.green,
      priority: 'low'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Loyalty Anniversary Bonus',
      message: 'Significant negative ROI. Review recommendations.',
      time: 'Yesterday',
      icon: 'AlertTriangle',
      color: COLORS.red,
      priority: 'high',
      programId: 10 // Links to Loyalty Anniversary Bonus program
    },
    {
      id: 6,
      type: 'message',
      title: 'Content Calendar Update',
      message: 'Social media content for Q3 has been approved',
      time: '2 days ago',
      icon: 'Check',
      color: COLORS.green,
      priority: 'low'
    },
    {
      id: 7,
      type: 'event',
      title: 'Email Design Review',
      message: 'Feedback requested on new email templates',
      time: '2 days ago',
      icon: 'MessageSquare',
      color: COLORS.blue,
      priority: 'medium'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  
  // Use either the prop notifications or internal notifications
  const notificationsData = notifications || internalNotifications;
  const setNotificationsData = setNotifications || setInternalNotifications;

  // Apply the filter to notifications and sort by priority
  const filteredNotifications = notificationsData
    .filter(notification => {
      if (activeFilter === 'all') return true;
      return notification.type === activeFilter;
    })
    .sort((a, b) => {
      // Sort by priority: critical > high > medium > low
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });

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

  // Helper function to render the correct icon based on type
  const renderNotificationIcon = (notification) => {
    if (typeof notification.icon === 'function') {
      // If it's already a Lucide icon component, use it directly
      const IconComponent = notification.icon;
      return <IconComponent size={16} />;
    } else if (typeof notification.icon === 'string') {
      // Map string icon names to Lucide components
      switch (notification.icon) {
        case 'AlertTriangle':
          return <AlertTriangle size={16} />;
        case 'MessageSquare':
          return <MessageSquare size={16} />;
        case 'ShoppingBag':
          return <ShoppingBag size={16} />;
        case 'Calendar':
          return <Calendar size={16} />;
        case 'Check':
          return <Check size={16} />;
        case 'CheckCircle':
          return <CheckCircle size={16} />;
        case 'Mail':
          return <Mail size={16} />;
        case 'Instagram':
          return <Instagram size={16} />;
        case 'Facebook':
          return <Facebook size={16} />;
        case 'Smartphone':
          return <Smartphone size={16} />;
        case 'Globe':
          return <Globe size={16} />;
        case 'Bell':
          return <Bell size={16} />;
        default:
          return <Bell size={16} />;
      }
    } else {
      // Default icon
      return <Bell size={16} />;
    }
  };

  // Handle notification click - if it has a programId, call onProgramClick
  const handleNotificationClick = (notification) => {
    if (notification.programId && onProgramClick) {
      // Find the program from SampleData and call onProgramClick
      onProgramClick(notification.programId);
      onClose(); // Close the notification panel
    }
  };

  const dismissNotification = (id) => {
    setNotificationsData(prev => prev.filter(notification => notification.id !== id));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotificationsData([]);
    setNotificationCount(0);
  };

  // Group notifications by day
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const todayNotifications = filteredNotifications.filter(notification => 
    notification.time.includes('mins ago') || 
    notification.time.includes('hour') || 
    notification.time.includes('Today') ||
    notification.time.includes('Just now')
  );
  
  const yesterdayNotifications = filteredNotifications.filter(notification => 
    notification.time.includes('Yesterday')
  );
  
  const earlierNotifications = filteredNotifications.filter(notification => 
    !notification.time.includes('mins ago') && 
    !notification.time.includes('hour') && 
    !notification.time.includes('Today') &&
    !notification.time.includes('Yesterday') &&
    !notification.time.includes('Just now')
  );

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
        {/* Header */}
        <div style={{ 
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
              Notifications
            </h3>
            {notificationCount > 0 && (
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0.5rem',
                backgroundColor: COLORS.red,
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {notificationCount}
              </span>
            )}
          </div>

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

        {/* Filter tabs */}
        <div style={{ 
          display: 'flex', 
          padding: '0 1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}>
          {notificationConfig.filterTabs.map((tab, index) => (
            <button 
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{ 
                padding: '0.75rem 0',
                marginRight: index < notificationConfig.filterTabs.length - 1 ? '1.5rem' : '0',
                fontSize: '0.875rem',
                fontWeight: activeFilter === tab.id ? 600 : 500,
                color: activeFilter === tab.id ? COLORS.evergreen : COLORS.onyxMedium,
                background: 'none',
                border: 'none',
                borderBottom: activeFilter === tab.id ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable notifications area */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredNotifications.length > 0 ? (
            <div>
              {/* Today section */}
              {todayNotifications.length > 0 && (
                <div>
                  <h4 style={{ 
                    padding: '1rem 1.5rem 0.5rem 1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {notificationConfig.sectionHeaders.today}
                  </h4>
                  <div>
                    {todayNotifications.map(notification => (
                      <div 
                        key={notification.id}
                        style={{ 
                          position: 'relative',
                          padding: '1rem 1.5rem',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                          backgroundColor: notification.priority === 'critical' 
                            ? 'rgba(244, 67, 54, 0.08)' 
                            : notification.priority === 'high' 
                              ? 'rgba(244, 67, 54, 0.04)' 
                              : 'transparent',
                          cursor: notification.actionable ? 'pointer' : 'default',
                          transition: 'background-color 0.2s',
                          borderLeft: notification.priority === 'critical' 
                            ? `4px solid ${COLORS.red}` 
                            : 'none'
                        }}
                        className="hover:bg-gray-50"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Dismiss button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                          style={{ 
                            position: 'absolute',
                            top: '1rem',
                            right: '1.25rem',
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
                            transition: 'opacity 0.2s, background-color 0.2s',
                            zIndex: 5
                          }}
                          className="hover:bg-gray-200"
                          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                          onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                          title={notificationConfig.actionLabels.dismiss}
                        >
                          <X size={14} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <div style={{ 
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            backgroundColor: `${notification.color}15`,
                            color: notification.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            {renderNotificationIcon(notification)}
                          </div>
                          
                          <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <h5 style={{ 
                                fontSize: '0.875rem', 
                                fontWeight: notification.priority === 'critical' ? 700 : 600, 
                                color: notification.priority === 'critical' ? COLORS.red : COLORS.onyx 
                              }}>
                                {notification.title}
                              </h5>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                              {notification.message}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.6875rem', color: COLORS.onyxMedium }}>
                                {notification.time}
                              </span>
                              {notification.actionable && (
                                <ArrowUpRight size={12} style={{ color: COLORS.onyxMedium }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Yesterday section */}
              {yesterdayNotifications.length > 0 && (
                <div>
                  <h4 style={{ 
                    padding: '1rem 1.5rem 0.5rem 1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {notificationConfig.sectionHeaders.yesterday}
                  </h4>
                  <div>
                    {yesterdayNotifications.map(notification => (
                      <div 
                        key={notification.id}
                        style={{ 
                          position: 'relative',
                          padding: '1rem 1.5rem',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                          backgroundColor: notification.priority === 'high' ? 'rgba(244, 67, 54, 0.04)' : 'transparent',
                          cursor: notification.actionable ? 'pointer' : 'default',
                          transition: 'background-color 0.2s'
                        }}
                        className="hover:bg-gray-50"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Dismiss button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                          style={{ 
                            position: 'absolute',
                            top: '1rem',
                            right: '1.25rem',
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
                            transition: 'opacity 0.2s, background-color 0.2s',
                            zIndex: 5
                          }}
                          className="hover:bg-gray-200"
                          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                          onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                          title={notificationConfig.actionLabels.dismiss}
                        >
                          <X size={14} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <div style={{ 
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            backgroundColor: `${notification.color}15`,
                            color: notification.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            {renderNotificationIcon(notification)}
                          </div>
                          
                          <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                                {notification.title}
                              </h5>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                              {notification.message}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.6875rem', color: COLORS.onyxMedium }}>
                                {notification.time}
                              </span>
                              {notification.actionable && (
                                <ArrowUpRight size={12} style={{ color: COLORS.onyxMedium }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earlier section */}
              {earlierNotifications.length > 0 && (
                <div>
                  <h4 style={{ 
                    padding: '1rem 1.5rem 0.5rem 1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {notificationConfig.sectionHeaders.earlier}
                  </h4>
                  <div>
                    {earlierNotifications.map(notification => (
                      <div 
                        key={notification.id}
                        style={{ 
                          position: 'relative',
                          padding: '1rem 1.5rem',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                          backgroundColor: notification.priority === 'high' ? 'rgba(244, 67, 54, 0.04)' : 'transparent',
                          cursor: notification.actionable ? 'pointer' : 'default',
                          transition: 'background-color 0.2s'
                        }}
                        className="hover:bg-gray-50"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Dismiss button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                          style={{ 
                            position: 'absolute',
                            top: '1rem',
                            right: '1.25rem',
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
                            transition: 'opacity 0.2s, background-color 0.2s',
                            zIndex: 5
                          }}
                          className="hover:bg-gray-200"
                          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                          onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                          title={notificationConfig.actionLabels.dismiss}
                        >
                          <X size={14} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <div style={{ 
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            backgroundColor: `${notification.color}15`,
                            color: notification.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            {renderNotificationIcon(notification)}
                          </div>
                          
                          <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                                {notification.title}
                              </h5>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                              {notification.message}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.6875rem', color: COLORS.onyxMedium }}>
                                {notification.time}
                              </span>
                              {notification.actionable && (
                                <ArrowUpRight size={12} style={{ color: COLORS.onyxMedium }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4rem 2rem',
              color: COLORS.onyxMedium,
              textAlign: 'center'
            }}>
              <Bell size={32} style={{ color: COLORS.onyxMedium, opacity: 0.5, marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {notificationConfig.emptyStateMessages[activeFilter]?.title || 'No notifications'}
              </p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                {notificationConfig.emptyStateMessages[activeFilter]?.subtitle || "You're all caught up!"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div style={{ 
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            backgroundColor: 'rgba(0,0,0,0.02)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button 
              onClick={clearAllNotifications}
              style={{ 
                fontSize: '0.875rem',
                fontWeight: 500,
                color: COLORS.evergreen,
                border: 'none',
                background: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              {notificationConfig.actionLabels.markAllRead}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
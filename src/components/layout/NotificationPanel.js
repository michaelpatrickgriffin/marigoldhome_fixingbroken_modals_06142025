// src/components/layout/NotificationPanel.js - FIXED Z-INDEX ISSUES
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Info, Clock, Bell, Trash2, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const NotificationPanel = ({ 
  isOpen, 
  onClose, 
  notificationCount, 
  setNotificationCount,
  onProgramClick,
  onCriticalNotificationsChange 
}) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  // Initialize notifications
  useEffect(() => {
    const initialNotifications = [
      {
        id: 1,
        type: 'critical',
        title: 'Campaign Performance Alert',
        message: 'Email campaign "Summer Sale 2024" has a 15% lower open rate than expected.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'high',
        actionRequired: true,
        relatedItem: { type: 'campaign', id: 'summer-sale-2024' }
      },
      {
        id: 2,
        type: 'success',
        title: 'Loyalty Program Update',
        message: 'VIP Rewards Program reached 1,000 new members this month.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'medium',
        actionRequired: false,
        relatedItem: { type: 'program', id: 'vip-rewards' }
      },
      {
        id: 3,
        type: 'warning',
        title: 'Budget Threshold Reached',
        message: 'Holiday Marketing campaign has reached 85% of allocated budget.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'medium',
        actionRequired: true,
        relatedItem: { type: 'campaign', id: 'holiday-marketing' }
      },
      {
        id: 4,
        type: 'info',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 11 PM to 2 AM EST.',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        priority: 'low',
        actionRequired: false
      },
      {
        id: 5,
        type: 'success',
        title: 'Campaign Launched',
        message: 'Back-to-School Promotion has been successfully launched to 25,000 customers.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        priority: 'medium',
        actionRequired: false,
        relatedItem: { type: 'campaign', id: 'back-to-school' }
      },
      {
        id: 6,
        type: 'critical',
        title: 'Urgent: Program Needs Attention',
        message: 'Platinum Rewards Program requires immediate review - engagement down 30%.',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'high',
        actionRequired: true,
        relatedItem: { type: 'program', id: 'platinum-rewards' }
      },
      {
        id: 7,
        type: 'info',
        title: 'Weekly Report Ready',
        message: 'Your weekly marketing performance report is ready for review.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        priority: 'low',
        actionRequired: false
      },
      {
        id: 8,
        type: 'warning',
        title: 'Audience Segment Update',
        message: 'High-value customer segment size decreased by 5% this week.',
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'medium',
        actionRequired: true
      }
    ];
    
    setNotifications(initialNotifications);
    
    // Update notification count
    const unreadCount = initialNotifications.filter(n => !n.isRead).length;
    setNotificationCount(unreadCount);
    
    // Check for critical notifications
    const hasCritical = initialNotifications.some(n => !n.isRead && n.type === 'critical');
    if (onCriticalNotificationsChange) {
      onCriticalNotificationsChange(hasCritical);
    }
  }, [setNotificationCount, onCriticalNotificationsChange]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'critical') return notification.type === 'critical';
    return true;
  });

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    
    // Update count
    const newCount = notifications.filter(n => n.id !== notificationId ? !n.isRead : false).length;
    setNotificationCount(newCount);
    
    // Update critical notifications status
    const newNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    const hasCritical = newNotifications.some(n => !n.isRead && n.type === 'critical');
    if (onCriticalNotificationsChange) {
      onCriticalNotificationsChange(hasCritical);
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setNotificationCount(0);
    if (onCriticalNotificationsChange) {
      onCriticalNotificationsChange(false);
    }
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    // Update count
    const remainingNotifications = notifications.filter(n => n.id !== notificationId);
    const unreadCount = remainingNotifications.filter(n => !n.isRead).length;
    setNotificationCount(unreadCount);
    
    // Update critical notifications status
    const hasCritical = remainingNotifications.some(n => !n.isRead && n.type === 'critical');
    if (onCriticalNotificationsChange) {
      onCriticalNotificationsChange(hasCritical);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // If it has a related program, call the program click handler
    if (notification.relatedItem && notification.relatedItem.type === 'program' && onProgramClick) {
      onProgramClick(notification.relatedItem.id);
      onClose(); // Close the notification panel
    }
  };

  // Get notification icon and color
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return { icon: AlertTriangle, color: '#ef4444' };
      case 'warning':
        return { icon: AlertTriangle, color: '#f59e0b' };
      case 'success':
        return { icon: CheckCircle, color: '#22c55e' };
      case 'info':
        return { icon: Info, color: '#3b82f6' };
      default:
        return { icon: Bell, color: COLORS.onyxMedium };
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '400px',
        backgroundColor: 'white',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1100, // FIXED: Use notification panel z-index from standards
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 1101 // FIXED: Above panel content
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
            Notifications
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

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'critical', label: 'Critical' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: filter === tab.key ? 600 : 500,
                color: filter === tab.key ? COLORS.evergreen : COLORS.onyxMedium,
                backgroundColor: filter === tab.key ? `${COLORS.evergreen}15` : 'transparent',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        {filteredNotifications.some(n => !n.isRead) && (
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={markAllAsRead}
              style={{
                fontSize: '0.875rem',
                color: COLORS.evergreen,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem 0',
                fontWeight: 500
              }}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem 0'
      }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <Bell size={48} color={COLORS.onyxLight} />
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginTop: '1rem' }}>
              No notifications found
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredNotifications.map(notification => {
              const { icon: IconComponent, color: iconColor } = getNotificationIcon(notification.type);
              
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    backgroundColor: notification.isRead ? 'transparent' : 'rgba(26, 76, 73, 0.03)',
                    cursor: notification.relatedItem ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (notification.relatedItem) {
                      e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = notification.isRead ? 'transparent' : 'rgba(26, 76, 73, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    {/* Notification Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: `${iconColor}20`,
                      marginTop: '0.25rem',
                      flexShrink: 0
                    }}>
                      <IconComponent size={16} color={iconColor} />
                    </div>

                    {/* Notification Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <h4 style={{
                          fontSize: '0.875rem',
                          fontWeight: notification.isRead ? 500 : 600,
                          color: COLORS.onyx,
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {notification.title}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            color: COLORS.onyxMedium,
                            whiteSpace: 'nowrap'
                          }}>
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: COLORS.evergreen,
                              borderRadius: '50%'
                            }} />
                          )}
                        </div>
                      </div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        margin: 0,
                        lineHeight: 1.4
                      }}>
                        {notification.message}
                      </p>
                      
                      {/* Action Buttons */}
                      {notification.actionRequired && (
                        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                          {notification.relatedItem && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotificationClick(notification);
                              }}
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: COLORS.evergreen,
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                            >
                              View Details
                            </button>
                          )}
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: 'transparent',
                                color: COLORS.evergreen,
                                border: `1px solid ${COLORS.evergreen}`,
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                            >
                              Mark Read
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '0.25rem',
                        background: 'none',
                        border: 'none',
                        color: COLORS.onyxLight,
                        cursor: 'pointer',
                        opacity: 0.7,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.target.style.color = '#ef4444';
                        e.target.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = COLORS.onyxLight;
                        e.target.style.opacity = '0.7';
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
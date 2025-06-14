// src/components/views/MessagingView.js
import React from 'react';
import { Mail, FileText, GitBranch, Users, BarChart3, BookOpen, ArrowLeftRight, Clock, Settings } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const MessagingView = ({ activeSubTab }) => {
  // Icon mapping for messaging features
  const featureIcons = {
    'messaging-content': FileText,
    'messaging-journeys': GitBranch,
    'messaging-lists': Users,
    'messaging-reports': BarChart3,
    'messaging-dashboards': BarChart3,
    'messaging-library': BookOpen,
    'messaging-data-exchange': ArrowLeftRight,
    'messaging-cadence': Clock,
    'messaging-admin-configuration': Settings
  };

  const featureDescriptions = {
    'messaging-content': 'Create and manage email templates, content blocks, and creative assets for your messaging campaigns.',
    'messaging-journeys': 'Design automated customer journeys with triggers, conditions, and multi-channel touchpoints.',
    'messaging-lists': 'Manage subscriber lists, segments, and audience targeting for precise message delivery.',
    'messaging-reports': 'Access detailed analytics on email performance, deliverability, and engagement metrics.',
    'messaging-dashboards': 'Monitor real-time campaign performance with customizable dashboards and key metrics.',
    'messaging-library': 'Store and organize reusable content, templates, and brand assets in a centralized library.',
    'messaging-data-exchange': 'Integrate and sync data between Marigold and external systems for unified customer views.',
    'messaging-cadence': 'Control message frequency and timing to optimize engagement and prevent over-communication.',
    'messaging-admin-configuration': 'Configure system settings, user permissions, and platform administration options.'
  };

  const getActiveFeature = () => {
    if (activeSubTab && activeSubTab.startsWith('messaging-')) {
      return activeSubTab;
    }
    return 'messaging-content'; // Default to content
  };

  const activeFeature = getActiveFeature();
  const IconComponent = featureIcons[activeFeature];

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(0,0,0,0.08)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          backgroundColor: COLORS.evergreen,
          borderRadius: '0.75rem',
          marginRight: '1rem'
        }}>
          <Mail size={20} style={{ color: 'white' }} />
        </div>
        <div>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: COLORS.onyxDark,
            margin: 0,
            lineHeight: 1.2
          }}>
            Messaging Platform
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: COLORS.onyxMedium,
            margin: 0,
            marginTop: '0.25rem'
          }}>
            Create, manage, and optimize your email marketing campaigns
          </p>
        </div>
      </div>

      {/* Active Feature Display */}
      <div style={{ 
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        padding: '2rem',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            marginRight: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {IconComponent && <IconComponent size={18} style={{ color: COLORS.evergreen }} />}
          </div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: COLORS.onyxDark,
            margin: 0
          }}>
            {activeFeature.replace('messaging-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
        </div>
        
        <p style={{ 
          fontSize: '1rem', 
          color: COLORS.onyxMedium,
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          {featureDescriptions[activeFeature]}
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <button style={{ 
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(26, 76, 73, 0.2)'
          }}>
            Get Started
          </button>
          <button style={{ 
            backgroundColor: 'white',
            color: COLORS.onyxMedium,
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            View Documentation
          </button>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        border: '1px solid rgba(255, 193, 7, 0.2)',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#B8860B',
          margin: 0,
          fontWeight: '500'
        }}>
          🚧 This feature is currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
};

export default MessagingView;
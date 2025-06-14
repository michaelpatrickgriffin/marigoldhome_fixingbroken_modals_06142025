// src/components/views/LoyaltyView.js
import React from 'react';
import { Award, BarChart3, Users, Mail, Trophy, CreditCard, Gift, MessageSquare, Settings, Database, Shield } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const LoyaltyView = ({ activeSubTab }) => {
  // Icon mapping for loyalty features
  const featureIcons = {
    'loyalty-analytics': BarChart3,
    'loyalty-members': Users,
    'loyalty-campaigns': Mail,
    'loyalty-challenges': Trophy,
    'loyalty-transactions': CreditCard,
    'loyalty-rewards': Gift,
    'loyalty-communities': MessageSquare,
    'loyalty-rules': Settings,
    'loyalty-program': Database,
    'loyalty-admin': Shield
  };

  const featureDescriptions = {
    'loyalty-analytics': 'Comprehensive analytics and reporting for program performance, member behavior, and ROI analysis.',
    'loyalty-members': 'Complete member management including profiles, segmentation, customer service, and group management.',
    'loyalty-campaigns': 'Create and manage loyalty campaigns, offers, punchcards, wallet passes, and triggered marketing.',
    'loyalty-challenges': 'Design engaging challenges and competitions to drive member participation and brand interaction.',
    'loyalty-transactions': 'Handle all transaction types including gift cards, codes, receipts, flights, orders, and discounts.',
    'loyalty-rewards': 'Manage reward catalogs, badges, achievement systems, and member recognition programs.',
    'loyalty-communities': 'Foster member engagement through news feeds, galleries, community features, and social interaction.',
    'loyalty-rules': 'Configure earning rules, tier schemes, order rules, pricing rules, and automated triggered actions.',
    'loyalty-program': 'Core program configuration including deployments, metrics, attributes, functions, and business units.',
    'loyalty-admin': 'System administration including access control, locations, products, content, and integrations.'
  };

  // Get the current active section
  const getActiveFeature = () => {
    if (activeSubTab && activeSubTab.startsWith('loyalty-')) {
      // Handle nested items (like loyalty-members-members)
      const parts = activeSubTab.split('-');
      if (parts.length > 2) {
        return `${parts[0]}-${parts[1]}`;
      }
      return activeSubTab;
    }
    return 'loyalty-analytics'; // Default to analytics
  };

  const activeFeature = getActiveFeature();
  const IconComponent = featureIcons[activeFeature];

  // Get detailed feature name
  const getFeatureName = (feature) => {
    const names = {
      'loyalty-analytics': 'Analytics & Reporting',
      'loyalty-members': 'Member Management',
      'loyalty-campaigns': 'Campaign Management',
      'loyalty-challenges': 'Challenges & Competitions',
      'loyalty-transactions': 'Transaction Management',
      'loyalty-rewards': 'Rewards & Recognition',
      'loyalty-communities': 'Community Features',
      'loyalty-rules': 'Rules & Configuration',
      'loyalty-program': 'Program Administration',
      'loyalty-admin': 'System Administration'
    };
    return names[feature] || feature.replace('loyalty-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get current subsection if applicable
  const getCurrentSubsection = () => {
    if (activeSubTab && activeSubTab.includes('-') && activeSubTab.split('-').length > 2) {
      const parts = activeSubTab.split('-');
      return parts.slice(2).join(' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return null;
  };

  const currentSubsection = getCurrentSubsection();

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
          <Award size={20} style={{ color: 'white' }} />
        </div>
        <div>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: COLORS.onyxDark,
            margin: 0,
            lineHeight: 1.2
          }}>
            Loyalty Management Platform
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: COLORS.onyxMedium,
            margin: 0,
            marginTop: '0.25rem'
          }}>
            Comprehensive loyalty program management and customer engagement
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      {currentSubsection && (
        <div style={{ 
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: COLORS.onyxMedium
        }}>
          <span>Loyalty</span>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span>{getFeatureName(activeFeature)}</span>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: COLORS.evergreen, fontWeight: '500' }}>{currentSubsection}</span>
        </div>
      )}

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
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: COLORS.onyxDark,
              margin: 0
            }}>
              {currentSubsection || getFeatureName(activeFeature)}
            </h2>
            {currentSubsection && (
              <p style={{ 
                fontSize: '0.875rem', 
                color: COLORS.onyxMedium,
                margin: 0,
                marginTop: '0.25rem'
              }}>
                {getFeatureName(activeFeature)}
              </p>
            )}
          </div>
        </div>
        
        <p style={{ 
          fontSize: '1rem', 
          color: COLORS.onyxMedium,
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          {featureDescriptions[activeFeature]}
        </p>

        {/* Feature-specific quick actions */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
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
            {activeFeature === 'loyalty-analytics' ? 'View Reports' :
             activeFeature === 'loyalty-members' ? 'Manage Members' :
             activeFeature === 'loyalty-campaigns' ? 'Create Campaign' :
             activeFeature === 'loyalty-challenges' ? 'New Challenge' :
             activeFeature === 'loyalty-transactions' ? 'View Transactions' :
             activeFeature === 'loyalty-rewards' ? 'Manage Rewards' :
             activeFeature === 'loyalty-communities' ? 'Community Dashboard' :
             activeFeature === 'loyalty-rules' ? 'Configure Rules' :
             activeFeature === 'loyalty-program' ? 'Program Settings' :
             'Admin Panel'}
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
            Documentation
          </button>
        </div>

        {/* Stats Overview for Analytics */}
        {activeFeature === 'loyalty-analytics' && (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.evergreen }}>104.6K</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Active Members</div>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.evergreen }}>467%</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Average ROI</div>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.evergreen }}>$2.28M</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Total Revenue</div>
            </div>
          </div>
        )}
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

export default LoyaltyView;
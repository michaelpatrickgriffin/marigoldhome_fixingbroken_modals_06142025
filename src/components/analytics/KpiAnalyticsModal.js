// src/components/analytics/KpiAnalyticsModal.js
import React, { useState, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { COLORS } from '../../styles/ColorStyles';

const KpiAnalyticsModal = ({ kpi, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isClosing, setIsClosing] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !kpi) {
    return null;
  }

  // Mock data for demonstration - in real app, this would come from props or API
  const mockData = {
    trendData: [
      { month: 'Jan', value: 4000, previous: 3800 },
      { month: 'Feb', value: 3000, previous: 3200 },
      { month: 'Mar', value: 2000, previous: 2100 },
      { month: 'Apr', value: 2780, previous: 2600 },
      { month: 'May', value: 1890, previous: 2000 },
      { month: 'Jun', value: 2390, previous: 2200 },
    ],
    breakdownData: [
      { name: 'Segment A', value: 400, fill: COLORS.evergreen },
      { name: 'Segment B', value: 300, fill: COLORS.sage },
      { name: 'Segment C', value: 200, fill: COLORS.mint },
      { name: 'Segment D', value: 100, fill: COLORS.seafoam },
    ]
  };

  const renderOverviewContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <DollarSign size={20} style={{ color: COLORS.evergreen, marginRight: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Current Value</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: COLORS.onyx }}>{kpi.value}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            {kpi.trend === 'up' ? (
              <ArrowUp size={16} style={{ color: COLORS.evergreen, marginRight: '0.25rem' }} />
            ) : (
              <ArrowDown size={16} style={{ color: '#ef4444', marginRight: '0.25rem' }} />
            )}
            <span style={{ 
              fontSize: '0.875rem', 
              color: kpi.trend === 'up' ? COLORS.evergreen : '#ef4444' 
            }}>
              {kpi.change} from last period
            </span>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <TrendingUp size={20} style={{ color: COLORS.sage, marginRight: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Target</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: COLORS.onyx }}>$15,000</div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium,
            marginTop: '0.5rem' 
          }}>
            Goal for this quarter
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          color: COLORS.onyx, 
          marginBottom: '1rem' 
        }}>
          Performance Summary
        </h3>
        <p style={{ 
          fontSize: '0.875rem', 
          color: COLORS.onyxMedium, 
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          This metric shows strong performance this quarter with steady growth trends. 
          Key drivers include improved customer acquisition and higher average order values.
        </p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>BEST DAY</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>March 15</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>AVG DAILY</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>$423</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>GROWTH RATE</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.evergreen }}>+12.3%</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrendsContent = () => (
    <div style={{
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 600, 
        color: COLORS.onyx, 
        marginBottom: '2rem' 
      }}>
        6-Month Trend Analysis
      </h3>
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData.trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" stroke={COLORS.onyxMedium} />
            <YAxis stroke={COLORS.onyxMedium} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={COLORS.evergreen} 
              strokeWidth={3}
              name="Current Period"
              dot={{ r: 6, fill: COLORS.evergreen }}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke={COLORS.sage} 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Previous Period"
              dot={{ r: 4, fill: COLORS.sage }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderBreakdownContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          color: COLORS.onyx, 
          marginBottom: '2rem' 
        }}>
          Segment Breakdown
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.breakdownData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockData.breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          color: COLORS.onyx, 
          marginBottom: '2rem' 
        }}>
          Detailed Breakdown
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.breakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" stroke={COLORS.onyxMedium} />
              <YAxis stroke={COLORS.onyxMedium} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <Bar dataKey="value" fill={COLORS.evergreen} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderRecommendationsContent = () => (
    <div style={{
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 600, 
        color: COLORS.onyx, 
        marginBottom: '2rem' 
      }}>
        Recommendations
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(26, 76, 73, 0.02)'
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            marginBottom: '0.5rem' 
          }}>
            Optimize High-Value Segments
          </h4>
          <p style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium, 
            lineHeight: 1.6 
          }}>
            Focus marketing efforts on Segment A which shows 40% of total value. 
            Consider increasing budget allocation and personalized campaigns.
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(26, 76, 73, 0.02)'
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            marginBottom: '0.5rem' 
          }}>
            Address Declining Trends
          </h4>
          <p style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium, 
            lineHeight: 1.6 
          }}>
            The February-March dip suggests seasonal factors. Plan proactive campaigns 
            during these periods to maintain consistent performance.
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(26, 76, 73, 0.02)'
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            marginBottom: '0.5rem' 
          }}>
            Set Realistic Targets
          </h4>
          <p style={{ 
            fontSize: '0.875rem', 
            color: COLORS.onyxMedium, 
            lineHeight: 1.6 
          }}>
            Based on current growth trajectory, adjust quarterly targets to be more 
            achievable while maintaining stretch goals for motivation.
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'trends':
        return renderTrendsContent();
      case 'breakdown':
        return renderBreakdownContent();
      case 'recommendations':
        return renderRecommendationsContent();
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100002, // ✅ FIXED: Increased from 1000 to 100002 (above RFM modal)
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'overlayFadeIn 0.3s ease-out forwards'
      }}
      className={`kpi-modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        style={{
          background: 'white',
          width: '100%',
          maxWidth: '100%',
          height: '90vh',
          borderRadius: '1rem 1rem 0 0',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 100003 // ✅ FIXED: Container above overlay
        }}
        className={`kpi-modal-container ${isClosing ? 'closing' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 100004, // ✅ FIXED: Header above content
          flexShrink: 0
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                margin: 0 
              }}>
                {kpi.title} Analysis
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: COLORS.onyxMedium, 
                margin: '0.25rem 0 0 0' 
              }}>
                Performance metrics and insights
              </p>
            </div>
            
            <button 
              onClick={handleClose}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 100004, // ✅ FIXED: Tabs above content
          flexShrink: 0
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            display: 'flex',
            gap: '2rem'
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '1rem 0',
                color: activeTab === 'overview' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: activeTab === 'overview' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: activeTab === 'overview' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0
              }}
            >
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab('trends')}
              style={{
                padding: '1rem 0',
                color: activeTab === 'trends' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: activeTab === 'trends' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: activeTab === 'trends' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0
              }}
            >
              Trends
            </button>
            
            <button
              onClick={() => setActiveTab('breakdown')}
              style={{
                padding: '1rem 0',
                color: activeTab === 'breakdown' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: activeTab === 'breakdown' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: activeTab === 'breakdown' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0
              }}
            >
              Breakdown
            </button>
            
            <button
              onClick={() => setActiveTab('recommendations')}
              style={{
                padding: '1rem 0',
                color: activeTab === 'recommendations' ? COLORS.evergreen : COLORS.onyxMedium,
                fontWeight: activeTab === 'recommendations' ? 600 : 500,
                fontSize: '0.875rem',
                borderBottom: activeTab === 'recommendations' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0
              }}
            >
              Recommendations
            </button>
          </div>
        </div>
        
        {/* Modal Body - Dynamic content based on KPI type */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100003 // ✅ FIXED: Content z-index
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem'
          }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiAnalyticsModal;
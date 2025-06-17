// src/components/analytics/EngagementAnalyticsContent.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock, MousePointer, Heart, Share2, Zap, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Sample data for engagement analytics
const generateEngagementData = (days, uptrend = true, baseValue = 35, variance = 0.1) => {
  const data = [];
  let currentValue = baseValue;
  const trend = uptrend ? 1.01 : 0.99; // 1% up or down trend
  let currentSessionDuration = 245; // Starting with 4:05 minutes
  const sessionTrend = uptrend ? 1.005 : 0.995; // 0.5% up or down trend
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random variance between -variance% and +variance%
    const randomVariance = 1 + (Math.random() * variance * 2 - variance);
    const sessionRandomVariance = 1 + (Math.random() * variance * 2 - variance);
    
    currentValue = currentValue * trend * randomVariance;
    currentSessionDuration = currentSessionDuration * sessionTrend * sessionRandomVariance;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      clickRate: Math.min(Math.round(currentValue * 10) / 10, 100), // Click-through rate percentage
      bounceRate: Math.max(Math.min(Math.round((100 - currentValue * 1.2) * 10) / 10, 100), 0), // Inverse of CTR
      sessionDuration: Math.round(currentSessionDuration), // In seconds
      pagesPerSession: Math.max(Math.round(currentValue / 8 * 10) / 10, 1), // Average pages per session
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Channel engagement data
const channelEngagement = [
  { name: 'Email', clickRate: 5.2, openRate: 38.5, conversionRate: 2.8, color: COLORS.darkTeal },
  { name: 'Social Media', clickRate: 4.8, openRate: null, conversionRate: 1.9, color: COLORS.evergreen },
  { name: 'Direct Website', clickRate: 12.5, openRate: null, conversionRate: 3.7, color: '#3498db' },
  { name: 'Paid Search', clickRate: 3.9, openRate: null, conversionRate: 1.2, color: '#9b59b6' }
];

// Content engagement data
const contentEngagement = [
  { name: 'Winter Trail Collection Launch', views: 45800, engagement: 18.4, shares: 2340, conversions: 3.2 },
  { name: 'Summer Hiking Guide', views: 38500, engagement: 22.6, shares: 4850, conversions: 2.8 },
  { name: 'How to Choose Waterproof Gear', views: 32400, engagement: 15.2, shares: 1860, conversions: 3.5 },
  { name: 'Sustainability Initiative', views: 28700, engagement: 12.8, shares: 3250, conversions: 1.4 },
  { name: 'Running Shoe Comparison', views: 24500, engagement: 9.7, shares: 1240, conversions: 2.6 }
];

// Product page engagement
const productPageEngagement = [
  { name: 'Omni-Heat™ Infinity Jacket', viewToCartRate: 32.4, cartToCheckoutRate: 68.5 },
  { name: 'Newton Ridge™ Hiking Boots', viewToCartRate: 28.9, cartToCheckoutRate: 72.3 },
  { name: 'Steens Mountain™ Fleece', viewToCartRate: 35.2, cartToCheckoutRate: 65.8 },
  { name: 'Bugaboo™ Winter Pants', viewToCartRate: 25.8, cartToCheckoutRate: 70.2 },
  { name: 'Silver Ridge™ Convertible Pants', viewToCartRate: 22.6, cartToCheckoutRate: 68.9 }
];

// Device engagement breakdown
const deviceEngagement = [
  { name: 'Mobile', value: 58, color: COLORS.evergreen },
  { name: 'Desktop', value: 34, color: COLORS.darkTeal },
  { name: 'Tablet', value: 8, color: '#3498db' }
];

// Recommendations data
const engagementRecommendations = [
  {
    id: 1,
    title: 'Mobile Experience Optimization',
    description: '58% of your traffic comes from mobile devices, but mobile conversion rates are 32% lower than desktop. Implement a streamlined mobile checkout process and optimize product imagery for mobile viewing to increase conversions.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Analytics', 'Marigold Content']
  },
  {
    id: 2,
    title: 'Interactive Content Strategy for Email Campaigns',
    description: 'Email engagement metrics show high open rates but declining click-through rates. Create interactive elements like product carousels, polls, and embedded videos to increase engagement by an estimated 25-30%.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Messaging', 'Marigold Content']
  },
  {
    id: 3,
    title: 'Content Personalization Based on Browsing History',
    description: 'Implement personalized product recommendations on the website based on browsing history. Analysis shows users who see personalized recommendations have 45% higher engagement rates and 28% higher conversion rates.',
    impact: 'high',
    difficulty: 'high',
    tools: ['Marigold Analytics', 'Marigold Grow']
  },
  {
    id: 4,
    title: 'User-Generated Content Campaign',
    description: 'Launch a campaign encouraging customers to share photos with Outdoors Sportswear products in outdoor settings. Content analysis shows user-generated content drives 3.2x more engagement than standard product content.',
    impact: 'medium',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Content']
  }
];

const EngagementAnalyticsContent = ({ activeTab, onTabChange = null, comparisonPeriod, segment, granularity }) => {
  const [engagementData, setEngagementData] = useState([]);
  const [currentClickRate, setCurrentClickRate] = useState(0);
  const [clickRateChange, setClickRateChange] = useState(0);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Initialize engagement data on component mount
  useEffect(() => {
    // Generate initial data
    const initialData = generateEngagementData(30, true, 4.8, 0.1);
    setEngagementData(initialData);
    
    // Calculate current CTR and change
    const latest = initialData.slice(-7);
    const previous = initialData.slice(-14, -7);
    
    const currentAvg = latest.reduce((sum, day) => sum + day.clickRate, 0) / latest.length;
    const previousAvg = previous.reduce((sum, day) => sum + day.clickRate, 0) / previous.length;
    const change = ((currentAvg - previousAvg) / previousAvg) * 100;
    
    setCurrentClickRate(currentAvg);
    setClickRateChange(change);
  }, []);
  
  // Update current tab when activeTab changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Function to update tab both locally and in parent
  const updateTab = (tabName) => {
    setCurrentTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };
  
  // Simulate live data updates
  useEffect(() => {
    let intervalId;
    
    if (isLiveUpdating) {
      intervalId = setInterval(() => {
        setEngagementData(prevData => {
          // Create a copy of the last data point
          const lastPoint = { ...prevData[prevData.length - 1] };
          
          // Adjust engagement metrics slightly
          const ctRandomVar = 1 + (Math.random() * 0.06 - 0.03);
          lastPoint.clickRate = Math.min(Math.round(lastPoint.clickRate * ctRandomVar * 10) / 10, 100);
          lastPoint.bounceRate = Math.max(Math.min(Math.round(lastPoint.bounceRate * (2 - ctRandomVar) * 10) / 10, 100), 0);
          lastPoint.sessionDuration = Math.round(lastPoint.sessionDuration * (1 + (Math.random() * 0.04 - 0.02)));
          lastPoint.pagesPerSession = Math.max(Math.round(lastPoint.pagesPerSession * (1 + (Math.random() * 0.04 - 0.02)) * 10) / 10, 1);
          
          // Update timestamp to now
          const now = new Date();
          lastPoint.timestamp = now.getTime();
          
          // Update last updated time
          setLastUpdated(now);
          
          // Return updated data with last point adjusted
          const newData = [...prevData];
          newData[newData.length - 1] = lastPoint;
          return newData;
        });
      }, 5000); // Update every 5 seconds
    }
    
    return () => clearInterval(intervalId);
  }, [isLiveUpdating]);
  
  // Toggle live data updates
  const toggleLiveUpdates = () => {
    setIsLiveUpdating(!isLiveUpdating);
  };

  // Format session duration from seconds to mm:ss
  const formatSessionDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle view recommendation details
  const handleViewRecommendationDetails = (id) => {
    console.log(`Viewing details for recommendation ${id}`);
    updateTab('recommendations');
  };

  // Render different content based on the active tab
  const renderTabContent = () => {
    switch(currentTab) {
      case 'overview':
        return renderOverviewTab();
      case 'trends':
        return renderTrendsTab();
      case 'breakdown':
        return renderBreakdownTab();
      case 'recommendations':
        return renderRecommendationsTab();
      default:
        return renderOverviewTab();
    }
  };

  // Overview tab content with updated KPI cards matching dashboard style
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary - Updated to horizontal layout matching dashboard style */}
        <div className="kpi-card-grid">
          {/* Click-Through Rate KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <MousePointer size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Click-Through Rate</p>
                  <p className="kpi-value">{currentClickRate.toFixed(1)}%</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${clickRateChange >= 0 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {clickRateChange >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {Math.abs(clickRateChange).toFixed(1)}% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Duration KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <Clock size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Avg. Session Duration</p>
                  <p className="kpi-value">
                    {formatSessionDuration(engagementData.length > 0 ? 
                      Math.round(engagementData.slice(-7).reduce((sum, day) => sum + day.sessionDuration, 0) / 7) : 0
                    )}
                  </p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      8.2% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Engagement KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <Share2 size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Social Engagement</p>
                  <p className="kpi-value">16.4%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      24.8% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Interaction KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <Heart size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Content Interaction</p>
                  <p className="kpi-value">3.8</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      12.5% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Insights - 2-column layout with recommendations */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderLeft: `4px solid ${COLORS.evergreen}`
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Zap size={20} color={COLORS.evergreen} style={{ marginRight: '0.625rem' }} />
            Engagement Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> is experiencing a <strong style={{ color: COLORS.green }}>{clickRateChange.toFixed(1)}%</strong> increase in click-through rate, reaching <strong>{currentClickRate.toFixed(1)}%</strong> on average across all channels.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Social engagement</strong> has grown by <strong style={{ color: COLORS.green }}>24.8%</strong>, driven by the increased sharing of user-generated content. <strong>Mobile users</strong> now account for <strong>58%</strong> of all traffic, but show <strong>32%</strong> lower conversion rates than desktop users.
                </p>
                <p>
                  <strong>Email campaigns</strong> maintain high open rates of <strong>38.5%</strong> but show declining click-through engagement. Content about <strong>seasonal activities</strong> and <strong>how-to guides</strong> consistently outperforms product-focused content by <strong>35%</strong> in terms of engagement and sharing.
                </p>
              </div>
            </div>
            
            {/* Right column - Actionable recommendations */}
            <div style={{ flex: '1' }}>
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: COLORS.onyxMedium, 
                marginBottom: '0.75rem'
              }}>
                Top Recommendations
              </div>
              
              {/* Recommendation Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {engagementRecommendations.slice(0, 3).map((rec, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      borderLeft: `3px solid ${rec.impact === 'high' ? COLORS.green : COLORS.blue}`,
                      cursor: 'pointer'
                    }}
                    onClick={() => updateTab('recommendations')}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.25rem'
                    }}>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: 600, 
                        color: COLORS.onyx,
                        paddingRight: '0.5rem'
                      }}>
                        {rec.title.length > 50 ? `${rec.title.substring(0, 50)}...` : rec.title}
                      </div>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: rec.impact === 'high' ? COLORS.green : COLORS.blue,
                        backgroundColor: rec.impact === 'high' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                        padding: '0.125rem 0.375rem',
                        borderRadius: '0.25rem',
                        flexShrink: 0
                      }}>
                        {rec.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                        {rec.description.length > 75 ? `${rec.description.substring(0, 75)}...` : rec.description}
                      </div>
                      <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'transparent',
                        color: COLORS.evergreen,
                        borderRadius: '0.25rem',
                        border: '1px solid ' + COLORS.evergreen,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginLeft: '0.5rem'
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent div click handler from firing
                        handleViewRecommendationDetails(rec.id);
                      }}
                      >
                        <ChevronRight size={12} style={{ marginRight: '0.25rem' }} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => updateTab('recommendations')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    color: COLORS.evergreen,
                    border: 'none', 
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginTop: '0.25rem'
                  }}
                >
                  View All Recommendations
                  <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Engagement Metrics & Device Breakdown - Side by Side */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '1.5rem'
        }}>
          {/* Engagement Metrics Trend */}
          <div style={{ 
            flex: 2,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Engagement Metrics Trend
              </h3>
              <div>
                <button 
                  onClick={toggleLiveUpdates}
                  style={{
                    fontSize: '0.75rem',
                    color: isLiveUpdating ? COLORS.green : COLORS.onyxMedium,
                    backgroundColor: isLiveUpdating ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%',
                    backgroundColor: isLiveUpdating ? COLORS.green : COLORS.onyxMedium,
                    marginRight: '0.25rem'
                  }}></div>
                  {isLiveUpdating ? 'Live' : 'Static'}
                </button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 40]}
                  tickFormatter={value => `${value}%`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 10]}
                />
                <Tooltip formatter={(value, name) => {
                  if (name === 'clickRate' || name === 'bounceRate') return [`${value}%`, name === 'clickRate' ? 'Click Rate' : 'Bounce Rate'];
                  if (name === 'sessionDuration') return [formatSessionDuration(value), 'Session Duration'];
                  return [value, name === 'pagesPerSession' ? 'Pages/Session' : name];
                }} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  name="Click Rate" 
                  dataKey="clickRate" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: COLORS.evergreen }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  name="Bounce Rate" 
                  dataKey="bounceRate" 
                  stroke="#e74c3c" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#e74c3c" }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  name="Pages/Session" 
                  dataKey="pagesPerSession" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#3498db" }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            {isLiveUpdating && (
              <div style={{ 
                fontSize: '0.75rem', 
                color: COLORS.onyxMedium, 
                textAlign: 'right',
                marginTop: '0.5rem'
              }}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
          
          {/* Device Breakdown */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Engagement by Device
            </h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceEngagement}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {deviceEngagement.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Traffic Share']} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: 'rgba(0,0,0,0.02)', 
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              color: COLORS.onyxMedium,
              marginTop: '1rem'
            }}>
              <span style={{ fontWeight: 600, color: COLORS.onyx }}>Key Insight:</span> Mobile conversion rate is 32% lower than desktop despite having the highest traffic share.
            </div>
          </div>
        </div>
        
        {/* Top Performing Content - Formatted to match Revenue's Top Performing Collections */}
        <div className="mb-6">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Top Performing Content
          </h3>
          
          <div className="kpi-card-grid">
            {contentEngagement.map((content, index) => (
              <div key={index} className="kpi-card-wrapper">
                <div className="kpi-card">
                  <div className="kpi-card-content">
                    <div className="kpi-icon-container kpi-icon-bg-revenue">
                      <Heart size={20} color="white" />
                    </div>
                    <div className="kpi-text-container">
                      <p className="kpi-title">{content.name}</p>
                      <p className="kpi-value">{content.views.toLocaleString()} views</p>
                      <div className="kpi-change-container">
                        <span className="kpi-change kpi-change-positive">
                          <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                          {content.engagement}% engagement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Trends tab content
  const renderTrendsTab = () => {
    return (
      <div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Session Duration Trend
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart 
                data={engagementData}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => formatSessionDuration(value)}
                />
                <Tooltip 
                  formatter={(value) => [formatSessionDuration(value), 'Session Duration']}
                />
                <defs>
                  <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.evergreen} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.evergreen} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="sessionDuration" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#sessionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Pages per Session vs Bounce Rate
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={engagementData}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 10]}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'pagesPerSession') return [value, 'Pages/Session'];
                    return [`${value}%`, 'Bounce Rate'];
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  name="Pages/Session" 
                  dataKey="pagesPerSession" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  name="Bounce Rate" 
                  dataKey="bounceRate" 
                  stroke="#e74c3c" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Content Engagement Metrics
            </h3>
            
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: COLORS.onyx }}>Content</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600, color: COLORS.onyx }}>Views</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600, color: COLORS.onyx }}>Engagement Rate</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600, color: COLORS.onyx }}>Social Shares</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600, color: COLORS.onyx }}>Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {contentEngagement.map((content, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>{content.name}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: COLORS.onyx }}>{content.views.toLocaleString()}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: COLORS.onyx }}>{content.engagement}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: COLORS.onyx }}>{content.shares.toLocaleString()}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: COLORS.onyx }}>{content.conversions}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Insight:</div>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                The Summer Hiking Guide has the highest engagement rate (22.6%) and social shares, suggesting that seasonal activity guides resonate strongly with your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Breakdown tab content
  const renderBreakdownTab = () => {
    return (
      <div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Product Page Engagement
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={productPageEngagement}
                layout="vertical"
                margin={{ left: 200 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                  unit="%"
                  domain={[0, 100]}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  width={190}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Rate']}
                />
                <Legend />
                <Bar 
                  name="View-to-Cart Rate" 
                  dataKey="viewToCartRate" 
                  fill={COLORS.evergreen} 
                  barSize={20} 
                />
                <Bar 
                  name="Cart-to-Checkout Rate" 
                  dataKey="cartToCheckoutRate" 
                  fill={COLORS.blue} 
                  barSize={20} 
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Insight:</div>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                The Steens Mountain™ Fleece has the highest view-to-cart conversion rate (35.2%), indicating strong product page effectiveness, while Newton Ridge™ Hiking Boots show the strongest cart-to-checkout performance (72.3%).
              </p>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Email Campaign Engagement
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={[
                  { date: 'Week 1', openRate: 38.2, clickRate: 4.2, conversionRate: 2.2 },
                  { date: 'Week 2', openRate: 37.8, clickRate: 4.5, conversionRate: 2.4 },
                  { date: 'Week 3', openRate: 38.5, clickRate: 4.8, conversionRate: 2.5 },
                  { date: 'Week 4', openRate: 39.2, clickRate: 5.2, conversionRate: 2.7 },
                  { date: 'Week 5', openRate: 40.5, clickRate: 5.4, conversionRate: 2.8 },
                  { date: 'Week 6', openRate: 38.8, clickRate: 5.1, conversionRate: 2.6 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 50]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  name="Open Rate" 
                  dataKey="openRate" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Click Rate" 
                  dataKey="clickRate" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Conversion Rate" 
                  dataKey="conversionRate" 
                  stroke="#f1c40f" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Insight:</div>
              <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                Email engagement metrics show consistent improvement over the 6-week period, with click-through rates increasing by 28.5% and conversion rates by 27.3%, suggesting effective email optimization.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Social Media Engagement by Platform
            </h3>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { name: 'Instagram', followers: '245K', engagement: '3.8%', posts: 185, topContent: 'User-generated hiking photos' },
                { name: 'Facebook', followers: '310K', engagement: '1.2%', posts: 142, topContent: 'Product videos and guides' },
                { name: 'Twitter', followers: '128K', engagement: '2.1%', posts: 315, topContent: 'Customer service responses' },
                { name: 'Pinterest', followers: '82K', engagement: '4.5%', posts: 210, topContent: 'Outdoor lifestyle inspiration' }
              ].map((platform, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: '0.75rem',
                    padding: '1rem'
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                    {platform.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Followers:</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>{platform.followers}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Engagement:</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>{platform.engagement}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Posts:</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>{platform.posts}</span>
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Top Performing Content:</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>{platform.topContent}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={[
                  { name: 'Instagram', likes: 135600, comments: 9250, shares: 18500 },
                  { name: 'Facebook', likes: 89400, comments: 12300, shares: 22800 },
                  { name: 'Twitter', likes: 68200, comments: 8500, shares: 32400 },
                  { name: 'Pinterest', likes: 42800, comments: 2300, shares: 38700 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `${value/1000}K`}
                />
                <Tooltip 
                  formatter={(value) => [value.toLocaleString(), 'Count']}
                />
                <Legend />
                <Bar name="Likes" dataKey="likes" fill={COLORS.evergreen} barSize={25} />
                <Bar name="Comments" dataKey="comments" fill="#3498db" barSize={25} />
                <Bar name="Shares" dataKey="shares" fill="#9b59b6" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

// Recommendations tab content with a grid layout using inline styles
const renderRecommendationsTab = () => {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          backgroundColor: 'rgba(26, 76, 73, 0.03)',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderLeft: `4px solid ${COLORS.evergreen}`
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Engagement Optimization Opportunities
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
            Based on your engagement data, Marigold AI has identified several opportunities to enhance user engagement and content interaction across channels, with a focus on improving mobile experience and interactive content.
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem',
        marginBottom: '1.5rem' 
      }}>
        {engagementRecommendations.map((recommendation, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: `3px solid ${recommendation.impact === 'high' ? COLORS.green : recommendation.impact === 'medium' ? COLORS.blue : COLORS.yellow}`
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
              {recommendation.title}
            </h4>
            
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
              {recommendation.description}
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                fontSize: '0.75rem',
                fontWeight: 500,
                color: recommendation.impact === 'high' ? COLORS.green : recommendation.impact === 'medium' ? COLORS.blue : COLORS.yellow,
                backgroundColor: recommendation.impact === 'high' ? 'rgba(76, 175, 80, 0.1)' : recommendation.impact === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem'
              }}>
                {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
              </div>
              
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                fontSize: '0.75rem',
                fontWeight: 500,
                color: recommendation.difficulty === 'low' ? COLORS.green : recommendation.difficulty === 'medium' ? COLORS.blue : COLORS.red,
                backgroundColor: recommendation.difficulty === 'low' ? 'rgba(76, 175, 80, 0.1)' : recommendation.difficulty === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem'
              }}>
                {recommendation.difficulty.charAt(0).toUpperCase() + recommendation.difficulty.slice(1)} Difficulty
              </div>
            </div>
            
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                Recommended Marigold Tools:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {recommendation.tools.map((tool, i) => (
                  <div 
                    key={i}
                    style={{ 
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: COLORS.evergreen,
                      backgroundColor: 'rgba(26, 76, 73, 0.08)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <button 
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <Check size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
                Implement Recommendation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

  return renderTabContent();
};

export default EngagementAnalyticsContent;
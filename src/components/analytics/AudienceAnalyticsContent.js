// src/components/analytics/AudienceAnalyticsContent.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, MapPin, Target, UserPlus, Zap, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Sample data for audience analytics
const generateAudienceData = (days, uptrend = true, baseValue = 80000, variance = 0.05) => {
  const data = [];
  let currentValue = baseValue;
  const trend = uptrend ? 1.008 : 0.992; // 0.8% up or down trend
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random variance between -variance% and +variance%
    const randomVariance = 1 + (Math.random() * variance * 2 - variance);
    currentValue = currentValue * trend * randomVariance;
    
    const outdoor = Math.round(currentValue * 0.37);
    const casual = Math.round(currentValue * 0.24);
    const winter = Math.round(currentValue * 0.22);
    const urban = Math.round(currentValue * 0.17);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: Math.round(currentValue),
      outdoor,
      casual,
      winter,
      urban,
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Audience segments data
const audienceSegments = [
  { name: 'Outdoor Enthusiasts', value: 37, color: COLORS.darkTeal },
  { name: 'Casual Hikers', value: 24, color: COLORS.evergreen },
  { name: 'Winter Sports', value: 22, color: '#3498db' },
  { name: 'Urban Active', value: 17, color: '#9b59b6' }
];

// Geographical distribution
const geographicalDistribution = [
  { name: 'North America', value: 68, color: COLORS.evergreen },
  { name: 'Europe', value: 18, color: COLORS.darkTeal },
  { name: 'Asia-Pacific', value: 10, color: '#3498db' },
  { name: 'Rest of World', value: 4, color: '#9b59b6' }
];

// Top cities data
const topCities = [
  { name: 'New York', visitors: 84500, growth: 12 },
  { name: 'Los Angeles', visitors: 72300, growth: 8 },
  { name: 'Denver', visitors: 68200, growth: 24 },
  { name: 'Seattle', visitors: 64800, growth: 18 },
  { name: 'Chicago', visitors: 61400, growth: 7 },
  { name: 'Boston', visitors: 58700, growth: 10 },
  { name: 'Portland', visitors: 56200, growth: 22 },
  { name: 'Vancouver', visitors: 52800, growth: 15 }
];

// Audience demographics data
const demographics = {
  age: [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 32 },
    { name: '35-44', value: 28 },
    { name: '45-54', value: 16 },
    { name: '55-64', value: 7 },
    { name: '65+', value: 2 }
  ],
  gender: [
    { name: 'Male', value: 58 },
    { name: 'Female', value: 42 }
  ],
  income: [
    { name: 'Under $50K', value: 18 },
    { name: '$50K-$75K', value: 24 },
    { name: '$75K-$100K', value: 28 },
    { name: '$100K-$150K', value: 20 },
    { name: 'Over $150K', value: 10 }
  ]
};

// Acquisition source data
const acquisitionSources = [
  { name: 'Organic Search', value: 32, color: COLORS.evergreen },
  { name: 'Direct', value: 24, color: COLORS.darkTeal },
  { name: 'Social Media', value: 18, color: '#3498db' },
  { name: 'Referral', value: 14, color: '#9b59b6' },
  { name: 'Email', value: 8, color: '#f1c40f' },
  { name: 'Paid Search', value: 4, color: '#e74c3c' }
];

// Audience behavior data
const audienceBehavior = [
  { segment: 'Outdoor Enthusiasts', avgOrderValue: 175, purchaseFrequency: 4.2, loyaltyRate: 68 },
  { segment: 'Casual Hikers', avgOrderValue: 128, purchaseFrequency: 2.5, loyaltyRate: 42 },
  { segment: 'Winter Sports', avgOrderValue: 210, purchaseFrequency: 3.8, loyaltyRate: 72 },
  { segment: 'Urban Active', avgOrderValue: 145, purchaseFrequency: 3.2, loyaltyRate: 56 }
];

// RFM-based recommendations data
const audienceRecommendations = [
  {
    id: 1,
    title: 'Reactivate Dormant Audience Segment',
    description: '15% of your audience has not received a message from you in the past 6 months. Create a winback journey with personalized offers based on their previous purchase categories.',
    impact: 'high',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  },
  {
    id: 2,
    title: 'Optimize Engagement for High-Value Customers',
    description: 'Conversion rate for your most active 10% of customers has dropped by 8.3% in the last 30 days. Consider reducing email frequency or implementing a VIP program with exclusive benefits.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Loyalty', 'Marigold Messaging']
  },
  {
    id: 3,
    title: 'First-Time Buyer Conversion Strategy',
    description: '32% of first-time buyers from the last quarter haven\'t made a second purchase. Implement a targeted follow-up sequence with product recommendations based on initial purchase.',
    impact: 'medium',
    difficulty: 'medium',
    tools: ['Marigold Grow', 'Marigold Analytics']
  },
  {
    id: 4,
    title: 'Seasonal Customer Re-engagement',
    description: 'You have 4,200 customers who only purchase during winter season. Create an early-access campaign for upcoming winter collection to boost off-season engagement.',
    impact: 'medium',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  }
];

const AudienceAnalyticsContent = ({ activeTab, onTabChange = null, comparisonPeriod, segment, granularity }) => {
  const [audienceData, setAudienceData] = useState([]);
  const [totalAudience, setTotalAudience] = useState(0);
  const [audienceGrowth, setAudienceGrowth] = useState(0);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Initialize audience data on component mount
  useEffect(() => {
    // Generate initial data
    const initialData = generateAudienceData(30, true, 80000, 0.05);
    setAudienceData(initialData);
    
    // Calculate total audience and growth
    const latest = initialData[initialData.length - 1].total;
    const earliest = initialData[0].total;
    const growth = ((latest - earliest) / earliest) * 100;
    
    setTotalAudience(latest);
    setAudienceGrowth(growth);
  }, []);
  
  // Simulate live data updates
  useEffect(() => {
    let intervalId;
    
    if (isLiveUpdating) {
      intervalId = setInterval(() => {
        setAudienceData(prevData => {
          // Create a copy of the last data point
          const lastPoint = { ...prevData[prevData.length - 1] };
          
          // Adjust audience count slightly
          const adjustment = 1 + (Math.random() * 0.02 - 0.01);
          lastPoint.total = Math.round(lastPoint.total * adjustment);
          
          // Adjust segment counts proportionally but with slight variations
          lastPoint.outdoor = Math.round(lastPoint.total * 0.37 * (1 + (Math.random() * 0.01 - 0.005)));
          lastPoint.casual = Math.round(lastPoint.total * 0.24 * (1 + (Math.random() * 0.01 - 0.005)));
          lastPoint.winter = Math.round(lastPoint.total * 0.22 * (1 + (Math.random() * 0.01 - 0.005)));
          lastPoint.urban = Math.round(lastPoint.total * 0.17 * (1 + (Math.random() * 0.01 - 0.005)));
          
          // Ensure segments sum to total (adjust the largest segment if needed)
          const sum = lastPoint.outdoor + lastPoint.casual + lastPoint.winter + lastPoint.urban;
          if (sum !== lastPoint.total) {
            lastPoint.outdoor += (lastPoint.total - sum);
          }
          
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

  // Update current tab when activeTab changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Function to update tab
  const updateTab = (tabName) => {
    setCurrentTab(tabName);
  };

  // Handle view recommendation details
  const handleViewRecommendationDetails = (id) => {
    console.log(`Viewing details for recommendation ${id}`);
    updateTab('recommendations');
  };

  // Render different content based on the active tab
  const renderTabContent = () => {
    // Wrap the content in a container with shell background color
    const content = (() => {
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
    })();
    
    // Wrap the content with shell background
    return (
      <div>
        {content}
      </div>
    );
  };

  // Overview tab content
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary using the kpi-card-grid class for horizontal layout */}
        <div className="kpi-card-grid">
          {/* Total Audience KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <Users size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Total Audience</p>
                  <p className="kpi-value">{totalAudience.toLocaleString()}</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${audienceGrowth >= 0 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {audienceGrowth >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {Math.abs(audienceGrowth).toFixed(1)}% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Visitors KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <UserPlus size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">New Visitors (30d)</p>
                  <p className="kpi-value">{Math.round(totalAudience * 0.18).toLocaleString()}</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      14.2% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Location KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <MapPin size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Top Location</p>
                  <p className="kpi-value">New York</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      12.0% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Audience Segment KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <Target size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Top Audience Segment</p>
                  <p className="kpi-value">Outdoor Enthusiasts</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      37% of total audience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Insights - 2-column layout with recommendations */}
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
            Audience Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> has a total audience of <strong>{totalAudience.toLocaleString()}</strong> with a <strong style={{ color: COLORS.green }}>{audienceGrowth.toFixed(1)}%</strong> growth compared to the previous period.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoor Enthusiasts</strong> remain the dominant segment at <strong>37%</strong> of the total audience, followed by <strong>Casual Hikers</strong> at <strong>24%</strong>. The <strong>Winter Sports</strong> segment shows the strongest year-over-year growth at <strong>16.4%</strong>.
                </p>
                <p>
                  <strong>North America</strong> represents <strong>68%</strong> of the audience, with <strong>New York</strong> being the top location. Urban areas show <strong>12%</strong> higher engagement rates than rural areas, and mobile browsing accounts for <strong>58%</strong> of all audience interactions.
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
                {audienceRecommendations.slice(0, 3).map((rec, index) => (
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
        
        {/* Audience Growth & Segment Breakdown - Using explicit table layout for side-by-side */}
        <div style={{ 
          display: 'table', 
          width: '100%', 
          tableLayout: 'fixed',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'table-row' }}>
            {/* Audience Growth Trend */}
            <div style={{ 
              display: 'table-cell',
              width: '50%',
              paddingRight: '0.75rem',
              verticalAlign: 'top'
            }}>
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                    Audience Growth Trend
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
                  <AreaChart data={audienceData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.evergreen} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.evergreen} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
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
                      tickFormatter={value => `${value/1000}k`}
                    />
                    <Tooltip 
                      formatter={value => [`${value.toLocaleString()}`, 'Users']}
                      labelFormatter={value => `Date: ${value}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke={COLORS.evergreen} 
                      fillOpacity={1}
                      fill="url(#colorTotal)" 
                    />
                  </AreaChart>
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
            </div>
            
            {/* Audience Segments */}
            <div style={{ 
              display: 'table-cell',
              width: '50%',
              paddingLeft: '0.75rem',
              verticalAlign: 'top'
            }}>
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                  Audience Segments
                </h3>
                
                <div style={{ display: 'flex', height: 300 }}>
                  <div style={{ width: '60%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={true}
                        >
                          {audienceSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Audience Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {audienceSegments.map((segment, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: segment.color,
                          marginRight: '0.5rem',
                          borderRadius: '2px'
                        }}></div>
                        <div style={{ flex: 1, fontSize: '0.875rem', color: COLORS.onyx }}>
                          {segment.name}
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>
                          {segment.value}%
                        </div>
                      </div>
                    ))}
                    
                    <div style={{ 
                      marginTop: '1rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      color: COLORS.onyxMedium
                    }}>
                      <span style={{ fontWeight: 600, color: COLORS.onyx }}>Growth Insight:</span> Winter Sports segment growing fastest at +16.4% YoY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Audience by Geography */}
        <div className="mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Audience by Geography
            </h3>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                  Regional Distribution
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={geographicalDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {geographicalDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Audience Share']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div>
                  {geographicalDistribution.map((region, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: region.color,
                        marginRight: '0.5rem',
                        borderRadius: '2px'
                      }}></div>
                      <div style={{ flex: 1, fontSize: '0.75rem', color: COLORS.onyx }}>
                        {region.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
                        {region.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                  Top Cities by Traffic
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart 
                    data={topCities}
                    layout="vertical"
                    margin={{ left: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      type="number"
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                      tickFormatter={value => `${value/1000}k`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={false}
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip 
                      formatter={value => [`${value.toLocaleString()}`, 'Visitors']}
                    />
                    <Bar 
                      dataKey="visitors" 
                      fill={COLORS.evergreen} 
                      barSize={20} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[
                { name: 'Denver', growth: 24, insight: 'Winter Sports growth hub' },
                { name: 'Portland', growth: 22, insight: 'Outdoor Enthusiasts stronghold' },
                { name: 'Seattle', growth: 18, insight: 'Urban Active target market' },
                { name: 'Vancouver', growth: 15, insight: 'International growth leader' },
              ].map((city, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    borderLeft: `3px solid ${COLORS.evergreen}`
                  }}
                >
                  <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                    {city.name}
                  </h5>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: COLORS.green,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    marginBottom: '0.5rem'
                  }}>
                    <ArrowUpRight size={12} style={{ marginRight: '0.25rem' }} />
                    {city.growth}% growth
                  </div>
                  <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                    {city.insight}
                  </p>
                </div>
              ))}
            </div>
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
              Audience Growth by Segment
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={[
                  { month: 'May', outdoor: 29100, casual: 19000, winter: 16500, urban: 12800 },
                  { month: 'Jun', outdoor: 29700, casual: 19300, winter: 17000, urban: 13100 },
                  { month: 'Jul', outdoor: 30400, casual: 19500, winter: 17600, urban: 13500 },
                  { month: 'Aug', outdoor: 30900, casual: 19800, winter: 18100, urban: 13900 },
                  { month: 'Sep', outdoor: 31600, casual: 20200, winter: 18800, urban: 14300 },
                  { month: 'Oct', outdoor: 32200, casual: 20800, winter: 19200, urban: 14800 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `${value/1000}k`}
                />
                <Tooltip 
                  formatter={value => [`${value.toLocaleString()}`, 'Users']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  name="Outdoor Enthusiasts" 
                  dataKey="outdoor" 
                  stroke={COLORS.darkTeal} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Casual Hikers" 
                  dataKey="casual" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Winter Sports" 
                  dataKey="winter" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Urban Active" 
                  dataKey="urban" 
                  stroke="#9b59b6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Audience Growth by Region
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { region: 'North America', current: 54400, previous: 48200 },
                  { region: 'Europe', current: 14400, previous: 11500 },
                  { region: 'Asia-Pacific', current: 8000, previous: 7200 },
                  { region: 'Rest of World', current: 3200, previous: 3100 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `${value/1000}k`}
                />
                <Tooltip 
                  formatter={value => [`${value.toLocaleString()}`, 'Users']}
                />
                <Legend />
                <Bar name="Current Period" dataKey="current" fill={COLORS.evergreen} barSize={30} />
                <Bar name="Previous Period" dataKey="previous" fill="#d1d5db" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
            
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              color: COLORS.onyxMedium
            }}>
              <p style={{ fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Growth Trend:</p>
              <p>Europe shows the highest growth rate at 25.2% compared to the previous period, suggesting strong market potential for expansion.</p>
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
              Acquisition Source Trends
            </h3>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                  Traffic Source Distribution
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={acquisitionSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {acquisitionSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Traffic Share']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div>
                  {acquisitionSources.map((source, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: source.color,
                        marginRight: '0.5rem',
                        borderRadius: '2px'
                      }}></div>
                      <div style={{ flex: 1, fontSize: '0.75rem', color: COLORS.onyx }}>
                        {source.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
                        {source.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                  Source Growth Year-over-Year
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart 
                    data={[
                      { source: 'Organic Search', growth: 8.4 },
                      { source: 'Direct', growth: 12.5 },
                      { source: 'Social Media', growth: 28.6 },
                      { source: 'Referral', growth: 14.2 },
                      { source: 'Email', growth: 15.8 },
                      { source: 'Paid Search', growth: -2.6 }
                    ]}
                    layout="vertical"
                    margin={{ left: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      type="number"
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                      domain={[-5, 30]}
                      tickFormatter={value => `${value}%`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="source"
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={false}
                      tickLine={false}
                      width={120}
                    />
                    <Tooltip 
                      formatter={value => [`${value}%`, 'YoY Growth']}
                    />
                    <Bar 
                      dataKey="growth" 
                      fill={(value) => value < 0 ? COLORS.red : COLORS.evergreen}
                      barSize={20}
                    >
                      {[
                        { source: 'Organic Search', growth: 8.4 },
                        { source: 'Direct', growth: 12.5 },
                        { source: 'Social Media', growth: 28.6 },
                        { source: 'Referral', growth: 14.2 },
                        { source: 'Email', growth: 15.8 },
                        { source: 'Paid Search', growth: -2.6 }
                      ].map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.growth < 0 ? '#e74c3c' : COLORS.evergreen} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div style={{ 
                padding: '0.75rem',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${COLORS.green}`
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.green, marginBottom: '0.5rem' }}>
                  Fastest Growing Channel: Social Media (+28.6%)
                </h4>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Social media campaigns on Instagram and TikTok targeting 25-34 year olds have driven exceptional growth, particularly for the Urban Active audience segment.
                </p>
              </div>
              
              <div style={{ 
                padding: '0.75rem',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${COLORS.red}`
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.red, marginBottom: '0.5rem' }}>
                  Declining Channel: Paid Search (-2.6%)
                </h4>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Paid search performance has declined despite increased budget, suggesting optimization opportunities in keyword targeting and ad creative.
                </p>
              </div>
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
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Age Distribution
            </h3>
            
            <ResponsiveContainer width="100%" height={320}>
              <BarChart 
                data={demographics.age}
                layout="vertical"
                margin={{ left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                  unit="%"
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, 'Audience']}
                />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.evergreen} 
                  barSize={24} 
                  label={{ 
                    position: 'right', 
                    formatter: (item) => `${item.value}%`,
                    fill: COLORS.onyxMedium,
                    fontSize: 12
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Gender Distribution
            </h3>
            
            <div style={{ height: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographics.gender}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      <Cell fill={COLORS.evergreen} />
                      <Cell fill="#9b59b6" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Audience']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '16px',
                    height: '16px',
                    backgroundColor: COLORS.evergreen,
                    marginRight: '0.5rem',
                    borderRadius: '4px'
                  }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Male: {demographics.gender[0].value}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#9b59b6',
                    marginRight: '0.5rem',
                    borderRadius: '4px'
                  }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Female: {demographics.gender[1].value}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Income Distribution
            </h3>
            
            <ResponsiveContainer width="100%" height={320}>
              <BarChart 
                data={demographics.income}
                margin={{ left: 20 }}
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
                  unit="%"
                />
                <Tooltip 
                  formatter={value => [`${value}%`, 'Audience']}
                />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.evergreen} 
                  barSize={40} 
                  label={{ 
                    position: 'top', 
                    formatter: (item) => `${item.value}%`,
                    fill: COLORS.onyxMedium,
                    fontSize: 12
                  }} 
                />
              </BarChart>
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
              Audience Segment Behavior Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: COLORS.onyx }}>Segment</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Avg. Order Value</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Purchase Frequency</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Loyalty Rate</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>vs Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  {audienceBehavior.map((behavior, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>{behavior.segment}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>${behavior.avgOrderValue}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>{behavior.purchaseFrequency}/year</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>{behavior.loyaltyRate}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          color: COLORS.green,
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}>
                          <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                          {index === 0 ? 18.4 : index === 1 ? 4.2 : index === 2 ? 24.8 : 12.5}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Purchase Frequency by Segment
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart 
                    data={audienceBehavior}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="segment" 
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 5]}
                    />
                    <Tooltip 
                      formatter={value => [`${value}/year`, 'Purchase Frequency']}
                    />
                    <Bar 
                      dataKey="purchaseFrequency" 
                      fill={COLORS.evergreen} 
                      barSize={40} 
                      label={{ 
                        position: 'top', 
                        formatter: (item) => `${item.purchaseFrequency}`,
                        fill: COLORS.onyxMedium,
                        fontSize: 12
                      }} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Loyalty Program Participation by Segment
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart 
                    data={audienceBehavior}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="segment" 
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      unit="%"
                    />
                    <Tooltip 
                      formatter={value => [`${value}%`, 'Loyalty Rate']}
                    />
                    <Bar 
                      dataKey="loyaltyRate" 
                      fill={COLORS.evergreen} 
                      barSize={40} 
                      label={{ 
                        position: 'top', 
                        formatter: (item) => `${item.loyaltyRate}%`,
                        fill: COLORS.onyxMedium,
                        fontSize: 12
                      }} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Recommendations tab content with a grid layout to match the other components
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
              Audience Growth & Targeting Opportunities
            </h3>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
              Based on your audience data, Marigold AI has identified several key opportunities to expand high-value audience segments and improve targeting precision for Outdoors Sportswear's marketing campaigns.
            </p>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          marginBottom: '1.5rem' 
        }}>
          {audienceRecommendations.map((recommendation, index) => (
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

export default AudienceAnalyticsContent;
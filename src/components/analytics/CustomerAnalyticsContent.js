// src/components/analytics/CustomerAnalyticsContent.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, UserCheck, UserPlus, User, Zap, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Sample data for customer analytics
const generateCustomerData = (days, uptrend = true, baseValue = 8000, variance = 0.15) => {
  const data = [];
  let currentValue = baseValue;
  const trend = uptrend ? 1.005 : 0.995; // 0.5% up or down trend
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random variance between -variance% and +variance%
    const randomVariance = 1 + (Math.random() * variance * 2 - variance);
    currentValue = currentValue * trend * randomVariance;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      customers: Math.round(currentValue),
      newCustomers: Math.round(currentValue * 0.03 * randomVariance),
      activeCustomers: Math.round(currentValue * 0.65 * randomVariance),
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Retention cohort data
const retentionData = [
  {
    id: 'Q1 2024',
    data: [100, 85, 72, 65, 61]
  },
  {
    id: 'Q2 2024',
    data: [100, 88, 75, 70, null]
  },
  {
    id: 'Q3 2024',
    data: [100, 90, 78, null, null]
  },
  {
    id: 'Q4 2024',
    data: [100, 92, null, null, null]
  },
  {
    id: 'Q1 2025',
    data: [100, null, null, null, null]
  }
];

// Customer segmentation data
const customerSegments = [
  { name: 'Outdoor Enthusiasts', value: 37, color: COLORS.darkTeal },
  { name: 'Casual Hikers', value: 24, color: COLORS.evergreen },
  { name: 'Winter Sports', value: 22, color: '#3498db' },
  { name: 'Urban Active', value: 17, color: '#9b59b6' }
];

// Customer demographics
const customerDemographics = {
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
  location: [
    { name: 'Urban', value: 45 },
    { name: 'Suburban', value: 40 },
    { name: 'Rural', value: 15 }
  ]
};

// Customer loyalty tiers
const loyaltyTiers = [
  { name: 'Diamond', customers: 1250, growth: 18, spending: '$425', color: '#3498db' },
  { name: 'Gold', customers: 4800, growth: 12, spending: '$285', color: '#f1c40f' },
  { name: 'Silver', customers: 12500, growth: 8, spending: '$175', color: '#bdc3c7' },
  { name: 'Bronze', customers: 27500, growth: 5, spending: '$95', color: '#d35400' }
];

// Recommendations data
const customerRecommendations = [
  {
    id: 1,
    title: 'Winter Sports Segment Loyalty Program Boost',
    description: 'The Winter Sports segment shows high purchase frequency but lower loyalty program participation. Create a specialized winter sports tier with exclusive early access to new ski and snowboard gear to increase engagement.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Loyalty', 'Marigold Messaging']
  },
  {
    id: 2,
    title: 'Re-engagement Campaign for Lapsed Customers',
    description: 'We identified 4,800 customers who were previously active but haven\'t made a purchase in 90+ days. A personalized re-engagement campaign with special offers on their previously purchased categories could recover 15-20% of these customers.',
    impact: 'high',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  },
  {
    id: 3,
    title: 'Urban Active Segment Expansion',
    description: 'The Urban Active segment has grown 23% year-over-year and shows the highest average order value. Develop targeted acquisition campaigns to expand this profitable segment using lookalike audiences based on current high-value customers.',
    impact: 'medium',
    difficulty: 'medium',
    tools: ['Marigold Grow', 'Marigold Analytics']
  },
  {
    id: 4,
    title: 'Customer Retention Improvement for Q2 Cohort',
    description: 'The Q2 2024 customer cohort shows declining retention from month 3 onwards. Implement a targeted loyalty points acceleration program at the 60-day mark to improve long-term retention rates.',
    impact: 'medium',
    difficulty: 'low',
    tools: ['Marigold Loyalty', 'Marigold Messaging']
  }
];

const CustomerAnalyticsContent = ({ activeTab, onTabChange = null, comparisonPeriod, segment, granularity }) => {
  const [customerData, setCustomerData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [customerGrowth, setCustomerGrowth] = useState(0);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Initialize customer data on component mount
  useEffect(() => {
    // Generate initial data
    const initialData = generateCustomerData(30, true, 45000, 0.08);
    setCustomerData(initialData);
    
    // Calculate total customers and growth
    const current = initialData[initialData.length - 1].customers;
    const previous = initialData[0].customers;
    const growth = ((current - previous) / previous) * 100;
    
    setTotalCustomers(current);
    setCustomerGrowth(growth);
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
        setCustomerData(prevData => {
          // Create a copy of the last data point
          const lastPoint = { ...prevData[prevData.length - 1] };
          
          // Adjust customer count slightly (±2%)
          const adjustment = 1 + (Math.random() * 0.04 - 0.02);
          lastPoint.customers = Math.round(lastPoint.customers * adjustment);
          lastPoint.newCustomers = Math.round(lastPoint.customers * 0.03 * (1 + (Math.random() * 0.1 - 0.05)));
          lastPoint.activeCustomers = Math.round(lastPoint.customers * 0.65 * (1 + (Math.random() * 0.05 - 0.025)));
          
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

  // Implement view recommendation details
  const handleViewRecommendationDetails = (id) => {
    console.log(`Viewing details for recommendation ${id}`);
    updateTab('recommendations');
  };

  // Overview tab content with updated KPI cards matching dashboard style
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary - Updated to horizontal layout matching dashboard style */}
        <div className="kpi-card-grid">
          {/* Total Customers KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <Users size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Total Customers</p>
                  <p className="kpi-value">{totalCustomers.toLocaleString()}</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${customerGrowth >= 0 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {customerGrowth >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {Math.abs(customerGrowth).toFixed(1)}% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Customers KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <UserCheck size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Active Customers</p>
                  <p className="kpi-value">{Math.round(totalCustomers * 0.65).toLocaleString()}</p>
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

          {/* New Customers KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <UserPlus size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">New Customers (30d)</p>
                  <p className="kpi-value">{Math.round(totalCustomers * 0.045).toLocaleString()}</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      12.3% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Retention KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <User size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Customer Retention</p>
                  <p className="kpi-value">78.4%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      3.5% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Insights - 2-column layout with recommendations */}
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
            Customer Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> has seen a <strong style={{ color: COLORS.green }}>{customerGrowth.toFixed(1)}%</strong> increase in total customers, reaching <strong>{totalCustomers.toLocaleString()}</strong> registered customers.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Customer retention</strong> has improved to <strong>78.4%</strong>, a <strong style={{ color: COLORS.green }}>3.5%</strong> increase over the previous period. The <strong>Winter Sports</strong> segment shows the strongest growth at <strong>16.4%</strong> year-over-year.
                </p>
                <p>
                  The <strong>Urban Active</strong> segment, while only <strong>17%</strong> of customers, represents <strong>23%</strong> of total revenue due to their higher average order value and purchase frequency. <strong>Loyalty program</strong> members have <strong>65%</strong> higher retention rates than non-members.
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
                {customerRecommendations.slice(0, 3).map((rec, index) => (
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
        
        {/* Customer Growth Trend & Segmentation - Side by Side */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '1.5rem'
        }}>
          {/* Customer Growth Trend */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Customer Growth Trend
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
              <AreaChart data={customerData}>
                <defs>
                  <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
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
                  formatter={value => [`${value.toLocaleString()}`, 'Customers']}
                  labelFormatter={value => `Date: ${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="customers" 
                  stroke={COLORS.evergreen} 
                  fillOpacity={1}
                  fill="url(#colorCustomers)" 
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
          
          {/* Customer Segments */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Customer Segments
            </h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Customer Share']} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              {customerSegments.map((segment, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 1rem' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: segment.color,
                    marginRight: '0.5rem',
                    borderRadius: '2px'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyx }}>
                    {segment.name} ({segment.value}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Loyalty Program Tiers - Updated to horizontal layout */}
        <div className="mb-6">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Loyalty Program Tiers
          </h3>
          
          <div className="kpi-card-grid">
            {loyaltyTiers.map((tier, index) => (
              <div key={index} className="kpi-card-wrapper">
                <div className="kpi-card">
                  <div className="kpi-card-content">
                    <div className="kpi-icon-container" style={{ backgroundColor: `${tier.color}25` }}>
                      <User size={20} color={tier.color} />
                    </div>
                    <div className="kpi-text-container">
                      <p className="kpi-title">{tier.name}</p>
                      <p className="kpi-value">{tier.customers.toLocaleString()}</p>
                      <div className="kpi-change-container">
                        <span className="kpi-change kpi-change-positive">
                          <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                          {tier.growth}% growth
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem' }}>
                        Avg. Spend: {tier.spending}
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
              Customer Acquisition vs Churn
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { month: 'May', acquisition: 2450, churn: 1250 },
                  { month: 'Jun', acquisition: 2680, churn: 1320 },
                  { month: 'Jul', acquisition: 2850, churn: 1380 },
                  { month: 'Aug', acquisition: 3120, churn: 1450 },
                  { month: 'Sep', acquisition: 3450, churn: 1520 },
                  { month: 'Oct', acquisition: 3720, churn: 1620 }
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
                />
                <Tooltip 
                  formatter={value => [`${value.toLocaleString()}`, 'Customers']}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar name="New Customers" dataKey="acquisition" fill={COLORS.green} barSize={20} />
                <Bar name="Churned Customers" dataKey="churn" fill="#e74c3c" barSize={20} />
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
              Customer Lifetime Value Trend
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={[
                  { quarter: 'Q1 2023', all: 325, outdoor: 420, casual: 305, winter: 410, urban: 380 },
                  { quarter: 'Q2 2023', all: 340, outdoor: 435, casual: 315, winter: 425, urban: 390 },
                  { quarter: 'Q3 2023', all: 355, outdoor: 450, casual: 325, winter: 440, urban: 410 },
                  { quarter: 'Q4 2023', all: 370, outdoor: 465, casual: 335, winter: 455, urban: 425 },
                  { quarter: 'Q1 2024', all: 385, outdoor: 480, casual: 345, winter: 470, urban: 440 },
                  { quarter: 'Q2 2024', all: 405, outdoor: 495, casual: 360, winter: 485, urban: 460 },
                  { quarter: 'Q3 2024', all: 420, outdoor: 510, casual: 375, winter: 500, urban: 485 },
                  { quarter: 'Q4 2024', all: 440, outdoor: 530, casual: 390, winter: 520, urban: 510 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip 
                  formatter={value => [`$${value}`, 'Average LTV']}
                />
                <Legend verticalAlign="top" height={36} />
                <Line 
                  name="All Customers" 
                  dataKey="all" 
                  stroke={COLORS.onyxMedium} 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }}
                />
                <Line 
                  name="Outdoor Enthusiasts" 
                  dataKey="outdoor" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }}
                />
                <Line 
                  name="Winter Sports" 
                  dataKey="winter" 
                  stroke="#3498db" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }}
                />
                <Line 
                  name="Urban Active" 
                  dataKey="urban" 
                  stroke="#9b59b6" 
                  strokeWidth={2} 
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
              Customer Retention by Cohort
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                fontSize: '0.875rem',
                color: COLORS.onyx
              }}>
                <thead>
                  <tr>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'left', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '100px'
                    }}>Cohort</th>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}>Month 0</th>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}>Month 1</th>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}>Month 2</th>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}>Month 3</th>
                    <th style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(0,0,0,0.03)', 
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}>Month 4</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionData.map((cohort, i) => (
                    <tr key={i}>
                      <td style={{ 
                        padding: '0.75rem', 
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                      }}>{cohort.id}</td>
                      {cohort.data.map((value, j) => (
                        <td 
                          key={j} 
                          style={{ 
                            padding: '0.75rem', 
                            textAlign: 'center',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            backgroundColor: value 
                              ? `rgba(26, 76, 73, ${value / 100})` 
                              : 'transparent',
                            color: value && value < 70 
                              ? '#fff' 
                              : COLORS.onyx,
                            fontWeight: j === 0 ? 600 : 400
                          }}
                        >
                          {value ? `${value}%` : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
                data={customerDemographics.age}
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
                  formatter={value => [`${value}%`, 'Customers']}
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
                      data={customerDemographics.gender}
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
                    <Tooltip formatter={(value) => [`${value}%`, 'Customers']} />
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
                  <span style={{ fontSize: '0.875rem' }}>Male: {customerDemographics.gender[0].value}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#9b59b6',
                    marginRight: '0.5rem',
                    borderRadius: '4px'
                  }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Female: {customerDemographics.gender[1].value}%</span>
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
              Location Distribution
            </h3>
            
            <ResponsiveContainer width="100%" height={320}>
              <BarChart 
                data={customerDemographics.location}
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
                  formatter={value => [`${value}%`, 'Customers']}
                />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.evergreen} 
                  barSize={50} 
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
              Purchase Frequency Distribution
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { frequency: 'Once', customers: 28 },
                  { frequency: '2-3 times', customers: 32 },
                  { frequency: '4-6 times', customers: 24 },
                  { frequency: '7-12 times', customers: 12 },
                  { frequency: '13+ times', customers: 4 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="frequency" 
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
                  formatter={value => [`${value}%`, 'Customers']}
                />
                <Bar 
                  dataKey="customers" 
                  fill={COLORS.evergreen} 
                  barSize={60} 
                  label={{ 
                    position: 'top', 
                    formatter: (item) => `${item.customers}%`,
                    fill: COLORS.onyxMedium,
                    fontSize: 12
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem', fontSize: '0.875rem', color: COLORS.onyxMedium }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '10px',
                  height: '10px',
                  backgroundColor: COLORS.evergreen,
                  borderRadius: '50%'
                }}></div>
                <span style={{ fontWeight: 600, color: COLORS.onyx }}>Key Insight:</span>
              </div>
              60% of Outdoors Sportswear customers purchase 2-6 times per year. Increasing purchase frequency in the "2-3 times" segment by just one additional purchase would significantly increase annual revenue.
            </div>
          </div>
        </div>
      </div>
    );
  };

// Recommendations tab content with a grid layout
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
            Customer Growth & Retention Opportunities
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
            Based on your customer data, Marigold AI has identified several key opportunities to increase customer acquisition, improve retention, and maximize lifetime value through strategic marketing and loyalty program enhancements.
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem',
        marginBottom: '1.5rem' 
      }}>
        {customerRecommendations.map((recommendation, index) => (
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

export default CustomerAnalyticsContent;
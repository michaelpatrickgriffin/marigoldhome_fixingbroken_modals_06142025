import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ShoppingBag, Zap, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Sample data for live revenue analytics charts
const generateRevenueData = (days, uptrend = true, baseValue = 15000, variance = 0.2) => {
  const data = [];
  let currentValue = baseValue;
  const trend = uptrend ? 1.01 : 0.99; // 1% up or down trend
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random variance between -variance% and +variance%
    const randomVariance = 1 + (Math.random() * variance * 2 - variance);
    currentValue = currentValue * trend * randomVariance;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(currentValue),
      target: Math.round(baseValue * (1 + (0.01 * (days - i)))), // Slight upward target
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Product categories for Outdoors Sportswear
const productCategories = [
  { name: 'Jackets & Outerwear', value: 42, color: COLORS.darkTeal },
  { name: 'Footwear', value: 28, color: COLORS.evergreen },
  { name: 'Fleece & Sweaters', value: 15, color: '#3498db' },
  { name: 'Base Layers', value: 8, color: '#9b59b6' },
  { name: 'Pants & Shorts', value: 7, color: '#e74c3c' }
];

// Channels breakdown
const channelBreakdown = [
  { name: 'Direct Website', value: 45, color: COLORS.evergreen },
  { name: 'Retail Stores', value: 28, color: COLORS.darkTeal },
  { name: 'Marketplace', value: 15, color: '#3498db' },
  { name: 'Wholesale', value: 12, color: '#9b59b6' }
];

// Collection performance
const collectionPerformance = [
  { name: 'Winter Trail Collection', revenue: 425000, growth: 24 },
  { name: 'Hiking Essentials', revenue: 380000, growth: 18 },
  { name: 'Mountain Gear Pro', revenue: 350000, growth: 12 },
  { name: 'Urban Outdoor', revenue: 320000, growth: 8 },
  { name: 'Waterproof Series', revenue: 290000, growth: 5 }
];

// Recommendations data
const revenueRecommendations = [
  {
    id: 1,
    title: 'Launch Targeted Campaign for Winter Trail Collection',
    description: 'The Winter Trail Collection is showing exceptional performance with 24% growth. Launch a targeted email campaign to customers who have purchased similar items in the past but haven\'t yet purchased from this collection.',
    impact: 'high',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  },
  {
    id: 2,
    title: 'Optimize Cross-Selling for Jackets & Footwear',
    description: 'Analysis shows customers who purchase jackets are 3x more likely to also purchase footwear. Create bundle promotions and update product recommendation algorithms to capitalize on this pattern.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Loyalty', 'Marigold Grow']
  },
  {
    id: 3,
    title: 'Increase Direct Website Conversion Rate',
    description: 'While direct website traffic accounts for 45% of revenue, the conversion rate has room for improvement. Implement A/B testing on checkout flow and add loyalty program benefits to product pages to increase conversions.',
    impact: 'medium',
    difficulty: 'medium',
    tools: ['Marigold Analytics', 'Marigold Loyalty']
  },
  {
    id: 4,
    title: 'Expand Hiking Essentials Collection Distribution',
    description: 'The Hiking Essentials collection has shown 18% growth but has limited distribution. Expand availability across more retail partners and increase digital marketing spend.',
    impact: 'medium',
    difficulty: 'high',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  }
];

// In RevenueAnalyticsContent.js

const RevenueAnalyticsContent = ({ activeTab, onTabChange = null, comparisonPeriod, segment, granularity }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Initialize revenue data on component mount
  useEffect(() => {
    // Generate initial data
    const initialData = generateRevenueData(30, true, 150000, 0.1);
    setRevenueData(initialData);
    
    // Calculate current revenue and change percentage
    const total = initialData.slice(-7).reduce((sum, day) => sum + day.revenue, 0);
    const previousTotal = initialData.slice(-14, -7).reduce((sum, day) => sum + day.revenue, 0);
    const percentChange = ((total - previousTotal) / previousTotal) * 100;
    
    setCurrentRevenue(total);
    setRevenueChange(percentChange);
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

  // Handle implementation of a recommendation
  const handleImplementRecommendation = (id) => {
    // In a real app, this would do more than just switch tabs
    console.log(`Implementing recommendation ${id}`);
    updateTab('recommendations');
  };

  // Add a new function specifically for viewing recommendation details
  const handleViewRecommendationDetails = (id) => {
    console.log(`Viewing details for recommendation ${id}`);
    updateTab('recommendations');
  };
  
  // Simulate live data updates
  useEffect(() => {
    let intervalId;
    
    if (isLiveUpdating) {
      intervalId = setInterval(() => {
        setRevenueData(prevData => {
          // Create a copy of the last data point
          const lastPoint = { ...prevData[prevData.length - 1] };
          
          // Adjust revenue slightly (±3%)
          const adjustment = 1 + (Math.random() * 0.06 - 0.03);
          lastPoint.revenue = Math.round(lastPoint.revenue * adjustment);
          
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

  // Overview tab content with updated KPI cards matching dashboard style
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary - Updated to horizontal layout matching dashboard style */}
        <div className="kpi-card-grid">
          {/* Total Revenue KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <DollarSign size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Total Revenue</p>
                  <p className="kpi-value">${currentRevenue.toLocaleString()}</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${revenueChange >= 0 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {revenueChange >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {Math.abs(revenueChange).toFixed(1)}% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Order Value KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <TrendingUp size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Average Order Value</p>
                  <p className="kpi-value">$187.50</p>
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

          {/* Sales Volume KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <ShoppingBag size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Sales Volume</p>
                  <p className="kpi-value">8,420</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      8.7% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Per User KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={20} color="white" />
                    <div style={{ 
                      position: 'absolute', 
                      top: '1px', 
                      right: '-3px', 
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#FFC107'
                    }}></div>
                  </div>
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Revenue Per User</p>
                  <p className="kpi-value">$247.50</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      15.2% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Insights - 2-column layout with recommendations */}
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
            Revenue Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> is experiencing a <strong style={{ color: COLORS.green }}>{revenueChange.toFixed(1)}%</strong> increase in revenue compared to the previous period, with total revenue reaching <strong>${currentRevenue.toLocaleString()}</strong>.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Jackets & Outerwear</strong> dominates the product mix at <strong>42%</strong> of revenue, followed by <strong>Footwear</strong> at <strong>28%</strong>. The <strong>Winter Trail Collection</strong> is the top performing collection with <strong>${(collectionPerformance[0].revenue/1000).toFixed(0)}K</strong> in revenue and exceptional growth of <strong>{collectionPerformance[0].growth}%</strong>.
                </p>
                <p>
                  Average order value is increasing significantly at <strong style={{ color: COLORS.green }}>12.3%</strong>, reaching <strong>$187.50</strong>, while revenue per user has grown by <strong style={{ color: COLORS.green }}>15.2%</strong>. This suggests customers are purchasing higher-value items and engaging more with the brand. The <strong>Direct Website</strong> channel continues to be the strongest revenue driver at <strong>45%</strong>.
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
                {revenueRecommendations.slice(0, 3).map((rec, index) => (
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
        
        {/* Revenue Trend Chart and Product Category - Side by Side with flex layout */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '1.5rem'
        }}>
          {/* Revenue Trend Chart */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Revenue Trend
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
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.evergreen} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.evergreen} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ccc" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ccc" stopOpacity={0.1}/>
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
                  tickFormatter={value => `$${value/1000}k`}
                />
                <Tooltip 
                  formatter={value => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={value => `Date: ${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#999" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  fillOpacity={0}
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
          
          {/* Revenue by Product Category with legend below */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Revenue by Product Category
            </h3>
            
            {/* Chart takes full width now */}
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={productCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {productCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Revenue Share']} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend is now below the chart in a 3-column grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '0.75rem',
              marginTop: '1rem' 
            }}>
              {productCategories.map((category, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: category.color,
                    marginRight: '0.5rem',
                    borderRadius: '2px'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyx }}>
                    {category.name} ({category.value}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Top Performing Collections - Reworked to horizontal layout and KPI card styling */}
        <div className="mb-6">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Top Performing Collections
          </h3>
          
          <div className="kpi-card-grid">
            {collectionPerformance.map((collection, index) => (
              <div key={index} className="kpi-card-wrapper">
                <div className="kpi-card">
                  <div className="kpi-card-content">
                    <div className="kpi-icon-container kpi-icon-bg-revenue">
                      <DollarSign size={20} color="white" />
                    </div>
                    <div className="kpi-text-container">
                      <p className="kpi-title">{collection.name}</p>
                      <p className="kpi-value">${(collection.revenue / 1000).toFixed(0)}K</p>
                      <div className="kpi-change-container">
                        <span className="kpi-change kpi-change-positive">
                          <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                          {collection.growth}% growth
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
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            flex: 2,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Revenue vs Target Over Time
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={revenueData}>
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
                  tickFormatter={value => `$${value/1000}k`}
                />
                <Tooltip 
                  formatter={value => [`$${value.toLocaleString()}`, 'Amount']}
                  labelFormatter={value => `Date: ${value}`}
                />
                <Legend verticalAlign="top" height={36} />
                <Line 
                  type="monotone" 
                  name="Actual Revenue"
                  dataKey="revenue" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={{ r: 3, fill: COLORS.evergreen, stroke: COLORS.evergreen }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  name="Target"
                  dataKey="target" 
                  stroke="#999" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Revenue by Channel
            </h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelBreakdown}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {channelBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Revenue Share']} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend below chart */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '0.75rem',
              marginTop: '1rem' 
            }}>
              {channelBreakdown.map((channel, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: channel.color,
                    marginRight: '0.5rem',
                    borderRadius: '2px'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyx }}>
                    {channel.name} ({channel.value}%)
                  </div>
                </div>
              ))}
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
              Revenue by Season (Year over Year)
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { name: 'Spring', current: 1850000, previous: 1620000 },
                  { name: 'Summer', current: 1580000, previous: 1450000 },
                  { name: 'Fall', current: 1920000, previous: 1720000 },
                  { name: 'Winter', current: 2340000, previous: 1980000 }
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
                  tickFormatter={value => `$${value/1000000}M`}
                />
                <Tooltip 
                  formatter={value => [`$${(value/1000000).toFixed(2)}M`, 'Revenue']}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar name="Current Year" dataKey="current" fill={COLORS.evergreen} barSize={40} />
                <Bar name="Previous Year" dataKey="previous" fill="#AADDAA" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Breakdown tab content
  const renderBreakdownTab = () => {
    const productBreakdown = [
      { name: 'Omni-Heat™ Infinity Jacket', revenue: 428000, growth: 32, units: 2140 },
      { name: 'Newton Ridge™ Hiking Boots', revenue: 312000, growth: 18, units: 3120 },
      { name: 'Steens Mountain™ Fleece', revenue: 287000, growth: 15, units: 5740 },
      { name: 'Bugaboo™ Winter Pants', revenue: 255000, growth: 12, units: 2550 },
      { name: 'Silver Ridge™ Convertible Pants', revenue: 212000, growth: 8, units: 2650 },
      { name: 'Benton Springs™ Fleece', revenue: 198000, growth: 5, units: 3960 },
      { name: 'Glennaker Rain Jacket', revenue: 187000, growth: 3, units: 2680 },
      { name: 'Whirlibird™ IV Jacket', revenue: 175000, growth: 2, units: 865 },
      { name: 'Watertight™ II Jacket', revenue: 168000, growth: -1, units: 2100 },
      { name: 'Peakfreak™ Hiking Shoes', revenue: 154000, growth: -3, units: 1540 }
    ];
    
    const regionData = [
      { name: 'North America', value: 55, color: COLORS.evergreen },
      { name: 'Europe', value: 25, color: COLORS.darkTeal },
      { name: 'Asia Pacific', value: 12, color: '#3498db' },
      { name: 'Latin America', value: 8, color: '#9b59b6' }
    ];
    
    return (
      <div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            flex: 2,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Top 10 Products by Revenue
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Product</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Revenue</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Units</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {productBreakdown.map((product, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: COLORS.onyx }}>{product.name}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, textAlign: 'right' }}>${product.revenue.toLocaleString()}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: COLORS.onyx, textAlign: 'right' }}>{product.units.toLocaleString()}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: product.growth >= 0 ? COLORS.green : COLORS.red,
                          backgroundColor: product.growth >= 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }}>
                          {product.growth >= 0 ? (
                            <ArrowUpRight size={12} style={{ marginRight: '0.25rem' }} />
                          ) : (
                            <ArrowDownRight size={12} style={{ marginRight: '0.25rem' }} />
                          )}
                          {Math.abs(product.growth)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Revenue by Region
            </h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Revenue Share']} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend below chart */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '0.75rem',
              marginTop: '1rem' 
            }}>
              {regionData.map((region, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: region.color,
                    marginRight: '0.5rem',
                    borderRadius: '2px'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyx }}>
                    {region.name} ({region.value}%)
                  </div>
                </div>
              ))}
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
              Revenue by Customer Segment
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { name: 'Outdoor Enthusiasts', revenue: 3240000, percentage: 42 },
                  { name: 'Casual Hikers', revenue: 1850000, percentage: 24 },
                  { name: 'Winter Sports', revenue: 1620000, percentage: 21 },
                  { name: 'Urban Active', revenue: 1010000, percentage: 13 }
                ]}
                layout="vertical"
                margin={{ left: 150 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                  tickFormatter={value => `$${value/1000000}M`}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  width={140}
                />
                <Tooltip 
                  formatter={value => [`$${(value/1000000).toFixed(2)}M`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill={COLORS.evergreen} 
                  barSize={30} 
                  label={{ 
                    position: 'right', 
                    formatter: (item) => `${item.percentage}%`,
                    fill: COLORS.onyxMedium,
                    fontSize: 12
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Recommendations tab content
  const renderRecommendationsTab = () => {
    return (
      <div>
        <div className="mb-6">
          <div style={{ 
            backgroundColor: 'rgba(26, 76, 73, 0.03)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${COLORS.evergreen}`
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Revenue Growth Opportunities
            </h3>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
              Based on your revenue data, Marigold AI has identified several key opportunities to optimize your marketing campaigns and loyalty programs. Implementing these recommendations could increase revenue by an estimated 15-20% in the next quarter.
            </p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {revenueRecommendations.map((recommendation, index) => (
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
                    outline: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    console.log(`Implementing recommendation ${recommendation.id}`);
                    // Implementation logic would go here
                  }}
                >
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

export default RevenueAnalyticsContent;
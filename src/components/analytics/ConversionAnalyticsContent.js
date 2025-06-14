// src/components/analytics/ConversionAnalyticsContent.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Percent, ShoppingCart, CreditCard, Tag, Zap, ChevronRight, Check } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Sample data for live conversion analytics charts
const generateConversionData = (days, uptrend = true, baseValue = 3.5, variance = 0.1) => {
  const data = [];
  let currentValue = baseValue;
  const trend = uptrend ? 1.01 : 0.99; // 1% up or down trend
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random variance between -variance% and +variance%
    const randomVariance = 1 + (Math.random() * variance * 2 - variance);
    currentValue = currentValue * trend * randomVariance;
    
    // Calculate other related metrics
    const visitToCart = Math.min(currentValue * 6.5 * (1 + (Math.random() * 0.1 - 0.05)), 100);
    const cartToCheckout = Math.min(visitToCart * 0.45 * (1 + (Math.random() * 0.1 - 0.05)), 100);
    const checkoutToComplete = Math.min(cartToCheckout * 0.72 * (1 + (Math.random() * 0.1 - 0.05)), 100);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      conversionRate: Math.round(currentValue * 10) / 10, // Overall conversion rate
      visitToCartRate: Math.round(visitToCart * 10) / 10,
      cartToCheckoutRate: Math.round(cartToCheckout * 10) / 10,
      checkoutToCompleteRate: Math.round(checkoutToComplete * 10) / 10,
      timestamp: date.getTime()
    });
  }
  
  return data;
};

// Campaign conversion data
const campaignConversion = [
  { name: 'Winter Gear Sale', conversionRate: 4.2, AOV: 165, ROI: 320 },
  { name: 'Summer Hiking Bundle', conversionRate: 3.8, AOV: 140, ROI: 280 },
  { name: 'Back to School', conversionRate: 2.9, AOV: 125, ROI: 210 },
  { name: 'Loyalty Member Special', conversionRate: 5.6, AOV: 188, ROI: 380 },
  { name: 'New Collection Launch', conversionRate: 3.2, AOV: 152, ROI: 245 }
];

// Conversion by channel data
const channelConversion = [
  { name: 'Organic Search', value: 28, color: COLORS.evergreen },
  { name: 'Direct', value: 22, color: COLORS.darkTeal },
  { name: 'Email', value: 18, color: '#3498db' },
  { name: 'Paid Search', value: 14, color: '#9b59b6' },
  { name: 'Social Media', value: 12, color: '#e74c3c' },
  { name: 'Referral', value: 6, color: '#f1c40f' }
];

// Product conversion rates
const productConversion = [
  { name: 'Omni-Heat™ Infinity Jacket', visitToCart: 28.4, cartToCheckout: 42.5, checkoutToComplete: 85.2, abandonRate: 32.5 },
  { name: 'Newton Ridge™ Hiking Boots', visitToCart: 24.2, cartToCheckout: 38.1, checkoutToComplete: 82.7, abandonRate: 38.2 },
  { name: 'Steens Mountain™ Fleece', visitToCart: 32.6, cartToCheckout: 45.3, checkoutToComplete: 88.5, abandonRate: 28.7 },
  { name: 'Bugaboo™ Winter Pants', visitToCart: 22.8, cartToCheckout: 36.7, checkoutToComplete: 81.4, abandonRate: 41.5 },
  { name: 'Silver Ridge™ Convertible Pants', visitToCart: 26.3, cartToCheckout: 39.8, checkoutToComplete: 83.6, abandonRate: 35.8 }
];

// Checkout abandonment reasons
const abandonmentReasons = [
  { name: 'Shipping Costs', value: 32, color: '#e74c3c' },
  { name: 'Account Creation Required', value: 24, color: '#f39c12' },
  { name: 'Payment Issues', value: 18, color: '#3498db' },
  { name: 'Comparing Prices', value: 14, color: '#9b59b6' },
  { name: 'Unclear Return Policy', value: 12, color: '#2ecc71' }
];

// Recommendations data
const conversionRecommendations = [
  {
    id: 1,
    title: 'Simplify Checkout Process',
    description: 'Current checkout abandonment rate is 35%. Remove mandatory account creation and reduce the form fields from 12 to 6 to streamline the checkout process. Customer testing shows this could reduce abandonment by up to 42%.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Analytics']
  },
  {
    id: 2,
    title: 'Dynamic Shipping Threshold Messaging',
    description: 'Add dynamic messaging showing customers how close they are to free shipping threshold. Analysis shows that "shipping costs" is the primary abandonment reason (32%). This intervention increased AOV by 15% in A/B testing.',
    impact: 'high',
    difficulty: 'low',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  },
  {
    id: 3,
    title: 'Loyalty Program Integration at Checkout',
    description: 'Loyalty members have 68% higher conversion rates than non-members. Add loyalty point earnings visualization and tier progress at checkout to incentivize conversions and program enrollment.',
    impact: 'medium',
    difficulty: 'medium',
    tools: ['Marigold Loyalty', 'Marigold Analytics']
  },
  {
    id: 4,
    title: 'Abandoned Cart Email Sequence Optimization',
    description: 'Current cart recovery rate is 12%. Implement a 3-email sequence with personalized product recommendations and dynamic discounts based on cart value. Similar implementations have shown recovery rates of 25-30%.',
    impact: 'high',
    difficulty: 'medium',
    tools: ['Marigold Messaging', 'Marigold Analytics']
  }
];

const ConversionAnalyticsContent = ({ activeTab, onTabChange = null, comparisonPeriod, segment, granularity }) => {
  const [conversionData, setConversionData] = useState([]);
  const [currentConversionRate, setCurrentConversionRate] = useState(0);
  const [conversionChange, setConversionChange] = useState(0);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Initialize conversion data on component mount
  useEffect(() => {
    // Generate initial data
    const initialData = generateConversionData(30, true, 3.5, 0.1);
    setConversionData(initialData);
    
    // Calculate current conversion rate and change
    const latest = initialData.slice(-7);
    const previous = initialData.slice(-14, -7);
    
    const currentAvg = latest.reduce((sum, day) => sum + day.conversionRate, 0) / latest.length;
    const previousAvg = previous.reduce((sum, day) => sum + day.conversionRate, 0) / previous.length;
    const change = ((currentAvg - previousAvg) / previousAvg) * 100;
    
    setCurrentConversionRate(currentAvg);
    setConversionChange(change);
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
  
  // Handle view recommendation details
  const handleViewRecommendationDetails = (id) => {
    console.log(`Viewing details for recommendation ${id}`);
    updateTab('recommendations');
  };
  
  // Simulate live data updates
  useEffect(() => {
    let intervalId;
    
    if (isLiveUpdating) {
      intervalId = setInterval(() => {
        setConversionData(prevData => {
          // Create a copy of the last data point
          const lastPoint = { ...prevData[prevData.length - 1] };
          
          // Adjust conversion rate slightly (±3%)
          const cvRandomVar = 1 + (Math.random() * 0.06 - 0.03);
          lastPoint.conversionRate = Math.round(lastPoint.conversionRate * cvRandomVar * 10) / 10;
          lastPoint.visitToCartRate = Math.round(lastPoint.visitToCartRate * (1 + (Math.random() * 0.04 - 0.02)) * 10) / 10;
          lastPoint.cartToCheckoutRate = Math.round(lastPoint.cartToCheckoutRate * (1 + (Math.random() * 0.04 - 0.02)) * 10) / 10;
          lastPoint.checkoutToCompleteRate = Math.round(lastPoint.checkoutToCompleteRate * (1 + (Math.random() * 0.03 - 0.015)) * 10) / 10;
          
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

  // Overview tab content with updated KPI cards to match revenue template
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary - Updated to horizontal layout matching dashboard style */}
        <div className="kpi-card-grid">
          {/* Conversion Rate KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <Percent size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Conversion Rate</p>
                  <p className="kpi-value">{currentConversionRate.toFixed(1)}%</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${conversionChange >= 0 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {conversionChange >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {Math.abs(conversionChange).toFixed(1)}% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <ShoppingCart size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Cart Abandonment</p>
                  <p className="kpi-value">35.2%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      2.8% vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <CreditCard size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Average Order Value</p>
                  <p className="kpi-value">$164.50</p>
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
          
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <Tag size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Revenue Per Visit</p>
                  <p className="kpi-value">$5.76</p>
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

        {/* Conversion Insights - 2-column layout with recommendations */}
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
            Conversion Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> is experiencing a <strong style={{ color: COLORS.green }}>{conversionChange.toFixed(1)}%</strong> increase in conversion rate compared to the previous period, with the overall rate reaching <strong>{currentConversionRate.toFixed(1)}%</strong>.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Cart abandonment</strong> has improved to <strong>35.2%</strong>, with "shipping costs" (32%) and "account creation requirements" (24%) being the primary reasons for abandonment. <strong>Loyalty Member Special</strong> campaign shows the highest conversion rate at <strong>5.6%</strong>.
                </p>
                <p>
                  <strong>Average order value</strong> is increasing at <strong style={{ color: COLORS.green }}>8.2%</strong>, while revenue per visit is up <strong style={{ color: COLORS.green }}>12.5%</strong>. <strong>Mobile users</strong> have a <strong>32%</strong> lower conversion rate than desktop users despite representing <strong>58%</strong> of traffic.
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
                {conversionRecommendations.slice(0, 3).map((rec, index) => (
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
        
        {/* Conversion Trend Chart and Channel Breakdown - Side by Side */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '1.5rem'
        }}>
          {/* Conversion Trend Chart */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Conversion Funnel
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
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="grid grid-cols-4 gap-2">
                {['Product View', 'Add to Cart', 'Checkout', 'Purchase'].map((stage, index) => (
                  <div 
                    key={index}
                    style={{
                      position: 'relative',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: '2rem'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute',
                      bottom: '2.5rem',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      color: COLORS.onyxMedium
                    }}>
                      {index === 0 ? '100%' : 
                       index === 1 ? `${conversionData.length > 0 ? 
                         Math.round(conversionData[conversionData.length - 1].visitToCartRate) : 0}%` : 
                       index === 2 ? `${conversionData.length > 0 ? 
                         Math.round(conversionData[conversionData.length - 1].cartToCheckoutRate) : 0}%` : 
                       `${conversionData.length > 0 ? 
                         Math.round(conversionData[conversionData.length - 1].checkoutToCompleteRate) : 0}%`}
                    </div>
                    <div style={{ 
                      width: '100%',
                      backgroundColor: COLORS.evergreen,
                      height: index === 0 ? '100%' : 
                               index === 1 ? `${conversionData.length > 0 ? 
                                 Math.round(conversionData[conversionData.length - 1].visitToCartRate) : 0}%` : 
                               index === 2 ? `${conversionData.length > 0 ? 
                                 Math.round(conversionData[conversionData.length - 1].cartToCheckoutRate) : 0}%` : 
                               `${conversionData.length > 0 ? 
                                 Math.round(conversionData[conversionData.length - 1].checkoutToCompleteRate) : 0}%`,
                      opacity: 1 - (index * 0.15),
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem'
                    }}></div>
                    <div style={{ 
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: COLORS.onyx,
                      marginTop: '0.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      padding: '0 0.25rem'
                    }}>
                      {stage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={conversionData}>
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
                  domain={[0, 10]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  labelFormatter={value => `Date: ${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversionRate" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: COLORS.evergreen }}
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
          
          {/* Conversion by Channel */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Conversion by Channel
            </h3>
            
            <div style={{ display: 'flex', height: 300 }}>
              <div style={{ width: '60%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelConversion}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {channelConversion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Conversion Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {channelConversion.map((channel, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: channel.color,
                      marginRight: '0.5rem',
                      borderRadius: '2px'
                    }}></div>
                    <div style={{ flex: 1, fontSize: '0.75rem', color: COLORS.onyx }}>
                      {channel.name} ({channel.value}%)
                    </div>
                  </div>
                ))}
                
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium
                }}>
                  <span style={{ fontWeight: 600, color: COLORS.onyx }}>Key Insight:</span> Email campaigns show 2.5x higher conversion rates than social media.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Campaign Conversion Performance - Updated to match the KPI card style */}
        <div className="mb-6">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Campaign Conversion Performance
          </h3>
          
          <div className="kpi-card-grid">
            {campaignConversion.map((campaign, index) => (
              <div key={index} className="kpi-card-wrapper">
                <div className="kpi-card">
                  <div className="kpi-card-content">
                    <div className="kpi-icon-container kpi-icon-bg-revenue">
                      <Percent size={20} color="white" />
                    </div>
                    <div className="kpi-text-container">
                      <p className="kpi-title">{campaign.name}</p>
                      <p className="kpi-value">{campaign.conversionRate}%</p>
                      <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem' }}>
                        AOV: ${campaign.AOV} • ROI: {campaign.ROI}%
                      </div>
                      <div className="kpi-change-container">
                        <span className={`kpi-change ${campaign.conversionRate > 3.5 ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                          {campaign.conversionRate > 3.5 ? (
                            <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                          ) : (
                            <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                          )}
                          {Math.abs(((campaign.conversionRate - 3.5) / 3.5) * 100).toFixed(1)}% vs avg
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
              Conversion Rate Over Time
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
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
                  domain={[0, dataMax => Math.max(5, dataMax * 1.1)]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, 'Conversion Rate']}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversionRate" 
                  stroke={COLORS.evergreen} 
                  fillOpacity={1}
                  fill="url(#colorConversion)" 
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
              Average Order Value Trend
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={[
                  { month: 'May', value: 142, target: 140 },
                  { month: 'Jun', value: 145, target: 145 },
                  { month: 'Jul', value: 148, target: 150 },
                  { month: 'Aug', value: 152, target: 155 },
                  { month: 'Sep', value: 158, target: 160 },
                  { month: 'Oct', value: 164, target: 165 }
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
                  domain={[140, 170]}
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip 
                  formatter={value => [`$${value}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  name="Actual AOV" 
                  dataKey="value" 
                  stroke={COLORS.evergreen} 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Target AOV" 
                  dataKey="target" 
                  stroke="#999" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
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
              Cart Abandonment Reasons
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={abandonmentReasons}
                    layout="vertical"
                    margin={{ left: 150 }}
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
                      width={140}
                    />
                    <Tooltip 
                      formatter={value => [`${value}%`, 'Percentage']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#e74c3c" 
                      barSize={20} 
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
              
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Key Insights:
                  </h4>
                  <ul style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Shipping costs remain the top abandonment reason (32%). Consider implementing a free shipping threshold.</li>
                    <li style={{ marginBottom: '0.5rem' }}>24% of customers abandon due to account creation requirements. Implementing guest checkout could reduce this significantly.</li>
                    <li>Payment issues (18%) suggest potential improvements in the payment process or adding more payment options.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Cart Recovery Rate:
                  </h4>
                  <div className="flex gap-4 items-center">
                    <div style={{ 
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `conic-gradient(${COLORS.evergreen} 0% 12%, #f3f4f6 12% 100%)`,
                      position: 'relative'
                    }}>
                      <div style={{ 
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: COLORS.onyx
                      }}>
                        12%
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Current recovery rate is <span style={{ fontWeight: 600, color: COLORS.onyx }}>12%</span></p>
                      <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Industry average: <span style={{ fontWeight: 500 }}>10.7%</span></p>
                    </div>
                  </div>
                </div>
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
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Conversion by Device Type
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { device: 'Desktop', conversion: 4.8, benchmark: 4.2 },
                  { device: 'Mobile', conversion: 2.9, benchmark: 3.1 },
                  { device: 'Tablet', conversion: 3.6, benchmark: 3.5 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="device" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 6]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, '']}
                />
                <Legend />
                <Bar name="Your Conversion Rate" dataKey="conversion" fill={COLORS.evergreen} barSize={40} />
                <Bar name="Industry Benchmark" dataKey="benchmark" fill="#d1d5db" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: COLORS.onyxMedium
            }}>
              <p style={{ fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Insight:</p>
              <p>Mobile conversion rate (2.9%) is significantly lower than desktop (4.8%), despite mobile accounting for 58% of traffic. This represents a major opportunity for improvement.</p>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Conversion by Customer Segment
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={[
                  { segment: 'New Visitors', conversion: 2.3, aov: 125 },
                  { segment: 'Returning Visitors', conversion: 4.1, aov: 156 },
                  { segment: 'Loyalty Members', conversion: 7.8, aov: 188 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="segment" 
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
                  tickFormatter={value => `${value}%`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 200]}
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'conversion') return [`${value}%`, 'Conversion Rate'];
                    return [`$${value}`, 'Avg. Order Value'];
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  name="Conversion Rate" 
                  dataKey="conversion" 
                  fill={COLORS.evergreen} 
                  barSize={30} 
                />
                <Bar 
                  yAxisId="right"
                  name="Avg. Order Value" 
                  dataKey="aov" 
                  fill="#3498db" 
                  barSize={30} 
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: COLORS.onyxMedium
            }}>
              <p style={{ fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>Key Insight:</p>
              <p>Loyalty members convert at 3.4x the rate of new visitors and spend 50% more per order. Focus on converting more customers to loyalty program membership for significant gains.</p>
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
              Product Conversion Funnel Analysis
            </h3>
            
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: COLORS.onyx }}>Product</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Visit-to-Cart</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Cart-to-Checkout</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Checkout-to-Complete</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: COLORS.onyx }}>Abandon Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {productConversion.map((product, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>{product.name}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>{product.visitToCart}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>{product.cartToCheckout}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.onyx }}>{product.checkoutToComplete}%</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: product.abandonRate < 35 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                          color: product.abandonRate < 35 ? COLORS.green : COLORS.red,
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}>
                          {product.abandonRate}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div style={{ 
                padding: '0.75rem',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${COLORS.green}`
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.green, marginBottom: '0.5rem' }}>
                  Top Performer: Steens Mountain™ Fleece
                </h4>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Highest visit-to-cart rate (32.6%) and lowest abandon rate (28.7%). Product page has strong visuals, detailed sizing guide, and customer reviews prominently displayed.
                </p>
              </div>
              
              <div style={{ 
                padding: '0.75rem',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${COLORS.red}`
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.red, marginBottom: '0.5rem' }}>
                  Improvement Opportunity: Bugaboo™ Winter Pants
                </h4>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Lowest visit-to-cart rate (22.8%) and highest abandon rate (41.5%). Sizing concerns and limited product images appear to be contributing factors based on customer feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Recommendations tab content
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
            Conversion Rate Optimization Opportunities
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
            Based on your conversion data, Marigold AI has identified several high-impact opportunities to optimize the customer journey and increase conversion rates. Implementing these recommendations could increase revenue by an estimated 18-22%.
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem',
        marginBottom: '1.5rem' 
      }}>
        {conversionRecommendations.map((recommendation, index) => (
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

export default ConversionAnalyticsContent;
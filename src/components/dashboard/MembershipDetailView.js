// src/components/dashboard/MembershipDetailView.js
import React, { useEffect, useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  X, ChevronRight, TrendingUp, Users, Award, DollarSign, 
  ArrowUpRight, Zap, Check, Filter, Download, Maximize, HelpCircle
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { 
  modalOverlayStyle, 
  modalHeaderStyle, 
  modalHeaderContentStyle, 
  closeButtonStyle,
  tabContainerStyle,
  tabContentStyle,
  tabButtonStyle,
  contentAreaStyle,
  contentWrapperStyle,
  cardStyle
} from '../../styles/ProgramDetailStyles';

const MembershipDetailView = ({ 
  data, 
  isOpen, 
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const COLORS_ARRAY = ['#2196F3', '#4CAF50', '#FFC107'];

  // Animation effect - matching KPI modal exactly
  useEffect(() => {
    if (isOpen) {
      // Reset closing state when opening
      setIsClosing(false);
      // Reset active tab and filter state
      setActiveTab('overview');
      setFilterOpen(false);
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handle close with animation - matching KPI modal exactly
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 100);
    }, 200);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        console.log('Escape key pressed, closing modal');
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  // Additional made-up data for the expanded view charts
  const tierGrowthData = [
    { month: 'Jun', explorer: 62, trailblazer: 23, summit: 8 },
    { month: 'Jul', explorer: 63, trailblazer: 23.5, summit: 8.5 },
    { month: 'Aug', explorer: 64, trailblazer: 24, summit: 9 },
    { month: 'Sep', explorer: 64.5, trailblazer: 24.5, summit: 9.5 },
    { month: 'Oct', explorer: 65, trailblazer: 25, summit: 10 }
  ];
  
  const tierSpendingData = [
    { name: 'Explorer', avgSpend: 120, frequency: 2.4 },
    { name: 'Trailblazer', avgSpend: 245, frequency: 3.8 },
    { name: 'Summit', avgSpend: 480, frequency: 5.2 }
  ];
  
  const tierRetentionData = [
    { name: 'Explorer', retention: 68 },
    { name: 'Trailblazer', retention: 82 },
    { name: 'Summit', retention: 94 }
  ];

  // List of recommendations for the recommendations tab
  const membershipRecommendations = [
    {
      id: 1,
      title: "Explorer to Trailblazer Conversion Campaign",
      description: "Create a targeted email campaign for Explorer members who are within 25% of the threshold for Trailblazer status. Offer a limited-time 2x points promotion to incentivize additional purchases needed to reach the next tier.",
      impact: "high",
      difficulty: "medium",
      tools: ["Marigold Messaging", "Marigold Loyalty"]
    },
    {
      id: 2,
      title: "Summit Tier VIP Program",
      description: "Develop an exclusive VIP program within the Summit tier for the top 20% of spenders. Include benefits like personal shopping consultations, first access to limited releases, and custom-made products. This will increase spend from your highest-value customers.",
      impact: "high",
      difficulty: "medium",
      tools: ["Marigold Loyalty", "Marigold Analytics"]
    },
    {
      id: 3,
      title: "Loyalty Point Acceleration Events",
      description: "Implement monthly double-points events specifically for Explorer members who have shown engagement with the program but have not yet reached Trailblazer status. Focus on product categories with higher margins to maintain profitability.",
      impact: "medium",
      difficulty: "low",
      tools: ["Marigold Messaging", "Marigold Loyalty"]
    },
    {
      id: 4,
      title: "Explorer Tier Re-engagement Campaign",
      description: "Create a re-engagement series targeting Explorer members who haven't made a purchase in the last 90 days. Include personalized product recommendations based on previous browsing and purchase history along with a modest discount.",
      impact: "medium",
      difficulty: "low",
      tools: ["Marigold Messaging", "Marigold Analytics"]
    }
  ];

  // Calculated insights based on the data
  const totalMembers = data ? data.reduce((sum, item) => sum + item.value, 0) : 0;
  const explorerPercentage = data ? data.find(item => item.name === 'Explorer')?.value || 0 : 0;
  const trailblazerPercentage = data ? data.find(item => item.name === 'Trailblazer')?.value || 0 : 0;
  const summitPercentage = data ? data.find(item => item.name === 'Summit')?.value || 0 : 0;
  
  const revenueContribution = {
    explorer: explorerPercentage * 120 / (explorerPercentage * 120 + trailblazerPercentage * 245 + summitPercentage * 480) * 100,
    trailblazer: trailblazerPercentage * 245 / (explorerPercentage * 120 + trailblazerPercentage * 245 + summitPercentage * 480) * 100,
    summit: summitPercentage * 480 / (explorerPercentage * 120 + trailblazerPercentage * 245 + summitPercentage * 480) * 100
  };

  // Function to view recommendation details
  const handleViewRecommendationDetails = (id) => {
    setActiveTab('recommendations');
  };

  // Custom label formatter for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    // Position labels further from the pie
    const radius = outerRadius * 1.2;
    
    // Calculate label position
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#333333" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontWeight: 600, fontSize: '12px' }}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch(activeTab) {
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

  // Overview tab content
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary - Updated to horizontal layout matching dashboard style */}
        <div className="kpi-card-grid" style={{ marginBottom: '1.5rem' }}>
          {/* Explorer Tier KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <Users size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Explorer Tier</p>
                  <p className="kpi-value">{explorerPercentage}%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      4.8% growth
                    </span>
                  </div>
                  <p className="kpi-secondary-text">vs last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trailblazer Tier KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <Award size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Trailblazer Tier</p>
                  <p className="kpi-value">{trailblazerPercentage}%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      8.7% growth
                    </span>
                  </div>
                  <p className="kpi-secondary-text">vs last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summit Tier KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <DollarSign size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Summit Tier</p>
                  <p className="kpi-value">{summitPercentage}%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      12.4% growth
                    </span>
                  </div>
                  <p className="kpi-secondary-text">vs last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Contribution KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <TrendingUp size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Summit Revenue</p>
                  <p className="kpi-value">{Math.round(revenueContribution.summit)}%</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      3.8x higher LTV
                    </span>
                  </div>
                  <p className="kpi-secondary-text">vs Explorer tier</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Members KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-customers">
                  <Users size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Total Members</p>
                  <p className="kpi-value">104.6K</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      5.7% growth
                    </span>
                  </div>
                  <p className="kpi-secondary-text">vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations Section */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
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
            Membership Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Outdoors Sportswear</strong> has a tiered loyalty program with <strong>Explorer</strong> members representing {explorerPercentage}% of members, <strong>Trailblazer</strong> at {trailblazerPercentage}%, and <strong>Summit</strong> at {summitPercentage}%.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Summit tier</strong> members contribute disproportionately to revenue at <strong>{Math.round(revenueContribution.summit)}%</strong> of total loyalty revenue despite being only {summitPercentage}% of members. They have <strong>3.8x higher lifetime value</strong> than Explorer members.
                </p>
                <p>
                  <strong>Retention rates</strong> vary significantly by tier with Summit at <strong>{tierRetentionData.find(t => t.name === 'Summit')?.retention}%</strong>, Trailblazer at <strong>{tierRetentionData.find(t => t.name === 'Trailblazer')?.retention}%</strong>, and Explorer at <strong>{tierRetentionData.find(t => t.name === 'Explorer')?.retention}%</strong>. The largest growth opportunity is converting Explorer members to Trailblazer, which could increase revenue per member by over 100%.
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
                {membershipRecommendations.slice(0, 3).map((rec, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      borderLeft: `3px solid ${rec.impact === 'high' ? COLORS.green : COLORS.blue}`,
                      cursor: 'pointer'
                    }}
                    onClick={() => setActiveTab('recommendations')}
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
                        e.stopPropagation();
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
                  onClick={() => setActiveTab('recommendations')}
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
        
        {/* Membership Distribution and Tier Growth - Side by Side */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '1.5rem'
        }}>
          {/* Membership Distribution Chart */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Membership Distribution
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS_ARRAY[index % COLORS_ARRAY.length]} 
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Membership Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Tier Growth Trend */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Membership Tier Growth Trend
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tierGrowthData}>
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
                  domain={[0, 70]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, '']}
                  labelFormatter={value => `Month: ${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="explorer" 
                  name="Explorer" 
                  stroke={COLORS_ARRAY[0]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="trailblazer" 
                  name="Trailblazer" 
                  stroke={COLORS_ARRAY[1]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="summit" 
                  name="Summit" 
                  stroke={COLORS_ARRAY[2]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Average Spending by Tier */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Average Spending by Tier
          </h3>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={tierSpendingData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                axisLine={false}
                tickLine={false}
                domain={[0, 500]}
                tickFormatter={value => `$${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                axisLine={false}
                tickLine={false}
                domain={[0, 6]}
                tickFormatter={value => `${value}/yr`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'avgSpend') return [`$${value}`, 'Avg. Order Value'];
                  return [`${value}/year`, 'Purchase Frequency'];
                }}
              />
              <Bar 
                yAxisId="left"
                dataKey="avgSpend" 
                name="Avg. Order Value" 
                fill={COLORS.evergreen} 
                barSize={40} 
              />
              <Bar 
                yAxisId="right"
                dataKey="frequency" 
                name="Purchase Frequency" 
                fill={COLORS.blue} 
                barSize={40} 
              />
            </BarChart>
          </ResponsiveContainer>
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
              Membership Growth Over Time
            </h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={tierGrowthData}>
                <defs>
                  <linearGradient id="colorExplorer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS_ARRAY[0]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS_ARRAY[0]} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorTrailblazer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS_ARRAY[1]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS_ARRAY[1]} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSummit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS_ARRAY[2]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS_ARRAY[2]} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
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
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, '']}
                  labelFormatter={value => `Month: ${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="explorer" 
                  stackId="1"
                  name="Explorer" 
                  stroke={COLORS_ARRAY[0]} 
                  fill="url(#colorExplorer)"
                />
                <Area 
                  type="monotone" 
                  dataKey="trailblazer" 
                  stackId="1"
                  name="Trailblazer" 
                  stroke={COLORS_ARRAY[1]} 
                  fill="url(#colorTrailblazer)"
                />
                <Area 
                  type="monotone" 
                  dataKey="summit" 
                  stackId="1"
                  name="Summit" 
                  stroke={COLORS_ARRAY[2]} 
                  fill="url(#colorSummit)"
                />
              </AreaChart>
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
              Retention Rates by Tier
            </h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tierRetentionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={value => `${value}%`}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, 'Retention Rate']}
                />
                <Bar 
                  dataKey="retention" 
                  fill={COLORS.evergreen} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Breakdown tab content
  const renderBreakdownTab = () => {
    const membershipBreakdown = [
      { tier: 'Explorer', members: 67860, avgSpend: 120, ltv: 288, retention: 68 },
      { tier: 'Trailblazer', members: 26150, avgSpend: 245, ltv: 686, retention: 82 },
      { tier: 'Summit', members: 10460, avgSpend: 480, ltv: 1152, retention: 94 }
    ];
    
    return (
      <div>
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Membership Tier Breakdown
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Tier</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Members</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Avg Spend</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>LTV</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium }}>Retention</th>
                </tr>
              </thead>
              <tbody>
                {membershipBreakdown.map((tier, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: COLORS.onyx, fontWeight: 600 }}>{tier.tier}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: COLORS.onyx, textAlign: 'right' }}>{tier.members.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: COLORS.onyx, textAlign: 'right' }}>${tier.avgSpend}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, textAlign: 'right' }}>${tier.ltv}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: tier.retention >= 80 ? COLORS.green : tier.retention >= 70 ? COLORS.yellow : COLORS.red,
                        backgroundColor: tier.retention >= 80 ? 'rgba(76, 175, 80, 0.1)' : tier.retention >= 70 ? 'rgba(255, 193, 7, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        {tier.retention}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Loyalty Program Improvement Opportunities
            </h3>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
              Based on your membership data, we've identified several key opportunities to optimize your loyalty program tiers, increase engagement, and drive revenue growth through targeted campaigns and strategic tier enhancements.
            </p>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          marginBottom: '1.5rem' 
        }}>
          {membershipRecommendations.map((recommendation, index) => (
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
                  Recommended Tools:
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

  // Ensure the modal isn't rendered if not open
  if (!isOpen) return null;

  // If data is not available, don't render
  if (!data) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f7f8',
        zIndex: 101,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: isVisible && !isClosing ? 1 : 0,
        transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: isVisible && !isClosing 
            ? 'translateY(0) scale(1)' 
            : isClosing 
              ? 'translateY(100%) scale(0.98)'
              : 'translateY(100%) scale(0.98)',
          transition: isClosing 
            ? 'all 0.3s cubic-bezier(0.4, 0, 1, 1)'
            : 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center bottom'
        }}
      >
        {/* Modal Header */}
        <div style={modalHeaderStyle()}>
          <div style={modalHeaderContentStyle}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
                Membership Analysis
              </h2>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                Last 30 Days • Outdoors Sportswear
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: filterOpen ? 'white' : COLORS.onyxMedium,
                  backgroundColor: filterOpen ? COLORS.evergreen : 'transparent',
                  border: `1px solid ${filterOpen ? COLORS.evergreen : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '0.375rem',
                  marginRight: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Filter size={16} style={{ marginRight: '0.5rem' }} />
                Filters
              </button>
              
              <button 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: COLORS.onyxMedium,
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '0.375rem',
                  marginRight: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={16} style={{ marginRight: '0.5rem' }} />
                Export
              </button>
              
              <button onClick={handleClose} style={closeButtonStyle}>
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Filter Panel - Only visible when filters are open */}
        {filterOpen && (
          <div style={{ 
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              maxWidth: '80rem',
              width: '100%',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              display: 'flex',
              gap: '2rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  fontWeight: 500, 
                  color: COLORS.onyxMedium,
                  marginBottom: '0.5rem'
                }}>
                  Date Range
                </label>
                <select 
                  style={{ 
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '0.875rem',
                    minWidth: '180px'
                  }}
                >
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_quarter">Last Quarter</option>
                  <option value="ytd">Year to Date</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  fontWeight: 500, 
                  color: COLORS.onyxMedium,
                  marginBottom: '0.5rem'
                }}>
                  Segment
                </label>
                <select 
                  style={{ 
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '0.875rem',
                    minWidth: '180px'
                  }}
                >
                  <option value="all">All Tiers</option>
                  <option value="explorer">Explorer Only</option>
                  <option value="trailblazer">Trailblazer Only</option>
                  <option value="summit">Summit Only</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div style={tabContainerStyle}>
          <div style={tabContentStyle}>
            <button onClick={() => setActiveTab('overview')} style={tabButtonStyle(activeTab === 'overview')}>
              Overview
            </button>
            
            <button onClick={() => setActiveTab('trends')} style={tabButtonStyle(activeTab === 'trends')}>
              Trends
            </button>
            
            <button onClick={() => setActiveTab('breakdown')} style={tabButtonStyle(activeTab === 'breakdown')}>
              Breakdown
            </button>
            
            <button onClick={() => setActiveTab('recommendations')} style={tabButtonStyle(activeTab === 'recommendations')}>
              Recommendations
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0.5rem',
                backgroundColor: COLORS.evergreen,
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {membershipRecommendations.length}
              </span>
            </button>
          </div>
        </div>
        
        {/* Modal Body - Dynamic content based on active tab */}
        <div style={contentAreaStyle}>
          <div style={contentWrapperStyle}>
            {renderTabContent()}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white'
        }}>
          <button 
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.15)',
              color: COLORS.onyxMedium,
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={handleClose}
          >
            Close
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.375rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(0,0,0,0.15)',
                color: COLORS.onyxMedium,
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <HelpCircle size={16} style={{ marginRight: '0.5rem' }} />
              Help
            </button>
            
            <button 
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.375rem',
                backgroundColor: COLORS.evergreen,
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Maximize size={16} style={{ marginRight: '0.5rem' }} />
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetailView;
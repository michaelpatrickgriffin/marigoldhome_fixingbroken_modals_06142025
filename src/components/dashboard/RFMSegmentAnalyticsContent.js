// src/components/dashboard/RFMSegmentAnalyticsContent.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ShoppingBag, 
  Zap, ChevronRight, Check, Users, Calendar, Award, Sparkles, RefreshCw,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import EnhancedRecommendationCard from '../common/EnhancedRecommendationCard';

// ===== IMPORT CENTRALIZED RFM DATA =====
import { getSegmentData } from '../../data/RFMAnalyticsData';

// This component renders detailed analytics for a specific RFM segment
const RFMSegmentAnalyticsContent = ({ 
  activeTab, 
  onTabChange = null, 
  segment,
  periodComparison = 'last_month',
  granularity = 'daily',
  onImplementRecommendation = null
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab || 'overview');
  
  // ✅ UPDATED: Session-only state for recommendation tracking (matches main dashboard)
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  const [archivedRecommendations, setArchivedRecommendations] = useState(new Set());
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  
  // Update current tab when activeTab prop changes
  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);
  
  // Function to update tab both locally and in parent
  const updateTab = (tabName) => {
    setCurrentTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };
  
  // Get segment-specific data from centralized data source
  const segmentData = getSegmentData(segment || "Champions");
  
  // ✅ ENHANCED: Handle recommendation actions with state management
  const handleRecommendationImplement = (recommendation) => {
    console.log(`Implementing recommendation ${recommendation.id}`);
    if (onImplementRecommendation) {
      onImplementRecommendation(recommendation);
    }
    const newImplemented = new Set([...implementedRecommendations, recommendation.id]);
    setImplementedRecommendations(newImplemented);
  };
  
  const handleRecommendationModify = (recommendation) => {
    console.log(`Modifying recommendation ${recommendation.id}`);
    if (onImplementRecommendation) {
      onImplementRecommendation(recommendation);
    }
    const newImplemented = new Set([...implementedRecommendations, recommendation.id]);
    setImplementedRecommendations(newImplemented);
  };
  
  const handleRecommendationReject = (recommendation) => {
    console.log(`Rejecting recommendation ${recommendation.id}`);
    const newRejected = new Set([...rejectedRecommendations, recommendation.id]);
    setRejectedRecommendations(newRejected);
  };
  
  const handleRecommendationArchive = (recommendation) => {
    console.log(`Archiving recommendation ${recommendation.id}`);
    const newArchived = new Set([...archivedRecommendations, recommendation.id]);
    setArchivedRecommendations(newArchived);
  };
  
  const handleToggleExpand = (recommendationId) => {
    setExpandedRecommendation(expandedRecommendation === recommendationId ? null : recommendationId);
  };
  
  // ✅ NEW: Reset all recommendations to initial state (matches main dashboard)
  const handleResetRecommendations = () => {
    setImplementedRecommendations(new Set());
    setRejectedRecommendations(new Set());
    setArchivedRecommendations(new Set());
    setExpandedRecommendation(null);
    setBulkActionLoading(false);
  };

  // ✅ NEW: Bulk actions matching main dashboard functionality
  const handleBulkAction = async (action) => {
    setBulkActionLoading(true);
    const activeRecommendations = segmentData.recommendedActions.filter(
      rec => !implementedRecommendations.has(rec.id) && 
             !rejectedRecommendations.has(rec.id) && 
             !archivedRecommendations.has(rec.id)
    );

    for (const rec of activeRecommendations) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      if (action === 'implement') {
        const newImplemented = new Set([...implementedRecommendations, rec.id]);
        setImplementedRecommendations(newImplemented);
      } else if (action === 'reject') {
        const newRejected = new Set([...rejectedRecommendations, rec.id]);
        setRejectedRecommendations(newRejected);
      }
    }
    
    setBulkActionLoading(false);
  };
  
  // View recommendation details
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
  
  // Overview tab content with KPI cards and key metrics
  const renderOverviewTab = () => {
    return (
      <div>
        {/* KPI Summary Cards */}
        <div className="kpi-card-grid">
          {/* ✅ UPDATED: Customer Count KPI with special logic for At Risk segment */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-audience">
                  <Users size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Customers</p>
                  <p className="kpi-value">{segmentData.metrics.customerCount}</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${
                      // ✅ NEW: Special logic for At Risk segment - invert the color
                      segmentData.title === 'At Risk' 
                        ? (parseFloat(segmentData.metrics.growth) >= 0 ? 'kpi-change-negative' : 'kpi-change-positive')
                        : (parseFloat(segmentData.metrics.growth) >= 0 ? 'kpi-change-positive' : 'kpi-change-negative')
                    }`}>
                      {parseFloat(segmentData.metrics.growth) >= 0 ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {segmentData.metrics.growth} vs prev period
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLV KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-revenue">
                  <DollarSign size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Customer Lifetime Value</p>
                  <p className="kpi-value">{segmentData.metrics.avgSpend}</p>
                  <div className="kpi-change-container">
                    <span className="kpi-change kpi-change-positive">
                      <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      {segmentData.metrics.potentialGrowth} potential
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retention Rate KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-engagement">
                  <Calendar size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">Retention Rate</p>
                  <p className="kpi-value">{segmentData.metrics.retention}</p>
                  <div className="kpi-change-container">
                    <span className={`kpi-change ${segmentData.metrics.retentionTrend.startsWith('+') ? 'kpi-change-positive' : 'kpi-change-negative'}`}>
                      {segmentData.metrics.retentionTrend.startsWith('+') ? (
                        <ArrowUpRight size={16} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ marginRight: '0.25rem' }} />
                      )}
                      {segmentData.metrics.retentionTrend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RFM Score KPI */}
          <div className="kpi-card-wrapper">
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className="kpi-icon-container kpi-icon-bg-conversion">
                  <Award size={20} color="white" />
                </div>
                <div className="kpi-text-container">
                  <p className="kpi-title">RFM Score</p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div>
                      <p className="kpi-title" style={{ fontSize: '0.7rem', margin: 0 }}>R</p>
                      <p className="kpi-value" style={{ fontSize: '1.2rem' }}>{segmentData.metrics.recencyScore}</p>
                    </div>
                    <div>
                      <p className="kpi-title" style={{ fontSize: '0.7rem', margin: 0 }}>F</p>
                      <p className="kpi-value" style={{ fontSize: '1.2rem' }}>{segmentData.metrics.frequencyScore}</p>
                    </div>
                    <div>
                      <p className="kpi-title" style={{ fontSize: '0.7rem', margin: 0 }}>M</p>
                      <p className="kpi-value" style={{ fontSize: '1.2rem' }}>{segmentData.metrics.monetaryScore}</p>
                    </div>
                  </div>
                  <p className="kpi-secondary-text">
                    Avg. total score: {((parseFloat(segmentData.metrics.recencyScore) + 
                      parseFloat(segmentData.metrics.frequencyScore) + 
                      parseFloat(segmentData.metrics.monetaryScore)) / 3).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segment Insights Section */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderLeft: `4px solid ${segmentData.color}`
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: COLORS.onyx, 
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Zap size={20} color={segmentData.color} style={{ marginRight: '0.625rem' }} />
            {segmentData.title} Segment Insights
          </h3>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Left column - Insights text */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>{segmentData.title}</strong> customers are {segmentData.description}. They currently make up <strong>{segmentData.distributionPercentage}%</strong> of your customer base with approximately <strong>{segmentData.metrics.customerCount}</strong> customers.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  The average customer lifetime value for this segment is <strong>{segmentData.metrics.avgSpend}</strong>, with a retention rate of <strong>{segmentData.metrics.retention}</strong>. This segment has shown a growth of <strong>{segmentData.metrics.growth}</strong> compared to the previous period.
                </p>
                <p>
                  Based on RFM analysis, this segment shows a <strong>recency score of {segmentData.metrics.recencyScore}</strong>, <strong>frequency score of {segmentData.metrics.frequencyScore}</strong>, and <strong>monetary score of {segmentData.metrics.monetaryScore}</strong>. The key focus area should be on {segmentData.keyFocusArea}.
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
                {segmentData.recommendedActions.slice(0, 3).map((rec, index) => (
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
                        {rec.expectedLift}
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
        
        {/* Purchase Behavior and Retention Charts */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Purchase Behavior Chart */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Purchase Behavior
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentData.purchaseHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 5]}
                  tickFormatter={value => `${value}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: COLORS.onyxMedium }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 1000]}
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'purchases') return [`${value}`, 'Avg. Purchases'];
                    if (name === 'avgValue') return [`$${value}`, 'Avg. Order Value'];
                    return [value, name];
                  }}
                />
                <Bar yAxisId="left" dataKey="purchases" fill={segmentData.color} radius={[4, 4, 0, 0]} name="Avg. Purchases" />
                <Bar yAxisId="right" dataKey="avgValue" fill={COLORS.blue} radius={[4, 4, 0, 0]} name="Avg. Order Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Retention Trend Chart */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Retention Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={segmentData.retentionTrend}>
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
                  domain={[0, 100]}
                  tickFormatter={value => `${value}%`}
                />
                <Tooltip 
                  formatter={value => [`${value}%`, 'Retention Rate']}
                />
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={segmentData.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={segmentData.color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke={segmentData.color} 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRetention)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Category Purchase Distribution
          </h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical" 
                data={segmentData.categoryDistribution}
                margin={{ left: 60, right: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={value => `${value}%`} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  width={120}
                />
                <Tooltip formatter={value => [`${value}%`, 'Purchase Share']} />
                <Bar 
                  dataKey="value" 
                  fill={segmentData.color} 
                  radius={[0, 4, 4, 0]}
                  label={(props) => {
                    const { x, y, width, value } = props;
                    return (
                      <text 
                        x={x + width + 5} 
                        y={y + 15} 
                        fontSize={12} 
                        fill="#666" 
                        textAnchor="start"
                      >
                        {`${value}%`}
                      </text>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  // Trends tab content
  const renderTrendsTab = () => {
    return (
      <div>
        {/* RFM Score Trend */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            RFM Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={segmentData.rfmTrend}>
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
                domain={[0, 5]}
              />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="recency" 
                name="Recency Score" 
                stroke="#2196F3" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                name="Frequency Score" 
                stroke="#9C27B0" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="monetary" 
                name="Monetary Score" 
                stroke="#4CAF50" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Customer Count & CLV Trend */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            flex: 1,
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Customer Count Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={segmentData.customerCountTrend}>
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
                <Tooltip formatter={value => [value, 'Customers']} />
                <defs>
                  <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={segmentData.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={segmentData.color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke={segmentData.color} 
                  fillOpacity={1}
                  fill="url(#colorCustomers)"
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
              Customer Lifetime Value Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={segmentData.clvTrend}>
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
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip formatter={value => [`$${value}`, 'Avg CLV']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Transition Analysis */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Segment Transition Analysis
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
            This chart shows how customers from this segment moved to other segments over time.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={segmentData.segmentTransition} 
              stackOffset="expand"
              barCategoryGap={20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={value => `${Math.round(value * 100)}%`} />
              <Tooltip formatter={(value, name) => [`${Math.round(value * 100)}%`, name]} />
              <Legend />
              <Bar dataKey="champions" stackId="a" name="Champions" fill="#4CAF50" />
              <Bar dataKey="loyal" stackId="a" name="Loyal Customers" fill="#2196F3" />
              <Bar dataKey="potential" stackId="a" name="Potential Loyalists" fill="#9C27B0" />
              <Bar dataKey="atrisk" stackId="a" name="At Risk" fill="#FF9800" />
              <Bar dataKey="cantlose" stackId="a" name="Can't Lose" fill="#F44336" />
              <Bar dataKey="churn" stackId="a" name="Churned" fill="#9E9E9E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  // Breakdown tab content
  const renderBreakdownTab = () => {
    return (
      <div>
        {/* Demographics Breakdown */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Demographics Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
            {/* Age Distribution */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
                Age Distribution
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={segmentData.demographics.age}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {segmentData.demographics.age.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Gender Distribution */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
                Gender Distribution
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={segmentData.demographics.gender}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {segmentData.demographics.gender.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Purchase Channel Breakdown */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Purchase Channel Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={segmentData.purchaseChannels}
              layout="vertical"
              margin={{ left: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={value => `${value}%`} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={120}
              />
              <Tooltip formatter={value => [`${value}%`, 'Channel Share']} />
              <Bar 
                dataKey="value" 
                fill={segmentData.color} 
                radius={[0, 4, 4, 0]}
                label={(props) => {
                  const { x, y, width, value } = props;
                  return (
                    <text 
                      x={x + width + 5} 
                      y={y + 15} 
                      fontSize={12} 
                      fill="#666" 
                      textAnchor="start"
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top Products Table */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Top Products Purchased
          </h3>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyxMedium 
                }}>
                  Product
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyxMedium 
                }}>
                  Revenue
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyxMedium 
                }}>
                  Units
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: COLORS.onyxMedium 
                }}>
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {segmentData.topProducts.map((product, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ 
                    padding: '0.75rem', 
                    fontSize: '0.875rem', 
                    color: COLORS.onyx 
                  }}>
                    {product.name}
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '0.75rem', 
                    fontSize: '0.875rem', 
                    fontWeight: 500, 
                    color: COLORS.onyx 
                  }}>
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '0.75rem', 
                    fontSize: '0.875rem', 
                    color: COLORS.onyx 
                  }}>
                    {product.units.toLocaleString()}
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '0.75rem', 
                    fontSize: '0.875rem', 
                    color: COLORS.onyx 
                  }}>
                    {product.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // ✅ ENHANCED: Recommendations tab with bulk actions matching main dashboard
  const renderRecommendationsTab = () => {
    // Calculate metrics for the summary panel
    const activeRecommendations = segmentData.recommendedActions.filter(rec => 
      !implementedRecommendations.has(rec.id) && 
      !rejectedRecommendations.has(rec.id) && 
      !archivedRecommendations.has(rec.id)
    );
    
    const implementedCount = implementedRecommendations.size;
    const rejectedCount = rejectedRecommendations.size;
    
    // Calculate total potential revenue - use the main punch card recommendation if available
    const totalPotentialRevenue = (() => {
      // For At Risk segment, use the specific punch card recommendation revenue
      if (segmentData.title === 'At Risk') {
        return 125000; // $125K from the main At Risk punch card recommendation
      }
      // For other segments, sum up estimated revenue from recommendations
      return activeRecommendations.reduce((sum, rec) => {
        // Try to extract dollar amounts from expectedLift
        const dollarMatch = rec.expectedLift?.match(/\+?\$(\d+(?:\.\d+)?)([KM]?)/);
        if (dollarMatch) {
          let value = parseFloat(dollarMatch[1]);
          const unit = dollarMatch[2];
          if (unit === 'K') value *= 1000;
          if (unit === 'M') value *= 1000000;
          return sum + value;
        }
        return sum + 25000; // Default fallback for non-dollar recommendations
      }, 0);
    })();

    // Fix member impact calculation - don't multiply by 1000
    const totalMemberImpact = segmentData.metrics.customerCount ? 
      parseInt(segmentData.metrics.customerCount.replace(/[,K]/g, '')) : 25000;

    // Determine the description text based on segment
    const getRecommendationDescription = () => {
      if (segment && segment.toLowerCase() === 'at risk') {
        return "Based on RFM analysis, these recommendations are tailored to improve purchase Recency and Frequency, ultimately maximizing the value and retention of your at risk customers. Implementing these recommendations could increase Recency by as much as 60%, and Frequency by as much as 35% in the next 30 days.";
      } else {
        return `Based on RFM analysis, these recommendations are tailored to maximize the value and retention of your ${segmentData.title.toLowerCase()} customers. Implementing these strategies could increase customer lifetime value by an estimated ${segmentData.potentialLiftRange}.`;
      }
    };

    // Determine RFM health based on segment
    const getRFMHealth = () => {
      switch(segmentData.title) {
        case 'At Risk':
          return { label: 'Needs Attention', color: '#F59E0B' }; // Amber
        case "Can't Lose":
          return { label: 'Critical', color: '#EF4444' }; // Red
        case 'Potential Loyalists':
          return { label: 'Developing', color: '#3B82F6' }; // Blue
        case 'Loyal Customers':
          return { label: 'Good', color: '#10B981' }; // Green
        case 'Champions':
          return { label: 'Excellent', color: '#059669' }; // Dark green
        default:
          return { label: 'Good', color: '#10B981' };
      }
    };

    const rfmHealth = getRFMHealth();

    // Filter out archived recommendations for display
    const visibleRecommendations = segmentData.recommendedActions.filter(rec => 
      !archivedRecommendations.has(rec.id)
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* ✅ NEW: Segment Recommendations Summary Header matching main dashboard */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.05) 100%)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid rgba(26, 76, 73, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Sparkles size={24} style={{ color: COLORS.evergreen, marginRight: '0.75rem' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                  {segmentData.title} Segment Optimization
                </h3>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  AI-powered insights for {segmentData.title.toLowerCase()} customer segment enhancement
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.evergreen, marginBottom: '0.25rem' }}>
                  {activeRecommendations.length}
                </p>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Active Recommendations</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669', marginBottom: '0.25rem' }}>
                  ${totalPotentialRevenue.toLocaleString()}
                </p>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Revenue Potential</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.blue, marginBottom: '0.25rem' }}>
                  {totalMemberImpact.toLocaleString()}
                </p>
                <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>Members Affected</p>
              </div>
            </div>
          </div>

          {/* ✅ NEW: Bulk Actions matching main dashboard */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                Bulk Actions:
              </span>
              {activeRecommendations.length > 0 ? (
                <button
                  onClick={() => handleBulkAction('implement')}
                  disabled={bulkActionLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: '#059669',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: bulkActionLoading ? 'not-allowed' : 'pointer',
                    opacity: bulkActionLoading ? 0.7 : 1,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!bulkActionLoading) {
                      e.target.style.backgroundColor = '#047857';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!bulkActionLoading) {
                      e.target.style.backgroundColor = '#059669';
                    }
                  }}
                >
                  {bulkActionLoading ? (
                    <RefreshCw 
                      size={14} 
                      style={{ 
                        animation: 'spin 1s linear infinite',
                        transformOrigin: 'center'
                      }} 
                    />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  Implement All Recommendations ({activeRecommendations.length})
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, fontStyle: 'italic' }}>
                    All recommendations have been reviewed
                  </span>
                </div>
              )}
              
              {/* ✅ NEW: Reset Button matching main dashboard */}
              <button
                onClick={handleResetRecommendations}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: 'transparent',
                  color: COLORS.onyxMedium,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <RefreshCw size={14} />
                Reset
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              backgroundColor: 'rgba(255, 255, 255, 0.7)', 
              borderRadius: '0.375rem' 
            }}>
              <Award size={16} style={{ color: COLORS.evergreen }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium }}>
                RFM Health: 
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: rfmHealth.color }}>
                {rfmHealth.label}
              </span>
            </div>
          </div>

          {/* Progress Summary */}
          {(implementedCount > 0 || rejectedCount > 0) && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: COLORS.green }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                    {implementedCount} Implemented
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <XCircle size={16} style={{ color: COLORS.red }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                    {rejectedCount} Rejected
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={16} style={{ color: COLORS.yellow }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                    {activeRecommendations.length} Pending Review
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ 
          backgroundColor: 'rgba(26, 76, 73, 0.03)',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderLeft: `4px solid ${segmentData.color}`
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            {segmentData.title} Segment Recommendations
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
            {getRecommendationDescription()}
          </p>
        </div>
        
        {/* ✅ ENHANCED: Use unified recommendation cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {visibleRecommendations.map((recommendation) => (
            <EnhancedRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              isExpanded={expandedRecommendation === recommendation.id}
              onToggleExpand={handleToggleExpand}
              onImplement={handleRecommendationImplement}
              onModify={handleRecommendationModify}
              onReject={handleRecommendationReject}
              onArchive={handleRecommendationArchive}
              isImplemented={implementedRecommendations.has(recommendation.id)}
              isRejected={rejectedRecommendations.has(recommendation.id)}
              isArchived={archivedRecommendations.has(recommendation.id)}
              showActions={true}
              compact={false}
            />
          ))}
        </div>

        {/* ✅ ADD: CSS for spin animation */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  };
  
  return renderTabContent();
};

export default RFMSegmentAnalyticsContent;
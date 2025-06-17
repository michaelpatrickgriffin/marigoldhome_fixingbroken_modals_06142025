// src/components/dashboard/RFMDashboard.js - RESTORED ORIGINAL FUNCTIONALITY
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Star, Target, ShoppingBag, 
  Award, TrendingUp, AlertTriangle, Check, ChevronRight
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import RFMSegmentDetailManager from './RFMSegmentDetailManager';
import AIPromptBar from '../common/AIPromptBar';
import AIResponseModal from '../common/AIResponseModal';
import { getResponseGenerator } from './ResponseGenerators';
import { useCommonModals } from '../common/ModalManager';

// Import RFM data
import { 
  rfmKpiData, 
  segmentDistributionData, 
  customerValueData, 
  retentionRateData, 
  rfmInsightsData, 
  rfmRecommendations 
} from '../../data/RFMAnalyticsData';

// Dashboard card style that will be applied to all cards
const dashboardCardStyle = {
  background: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  border: 'none',
  position: 'relative',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 0
};

const dashboardCardHeaderStyle = {
  padding: '0.5rem 1rem',
  margin: 0,
  fontSize: '1rem',
  fontWeight: 600,
  color: 'rgba(0, 0, 0, 0.87)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  flexShrink: 0
};

const chartContainerStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  position: 'relative'
};

// RFM KPI Cards Component - RESTORED with better click handling
export const RFMKpiCards = ({ data, onSegmentClick }) => {
  const handleCardClick = (segmentTitle) => {
    console.log('KPI Card clicked:', segmentTitle);
    if (onSegmentClick && segmentTitle) {
      onSegmentClick(segmentTitle);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {data.map((kpi, index) => {
        const IconComponent = kpi.icon === 'Users' ? Users : 
                              kpi.icon === 'DollarSign' ? DollarSign : 
                              kpi.icon === 'Calendar' ? Calendar : 
                              kpi.icon === 'Star' ? Star : 
                              kpi.icon === 'Target' ? Target : 
                              kpi.icon === 'AlertTriangle' ? AlertTriangle : Award;
        
        return (
          <div 
            key={index} 
            className="w-full" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCardClick(kpi.title);
            }}
            style={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div className="kpi-card">
              <div className="kpi-card-content">
                <div className={`kpi-icon-container`} style={{ 
                  backgroundColor: kpi.iconBg || 'rgba(33, 150, 243, 0.15)', 
                  color: kpi.iconColor || '#2196F3',
                  alignSelf: 'flex-start' 
                }}>
                  <IconComponent size={20} color={kpi.iconColor || '#2196F3'} />
                </div>
                <div className="kpi-text-container" style={{ width: '100%' }}>
                  <p className="kpi-title">{kpi.title}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p className="kpi-value" style={{ marginBottom: '0' }}>{kpi.value}</p>
                    {kpi.change && (
                      <span className={`kpi-change ${kpi.changeColor === '#81C784' ? 'kpi-change-positive' : 'kpi-change-negative'}`} style={{ marginLeft: '0.5rem' }}>
                        {kpi.change}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.5rem' }}>
                    vs prev period
                  </div>
                  {kpi.secondaryText && (
                    <p className="kpi-secondary-text">
                      {kpi.secondaryText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// RFM Segment Distribution Chart - RESTORED with click handling
export const RFMSegmentChart = ({ data, onSegmentClick }) => {
  const COLORS_ARRAY = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#F44336'];

  const handlePieClick = (entry) => {
    console.log('Pie chart clicked:', entry);
    if (onSegmentClick && entry.name) {
      onSegmentClick(entry.name);
    }
  };

  const handleLegendClick = (value) => {
    console.log('Legend clicked:', value);
    if (onSegmentClick && value) {
      onSegmentClick(value);
    }
  };

  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Customer Segment Distribution
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="45%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
              label={(entry) => `${entry.value}%`}
              onClick={handlePieClick}
              cursor="pointer"
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
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconType="circle"
              iconSize={8}
              formatter={(value, entry, index) => (
                <span 
                  style={{ 
                    color: '#333333', 
                    fontSize: '12px', 
                    fontWeight: 500, 
                    cursor: 'pointer',
                    padding: '2px 0',
                    display: 'inline-block'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLegendClick(value);
                  }}
                >
                  {value} ({data[index].value}%)
                </span>
              )}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Segment Share']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                fontWeight: 500
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Customer Value Trend Chart - RESTORED
export const CustomerValueChart = ({ data }) => {
  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Customer Value by Segment
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Avg Value']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                fontWeight: 500
              }}
            />
            <Legend 
              verticalAlign="top"
              height={20}
              formatter={(value) => <span style={{ color: '#333333', fontSize: '11px', fontWeight: 500 }}>{value}</span>}
            />
            <Bar dataKey="avgValue" name="Current Value" fill="#1A4C49" radius={[4, 4, 0, 0]} />
            <Bar dataKey="potentialValue" name="Potential Value" fill="#4D9892" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// RFM Insights Card - RESTORED
export const RFMInsightsCard = ({ data, onSegmentClick }) => {
  const handleActionClick = (action) => {
    console.log('Insight action clicked:', action);
    const segmentMatch = action.match(/for\s+(\w+(?:\s+\w+)*)\s+segment/i);
    if (segmentMatch && segmentMatch[1]) {
      const segment = segmentMatch[1].toLowerCase();
      if (segment === "champions" || 
          segment === "loyal customers" || 
          segment === "potential loyalists" || 
          segment === "at risk" || 
          segment === "can't lose") {
        onSegmentClick && onSegmentClick(segmentMatch[1]);
      }
    }
  };

  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        RFM Insights & Actions
      </div>
      <div style={{ ...chartContainerStyle, display: 'block', overflow: 'visible' }}>
        <div style={{ padding: '0.5rem 1rem' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.6)', textTransform: 'uppercase' }}>
            Segment Insights
          </div>
          {data.segmentInsights.map((insight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: insight.type === 'positive' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                color: insight.type === 'positive' ? '#4CAF50' : '#F44336',
                marginRight: '0.5rem',
                fontSize: '0.625rem'
              }}>
                <span>{insight.type === 'positive' ? '✓' : '!'}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.7)', lineHeight: 1.5, margin: 0 }}>
                {insight.text}
              </p>
            </div>
          ))}
          
          <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)', margin: '0.4rem 0' }}></div>
          
          <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.6)', textTransform: 'uppercase' }}>
            Recommended Actions
          </div>
          {data.recommendedActions.map((action, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                marginBottom: '0.4rem',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                transition: 'background-color 0.2s ease'
              }}
              onClick={() => handleActionClick(action)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(33, 150, 243, 0.15)',
                color: '#2196F3',
                marginRight: '0.5rem',
                fontSize: '0.625rem'
              }}>
                <span>→</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.7)', lineHeight: 1.5, margin: 0 }}>
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Retention Rate by Segment Chart - RESTORED
export const RetentionRateChart = ({ data, onSegmentClick }) => {
  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Retention Rate by Segment
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Retention Rate']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                fontWeight: 500
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={20}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span 
                  style={{ color: '#333333', fontSize: '11px', fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => {
                    if (value === "Current Rate") {
                      return;
                    }
                    onSegmentClick && onSegmentClick(value);
                  }}
                >
                  {value}
                </span>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="currentRate" 
              stroke="#4CAF50" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Current Rate"
            />
            <Line 
              type="monotone" 
              dataKey="targetRate" 
              stroke="#4D9892" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Target Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// RFM Recommendation Cards - RESTORED with modal integration
export const RFMRecommendationCards = ({ recommendations, onSegmentClick }) => {
  const { openDetailModal } = useCommonModals();

  const handleImplementClick = (rec) => {
    console.log('Implement clicked for:', rec.segment);
    // Use modal system for implementation
    openDetailModal({
      title: rec.title,
      segment: rec.segment,
      action: 'implement',
      recommendation: rec
    });
  };

  const handleViewDetailsClick = (rec) => {
    console.log('View details clicked for:', rec.segment);
    if (onSegmentClick && rec.segment) {
      onSegmentClick(rec.segment);
    }
  };

  const handleSegmentClick = (segment) => {
    console.log('Segment badge clicked:', segment);
    if (onSegmentClick && segment) {
      onSegmentClick(segment);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
          Top RFM Segment Recommendations
        </h3>
        
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            color: COLORS.evergreen,
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          View All Recommendations
          <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              borderLeft: `4px solid ${rec.priority === 'high' ? '#4CAF50' : rec.priority === 'medium' ? '#2196F3' : '#FFC107'}`
            }}
          >
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  {rec.title}
                </h4>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem', 
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: rec.priority === 'high' ? 'rgba(76, 175, 80, 0.1)' : 
                                rec.priority === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 
                                'rgba(255, 193, 7, 0.1)',
                  color: rec.priority === 'high' ? '#4CAF50' : 
                         rec.priority === 'medium' ? '#2196F3' : 
                         '#FFC107',
                }}>
                  {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.125rem 0.375rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    color: COLORS.onyxMedium,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSegmentClick(rec.segment);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  }}
                >
                  For: {rec.segment}
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.25rem', 
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: COLORS.onyxMedium,
                }}>
                  ROI: {rec.expectedROI}
                </span>
              </div>
              
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem', height: '60px', overflow: 'hidden' }}>
                {rec.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    backgroundColor: COLORS.evergreen,
                    color: 'white',
                    borderRadius: '0.375rem',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImplementClick(rec);
                  }}
                >
                  <Check size={16} style={{ marginRight: '0.25rem' }} />
                  Implement
                </button>
                
                <button 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: COLORS.evergreen,
                    borderRadius: '0.375rem',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    border: '1px solid ' + COLORS.evergreen,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleViewDetailsClick(rec);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main RFM Dashboard Component - RESTORED with full functionality
const RFMDashboard = ({ 
  aiState, 
  aiHandlers, 
  contextualPrompts = [], 
  placeholderText = "Ask me about your RFM segments, customer behavior, or retention strategies...",
  onImplementRecommendation 
}) => {
  // State for selected segment detail modal
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [comparisonPeriod, setComparisonPeriod] = useState('last_30_days');
  
  // Use SHARED AI state from App.js
  const {
    isAIMinimized,
    aiResponse,
    lastQuestion,
    showAIResponse
  } = aiState || {};

  const {
    handleAIPromptSubmit,
    handleAIPromptClick,
    handleClearAIResponse,
    setIsAIMinimized
  } = aiHandlers || {};

  // Handle segment click for detail view
  const handleSegmentClick = (segmentName) => {
    console.log('Dashboard handleSegmentClick called with:', segmentName);
    
    if (!segmentName) {
      console.warn("Segment name is missing in click handler");
      return;
    }
    
    const normalizedSegment = segmentName.trim();
    console.log('Setting selectedSegment to:', normalizedSegment);
    
    setSelectedSegment(normalizedSegment);
  };

  // Handle close of detail modal
  const handleCloseDetail = () => {
    console.log('Closing modal');
    setSelectedSegment(null);
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Prompt Bar */}
      {aiHandlers && (
        <AIPromptBar
          onSubmit={handleAIPromptSubmit}
          isMinimized={isAIMinimized}
          onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
          placeholderText={placeholderText}
          suggestedPrompts={contextualPrompts}
        />
      )}

      {/* RFM KPI Cards */}
      <RFMKpiCards 
        data={rfmKpiData} 
        onSegmentClick={handleSegmentClick}
      />
      
      {/* First row - Segment Distribution and Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <RFMSegmentChart 
          data={segmentDistributionData} 
          onSegmentClick={handleSegmentClick}
        />
        <RFMInsightsCard 
          data={rfmInsightsData} 
          onSegmentClick={handleSegmentClick}
        />
      </div>

      {/* Second row - Customer Value and Retention Rate */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <CustomerValueChart data={customerValueData} />
        <RetentionRateChart 
          data={retentionRateData} 
          onSegmentClick={handleSegmentClick}
        />
      </div>
      
      {/* Recommendations */}
      <RFMRecommendationCards 
        recommendations={rfmRecommendations} 
        onSegmentClick={handleSegmentClick}
      />

      {/* Segment Detail Modal */}
      {selectedSegment && (
        <RFMSegmentDetailManager 
          initialSegment={selectedSegment}
          isOpen={!!selectedSegment}
          onClose={handleCloseDetail}
          comparisonPeriod={comparisonPeriod}
          onImplementRecommendation={onImplementRecommendation}
        />
      )}

      {/* AI Response Modal */}
      {aiHandlers && showAIResponse && (
        <AIResponseModal 
          isOpen={showAIResponse}
          onClose={handleClearAIResponse}
          response={aiResponse}
          question={lastQuestion}
        />
      )}
    </div>
  );
};

export default RFMDashboard;
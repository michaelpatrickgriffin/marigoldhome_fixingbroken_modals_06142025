// src/components/dashboard/RFMDashboard.js
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Star, Target, ShoppingBag, 
  Award, TrendingUp, AlertTriangle, Check, ChevronRight, Sparkles, RefreshCw
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import RFMSegmentDetailManager from './RFMSegmentDetailManager';
import AIPromptBar from '../common/AIPromptBar';
import AIResponseModal from '../common/AIResponseModal';
import RecommendationImplementationModal from '../loyalty/RecommendationImplementationModal';
import UnifiedInsightsAndRecommendations from './UnifiedInsightsAndRecommendations';
import { getResponseGenerator } from './ResponseGenerators';

// ===== IMPORT CENTRALIZED RFM DATA =====
import {
  rfmKpiData,
  segmentDistributionData,
  customerValueData,
  retentionRateData,
  rfmInsightsData,
  rfmRecommendations,
  isRecommendationImplemented,
  markRecommendationAsImplemented,
  isRecommendationRejected,
  markRecommendationAsRejected,
  getChangeColor
} from '../../data/RFMAnalyticsData';

// Dashboard card style that will be applied to all cards
const dashboardCardStyle = {
  background: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  position: 'relative',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 0
};

const dashboardCardHeaderStyle = {
  padding: '1rem 1.25rem 0.75rem',
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 600,
  color: COLORS.onyx,
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  flexShrink: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.025em'
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

// ✅ UPDATED: Clean RFM KPI Cards Component with CSS-based styling
export const RFMKpiCards = ({ data, onSegmentClick }) => {
  const handleCardClick = (segmentTitle) => {
    console.log('KPI Card clicked:', segmentTitle);
    if (onSegmentClick && segmentTitle) {
      onSegmentClick(segmentTitle);
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      Users: Users,
      DollarSign: DollarSign,
      Calendar: Calendar,
      Star: Star,
      Target: Target,
      AlertTriangle: AlertTriangle,
      Award: Award
    };
    return iconMap[iconName] || Award;
  };

  return (
    <div className="rfm-kpi-cards-container">
      {data.map((kpi, index) => {
        const IconComponent = getIconComponent(kpi.icon);
        const dynamicChangeColor = getChangeColor(kpi);
        
        return (
          <div 
            key={index} 
            className="rfm-kpi-card"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCardClick(kpi.title);
            }}
          >
            <div className="rfm-kpi-card-content">
              <div 
                className="rfm-kpi-icon-container" 
                style={{ 
                  backgroundColor: kpi.iconBg || 'rgba(33, 150, 243, 0.15)', 
                  color: kpi.iconColor || '#2196F3'
                }}
              >
                <IconComponent size={20} color={kpi.iconColor || '#2196F3'} />
              </div>
              
              <div className="rfm-kpi-content">
                <h3 className="rfm-kpi-title">{kpi.title}</h3>
                
                <div className="rfm-kpi-value-row">
                  <span className="rfm-kpi-value">{kpi.value}</span>
                  {kpi.change && (
                    <span 
                      className={`rfm-kpi-change ${dynamicChangeColor === '#81C784' ? 'positive' : 'negative'}`}
                      style={{ color: dynamicChangeColor }}
                    >
                      {kpi.change}
                    </span>
                  )}
                </div>
                
                <div className="rfm-kpi-period">vs prev period</div>
                
                {kpi.secondaryText && (
                  <div className="rfm-kpi-secondary">{kpi.secondaryText}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Custom tick formatter for wrapping labels
const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');
  const lineHeight = 12;
  
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={index}
          x={0}
          y={index * lineHeight}
          dy={4}
          textAnchor="middle"
          fill={COLORS.onyx}
          fontSize="11"
          fontWeight="500"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

// RFM Segment Distribution Chart - IMPROVED click handling
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
                    color: COLORS.onyx, 
                    fontSize: '11px', 
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

// Customer Value Trend Chart with wrapped labels
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
            margin={{ top: 5, right: 10, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={<CustomXAxisTick />}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              height={40}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: COLORS.onyx }}
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
              formatter={(value) => <span style={{ color: COLORS.onyx, fontSize: '11px', fontWeight: 500 }}>{value}</span>}
            />
            <Bar dataKey="avgValue" name="Current Value" fill="#1A4C49" radius={[4, 4, 0, 0]} />
            <Bar dataKey="potentialValue" name="Potential Value" fill="#4D9892" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Retention Rate by Segment Chart with wrapped labels
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
            margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={<CustomXAxisTick />}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              height={40}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: COLORS.onyx }}
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
                  style={{ color: COLORS.onyx, fontSize: '11px', fontWeight: 500, cursor: 'pointer' }}
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

// Main RFM Dashboard Component - Updated layout with unified insights
const RFMDashboard = ({ 
  aiState, 
  aiHandlers, 
  contextualPrompts = [], 
  placeholderText = "Ask me about your RFM segments, customer behavior, or retention strategies...",
  onProgramCreated,
  onNotificationCreated,
  onProgramClick
}) => {
  // State for selected segment detail modal
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [comparisonPeriod, setComparisonPeriod] = useState('last_30_days');
  
  // State for recommendation implementation modal
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  
  // State for recommendation status tracking
  const [implementedRecommendations, setImplementedRecommendations] = useState(
    new Set(JSON.parse(localStorage.getItem('implementedRecommendations') || '[]'))
  );
  const [rejectedRecommendations, setRejectedRecommendations] = useState(
    new Set(JSON.parse(localStorage.getItem('rejectedRecommendations') || '[]'))
  );
  
  // Use SHARED AI state from App.js instead of local state
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

  // Handle recommendation implementation
  const handleImplementRecommendation = (recommendation) => {
    console.log('Implementing recommendation:', recommendation);
    setSelectedRecommendation(recommendation);
    setShowImplementationModal(true);
  };

  // Handle closing implementation modal
  const handleCloseImplementationModal = () => {
    setShowImplementationModal(false);
    setSelectedRecommendation(null);
  };

  // Handle segment click for detail view - IMPROVED with better debugging
  const handleSegmentClick = (segmentName) => {
    console.log('Dashboard handleSegmentClick called with:', segmentName);
    
    if (!segmentName) {
      console.warn("Segment name is missing in click handler");
      return;
    }
    
    // Normalize segment name to match expected values
    const normalizedSegment = segmentName.trim();
    console.log('Setting selectedSegment to:', normalizedSegment);
    
    setSelectedSegment(normalizedSegment);
  };

  // Handle close of detail modal
  const handleCloseDetail = () => {
    console.log('Closing modal');
    setSelectedSegment(null);
  };

  // Handle program creation with recommendation sync
  const handleProgramCreatedFromRFM = (newProgram) => {
    console.log('Program created from RFM dashboard:', newProgram);
    
    // Mark the associated recommendation as implemented if available
    if (selectedRecommendation) {
      const newImplemented = new Set([...implementedRecommendations, selectedRecommendation.id]);
      setImplementedRecommendations(newImplemented);
      localStorage.setItem('implementedRecommendations', JSON.stringify([...newImplemented]));
    }
    
    // Pass to parent callback
    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }
    
    // Close implementation modal
    handleCloseImplementationModal();
  };

  // Handle modify and reject recommendations
  const handleModifyRecommendation = (recommendation) => {
    console.log('Modify recommendation:', recommendation);
    // TODO: Implement modify functionality
  };

  const handleRejectRecommendation = (recommendation) => {
    console.log('Reject recommendation:', recommendation);
    markRecommendationAsRejected(recommendation.id);
    
    // Update state to trigger re-render
    const newRejected = new Set([...rejectedRecommendations, recommendation.id]);
    setRejectedRecommendations(newRejected);
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Prompt Bar - Using SHARED state */}
      {aiHandlers && (
        <AIPromptBar
          onSubmit={handleAIPromptSubmit}
          isMinimized={isAIMinimized}
          onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
          placeholderText={placeholderText}
          suggestedPrompts={contextualPrompts}
        />
      )}

      {/* RFM KPI Cards with qualitative measures */}
      <RFMKpiCards 
        data={rfmKpiData} 
        onSegmentClick={handleSegmentClick}
      />
      
      {/* Full-width Unified Insights and Recommendations */}
      <UnifiedInsightsAndRecommendations
        insightsData={rfmInsightsData}
        recommendationsData={rfmRecommendations}
        onProgramClick={onProgramClick}
        onSegmentClick={handleSegmentClick}
        onImplementRecommendation={handleImplementRecommendation}
        onModifyRecommendation={handleModifyRecommendation}
        onRejectRecommendation={handleRejectRecommendation}
        variant="rfm"
      />

      {/* Charts Row - 3 equal columns */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '1.5rem'
      }}>
        <RFMSegmentChart 
          data={segmentDistributionData} 
          onSegmentClick={handleSegmentClick}
        />
        <CustomerValueChart data={customerValueData} />
        <RetentionRateChart 
          data={retentionRateData} 
          onSegmentClick={handleSegmentClick}
        />
      </div>

      {/* Segment Detail Modal */}
      {selectedSegment && (
        <RFMSegmentDetailManager 
          initialSegment={selectedSegment}
          isOpen={!!selectedSegment}
          onClose={handleCloseDetail}
          comparisonPeriod={comparisonPeriod}
          onImplementRecommendation={handleImplementRecommendation}
        />
      )}

      {/* Recommendation Implementation Modal */}
      {showImplementationModal && selectedRecommendation && (
        <RecommendationImplementationModal
          isOpen={showImplementationModal}
          onClose={handleCloseImplementationModal}
          recommendation={selectedRecommendation}
          programData={{
            id: 'rfm-dashboard',
            title: 'RFM Segment Enhancement',
            audience: selectedRecommendation.segment,
            participants: selectedRecommendation.segment === 'At Risk' ? 18900 : 
                         selectedRecommendation.segment === 'Potential Loyalists' ? 37200 : 1000
          }}
          onProgramCreated={handleProgramCreatedFromRFM}
          onNotificationCreated={onNotificationCreated}
        />
      )}
    </div>
  );
};

export default RFMDashboard;
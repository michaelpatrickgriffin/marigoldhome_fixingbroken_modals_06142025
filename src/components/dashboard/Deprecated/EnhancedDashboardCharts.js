// src/components/dashboard/EnhancedDashboardCharts.js
import React, { useState, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { COLORS } from '../../styles/ColorStyles';
import MembershipDetailView from './MembershipDetailView';

// Consistent card styling based on the RFM cards
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
  padding: '1rem 1.25rem',
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
  padding: '0.5rem 1rem 1rem',
  position: 'relative'
};

// Enhanced Revenue Chart
export const EnhancedRevenueChart = ({ data }) => {
  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Monthly Revenue vs Target
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
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
              tickFormatter={value => `$${value/1000}K`}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
                fontWeight: 500
              }}
            />
            <Legend />
            <Bar dataKey="revenue" name="Actual" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="#E0E0E0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Enhanced Membership Chart with Drill-in Functionality
export const EnhancedMembershipChart = ({ data }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [chartPosition, setChartPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const chartRef = useRef(null);
  const COLORS_ARRAY = ['#2196F3', '#4CAF50', '#FFC107'];

  // Function to handle chart click and open detail view
  const handleCardClick = () => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setChartPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      setDetailOpen(true);
    }
  };

  // Function to handle detail view close
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  // Function to handle transition completion
  const handleTransitionComplete = (isComplete) => {
    console.log("Transition complete:", isComplete);
  };

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
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

  return (
    <div style={dashboardCardStyle} ref={chartRef} onClick={handleCardClick}>
      <div style={dashboardCardHeaderStyle}>
        Membership Breakdown
      </div>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
              label={renderCustomizedLabel}
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

      {/* Render the MembershipDetailView */}
      <MembershipDetailView 
        data={data}
        isOpen={detailOpen}
        onClose={handleDetailClose}
        position={chartPosition}
        sizeRef={chartRef}
        transitionComplete={handleTransitionComplete}
      />
    </div>
  );
};

// Enhanced Insights Card
export const EnhancedInsightsCard = ({ data }) => {
  return (
    <div style={dashboardCardStyle}>
      <div style={dashboardCardHeaderStyle}>
        Insights & Actions
      </div>
      <div style={{
        ...chartContainerStyle, 
        display: 'block',
        padding: '1rem 1.25rem',
        overflowY: 'auto'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 600, 
            color: COLORS.onyxMedium, 
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Performance Insights
          </div>
          {data.performanceInsights.map((insight, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '0.5rem' 
            }}>
              <div style={{ 
                width: '1.25rem', 
                height: '1.25rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: insight.type === 'positive' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                color: insight.type === 'positive' ? '#4CAF50' : '#F44336',
                marginRight: '0.75rem',
                fontSize: '0.625rem'
              }}>
                <span>{insight.type === 'positive' ? '✓' : '!'}</span>
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(0, 0, 0, 0.7)', 
                lineHeight: 1.5,
                margin: 0
              }}>
                {insight.text}
              </p>
            </div>
          ))}
        </div>
        
        <div style={{ 
          height: '1px', 
          backgroundColor: 'rgba(0, 0, 0, 0.08)', 
          margin: '0.75rem 0' 
        }}></div>
        
        <div>
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 600, 
            color: COLORS.onyxMedium, 
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Recommended Actions
          </div>
          {data.recommendedActions.map((action, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '0.5rem' 
            }}>
              <div style={{ 
                width: '1.25rem', 
                height: '1.25rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(33, 150, 243, 0.15)',
                color: '#2196F3',
                marginRight: '0.75rem',
                fontSize: '0.625rem'
              }}>
                <span>→</span>
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(0, 0, 0, 0.7)', 
                lineHeight: 1.5,
                margin: 0
              }}>
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Dashboard Charts Container
export const EnhancedDashboardChartsContainer = ({ revenueData, membershipData, insightsData }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <EnhancedRevenueChart data={revenueData} />
      <EnhancedMembershipChart data={membershipData} />
      <EnhancedInsightsCard data={insightsData} />
    </div>
  );
};

export default EnhancedDashboardChartsContainer;
// src/components/analytics/KpiAnalyticsModal.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { Lightbulb, X, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Calendar, Filter, Download, Share2, ArrowUpRight, ArrowDownRight, Target, DollarSign, Users, Percent, Clock, Award, Zap, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const KpiAnalyticsModal = ({ 
  isOpen, 
  onClose, 
  kpi, 
  comparisonPeriod = 'last_30_days',
  // New modal system props
  onNavigate,
  onGoBack,
  currentView = 'main',
  viewData = {},
  canGoBack = false,
  modalId,
  isModal = false
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(comparisonPeriod);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [chartType, setChartType] = useState('line');

  // Use viewData when in modal system mode
  const currentKpi = viewData?.kpi || kpi;

  // Mock KPI data generation
  const generateKpiData = (kpiName, period) => {
    const baseValue = Math.floor(Math.random() * 100000) + 10000;
    const trend = Math.random() > 0.5 ? 'up' : 'down';
    const changePercent = (Math.random() * 20).toFixed(1);
    
    return {
      name: kpiName || 'Revenue',
      value: `$${baseValue.toLocaleString()}`,
      rawValue: baseValue,
      change: `${trend === 'up' ? '+' : '-'}${changePercent}%`,
      trend: trend,
      period: period,
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: baseValue + (Math.random() - 0.5) * baseValue * 0.3
      })),
      breakdown: [
        { category: 'Direct Sales', value: baseValue * 0.4, percentage: 40 },
        { category: 'Email Campaigns', value: baseValue * 0.3, percentage: 30 },
        { category: 'Social Media', value: baseValue * 0.2, percentage: 20 },
        { category: 'Other', value: baseValue * 0.1, percentage: 10 }
      ],
      segments: [
        { name: 'VIP Customers', value: baseValue * 0.35, change: '+15%', trend: 'up' },
        { name: 'Regular Customers', value: baseValue * 0.45, change: '+8%', trend: 'up' },
        { name: 'New Customers', value: baseValue * 0.20, change: '-5%', trend: 'down' }
      ],
      insights: [
        {
          type: 'positive',
          title: 'Strong Growth Trajectory',
          description: 'KPI has shown consistent growth over the selected period with strong performance in key segments.'
        },
        {
          type: 'warning',
          title: 'Seasonal Variance Detected',
          description: 'Performance shows weekly patterns that could be optimized with targeted campaigns.'
        },
        {
          type: 'info',
          title: 'Benchmark Comparison',
          description: 'Current performance is 15% above industry average for similar businesses.'
        }
      ]
    };
  };

  const [kpiData, setKpiData] = useState(() => generateKpiData(currentKpi?.name, selectedPeriod));

  // Update data when KPI or period changes
  useEffect(() => {
    if (currentKpi) {
      setIsLoading(true);
      setTimeout(() => {
        setKpiData(generateKpiData(currentKpi.name, selectedPeriod));
        setIsLoading(false);
      }, 500);
    }
  }, [currentKpi, selectedPeriod]);

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
  };

  // Handle drill-down navigation
  const handleDrillDown = (type, data) => {
    if (onNavigate) {
      onNavigate('drill-down', {
        type,
        data,
        kpi: currentKpi,
        kpiData: kpiData,
        selectedPeriod
      });
    }
  };

  // Handle export
  const handleExport = () => {
    console.log('Exporting KPI data:', kpiData);
    // In a real app, this would trigger a download
  };

  // Handle close
  const handleClose = () => {
    if (isModal && onGoBack) {
      onGoBack();
    } else if (onClose) {
      onClose();
    }
  };

  // Render different views based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'drill-down':
        return (
          <DrillDownView
            type={viewData.type}
            data={viewData.data}
            kpi={viewData.kpi}
            kpiData={viewData.kpiData}
            selectedPeriod={viewData.selectedPeriod}
            onGoBack={() => onNavigate('main')}
          />
        );
      case 'comparison':
        return (
          <ComparisonView
            kpi={currentKpi}
            kpiData={kpiData}
            selectedPeriod={selectedPeriod}
            onGoBack={() => onNavigate('main')}
          />
        );
      case 'forecast':
        return (
          <ForecastView
            kpi={currentKpi}
            kpiData={kpiData}
            selectedPeriod={selectedPeriod}
            onGoBack={() => onNavigate('main')}
          />
        );
      default:
        return renderMainView();
    }
  };

  // Main view with tabs
  const renderMainView = () => {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'trends', label: 'Trends', icon: TrendingUp },
      { id: 'breakdown', label: 'Breakdown', icon: PieChart },
      { id: 'insights', label: 'Insights', icon: Lightbulb }
    ];

    const getTabContent = () => {
      switch (activeTab) {
        case 'overview':
          return <OverviewTab kpiData={kpiData} onDrillDown={handleDrillDown} />;
        case 'trends':
          return <TrendsTab kpiData={kpiData} chartType={chartType} setChartType={setChartType} />;
        case 'breakdown':
          return <BreakdownTab kpiData={kpiData} onDrillDown={handleDrillDown} />;
        case 'insights':
          return <InsightsTab kpiData={kpiData} onNavigate={onNavigate} />;
        default:
          return <OverviewTab kpiData={kpiData} onDrillDown={handleDrillDown} />;
      }
    };

    return (
      <>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
                {currentKpi?.name || 'KPI Analysis'}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.onyx }}>
                    {kpiData.value}
                  </span>
                  <span style={{ 
                    fontSize: '1rem', 
                    fontWeight: 500,
                    color: kpiData.trend === 'up' ? COLORS.evergreen : COLORS.red,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    {kpiData.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {kpiData.change}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                Performance analysis for the selected period
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  color: COLORS.onyx,
                  cursor: 'pointer'
                }}
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_year">Last Year</option>
              </select>
              
              {/* Action Buttons */}
              <button
                onClick={handleExport}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.5rem',
                  color: COLORS.onyx,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Download size={16} />
                Export
              </button>
              
              <button
                onClick={handleClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  color: COLORS.onyxMedium,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          flexShrink: 0,
          paddingLeft: '2rem'
        }}>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  color: activeTab === tab.id ? COLORS.evergreen : COLORS.onyxMedium,
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto',
          backgroundColor: '#fafbfc'
        }}>
          {isLoading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                border: '3px solid rgba(26, 76, 73, 0.2)',
                borderTopColor: COLORS.evergreen,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : (
            getTabContent()
          )}
        </div>
      </>
    );
  };

  // For legacy mode (when not using modal system)
  if (!isModal) {
    if (!isOpen || !currentKpi) return null;
    
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 15500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backdropFilter: 'blur(4px)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          style={{
            width: '90vw',
            maxWidth: '1400px',
            height: '85vh',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 15501
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {renderMainView()}
        </div>
      </div>
    );
  }

  // For modal system mode
  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {renderCurrentView()}
      
      {/* CSS for spin animation */}
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

// Tab Components
const OverviewTab = ({ kpiData, onDrillDown }) => (
  <div style={{ padding: '2rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
      {/* Performance Summary */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
          Performance Summary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Current Value</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
              {kpiData.value}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Period Change</span>
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 500,
              color: kpiData.trend === 'up' ? COLORS.evergreen : COLORS.red 
            }}>
              {kpiData.change}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Trend</span>
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: 500,
              color: kpiData.trend === 'up' ? COLORS.evergreen : COLORS.red,
              textTransform: 'capitalize'
            }}>
              {kpiData.trend}ward
            </span>
          </div>
        </div>
        <button
          onClick={() => onDrillDown('performance', kpiData)}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
          Quick Stats
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(26, 76, 73, 0.05)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              {Math.floor(kpiData.rawValue / 1000)}K
            </div>
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
              Daily Avg
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(0, 123, 191, 0.05)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              {Math.floor(Math.random() * 50) + 20}
            </div>
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
              Peak Days
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Segment Performance */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
        Performance by Segment
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {kpiData.segments.map((segment, index) => (
          <div 
            key={index}
            onClick={() => onDrillDown('segment', segment)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
            }}
          >
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
                {segment.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                ${segment.value.toLocaleString()}
              </div>
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: 500,
              color: segment.trend === 'up' ? COLORS.evergreen : COLORS.red,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              {segment.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {segment.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TrendsTab = ({ kpiData, chartType, setChartType }) => (
  <div style={{ padding: '2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
        Trend Analysis
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['line', 'bar', 'area'].map(type => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: chartType === type ? COLORS.evergreen : 'white',
              color: chartType === type ? 'white' : COLORS.onyx,
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
    
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', color: COLORS.onyxMedium }}>
        <BarChart3 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <p>Interactive {chartType} chart would be displayed here</p>
        <p style={{ fontSize: '0.875rem' }}>
          Showing {kpiData.data.length} data points over the selected period
        </p>
      </div>
    </div>
  </div>
);

const BreakdownTab = ({ kpiData, onDrillDown }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      Performance Breakdown
    </h3>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {kpiData.breakdown.map((item, index) => (
        <div 
          key={index}
          onClick={() => onDrillDown('breakdown', item)}
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
              {item.category}
            </h4>
            <ArrowUpRight size={16} color={COLORS.onyxMedium} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.onyx }}>
              ${item.value.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
              {item.percentage}% of total
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${item.percentage}%`,
              height: '100%',
              backgroundColor: COLORS.evergreen,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InsightsTab = ({ kpiData, onNavigate }) => (
  <div style={{ padding: '2rem' }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '2rem' }}>
      AI-Powered Insights
    </h3>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {kpiData.insights.map((insight, index) => {
        const icons = {
          positive: CheckCircle,
          warning: AlertCircle,
          info: Info
        };
        const colors = {
          positive: COLORS.evergreen,
          warning: COLORS.amber,
          info: COLORS.blue
        };
        const IconComponent = icons[insight.type];
        
        return (
          <div 
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${colors[insight.type]}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: `${colors[insight.type]}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <IconComponent size={16} color={colors[insight.type]} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
                  {insight.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, lineHeight: '1.5', margin: 0 }}>
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={() => onNavigate && onNavigate('comparison')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Compare with Benchmarks
        </button>
        <button
          onClick={() => onNavigate && onNavigate('forecast')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.blue,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          View Forecast
        </button>
      </div>
    </div>
  </div>
);

// Drill-down views
const DrillDownView = ({ type, data, kpi, kpiData, selectedPeriod, onGoBack }) => (
  <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <button
        onClick={onGoBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ←
      </button>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
        {type === 'segment' ? `${data.name} Details` : 
         type === 'breakdown' ? `${data.category} Analysis` : 
         `${kpi.name} Deep Dive`}
      </h2>
    </div>
    
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Detailed analysis for {type === 'segment' ? data.name : type === 'breakdown' ? data.category : kpi.name} would be displayed here.
        This could include deeper metrics, historical comparisons, and actionable insights.
      </p>
    </div>
  </div>
);

const ComparisonView = ({ kpi, kpiData, selectedPeriod, onGoBack }) => (
  <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <button
        onClick={onGoBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ←
      </button>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
        Benchmark Comparison
      </h2>
    </div>
    
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        Benchmark comparison for {kpi.name} would be displayed here.
        This includes industry averages, competitor analysis, and performance rankings.
      </p>
    </div>
  </div>
);

const ForecastView = ({ kpi, kpiData, selectedPeriod, onGoBack }) => (
  <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <button
        onClick={onGoBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          backgroundColor: COLORS.evergreen,
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ←
      </button>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
        Performance Forecast
      </h2>
    </div>
    
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2: 8px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: COLORS.onyxMedium, lineHeight: '1.5' }}>
        AI-powered forecast for {kpi.name} would be displayed here.
        This includes predictive analytics, trend projections, and confidence intervals.
      </p>
    </div>
  </div>
);

export default KpiAnalyticsModal;
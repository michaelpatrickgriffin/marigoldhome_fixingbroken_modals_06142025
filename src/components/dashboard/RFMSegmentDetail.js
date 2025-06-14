// src/components/dashboard/RFMSegmentDetail.js
import React from 'react';
import { 
  X, Users, DollarSign, Calendar, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Check, Filter
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { COLORS } from '../../styles/ColorStyles';
import { getSegmentData } from '../../data/RFMAnalyticsData';

const RFMSegmentDetail = ({ segment, onClose }) => {
  // Get segment data from centralized data source
  const segmentKey = segment ? segment.toLowerCase() : "champions";
  const currentSegment = getSegmentData(segmentKey);

  return (
    <div>
      {/* Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 201,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: COLORS.onyx,
              display: 'flex',
              alignItems: 'center' 
            }}>
              <div style={{ 
                width: '1rem', 
                height: '1rem', 
                borderRadius: '50%',
                backgroundColor: currentSegment.color,
                marginRight: '0.75rem'
              }}></div>
              {currentSegment.title} Segment
            </h2>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
              {currentSegment.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
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
                marginRight: '0.5rem'
              }}
            >
              <Filter size={16} style={{ marginRight: '0.5rem' }} />
              Time Range: Last 90 Days
            </button>
            
            <button 
              onClick={onClose}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Modal Body - Scrollable Content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {/* Key Metrics */}
          <div className="mb-6">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              Key Metrics
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    marginRight: '0.75rem'
                  }}>
                    <Users size={20} color={COLORS.blue} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Customers
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                      {currentSegment.metrics.customerCount}
                    </p>
                    <div style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: currentSegment.metrics.growth.startsWith('+') ? COLORS.green : COLORS.red
                    }}>
                      {currentSegment.metrics.growth.startsWith('+') ? (
                        <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                      ) : (
                        <ArrowDownRight size={14} style={{ marginRight: '0.25rem' }} />
                      )}
                      {currentSegment.metrics.growth}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    marginRight: '0.75rem'
                  }}>
                    <DollarSign size={20} color={COLORS.green} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Avg. Spend
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                      {currentSegment.metrics.avgSpend}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                      Per Order
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    marginRight: '0.75rem'
                  }}>
                    <Calendar size={20} color="#9C27B0" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Retention Rate
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                      {currentSegment.metrics.retention}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                      90-Day Period
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    marginRight: '0.75rem'
                  }}>
                    <ShoppingBag size={20} color={COLORS.yellow} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      RFM Score
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                      {(
                        (parseFloat(currentSegment.metrics.recencyScore) + 
                         parseFloat(currentSegment.metrics.frequencyScore) + 
                         parseFloat(currentSegment.metrics.monetaryScore)) / 3
                      ).toFixed(1)}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                      Out of 5.0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RFM Scores */}
          <div className="mb-6">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
              RFM Score Breakdown
            </h3>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem', textAlign: 'center' }}>
                    Recency Score
                  </p>
                  <div style={{ position: 'relative', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '0.5rem' }}>
                    <div style={{ 
                      position: 'absolute',
                      height: '100%',
                      width: `${(parseFloat(currentSegment.metrics.recencyScore) / 5) * 100}%`,
                      backgroundColor: '#2196F3',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>1</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>{parseFloat(currentSegment.metrics.recencyScore).toFixed(1)}</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>5</p>
                  </div>
                </div>
                
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem', textAlign: 'center' }}>
                    Frequency Score
                  </p>
                  <div style={{ position: 'relative', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '0.5rem' }}>
                    <div style={{ 
                      position: 'absolute',
                      height: '100%',
                      width: `${(parseFloat(currentSegment.metrics.frequencyScore) / 5) * 100}%`,
                      backgroundColor: '#9C27B0',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>1</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>{parseFloat(currentSegment.metrics.frequencyScore).toFixed(1)}</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>5</p>
                  </div>
                </div>
                
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem', textAlign: 'center' }}>
                    Monetary Score
                  </p>
                  <div style={{ position: 'relative', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '0.5rem' }}>
                    <div style={{ 
                      position: 'absolute',
                      height: '100%',
                      width: `${(parseFloat(currentSegment.metrics.monetaryScore) / 5) * 100}%`,
                      backgroundColor: '#4CAF50',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>1</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>{parseFloat(currentSegment.metrics.monetaryScore).toFixed(1)}</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Purchase History and Retention Charts */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Purchase Behavior
              </h3>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentSegment.purchaseHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 5]}
                      tickFormatter={value => `${value}`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
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
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    />
                    <Bar yAxisId="left" dataKey="purchases" fill="#9C27B0" radius={[4, 4, 0, 0]} name="Avg. Purchases" />
                    <Bar yAxisId="right" dataKey="avgValue" fill="#2196F3" radius={[4, 4, 0, 0]} name="Avg. Order Value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Retention Trend
              </h3>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentSegment.retentionTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
                      axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.87)' }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={value => `${value}%`}
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
                    <defs>
                      <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentSegment.color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={currentSegment.color} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke={currentSegment.color}
                      strokeWidth={2}
                      fill="url(#colorRetention)" 
                      name="Retention Rate"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Recommended Actions */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Recommended Actions for {currentSegment.title} Segment
              </h3>
              
              <button style={{
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
              }}>
                Implement All
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {currentSegment.recommendedActions.map((action, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    borderLeft: `4px solid ${
                      action.impact === 'high' ? '#4CAF50' : 
                      action.impact === 'medium' ? '#2196F3' : 
                      '#FFC107'
                    }`
                  }}
                >
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                        {action.title}
                      </h4>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.125rem 0.375rem', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: action.impact === 'high' ? 'rgba(76, 175, 80, 0.1)' : 
                                      action.impact === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 
                                      'rgba(255, 193, 7, 0.1)',
                        color: action.impact === 'high' ? '#4CAF50' : 
                              action.impact === 'medium' ? '#2196F3' : 
                              '#FFC107',
                      }}>
                        {action.expectedLift}
                      </span>
                    </div>
                    
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.75rem', height: '60px', overflow: 'hidden' }}>
                      {action.description}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.125rem 0.375rem', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: action.impact === 'high' ? 'rgba(76, 175, 80, 0.1)' : 
                                      action.impact === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 
                                      'rgba(255, 193, 7, 0.1)',
                        color: action.impact === 'high' ? '#4CAF50' : 
                              action.impact === 'medium' ? '#2196F3' : 
                              '#FFC107',
                      }}>
                        {action.impact.charAt(0).toUpperCase() + action.impact.slice(1)} Impact
                      </span>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.125rem 0.375rem', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: action.effort === 'low' ? 'rgba(76, 175, 80, 0.1)' : 
                                      action.effort === 'medium' ? 'rgba(33, 150, 243, 0.1)' : 
                                      'rgba(244, 67, 54, 0.1)',
                        color: action.effort === 'low' ? '#4CAF50' : 
                              action.effort === 'medium' ? '#2196F3' : 
                              '#F44336',
                      }}>
                        {action.effort.charAt(0).toUpperCase() + action.effort.slice(1)} Effort
                      </span>
                    </div>
                    
                    <button 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '0.5rem',
                        backgroundColor: COLORS.evergreen,
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Check size={14} style={{ marginRight: '0.25rem' }} />
                      Implement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFMSegmentDetail;
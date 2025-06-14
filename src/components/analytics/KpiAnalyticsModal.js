// src/components/analytics/KpiAnalyticsModal.js

import React, { useState, useEffect } from 'react';

import { X, Download, Filter, Maximize, HelpCircle } from 'lucide-react';

import { COLORS } from '../../styles/ColorStyles';

import RevenueAnalyticsContent from './RevenueAnalyticsContent';

import CustomerAnalyticsContent from './CustomerAnalyticsContent';

import EngagementAnalyticsContent from './EngagementAnalyticsContent';

import ConversionAnalyticsContent from './ConversionAnalyticsContent';

import AudienceAnalyticsContent from './AudienceAnalyticsContent';



// KPI Analytics Modal Component

const KpiAnalyticsModal = ({ 

  isOpen, 

  onClose, 

  kpiType,

  dateRange,

  setDateRange 

}) => {

  const [activeTab, setActiveTab] = useState('overview');

  const [filterOpen, setFilterOpen] = useState(false);

  const [comparisonPeriod, setComparisonPeriod] = useState('previous_period');

  const [segment, setSegment] = useState('all');

  const [granularity, setGranularity] = useState('daily');

  const [isVisible, setIsVisible] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  

  // Animation effect

  useEffect(() => {

    if (isOpen) {

      // Reset closing state when opening

      setIsClosing(false);

      // Small delay to ensure DOM is ready

      const timer = setTimeout(() => {

        setIsVisible(true);

      }, 50);

      return () => clearTimeout(timer);

    } else {

      setIsVisible(false);

    }

  }, [isOpen]);



  // Handle close with animation

  const handleClose = () => {

    setIsClosing(true);

    setTimeout(() => {

      setIsVisible(false);

      setTimeout(() => {

        onClose();

      }, 100);

    }, 200);

  };

  

  // Ensure the modal isn't rendered if not open

  if (!isOpen) return null;

  

  // Get the appropriate title and content based on KPI type

  const getTitle = () => {

    switch(kpiType) {

      case 'revenue':

        return 'Revenue Analysis';

      case 'customers':

        return 'Customer Analysis';

      case 'engagement':

        return 'Engagement Analysis';

      case 'conversion':

        return 'Conversion Analysis';

      case 'audience':

        return 'Audience Breakdown';

      default:

        return 'KPI Analysis';

    }

  };

  

  // Get the appropriate content component based on KPI type

  const renderContent = () => {

    switch(kpiType) {

      case 'revenue':

        return <RevenueAnalyticsContent 

          activeTab={activeTab} 

          onTabChange={setActiveTab}

          comparisonPeriod={comparisonPeriod}

          segment={segment}

          granularity={granularity}

        />;

      case 'customers':

        return <CustomerAnalyticsContent 

          activeTab={activeTab}

          onTabChange={setActiveTab}

          comparisonPeriod={comparisonPeriod}

          segment={segment}

          granularity={granularity}

        />;

      case 'engagement':

        return <EngagementAnalyticsContent 

          activeTab={activeTab}

          onTabChange={setActiveTab}

          comparisonPeriod={comparisonPeriod}

          segment={segment}

          granularity={granularity}

        />;

      case 'conversion':

        return <ConversionAnalyticsContent 

          activeTab={activeTab}

          onTabChange={setActiveTab}

          comparisonPeriod={comparisonPeriod}

          segment={segment}

          granularity={granularity}

        />;

      case 'audience':

        return <AudienceAnalyticsContent 

          activeTab={activeTab}

          onTabChange={setActiveTab}

          comparisonPeriod={comparisonPeriod}

          segment={segment}

          granularity={granularity}

        />;

      default:

        return <div>Select a KPI to analyze</div>;

    }

  };



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

        <div style={{ 

          padding: '1.5rem',

          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',

          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',

          backgroundColor: 'white'

        }}>

          <div style={{

            maxWidth: '80rem',

            width: '100%',

            display: 'flex',

            justifyContent: 'space-between',

            alignItems: 'center',

            paddingLeft: '1.5rem',

            paddingRight: '1.5rem'

          }}>

            <div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>

                {getTitle()}

              </h2>

              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>

                {dateRange === 'last_30_days' ? 'Last 30 Days' : 

                 dateRange === 'last_quarter' ? 'Last Quarter' : 

                 dateRange === 'ytd' ? 'Year to Date' : 

                 'Last 30 Days'} • Outdoors Sportswear

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

                  backgroundColor: 'transparent',

                  border: 'none',

                  cursor: 'pointer'

                }}

              >

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

                  value={dateRange}

                  onChange={(e) => setDateRange(e.target.value)}

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

                  <option value="last_year">Last Year</option>

                  <option value="custom">Custom Range</option>

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

                  Compare To

                </label>

                <select 

                  value={comparisonPeriod}

                  onChange={(e) => setComparisonPeriod(e.target.value)}

                  style={{ 

                    padding: '0.5rem 0.75rem',

                    borderRadius: '0.375rem',

                    border: '1px solid rgba(0,0,0,0.1)',

                    fontSize: '0.875rem',

                    minWidth: '180px'

                  }}

                >

                  <option value="previous_period">Previous Period</option>

                  <option value="previous_year">Previous Year</option>

                  <option value="none">No Comparison</option>

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

                  value={segment}

                  onChange={(e) => setSegment(e.target.value)}

                  style={{ 

                    padding: '0.5rem 0.75rem',

                    borderRadius: '0.375rem',

                    border: '1px solid rgba(0,0,0,0.1)',

                    fontSize: '0.875rem',

                    minWidth: '180px'

                  }}

                >

                  <option value="all">All Segments</option>

                  <option value="outdoor_enthusiasts">Outdoor Enthusiasts</option>

                  <option value="casual_hikers">Casual Hikers</option>

                  <option value="winter_sports">Winter Sports</option>

                  <option value="loyalty_members">Loyalty Members</option>

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

                  Granularity

                </label>

                <select 

                  value={granularity}

                  onChange={(e) => setGranularity(e.target.value)}

                  style={{ 

                    padding: '0.5rem 0.75rem',

                    borderRadius: '0.375rem',

                    border: '1px solid rgba(0,0,0,0.1)',

                    fontSize: '0.875rem',

                    minWidth: '180px'

                  }}

                >

                  <option value="daily">Daily</option>

                  <option value="weekly">Weekly</option>

                  <option value="monthly">Monthly</option>

                  <option value="quarterly">Quarterly</option>

                </select>

              </div>

            </div>

          </div>

        )}

        

        {/* Tabs */}

        <div style={{

          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',

          display: 'flex',

          justifyContent: 'center',

          backgroundColor: 'white'

        }}>

          <div style={{

            maxWidth: '80rem',

            width: '100%',

            paddingLeft: '1.5rem',

            paddingRight: '1.5rem',

            display: 'flex',

            gap: '2rem'

          }}>

            <button

              onClick={() => setActiveTab('overview')}

              style={{

                padding: '1rem 0',

                color: activeTab === 'overview' ? COLORS.evergreen : COLORS.onyxMedium,

                fontWeight: activeTab === 'overview' ? 600 : 500,

                fontSize: '0.875rem',

                borderBottom: activeTab === 'overview' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',

                background: 'none',

                border: 'none',

                cursor: 'pointer',

                borderRadius: 0

              }}

            >

              Overview

            </button>

            

            <button

              onClick={() => setActiveTab('trends')}

              style={{

                padding: '1rem 0',

                color: activeTab === 'trends' ? COLORS.evergreen : COLORS.onyxMedium,

                fontWeight: activeTab === 'trends' ? 600 : 500,

                fontSize: '0.875rem',

                borderBottom: activeTab === 'trends' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',

                background: 'none',

                border: 'none',

                cursor: 'pointer',

                borderRadius: 0

              }}

            >

              Trends

            </button>

            

            <button

              onClick={() => setActiveTab('breakdown')}

              style={{

                padding: '1rem 0',

                color: activeTab === 'breakdown' ? COLORS.evergreen : COLORS.onyxMedium,

                fontWeight: activeTab === 'breakdown' ? 600 : 500,

                fontSize: '0.875rem',

                borderBottom: activeTab === 'breakdown' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',

                background: 'none',

                border: 'none',

                cursor: 'pointer',

                borderRadius: 0

              }}

            >

              Breakdown

            </button>

            

            <button

              onClick={() => setActiveTab('recommendations')}

              style={{

                padding: '1rem 0',

                color: activeTab === 'recommendations' ? COLORS.evergreen : COLORS.onyxMedium,

                fontWeight: activeTab === 'recommendations' ? 600 : 500,

                fontSize: '0.875rem',

                borderBottom: activeTab === 'recommendations' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',

                background: 'none',

                border: 'none',

                cursor: 'pointer',

                borderRadius: 0

              }}

            >

              Recommendations

            </button>

          </div>

        </div>

        

        {/* Modal Body - Dynamic content based on KPI type */}

        <div style={{ 

          flex: 1, 

          overflowY: 'auto',

          display: 'flex',

          justifyContent: 'center'

        }}>

          <div style={{

            maxWidth: '80rem',

            width: '100%',

            paddingLeft: '1.5rem',

            paddingRight: '1.5rem',

            paddingTop: '1.5rem',

            paddingBottom: '1.5rem'

          }}>

            {renderContent()}

          </div>

        </div>

      </div>

    </div>

  );

};



export default KpiAnalyticsModal;
// src/components/dashboard/RFMSegmentDetailModal.js
// FIXED VERSION: Now matches KPI modal exactly - truly fullscreen with clean tabs

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { getSegmentColor } from '../../data/RFMAnalyticsData';
import RFMSegmentAnalyticsContent from './RFMSegmentAnalyticsContent';

const RFMSegmentDetailModal = ({ 
  segment, 
  isOpen, 
  onClose, 
  comparisonPeriod = 'last_30_days',
  onNextSegment,
  onPrevSegment,
  onImplementRecommendation = null
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // ✅ FIX: Use exact same animation pattern as KPI modal
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);
  
  // Handle escape key and body overflow
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ✅ FIX: Exact same close handler as KPI modal
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 100);
    }, 200);
  };
  
  // Don't render if modal is not open
  if (!isOpen) {
    return null;
  }

  // Get segment color from centralized function
  const segmentColor = getSegmentColor(segment);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'trends', label: 'Trends' },
    { id: 'breakdown', label: 'Breakdown' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  return (
    <div
      style={{
        // ✅ FIX: Exact same structure as KPI modal - truly fullscreen
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f7f8', // ✅ FIX: Same background as KPI modal
        zIndex: 70000, // ✅ FIX: Same z-index as KPI modal
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        // ✅ FIX: Same animation timing as KPI modal
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
          // ✅ FIX: Exact same slide animation as KPI modal
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
        {/* Modal Header - Same structure as KPI modal */}
        <div style={{ 
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          zIndex: 70001 // ✅ FIX: Same z-index as KPI modal header
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Navigation Arrows */}
              <button 
                onClick={onPrevSegment}
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
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  marginRight: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx,
                  margin: 0,
                  marginBottom: '0.25rem', // ✅ FIX: Same spacing as KPI modal
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div 
                    style={{
                      width: '0.75rem',
                      height: '0.75rem',
                      borderRadius: '50%',
                      backgroundColor: segmentColor
                    }}
                  />
                  {segment} Segment Analysis
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: COLORS.onyxMedium,
                  margin: 0 // ✅ FIX: Same spacing as KPI modal
                }}>
                  Customer segmentation insights and recommendations
                </p>
              </div>
              
              <button 
                onClick={onNextSegment}
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
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  marginLeft: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Close Button */}
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
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation - FIXED: Clean tabs like KPI modal */}
        <div style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
          zIndex: 70001 // ✅ FIX: Same z-index as KPI modal tabs
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            display: 'flex',
            gap: '2rem'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 0',
                  // ✅ FIX: Exact same tab styling as KPI modal
                  color: activeTab === tab.id ? segmentColor : COLORS.onyxMedium,
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  fontSize: '0.875rem',
                  borderBottom: activeTab === tab.id ? `2px solid ${segmentColor}` : '2px solid transparent',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 0, // ✅ FIX: No border radius like KPI modal
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Modal Body - Same structure as KPI modal */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 70000 // ✅ FIX: Same z-index as KPI modal body
        }}>
          <div style={{
            maxWidth: '80rem',
            width: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem'
          }}>
            <RFMSegmentAnalyticsContent 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              segment={segment}
              periodComparison={comparisonPeriod}
              granularity="daily"
              onImplementRecommendation={onImplementRecommendation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFMSegmentDetailModal;
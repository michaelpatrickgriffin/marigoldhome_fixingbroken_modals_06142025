// src/components/dashboard/RFMSegmentDetailModal.js
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
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
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
        flexDirection: 'column'
      }}
      className={`full-modal-slide-in ${isClosing ? 'full-modal-slide-out' : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        style={{ 
          width: '100%',
          height: '100%',
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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexShrink: 0
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
                  border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  marginRight: '1rem',
                  transition: 'all 0.2s ease'
                }}
                className="hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx,
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    borderRadius: '50%',
                    backgroundColor: segmentColor,
                    marginRight: '0.75rem'
                  }}></div>
                  {segment || "Champions"} Segment
                </h2>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  Detailed RFM analysis and customer insights
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
                  border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  marginLeft: '1rem',
                  transition: 'all 0.2s ease'
                }}
                className="hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: COLORS.onyxMedium,
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="hover:bg-gray-50"
              >
                <Filter size={16} style={{ marginRight: '0.5rem' }} />
                {comparisonPeriod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
          flexShrink: 0
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
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: activeTab === tab.id ? segmentColor : COLORS.onyxMedium,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${segmentColor}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Modal Body - Scrollable Content */}
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
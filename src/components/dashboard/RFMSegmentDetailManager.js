// src/components/dashboard/RFMSegmentDetailManager.js
import React, { useState, useEffect } from 'react';
import RFMSegmentDetailModal from './RFMSegmentDetailModal';
import { rfmSegments } from '../../data/RFMAnalyticsData';

/**
 * Manager component for RFM segment navigation
 * This component handles the state and navigation logic between different RFM segments
 */
const RFMSegmentDetailManager = ({ 
  initialSegment,
  isOpen, 
  onClose,
  comparisonPeriod = 'last_30_days',
  onImplementRecommendation = null
}) => {
  // FIXED: Set a default segment (Champions) if initialSegment is null
  const [currentSegment, setCurrentSegment] = useState(initialSegment || "Champions");
  
  // Update segment when initialSegment changes from parent
  useEffect(() => {
    if (initialSegment) {
      // Find the proper case version from our list
      const matchedSegment = rfmSegments.find(s => s.toLowerCase() === initialSegment.toLowerCase());
      setCurrentSegment(matchedSegment || initialSegment);
    } else if (isOpen) {
      // If modal is open but no segment specified, use a default
      setCurrentSegment("Champions");
    }
  }, [initialSegment, isOpen]);
  
  // Navigate to the next segment
  const handleNextSegment = () => {
    const currentIndex = rfmSegments.findIndex(s => s.toLowerCase() === (currentSegment || "").toLowerCase());
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % rfmSegments.length;
      setCurrentSegment(rfmSegments[nextIndex]);
    } else {
      // Default to first segment if current not found
      setCurrentSegment(rfmSegments[0]);
    }
  };
  
  // Navigate to the previous segment
  const handlePrevSegment = () => {
    const currentIndex = rfmSegments.findIndex(s => s.toLowerCase() === (currentSegment || "").toLowerCase());
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + rfmSegments.length) % rfmSegments.length;
      setCurrentSegment(rfmSegments[prevIndex]);
    } else {
      // Default to first segment if current not found
      setCurrentSegment(rfmSegments[0]);
    }
  };
  
  // Pass segment navigation functions and implementation handler to the detail modal
  return (
    <RFMSegmentDetailModal
      segment={currentSegment}
      isOpen={isOpen}
      onClose={onClose}
      comparisonPeriod={comparisonPeriod}
      onNextSegment={handleNextSegment}
      onPrevSegment={handlePrevSegment}
      onImplementRecommendation={onImplementRecommendation}
    />
  );
};

export default RFMSegmentDetailManager;
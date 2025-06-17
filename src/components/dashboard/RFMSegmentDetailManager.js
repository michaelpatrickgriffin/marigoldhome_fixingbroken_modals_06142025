// src/components/dashboard/RFMSegmentDetailManager.js
import React, { useState, useEffect } from 'react';
import RFMSegmentDetailModal from './RFMSegmentDetailModal';

const DEFAULT_RFM_SEGMENTS = [
  "Champions",
  "Loyal Customers", 
  "Potential Loyalists",
  "At Risk",
  "Can't Lose Them"
];

let rfmSegments = DEFAULT_RFM_SEGMENTS;
try {
  const data = require('../../data/RFMAnalyticsData');
  if (data.rfmSegments && Array.isArray(data.rfmSegments)) {
    rfmSegments = data.rfmSegments;
  }
} catch (error) {
  console.warn('Using default RFM segments');
}

const RFMSegmentDetailManager = ({ 
  initialSegment,
  isOpen, 
  onClose,
  comparisonPeriod = 'last_30_days',
  onImplementRecommendation = null
}) => {
  const [currentSegment, setCurrentSegment] = useState(initialSegment || "Champions");

  useEffect(() => {
    if (initialSegment) {
      const matchedSegment = rfmSegments.find(s => 
        s.toLowerCase() === initialSegment.toLowerCase()
      );
      setCurrentSegment(matchedSegment || initialSegment);
    } else if (isOpen) {
      setCurrentSegment("Champions");
    }
  }, [initialSegment, isOpen]);
  
  const handleNextSegment = () => {
    const currentIndex = rfmSegments.findIndex(s => 
      s.toLowerCase() === (currentSegment || "").toLowerCase()
    );
    
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % rfmSegments.length;
      setCurrentSegment(rfmSegments[nextIndex]);
    } else {
      setCurrentSegment(rfmSegments[0]);
    }
  };
  
  const handlePrevSegment = () => {
    const currentIndex = rfmSegments.findIndex(s => 
      s.toLowerCase() === (currentSegment || "").toLowerCase()
    );
    
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + rfmSegments.length) % rfmSegments.length;
      setCurrentSegment(rfmSegments[prevIndex]);
    } else {
      setCurrentSegment(rfmSegments[0]);
    }
  };

  const handleImplementRecommendation = (recommendation) => {
    if (onImplementRecommendation) {
      onImplementRecommendation(recommendation);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <RFMSegmentDetailModal
      segment={currentSegment}
      isOpen={isOpen}
      onClose={onClose}
      comparisonPeriod={comparisonPeriod}
      onNextSegment={handleNextSegment}
      onPrevSegment={handlePrevSegment}
      onImplementRecommendation={handleImplementRecommendation}
    />
  );
};

export default RFMSegmentDetailManager;
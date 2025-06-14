// src/components/dashboard/DefaultDashboardContent.js
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DefaultDashboardContent = ({ 
  summaryText, 
  focusAreas, 
  highlightKeywords 
}) => {
  return (
    <div>
      {/* Summary text */}
      <div className="summary-text">
        {highlightKeywords(summaryText.trim())}
      </div>
      
      {/* Focus areas with alert design */}
      <div className="focus-area">
        <div className="focus-pattern"></div>
        
        <div className="focus-content">
          <AlertTriangle size={24} color="#F57F17" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
          <p className="focus-text">
            {highlightKeywords(focusAreas.trim())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardContent;
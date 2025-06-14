// src/components/dashboard/DashboardKpiCards.js
import React from 'react';
import { 
  DollarSign, Users, Target, Award, TrendingUp, ShoppingBag
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Dashboard KPI Cards component styled to match RFM dashboard
const DashboardKpiCards = ({ data, onClick }) => {
  // Map icon names to components
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'DollarSign': return DollarSign;
      case 'Users': return Users;
      case 'Target': return Target;
      case 'Award': return Award;
      case 'TrendingUp': return TrendingUp;
      case 'ShoppingBag': return ShoppingBag;
      default: return DollarSign;
    }
  };
  
  // Map iconBg class to the appropriate icon color
  const getIconColor = (iconBgClass) => {
    switch(iconBgClass) {
      case 'kpi-icon-bg-revenue': return '#4CAF50';  // Green
      case 'kpi-icon-bg-customers': return '#2196F3'; // Blue
      case 'kpi-icon-bg-engagement': return '#FFC107'; // Yellow/Amber
      case 'kpi-icon-bg-conversion': return '#9C27B0'; // Purple
      case 'kpi-icon-bg-audience': return '#F44336';  // Red
      default: return '#2196F3'; // Default to blue
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {data.map((kpi, index) => {
        const IconComponent = getIconComponent(kpi.icon);
        
        return (
          <div 
            key={index} 
            className="w-full"
            onClick={() => onClick && onClick(kpi)}
            style={{ cursor: 'pointer' }}
          >
            <div className="kpi-card">
              <div className="kpi-card-content">
                {/* Icon Container - styled like in RFM dashboard */}
                                <div className={`kpi-icon-container ${kpi.iconBg}`} style={{ 
                  alignSelf: 'flex-start' // Important styling from RFM dashboard
                }}>
                  <IconComponent size={20} color={getIconColor(kpi.iconBg)} />
                </div>
                
                {/* Text Container - styled like in RFM dashboard */}
                <div className="kpi-text-container" style={{ width: '100%' }}>
                  <p className="kpi-title">{kpi.title}</p>
                  
                  {/* Value and change indicator with inline styling for alignment */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p className="kpi-value" style={{ marginBottom: '0' }}>{kpi.value}</p>
                    {kpi.change && (
                      <span className={`kpi-change ${kpi.changeColor === '#81C784' || kpi.changeColor === COLORS.green ? 'kpi-change-positive' : 'kpi-change-negative'}`} style={{ marginLeft: '0.5rem' }}>
                        {kpi.change}
                      </span>
                    )}
                  </div>
                  
                  {/* Secondary text if available */}
                  {kpi.secondaryText && (
                    <p className="kpi-secondary-text">
                      {kpi.secondaryText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardKpiCards;
// src/components/campaigns/detail/recommendations/RecommendationCard.js
import React from 'react';
import { Check, X, Edit } from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../../../styles/ColorStyles';
import RecommendationDetails from './RecommendationDetails';

const RecommendationCard = ({ 
  recommendation, 
  campaign,
  isExpanded, 
  onToggleExpand, 
  onImplement, 
  onModify, 
  onReject 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg border ${isExpanded ? 'border-emerald-600' : 'border-gray-200'} shadow-sm overflow-hidden`}
    >
      {/* Header (always visible) */}
      <div 
        className={`p-5 cursor-pointer transition-colors ${
          isExpanded ? 'bg-emerald-50' : 'hover:bg-gray-50'
        }`}
        onClick={onToggleExpand}
      >
        <div className="flex justify-between items-start">
          <div className="w-[calc(100%-110px)]">
            {/* Tags/badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                style={{ 
                  color: getImpactColor(recommendation.impact),
                  backgroundColor: `${getImpactColor(recommendation.impact)}15`,
                }}
              >
                {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
              </span>
              
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                style={{ 
                  color: getDifficultyColor(recommendation.difficulty),
                  backgroundColor: `${getDifficultyColor(recommendation.difficulty)}15`,
                }}
              >
                {recommendation.difficulty.charAt(0).toUpperCase() + recommendation.difficulty.slice(1)} Difficulty
              </span>
              
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
              >
                {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
              </span>
            </div>
            
            {/* Title */}
            <h4 className="text-base font-semibold mb-2" style={{ color: COLORS.onyx }}>
              {recommendation.title}
            </h4>
            
            {/* Preview of description */}
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {recommendation.description}
            </p>
            
            {/* Expand/collapse indicator */}
            <div className="flex items-center text-sm font-medium text-emerald-700">
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </>
              ) : (
                <>
                  <span>Show details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <ActionButton 
              icon={<Check size={16} />}
              title="Implement"
              color={COLORS.green}
              bgColor="rgba(76, 175, 80, 0.1)"
              onClick={(e) => {
                e.stopPropagation();
                onImplement();
              }}
            />
            
            <ActionButton 
              icon={<Edit size={16} />}
              title="Modify"
              color={COLORS.blue}
              bgColor="rgba(33, 150, 243, 0.1)"
              onClick={(e) => {
                e.stopPropagation();
                onModify();
              }}
            />
            
            <ActionButton 
              icon={<X size={16} />}
              title="Reject"
              color={COLORS.red}
              bgColor="rgba(244, 67, 54, 0.1)"
              onClick={(e) => {
                e.stopPropagation();
                onReject();
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && (
        <RecommendationDetails 
          recommendation={recommendation}
          campaign={campaign}
          onImplement={onImplement}
          onModify={onModify}
          onReject={onReject}
        />
      )}
    </div>
  );
};

// Helper component for the action buttons
const ActionButton = ({ icon, title, color, bgColor, onClick }) => (
  <button 
    onClick={onClick}
    title={title}
    className="w-9 h-9 flex items-center justify-center rounded"
    style={{ backgroundColor: bgColor, color: color }}
  >
    {icon}
  </button>
);

export default RecommendationCard;
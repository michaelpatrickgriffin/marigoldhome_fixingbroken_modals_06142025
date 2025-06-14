// src/components/campaigns/detail/recommendations/RecommendationDetails.js
import React from 'react';
import { Check, Edit, X } from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../../../styles/ColorStyles';

const RecommendationDetails = ({ recommendation, campaign, onImplement, onModify, onReject }) => {
  return (
    <div className="px-6 pb-6">
      {/* Why This Matters section */}
      <div className="p-4 bg-emerald-50 border-l-3 border-emerald-700 rounded mb-6">
        <h5 className="text-sm font-semibold mb-2" style={{ color: COLORS.onyx }}>
          Why This Matters
        </h5>
        <p className="text-sm text-gray-600">
          {recommendation.type === 'expansion' && 
            `Expanding your audience reach can significantly increase campaign impact. Based on similar audience segments, we project that implementing this expansion could drive higher engagement while maintaining conversion rates.`}
          {recommendation.type === 'enhancement' && 
            `Adding personalized elements to your campaign can dramatically improve engagement metrics. Our data shows that personalized content typically increases click-through rates by 15-25% and conversion rates by 10-20%.`}
          {recommendation.type === 'timing' && 
            `Strategic timing can significantly affect campaign performance. This recommendation is based on audience activity patterns and competitor analysis to ensure maximum visibility and engagement.`}
          {recommendation.type === 'optimization' && 
            `Optimizing campaign elements addresses specific performance bottlenecks. This recommendation targets key drop-off points in your conversion funnel to improve overall campaign effectiveness.`}
          {recommendation.type === 'targeting' && 
            `Refined targeting helps allocate resources to the highest-value audience segments. This approach typically improves ROI while maintaining or increasing overall revenue impact.`}
          {recommendation.type === 'adjustment' && 
            `Small adjustments to campaign parameters can yield outsized results. This recommendation fine-tunes specific elements based on performance data to optimize campaign outcomes.`}
          {(recommendation.type !== 'expansion' && 
            recommendation.type !== 'enhancement' && 
            recommendation.type !== 'timing' && 
            recommendation.type !== 'optimization' && 
            recommendation.type !== 'targeting' && 
            recommendation.type !== 'adjustment') && 
            `This recommendation is designed to improve campaign performance based on data-driven insights and industry best practices. Implementing it should help achieve better results aligned with your campaign objectives.`}
        </p>
      </div>
      
      {/* Impact metrics section */}
      <div className="p-4 bg-gray-50 rounded mb-6">
        <div className="grid grid-cols-3 gap-4">
          <MetricDetail 
            label="Estimated Impact"
            value={recommendation.impact === 'high' ? 'High (+30-50%)' : 
                   recommendation.impact === 'medium' ? 'Medium (+10-30%)' : 'Low (+1-10%)'}
            dotColor={getImpactColor(recommendation.impact)}
          />
          
          <MetricDetail 
            label="Implementation Effort"
            value={recommendation.difficulty === 'easy' ? 'Easy (1-2 hours)' : 
                  recommendation.difficulty === 'medium' ? 'Medium (1-2 days)' : 'Hard (1+ weeks)'}
            dotColor={getDifficultyColor(recommendation.difficulty)}
          />
          
          <MetricDetail 
            label="Type"
            value={recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
            dotColor={COLORS.onyxMedium}
          />
        </div>
      </div>
      
      {/* Projected results */}
      <div className="border border-gray-200 rounded mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h5 className="text-sm font-semibold" style={{ color: COLORS.onyx }}>
            Projected Results
          </h5>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <ProjMetric 
              label="Current Opens"
              value={campaign.opened ? campaign.opened.toLocaleString() : 'N/A'}
            />
            
            <ProjMetric 
              label="Projected Opens"
              value={campaign.opened ? Math.round(campaign.opened * (
                recommendation.impact === 'high' ? 1.4 : 
                recommendation.impact === 'medium' ? 1.2 : 1.05
              )).toLocaleString() : 'N/A'}
              isProjected={true}
            />
            
            <ProjMetric 
              label="Current Revenue"
              value={campaign.revenue ? `$${campaign.revenue.toLocaleString()}` : 'N/A'}
            />
            
            <ProjMetric 
              label="Projected Revenue"
              value={campaign.revenue ? `$${Math.round(campaign.revenue * (
                recommendation.impact === 'high' ? 1.4 : 
                recommendation.impact === 'medium' ? 1.2 : 1.05
              )).toLocaleString()}` : 'N/A'}
              isProjected={true}
            />
          </div>
          
          {/* ROI improvement */}
          <div className="mt-4 p-3 bg-green-50 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600 mb-1">Current ROI</p>
                <p className="text-base font-semibold" style={{ color: COLORS.onyx }}>
                  {campaign.roi ? `${campaign.roi}%` : 'N/A'}
                </p>
              </div>
              
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Projected ROI</p>
                <p className="text-base font-semibold" style={{ color: COLORS.green }}>
                  {campaign.roi ? `${Math.round(campaign.roi * (
                    recommendation.impact === 'high' ? 1.45 : 
                    recommendation.impact === 'medium' ? 1.25 : 1.1
                  ))}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Implementation notes */}
      <div className="p-4 bg-blue-50 border-l-3 border-blue-500 rounded mb-6">
        <h5 className="text-sm font-semibold mb-2" style={{ color: COLORS.onyx }}>
          Implementation Notes
        </h5>
        <p className="text-sm text-gray-600">
          {recommendation.difficulty === 'easy' && 
            `This recommendation can be implemented quickly with minimal resources. It typically requires simple configuration changes in your campaign settings without the need for additional approvals or complex setup.`}
          {recommendation.difficulty === 'medium' && 
            `This recommendation requires moderate effort to implement. You may need to prepare additional content, segment your audience differently, or coordinate with other team members. Plan for 1-2 days of implementation work.`}
          {recommendation.difficulty === 'hard' && 
            `This recommendation involves significant changes to your campaign strategy. It may require additional resources, stakeholder approvals, and careful planning. Consider assigning a dedicated team member to coordinate implementation.`}
        </p>
        
        {/* Timeline visualization */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Estimated Implementation Timeline
          </p>
          <div className="h-2 bg-gray-100 rounded relative mt-2">
            <div 
              className="absolute h-full bg-blue-500 rounded"
              style={{ 
                width: recommendation.difficulty === 'easy' ? '25%' : 
                       recommendation.difficulty === 'medium' ? '50%' : '90%'
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Hours</span>
            <span className="text-xs text-gray-500">Days</span>
            <span className="text-xs text-gray-500">Weeks</span>
          </div>
        </div>
      </div>
      
      {/* Best practices */}
      <div className="p-4 bg-green-50 border-l-3 border-green-500 rounded mb-6">
        <h5 className="text-sm font-semibold mb-2" style={{ color: COLORS.onyx }}>
          Implementation Best Practices
        </h5>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          {recommendation.type === 'expansion' && (
            <>
              <li className="mb-1">Gradually roll out to new audience segments to monitor performance</li>
              <li className="mb-1">Test messaging variations with the new audience segments</li>
              <li className="mb-1">Set up separate tracking for the expanded audience to measure incremental impact</li>
            </>
          )}
          {recommendation.type === 'enhancement' && (
            <>
              <li className="mb-1">Ensure personalized elements are accurate and relevant to each segment</li>
              <li className="mb-1">Test all personalization logic before full deployment</li>
              <li className="mb-1">Include fallback options for users with incomplete profile data</li>
            </>
          )}
          {recommendation.type === 'timing' && (
            <>
              <li className="mb-1">Verify that all stakeholders are aware of the schedule changes</li>
              <li className="mb-1">Update all campaign monitoring alerts to align with new timing</li>
              <li className="mb-1">Consider time zone differences when scheduling global campaigns</li>
            </>
          )}
          {(recommendation.type !== 'expansion' && 
            recommendation.type !== 'enhancement' && 
            recommendation.type !== 'timing') && (
            <>
              <li className="mb-1">Document the changes implemented for future reference</li>
              <li className="mb-1">Set up proper tracking to measure the impact of the recommendation</li>
              <li className="mb-1">Schedule a follow-up review to evaluate results and make further adjustments</li>
            </>
          )}
        </ul>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button 
          onClick={onImplement}
          className="px-4 py-2 bg-green-500 text-white rounded font-medium text-sm hover:bg-green-600 flex items-center"
        >
          <Check size={16} className="mr-2" />
          Implement
        </button>
        
        <button 
          onClick={onModify}
          className="px-4 py-2 bg-blue-500 text-white rounded font-medium text-sm hover:bg-blue-600 flex items-center"
        >
          <Edit size={16} className="mr-2" />
          Modify
        </button>
        
        <button 
          onClick={onReject}
          className="px-4 py-2 border border-red-500 text-red-500 rounded font-medium text-sm hover:bg-red-50 flex items-center"
        >
          <X size={16} className="mr-2" />
          Reject
        </button>
      </div>
    </div>
  );
};

// Helper components
const MetricDetail = ({ label, value, dotColor }) => (
  <div className="flex items-center gap-2">
    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dotColor }}></div>
    <div>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="text-sm font-semibold" style={{ color: COLORS.onyx }}>{value}</p>
    </div>
  </div>
);

const ProjMetric = ({ label, value, isProjected = false }) => (
  <div>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    <p 
      className="text-base font-semibold" 
      style={{ color: isProjected ? COLORS.green : COLORS.onyx }}
    >
      {value}
    </p>
  </div>
);

export default RecommendationDetails;
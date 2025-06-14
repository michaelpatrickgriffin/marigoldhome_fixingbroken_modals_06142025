// src/components/campaigns/detail/CampaignOverviewTab.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Check, Mail, Plus, Edit, X } from 'lucide-react';
import { COLORS, getImpactColor, getDifficultyColor } from '../../../styles/ColorStyles';

// Helper to generate engagement data based on campaign
const generateEngagementData = (campaign) => {
  if (!campaign) return [];
  
  // Base data shape
  return Array(7).fill().map((_, index) => {
    const day = `Day ${index + 1}`;
    const factor = (campaign.roi || 0) > 0 ? 1.2 : 0.8;
    const randomVariation = () => 0.7 + (Math.random() * 0.6);
    
    const opened = campaign.opened || 0;
    const baseOpens = Math.round((opened / 7) * randomVariation() * (7 - index) / 7);
    const baseClicks = Math.round(baseOpens * 0.15 * randomVariation() * factor);
    const baseConversions = Math.round(baseClicks * 0.08 * randomVariation() * factor);
    
    return { day, opens: baseOpens, clicks: baseClicks, conversions: baseConversions };
  });
};

const CampaignOverviewTab = ({ campaign, onImplement, setActiveTab }) => {
  const engagementData = generateEngagementData(campaign);
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Attention Alert - Show at the top if needed */}
      {campaign.needsAttention && (
        <div className="col-span-3">
          <section>
            <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              Campaign Needs Attention
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
              <p className="text-base font-medium text-gray-800 mb-4">
                {campaign.attentionReason}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                This campaign requires immediate action to improve performance. Review the recommendations tab for specific actions that can be taken.
              </p>
              <button 
                onClick={() => setActiveTab('recommendations')}
                className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md font-medium text-sm hover:bg-red-600"
              >
                View Recommendations
              </button>
            </div>
          </section>
        </div>
      )}
      
      {/* Left Column: Campaign Details & Performance */}
      <div className="col-span-2 flex flex-col gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.onyx }}>
            Campaign Details
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-3 gap-6">
              <MetricItem label="Status" value={
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              } />
              
              <MetricItem label="Type" value={campaign.type} />
              <MetricItem label="Audience" value={campaign.audience} />
              
              <MetricItem 
                label="Emails Sent" 
                value={campaign.sent ? campaign.sent.toLocaleString() : 'Not sent'} 
              />
              
              <MetricItem 
                label="Opens" 
                value={
                  <>{campaign.opened ? campaign.opened.toLocaleString() : 'N/A'}
                  {campaign.sent > 0 && (
                    <span className="text-gray-500 text-xs ml-1">
                      ({Math.round(campaign.opened / campaign.sent * 100)}%)
                    </span>
                  )}</>
                } 
              />
              
              <MetricItem 
                label="Conversions" 
                value={
                  <>{campaign.conversion ? campaign.conversion.toLocaleString() : 'N/A'}
                  {campaign.opened > 0 && (
                    <span className="text-gray-500 text-xs ml-1">
                      ({Math.round(campaign.conversion / campaign.opened * 100)}%)
                    </span>
                  )}</>
                } 
              />
              
              <MetricItem 
                label="Revenue" 
                value={`$${campaign.revenue.toLocaleString()}`} 
              />
              
              <MetricItem 
                label="Cost" 
                value={`$${campaign.cost.toLocaleString()}`} 
              />
              
              <MetricItem 
                label="ROI" 
                value={`${campaign.roi}%`}
                valueStyle={{ color: campaign.roi > 0 ? COLORS.green : COLORS.red }}
              />
            </div>
          </div>
        </section>
        
        {/* Performance Snapshot */}
        <section>
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.onyx }}>
            Campaign Performance Snapshot
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <KpiCard 
                label="Open Rate"
                value={campaign.sent > 0 ? `${Math.round(campaign.opened / campaign.sent * 100)}%` : 'N/A'}
                comparison="vs. 32% avg for this type"
                bgColor="rgba(76, 175, 80, 0.1)"
              />
              
              <KpiCard 
                label="Click-through Rate"
                value={campaign.opened > 0 ? `${Math.round(campaign.conversion * 1.5 / campaign.opened * 100)}%` : 'N/A'}
                comparison="vs. 4.5% avg for this type"
                bgColor="rgba(33, 150, 243, 0.1)"
              />
              
              <KpiCard 
                label="Conversion Rate"
                value={campaign.opened > 0 ? `${Math.round(campaign.conversion / campaign.opened * 100)}%` : 'N/A'}
                comparison="vs. 2.8% avg for this type"
                bgColor="rgba(255, 193, 7, 0.1)"
              />
            </div>
            
            <div className="h-48">
              <p className="text-sm font-medium text-gray-600 mb-3">
                Daily Engagement Trend
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="opens" stroke="#4CAF50" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="clicks" stroke="#2196F3" />
                  <Line type="monotone" dataKey="conversions" stroke="#FFC107" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
      
      {/* Right Column: Quick Actions & Top Recommendation */}
      <div className="col-span-1">
        <section>
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.onyx }}>
            Quick Actions
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col gap-4">
              <QuickActionButton 
                icon={<Plus size={16} />}
                label="Duplicate Campaign"
                color={COLORS.green}
                bgColor="rgba(76, 175, 80, 0.1)"
              />
              
              <QuickActionButton 
                icon={<Edit size={16} />}
                label="Edit Campaign"
                color={COLORS.blue}
                bgColor="rgba(33, 150, 243, 0.1)"
              />
              
              <QuickActionButton 
                icon={<X size={16} />}
                label="Pause Campaign"
                color={COLORS.yellow}
                bgColor="rgba(255, 193, 7, 0.1)"
              />
            </div>
          </div>
        </section>
        
        {campaign.recommendations?.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.onyx }}>
              Top Recommendation
            </h3>
            <div 
              className="bg-white p-6 rounded-lg shadow-sm" 
              style={{ 
                borderLeft: campaign.needsAttention ? '4px solid #F44336' : '4px solid transparent' 
              }}
            >
              <h4 className="text-base font-semibold mb-2" style={{ color: COLORS.onyx }}>
                {campaign.recommendations[0].title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {campaign.recommendations[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                  style={{ 
                    color: getImpactColor(campaign.recommendations[0].impact),
                    backgroundColor: `${getImpactColor(campaign.recommendations[0].impact)}15`,
                  }}
                >
                  {campaign.recommendations[0].impact.charAt(0).toUpperCase() + campaign.recommendations[0].impact.slice(1)} Impact
                </span>
                
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                  style={{ 
                    color: getDifficultyColor(campaign.recommendations[0].difficulty),
                    backgroundColor: `${getDifficultyColor(campaign.recommendations[0].difficulty)}15`,
                  }}
                >
                  {campaign.recommendations[0].difficulty.charAt(0).toUpperCase() + campaign.recommendations[0].difficulty.slice(1)} Difficulty
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onImplement(campaign.recommendations[0])}
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded font-medium text-sm hover:bg-green-600"
                >
                  <Check size={16} className="mr-1" />
                  Implement
                </button>
                
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className="inline-flex items-center px-4 py-2 text-emerald-800 rounded font-medium text-sm hover:bg-gray-50"
                >
                  View All
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Helper Components
const MetricItem = ({ label, value, valueStyle = {} }) => (
  <div>
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    <p className="text-sm font-semibold" style={{ color: COLORS.onyx, ...valueStyle }}>
      {value}
    </p>
  </div>
);

const KpiCard = ({ label, value, comparison, bgColor }) => (
  <div className="p-4 rounded" style={{ backgroundColor: bgColor }}>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    <p className="text-xl font-semibold mb-1" style={{ color: COLORS.onyx }}>{value}</p>
    <p className="text-xs text-gray-600">{comparison}</p>
  </div>
);

const QuickActionButton = ({ icon, label, color, bgColor }) => (
  <button 
    className="flex items-center justify-start w-full px-4 py-3 rounded font-medium text-sm"
    style={{ backgroundColor: bgColor, color: color }}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </button>
);

export default CampaignOverviewTab;
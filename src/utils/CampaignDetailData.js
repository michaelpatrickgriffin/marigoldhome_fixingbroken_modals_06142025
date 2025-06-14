// src/utils/CampaignDetailData.js
// Utility functions for generating campaign detail data

import { COLORS } from '../styles/ColorStyles';
import { Mail, Users, Target, TrendingUp } from 'lucide-react';

export const generateEngagementData = (campaign) => {
  if (!campaign || campaign.sent === 0) {
    return [];
  }

  const baseOpens = campaign.opened;
  const baseClicks = campaign.conversion;
  
  return [
    { time: '1h', opens: Math.round(baseOpens * 0.15), clicks: Math.round(baseClicks * 0.12) },
    { time: '2h', opens: Math.round(baseOpens * 0.28), clicks: Math.round(baseClicks * 0.25) },
    { time: '4h', opens: Math.round(baseOpens * 0.45), clicks: Math.round(baseClicks * 0.42) },
    { time: '8h', opens: Math.round(baseOpens * 0.68), clicks: Math.round(baseClicks * 0.65) },
    { time: '12h', opens: Math.round(baseOpens * 0.82), clicks: Math.round(baseClicks * 0.78) },
    { time: '24h', opens: Math.round(baseOpens * 0.95), clicks: Math.round(baseClicks * 0.92) },
    { time: '48h', opens: baseOpens, clicks: baseClicks }
  ];
};

export const generateDeviceData = (campaign) => {
  return [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 28 },
    { name: 'Tablet', value: 7 }
  ];
};

export const generateTimeData = (campaign) => {
  return [
    { hour: '6AM', opens: 245 },
    { hour: '8AM', opens: 523 },
    { hour: '10AM', opens: 678 },
    { hour: '12PM', opens: 445 },
    { hour: '2PM', opens: 567 },
    { hour: '4PM', opens: 423 },
    { hour: '6PM', opens: 234 },
    { hour: '8PM', opens: 156 }
  ];
};

export const generateAudienceData = (campaign) => {
  return [
    { segment: 'New Customers', openRate: 18.5 },
    { segment: 'Returning', openRate: 24.2 },
    { segment: 'VIP Members', openRate: 31.8 },
    { segment: 'Inactive', openRate: 12.3 }
  ];
};

export const generatePerformanceMetrics = (campaign) => {
  if (!campaign || campaign.sent === 0) {
    return [
      {
        label: 'Open Rate',
        value: 'N/A',
        subtext: 'No data available',
        icon: <Mail size={16} color={COLORS.blue} />,
        bgColor: 'rgba(33, 150, 243, 0.05)'
      },
      {
        label: 'Click Rate',
        value: 'N/A',
        subtext: 'No data available',
        icon: <Target size={16} color={COLORS.evergreen} />,
        bgColor: 'rgba(26, 76, 73, 0.05)'
      },
      {
        label: 'Conversion Rate',
        value: 'N/A',
        subtext: 'No data available',
        icon: <TrendingUp size={16} color={COLORS.green} />,
        bgColor: 'rgba(76, 175, 80, 0.05)'
      },
      {
        label: 'Total Revenue',
        value: 'N/A',
        subtext: 'No data available',
        icon: <Users size={16} color={COLORS.yellow} />,
        bgColor: 'rgba(255, 193, 7, 0.05)'
      }
    ];
  }

  const openRate = Math.round((campaign.opened / campaign.sent) * 100);
  const clickRate = Math.round((campaign.conversion / campaign.opened) * 100);
  const conversionRate = Math.round((campaign.conversion / campaign.sent) * 100);

  return [
    {
      label: 'Open Rate',
      value: `${openRate}%`,
      subtext: `${campaign.opened.toLocaleString()} opens`,
      icon: <Mail size={16} color={COLORS.blue} />,
      bgColor: 'rgba(33, 150, 243, 0.05)'
    },
    {
      label: 'Click Rate',
      value: `${clickRate}%`,
      subtext: `${campaign.conversion.toLocaleString()} clicks`,
      icon: <Target size={16} color={COLORS.evergreen} />,
      bgColor: 'rgba(26, 76, 73, 0.05)'
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      subtext: 'of total sent',
      icon: <TrendingUp size={16} color={COLORS.green} />,
      bgColor: 'rgba(76, 175, 80, 0.05)'
    },
    {
      label: 'Total Revenue',
      value: `$${campaign.revenue?.toLocaleString() || '0'}`,
      subtext: `ROI: ${campaign.roi}%`,
      icon: <Users size={16} color={COLORS.yellow} />,
      bgColor: 'rgba(255, 193, 7, 0.05)'
    }
  ];
};

export const generateContentPerformance = (campaign) => {
  return [
    { section: 'Header', clicks: 245, rate: 12.3 },
    { section: 'Main CTA', clicks: 567, rate: 28.4 },
    { section: 'Product Links', clicks: 334, rate: 16.7 },
    { section: 'Footer', clicks: 89, rate: 4.5 }
  ];
};

export const generateEmailClientData = () => {
  return [
    { client: 'Gmail', opens: 45.2 },
    { client: 'Outlook', opens: 28.7 },
    { client: 'Apple Mail', opens: 18.1 },
    { client: 'Yahoo', opens: 5.3 },
    { client: 'Other', opens: 2.7 }
  ];
};
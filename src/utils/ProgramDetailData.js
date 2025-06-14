// src/utils/ProgramDetailData.js
// Utility functions for generating program detail data

import { COLORS } from '../styles/ColorStyles';
import { Award, Users, Target, TrendingUp, Percent, CreditCard, Gift } from 'lucide-react';

export const generateProgramEngagementData = (program) => {
  if (!program || program.participants === 0) {
    return [];
  }

  const baseParticipants = program.participants;
  const baseRedemptions = program.redemptions || Math.round(baseParticipants * (program.redemptionRate / 100));
  
  return [
    { month: 'Jan', participants: Math.round(baseParticipants * 0.7), redemptions: Math.round(baseRedemptions * 0.6) },
    { month: 'Feb', participants: Math.round(baseParticipants * 0.8), redemptions: Math.round(baseRedemptions * 0.7) },
    { month: 'Mar', participants: Math.round(baseParticipants * 0.85), redemptions: Math.round(baseRedemptions * 0.8) },
    { month: 'Apr', participants: Math.round(baseParticipants * 0.9), redemptions: Math.round(baseRedemptions * 0.85) },
    { month: 'May', participants: Math.round(baseParticipants * 0.95), redemptions: Math.round(baseRedemptions * 0.9) },
    { month: 'Jun', participants: baseParticipants, redemptions: baseRedemptions }
  ];
};

export const generateProgramTierData = (program) => {
  return [
    { tier: 'Explorer', redemptionRate: 15.2, members: 2450 },
    { tier: 'Trailblazer', redemptionRate: 28.7, members: 856 },
    { tier: 'Summit', redemptionRate: 42.3, members: 234 }
  ];
};

export const generateProgramTimeData = (program) => {
  return [
    { month: 'Jan', engagement: 68 },
    { month: 'Feb', engagement: 72 },
    { month: 'Mar', engagement: 75 },
    { month: 'Apr', engagement: 78 },
    { month: 'May', engagement: 74 },
    { month: 'Jun', engagement: 81 }
  ];
};

export const generateProgramRetentionData = (program) => {
  return [
    { month: 'Jan', retention: 82 },
    { month: 'Feb', retention: 79 },
    { month: 'Mar', retention: 85 },
    { month: 'Apr', retention: 87 },
    { month: 'May', retention: 84 },
    { month: 'Jun', retention: program.retentionRate || 82 }
  ];
};

export const generateProgramPerformanceMetrics = (program) => {
  if (!program || program.participants === 0) {
    return [
      {
        label: 'Redemption Rate',
        value: 'N/A',
        subtext: 'No data available',
        icon: <Gift size={16} color={COLORS.evergreen} />,
        bgColor: 'rgba(26, 76, 73, 0.05)',
        iconBg: 'rgba(26, 76, 73, 0.15)'
      },
      {
        label: 'Retention Rate',
        value: 'N/A',
        subtext: 'No data available',
        icon: <Users size={16} color={COLORS.blue} />,
        bgColor: 'rgba(33, 150, 243, 0.05)',
        iconBg: 'rgba(33, 150, 243, 0.15)'
      },
      {
        label: 'Avg Order Value',
        value: 'N/A',
        subtext: 'No data available',
        icon: <CreditCard size={16} color={COLORS.green} />,
        bgColor: 'rgba(76, 175, 80, 0.05)',
        iconBg: 'rgba(76, 175, 80, 0.15)'
      },
      {
        label: 'Program ROI',
        value: 'N/A',
        subtext: 'No data available',
        icon: <TrendingUp size={16} color={COLORS.yellow} />,
        bgColor: 'rgba(255, 193, 7, 0.05)',
        iconBg: 'rgba(255, 193, 7, 0.15)'
      }
    ];
  }

  return [
    {
      label: 'Redemption Rate',
      value: `${program.redemptionRate}%`,
      subtext: `${program.redemptions?.toLocaleString() || '0'} redemptions`,
      icon: <Gift size={16} color={COLORS.evergreen} />,
      bgColor: 'rgba(26, 76, 73, 0.05)',
      iconBg: 'rgba(26, 76, 73, 0.15)'
    },
    {
      label: 'Retention Rate',
      value: `${program.retentionRate}%`,
      subtext: 'member retention',
      icon: <Users size={16} color={COLORS.blue} />,
      bgColor: 'rgba(33, 150, 243, 0.05)',
      iconBg: 'rgba(33, 150, 243, 0.15)'
    },
    {
      label: 'Avg Order Value',
      value: `$${program.avgOrderValue}`,
      subtext: 'per transaction',
      icon: <CreditCard size={16} color={COLORS.green} />,
      bgColor: 'rgba(76, 175, 80, 0.05)',
      iconBg: 'rgba(76, 175, 80, 0.15)'
    },
    {
      label: 'Program ROI',
      value: `${program.roi}%`,
      subtext: `Revenue: $${program.revenue?.toLocaleString() || '0'}`,
      icon: <TrendingUp size={16} color={COLORS.yellow} />,
      bgColor: 'rgba(255, 193, 7, 0.05)',
      iconBg: 'rgba(255, 193, 7, 0.15)'
    }
  ];
};

export const generateProgramRedemptionCategories = (program) => {
  return [
    { name: 'Discounts', value: 45 },
    { name: 'Free Products', value: 30 },
    { name: 'Experiences', value: 15 },
    { name: 'Gift Cards', value: 10 }
  ];
};

export const generateProgramDeviceData = (program) => {
  return [
    { device: 'Mobile App', usage: 58 },
    { device: 'Website', usage: 32 },
    { device: 'In-Store', usage: 10 }
  ];
};

export const generateProgramCohortData = (program) => {
  return [
    { week: 'W1', newMembers: 245, returningMembers: 1456 },
    { week: 'W2', newMembers: 189, returningMembers: 1523 },
    { week: 'W3', newMembers: 234, returningMembers: 1478 },
    { week: 'W4', newMembers: 276, returningMembers: 1634 },
    { week: 'W5', newMembers: 198, returningMembers: 1567 },
    { week: 'W6', newMembers: 223, returningMembers: 1589 }
  ];
};
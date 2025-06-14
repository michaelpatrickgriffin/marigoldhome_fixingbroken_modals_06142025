// src/styles/ProgramDetailStyles.js
// Styles and styling utilities for program detail views

import { COLORS } from './ColorStyles';

// Modal and container styles (same as campaigns)
export const modalOverlayStyle = {
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
};

export const modalHeaderStyle = (needsAttention = false) => ({
  padding: '1.5rem',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: needsAttention ? 'rgba(244, 67, 54, 0.05)' : 'white'
});

export const modalHeaderContentStyle = {
  maxWidth: '80rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem'
};

export const closeButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  color: COLORS.onyxMedium,
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

// Tab styles
export const tabContainerStyle = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white'
};

export const tabContentStyle = {
  maxWidth: '80rem',
  width: '100%',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  display: 'flex',
  gap: '2rem'
};

export const tabButtonStyle = (isActive) => ({
  padding: '1rem 0',
  color: isActive ? COLORS.evergreen : COLORS.onyxMedium,
  fontWeight: isActive ? 600 : 500,
  fontSize: '0.875rem',
  borderBottom: isActive ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center'
});

// Content area styles
export const contentAreaStyle = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center'
};

export const contentWrapperStyle = {
  maxWidth: '80rem',
  width: '100%',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem'
};

// Card styles
export const cardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

export const alertCardStyle = (type = 'danger') => ({
  ...cardStyle,
  borderLeft: `4px solid ${type === 'danger' ? COLORS.red : COLORS.yellow}`
});

// Program-specific performance metric card styles
export const programMetricCardStyle = (bgColor) => ({
  padding: '1.25rem',
  backgroundColor: bgColor,
  borderRadius: '0.5rem',
  display: 'flex',
  flexDirection: 'column'
});

export const programMetricHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75rem'
};

export const programMetricIconStyle = {
  marginRight: '0.75rem'
};

export const programMetricLabelStyle = {
  fontSize: '0.875rem',
  fontWeight: 500,
  color: COLORS.onyxMedium
};

export const programMetricValueStyle = {
  fontSize: '1.5rem',
  fontWeight: 600,
  color: COLORS.onyx,
  marginBottom: '0.25rem'
};

export const programMetricSubtextStyle = {
  fontSize: '0.875rem',
  color: COLORS.onyxMedium
};

// Quick action button styles
export const quickActionButtonStyle = (bgColor, textColor) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0.75rem 1rem',
  backgroundColor: bgColor,
  color: textColor,
  borderRadius: '0.375rem',
  fontWeight: 500,
  fontSize: '0.875rem',
  width: '100%',
  textAlign: 'left',
  border: 'none',
  cursor: 'pointer'
});

// Status badge styles
export const statusBadgeStyle = (status) => {
  const getStatusColors = (status) => {
    switch (status) {
      case 'Active':
      case 'Ongoing':
        return { bg: 'rgba(76, 175, 80, 0.1)', color: COLORS.green };
      case 'Scheduled':
        return { bg: 'rgba(33, 150, 243, 0.1)', color: COLORS.blue };
      default:
        return { bg: 'rgba(201, 202, 203, 0.2)', color: COLORS.onyxMedium };
    }
  };

  const colors = getStatusColors(status);
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    backgroundColor: colors.bg,
    color: colors.color
  };
};

// Recommendation styles
export const recommendationCardStyle = (isExpanded) => ({
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  border: `1px solid ${isExpanded ? COLORS.evergreen : 'rgba(0,0,0,0.1)'}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  overflow: 'hidden'
});

export const recommendationHeaderStyle = (isExpanded) => ({
  padding: '1.25rem 1.5rem',
  cursor: 'pointer',
  backgroundColor: isExpanded ? 'rgba(26, 76, 73, 0.05)' : 'transparent'
});

export const tagStyle = (color, bgColor) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.25rem 0.5rem',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  color: color,
  backgroundColor: bgColor
});

export const actionButtonStyle = (bgColor, textColor) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  backgroundColor: bgColor,
  color: textColor,
  borderRadius: '0.375rem',
  fontWeight: 500,
  fontSize: '0.875rem',
  border: 'none',
  cursor: 'pointer'
});

// Chart colors for programs
export const PROGRAM_CHART_COLORS = ['#1A4C49', '#4D9892', '#4CAF50', '#2196F3', '#FFC107'];

// Progress bar styles
export const progressBarContainerStyle = {
  height: '8px',
  borderRadius: '4px',
  backgroundColor: 'rgba(0,0,0,0.05)',
  marginBottom: '0.75rem'
};

export const progressBarStyle = (width, color) => ({
  height: '100%',
  width: `${width}%`,
  borderRadius: '4px',
  backgroundColor: color
});

// Insight box styles
export const insightBoxStyle = (borderColor, bgColor) => ({
  padding: '1rem',
  backgroundColor: bgColor,
  borderRadius: '0.5rem',
  borderLeft: `3px solid ${borderColor}`,
  marginBottom: '1rem'
});

export const insightTitleStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: COLORS.onyx,
  marginBottom: '0.5rem'
};

export const insightTextStyle = {
  fontSize: '0.875rem',
  color: COLORS.onyxMedium
};

// Program-specific enhanced card styles
export const programEnhancedCardStyle = {
  ...cardStyle,
  background: `
    radial-gradient(circle at 100% 0%, rgba(26, 76, 73, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(26, 76, 73, 0.02) 0%, transparent 50%),
    linear-gradient(to right, white, white)
  `,
  border: '1px solid rgba(26, 76, 73, 0.08)'
};

// Program metric enhanced card component style
export const programMetricEnhancedCardStyle = (bgColor, iconBg) => ({
  padding: '1rem',
  borderRadius: '12px',
  backgroundColor: bgColor,
  border: '1px solid rgba(0,0,0,0.04)',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem'
});

export const programMetricIconContainerStyle = (iconBg) => ({
  width: '2rem',
  height: '2rem',
  borderRadius: '8px',
  backgroundColor: iconBg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
});

// Financial section styles for programs
export const programFinancialSectionStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid rgba(0,0,0,0.06)'
};

export const programFinancialCardStyle = (bgColor, borderColor) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '12px',
  background: bgColor,
  border: `1px solid ${borderColor}`
});

export const programFinancialIconStyle = (iconBg) => ({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '8px',
  backgroundColor: iconBg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '0.75rem'
});
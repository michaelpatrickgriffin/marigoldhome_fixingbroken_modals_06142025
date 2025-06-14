// src/styles/ColorStyles.js
export const COLORS = {
  // Base colors
  evergreen: '#1A4C49',
  evergreenLight: '#4D9892',
  onyx: '#333333',
  onyxMedium: '#666666',
  onyxSoft: '#999999',
  shell: '#F5F7F8',
  
  // Semantic colors
  green: '#4CAF50',
  yellow: '#FFC107',
  red: '#F44336',
  blue: '#2196F3',
  
  // Dark theme colors for cards
  darkShell: '#1e2a2b',
  darkText: 'rgba(255, 255, 255, 0.95)',
  darkTextMedium: 'rgba(255, 255, 255, 0.75)',
  darkTextLight: 'rgba(255, 255, 255, 0.5)',
  darkTeal: '#4D9892',
  darkTealDark: '#1A4C49',
  darkGray: '#637381',
  darkAccent: '#7B9CFF',
  darkSuccess: '#4CAF50',
  darkDanger: '#F44336',
};

// Light card style with subtle shadow
export const lightCardStyle = {
  background: `
    radial-gradient(circle at 100% 0%, rgba(26, 76, 73, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(26, 76, 73, 0.02) 0%, transparent 50%),
    linear-gradient(120deg, #ffffff 0%, #f9fafb 100%)
  `,
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.05)'
};

// Card style for attention needed items with subtle warning indicator
export const attentionCardStyle = {
  background: `
    linear-gradient(120deg, #ffffff 0%, #f9fafb 100%)
  `,
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  borderLeft: '3px solid #FFC107'
};

// Card style for low performance items with subtle indicator
export const lowPerformanceCardStyle = {
  background: `
    linear-gradient(120deg, #ffffff 0%, #f9fafb 100%)
  `,
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  borderLeft: '3px solid #2196F3'
};

// Dark card style with mesh gradient for KPI cards
export const darkCardStyle = {
  background: `
    radial-gradient(circle at 100% 0%, rgba(77, 152, 146, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(26, 76, 73, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, ${COLORS.darkShell} 0%, #1e3635 100%)
  `,
  borderRadius: '0.75rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)'
};

// Dark mesh gradient for KPI cards
export const darkMeshGradient = `
  radial-gradient(circle at 100% 0%, rgba(77, 152, 146, 0.15) 0%, transparent 50%),
  radial-gradient(circle at 0% 100%, rgba(26, 76, 73, 0.1) 0%, transparent 50%),
  linear-gradient(180deg, ${COLORS.darkShell} 0%, #1e3635 100%)
`;

// Helper functions for dynamic colors
export const getImpactColor = (impact) => {
  switch(impact) {
    case 'high':
      return COLORS.green;
    case 'medium':
      return COLORS.blue;
    case 'low':
      return COLORS.yellow;
    default:
      return COLORS.onyxMedium;
  }
};

export const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'easy':
    case 'low':
      return COLORS.green;
    case 'medium':
      return COLORS.blue;
    case 'hard':
    case 'high':
      return COLORS.red;
    default:
      return COLORS.onyxMedium;
  }
};
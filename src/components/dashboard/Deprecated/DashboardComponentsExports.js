// src/components/dashboard/DashboardComponentsExports.js
// This file provides backward compatibility for existing imports
import DashboardKpiCards from './DashboardKpiCards';
import { 
  DashboardRevenueChart as RevenueChart,
  DashboardMembershipChart as MembershipChart,
  DashboardInsightsCard as InsightsCard,
  DashboardChartsContainer
} from './DashboardCharts';

// Export the components with their original names for backward compatibility
export {
  DashboardKpiCards as KpiCards,
  RevenueChart,
  MembershipChart,
  InsightsCard
};

// Also export them with their new names
export {
  DashboardKpiCards,
  DashboardRevenueChart,
  DashboardMembershipChart,
  DashboardInsightsCard,
  DashboardChartsContainer
};

// For default import compatibility
const DashboardComponents = {
  KpiCards: DashboardKpiCards,
  RevenueChart,
  MembershipChart,
  InsightsCard,
  DashboardChartsContainer
};

export default DashboardComponents;
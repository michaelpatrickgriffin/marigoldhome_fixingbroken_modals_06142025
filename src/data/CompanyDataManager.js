// src/data/CompanyDataManager.js - Enhanced with comprehensive Walgreens data
// This keeps your existing SampleData.js completely untouched!

import { COLORS } from '../styles/ColorStyles';
// Import all your existing data
import * as OriginalData from './SampleData';
// ✅ NEW: Import RFM data for outdoor sportswear as fallback
import { 
  rfmKpiData as outdoorRfmKpiData,
  rfmInsightsData as outdoorRfmInsightsData, 
  rfmRecommendations as outdoorRfmRecommendations,
  segmentDistributionData,
  customerValueData,
  retentionRateData,
  getChangeColor,
  rfmKpiData // ✅ Keep original KPI data for both companies
} from './RFMAnalyticsData';

// ===== COMPANY PROFILES =====
export const companyProfiles = [
  {
    id: 'outdoor_sportswear',
    name: 'Outdoor Sportswear Co.',
    logo: 'OS',
    industry: 'Retail - Outdoor Equipment',
    description: 'Premium outdoor gear and adventure equipment retailer',
    color: COLORS.evergreen
  },
  {
    id: 'walgreens',
    name: 'Walgreens Pharmacy',
    logo: 'WG',
    industry: 'Healthcare - Pharmacy',
    description: 'Leading pharmacy chain and healthcare provider',
    color: '#E31837'
  }
];

// ===== COMPANY STATE =====
let currentCompany = 'outdoor_sportswear';

export const setCurrentCompany = (companyId) => {
  currentCompany = companyId;
  console.log('Company switched to:', companyId);
};

export const getCurrentCompany = () => {
  return companyProfiles.find(company => company.id === currentCompany);
};

// ===== ENHANCED WALGREENS DATA =====
const walgreensData = {
  campaigns: [
    {
      id: 3,
      title: "Wellness Rewards Enrollment",
      type: "Program Enrollment",
      status: "Active",
      audience: "Non-Members",
      sent: 156000,
      opened: 31200,
      clicks: 4680,
      conversion: 1560,
      revenue: 93600,
      cost: 28000,
      roi: 234,
      needsAttention: true,
      recommendations: [
        {
          id: "rec-w1-1",
          title: "Healthcare-Focused Value Proposition Redesign",
          description: "Transform messaging from generic 'rewards' to specific health benefits. Replace 'earn points' with 'save on medications' and highlight prescription discounts, health screenings, and wellness consultations as primary benefits. Healthcare-focused messaging could improve enrollment by 67% based on industry benchmarks.",
          difficulty: "medium",
          impact: "high",
          type: "optimization"
        },
        {
          id: "rec-w1-2", 
          title: "Pharmacist-Endorsed Enrollment Campaign",
          description: "Add pharmacist recommendations and endorsements to enrollment materials. Include testimonials from healthcare professionals about program benefits for medication adherence and health outcomes. Professional endorsements increase healthcare program trust by 45% and enrollment conversion by 32%.",
          difficulty: "low",
          impact: "high",
          type: "enhancement"
        }
      ]
    },
    {
      id: 1,
      title: "Flu Shot Reminder Campaign",
      type: "Health Outreach",
      status: "Active", 
      audience: "All Patients",
      sent: 125000,
      opened: 87500,
      clicks: 15750,
      conversion: 8400,
      revenue: 168000,
      cost: 18500,
      roi: 808,
      needsAttention: false,
      recommendations: [
        {
          id: "rec-f1-1",
          title: "Personalized Health Risk Messaging",
          description: "Segment messaging based on patient age, medical history, and chronic conditions. High-risk patients receive urgency-focused messaging while general population gets convenience and protection benefits. Risk-based personalization can increase conversion rates by 28% for healthcare preventive services.",
          difficulty: "medium",
          impact: "medium",
          type: "enhancement"
        },
        {
          id: "rec-f1-2",
          title: "Family and Workplace Flu Shot Coordination",
          description: "Offer family scheduling discounts and workplace flu shot programs. Partner with local employers to provide on-site or coordinated family flu shot appointments. Group scheduling programs typically increase flu shot uptake by 35% and improve customer lifetime value through family engagement.",
          difficulty: "medium",
          impact: "medium",
          type: "expansion"
        }
      ]
    },
    {
      id: 2,
      title: "Prescription Refill Reminders",
      type: "Automated Health",
      status: "Active",
      audience: "Chronic Care Patients",
      sent: 89000,
      opened: 76650,
      clicks: 22300,
      conversion: 18400,
      revenue: 552000,
      cost: 12000,
      roi: 4500,
      needsAttention: false,
      recommendations: [
        {
          id: "rec-p1-1",
          title: "Predictive Refill Optimization with Behavioral Analytics",
          description: "Use medication adherence patterns to predict optimal reminder timing. Send earlier reminders for patients with irregular refill patterns and later reminders for highly adherent patients. Machine learning models can optimize timing based on individual behavior patterns, potentially increasing adherence by 23% and reducing churn by 15%.",
          difficulty: "hard",
          impact: "high",
          type: "optimization"
        },
        {
          id: "rec-p1-2",
          title: "Multi-Medication Synchronization Program",
          description: "Offer medication synchronization to align all prescriptions to the same refill date, reducing pharmacy visits and improving adherence for patients on multiple medications. Sync programs show 40% improvement in medication adherence and 25% increase in patient satisfaction scores.",
          difficulty: "medium",
          impact: "high",
          type: "enhancement"
        }
      ]
    },
    {
      id: 4,
      title: "Health & Wellness Survey Follow-up",
      type: "Engagement",
      status: "Completed",
      audience: "Survey Respondents",
      sent: 24500,
      opened: 19600,
      clicks: 7840,
      conversion: 3920,
      revenue: 117600,
      cost: 8500,
      roi: 1283,
      needsAttention: false,
      recommendations: [
        {
          id: "rec-s1-1",
          title: "Personalized Wellness Journey Creation",
          description: "Use survey responses to create individualized wellness plans with product recommendations, health goal tracking, and quarterly check-in campaigns tailored to each respondent's health interests. Personalized wellness programs increase customer lifetime value by 45% and category engagement by 67%.",
          difficulty: "hard",
          impact: "high",
          type: "enhancement"
        },
        {
          id: "rec-s1-2",
          title: "Survey Insights Product Expansion Strategy",
          description: "Analyze survey data to identify unmet wellness needs and expand product offerings. Use insights to inform inventory decisions and create targeted marketing for high-demand categories. Data-driven product expansion can increase category revenue by 25% and customer satisfaction by 30%.",
          difficulty: "medium",
          impact: "medium",
          type: "expansion"
        }
      ]
    },
    {
      id: 5,
      title: "Vitamin D3 Category Promotion",
      type: "Category Focus",
      status: "Active",
      audience: "Health & Wellness Shoppers",
      sent: 67000,
      opened: 33500,
      clicks: 10050,
      conversion: 4020,
      revenue: 201000,
      cost: 15500,
      roi: 1197,
      needsAttention: false,
      recommendations: [
        {
          id: "rec-v1-1",
          title: "Seasonal Health Education Campaign",
          description: "Create educational content about Vitamin D deficiency risks during winter months, bone health benefits, and immune system support. Include pharmacist-authored articles and seasonal health tips. Educational content increases supplement category engagement by 40% and builds trust in pharmacy expertise.",
          difficulty: "low",
          impact: "medium",
          type: "enhancement"
        },
        {
          id: "rec-v1-2",
          title: "Synergistic Supplement Bundle Strategy",
          description: "Create bundles with Calcium, Magnesium, and K2 supplements that enhance Vitamin D absorption. Offer educational materials about nutrient synergy and optimal supplementation. Bundle strategies typically increase average order value by 35% and improve customer education about complementary health products.",
          difficulty: "low",
          impact: "medium",
          type: "expansion"
        }
      ]
    }
  ],

  kpiCards: [
    {
      title: "Revenue",
      value: "$8.4M",
      change: "+6.2%",
      changeColor: "#4CAF50",
      icon: "DollarSign", 
      iconBg: "kpi-icon-bg-revenue",
      secondaryText: "vs last month"
    },
    {
      title: "Patients",
      value: "124K",
      change: "+4.1%", 
      changeColor: "#4CAF50",
      icon: "Users",
      iconBg: "kpi-icon-bg-customers",
      secondaryText: "active patients"
    },
    {
      title: "Adherence Rate",
      value: "78.5%",
      change: "+2.3%",
      changeColor: "#4CAF50", 
      icon: "Target",
      iconBg: "kpi-icon-bg-engagement",
      secondaryText: "medication adherence"
    },
    {
      title: "Health Program Enrollment", 
      value: "34.2%",
      change: "+1.8%",
      changeColor: "#4CAF50",
      icon: "Award",
      iconBg: "kpi-icon-bg-conversion", 
      secondaryText: "eligible patients enrolled"
    },
    {
      title: "Care Interactions",
      value: "89K",
      change: "+12.4%",
      changeColor: "#4CAF50",
      icon: "ShoppingBag", 
      iconBg: "kpi-icon-bg-audience",
      secondaryText: "monthly interactions"
    }
  ],

  loyaltyPrograms: [
    {
      id: 2,
      title: "Wellness Program",
      type: "Milestone",
      status: "Active",
      audience: "Health-Conscious Patients",
      participants: 34000,
      milestonesCompleted: 12750,
      completionRate: 37.5,
      retentionRate: 82,
      avgOrderValue: 38,
      revenue: 1292000,
      cost: 129200,
      roi: 900,
      needsAttention: true,
      averageMilestonesPerMember: 0.38,
      topMilestoneCategory: "Prescription Adherence",
      recommendations: [
        {
          id: "rec-wp1-1",
          title: "Milestone Structure Simplification and Health Focus",
          description: "Reduce the number of milestones from 8 to 5 and create clearer, more achievable health-focused goals. Replace complex tracking requirements with simple actions like 'Complete Annual Wellness Visit' or 'Fill 3 Prescription Refills On Time'. Health-focused milestones show 67% higher completion rates than generic point-earning activities.",
          difficulty: "medium",
          impact: "high",
          type: "restructure"
        },
        {
          id: "rec-wp1-2",
          title: "Pharmacist-Led Wellness Consultation Rewards",
          description: "Integrate free 15-minute pharmacist consultations as milestone rewards. This adds genuine healthcare value while strengthening the pharmacy relationship and potentially identifying new health needs. Professional consultations as rewards increase program perceived value by 85% and drive 40% more health product purchases.",
          difficulty: "medium",
          impact: "high",
          type: "enhancement"
        }
      ]
    },
    {
      id: 1,
      title: "Prescription Rewards Program",
      type: "Points",
      status: "Active",
      audience: "All Patients",
      participants: 89000,
      pointsEarned: 2680000,
      pointsRedeemed: 1876000,
      redemptionRate: 70.0,
      retentionRate: 94,
      avgOrderValue: 45,
      revenue: 4005000,
      cost: 401000,
      roi: 900,
      needsAttention: false,
      averagePointsPerMember: 30,
      topRewardCategory: "Prescription Discounts",
      recommendations: [
        {
          id: "rec-pr1-1",
          title: "Health Adherence Bonus Points System",
          description: "Award double points for consistent prescription refills and medication adherence milestones. Implement 90-day refill bonuses and streak rewards for patients who maintain their medication schedules. Adherence-based rewards improve medication compliance by 34% and increase program engagement by 45%.",
          difficulty: "medium",
          impact: "high",
          type: "enhancement"
        },
        {
          id: "rec-pr1-2",
          title: "Family Account Linking and Shared Rewards",
          description: "Allow families to pool points across multiple accounts for shared rewards like family flu shots, wellness screenings, or health device purchases. This increases household loyalty and spending while simplifying reward redemption. Family linking programs typically increase household pharmacy spend by 28% and improve retention by 40%.",
          difficulty: "hard",
          impact: "medium",
          type: "expansion"
        }
      ]
    },
    {
      id: 3,
      title: "Health & Wellness Cashback",
      type: "Cashback",
      status: "Active",
      audience: "Health & Wellness Shoppers",
      participants: 45600,
      cashbackEarned: 228000,
      cashbackRedeemed: 182400,
      redemptionRate: 80.0,
      retentionRate: 88,
      avgOrderValue: 52,
      revenue: 2371200,
      cost: 228000,
      roi: 940,
      needsAttention: false,
      averageCashbackPerMember: 5.00,
      topCashbackCategory: "Vitamins & Supplements",
      recommendations: [
        {
          id: "rec-hc1-1",
          title: "Seasonal Health Category Bonus Strategy",
          description: "Implement rotating seasonal bonuses: Cold & Flu season (October-March), Allergy season (April-June), Sun Care (June-August), and Back-to-School Health (August-September) with increased cashback percentages. Seasonal targeting increases category relevance and drives 30% higher engagement during peak health seasons.",
          difficulty: "low",
          impact: "medium",
          type: "enhancement"
        },
        {
          id: "rec-hc1-2",
          title: "Preventive Care Cashback Expansion",
          description: "Extend cashback to preventive care services like vaccinations, health screenings, and wellness consultations. This positions Walgreens as a comprehensive health partner beyond retail. Service-based cashback programs increase healthcare service utilization by 45% and build stronger patient relationships.",
          difficulty: "medium",
          impact: "high",
          type: "expansion"
        }
      ]
    }
  ],

  rfmSegments: [
    {
      id: 'health_champions',
      name: 'Health Champions',
      color: '#E31837',
      recency: 5,
      frequency: 5, 
      monetary: 5,
      description: 'Highly engaged patients with multiple prescriptions and wellness participation',
      memberCount: 15234,
      percentage: 12.3,
      avgSpend: 340,
      orders: 12.4,
      insight: 'Peak health engagement - driving 38% of pharmacy revenue'
    },
    {
      id: 'medication_adherent',
      name: 'Medication Adherent',
      color: '#2E7D32',
      recency: 4,
      frequency: 4,
      monetary: 4, 
      description: 'Regular prescription patients with good adherence patterns',
      memberCount: 28547,
      percentage: 23.1,
      avgSpend: 240,
      orders: 8.7,
      insight: 'Stable medication users with consistent refill patterns'
    },
    {
      id: 'wellness_seekers',
      name: 'Wellness Seekers', 
      color: '#1976D2',
      recency: 4,
      frequency: 3,
      monetary: 3,
      description: 'Health-conscious patients engaging with wellness programs',
      memberCount: 19456,
      percentage: 15.7,
      avgSpend: 180,
      orders: 5.2,
      insight: 'High engagement with wellness programs'
    },
    {
      id: 'at_risk_patients',
      name: 'At Risk Patients',
      color: '#FF9800',
      recency: 2,
      frequency: 3,
      monetary: 4,
      description: 'Previously engaged patients showing declining visit patterns',
      memberCount: 18912,
      percentage: 15.3,
      avgSpend: 285,
      orders: 6.8,
      insight: 'High-value patients requiring re-engagement strategies'
    }
  ],

  // ✅ NEW: Walgreens RFM Insights Data (keeping original KPI cards)
  rfmInsightsData: {
    performanceInsights: [
      {
        type: 'attention',
        text: 'Wellness Enrollment campaign showing only 234% ROI while pharmacy standard is 400%+',
        impact: 'Healthcare-focused messaging redesign could improve enrollment by 67% and boost ROI to 390%',
        severity: 'medium',
        action: 'View Campaign Details',
        segmentType: 'underperforming'
      },
      {
        type: 'opportunity',
        text: 'At Risk Patients segment growing +3.2% with declining medication adherence patterns',
        impact: 'Targeted adherence programs could recover $850K in pharmacy revenue and improve patient outcomes',
        severity: 'high',
        action: 'View Segment Details',
        segmentType: 'underperforming'
      },
      {
        type: 'positive',
        text: 'Health Champions driving 38% of total pharmacy revenue with strong prescription adherence',
        impact: 'Wellness program expansion could increase this segment value by additional $420K annually',
        severity: 'low',
        action: 'View Segment Details'
      },
      {
        type: 'neutral',
        text: 'Wellness Seekers show high program engagement but moderate spending patterns',
        impact: 'Cross-selling health products could increase segment value by 25% with targeted campaigns',
        severity: 'medium',
        action: 'View Segment Details'
      }
    ]
  },

  // ✅ NEW: Walgreens RFM Recommendations
  rfmRecommendations: [
    {
      id: "rec-walgreens-wellness-enrollment",
      title: "Wellness Enrollment Campaign Optimization",
      segment: "All Patients",
      description: "Transform Wellness Enrollment messaging from generic 'rewards' to healthcare-specific benefits. Replace 'earn points' with 'save on medications' and highlight prescription discounts, health screenings, and pharmacist consultations. Currently achieving 234% ROI vs 400%+ pharmacy standard.",
      priority: "high",
      expectedROI: "+390%",
      type: "optimization",
      difficulty: "medium",
      impact: "high",
      audience: "Non-Member Patients",
      
      estimatedRevenue: 180000,
      memberImpact: 156000,
      confidenceScore: 92,
      timeToImplement: "2-3 weeks",
      
      aiExplanation: "OPTIMIZATION OPPORTUNITY: Wellness Enrollment campaign shows significant improvement potential with 234% ROI compared to 400%+ pharmacy industry standard. Healthcare messaging analysis reveals generic 'rewards' language fails to communicate genuine health value. Patient research shows 67% higher enrollment when benefits focus on medication savings, health outcomes, and professional healthcare services rather than generic point-earning activities.",
      
      prerequisites: [
        "Redesign enrollment materials with healthcare-focused value propositions",
        "Replace generic rewards messaging with specific health benefits",
        "Add pharmacist endorsements and professional testimonials",
        "Implement medication savings calculator and health outcome tracking"
      ],
      
      successMetrics: [
        "Increase enrollment ROI from 234% to target 390%",
        "Improve enrollment conversion by 67% through healthcare messaging",
        "Boost program perceived value by 85% among eligible patients",
        "Achieve $180K additional revenue through optimized enrollment"
      ],
      
      implementationDetails: {
        title: "Wellness Enrollment Campaign Optimization",
        type: "Campaign Enhancement",
        audience: "Non-Member Patients",
        description: "Transform enrollment messaging to focus on healthcare value with medication savings, health screenings, and pharmacist consultations rather than generic rewards points.",
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pointsValue: "15",
        projectedMetrics: {
          currentROI: "234%",
          targetROI: "390%",
          enrollmentIncrease: "67%",
          estimatedRevenue: "$180,000",
          predictedROI: "390%"
        }
      }
    },
    {
      id: "rec-walgreens-atrisk-adherence",
      title: "At Risk Patient Medication Adherence Program",
      segment: "At Risk Patients",
      description: "Deploy targeted medication adherence support for 18,900 At Risk Patients showing declining visit patterns. Implement personalized refill reminders, pharmacist consultations, and adherence tracking with medication synchronization options to recover pharmacy revenue and improve patient outcomes.",
      priority: "high",
      expectedROI: "+425%",
      type: "enhancement",
      difficulty: "medium",
      impact: "high",
      audience: "At Risk Patients",
      
      estimatedRevenue: 850000,
      memberImpact: 18900,
      confidenceScore: 88,
      timeToImplement: "3-4 weeks",
      
      aiExplanation: "CRITICAL SEGMENT RECOVERY: At Risk Patients segment growing +3.2% indicates medication adherence decline affecting both patient outcomes and pharmacy revenue. Advanced analytics show these patients previously demonstrated strong spending patterns (M:4) but are experiencing visit frequency reduction (R:2). Targeted adherence programs show 73% success rate in recovering lapsed prescription patients and improving health outcomes through consistent medication management.",
      
      prerequisites: [
        "Implement predictive analytics for adherence pattern detection",
        "Configure personalized refill reminder system with behavioral triggers",
        "Set up pharmacist consultation scheduling for at-risk patients",
        "Create medication synchronization program for multiple prescriptions"
      ],
      
      successMetrics: [
        "Recover $850K in pharmacy revenue from improved adherence",
        "Achieve 425% ROI through targeted patient re-engagement",
        "Improve medication adherence rates by 40% for At Risk segment",
        "Reduce At Risk segment churn by 25% through intervention programs"
      ],
      
      implementationDetails: {
        title: "At Risk Patient Adherence Recovery Program",
        type: "Patient Intervention",
        audience: "At Risk Patients",
        description: "Comprehensive medication adherence support with personalized reminders, pharmacist consultations, and synchronization services to recover declining patients and improve health outcomes.",
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pointsValue: "20",
        projectedMetrics: {
          targetPatients: "18,900",
          adherenceImprovement: "40%",
          estimatedRevenue: "$850,000",
          churnReduction: "25%",
          predictedROI: "425%"
        }
      }
    },
    {
      id: "rec-walgreens-health-champions-expansion",
      title: "Health Champions Wellness Program Expansion",
      segment: "Health Champions",
      description: "Expand wellness program benefits for 15,200 Health Champions who drive 38% of pharmacy revenue. Add exclusive health screenings, nutrition consultations, and premium health product access to increase segment value and strengthen pharmacy relationship.",
      priority: "medium",
      expectedROI: "+280%",
      type: "expansion",
      difficulty: "medium",
      impact: "high",
      audience: "Health Champions",
      
      estimatedRevenue: 420000,
      memberImpact: 15200,
      confidenceScore: 85,
      timeToImplement: "4-6 weeks",
      
      aiExplanation: "VALUE MAXIMIZATION OPPORTUNITY: Health Champions segment demonstrates peak engagement (R:5 F:5 M:5) and generates 38% of total pharmacy revenue despite representing only 12.3% of patient base. Behavioral analysis shows this segment responds strongly to exclusive health services and premium wellness benefits. Expansion programs targeting health-conscious, high-value patients typically increase segment lifetime value by 35% through enhanced service offerings and deeper healthcare partnerships.",
      
      implementationDetails: {
        title: "Health Champions Wellness Expansion",
        type: "Premium Program Enhancement",
        audience: "Health Champions",
        description: "Exclusive wellness program expansion with premium health services, nutrition consultations, and advanced health screenings for highest-value pharmacy patients.",
        startDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pointsValue: "25",
        projectedMetrics: {
          segmentSize: "15,200",
          valueIncrease: "35%",
          estimatedRevenue: "$420,000",
          revenueShare: "38%",
          predictedROI: "280%"
        }
      }
    }
  ],

  insights: {
    performanceInsights: [
      {
        type: 'attention',
        text: 'Wellness Enrollment campaign showing low ROI at 234% - needs healthcare messaging optimization',
        impact: 'Healthcare-focused messaging could improve enrollment by 67%',
        severity: 'medium'
      },
      {
        type: 'positive',
        text: 'Prescription Refill Reminders achieving exceptional 4500% ROI',
        impact: 'Model provides framework for other medication adherence programs',
        severity: 'low'
      },
      {
        type: 'opportunity',
        text: 'Health & Wellness category shows 24% of high-value customers have lapsed in past 6 months',
        impact: 'Targeted re-engagement could recover $120K in annual category revenue',
        severity: 'high'
      }
    ],
    recommendedActions: [
      {
        text: 'Optimize wellness enrollment messaging for healthcare context',
        impact: 'Could improve enrollment rates by 40% and increase program ROI',
        difficulty: 'Medium',
        priority: 'high'
      },
      {
        text: 'Create targeted offers for lapsed Health & Wellness customers',
        impact: 'Could recover $120K in annual category revenue from high-value segment',
        difficulty: 'Medium',
        priority: 'high'
      }
    ]
  },

  // ===== ENHANCED: CUSTOMER SEGMENTATION DATA =====
  customerSegments: {
    // ✅ FIXED: Increased customer count to make revenue math realistic
    highValueLapsedWellness: {
      segmentId: 'hv_lapsed_wellness',
      name: 'High-Value Lapsed Health & Wellness',
      description: 'Top 20% customers by annual spend who haven\'t purchased Health & Wellness products in 6+ months',
      totalCustomers: 25490, // ✅ INCREASED: from 8945 to 25490 for realistic revenue math
      percentOfBase: 20.6, // ✅ UPDATED: percentage to match new count
      
      // ✅ UPDATED: Spending insights with realistic numbers
      avgAnnualSpend: 185,
      medianAnnualSpend: 152,
      totalAnnualRevenue: 4715000, // ✅ INCREASED: 25490 * $185 average
      
      // Health & Wellness category specifics
      avgHistoricalWellnessSpend: 312,
      medianWellnessOrderValue: 47,
      avgWellnessOrdersPerYear: 6.8,
      lastWellnessPurchase: '7.2 months ago (average)',
      
      // Engagement patterns
      medianPurchasesPerCustomer: 18,
      avgOrderValue: 103,
      totalLifetimeValue: 234,
      
      // Refinement opportunities
      surveyRespondents: {
        inSegment: 5098, // ✅ INCREASED: proportionally
        additionalFromSurvey: 2549, // ✅ INCREASED: proportionally
        potentialIncrease: 10.0, // 10% increase
        newTotalSize: 28039, // ✅ UPDATED: new total with survey respondents
        description: 'Adding Health & Wellness survey respondents regardless of spend tier'
      },
      
      // Category preferences (what they do buy)
      topCategories: [
        { name: 'Prescription Medications', percent: 78, avgSpend: 156 },
        { name: 'Personal Care', percent: 45, avgSpend: 89 },
        { name: 'Beauty & Cosmetics', percent: 34, avgSpend: 67 },
        { name: 'Household Items', percent: 56, avgSpend: 45 }
      ],
      
      // Seasonality and timing
      bestEngagementTimes: ['Tuesday 10AM-2PM', 'Thursday 9AM-1PM', 'Saturday 11AM-3PM'],
      seasonalPatterns: {
        fallWinter: 'Higher vitamin and immune support purchases',
        springSummer: 'Focus on fitness and outdoor wellness products'
      }
    }
  },

  // ===== ENHANCED: HEALTH & WELLNESS CATEGORY DATA =====
  healthWellnessCategory: {
    categoryId: 'health_wellness',
    name: 'Health & Wellness',
    
    // Overall performance
    monthlyRevenue: 2845000,
    monthlyGrowth: 8.3,
    activeCustomers: 67890,
    avgOrderValue: 52,
    
    // Subcategories
    subcategories: [
      { name: 'Vitamins & Supplements', revenue: 1245000, growth: 12.1, customers: 45678 },
      { name: 'Fitness & Exercise', revenue: 567000, growth: 15.4, customers: 23456 },
      { name: 'Natural & Organic', revenue: 489000, growth: 6.7, customers: 34567 },
      { name: 'Weight Management', revenue: 344000, growth: -2.1, customers: 18765 },
      { name: 'Sleep & Relaxation', revenue: 200000, growth: 18.9, customers: 12890 }
    ],
    
    // Customer behavior
    customerSegments: {
      new: { count: 8945, percent: 13.2, avgSpend: 34 },
      returning: { count: 45123, percent: 66.4, avgSpend: 67 },
      loyal: { count: 13822, percent: 20.4, avgSpend: 89 }
    },
    
    // Lapse patterns - ✅ UPDATED: to match new customer count
    lapseAnalysis: {
      totalLapsed: 61467, // ✅ INCREASED: proportionally from 21567
      highValueLapsed: 25490, // ✅ UPDATED: our target segment 
      medianTimeSinceLastPurchase: 8.3, // months
      topLapseReasons: [
        'Price sensitivity during economic uncertainty',
        'Shift to competitor pharmacy with better pricing',
        'Subscription services for routine vitamins',
        'Doctor recommended specific brands not carried'
      ]
    }
  },

  // ===== ENHANCED: AI RESPONSE GENERATOR =====
  responseGenerator: (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Enhanced pattern matching for the specific scenario
    if (lowerQuery.includes('offer') && lowerQuery.includes('high value') && lowerQuery.includes('lapsed') && lowerQuery.includes('health')) {
      return () => ({
        type: 'offer_creation_analysis',
        directAnswer: 'I found 25,490 high-value customers (top 20% by spend) who haven\'t purchased Health & Wellness products in 6+ months. This represents $4.7M in annual revenue potential.',
        
        segmentConfirmation: {
          segmentSize: 25490, // ✅ UPDATED: realistic customer count
          percentOfBase: 20.6, // ✅ UPDATED: percentage
          description: 'Top 20% customers by annual spend who haven\'t purchased Health & Wellness products in the past 6 months',
          
          keyInsights: {
            medianPurchasesPerCustomer: 18,
            avgOrderValue: 103,
            totalAnnualRevenue: 4715000, // ✅ UPDATED: realistic total
            avgHistoricalWellnessSpend: 312,
            medianWellnessOrderValue: 47,
            lastPurchaseAvg: '7.2 months ago'
          }
        },
        
        segmentRefinement: {
          suggestion: 'Including Health & Wellness survey respondents regardless of spend tier would increase your audience by 10% (adding 2,549 customers) for a total of 28,039 customers.',
          additionalInsight: 'Survey respondents show 23% higher engagement rates with wellness-focused offers, though average order values are 15% lower.',
          question: 'Would you like to include survey respondents to broaden reach while maintaining strong engagement?'
        },
        
        recommendations: [
          {
            id: 'walgreens-hw-discount-001',
            title: 'Health & Wellness Category Discount (15% off)',
            description: '15% off Health & Wellness purchases for orders $40+ (slightly below their $47 median). Prioritizes re-engagement with low friction entry point.',
            impact: 'high',
            estimatedROI: '+$1.85M revenue, 567% ROI, 28.5% redemption',
            difficulty: 'low',
            // Add offer-specific metadata
            offerType: 'category_discount',
            targetCategory: 'health_wellness',
            audience: 'high_value_lapsed_wellness',
            details: {
              type: 'Percentage Discount',
              strategy: 'Prioritize re-engagement with low friction entry point',
              targetAOV: 45,
              discountPercent: 15,
              minimumSpend: 40,
              predictions: {
                redemptionRate: 28.5,
                influencedRevenue: 1850000, // ✅ UPDATED: realistic revenue calculation
                avgOrderValue: 72, // ✅ UPDATED: realistic AOV (~$47 median + some uplift)
                totalDiscount: 277500, // ✅ UPDATED: 15% of $1.85M
                roi: 567,
                participatingCustomers: 25490, // ✅ UPDATED: full segment size
                timeframe: '90 days'
              }
            }
          },
          {
            id: 'walgreens-hw-cashback-001',
            title: 'Targeted Health & Wellness Cashback (20%)',
            description: '20% cashback on eligible Health & Wellness products (redeemable on future purchases). Reduces immediate margin impact while driving category-specific spend and future visits.',
            impact: 'high',
            estimatedROI: '+$2.16M revenue + $890K follow-on, 623% total ROI',
            difficulty: 'medium',
            offerType: 'cashback_reward',
            targetCategory: 'health_wellness',
            audience: 'high_value_lapsed_wellness',
            details: {
              type: 'Cashback Reward',
              strategy: 'Reduce immediate margin impact while driving category-specific spend and future visits',
              cashbackPercent: 20,
              maxCashback: 25,
              redemptionDelay: '30 days minimum',
              predictions: {
                redemptionRate: 34.2,
                influencedRevenue: 2160000, // ✅ UPDATED: realistic revenue calculation
                avgOrderValue: 78, // ✅ UPDATED: higher AOV for cashback offers
                totalCashbackValue: 432000, // ✅ UPDATED: 20% of $2.16M
                futureRedemptionRate: 78,
                followOnRevenue: 890000, // ✅ UPDATED: proportional follow-on revenue
                followOnAOV: 52, // ✅ UPDATED: realistic follow-on AOV
                totalROI: 623,
                participatingCustomers: 25490, // ✅ UPDATED: full segment size
                timeframe: '120 days (including follow-on)'
              }
            }
          },
          {
            id: 'walgreens-hw-bundle-001',
            title: 'Buy 2 Get 1 Free Stock-Up Promotion',
            description: 'Buy 2 Get 1 Free on select higher-priced Health & Wellness items ($25+ each). Drives larger basket sizes and encourages bulk purchasing, especially effective for vitamins and supplements.',
            impact: 'high',
            estimatedROI: '+$1.68M revenue, 85% larger baskets, 445% ROI',
            difficulty: 'medium',
            offerType: 'bundle_discount',
            targetCategory: 'health_wellness',
            audience: 'high_value_lapsed_wellness',
            details: {
              type: 'Bundle Discount',
              strategy: 'Drive larger basket sizes and encourage bulk purchasing, especially effective for vitamins and supplements',
              minimumItemPrice: 25,
              applicableProducts: 'Vitamins, supplements, and fitness products $25+',
              predictions: {
                redemptionRate: 22.8,
                influencedRevenue: 1680000, // ✅ UPDATED: realistic revenue calculation  
                avgOrderValue: 95, // ✅ UPDATED: higher AOV for bundle offers
                effectiveDiscountPercent: 33.3,
                totalDiscountValue: 560000, // ✅ UPDATED: ~33% effective discount
                basketSizeIncrease: 85,
                roi: 445,
                participatingCustomers: 25490, // ✅ UPDATED: full segment size
                timeframe: '60 days'
              }
            }
          }
        ],
        
        nextSteps: [
          'Review segment refinement options and finalize target audience',
          'Explore detailed predictions for each offer type',
          'Select preferred offer strategy or combination approach',
          'Configure campaign parameters and launch timeline'
        ],
        
        suggestedQuestions: [
          "Show me detailed predictions for the cashback offer",
          "How do these offers compare in terms of ROI?",
          "What if we combined the category discount with survey respondents?",
          "Which offer would drive the highest customer lifetime value?",
          "Can we A/B test different discount percentages?"
        ]
      });
    }
    
    // Detailed offer analysis responses - ✅ UPDATED: with realistic numbers
    if (lowerQuery.includes('detailed predictions') || lowerQuery.includes('cashback offer')) {
      return () => ({
        type: 'detailed_offer_analysis',
        directAnswer: 'The Health & Wellness Cashback offer shows strong performance with 34.2% redemption rate and $2.16M influenced revenue, plus significant follow-on value.',
        
        detailedAnalysis: {
          offerType: 'Targeted Health & Wellness Cashback',
          
          primaryMetrics: {
            redemptionRate: '34.2%',
            influencedRevenue: '$2,160,000', // ✅ UPDATED
            avgOrderValue: '$78', // ✅ UPDATED
            participatingCustomers: '25,490 customers', // ✅ UPDATED
            totalCashbackValue: '$432,000' // ✅ UPDATED
          },
          
          followOnImpact: {
            futureRedemptionRate: '78%',
            followOnRevenue: '$890,000', // ✅ UPDATED
            followOnAOV: '$52', // ✅ UPDATED
            customerRetentionBoost: '45%',
            categoryLoyaltyIncrease: '67%'
          },
          
          financialBreakdown: {
            totalROI: '623%',
            netProfit: '$2,618,000', // ✅ UPDATED: total revenue minus cashback cost
            marginalCost: '$432,000', // ✅ UPDATED: cashback payout
            customerAcquisitionCost: '$17', // ✅ UPDATED: realistic CAC
            lifetimeValueIncrease: '$103' // ✅ UPDATED: realistic LTV increase
          },
          
          competitiveAdvantages: [
            'Reduces immediate margin impact vs. upfront discounts',
            'Creates future purchase incentive and store loyalty',
            'Drives category-specific behavior modification',
            'Builds customer lifetime value through engagement'
          ],
          
          implementationConsiderations: [
            'Requires 30-day minimum redemption delay',
            'Clear communication about cashback terms needed',
            'System setup for delayed reward tracking',
            'Customer service training for cashback inquiries'
          ]
        }
      });
    }
    
    // ROI comparison responses - ✅ UPDATED: with realistic numbers
    if (lowerQuery.includes('compare') && lowerQuery.includes('roi')) {
      return () => ({
        type: 'offer_comparison_analysis',
        directAnswer: 'Category Discount leads in ROI (567%), Cashback drives highest revenue ($2.16M), and Stock-Up maximizes basket size (+85%).',
        
        comparison: {
          byROI: [
            { offer: 'Category Discount (15% off)', roi: 567, revenue: 1850000, reason: 'Lower discount cost, strong adoption' }, // ✅ UPDATED
            { offer: 'Wellness Cashback (20%)', roi: 623, revenue: 2160000, reason: 'Includes follow-on revenue boost' }, // ✅ UPDATED
            { offer: 'Buy 2 Get 1 Free', roi: 445, revenue: 1680000, reason: 'Higher discount but larger baskets' } // ✅ UPDATED
          ],
          
          byRevenue: [
            { offer: 'Wellness Cashback', revenue: 2160000, customers: 25490, reason: 'Highest engagement and future value' }, // ✅ UPDATED
            { offer: 'Category Discount', revenue: 1850000, customers: 25490, reason: 'Broad appeal, easy adoption' }, // ✅ UPDATED
            { offer: 'Buy 2 Get 1 Free', revenue: 1680000, customers: 25490, reason: 'Premium customer focus' } // ✅ UPDATED
          ],
          
          strategicConsiderations: {
            shortTerm: 'Category discount provides fastest results and highest ROI',
            longTerm: 'Cashback builds strongest customer relationships and future value',
            basketSize: 'Buy 2 Get 1 drives largest individual transactions',
            riskLevel: 'Category discount has lowest execution risk'
          }
        }
      });
    }
    
    // Default healthcare responses...
    if (lowerQuery.includes('revenue') || lowerQuery.includes('pharmacy')) {
      return () => ({
        type: 'healthcare_analysis',
        directAnswer: 'Your pharmacy revenue shows strong 6.2% growth driven by medication adherence programs and wellness service expansion.',
        text: 'Healthcare revenue analysis shows solid performance across core pharmacy operations. Prescription revenue maintains steady growth at 6.2% month-over-month, driven by improved medication adherence programs. Health & Wellness category represents significant opportunity with 24% of high-value customers having lapsed in the past 6 months.',
        recommendations: [
          {
            id: 'health-1',
            title: 'Target Lapsed Health & Wellness Customers',
            description: 'Create re-engagement offers for 25,490 high-value customers who haven\'t purchased wellness products in 6+ months.', // ✅ UPDATED
            impact: 'high',
            estimatedROI: '+$1.85M potential category recovery' // ✅ UPDATED
          }
        ],
        suggestedQuestions: [
          "How can I create offers for lapsed Health & Wellness customers?",
          "Which health programs drive the most patient engagement?",
          "What's my chronic care patient retention rate?"
        ]
      });
    }
    
    return () => ({
      type: 'healthcare_general',
      directAnswer: 'Your pharmacy operations show strong patient engagement with significant opportunity in Health & Wellness category re-engagement.',
      text: 'Healthcare performance shows strong fundamentals with 78.5% medication adherence and growing care interactions. Key opportunity exists in Health & Wellness category where 25,490 high-value customers have lapsed.', // ✅ UPDATED
      recommendations: [
        {
          id: 'health-gen-1',
          title: 'Health & Wellness Re-engagement Campaign',
          description: 'Target high-value lapsed customers with personalized wellness offers.',
          impact: 'high',
          estimatedROI: '+$1.85M from category recovery' // ✅ UPDATED
        }
      ],
      suggestedQuestions: [
        "How can I create offers for high-value lapsed customers?",
        "What wellness programs work best for pharmacy patients?"
      ]
    });
  }
};

// ===== SMART DATA GETTERS =====
// These return the right data based on current company
export const getCampaignData = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.campaigns;
    case 'outdoor_sportswear':
    default:
      return OriginalData.campaignData;
  }
};

export const getLoyaltyProgramData = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.loyaltyPrograms;
    case 'outdoor_sportswear':
    default:
      return OriginalData.loyaltyProgramData;
  }
};

export const getKpiCardsData = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.kpiCards;
    case 'outdoor_sportswear':
    default:
      return OriginalData.columbiaKpiCardsData;
  }
};

export const getInsightsData = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.insights;
    case 'outdoor_sportswear':
    default:
      return OriginalData.insightsData;
  }
};

export const getRfmSegments = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.rfmSegments;
    case 'outdoor_sportswear':
    default:
      return OriginalData.rfmSegments;
  }
};

// ✅ NEW: RFM-specific data getters (insights and recommendations only)
export const getRfmInsightsData = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.rfmInsightsData;
    case 'outdoor_sportswear':
    default:
      return outdoorRfmInsightsData;
  }
};

export const getRfmRecommendations = () => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.rfmRecommendations;
    case 'outdoor_sportswear':
    default:
      return outdoorRfmRecommendations;
  }
};

export const getResponseGenerator = (query) => {
  switch (currentCompany) {
    case 'walgreens':
      return walgreensData.responseGenerator(query);
    case 'outdoor_sportswear':
    default:
      return OriginalData.getResponseGenerator(query);
  }
};

// ===== NEW: WALGREENS-SPECIFIC DATA GETTERS =====
export const getCustomerSegments = () => {
  if (currentCompany === 'walgreens') {
    return walgreensData.customerSegments;
  }
  return null;
};

export const getHealthWellnessData = () => {
  if (currentCompany === 'walgreens') {
    return walgreensData.healthWellnessCategory;
  }
  return null;
};

// ===== PASS-THROUGH EXPORTS =====
// All your existing data and configs pass through unchanged
export const monthlyStats = OriginalData.monthlyStats;
export const membershipData = OriginalData.membershipData;
export const userProfiles = OriginalData.userProfiles;
export const brandData = OriginalData.brandData;
export const dashboardConfigurations = OriginalData.dashboardConfigurations;
export const profileDashboardOrder = OriginalData.profileDashboardOrder;
export const notificationConfig = OriginalData.notificationConfig;
export const profileRecommendationsData = OriginalData.profileRecommendationsData;
export const profilePanelConfig = OriginalData.profilePanelConfig;
export const sidebarMenuConfig = OriginalData.sidebarMenuConfig;
export const overviewDashboardConfig = OriginalData.overviewDashboardConfig;
export const narrativeMarketingConfig = OriginalData.narrativeMarketingConfig;
export const dashboardKpiConfig = OriginalData.dashboardKpiConfig;
export const headerConfig = OriginalData.headerConfig;
export const suggestedQuestionsConfig = OriginalData.suggestedQuestionsConfig;
export const aiCopilotResponseConfig = OriginalData.aiCopilotResponseConfig;
export const actionButtonConfig = OriginalData.actionButtonConfig;
export const aiCopilotConfig = OriginalData.aiCopilotConfig;

// ===== BACKWARD COMPATIBILITY =====
// Keep all your existing exports working
export const campaignData = getCampaignData();
export const loyaltyProgramData = getLoyaltyProgramData();
export const columbiaKpiCardsData = getKpiCardsData();
export const kpiCardsData = getKpiCardsData();
export const insightsData = getInsightsData();
export const rfmSegments = getRfmSegments();

// ✅ NEW: Export RFM chart data and utilities
export { segmentDistributionData, customerValueData, retentionRateData, getChangeColor, rfmKpiData };
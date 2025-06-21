// src/data/RFMAnalyticsData.js
// Enhanced centralized RFM analytics data with detailed recommendation information

// ===== RFM SEGMENT CONFIGURATION =====
export const rfmSegments = ["Champions", "Loyal Customers", "Potential Loyalists", "At Risk", "Can't Lose"];

// ===== RFM SEGMENT COLORS =====
export const getSegmentColor = (segmentName) => {
  const colors = {
    'champions': '#4CAF50',
    'loyal customers': '#2196F3', 
    'potential loyalists': '#9C27B0',
    'at risk': '#FF9800',
    "can't lose": '#F44336'
  };
  return colors[segmentName?.toLowerCase()] || '#4CAF50';
};

// ===== RFM KPI CARDS DATA =====
export const rfmKpiData = [
  { 
    title: 'Champions', 
    value: '12.8K', 
    change: '+5.2%', 
    icon: 'Star', 
    iconBg: 'rgba(76, 175, 80, 0.15)', 
    iconColor: '#4CAF50', 
    changeColor: '#81C784',
    secondaryText: 'R:5 F:5 M:5',
    segment: 'champions',
    isPositiveGrowthGood: true // For most segments, growth is good
  },
  { 
    title: 'Loyal Customers', 
    value: '26.4K', 
    change: '+3.1%', 
    icon: 'Users', 
    iconBg: 'rgba(33, 150, 243, 0.15)', 
    iconColor: '#2196F3', 
    changeColor: '#81C784',
    secondaryText: 'R:4 F:4 M:4',
    segment: 'loyal customers',
    isPositiveGrowthGood: true
  },
  { 
    title: 'Potential Loyalists', 
    value: '37.2K', 
    change: '+7.6%', 
    icon: 'Target', 
    iconBg: 'rgba(156, 39, 176, 0.15)', 
    iconColor: '#9C27B0', 
    changeColor: '#81C784',
    secondaryText: 'R:3 F:3 M:3',
    segment: 'potential loyalists',
    isPositiveGrowthGood: true
  },
  { 
    title: 'At Risk', 
    value: '18.9K', 
    change: '+2.4%', 
    icon: 'AlertTriangle', 
    iconBg: 'rgba(255, 152, 0, 0.15)', 
    iconColor: '#FF9800', 
    changeColor: '#E57373', // Now red since growth in At Risk is bad
    secondaryText: 'R:2 F:3 M:4',
    segment: 'at risk',
    isPositiveGrowthGood: false // For At Risk, growth is bad
  },
  { 
    title: "Can't Lose", 
    value: '8.3K', 
    change: '-4.7%', 
    icon: 'DollarSign', 
    iconBg: 'rgba(244, 67, 54, 0.15)', 
    iconColor: '#F44336', 
    changeColor: '#81C784', // Green because decrease in Can't Lose is good
    secondaryText: 'R:1 F:4 M:5',
    segment: "can't lose",
    isPositiveGrowthGood: false // For Can't Lose, growth is bad (more people becoming can't lose)
  }
];

// ===== SEGMENT DISTRIBUTION DATA =====
export const segmentDistributionData = [
  { name: 'Champions', value: 12 },
  { name: 'Loyal Customers', value: 25 },
  { name: 'Potential Loyalists', value: 35 },
  { name: 'At Risk', value: 18 },
  { name: "Can't Lose", value: 10 }
];

// ===== CUSTOMER VALUE DATA =====
export const customerValueData = [
  { name: 'Champions', avgValue: 850, potentialValue: 1020 },
  { name: 'Loyal Customers', avgValue: 450, potentialValue: 580 },
  { name: 'Potential Loyalists', avgValue: 280, potentialValue: 420 },
  { name: 'At Risk', avgValue: 350, potentialValue: 560 },
  { name: "Can't Lose", avgValue: 720, potentialValue: 950 }
];

// ===== RETENTION RATE DATA =====
export const retentionRateData = [
  { name: 'Champions', currentRate: 94, targetRate: 96 },
  { name: 'Loyal Customers', currentRate: 86, targetRate: 90 },
  { name: 'Potential Loyalists', currentRate: 68, targetRate: 80 },
  { name: 'At Risk', currentRate: 42, targetRate: 65 },
  { name: "Can't Lose", currentRate: 56, targetRate: 85 }
];

// ===== RFM INSIGHTS DATA =====
export const rfmInsightsData = {
  performanceInsights: [
    {
      type: 'opportunity',
      text: 'At Risk customers show declining recency (R:2 - Last 3+ Months) and stable frequency (F:3 - 1 visit/quarter) and segment is growing +2.4%',
      impact: 'Targeted recovery campaigns could prevent $65K in customer lifetime value loss',
      programId: null,
      severity: 'medium',
      action: 'View Segment Details',
      segmentType: 'underperforming'
    },
    {
      type: 'attention',
      text: 'Trail Essentials Punch Card program shows optimization opportunity with 10% completion rate',
      impact: 'Program structure improvements could unlock $120K additional revenue potential',
      programId: 2,
      severity: 'medium',
      action: 'View Program Details'
    },
    {
      type: 'neutral', 
      text: 'Potential Loyalists segment shows medium engagement: Recency=3 (Last Month), Frequency=3 (1/quarter)',
      impact: 'Re-engagement campaigns could recover $85K in potential segment value',
      programId: null,
      severity: 'medium',
      action: 'View Segment Details'
    },
    {
      type: 'positive',
      text: 'Adventure Gear Punch Card performing excellently with 48% completion rate and 900% ROI',
      impact: '$1.68M revenue generation provides proven model for program optimization',
      programId: 1,
      severity: 'low',
      action: 'View Program Details'
    }
  ],
  recommendedActions: [
    'Deploy At Risk customer recovery punch card with weekly visit requirements and milestone rewards targeting R:2 F:3 customers',
    'Target Potential Loyalists (R:3 F:3) with frequency-building punch card campaigns',
    'Scale successful Adventure Gear Punch Card model to underperforming programs',
    'Optimize Trail Essentials program structure based on member behavior analysis'
  ]
};

// ===== ENHANCED RFM RECOMMENDATIONS WITH FULL DETAILS =====
export const rfmRecommendations = [
  {
    id: "rec-atrisk-punchcard",
    title: "At Risk Customer Recovery Punch Card",
    segment: "At Risk",
    description: "Deploy targeted 4-purchase punch card requiring weekly visits and minimum $10 per purchase. Rewards: 100 bonus points after 2 qualifying visits, $5 coupon after 4 visits. Designed to boost recency from quarterly+ to weekly engagement patterns and maintain frequency for R:2 F:3 customers.",
    priority: "high",
    expectedROI: "+280%",
    type: "restructure",
    difficulty: "medium",
    impact: "high",
    audience: "At Risk",
    
    // Enhanced properties for unified display
    estimatedRevenue: 125000,
    memberImpact: 18900,
    confidenceScore: 89,
    timeToImplement: "1-2 weeks",
    
    aiExplanation: "Analysis of 18,900 At Risk customers (R:2 F:3 M:4) reveals critical engagement decay patterns. This 4-purchase punch card structure is optimal for boosting recency from quarterly+ to weekly engagement and maintaining frequency patterns. Predictive analytics show 67% of At Risk customers abandon after 2nd punch in current programs, but targeted weekly requirements with milestone rewards can recover 35% of declining members within 6-8 weeks.",
    
    prerequisites: [
      "Configure 4-purchase punch card system with $10 minimum purchase requirements",
      "Configure weekly visit requirements to boost frequency patterns", 
      "Create milestone reward automation for 2-visit and 4-visit achievements",
      "Establish weekly engagement tracking and progress notifications"
    ],
    
    successMetrics: [
      "Improve recency score from R:2 (Last 3+ Months) to R:3 (Last Month) within 120 days",
      "Maintain frequency patterns at F:3 (1/quarter) while building toward F:4 (1/month)",
      "Achieve 280% ROI through $125K additional revenue generation",
      "Reduce At Risk segment churn by 38% and improve NPS by 18 points"
    ],
    
    risks: [
      //"Weekly visit requirements may overwhelm less engaged customers",
      //"Minimum purchase thresholds could create friction for price-sensitive segments",
      //"Requires careful balance between incentives and sustainable program economics"
    ],
    
    // Implementation details for modification wizard
    implementationDetails: {
      title: "At Risk Recovery Punch Card",
      type: "Program Enhancement",
      audience: "At Risk",
      description: "Deploy targeted 4-purchase punch card requiring weekly visits and minimum $10 per purchase. 100 bonus points after 2 qualifying visits, $5 coupon after 4 visits. Designed to boost recency for R:2 F:3 M:4 customers and maintain engagement while building toward higher frequency.",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: "10",
      rules: [
        "4-purchase punch card with $10 minimum purchase requirement",
        "Weekly visit requirements to boost recency patterns",
        "Milestone rewards: 100 points after 2 visits, $5 coupon after 4 visits",
        "Targeted to At Risk segment (R:2 F:3 M:4 customers)",
        "Progress tracking and completion analytics"
      ],
      rewards: [
        "100 bonus points after 2 qualifying visits",
        "$5 coupon completion reward after 4 visits",
        "Weekly engagement milestone recognition",
        "Progress tracking dashboard access",
        "Completion celebration email with exclusive offers"
      ],
      projectedMetrics: {
        additionalPurchases: "2,500",
        additionalRevenue: "$125,000",
        recencyImprovement: "From R:2 to R:3",
        frequencyImprovement: "Maintain F:3, build toward F:4",
        pointsAwarded: "125,000",
        couponsIssued: "625",
        totalDiscountLiability: "$3,125",
        predictedROI: "280%"
      }
    }
  },
  {
    id: "rec-potential-punchcard",
    title: "Potential Loyalists Re-engagement Campaign",
    segment: "Potential Loyalists",
    description: "Target R:3 F:3 segment with 4-purchase Punch Card requiring weekly visits, $10 minimum purchase. 100 bonus points after 2 visits, $5 coupon completion reward. Designed to boost both recency and frequency to next tier levels.",
    priority: "high",
    expectedROI: "+240%",
    type: "enhancement",
    difficulty: "medium",
    impact: "high",
    audience: "Potential Loyalists",
    
    // Enhanced properties
    estimatedRevenue: 156000,
    memberImpact: 37200,
    confidenceScore: 86,
    timeToImplement: "1-2 weeks",
    
    aiExplanation: "Behavioral analysis of 37,200 Potential Loyalists (R:3 F:3) shows balanced monthly engagement with quarterly frequency patterns. Advanced clustering algorithms identify this segment as having highest conversion potential to Champions status. Machine learning models suggest targeted frequency-building campaigns can move 14% of Potential Loyalists to Loyal Customers tier within 150 days, with punch card mechanics proving most effective for sustained engagement building from monthly to bi-weekly patterns.",
    
    prerequisites: [
      "Segment R:3 F:3 customers in database for precise targeting",
      "Configure punch card mechanics with frequency-building incentives",
      "Create personalized onboarding communication flow",
      "Set up category expansion tracking and rewards"
    ],
    
    successMetrics: [
      "Boost recency from R:3 (monthly) to R:4 (bi-weekly) while increasing frequency from F:3 to F:4",
      "Convert 14% of participants to Loyal Customers tier within 150 days",
      "Generate $156K additional revenue with 240% ROI",
      "Improve customer satisfaction by 30% and increase tier advancement by 38%"
    ],
    
    risks: [
      "Over-communication could lead to engagement fatigue",
      "Frequency requirements must align with natural shopping patterns",
      "Category expansion incentives need careful cost management"
    ],
    
    implementationDetails: {
      title: "Potential Loyalists Re-engagement Program",
      type: "Program Enhancement",
      audience: "Potential Loyalists",
      description: "Target R:3 F:3 segment with strategic punch card program to boost recency from monthly to bi-weekly and frequency from quarterly to monthly engagement patterns while building toward Loyal Customer tier.",
      startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: "8",
      projectedMetrics: {
        additionalPurchases: "3,200",
        additionalRevenue: "$156,000",
        recencyImprovement: "From R:3 to R:4",
        frequencyImprovement: "From F:3 to F:4",
        predictedROI: "240%"
      }
    }
  },
  {
    id: "rec-trail-essentials-optimization",
    title: "Trail Essentials Punch Card Optimization",
    segment: "All Participants",
    description: "Trail Essentials Punch Card shows optimization opportunity with 10% completion rate. Program structure improvements using proven success models could unlock significant revenue potential while enhancing member experience.",
    priority: "high",
    expectedROI: "+320%",
    type: "optimization",
    difficulty: "medium",
    impact: "high",
    audience: "Trail Essentials Participants",
    
    // Enhanced properties
    estimatedRevenue: 180000,
    memberImpact: 12673,
    confidenceScore: 94,
    timeToImplement: "2-3 weeks",
    
    aiExplanation: "OPTIMIZATION OPPORTUNITY: Trail Essentials Punch Card shows strong improvement potential with 10% completion rate compared to Adventure Gear's 48% benchmark. Advanced analytics reveal program structure enhancements based on successful models can dramatically improve member experience and business outcomes. Machine learning analysis identifies specific friction points and optimization strategies that have proven effective across similar programs.",
    
    prerequisites: [
      "Analyze member journey and identify completion barriers",
      "Review Adventure Gear success model for best practices",
      "Design enhanced reward structure and milestone progression",
      "Plan member communication strategy for program transition"
    ],
    
    successMetrics: [
      "Increase completion rate from 10% to target 35-40%",
      "Improve member satisfaction scores by 50+ points",
      "Generate $180K additional revenue through program optimization",
      "Achieve 320% ROI while maintaining member engagement quality"
    ],
    
    risks: [
      "Program changes require careful member communication",
      "Reward structure adjustments need economic modeling",
      "Member transition period may temporarily impact engagement"
    ],
    
    implementationDetails: {
      title: "Trail Essentials Program Optimization",
      type: "Program Restructure",
      audience: "Trail Essentials Participants",
      description: "Comprehensive optimization of Trail Essentials Punch Card using proven success models to improve completion rates and member experience while unlocking revenue potential.",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: "12",
      projectedMetrics: {
        currentParticipants: "12,673",
        targetCompletionRate: "35%",
        estimatedRevenue: "$180,000",
        memberSatisfactionImprovement: "+50%",
        predictedROI: "320%"
      }
    }
  },
  {
    id: "rec-adventure-gear-scaling",
    title: "Adventure Gear Punch Card Success Replication",
    segment: "Champions",
    description: "Adventure Gear Punch Card achieves 48% completion rate and 900% ROI. Apply this successful model to Champions segment with exclusive early access programs and premium outdoor gear categories.",
    priority: "medium",
    expectedROI: "+190%",
    type: "expansion",
    difficulty: "medium",
    impact: "high",
    audience: "Champions",
    
    // Enhanced properties
    estimatedRevenue: 240000,
    memberImpact: 12800,
    confidenceScore: 92,
    timeToImplement: "2-3 weeks",
    
    aiExplanation: "SUCCESS MODEL REPLICATION: Adventure Gear Punch Card demonstrates exceptional performance with 48% completion rate and 900% ROI, providing proven framework for Champions segment expansion. Behavioral analysis shows Champions (R:5 F:5 M:5) respond strongly to exclusivity and premium experiences. Machine learning models predict 52% completion rate when adapted for Champions with enhanced premium benefits and early access mechanisms.",
    
    prerequisites: [
      "Adapt Adventure Gear model for premium categories and Champions tier",
      "Design Champions-exclusive benefits and VIP completion experiences",
      "Set up early access infrastructure for new product launches",
      "Create premium tier progression and reward mechanisms"
    ],
    
    successMetrics: [
      "Achieve 52% completion rate exceeding Adventure Gear benchmark",
      "Generate $2.4M revenue with 900% ROI matching Adventure Gear performance",
      "Increase Champions engagement frequency and exclusivity perception",
      "Enhance brand loyalty and lifetime value for highest-tier customers"
    ],
    
    risks: [
      "High expectations from Champions segment require flawless execution",
      "Premium reward costs could impact program margins if not carefully managed",
      "Exclusivity benefits must provide genuine value to justify Champions status"
    ],
    
    implementationDetails: {
      title: "Adventure Gear Success Model Expansion",
      type: "Program Expansion", 
      audience: "Champions",
      description: "Replicate the highly successful Adventure Gear Punch Card model (48% completion, 900% ROI) to Champions segment with premium categories and exclusive benefits.",
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: "12",
      projectedMetrics: {
        participantTarget: "8,000",
        projectedCompletionRate: "52%",
        estimatedRevenue: "$2,400,000",
        predictedROI: "900%"
      }
    }
  }
];

// ===== DETAILED SEGMENT DATA =====
const segmentDataMap = {
  "champions": {
    title: "Champions",
    description: "recent buyers who purchase often and spend the most",
    color: "#4CAF50",
    distributionPercentage: 12,
    potentialLiftRange: "15-25%",
    keyFocusArea: "maintaining their high engagement and increasing their advocacy through VIP programs and exclusive benefits",
    metrics: {
      customerCount: "12,843",
      avgSpend: "$850",
      retention: "94%",
      growth: "+5.2%",
      potentialGrowth: "+20%",
      retentionTrend: "+2.1%",
      recencyScore: "4.8",
      frequencyScore: "4.6",
      monetaryScore: "4.9"
    },
    purchaseHistory: [
      { month: 'Jan', purchases: 2.8, avgValue: 320 },
      { month: 'Feb', purchases: 3.2, avgValue: 290 },
      { month: 'Mar', purchases: 2.9, avgValue: 310 },
      { month: 'Apr', purchases: 3.1, avgValue: 330 },
      { month: 'May', purchases: 3.4, avgValue: 350 }
    ],
    retentionTrend: [
      { month: 'Jan', rate: 92 },
      { month: 'Feb', rate: 93 },
      { month: 'Mar', rate: 92 },
      { month: 'Apr', rate: 94 },
      { month: 'May', rate: 94 }
    ],
    rfmTrend: [
      { month: 'Jan', recency: 4.7, frequency: 4.4, monetary: 4.8 },
      { month: 'Feb', recency: 4.8, frequency: 4.5, monetary: 4.8 },
      { month: 'Mar', recency: 4.8, frequency: 4.5, monetary: 4.9 },
      { month: 'Apr', recency: 4.8, frequency: 4.6, monetary: 4.9 },
      { month: 'May', recency: 4.8, frequency: 4.6, monetary: 4.9 }
    ],
    customerCountTrend: [
      { month: 'Jan', count: 12100 },
      { month: 'Feb', count: 12350 },
      { month: 'Mar', count: 12500 },
      { month: 'Apr', count: 12700 },
      { month: 'May', count: 12840 }
    ],
    clvTrend: [
      { month: 'Jan', value: 810 },
      { month: 'Feb', value: 825 },
      { month: 'Mar', value: 835 },
      { month: 'Apr', value: 845 },
      { month: 'May', value: 850 }
    ],
    segmentTransition: [
      { name: 'Q1 2024', champions: 0.89, loyal: 0.06, potential: 0.02, atrisk: 0.01, cantlose: 0.01, churn: 0.01 },
      { name: 'Q2 2024', champions: 0.86, loyal: 0.07, potential: 0.03, atrisk: 0.01, cantlose: 0.02, churn: 0.01 }
    ],
    demographics: {
      age: [
        { name: '18-24', value: 15, color: '#2196F3' },
        { name: '25-34', value: 35, color: '#4CAF50' },
        { name: '35-44', value: 30, color: '#FFC107' },
        { name: '45-54', value: 15, color: '#9C27B0' },
        { name: '55+', value: 5, color: '#F44336' }
      ],
      gender: [
        { name: 'Male', value: 55, color: '#2196F3' },
        { name: 'Female', value: 43, color: '#E91E63' },
        { name: 'Other', value: 2, color: '#9C27B0' }
      ]
    },
    purchaseChannels: [
      { name: 'Online Store', value: 65 },
      { name: 'Mobile App', value: 20 },
      { name: 'Retail Store', value: 10 },
      { name: 'Marketplace', value: 5 }
    ],
    topProducts: [
      { name: 'Omni-Heat™ Infinity Jacket', revenue: 128000, units: 640, percentage: 18 },
      { name: 'Newton Ridge™ Hiking Boots', revenue: 92000, units: 920, percentage: 12 },
      { name: 'Steens Mountain™ Fleece', revenue: 87000, units: 1740, percentage: 10 },
      { name: 'Bugaboo™ Winter Pants', revenue: 75000, units: 750, percentage: 8 },
      { name: 'Silver Ridge™ Convertible Pants', revenue: 64000, units: 800, percentage: 6 }
    ],
    categoryDistribution: [
      { name: 'Winter Jackets', value: 32 },
      { name: 'Hiking Footwear', value: 25 },
      { name: 'Fleece & Sweaters', value: 15 },
      { name: 'Performance Pants', value: 12 },
      { name: 'Accessories', value: 8 },
      { name: 'Other', value: 8 }
    ],
    recommendedActions: [
      {
        id: 1,
        title: "VIP Early Access Program",
        description: "Give Champions 48-hour early access to new product launches with exclusive benefits.",
        impact: "high",
        effort: "medium",
        expectedLift: "+12%",
        tools: ["Marigold Messaging", "Marigold Loyalty", "E-commerce Platform"],
        implementationSteps: [
          "Create VIP tier in loyalty program",
          "Set up early access mechanism on website",
          "Develop email campaign for announcements",
          "Include personalized thank you notes with orders"
        ]
      },
      {
        id: 2,
        title: "Personalized Thank You Campaign",
        description: "Send personalized thank you messages with small gifts for continued loyalty.",
        impact: "medium",
        effort: "low",
        expectedLift: "+8%",
        tools: ["Marigold Messaging", "Marigold Loyalty"],
        implementationSteps: [
          "Segment Champions in messaging platform",
          "Design personalized thank you templates",
          "Schedule automated messages after key purchases",
          "Include personalized product recommendations"
        ]
      },
      {
        id: 3,
        title: "Brand Ambassador Program",
        description: "Invite top Champions to be brand ambassadors with special incentives for referrals.",
        impact: "high",
        effort: "high",
        expectedLift: "+15%",
        tools: ["Marigold Loyalty", "Marigold Messaging", "Social Media Integration"],
        implementationSteps: [
          "Identify top 10% of Champions by spend and frequency",
          "Create ambassador program structure and benefits",
          "Develop ambassador dashboard and tracking",
          "Launch referral program with tiered rewards"
        ]
      },
      {
        id: 4,
        title: "Exclusive Event Invitations",
        description: "Host virtual or in-person events exclusively for Champion members to build community.",
        impact: "medium",
        effort: "medium",
        expectedLift: "+10%",
        tools: ["Marigold Messaging", "Event Management Platform"],
        implementationSteps: [
          "Plan quarterly virtual or regional in-person events",
          "Create exclusive content or experiences",
          "Send personalized invitations to Champions",
          "Collect feedback for continuous improvement"
        ]
      }
    ]
  },
  "loyal customers": {
    title: "Loyal Customers",
    description: "regular buyers who spend above average amounts",
    color: "#2196F3",
    distributionPercentage: 25,
    potentialLiftRange: "20-35%",
    keyFocusArea: "increasing purchase frequency and moving them toward Champion status through targeted incentives and personalized experiences",
    metrics: {
      customerCount: "26,421",
      avgSpend: "$450",
      retention: "86%",
      growth: "+3.1%",
      potentialGrowth: "+30%",
      retentionTrend: "+1.2%",
      recencyScore: "3.9",
      frequencyScore: "4.2",
      monetaryScore: "3.8"
    },
    purchaseHistory: [
      { month: 'Jan', purchases: 2.1, avgValue: 210 },
      { month: 'Feb', purchases: 2.3, avgValue: 220 },
      { month: 'Mar', purchases: 2.0, avgValue: 230 },
      { month: 'Apr', purchases: 2.2, avgValue: 220 },
      { month: 'May', purchases: 2.4, avgValue: 240 }
    ],
    retentionTrend: [
      { month: 'Jan', rate: 84 },
      { month: 'Feb', rate: 85 },
      { month: 'Mar', rate: 84 },
      { month: 'Apr', rate: 85 },
      { month: 'May', rate: 86 }
    ],
    rfmTrend: [
      { month: 'Jan', recency: 3.7, frequency: 4.0, monetary: 3.6 },
      { month: 'Feb', recency: 3.8, frequency: 4.1, monetary: 3.6 },
      { month: 'Mar', recency: 3.8, frequency: 4.1, monetary: 3.7 },
      { month: 'Apr', recency: 3.9, frequency: 4.2, monetary: 3.7 },
      { month: 'May', recency: 3.9, frequency: 4.2, monetary: 3.8 }
    ],
    customerCountTrend: [
      { month: 'Jan', count: 25300 },
      { month: 'Feb', count: 25700 },
      { month: 'Mar', count: 25900 },
      { month: 'Apr', count: 26200 },
      { month: 'May', count: 26400 }
    ],
    clvTrend: [
      { month: 'Jan', value: 435 },
      { month: 'Feb', value: 440 },
      { month: 'Mar', value: 442 },
      { month: 'Apr', value: 445 },
      { month: 'May', value: 450 }
    ],
    segmentTransition: [
      { name: 'Q1 2024', champions: 0.08, loyal: 0.82, potential: 0.05, atrisk: 0.03, cantlose: 0.01, churn: 0.01 },
      { name: 'Q2 2024', champions: 0.09, loyal: 0.80, potential: 0.06, atrisk: 0.03, cantlose: 0.01, churn: 0.01 }
    ],
    demographics: {
      age: [
        { name: '18-24', value: 10, color: '#2196F3' },
        { name: '25-34', value: 30, color: '#4CAF50' },
        { name: '35-44', value: 35, color: '#FFC107' },
        { name: '45-54', value: 20, color: '#9C27B0' },
        { name: '55+', value: 5, color: '#F44336' }
      ],
      gender: [
        { name: 'Male', value: 45, color: '#2196F3' },
        { name: 'Female', value: 52, color: '#E91E63' },
        { name: 'Other', value: 3, color: '#9C27B0' }
      ]
    },
    purchaseChannels: [
      { name: 'Online Store', value: 55 },
      { name: 'Mobile App', value: 15 },
      { name: 'Retail Store', value: 20 },
      { name: 'Marketplace', value: 10 }
    ],
    topProducts: [
      { name: 'Newton Ridge™ Hiking Boots', revenue: 112000, units: 1120, percentage: 15 },
      { name: 'Steens Mountain™ Fleece', revenue: 107000, units: 2140, percentage: 14 },
      { name: 'Bugaboo™ Winter Pants', revenue: 85000, units: 850, percentage: 12 },
      { name: 'Silver Ridge™ Convertible Pants', revenue: 82000, units: 1025, percentage: 10 },
      { name: 'Whirlibird™ IV Jacket', revenue: 72000, units: 360, percentage: 8 }
    ],
    categoryDistribution: [
      { name: 'Hiking Footwear', value: 28 },
      { name: 'Fleece & Sweaters', value: 22 },
      { name: 'Winter Jackets', value: 18 },
      { name: 'Performance Pants', value: 15 },
      { name: 'Accessories', value: 10 },
      { name: 'Other', value: 7 }
    ],
    recommendedActions: [
      {
        id: 1,
        title: "Increased Points for Category Purchases",
        description: "Offer 3x points when loyal customers purchase from their most frequent categories.",
        impact: "high",
        effort: "low",
        expectedLift: "+20%",
        tools: ["Marigold Loyalty", "Marigold Analytics", "E-commerce Platform"],
        implementationSteps: [
          "Identify top purchase categories for each customer",
          "Configure loyalty program for category-based multipliers",
          "Create targeted email campaign announcing the promotion",
          "Set up tracking for redemption and engagement"
        ]
      },
      {
        id: 2,
        title: "Loyalty Tier Upgrade Challenge",
        description: "Create a 90-day challenge to upgrade to Champions tier with specific purchase targets.",
        impact: "high",
        effort: "medium",
        expectedLift: "+18%",
        tools: ["Marigold Loyalty", "Marigold Messaging", "Analytics Dashboard"],
        implementationSteps: [
          "Define clear upgrade criteria and rewards",
          "Develop personalized challenge emails",
          "Create progress tracking dashboard for customers",
          "Schedule reminder communications throughout challenge"
        ]
      },
      {
        id: 3,
        title: "Cross-Sell Recommendations Campaign",
        description: "Launch an email campaign with personalized cross-sell recommendations based on purchase history.",
        impact: "medium",
        effort: "medium",
        expectedLift: "+12%",
        tools: ["Marigold Messaging", "Marigold Analytics", "Product Recommendation Engine"],
        implementationSteps: [
          "Analyze purchase patterns to identify cross-sell opportunities",
          "Create segment-specific product recommendation rules",
          "Design email templates with dynamic content blocks",
          "Schedule automated follow-up based on engagement"
        ]
      },
      {
        id: 4,
        title: "Exclusive Mid-Tier Membership Benefits",
        description: "Create exclusive benefits for Loyal Customers that aren't available to lower tiers.",
        impact: "medium",
        effort: "low",
        expectedLift: "+15%",
        tools: ["Marigold Loyalty", "Marigold Messaging"],
        implementationSteps: [
          "Define 3-5 exclusive benefits for Loyal tier",
          "Create promotional materials highlighting benefits",
          "Implement benefit tracking and redemption",
          "Gather feedback for program optimization"
        ]
      }
    ]
  },
  "at risk": {
    title: "At Risk",
    description: "previous loyal customers who haven't purchased recently",
    color: "#FF9800",
    distributionPercentage: 18,
    potentialLiftRange: "25-45%",
    keyFocusArea: "improving recency through targeted win-back campaigns and addressing any issues that may have caused their decline in engagement",
    metrics: {
      customerCount: "18,912",
      avgSpend: "$350",
      retention: "42%",
      growth: "+2.4%",
      potentialGrowth: "+45%",
      retentionTrend: "-6.2%",
      recencyScore: "2.0",
      frequencyScore: "3.0",
      monetaryScore: "4.0"
    },
    purchaseHistory: [
      { month: 'Jan', purchases: 1.9, avgValue: 310 },
      { month: 'Feb', purchases: 1.5, avgValue: 330 },
      { month: 'Mar', purchases: 0.8, avgValue: 340 },
      { month: 'Apr', purchases: 0.3, avgValue: 350 },
      { month: 'May', purchases: 0.1, avgValue: 360 }
    ],
    retentionTrend: [
      { month: 'Jan', rate: 65 },
      { month: 'Feb', rate: 58 },
      { month: 'Mar', rate: 52 },
      { month: 'Apr', rate: 48 },
      { month: 'May', rate: 42 }
    ],
    rfmTrend: [
      { month: 'Jan', recency: 3.2, frequency: 2.8, monetary: 3.8 },
      { month: 'Feb', recency: 3.1, frequency: 2.9, monetary: 3.9 },
      { month: 'Mar', recency: 3.0, frequency: 3.0, monetary: 4.0 },
      { month: 'Apr', recency: 2.5, frequency: 3.0, monetary: 4.0 },
      { month: 'May', recency: 2.0, frequency: 3.0, monetary: 4.0 }
    ],
    customerCountTrend: [
      { month: 'Jan', count: 18000 },
      { month: 'Feb', count: 18250 },
      { month: 'Mar', count: 18700 },
      { month: 'Apr', count: 18900 },
      { month: 'May', count: 18912 }
    ],
    clvTrend: [
      { month: 'Jan', value: 340 },
      { month: 'Feb', value: 345 },
      { month: 'Mar', value: 348 },
      { month: 'Apr', value: 349 },
      { month: 'May', value: 350 }
    ],
    segmentTransition: [
      { name: 'Q1 2024', champions: 0.0, loyal: 0.06, potential: 0.08, atrisk: 0.75, cantlose: 0.05, churn: 0.06 },
      { name: 'Q2 2024', champions: 0.0, loyal: 0.05, potential: 0.07, atrisk: 0.72, cantlose: 0.08, churn: 0.08 }
    ],
    demographics: {
      age: [
        { name: '18-24', value: 20, color: '#2196F3' },
        { name: '25-34', value: 30, color: '#4CAF50' },
        { name: '35-44', value: 25, color: '#FFC107' },
        { name: '45-54', value: 15, color: '#9C27B0' },
        { name: '55+', value: 10, color: '#F44336' }
      ],
      gender: [
        { name: 'Male', value: 48, color: '#2196F3' },
        { name: 'Female', value: 50, color: '#E91E63' },
        { name: 'Other', value: 2, color: '#9C27B0' }
      ]
    },
    purchaseChannels: [
      { name: 'Online Store', value: 45 },
      { name: 'Mobile App', value: 10 },
      { name: 'Retail Store', value: 30 },
      { name: 'Marketplace', value: 15 }
    ],
    topProducts: [
      { name: 'Steens Mountain™ Fleece', revenue: 95000, units: 1900, percentage: 16 },
      { name: 'Silver Ridge™ Convertible Pants', revenue: 88000, units: 1100, percentage: 14 },
      { name: 'Bugaboo™ Winter Pants', revenue: 75000, units: 750, percentage: 12 },
      { name: 'Newton Ridge™ Hiking Boots', revenue: 72000, units: 720, percentage: 10 },
      { name: 'Glennaker Rain Jacket', revenue: 65000, units: 929, percentage: 8 }
    ],
    categoryDistribution: [
      { name: 'Fleece & Sweaters', value: 28 },
      { name: 'Performance Pants', value: 22 },
      { name: 'Hiking Footwear', value: 18 },
      { name: 'Rain Gear', value: 15 },
      { name: 'Accessories', value: 12 },
      { name: 'Other', value: 5 }
    ],
    recommendedActions: [
      {
        id: "rec-atrisk-punchcard-new",
        title: "At Risk Recovery Punch Card",
        description: "Deploy targeted 4-purchase punch card requiring weekly visits and minimum $10 per purchase. 100 bonus points after 2 qualifying visits, $5 coupon after 4 visits. Designed to boost recency from R:2 (Last 3+ Months) to R:3 (Last Month) and maintain F:3 engagement while increasing toward F:4.",
        impact: "high",
        effort: "medium",
        expectedLift: "+280%",
        type: "restructure",
        difficulty: "medium",
        audience: "At Risk",
        projectedMetrics: {
          additionalPurchases: "2,500",
          additionalRevenue: "$125,000",
          recencyImprovement: "From R:2 to R:3",
          frequencyImprovement: "Maintain F:3, build toward F:4",
          pointsAwarded: "125,000",
          couponsIssued: "625",
          totalDiscountLiability: "$3,125",
          predictedROI: "280%"
        },
        tools: ["Marigold Loyalty", "Marigold Messaging", "Analytics Dashboard", "Ecommerce Platform"],
        implementationSteps: [
          "Set up 4-purchase punch card with $10 minimum purchase requirement",
          "Configure weekly visit requirements to boost frequency patterns",
          "Implement milestone rewards: 100 points after 2 visits, $5 coupon after 4 visits",
          "Create targeted communication campaign for At Risk segment (R:2 F:3 M:4)",
          "Set up progress tracking and completion analytics"
        ]
      },
      {
        id: 1,
        title: "Win-Back Discount Series",
        description: "Launch a progressive discount series (10% → 15% → 20%) with increasing urgency.",
        impact: "high",
        effort: "medium",
        expectedLift: "+35%",
        tools: ["Marigold Messaging", "Marigold Analytics", "Ecommerce Platform"],
        implementationSteps: [
          "Segment At Risk customers by time since last purchase",
          "Create three-step email campaign with increasing offers",
          "Set timing rules (e.g., 7 days between emails)",
          "Implement discount code tracking and attribution"
        ]
      },
      {
        id: 2,
        title: "Personalized 'We Miss You' Campaign",
        description: "Create personalized outreach highlighting new products similar to previous purchases.",
        impact: "high",
        effort: "medium",
        expectedLift: "+28%",
        tools: ["Marigold Messaging", "Product Recommendation Engine"],
        implementationSteps: [
          "Target segment members with personalized product recommendations",
          "Generate email template highlighting top 3 recommendations",
          "Create journey that re-engages members that don't click",
          "Monitor unsubscribe activity for spikes"
        ]
      },
      {
        id: 3,
        title: "Limited-Time Points Multiplier",
        description: "Offer 5x points for any purchase in the next 30 days to drive immediate action.",
        impact: "high",
        effort: "low",
        expectedLift: "+25%",
        tools: ["Marigold Loyalty", "Marigold Messaging"],
        implementationSteps: [
          "Configure limited-time points multiplier",
          "Create urgency-focused email campaign",
          "Send reminders at 15 days and 5 days remaining",
          "Track response rates for future optimization"
        ]
      },
      {
        id: 4,
        title: "Customer Feedback Survey",
        description: "Send a survey to understand why they stopped purchasing with incentive for completion.",
        impact: "medium",
        effort: "low",
        expectedLift: "+12%",
        tools: ["Marigold Messaging", "Survey Platform"],
        implementationSteps: [
          "Create short, focused survey (max 5 questions)",
          "Offer meaningful incentive for completion",
          "Set up automated thank you with incentive delivery",
          "Analyze feedback to improve retention strategies"
        ]
      }
    ]
  },
  "can't lose": {
    title: "Can't Lose",
    description: "big spenders who purchased often but haven't recently",
    color: "#F44336",
    distributionPercentage: 10,
    potentialLiftRange: "40-60%",
    keyFocusArea: "re-engaging these high-value customers with personalized outreach, exclusive offers, and addressing any issues that led to their decreased activity",
    metrics: {
      customerCount: "8,347",
      avgSpend: "$720",
      retention: "56%",
      growth: "-4.7%",
      potentialGrowth: "+52%",
      retentionTrend: "-8.3%",
      recencyScore: "1.5",
      frequencyScore: "4.2",
      monetaryScore: "4.7"
    },
    purchaseHistory: [
      { month: 'Jan', purchases: 2.9, avgValue: 680 },
      { month: 'Feb', purchases: 2.2, avgValue: 710 },
      { month: 'Mar', purchases: 1.6, avgValue: 720 },
      { month: 'Apr', purchases: 0.5, avgValue: 750 },
      { month: 'May', purchases: 0.2, avgValue: 740 }
    ],
    retentionTrend: [
      { month: 'Jan', rate: 78 },
      { month: 'Feb', rate: 72 },
      { month: 'Mar', rate: 68 },
      { month: 'Apr', rate: 62 },
      { month: 'May', rate: 56 }
    ],
    rfmTrend: [
      { month: 'Jan', recency: 3.2, frequency: 4.0, monetary: 4.5 },
      { month: 'Feb', recency: 2.7, frequency: 4.0, monetary: 4.6 },
      { month: 'Mar', recency: 2.1, frequency: 4.1, monetary: 4.6 },
      { month: 'Apr', recency: 1.8, frequency: 4.1, monetary: 4.7 },
      { month: 'May', recency: 1.5, frequency: 4.2, monetary: 4.7 }
    ],
    customerCountTrend: [
      { month: 'Jan', count: 8050 },
      { month: 'Feb', count: 8150 },
      { month: 'Mar', count: 8250 },
      { month: 'Apr', count: 8300 },
      { month: 'May', count: 8350 }
    ],
    clvTrend: [
      { month: 'Jan', value: 690 },
      { month: 'Feb', value: 700 },
      { month: 'Mar', value: 710 },
      { month: 'Apr', value: 715 },
      { month: 'May', value: 720 }
    ],
    segmentTransition: [
      { name: 'Q1 2024', champions: 0.05, loyal: 0.03, potential: 0.0, atrisk: 0.05, cantlose: 0.75, churn: 0.12 },
      { name: 'Q2 2024', champions: 0.03, loyal: 0.02, potential: 0.0, atrisk: 0.08, cantlose: 0.71, churn: 0.16 }
    ],
    demographics: {
      age: [
        { name: '18-24', value: 5, color: '#2196F3' },
        { name: '25-34', value: 20, color: '#4CAF50' },
        { name: '35-44', value: 40, color: '#FFC107' },
        { name: '45-54', value: 25, color: '#9C27B0' },
        { name: '55+', value: 10, color: '#F44336' }
      ],
      gender: [
        { name: 'Male', value: 60, color: '#2196F3' },
        { name: 'Female', value: 38, color: '#E91E63' },
        { name: 'Other', value: 2, color: '#9C27B0' }
      ]
    },
    purchaseChannels: [
      { name: 'Online Store', value: 65 },
      { name: 'Mobile App', value: 5 },
      { name: 'Retail Store', value: 25 },
      { name: 'Marketplace', value: 5 }
    ],
    topProducts: [
      { name: 'Omni-Heat™ Infinity Jacket', revenue: 155000, units: 775, percentage: 20 },
      { name: 'Newton Ridge™ Hiking Boots', revenue: 120000, units: 1200, percentage: 16 },
      { name: 'Whirlibird™ IV Jacket', revenue: 98000, units: 490, percentage: 13 },
      { name: 'Bugaboo™ Winter Pants', revenue: 88000, units: 880, percentage: 10 },
      { name: 'Titanium OutDry Ex Rain Jacket', revenue: 75000, units: 250, percentage: 8 }
    ],
    categoryDistribution: [
      { name: 'Premium Winter Jackets', value: 35 },
      { name: 'Premium Footwear', value: 25 },
      { name: 'Technical Rain Gear', value: 15 },
      { name: 'Performance Pants', value: 12 },
      { name: 'Premium Accessories', value: 8 },
      { name: 'Other', value: 5 }
    ],
    recommendedActions: [
      {
        id: 1,
        title: "VIP Win-Back Program",
        description: "Create a VIP-exclusive offer with significant value and personalized outreach from account manager.",
        impact: "high",
        effort: "high",
        expectedLift: "+45%",
        tools: ["Marigold Messaging", "Marigold Loyalty", "CRM Platform"],
        implementationSteps: [
          "Assign personal account managers to high-value customers",
          "Develop personalized win-back packages with exclusive offers",
          "Create direct outreach script with personalization points",
          "Set up follow-up sequence based on response"
        ]
      },
      {
        id: 2,
        title: "Limited Edition Product Access",
        description: "Offer exclusive access to limited edition products with complimentary gift.",
        impact: "high",
        effort: "medium",
        expectedLift: "+32%",
        tools: ["Marigold Messaging", "E-commerce Platform", "Inventory Management"],
        implementationSteps: [
          "Identify or create limited edition products",
          "Develop exclusive landing page for Can't Lose customers",
          "Create personalized access codes for tracking",
          "Prepare complementary gift fulfillment process"
        ]
      },
      {
        id: 3,
        title: "Loyalty Status Extension",
        description: "Extend their loyalty status for 6 months with option to maintain it with qualifying purchase.",
        impact: "medium",
        effort: "low",
        expectedLift: "+25%",
        tools: ["Marigold Loyalty", "Marigold Messaging"],
        implementationSteps: [
          "Configure loyalty program for status extensions",
          "Create personalized communication explaining the benefit",
          "Set clear qualification criteria for maintaining status",
          "Send status update reminders at 3 months and 1 month"
        ]
      },
      {
        id: 4,
        title: "Customer Insight Interview Program",
        description: "Invite to participate in paid product feedback sessions to re-engage and gain valuable insights.",
        impact: "medium",
        effort: "medium",
        expectedLift: "+22%",
        tools: ["Marigold Messaging", "Virtual Meeting Platform", "Incentive Management"],
        implementationSteps: [
          "Create interview structure and questions",
          "Offer meaningful compensation for participation",
          "Schedule personalized invitation from product team",
          "Include special offer as additional thank you"
        ]
      }
    ]
  },
  "potential loyalists": {
    title: "Potential Loyalists",
    description: "recent customers with average frequency and spend",
    color: "#9C27B0",
    distributionPercentage: 35,
    potentialLiftRange: "30-50%",
    keyFocusArea: "increasing both frequency and monetary value through targeted promotions, cross-selling, and clear loyalty program benefits",
    metrics: {
      customerCount: "37,248",
      avgSpend: "$280",
      retention: "68%",
      growth: "+7.6%",
      potentialGrowth: "+45%",
      retentionTrend: "+3.4%",
      recencyScore: "3.1",
      frequencyScore: "3.2",
      monetaryScore: "2.9"
    },
    purchaseHistory: [
      { month: 'Jan', purchases: 1.4, avgValue: 240 },
      { month: 'Feb', purchases: 1.6, avgValue: 260 },
      { month: 'Mar', purchases: 1.5, avgValue: 270 },
      { month: 'Apr', purchases: 1.7, avgValue: 280 },
      { month: 'May', purchases: 1.8, avgValue: 290 }
    ],
    retentionTrend: [
      { month: 'Jan', rate: 64 },
      { month: 'Feb', rate: 66 },
      { month: 'Mar', rate: 65 },
      { month: 'Apr', rate: 67 },
      { month: 'May', rate: 68 }
    ],
    rfmTrend: [
      { month: 'Jan', recency: 2.9, frequency: 3.0, monetary: 2.7 },
      { month: 'Feb', recency: 3.0, frequency: 3.1, monetary: 2.8 },
      { month: 'Mar', recency: 3.0, frequency: 3.1, monetary: 2.8 },
      { month: 'Apr', recency: 3.1, frequency: 3.2, monetary: 2.9 },
      { month: 'May', recency: 3.1, frequency: 3.2, monetary: 2.9 }
    ],
    customerCountTrend: [
      { month: 'Jan', count: 34500 },
      { month: 'Feb', count: 35200 },
      { month: 'Mar', count: 36100 },
      { month: 'Apr', count: 36800 },
      { month: 'May', count: 37250 }
    ],
    clvTrend: [
      { month: 'Jan', value: 260 },
      { month: 'Feb', value: 265 },
      { month: 'Mar', value: 270 },
      { month: 'Apr', value: 275 },
      { month: 'May', value: 280 }
    ],
    segmentTransition: [
      { name: 'Q1 2024', champions: 0.02, loyal: 0.12, potential: 0.78, atrisk: 0.05, cantlose: 0.0, churn: 0.03 },
      { name: 'Q2 2024', champions: 0.03, loyal: 0.14, potential: 0.75, atrisk: 0.04, cantlose: 0.0, churn: 0.04 }
    ],
    demographics: {
      age: [
        { name: '18-24', value: 25, color: '#2196F3' },
        { name: '25-34', value: 40, color: '#4CAF50' },
        { name: '35-44', value: 20, color: '#FFC107' },
        { name: '45-54', value: 10, color: '#9C27B0' },
        { name: '55+', value: 5, color: '#F44336' }
      ],
      gender: [
        { name: 'Male', value: 42, color: '#2196F3' },
        { name: 'Female', value: 55, color: '#E91E63' },
        { name: 'Other', value: 3, color: '#9C27B0' }
      ]
    },
    purchaseChannels: [
      { name: 'Online Store', value: 50 },
      { name: 'Mobile App', value: 25 },
      { name: 'Retail Store', value: 15 },
      { name: 'Marketplace', value: 10 }
    ],
    topProducts: [
      { name: 'Steens Mountain™ Fleece', revenue: 120000, units: 2400, percentage: 18 },
      { name: 'Glennaker Rain Jacket', revenue: 98000, units: 1400, percentage: 14 },
      { name: 'Silver Ridge™ Convertible Pants', revenue: 82000, units: 1025, percentage: 12 },
      { name: 'Benton Springs™ Fleece', revenue: 78000, units: 1560, percentage: 10 },
      { name: 'Tech Trail™ Hiking Shirt', revenue: 65000, units: 1300, percentage: 8 }
    ],
    categoryDistribution: [
      { name: 'Fleece & Sweaters', value: 30 },
      { name: 'Rain Gear', value: 22 },
      { name: 'Performance Shirts', value: 18 },
      { name: 'Performance Pants', value: 15 },
      { name: 'Accessories', value: 10 },
      { name: 'Other', value: 5 }
    ],
    recommendedActions: [
      {
        id: 1,
        title: "Next Purchase Incentive Program",
        description: "Create a tiered incentive program that rewards their next 3 purchases with increasing benefits.",
        impact: "high",
        effort: "medium",
        expectedLift: "+28%",
        tools: ["Marigold Loyalty", "Marigold Messaging", "E-commerce Platform"],
        implementationSteps: [
          "Design 3-tier reward structure with escalating benefits",
          "Create personalized onboarding email explaining program",
          "Set up purchase tracking and automatic reward delivery",
          "Send reminders and progress updates"
        ]
      },
      {
        id: 2,
        title: "Frequency Booster Campaign",
        description: "Launch a campaign that incentivizes purchases within 30 days of their last transaction.",
        impact: "high",
        effort: "medium",
        expectedLift: "+25%",
        tools: ["Marigold Messaging", "Marigold Analytics", "Marigold Loyalty"],
        implementationSteps: [
          "Set up triggered emails based on purchase date",
          "Create time-sensitive offers that expire after 30 days",
          "Include personalized product recommendations",
          "Track purchase intervals for campaign optimization"
        ]
      },
      {
        id: 3,
        title: "Category Expansion Emails",
        description: "Send targeted emails introducing complementary product categories with first-purchase incentives.",
        impact: "medium",
        effort: "low",
        expectedLift: "+18%",
        tools: ["Marigold Messaging", "Marigold Analytics"],
        implementationSteps: [
          "Analyze current purchase categories for each customer",
          "Identify highest-converting complementary categories",
          "Design educational content about new category benefits",
          "Include category-specific discount or bonus"
        ]
      },
      {
        id: 4,
        title: "Loyalty Program Education Series",
        description: "Create a multi-touch campaign explaining program benefits and how to maximize value.",
        impact: "medium",
        effort: "low",
        expectedLift: "+15%",
        tools: ["Marigold Messaging", "Loyalty Program Platform"],
        implementationSteps: [
          "Create 3-4 part email series explaining program benefits",
          "Include visual explanations and examples",
          "Highlight success stories from other members",
          "Include quick-win actions for immediate rewards"
        ]
      }
    ]
  }
};

// ===== SEGMENT DATA ACCESSOR FUNCTION =====
export const getSegmentData = (segment) => {
  // Make sure segment is a string and convert to lowercase
  const segmentKey = segment ? segment.toLowerCase() : "champions";
  
  // Return data for the specified segment, or Champions as default
  return segmentDataMap[segmentKey] || segmentDataMap["champions"];
};

// ===== RECOMMENDATION BY ID ACCESSOR =====
export const getRecommendationById = (id) => {
  return rfmRecommendations.find(rec => rec.id === id);
};

// ===== RECOMMENDATIONS BY SEGMENT ACCESSOR =====
export const getRecommendationsBySegment = (segment) => {
  return rfmRecommendations.filter(rec => 
    rec.segment && rec.segment.toLowerCase() === segment.toLowerCase()
  );
};

// ===== RECOMMENDATION SYNCHRONIZATION FUNCTIONS =====
export const isRecommendationImplemented = (recommendationId) => {
  // Check if recommendation has been implemented
  // This could be stored in localStorage or a state management system
  const implementedRecs = JSON.parse(localStorage.getItem('implementedRecommendations') || '[]');
  return implementedRecs.includes(recommendationId);
};

export const markRecommendationAsImplemented = (recommendationId) => {
  const implementedRecs = JSON.parse(localStorage.getItem('implementedRecommendations') || '[]');
  if (!implementedRecs.includes(recommendationId)) {
    implementedRecs.push(recommendationId);
    localStorage.setItem('implementedRecommendations', JSON.stringify(implementedRecs));
  }
};

export const isRecommendationRejected = (recommendationId) => {
  const rejectedRecs = JSON.parse(localStorage.getItem('rejectedRecommendations') || '[]');
  return rejectedRecs.includes(recommendationId);
};

export const markRecommendationAsRejected = (recommendationId) => {
  const rejectedRecs = JSON.parse(localStorage.getItem('rejectedRecommendations') || '[]');
  if (!rejectedRecs.includes(recommendationId)) {
    rejectedRecs.push(recommendationId);
    localStorage.setItem('rejectedRecommendations', JSON.stringify(rejectedRecs));
  }
};

// ===== NEW: HELPER FUNCTION TO DETERMINE CHANGE COLOR BASED ON SEGMENT AND CHANGE VALUE =====
export const getChangeColor = (kpiData) => {
  const { segment, change, isPositiveGrowthGood } = kpiData;
  
  // Parse the change value (e.g., "+2.4%" -> 2.4, "-4.7%" -> -4.7)
  const changeValue = parseFloat(change.replace(/[+%]/g, ''));
  const isPositive = changeValue >= 0;
  
  // For segments where positive growth is good (Champions, Loyal Customers, Potential Loyalists)
  if (isPositiveGrowthGood) {
    return isPositive ? '#81C784' : '#E57373'; // Green for positive, red for negative
  }
  
  // For segments where positive growth is bad (At Risk, Can't Lose)
  else {
    return isPositive ? '#E57373' : '#81C784'; // Red for positive, green for negative
  }
};
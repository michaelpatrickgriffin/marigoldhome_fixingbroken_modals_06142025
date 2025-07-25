// src/data/SampleData.js
import { COLORS } from '../styles/ColorStyles';

// ===== SAMPLE CAMPAIGN DATA =====
export const campaignData = [
  {
    id: 1,
    title: "Winter Gear Sale",
    type: "Promotional",
    status: "Active",
    audience: "All Members",
    sent: 45892,
    opened: 18357,
    clicks: 3214,
    conversion: 2294,
    revenue: 137640,
    cost: 12500,
    roi: 1001,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-c1-1",
        title: "Dynamic Subject Line Optimization with Weather API",
        description: "Implement real-time weather-based subject line personalization using machine learning algorithms. Our AI detected that members in colder regions have 3.2x higher engagement when subject lines reference local weather conditions. This advanced personalization strategy uses predictive modeling to optimize send times and content based on 72-hour weather forecasts.",
        difficulty: "hard",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-c1-2",
        title: "Cross-Selling Gear Bundles with Predictive Analytics",
        description: "Leverage machine learning clustering analysis to predict optimal gear bundle combinations. Advanced behavioral modeling indicates 89% higher basket values when complementary items are recommended during winter promotions. Implement neural network-driven product recommendation engine with real-time inventory optimization.",
        difficulty: "hard",
        impact: "high",
        type: "expansion"
      },
      {
        id: "rec-c1-3",
        title: "Pre-Launch Community Building & Beta Testing",
        description: "Create an exclusive beta testing community with early access rewards and user-generated content incentives. Community psychology research indicates that involving customers in the product development process increases brand loyalty by 58% and purchase intent by 73%. Includes social proof mechanisms and community-driven marketing amplification.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 2,
    title: "Summit Tier Welcome",
    type: "Onboarding",
    status: "Active",
    audience: "Summit Tier",
    sent: 3254,
    opened: 2603,
    clicks: 1127,
    conversion: 782,
    revenue: 93840,
    cost: 5000,
    roi: 1777,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-c2-1",
        title: "AI-Powered Product Affinity Recommendations",
        description: "Integrate collaborative filtering and deep learning algorithms to provide hyper-personalized product recommendations. Advanced neural networks trained on Summit tier purchase patterns can increase conversion rates by 34% through intelligent product matching based on seasonal preferences, brand affinity, and complementary product analysis.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-c2-2",
        title: "VIP Experience Tier Progression Gamification",
        description: "Implement a gamified progression system with exclusive milestone rewards and social recognition elements. Behavioral psychology research indicates that Summit tier members respond strongly to status recognition and exclusive access, potentially increasing engagement by 28% and referral rates by 45%.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 3,
    title: "Trail Essentials",
    type: "Behavioral",
    status: "Active",
    audience: "Explorer Tier",
    sent: 28492,
    opened: 8547,
    clicks: 1281,
    conversion: 512,
    revenue: 30720,
    cost: 8500,
    roi: 261,
    needsAttention: true,
    recommendations: [
      {
        id: "rec-c3-1",
        title: "Behavioral Trigger Optimization with Machine Learning",
        description: "Implement advanced behavioral analysis using clustering algorithms to identify optimal engagement triggers. Machine learning models can predict the best time to send trail-focused content based on weather patterns, seasonal activity data, and individual member behavior patterns, potentially increasing ROI by 145%.",
        difficulty: "hard",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-c3-2",
        title: "User-Generated Adventure Content Program",
        description: "Launch a comprehensive UGC program where Explorer tier members share trail experiences, gear reviews, and adventure photos. Social proof mechanisms and community-driven content creation can increase engagement by 78% while reducing content creation costs. Includes automated content curation and reward systems for high-quality submissions.",
        difficulty: "hard",
        impact: "high",
        type: "expansion"
      },
      {
        id: "rec-c3-3",
        title: "Pre-Launch Community Building & Beta Testing",
        description: "Create an exclusive beta testing community with early access rewards and user-generated content incentives. Community psychology research indicates that involving customers in the product development process increases brand loyalty by 58% and purchase intent by 73%. Includes social proof mechanisms and community-driven marketing amplification.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  }
];

// ===== RFM SEGMENT DATA =====
export const rfmSegments = [
  {
    id: 'champions',
    name: 'Champions',
    color: COLORS.evergreen,
    recency: 5,
    frequency: 5,
    monetary: 5,
    description: 'Highest value customers who shop frequently and recently',
    memberCount: 2834,
    percentage: 12.3,
    avgSpend: 450,
    orders: 8.2,
    insight: 'Peak performers driving 31% of total revenue despite being only 12% of customer base',
    recommendedActions: [
      'VIP exclusive early access programs',
      'Premium loyalty tier benefits',
      'Brand ambassador opportunities',
      'High-value product launches'
    ]
  },
  {
    id: 'loyalists',
    name: 'Loyal Customers',
    color: COLORS.evergreenLight,
    recency: 4,
    frequency: 4,
    monetary: 4,
    description: 'Regular, high-value customers with consistent purchase patterns',
    memberCount: 4127,
    percentage: 17.9,
    avgSpend: 320,
    orders: 6.1,
    insight: 'Steady revenue contributors with strong brand affinity and repeat purchase behavior',
    recommendedActions: [
      'Loyalty point bonus campaigns',
      'Product bundle recommendations',
      'Birthday and anniversary rewards',
      'Referral incentive programs'
    ]
  },
  {
    id: 'potential_loyalists',
    name: 'Potential Loyalists',
    color: COLORS.teal,
    recency: 4,
    frequency: 3,
    monetary: 3,
    description: 'Recent customers with high purchase value but lower frequency',
    memberCount: 5248,
    percentage: 22.8,
    avgSpend: 280,
    orders: 3.4,
    insight: 'High conversion potential - recent engagement with significant spend indicates growth opportunity',
    recommendedActions: [
      'Frequency-building campaigns',
      'Product education series',
      'Cross-category promotions',
      'Loyalty program enrollment'
    ]
  },
  {
    id: 'promising',
    name: 'New Customers',
    color: COLORS.tealLight,
    recency: 5,
    frequency: 2,
    monetary: 2,
    description: 'Recent customers with room to grow in frequency and value',
    memberCount: 3892,
    percentage: 16.9,
    avgSpend: 145,
    orders: 1.8,
    insight: 'Fresh engagement opportunity - recent purchases show interest but need nurturing',
    recommendedActions: [
      'Welcome series campaigns',
      'Product discovery content',
      'First-purchase follow-up',
      'New member incentives'
    ]
  },
  {
    id: 'customers_needing_attention',
    name: 'Customers Needing Attention',
    color: COLORS.amber,
    recency: 3,
    frequency: 3,
    monetary: 3,
    description: 'Previously engaged customers showing signs of declining activity',
    memberCount: 4567,
    percentage: 19.8,
    avgSpend: 240,
    orders: 4.2,
    insight: 'At-risk segment showing declining recency - immediate intervention can prevent churn',
    recommendedActions: [
      'Win-back campaigns',
      'Personalized offers',
      'Product recommendation refresh',
      'Engagement surveys'
    ]
  },
  {
    id: 'at_risk',
    name: 'At Risk',
    color: COLORS.orange,
    recency: 2,
    frequency: 3,
    monetary: 4,
    description: 'High-value customers who haven\'t purchased recently',
    memberCount: 1456,
    percentage: 6.3,
    avgSpend: 380,
    orders: 5.8,
    insight: 'Critical intervention needed - high historical value but recent disengagement signals churn risk',
    recommendedActions: [
      'Premium win-back offers',
      'Personal account manager contact',
      'Exclusive event invitations',
      'Feedback collection campaigns'
    ]
  },
  {
    id: 'cannot_lose_them',
    name: 'Cannot Lose Them',
    color: COLORS.red,
    recency: 1,
    frequency: 5,
    monetary: 5,
    description: 'Top customers who haven\'t purchased in a long time',
    memberCount: 623,
    percentage: 2.7,
    avgSpend: 520,
    orders: 9.4,
    insight: 'Emergency retention required - highest value customers showing severe disengagement',
    recommendedActions: [
      'Executive-level outreach',
      'Significant discount offers',
      'Product consultation calls',
      'VIP service recovery'
    ]
  },
  {
    id: 'hibernating',
    name: 'Hibernating',
    color: COLORS.gray,
    recency: 1,
    frequency: 1,
    monetary: 1,
    description: 'Inactive customers with low historical engagement',
    memberCount: 289,
    percentage: 1.3,
    avgSpend: 95,
    orders: 1.1,
    insight: 'Minimal engagement historically and currently - low probability reactivation candidates',
    recommendedActions: [
      'Minimal cost reactivation',
      'Survey-based re-engagement',
      'Content-only touchpoints',
      'Quarterly check-ins'
    ]
  }
];

// ===== CHART DATA =====
export const monthlyStats = [
  { month: 'Jan', revenue: 2800000, customers: 42000, engagement: 3.8 },
  { month: 'Feb', revenue: 2950000, customers: 43500, engagement: 4.1 },
  { month: 'Mar', revenue: 3100000, customers: 45200, engagement: 4.3 },
  { month: 'Apr', revenue: 2875000, customers: 44800, engagement: 3.9 },
  { month: 'May', revenue: 3240000, customers: 46500, engagement: 4.2 },
  { month: 'Jun', revenue: 3180000, customers: 46200, engagement: 4.0 }
];

export const membershipData = [
  { name: 'Explorer', value: 18247, color: '#4CAF50' },
  { name: 'Adventurer', value: 15892, color: '#2196F3' },
  { name: 'Summit', value: 12468, color: '#FF9800' }
];

// ===== ENHANCED AI RESPONSE GENERATORS =====
export const getResponseGenerator = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Revenue-focused queries
  if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('sales') || lowerQuery.includes('income')) {
    return () => ({
      type: 'analysis',
      directAnswer: 'Your revenue is performing strongly with 12.7% month-over-month growth, primarily driven by Winter Gear campaigns and Summit tier customer expansion.',
      text: 'Revenue analysis shows exceptional performance across multiple channels. Winter Gear Sale campaign is driving 34% of quarterly growth with a remarkable 1001% ROI. Summit tier members are contributing 40% of total revenue despite being only 12% of your customer base. The $3.24M monthly revenue represents your strongest quarterly performance, with customer acquisition costs down 8% while retention has improved 15%. However, the Trail Essentials campaign is creating a $180K revenue drag that requires immediate attention.',
      recommendations: [
        {
          id: 'rev-1',
          title: 'Scale Winter Campaign Success Model',
          description: 'Increase budget allocation to winter gear campaigns by 25% and expand successful messaging to related seasonal categories. The 1001% ROI indicates significant untapped potential.',
          impact: 'high',
          estimatedROI: '+$284K additional revenue',
          difficulty: 'low'
        },
        {
          id: 'rev-2', 
          title: 'Summit Tier Revenue Expansion',
          description: 'Launch targeted upsell campaigns for Adventurer members approaching Summit thresholds. Include early access previews and tier progression incentives.',
          impact: 'high',
          estimatedROI: '+$156K potential revenue',
          difficulty: 'medium'
        },
        {
          id: 'rev-3',
          title: 'Address Trail Essentials Revenue Drag',
          description: 'Immediately investigate and optimize Trail Essentials campaign to stop $180K monthly revenue loss and prevent customer churn.',
          impact: 'high',
          estimatedROI: '+$180K revenue recovery',
          difficulty: 'medium'
        }
      ],
      suggestedQuestions: [
        "Which specific campaigns should I increase budget for?",
        "How can I convert more Adventurer members to Summit tier?",
        "What's causing the Trail Essentials campaign to underperform?",
        "What seasonal opportunities should I prepare for next quarter?"
      ]
    });
  }
  
  // Campaign-focused queries
  if (lowerQuery.includes('campaign') || lowerQuery.includes('email') || lowerQuery.includes('marketing') || lowerQuery.includes('pause') || lowerQuery.includes('optimize')) {
    return () => ({
      type: 'campaign_analysis',
      directAnswer: 'Your campaigns show mixed performance: Summit Tier Welcome (1777% ROI) and Winter Gear Sale (1001% ROI) are exceptional, while Trail Essentials (261% ROI) needs immediate optimization.',
      text: 'Campaign performance analysis reveals clear winners and areas for improvement. Summit Tier Welcome campaign is delivering outstanding 1777% ROI with high engagement across all metrics, indicating excellent message-market fit. Winter Gear Sale maintains strong 1001% ROI and is driving significant revenue growth. However, Trail Essentials campaign is significantly underperforming with only 261% ROI, affecting 18,900 customers and creating satisfaction issues. Email engagement is up 15% overall, but loyalty program engagement is declining due to campaign frustrations.',
      recommendations: [
        {
          id: 'camp-1',
          title: 'Pause Trail Essentials Campaign Immediately',
          description: 'Stop Trail Essentials campaign and investigate messaging, timing, and targeting issues. The low ROI is damaging customer relationships and brand perception.',
          impact: 'high',
          estimatedROI: 'Prevent $85K additional losses',
          difficulty: 'low'
        },
        {
          id: 'camp-2',
          title: 'Scale Summit Tier Success Strategy',
          description: 'Apply successful Summit Tier campaign elements to other customer segments. Test messaging frameworks and personalization approaches that drove 1777% ROI.',
          impact: 'high',
          estimatedROI: '+$245K potential revenue',
          difficulty: 'medium'
        },
        {
          id: 'camp-3',
          title: 'Implement Advanced A/B Testing',
          description: 'Deploy comprehensive A/B testing for subject lines, send times, and content personalization across underperforming campaigns.',
          impact: 'medium',
          estimatedROI: '+15-25% campaign improvement',
          difficulty: 'low'
        }
      ],
      suggestedQuestions: [
        "Which campaign elements from Summit Tier can I apply elsewhere?",
        "What specific issues are causing Trail Essentials to fail?",
        "How can I improve email open rates across all campaigns?",
        "What A/B tests should I prioritize this month?"
      ]
    });
  }
  
  // Budget and spending queries
  if (lowerQuery.includes('budget') || lowerQuery.includes('spend') || lowerQuery.includes('allocation') || lowerQuery.includes('utilization')) {
    return () => ({
      type: 'budget_analysis',
      directAnswer: 'Your budget allocation shows 67% on email campaigns and 33% on loyalty programs. Consider shifting 15% more budget toward highest ROI campaigns and addressing program failures.',
      text: 'Budget utilization analysis shows opportunities for optimization. Current allocation favors email campaigns (67%) over loyalty programs (33%), but ROI variance suggests rebalancing is needed. Winter Gear and Summit Tier campaigns are generating exceptional returns that warrant increased investment. However, Trail Essentials campaign is consuming budget while delivering poor results. The Premium Gear Access program decline is wasting loyalty budget and damaging customer relationships.',
      recommendations: [
        {
          id: 'budget-1',
          title: 'Reallocate Budget from Underperformers',
          description: 'Shift 25% of Trail Essentials budget to Winter Gear and Summit Tier campaigns that show proven ROI and growth potential.',
          impact: 'high',
          estimatedROI: '+$125K revenue improvement',
          difficulty: 'low'
        },
        {
          id: 'budget-2',
          title: 'Emergency Loyalty Program Investment',
          description: 'Allocate emergency budget to fix Premium Gear Access program and prevent further customer churn and brand damage.',
          impact: 'high',
          estimatedROI: 'Prevent $156K losses',
          difficulty: 'medium'
        },
        {
          id: 'budget-3',
          title: 'Performance-Based Budget Reallocation',
          description: 'Implement monthly budget reallocation based on ROI performance, automatically shifting spend to highest-performing campaigns.',
          impact: 'medium',
          estimatedROI: '+20-30% budget efficiency',
          difficulty: 'medium'
        }
      ],
      suggestedQuestions: [
        "What's my optimal budget split between email and loyalty?",
        "Which campaigns deserve more budget investment?",
        "How much should I invest in fixing failing programs?",
        "What's my target ROI threshold for budget allocation?"
      ]
    });
  }
  
  // Loyalty program queries
  if (lowerQuery.includes('loyalty') || lowerQuery.includes('program') || lowerQuery.includes('retention') || lowerQuery.includes('redemption')) {
    return () => ({
      type: 'loyalty_analysis',
      directAnswer: 'Your loyalty programs show critical performance gaps: Adventure Gear Punch Card excels (900% ROI), but Premium Gear Access is failing (68% decline) and needs immediate intervention.',
      text: 'Loyalty program analysis reveals urgent optimization needs. Adventure Gear Punch Card demonstrates excellent performance with 900% ROI and 48% completion rate, providing a successful model for expansion. However, Premium Gear Access Program is experiencing catastrophic 68% member decline with negative ROI, affecting premium tier perception and customer satisfaction. Trail Essentials Punch Card shows only 10% completion rate, frustrating customers and damaging brand relationships. Overall redemption rates are down 8.3%, indicating systemic engagement issues.',
      recommendations: [
        {
          id: 'loyal-1',
          title: 'Emergency Premium Program Recovery',
          description: 'Immediately redesign Premium Gear Access Program structure, survey affected members, and implement recovery campaign to restore confidence.',
          impact: 'high',
          estimatedROI: 'Prevent $285K annual losses',
          difficulty: 'hard'
        },
        {
          id: 'loyal-2',
          title: 'Expand Adventure Gear Success Model',
          description: 'Apply Adventure Gear Punch Card success elements to other programs. The 900% ROI model provides proven framework for optimization.',
          impact: 'high',
          estimatedROI: '+$185K additional revenue',
          difficulty: 'medium'
        },
        {
          id: 'loyal-3',
          title: 'Simplify Trail Essentials Structure',
          description: 'Reduce Trail Essentials punch target from 10 to 6 and add interim rewards to improve the 10% completion rate.',
          impact: 'medium',
          estimatedROI: '+$95K program recovery',
          difficulty: 'low'
        }
      ],
      suggestedQuestions: [
        "What makes Adventure Gear Punch Card so successful?",
        "How do I fix the Premium Gear Access program decline?",
        "Which loyalty programs should I pause or restructure?",
        "What program changes would improve member satisfaction?"
      ]
    });
  }
  
  // Customer segment queries (including RFM)
  if (lowerQuery.includes('customer') || lowerQuery.includes('segment') || lowerQuery.includes('rfm') || lowerQuery.includes('champion') || lowerQuery.includes('at risk') || lowerQuery.includes('churn')) {
    return () => ({
      type: 'customer_analysis',
      directAnswer: 'Your customer segments show strong Champions performance driving 31% of revenue, but At Risk customers (6.3%) need immediate attention to prevent high-value churn.',
      text: 'Customer segment analysis reveals both opportunities and risks. Champions segment (12.3% of customers) drives 31% of total revenue with $450 average spend, indicating excellent high-value customer performance. Potential Loyalists represent 22.8% of your base with significant growth opportunity. However, At Risk customers represent 6.3% of customers but account for high historical value ($380 average spend) and are showing declining engagement. Cannot Lose Them segment (2.7%) requires emergency intervention to prevent catastrophic churn of your highest-value customers.',
      recommendations: [
        {
          id: 'seg-1',
          title: 'Champions VIP Expansion Program',
          description: 'Create exclusive Champions tier benefits including early access, premium support, and brand ambassador opportunities to maximize their advocacy.',
          impact: 'high',
          estimatedROI: '+$156K from increased Champions spending',
          difficulty: 'medium'
        },
        {
          id: 'seg-2',
          title: 'At Risk Customer Recovery Campaign',
          description: 'Deploy immediate win-back campaigns for At Risk customers with personalized offers and account manager outreach.',
          impact: 'high',
          estimatedROI: 'Prevent $285K potential churn',
          difficulty: 'medium'
        },
        {
          id: 'seg-3',
          title: 'Potential Loyalists Conversion Strategy',
          description: 'Create targeted campaigns to move Potential Loyalists to Champions through frequency-building and cross-category promotions.',
          impact: 'medium',
          estimatedROI: '+$125K from segment progression',
          difficulty: 'low'
        }
      ],
      suggestedQuestions: [
        "What specific actions work best for Champions customers?",
        "How can I prevent At Risk customers from churning?",
        "Which segments have the highest growth potential?",
        "What campaigns help move customers between segments?"
      ]
    });
  }
  
  // Performance and KPI queries
  if (lowerQuery.includes('kpi') || lowerQuery.includes('performance') || lowerQuery.includes('metrics') || lowerQuery.includes('attention') || lowerQuery.includes('focus')) {
    return () => ({
      type: 'performance_analysis',
      directAnswer: 'Your KPIs show strong growth across revenue (+12.7%) and customers (+8.3%), but loyalty engagement declining requires immediate focus to prevent customer satisfaction issues.',
      text: 'Performance metrics indicate mixed results requiring strategic attention. Revenue growth of 12.7% and customer acquisition growth of 8.3% demonstrate strong market performance and successful acquisition strategies. Email engagement is improving (+1.5% click-through rate) showing content optimization success. However, loyalty program engagement is declining significantly, with Premium Gear Access showing 68% member decline and overall redemption rates down 8.3%. This loyalty crisis is affecting customer satisfaction and could impact long-term retention.',
      recommendations: [
        {
          id: 'perf-1',
          title: 'Loyalty Engagement Emergency Response',
          description: 'Immediately address loyalty program failures before they impact overall customer satisfaction and retention metrics.',
          impact: 'high',
          estimatedROI: 'Prevent $245K potential losses',
          difficulty: 'hard'
        },
        {
          id: 'perf-2',
          title: 'Scale Email Success to Loyalty',
          description: 'Apply successful email optimization strategies to loyalty program communications and member engagement.',
          impact: 'medium',
          estimatedROI: '+15-25% loyalty engagement',
          difficulty: 'medium'
        },
        {
          id: 'perf-3',
          title: 'Integrated Performance Monitoring',
          description: 'Implement cross-channel performance monitoring to catch declining metrics before they impact customer experience.',
          impact: 'medium',
          estimatedROI: 'Prevent future issues',
          difficulty: 'low'
        }
      ],
      suggestedQuestions: [
        "Which metrics are leading indicators of customer satisfaction issues?",
        "How can I improve loyalty engagement without hurting email performance?",
        "What KPIs should I monitor daily vs weekly?",
        "Which performance trends predict future problems?"
      ]
    });
  }
  
  // Engagement queries
  if (lowerQuery.includes('engagement') || lowerQuery.includes('open rate') || lowerQuery.includes('click') || lowerQuery.includes('email')) {
    return () => ({
      type: 'engagement_analysis',
      directAnswer: 'Email engagement is improving (+1.5% click-through rate) but loyalty engagement declining significantly. Focus on bridging this performance gap.',
      text: 'Engagement analysis shows diverging channel performance. Email campaigns are demonstrating strong improvement with click-through rates up 1.5% and overall engagement trending positive. Winter Gear and Summit Tier campaigns show exceptional engagement rates. However, loyalty program engagement is declining across multiple programs, with Premium Gear Access showing catastrophic 68% participation decline and overall redemption rates down 8.3%. This creates a dangerous disconnect between email and loyalty channel performance.',
      recommendations: [
        {
          id: 'eng-1',
          title: 'Cross-Channel Engagement Integration',
          description: 'Integrate email and loyalty program messaging to create cohesive customer experience and prevent channel performance gaps.',
          impact: 'high',
          estimatedROI: '+25% loyalty engagement',
          difficulty: 'medium'
        },
        {
          id: 'eng-2',
          title: 'Loyalty Communication Optimization',
          description: 'Apply successful email engagement tactics to loyalty program communications, including personalization and timing optimization.',
          impact: 'medium',
          estimatedROI: '+15% program participation',
          difficulty: 'low'
        },
        {
          id: 'eng-3',
          title: 'Engagement Recovery Campaign',
          description: 'Launch targeted campaigns to re-engage declining loyalty program members before they become fully disengaged.',
          impact: 'high',
          estimatedROI: 'Prevent $125K engagement losses',
          difficulty: 'medium'
        }
      ],
      suggestedQuestions: [
        "How can I apply email success to loyalty programs?",
        "What's causing the loyalty engagement decline?",
        "Which engagement tactics work best for outdoor customers?",
        "How do I create consistent engagement across all channels?"
      ]
    });
  }
  
  // Default/general response for questions that don't match specific categories
  return () => ({
    type: 'general',
    directAnswer: 'Your marketing performance shows strong revenue growth (+12.7%) and customer acquisition (+8.3%), but loyalty programs need immediate attention to prevent customer satisfaction issues.',
    text: 'Overall marketing performance analysis reveals a mixed but promising picture. Revenue growth of 12.7% and customer acquisition improvement of 8.3% demonstrate effective marketing strategies and strong market response. Email campaigns are performing well with improving engagement rates and exceptional ROI from Winter Gear (1001%) and Summit Tier (1777%) campaigns. However, critical issues in loyalty programs require immediate attention: Premium Gear Access Program has declined 68% and Trail Essentials shows only 10% completion rate. These program failures are affecting customer satisfaction and could impact long-term retention.',
    recommendations: [
      {
        id: 'gen-1',
        title: 'Focus Budget on Highest ROI Campaigns',
        description: 'Reallocate budget from underperforming Trail Essentials to proven winners like Winter Gear and Summit Tier campaigns.',
        impact: 'high',
        estimatedROI: '+$185K immediate revenue potential',
        difficulty: 'low'
      },
      {
        id: 'gen-2',
        title: 'Emergency Loyalty Program Intervention',
        description: 'Immediately address failing loyalty programs before they damage customer relationships and brand perception.',
        impact: 'high',
        estimatedROI: 'Prevent $285K potential losses',
        difficulty: 'hard'
      },
      {
        id: 'gen-3',
        title: 'Scale Success Model Across Programs',
        description: 'Apply Adventure Gear Punch Card success elements (900% ROI) to optimize other loyalty programs.',
        impact: 'medium',
        estimatedROI: '+$125K from program optimization',
        difficulty: 'medium'
      }
    ],
    suggestedQuestions: [
      "What should be my top 3 priorities this month?",
      "Which campaigns are driving the most revenue growth?",
      "How can I prevent loyalty program issues from affecting customer satisfaction?",
      "What's the fastest way to improve underperforming programs?"
    ]
  });
};

// ===== LOYALTY PROGRAM DATA =====
export const loyaltyProgramData = [
  {
    id: 1,
    title: "Adventure Gear Punch Card",
    type: "Punch Card",
    status: "Active",
    audience: "All Tiers",
    participants: 18547,
    punchesEarned: 124850,
    cardsCompleted: 8920,
    completionRate: 48.1,
    bonusOfferRedemption: 73.2,
    retentionRate: 91,
    repeatPurchaseRate: 68,
    avgOrderValue: 189,
    revenue: 1684830,
    cost: 168483,
    roi: 900,
    needsAttention: false,
    punchTarget: 8,
    averagePunchesPerCard: 6.7,
    recommendations: [
      {
        id: "rec-p1-1",
        title: "Accelerated Progression for High-Value Members",
        description: "Implement AI-driven dynamic progression acceleration for members showing high engagement patterns and spending velocity. Members who purchase premium gear (>$200) receive double punches during their first 30 days, increasing completion likelihood by 34% and driving higher lifetime value through early program investment.",
        difficulty: "medium",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p1-2",
        title: "Seasonal Punch Card Variations",
        description: "Launch seasonal punch card programs aligned with outdoor activity peaks (hiking season, winter sports, etc.). Research shows 67% higher engagement when rewards match seasonal customer needs. Include weather-triggered bonuses and activity-specific completion incentives.",
        difficulty: "low",
        impact: "medium",
        type: "expansion"
      }
    ]
  },
  {
    id: 2,
    title: "Trail Essentials Punch Card",
    type: "Punch Card", 
    status: "Active",
    audience: "Explorer Tier",
    participants: 2847,
    punchesEarned: 8540,
    cardsCompleted: 284,
    completionRate: 10.0,
    bonusOfferRedemption: 34.8,
    retentionRate: 45,
    repeatPurchaseRate: 28,
    avgOrderValue: 156,
    revenue: 142160,
    cost: 85296,
    roi: 67,
    needsAttention: true,
    punchTarget: 10,
    averagePunchesPerCard: 3.0,
    recommendations: [
      {
        id: "rec-p2-1",
        title: "Punch Card Structure Simplification",
        description: "Reduce punch target from 10 to 6 punches and provide immediate micro-rewards at punches 2 and 4 to maintain engagement momentum. Behavioral psychology research shows completion rates increase by 89% when interim rewards create positive reinforcement loops throughout the journey.",
        difficulty: "low",
        impact: "high",
        type: "restructure"
      },
      {
        id: "rec-p2-2",
        title: "Explorer Tier Value Proposition Enhancement",
        description: "Redesign program focus from transaction volume to experience-building with trail guides, gear education content, and community features. Experience-based rewards drive 3x higher emotional connection and 45% better retention than discount-only approaches.",
        difficulty: "medium",
        impact: "high",
        type: "enhancement"
      }
    ]
  },
  {
    id: 3,
    title: "Seasonal Rewards Program",
    type: "Points",
    status: "Active",
    audience: "All Tiers",
    participants: 12356,
    pointsEarned: 2847650,
    pointsRedeemed: 1834920,
    redemptionRate: 64.4,
    bonusOfferRedemption: 56.7,
    retentionRate: 78,
    repeatPurchaseRate: 52,
    avgOrderValue: 203,
    revenue: 982480,
    cost: 147372,
    roi: 567,
    needsAttention: false,
    averagePointsPerMember: 230,
    topRewardCategory: "Gear Accessories",
    recommendations: [
      {
        id: "rec-p3-1",
        title: "Dynamic Seasonal Bonus Multipliers",
        description: "Implement AI-driven seasonal bonus point multipliers based on weather patterns, regional outdoor activities, and inventory levels. Machine learning models can predict optimal bonus timing to increase basket size by 28% while clearing seasonal inventory efficiently.",
        difficulty: "hard",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-p3-2",
        title: "Experiential Reward Tier Addition",
        description: "Add experience-based redemption options like guided outdoor adventures, gear testing events, and skills workshops. Experiential rewards create 2.3x higher member satisfaction and generate valuable user-generated content for marketing amplification.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 4,
    title: "Peak Performance Points",
    type: "Points",
    status: "Active", 
    audience: "Adventurer Tier",
    participants: 8924,
    pointsEarned: 2156430,
    pointsRedeemed: 1402880,
    redemptionRate: 65.1,
    bonusOfferRedemption: 62.3,
    retentionRate: 82,
    repeatPurchaseRate: 59,
    avgOrderValue: 287,
    revenue: 1245670,
    cost: 156000,
    roi: 699,
    needsAttention: false,
    averagePointsPerMember: 241,
    topRewardCategory: "Premium Gear",
    recommendations: [
      {
        id: "rec-p4-1",
        title: "Performance Milestone Achievement System",
        description: "Create achievement-based point bonuses tied to actual outdoor performance tracking (fitness apps, activity monitoring). Members earn bonus points for reaching personal bests, completing challenges, or achieving outdoor goals, creating intrinsic motivation beyond transactional rewards.",
        difficulty: "hard",
        impact: "high",
        type: "gamification"
      },
      {
        id: "rec-p4-2",
        title: "Tier-Exclusive Limited Edition Rewards",
        description: "Develop Adventurer-tier exclusive reward catalog featuring limited edition gear, early access to new products, and collaboration items. Exclusivity psychology increases perceived program value by 67% and drives tier advancement motivation.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 5,
    title: "Explorer's Journey Rewards",
    type: "Milestone",
    status: "Active",
    audience: "Explorer Tier",
    participants: 15672,
    milestonesCompleted: 7836,
    completionRate: 50.0,
    bonusOfferRedemption: 71.4,
    retentionRate: 87,
    repeatPurchaseRate: 64,
    avgOrderValue: 175,
    revenue: 876540,
    cost: 131481,
    roi: 567,
    needsAttention: false,
    averageMilestonesPerMember: 0.5,
    topMilestoneCategory: "First Purchase Bonus",
    recommendations: [
      {
        id: "rec-p5-1",
        title: "Progressive Journey Personalization",
        description: "Implement machine learning algorithms to create personalized milestone journeys based on individual shopping patterns, seasonal preferences, and engagement history. Adaptive milestone spacing and reward optimization can increase completion rates by 43% through behavioral pattern recognition.",
        difficulty: "hard",
        impact: "high",
        type: "personalization"
      },
      {
        id: "rec-p5-2",
        title: "Social Journey Sharing & Community Features",
        description: "Enable milestone achievement sharing, community challenges, and peer recognition systems. Social validation and community features drive 89% higher long-term engagement and create valuable user-generated content for marketing amplification.",
        difficulty: "medium",
        impact: "medium",
        type: "social"
      }
    ]
  },
  {
    id: 6,
    title: "Summit Challenger Points",
    type: "Points",
    status: "Active",
    audience: "Summit Tier",
    participants: 4521,
    pointsEarned: 1890230,
    pointsRedeemed: 1134140,
    redemptionRate: 60.0,
    bonusOfferRedemption: 78.9,
    retentionRate: 94,
    repeatPurchaseRate: 73,
    avgOrderValue: 412,
    revenue: 1563840,
    cost: 189230,
    roi: 726,
    needsAttention: false,
    averagePointsPerMember: 418,
    topRewardCategory: "Premium Experiences",
    recommendations: [
      {
        id: "rec-p6-1",
        title: "Ultra-Premium Concierge Reward Tier",
        description: "Develop white-glove service reward options including personal gear consultations, custom equipment sourcing, and expedition planning services. Premium tier psychology research shows 73% preference for service-based over product-based rewards at this spending level.",
        difficulty: "hard",
        impact: "high",
        type: "premium"
      },
      {
        id: "rec-p6-2",
        title: "Invite-Only Challenge Event Series",
        description: "Create exclusive Summit tier challenge events with limited participation, professional athlete mentorship, and unique reward opportunities. Exclusivity-driven engagement programs show 156% higher emotional connection and 67% increased advocacy among high-value customers.",
        difficulty: "medium",
        impact: "high",
        type: "experiential"
      }
    ]
  },
  {
    id: 7,
    title: "Gear Upgrade Incentive",
    type: "Cashback",
    status: "Active",
    audience: "Adventurer Tier",
    participants: 6847,
    cashbackEarned: 89340,
    cashbackRedeemed: 71472,
    redemptionRate: 80.0,
    bonusOfferRedemption: 65.2,
    retentionRate: 81,
    repeatPurchaseRate: 58,
    avgOrderValue: 294,
    revenue: 723890,
    cost: 89340,
    roi: 710,
    needsAttention: false,
    averageCashbackPerMember: 13.05,
    topCashbackCategory: "Technical Apparel",
    recommendations: [
      {
        id: "rec-p7-1",
        title: "Predictive Upgrade Timing Optimization",
        description: "Use machine learning to predict optimal timing for gear upgrade incentives based on purchase history, seasonal patterns, and product lifecycle data. Predictive timing can increase conversion rates by 47% by reaching customers precisely when they're most likely to upgrade.",
        difficulty: "hard",
        impact: "high",
        type: "predictive"
      },
      {
        id: "rec-p7-2",
        title: "Trade-In Program Integration",
        description: "Combine cashback incentives with gear trade-in programs to create circular economy value and increase upgrade frequency. Sustainability-focused programs drive 34% higher engagement among environmentally conscious outdoor enthusiasts.",
        difficulty: "medium",
        impact: "medium",
        type: "sustainability"
      }
    ]
  },
  {
    id: 8,
    title: "Adventure Buddy Referrals",
    type: "Referral",
    status: "Active",
    audience: "All Tiers",
    participants: 9234,
    referralsSent: 14567,
    referralsCompleted: 2913,
    conversionRate: 20.0,
    bonusOfferRedemption: 84.6,
    retentionRate: 91,
    repeatPurchaseRate: 76,
    avgOrderValue: 198,
    revenue: 456780,
    cost: 68517,
    roi: 567,
    needsAttention: false,
    averageReferralsPerMember: 1.58,
    topReferralSource: "Social Media",
    recommendations: [
      {
        id: "rec-p8-1",
        title: "Social Media Integration & Viral Mechanics",
        description: "Implement one-click social sharing with visual referral cards, progress tracking, and viral incentive structures. Social psychology research indicates that gamified sharing with visual progress elements increases referral completion rates by 127%.",
        difficulty: "medium",
        impact: "high",
        type: "viral"
      },
      {
        id: "rec-p8-2",
        title: "Activity-Based Referral Rewards",
        description: "Create referral rewards tied to shared outdoor activities and adventures rather than just purchases. Experience-based referral programs generate 3.2x higher emotional engagement and create stronger social bonds that drive long-term retention.",
        difficulty: "medium",
        impact: "medium",
        type: "experiential"
      }
    ]
  },
  {
    id: 9,
    title: "Early Bird Access",
    type: "Access",
    status: "Active",
    audience: "Summit Tier",
    participants: 3842,
    accessEventsOffered: 24,
    accessEventsUtilized: 18,
    utilizationRate: 75.0,
    bonusOfferRedemption: 89.3,
    retentionRate: 96,
    repeatPurchaseRate: 81,
    avgOrderValue: 467,
    revenue: 892340,
    cost: 45000,
    roi: 1883,
    needsAttention: false,
    averageEventsPerMember: 6.25,
    topAccessCategory: "Limited Edition Gear",
    recommendations: [
      {
        id: "rec-p9-1",
        title: "Predictive Access Event Personalization",
        description: "Use machine learning algorithms to personalize early access offerings based on individual preferences, purchase history, and engagement patterns. Predictive personalization can increase utilization rates from 75% to 91% while driving higher satisfaction scores.",
        difficulty: "hard",
        impact: "high",
        type: "personalization"
      },
      {
        id: "rec-p9-2",
        title: "Exclusive Community Advisory Program",
        description: "Transform early access into a co-creation program where Summit members provide product feedback, beta testing, and development input. Advisory programs create 234% higher emotional investment and generate valuable product insights while strengthening brand loyalty.",
        difficulty: "medium",
        impact: "high",
        type: "advisory"
      }
    ]
  },
  {
    id: 10,
    title: "Anniversary Rewards",
    type: "Milestone",
    status: "Active",
    audience: "All Tiers",
    participants: 18945,
    milestonesCompleted: 9472,
    completionRate: 50.0,
    bonusOfferRedemption: 67.8,
    retentionRate: 88,
    repeatPurchaseRate: 72,
    avgOrderValue: 234,
    revenue: 1145680,
    cost: 171852,
    roi: 567,
    needsAttention: false,
    averageMilestonesPerMember: 0.5,
    topMilestoneCategory: "Anniversary Discounts",
    recommendations: [
      {
        id: "rec-p10-1",
        title: "Dynamic Anniversary Experience Tiering",
        description: "Restructure anniversary rewards based on customer lifetime value and engagement patterns rather than simple tenure. High-value members receive premium anniversary experiences while growing members get targeted development campaigns. Can improve ROI to +67% while increasing overall member satisfaction through relevant rewards.",
        difficulty: "hard",
        impact: "high",
        type: "restructure"
      },
      {
        id: "rec-p10-2",
        title: "Anniversary Experience Journey Enhancement",
        description: "Transform anniversary bonuses into comprehensive experience journeys that include personalized content, exclusive access, community recognition, and milestone rewards throughout the anniversary period. Experience-based loyalty programs generate 2.1x higher emotional connection and 45% better retention compared to points-only approaches.",
        difficulty: "medium",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p10-3",
        title: "Earned Milestone Achievement System",
        description: "Implement an achievement-based milestone system where anniversary rewards are unlocked through engagement activities, purchases, or community participation. This ensures rewards go to active members while encouraging desired behaviors. Can optimize program costs by 40% while improving member quality and engagement.",
        difficulty: "medium",
        impact: "medium",
        type: "restriction"
      },
      {
        id: "rec-p10-4",
        title: "Member Co-Creation & Ambassador Program",
        description: "Create anniversary programs where long-term members become co-creators and brand ambassadors through exclusive beta testing, product feedback, and community leadership roles. Member investment programs show 78% higher retention and generate valuable user-generated content and insights.",
        difficulty: "hard",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 11,
    title: "Premium Gear Access Program",
    type: "Access",
    status: "Active",
    audience: "All Tiers",
    participants: 2156,
    accessEventsOffered: 36,
    accessEventsUtilized: 8,
    utilizationRate: 22.2,
    bonusOfferRedemption: 28.4,
    retentionRate: 41,
    repeatPurchaseRate: 23,
    avgOrderValue: 312,
    revenue: 156780,
    cost: 89640,
    roi: 75,
    needsAttention: true,
    averageEventsPerMember: 0.61,
    topAccessCategory: "Technical Gear",
    recommendations: [
      {
        id: "rec-p11-1",
        title: "Program Value Proposition Redesign",
        description: "Completely restructure program from access-based to education-based with gear expertise workshops, performance consultations, and skill-building sessions. Educational programs drive 3.4x higher perceived value and 78% better retention than access-only approaches.",
        difficulty: "hard",
        impact: "high",
        type: "restructure"
      },
      {
        id: "rec-p11-2",
        title: "Targeted Audience Refinement",
        description: "Analyze low engagement patterns and restrict program to Summit tier members who show highest utilization likelihood. Focused targeting can improve engagement rates by 156% while reducing program costs by 40%.",
        difficulty: "medium",
        impact: "medium",
        type: "targeting"
      }
    ]
  }
];

// ===== INSIGHTS DATA WITH RECOMMENDATIONS =====
export const insightsData = {
  performanceInsights: [
    {
      type: 'attention',
      text: 'Premium Gear Access Program experiencing significant member decline: 68% participation drop',
      impact: 'Program optimization needed to prevent further revenue loss and protect premium tier perception',
      programId: 11,
      severity: 'high',
      action: 'View Program Details'
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
      text: 'Point redemption rate down 8.3% month-over-month, indicating engagement enhancement opportunities',
      impact: 'Member experience improvements could recover $32K in unredeemed value',
      programId: 2,
      severity: 'low',
      action: 'View Analytics'
    },
    {
      type: 'positive',
      text: 'Adventure Gear Punch Card demonstrates excellent performance: 48% completion rate with 900% ROI',
      impact: '$1.68M revenue generation provides proven model for program optimization',
      programId: 1,
      severity: 'low',
      action: 'scale'
    }
  ],
  recommendedActions: [
    {
      text: 'Address Premium Gear Access Program performance issues to improve member engagement',
      impact: 'Could prevent $156K revenue loss and restore premium tier confidence within 60 days',
      difficulty: 'High',
      priority: 'high',
      programId: 11,
      action: 'optimize'
    },
    {
      text: 'Optimize Trail Essentials Punch Card structure based on member behavior analysis',
      impact: 'Could improve completion rates by 35% and recover $85K in program value',
      difficulty: 'Medium',
      priority: 'high',
      programId: 2,
      action: 'optimize'
    },
    {
      text: 'Apply Adventure Gear success model insights to optimize underperforming programs',
      impact: 'Could generate $95K additional annual revenue per successful optimization',
      difficulty: 'Medium',
      priority: 'high', 
      programId: 1,
      action: 'scale'
    }
  ],
  recommendations: [
    {
      id: 1,
      title: "Summit Tier Upsell Campaign",
      description: "Create targeted campaigns for Adventurer tier members approaching Summit tier spending thresholds. Include early access previews and tier progression incentives.",
      impact: "high",
      difficulty: "low",
      tools: ["Marigold Messaging", "Marigold Loyalty"]
    },
    {
      id: 2,
      title: "Seasonal Product Bundle Strategy",
      description: "Develop weather-triggered product bundles combining complementary outdoor gear. Target members based on geographic location and historical purchase patterns.",
      impact: "high",
      difficulty: "medium",
      tools: ["Marigold Messaging", "Marigold Analytics"]
    },
    {
      id: 3,
      title: "Win-Back Campaign for At-Risk Customers",
      description: "Design personalized win-back campaigns for customers showing declining engagement. Focus on product categories with higher margins to maintain profitability.",
      impact: "medium",
      difficulty: "low",
      tools: ["Marigold Messaging", "Marigold Loyalty"]
    },
    {
      id: 4,
      title: "Explorer Tier Re-engagement Campaign",
      description: "Create a re-engagement series targeting Explorer members who haven't made a purchase in the last 90 days. Include personalized product recommendations based on previous browsing and purchase history along with a modest discount.",
      impact: "medium",
      difficulty: "low",
      tools: ["Marigold Messaging", "Marigold Analytics"]
    }
  ]
};

// ===== Outdoors SPORTSWEAR SPECIFIC KPI DATA =====
export const columbiaKpiCardsData = [
  {
    title: "Revenue",
    value: "$3.24M",
    change: "+12.7%",
    changeColor: "#4CAF50",
    icon: "DollarSign",
    iconBg: "kpi-icon-bg-revenue",
    secondaryText: "vs last month",
    punchCardImpact: "Growing despite $180K drag from Trail Essentials punch card crisis"
  },
  {
    title: "Customers",
    value: "46.5K",
    change: "+8.3%",
    changeColor: "#4CAF50",
    icon: "Users",
    iconBg: "kpi-icon-bg-customers",
    secondaryText: "vs last month",
    punchCardImpact: "18.9K customers affected by failing punch card program"
  },
  {
    title: "Engagement",
    value: "4.2%",
    change: "+1.5%",
    changeColor: "#4CAF50",
    icon: "Target",
    iconBg: "kpi-icon-bg-engagement",
    secondaryText: "click-through rate",
    punchCardImpact: "Email improving but loyalty engagement declining from punch card failures"
  },
  {
    title: "Conversion",
    value: "3.8%",
    change: "+0.7%",
    changeColor: "#4CAF50",
    icon: "ShoppingBag",
    iconBg: "kpi-icon-bg-conversion",
    secondaryText: "conversion rate",
    punchCardImpact: "Strong growth despite loyalty program frustrations"
  },
  {
    title: "Audience",
    value: "248K",
    change: "+14.2%",
    changeColor: "#4CAF50",
    icon: "Award",
    iconBg: "kpi-icon-bg-audience",
    secondaryText: "total reach",
    punchCardImpact: "Growth continues but retention at risk from program failures"
  }
];

// ===== ALIAS FOR BACKWARD COMPATIBILITY =====
export const kpiCardsData = columbiaKpiCardsData;

// ===== USER PROFILES AND DASHBOARD CONFIGURATIONS =====
export const userProfiles = [
  {
    id: 'alex_morgan',
    name: 'Alex Morgan',
    title: 'Marketing Director',
    avatar: 'AM',
    dashboards: ['rfm', 'standard'],
    defaultDashboard: 'rfm',
    description: 'Full dashboard access with RFM analytics focus'
  },
  {
    id: 'janet_wilson',
    name: 'Janet Wilson',
    title: 'Campaign Manager',
    avatar: 'JW',
    dashboards: ['marketing'],
    defaultDashboard: 'marketing',
    description: 'Campaign-focused view with AI assistance'
  },
  {
    id: 'ross_smalley',
    name: 'Ross Smalley',
    title: 'Performance Analyst',
    avatar: 'RS',
    dashboards: ['narrative'],
    defaultDashboard: 'narrative',
    description: 'Narrative-focused view for non-technical marketers'
  },
  {
    id: 'mike_torres',
    name: 'Mike Torres',
    title: 'KPI Analyst',
    avatar: 'MT',
    dashboards: ['standard'],
    defaultDashboard: 'standard',
    description: 'KPI dashboard only access for metrics analysis'
  }
];

// ===== BRAND DATA =====
export const brandData = [
  {
    id: 'all',
    name: 'All Brands',
    description: 'Combined view across all brand properties'
  },
  {
    id: 'peak_gear',
    name: 'Peak Gear',
    description: 'Premium mountaineering and climbing equipment'
  },
  {
    id: 'trail_runners',
    name: 'Trail Runners',
    description: 'Running and trail-specific apparel and footwear'
  },
  {
    id: 'base_camp',
    name: 'Base Camp',
    description: 'Outdoor lifestyle and casual adventure wear'
  },
  {
    id: 'summit_series',
    name: 'Summit Series',
    description: 'Elite performance gear for extreme conditions'
  }
];

// ===== DASHBOARD CONFIGURATIONS =====
export const dashboardConfigurations = {
  'overview': { key: 'overview', label: 'Marigold AI' },
  'marketing': { key: 'marketing', label: 'Campaign View' },
  'narrative': { key: 'narrative', label: 'Narrative View' },
  'standard': { key: 'standard', label: 'KPI View' },
  'rfm': { key: 'rfm', label: 'RFM View' }
};

export const profileDashboardOrder = {
  'alex_morgan': ['rfm', 'standard'],
  'janet_wilson': ['marketing'],
  'ross_smalley': ['narrative'],
  'mike_torres': ['standard'],
  'default': ['overview', 'standard', 'marketing', 'rfm']
};

// ===== UI CONFIGURATION DATA =====

// Action Button Configurations
export const actionButtonConfig = {
  actions: [
    { 
      id: 'campaign', 
      label: 'Campaign', 
      icon: 'Mail',
      description: 'Create email marketing campaigns'
    },
    { 
      id: 'loyalty', 
      label: 'Loyalty Program', 
      icon: 'Award',
      description: 'Design loyalty programs and rewards'
    },
    { 
      id: 'audience', 
      label: 'Audience Segment', 
      icon: 'Target',
      description: 'Define customer segments'
    },
    { 
      id: 'event', 
      label: 'Event', 
      icon: 'Calendar',
      description: 'Schedule marketing events'
    }
  ],
  successMessages: {
    campaign: '{title} has been created successfully.',
    loyalty: '{title} has been created successfully.',
    audience: 'Audience segment has been created successfully.',
    event: 'Event has been scheduled successfully.'
  }
};

// AI Copilot Configuration
export const aiCopilotConfig = {
  defaultInput: 'How can I improve April loyalty engagement?',
  buttonLabels: {
    apply: 'Apply to Journey',
    launch: 'Launch Challenge',
    restart: 'Restart conversation'
  },
  placeholders: {
    input: 'Ask a question...'
  },
  loadingStates: {
    thinking: 'AI is thinking...',
    typing: 'AI is typing...'
  },
  panelTitle: 'Marigold AI Copilot',
  initialResponse: 'Based on your loyalty program data, here are three high-impact strategies to boost April engagement:',
  
  // Predefined AI responses for common questions
  responses: {
    loyalty: "Based on your Outdoor Sportswear loyalty program data, I recommend a three-tiered structure: Explorer (entry level), Trailblazer (mid-tier), and Summit (premium tier). This aligns with your outdoor brand identity and provides clear progression paths. Each tier should offer progressively better benefits like exclusive access, higher point multipliers, and special events. I'd recommend setting the Trailblazer threshold at $500 annual spend and Summit at $1,500 based on your customer spending patterns.",
    segment: "Your \"Can't Lose\" segment shows declining engagement, with a 4.7% decrease in activity. These are high-value customers (average spend of $720) who haven't purchased recently. Similar recovery campaigns achieve 42% reactivation rates.",
    campaign: "Your email campaigns show strong open rates but declining loyalty program engagement. The Winter Gear campaign has a 1001% ROI, while Trail Essentials underperforms at 261% ROI. Consider reallocating budget from underperforming campaigns to proven winners, and test subject line optimization.",
    budget: "Your current spend allocation shows 67% on email campaigns and 33% on loyalty programs. Given the performance data, I recommend shifting 15% more budget toward your highest ROI campaigns and investing in loyalty program optimization to address the 68% decline in premium tier participation.",
    default: "I'm here to help you optimize your marketing performance. I can analyze your campaigns, loyalty programs, customer segments, and budget allocation. What specific area would you like to focus on?"
  },
  styling: {
    primaryColor: '#1A4C49',
    secondaryColor: '#4D9892',
    backgroundColor: 'white',
    borderRadius: '0.75rem'
  }
};

// Notification Panel Configurations
export const notificationConfig = {
  filterTabs: [
    { id: 'all', label: 'All' },
    { id: 'alert', label: 'Alerts' },
    { id: 'message', label: 'Messages' }
  ],
  sectionHeaders: {
    today: 'Today',
    yesterday: 'Yesterday',
    earlier: 'Earlier'
  },
  emptyStateMessages: {
    all: {
      title: 'No notifications',
      subtitle: "You're all caught up!"
    },
    alert: {
      title: 'No alerts',
      subtitle: "You're all caught up!"
    },
    message: {
      title: 'No messages',
      subtitle: "You're all caught up!"
    }
  },
  actionLabels: {
    dismiss: 'Dismiss',
    markAllRead: 'Mark All as Read'
  }
};

// Profile Recommendations Data
export const profileRecommendationsData = [
  {
    id: 1,
    title: "Optimize Campaign Performance",
    description: "Review underperforming campaigns and adjust targeting",
    priority: "high",
    category: "campaigns"
  },
  {
    id: 2,
    title: "Analyze Customer Segments",
    description: "Deep dive into customer behavior patterns",
    priority: "medium",
    category: "analytics"
  },
  {
    id: 3,
    title: "Review Loyalty Programs",
    description: "Assess loyalty program effectiveness and engagement",
    priority: "medium",
    category: "loyalty"
  }
];

// Profile Panel Configurations
export const profilePanelConfig = {
  menuItems: [
    { icon: 'User', label: 'My Profile', divider: false },
    { icon: 'Settings', label: 'Account Settings', divider: false },
    { icon: 'HelpCircle', label: 'Help Center', divider: true },
    { icon: 'LogOut', label: 'Sign Out', divider: false }
  ],
  sectionLabels: {
    forYou: 'For You',
    noRecommendations: 'No recommendations at this time',
    checkBackLater: 'Check back later for personalized suggestions'
  },
  footerInfo: {
    product: 'Marigold Marketing Cloud',
    version: 'v4.2.1'
  }
};

// Sidebar Menu Configuration
export const sidebarMenuConfig = {
  menuItems: [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: 'LayoutDashboard',
      expandable: false
    },
    { 
      id: 'messaging', 
      label: 'Messaging', 
      icon: 'Mail',
      expandable: true,
      subItems: [
        { id: 'messaging-content', label: 'Content' },
        { id: 'messaging-journeys', label: 'Journeys' },
        { id: 'messaging-lists', label: 'Lists' },
        { id: 'messaging-reports', label: 'Reports' },
        { id: 'messaging-dashboards', label: 'Dashboards' },
        { id: 'messaging-library', label: 'Library' },
        { id: 'messaging-data-exchange', label: 'Data Exchange' },
        { id: 'messaging-cadence', label: 'Cadence' },
        { id: 'messaging-admin-configuration', label: 'Admin Configuration' }
      ]
    },
    { 
      id: 'loyalty', 
      label: 'Loyalty', 
      icon: 'Award',
      expandable: true,
      subItems: [
        { id: 'loyalty-analytics', label: 'Analytics' },
        { 
          id: 'loyalty-members', 
          label: 'Members',
          expandable: true,
          subItems: [
            { id: 'loyalty-members-members', label: 'Members' },
            { id: 'loyalty-members-csr', label: 'CSR' },
            { id: 'loyalty-members-segment', label: 'Segment' },
            { id: 'loyalty-members-groups', label: 'Groups' },
            { id: 'loyalty-members-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-campaigns', 
          label: 'Campaigns',
          expandable: true,
          subItems: [
            { id: 'loyalty-campaigns-campaigns', label: 'Campaigns' },
            { id: 'loyalty-campaigns-offers', label: 'Offers' },
            { id: 'loyalty-campaigns-punchcards', label: 'Punchcards' },
            { id: 'loyalty-campaigns-wallet-passes', label: 'Wallet Passes' },
            { id: 'loyalty-campaigns-store-participation', label: 'Store Participation' },
            { id: 'loyalty-campaigns-triggered-marketing', label: 'Triggered Marketing' },
            { id: 'loyalty-campaigns-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-challenges', 
          label: 'Challenges',
          expandable: true,
          subItems: [
            { id: 'loyalty-challenges-challenges', label: 'Challenges' },
            { id: 'loyalty-challenges-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-transactions', 
          label: 'Transactions',
          expandable: true,
          subItems: [
            { id: 'loyalty-transactions-gift-cards', label: 'Gift Cards' },
            { id: 'loyalty-transactions-codes', label: 'Codes' },
            { id: 'loyalty-transactions-receipts', label: 'Receipts' },
            { id: 'loyalty-transactions-flights', label: 'Flights' },
            { id: 'loyalty-transactions-orders', label: 'Orders' },
            { id: 'loyalty-transactions-discounts', label: 'Discounts' },
            { id: 'loyalty-transactions-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-rewards', 
          label: 'Rewards',
          expandable: true,
          subItems: [
            { id: 'loyalty-rewards-rewards', label: 'Rewards' },
            { id: 'loyalty-rewards-badges', label: 'Badges' },
            { id: 'loyalty-rewards-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-communities', 
          label: 'Communities',
          expandable: true,
          subItems: [
            { id: 'loyalty-communities-news-feed', label: 'News Feed' },
            { id: 'loyalty-communities-gallery', label: 'Gallery' },
            { id: 'loyalty-communities-communities', label: 'Communities' },
            { id: 'loyalty-communities-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-rules', 
          label: 'Rules',
          expandable: true,
          subItems: [
            { id: 'loyalty-rules-earn-rules', label: 'Earn Rules' },
            { id: 'loyalty-rules-tier-schemes', label: 'Tier Schemes' },
            { id: 'loyalty-rules-order-rules', label: 'Order Rules' },
            { id: 'loyalty-rules-pricing-rules', label: 'Pricing Rules' },
            { id: 'loyalty-rules-triggered-actions', label: 'Triggered Actions' },
            { id: 'loyalty-rules-lookups', label: 'Lookups' },
            { id: 'loyalty-rules-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-program', 
          label: 'Program',
          expandable: true,
          subItems: [
            { id: 'loyalty-program-earn-deployment', label: 'Earn Deployment' },
            { id: 'loyalty-program-member-metrics', label: 'Member Metrics' },
            { id: 'loyalty-program-member-attributes', label: 'Member Attributes' },
            { id: 'loyalty-program-member-functions', label: 'Member Functions' },
            { id: 'loyalty-program-activity-types', label: 'Activity Types' },
            { id: 'loyalty-program-business-units', label: 'Business Units' },
            { id: 'loyalty-program-settings', label: 'Settings' }
          ]
        },
        { 
          id: 'loyalty-admin', 
          label: 'Admin',
          expandable: true,
          subItems: [
            { id: 'loyalty-admin-access', label: 'Access' },
            { id: 'loyalty-admin-locations', label: 'Locations' },
            { id: 'loyalty-admin-products', label: 'Products' },
            { id: 'loyalty-admin-content', label: 'Content' },
            { id: 'loyalty-admin-servers', label: 'Servers' },
            { id: 'loyalty-admin-integration', label: 'Integration' },
            { id: 'loyalty-admin-jobs', label: 'Jobs' },
            { id: 'loyalty-admin-triggers', label: 'Triggers' },
            { id: 'loyalty-admin-settings', label: 'Settings' }
          ]
        }
      ]
    }
  ],
  footerInfo: {
    brand: 'Marigold',
    product: 'Marketing Cloud'
  }
};

// Overview Dashboard Configuration
export const overviewDashboardConfig = {
  sampleQuestions: [
    "What's driving my revenue growth this month?",
    "Which campaigns need immediate attention?",
    "How can I improve customer engagement?",
    "What are my top performing segments?",
    "Where should I focus my marketing efforts?"
  ],
  defaultInsights: {
    performanceInsights: [
      {
        type: 'positive',
        text: 'Revenue increased 12.7% vs last month',
        impact: 'Strong performance across multiple channels'
      },
      {
        type: 'attention',
        text: 'Email engagement down 3.2%',
        impact: 'May require content optimization'
      }
    ]
  },
  summaryText: "Your marketing performance shows strong growth with selective optimization opportunities.",
  focusAreas: [
    "Revenue Growth",
    "Customer Engagement", 
    "Campaign Optimization",
    "Segment Performance"
  ],
  
  // Apple-style focus areas configuration
  focusAreas: {
    headline: "Loyalty Program Performance Issues Requiring Strategic Attention",
    areas: [
      {
        metric: "Premium Gear Access Program",
        value: "68%",
        insight: "Member decline in 60 days with -56% ROI affecting premium tier perception",
        impact: "4,280 affected customers, $156K revenue loss, operational challenges",
        action: "Redesign program structure and implement member recovery campaign"
      },
      {
        metric: "Trail Essentials Punch Card",
        value: "10%",
        insight: "Low completion rate with -39% ROI causing customer frustration and churn",
        impact: "18.9K customers affected, $180K revenue drag, 23% of customer complaints",
        action: "Restructure program design and deploy customer satisfaction campaign"
      },
      {
        metric: "Overall Program Health",
        value: "-8.3%",
        insight: "Loyalty redemption decline driven by cascading program performance issues and member concerns",
        impact: "Approximately $32,000 in unredeemed value, engagement declining",
        action: "Deploy comprehensive loyalty program optimization using Adventure Gear success model"
      }
    ]
  },

  // Animation and timing configurations
  animations: {
    pulseTimeout: 10000, // 10 seconds for pulsing notifications
    fadeInDelay: 1500, // 1.5 seconds for AI response delay
    questionClickDelay: 50, // Small delay for question suggestions
    historySlideIn: 300 // 0.3 seconds for history panel
  },

  // UI styling constants
  styling: {
    cardGradients: {
      revenue: "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(76, 175, 80, 0.05) 100%)",
      customers: "linear-gradient(135deg, rgba(33, 150, 243, 0.12) 0%, rgba(33, 150, 243, 0.05) 100%)",
      engagement: "linear-gradient(135deg, rgba(255, 193, 7, 0.12) 0%, rgba(255, 193, 7, 0.05) 100%)"
    },
    borderColors: {
      revenue: "rgba(76, 175, 80, 0.15)",
      customers: "rgba(33, 150, 243, 0.15)",
      engagement: "rgba(255, 193, 7, 0.15)"
    },
    boxShadows: {
      revenue: "0 4px 15px rgba(76, 175, 80, 0.1)",
      customers: "0 4px 15px rgba(33, 150, 243, 0.1)",
      engagement: "0 4px 15px rgba(255, 193, 7, 0.1)"
    },
    iconColors: {
      revenue: "#2E7D32",
      customers: "#1565C0", 
      engagement: "#F57F17"
    }
  }
};

// ===== NARRATIVE MARKETING DASHBOARD CONFIGURATIONS =====

// Narrative Marketing Dashboard Configuration
export const narrativeMarketingConfig = {
  // Narrative-focused prompts for non-technical marketers
  narrativePrompts: [
    "What campaigns should I focus on this week?",
    "Which campaigns are my biggest wins right now?",
    "What's going wrong with my underperforming campaigns?",
    "How can I quickly improve my worst campaign?",
    "What should I tell my boss about this month's performance?",
    "Which loyalty programs are helping drive revenue?",
    "What story do my metrics tell about customer engagement?",
    "How do I explain these results to stakeholders?",
    "What are the key takeaways from this data?",
    "What actions should I prioritize this week?"
  ],
  
  // Sample insights for narrative view
  narrativeInsights: {
    headline: "Your Marketing Performance Story",
    summary: "Strong revenue growth driven by successful campaigns, with strategic opportunities in loyalty program optimization",
    keyStoryPoints: [
      "Winter campaigns are your revenue growth engine, driving 34% of quarterly performance",
      "Summit tier customers remain highly engaged but represent untapped expansion opportunity", 
      "Trail Essentials program needs immediate attention - low engagement affecting customer satisfaction",
      "Overall customer acquisition costs are trending down while retention metrics improve"
    ],
    actionableRecommendations: [
      "Double down on winter campaign success by expanding to related seasonal categories",
      "Investigate Trail Essentials program issues and implement quick wins for member satisfaction",
      "Develop Summit tier expansion strategy to capture more high-value customer spend"
    ]
  },

  // Simplified metrics for narrative dashboard
  keyMetrics: [
    {
      label: "Revenue Growth",
      value: "+12.7%",
      insight: "Strongest quarterly performance driven by seasonal campaigns",
      trend: "positive"
    },
    {
      label: "Customer Engagement",
      value: "+4.2%",
      insight: "Email engagement improving but loyalty participation declining",
      trend: "mixed"
    },
    {
      label: "Campaign ROI",
      value: "1,001%",
      insight: "Winter Gear and Summit Tier campaigns delivering exceptional returns",
      trend: "positive"
    },
    {
      label: "Program Health",
      value: "68% decline",
      insight: "Premium Access program experiencing significant member churn",
      trend: "negative"
    }
  ]
};

// ===== DASHBOARD KPI CARDS CONFIGURATIONS =====

// Dashboard KPI Cards Configuration
export const dashboardKpiConfig = {
  // Icon name to component mapping
  iconMapping: {
    'DollarSign': 'DollarSign',
    'Users': 'Users',
    'Target': 'Target',
    'Award': 'Award',
    'TrendingUp': 'TrendingUp',
    'ShoppingBag': 'ShoppingBag'
  },

  // Icon background class to color mapping
  iconColorMapping: {
    'kpi-icon-bg-revenue': '#4CAF50',  // Green
    'kpi-icon-bg-customers': '#2196F3', // Blue
    'kpi-icon-bg-engagement': '#FFC107', // Yellow/Amber
    'kpi-icon-bg-conversion': '#9C27B0', // Purple
    'kpi-icon-bg-audience': '#F44336'  // Red
  },

  // Grid layout configuration
  gridConfig: {
    columns: 5,
    gap: '1rem',
    responsive: true
  }
};

// ===== HEADER CONFIGURATIONS =====

// Header Configuration
export const headerConfig = {
  // Animation timing configurations
  animations: {
    pulseTimeout: 10000, // 10 seconds for critical notification pulse
    transitionDuration: '0.3s' // Menu slide transition
  },

  // Notification badge styling
  notificationBadge: {
    normalColor: '#F44336',
    criticalColor: '#F44336',
    pulseBoxShadow: '0 0 0 2px rgba(244, 67, 54, 0.2)',
    borderWidth: '1.5px',
    size: '18px',
    fontSize: '10px'
  },

  // Header layout and styling
  layout: {
    logoSize: '2.5rem',
    avatarSize: '2.25rem', // 9 * 0.25rem
    padding: '1rem 1.5rem',
    hamburgerMargin: '1rem'
  }
};

// ===== SUGGESTED QUESTIONS CONFIGURATION =====
export const suggestedQuestionsConfig = {
  header: {
    title: 'Suggested Questions',
    icon: 'Bot',
    iconSize: 18
  },
  questionButton: {
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '0.875rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    hoverStyles: {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    icon: 'ChevronRight',
    iconSize: 16
  },
  clearButton: {
    styling: {
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      border: 'none',
      fontSize: '0.8125rem',
      fontWeight: 500,
      cursor: 'pointer',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    text: 'Clear Response',
    icon: 'X',
    iconSize: 14
  },
  container: {
    className: 'suggested-questions-container',
    titleClassName: 'suggested-questions-title',
    listClassName: 'suggested-questions-list',
    buttonClassName: 'suggested-question-button',
    clearButtonClassName: 'suggested-questions-clear'
  },
  animations: {
    fadeInDelay: 0.3,
    staggerDelay: 0.1,
    baseDelay: 0.2
  }
};

// ===== AI COPILOT RESPONSE CONFIGURATION =====
export const aiCopilotResponseConfig = {
  header: {
    title: 'AI Assistant',
    clearButtonText: 'Clear'
  },
  questionDisplay: {
    prefix: '❓',
    styling: {
      backgroundColor: 'rgba(26, 76, 73, 0.05)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      marginBottom: '1rem',
      borderLeft: '3px solid #1A4C49',
      display: 'flex',
      gap: '0.75rem',
      fontSize: '0.875rem',
      color: '#1A4C49',
      fontWeight: 500
    }
  },
  responseContainer: {
    botIconSize: 20,
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    containerSpacing: '2.5rem'
  },
  recommendations: {
    title: 'Recommended Actions',
    titleIcon: 'CheckCircle',
    titleIconSize: 18,
    cardSpacing: '1rem',
    cardPadding: '1rem',
    cardBorderRadius: '0.5rem',
    impactColors: {
      high: {
        icon: 'ArrowUpRight',
        color: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)'
      },
      medium: {
        icon: 'TrendingUp',
        color: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)'
      }
    },
    roiColors: {
      icon: 'TrendingUp',
      color: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)'
    }
  },
  buttons: {
    details: {
      text: 'View Details',
      styling: {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: '1px solid',
        backgroundColor: 'white',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer'
      }
    },
    apply: {
      text: 'Apply Recommendation',
      icon: 'ArrowUpRight',
      iconSize: 14,
      styling: {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer'
      }
    }
  },
  animations: {
    fadeInDelay: 0.3,
    staggerDelay: 0.1,
    baseDelay: 0.2
  }
};
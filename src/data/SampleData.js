// src/data/SampleData.js
// Enhanced sample data with sophisticated AI recommendations
// REORDERED: Attention needed first, then by highest ROI

export const campaignData = [
  // === ATTENTION NEEDED CAMPAIGNS (by ROI desc) ===
  {
    id: 4,
    title: "Spring Adventure Newsletter",
    type: "Informational",
    status: "Active",
    audience: "All Members",
    sent: 52450,
    opened: 5245,
    conversion: 420,
    revenue: 12600,
    cost: 7500,
    roi: 68,
    needsAttention: true,
    attentionReason: "Lower than expected open rate (10%) - optimization opportunity identified",
    recommendations: [
      {
        id: "rec-c4-1",
        title: "AI-Driven Content Personalization Engine",
        description: "Implement a sophisticated content personalization system using natural language processing and member behavior analysis. The AI engine dynamically assembles newsletter content based on individual interests, past engagement patterns, and predictive modeling. Testing shows this approach can increase open rates by 156% and click-through rates by 89% through hyper-relevant content delivery.",
        difficulty: "hard",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-c4-2",
        title: "Circadian Rhythm-Based Send Time Optimization",
        description: "Deploy machine learning algorithms that analyze individual member activity patterns to determine optimal send times based on their digital behavior circadian rhythms. This goes beyond simple timezone optimization to consider personal email checking habits, work schedules, and engagement patterns. Can improve open rates by 45-67% through precision timing.",
        difficulty: "medium",
        impact: "high",
        type: "timing"
      },
      {
        id: "rec-c4-3",
        title: "Interactive Content & Engagement Mechanics",
        description: "Transform static newsletter content into interactive experiences using embedded polls, quizzes, product carousels, and augmented reality previews. Interactive content generates 2.3x more engagement and increases time spent with brand communications by 89%. Includes gamification elements and social sharing incentives.",
        difficulty: "hard",
        impact: "medium",
        type: "enhancement"
      },
      {
        id: "rec-c4-4",
        title: "Predictive Unsubscribe Prevention System",
        description: "Implement early warning systems using engagement decay patterns and behavioral signals to predict and prevent unsubscribes. Machine learning models can identify members at risk of disengaging 2-3 weeks before they typically unsubscribe, enabling proactive retention campaigns with 73% success rate in preventing churn.",
        difficulty: "medium",
        impact: "medium",
        type: "targeting"
      }
    ]
  },
  {
    id: 3,
    title: "Hiking Boot Collection",
    type: "Product Launch",
    status: "Scheduled",
    audience: "Hiking Enthusiasts",
    sent: 0,
    opened: 0,
    conversion: 0,
    revenue: 0,
    cost: 8500,
    roi: 0,
    needsAttention: true,
    attentionReason: "Launch timing optimization needed due to competitive landscape",
    recommendations: [
      {
        id: "rec-c3-1",
        title: "Competitive Intelligence-Based Launch Timing",
        description: "Utilize advanced market intelligence and competitor monitoring to optimize launch timing. Our AI analysis of competitor launch patterns, seasonal trends, and market sentiment suggests shifting the launch by 8 days could increase market visibility by 42% and reduce acquisition costs by 23%. Includes real-time monitoring of competitor activities and automated launch timing adjustments.",
        difficulty: "medium",
        impact: "high",
        type: "timing"
      },
      {
        id: "rec-c3-2",
        title: "Influencer Partnership Pre-Launch Amplification",
        description: "Deploy a strategic influencer marketing campaign targeting micro-influencers in the hiking community. Machine learning analysis of influencer performance data shows that authentic partnerships with 5-7 micro-influencers (10K-50K followers) can generate 3.5x more engagement than single macro-influencer partnerships, with 67% lower cost per acquisition.",
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
  },
  // === HIGH PERFORMING CAMPAIGNS (by ROI desc) ===
  {
    id: 2,
    title: "Summit Tier Welcome",
    type: "Onboarding",
    status: "Active",
    audience: "Summit Tier",
    sent: 3254,
    opened: 2603,
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
    id: 1,
    title: "Winter Gear Sale",
    type: "Promotional",
    status: "Active",
    audience: "All Members",
    sent: 45892,
    opened: 18357,
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
        difficulty: "medium",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-c1-2", 
        title: "Behavioral Retargeting Sequence for Non-Openers",
        description: "Deploy an intelligent 5-touch retargeting sequence for non-openers using behavioral triggers and engagement scoring. Machine learning analysis shows that 23% of non-openers can be recovered with personalized follow-up sequences that adapt messaging based on browsing behavior, purchase history, and engagement patterns.",
        difficulty: "hard",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 5,
    title: "Summer Camping Essentials",
    type: "Promotional",
    status: "Active",
    audience: "Outdoor Enthusiasts",
    sent: 28750,
    opened: 4312,
    conversion: 215,
    revenue: 32250,
    cost: 10500,
    roi: 207,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-c5-1",
        title: "Smart Bundle Recommendation Algorithm",
        description: "Deploy advanced market basket analysis and collaborative filtering to create intelligent product bundles that adapt based on individual member preferences, seasonal trends, and inventory optimization needs. Machine learning models trained on 50,000+ camping purchases can increase average order value by 34% while improving customer satisfaction through relevant product combinations.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-c5-2",
        title: "Social Proof Amplification Network",
        description: "Create a dynamic social proof system that showcases real-time customer reviews, photos, and camping trip stories. Includes AI-powered content curation, authentic customer story amplification, and community-driven product validation. Social proof mechanisms can increase conversion rates by 67% and reduce product return rates by 23%.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      },
      {
        id: "rec-c5-3",
        title: "Seasonal Demand Prediction & Inventory Optimization",
        description: "Implement predictive analytics for seasonal demand forecasting combined with dynamic pricing strategies. Machine learning models analyze weather patterns, camping reservation data, and regional outdoor activity trends to optimize inventory positioning and pricing. Can reduce stockouts by 34% and increase margin efficiency by 18%.",
        difficulty: "hard",
        impact: "medium",
        type: "optimization"
      }
    ]
  }
];

// Enhanced loyalty program data with sophisticated AI recommendations
// REORDERED: NEW PROGRAM FIRST, then Trail Essentials, then by highest ROI
export const loyaltyProgramData = [
  // === NEW ATTENTION NEEDED PROGRAM (FIRST) ===
  {
    id: 11,
    title: "Premium Gear Access Program",
    type: "Membership Tier",
    status: "Active",
    audience: "Summit & Trailblazer Tiers",
    participants: 4280,
    pointsIssued: 1284000,
    redemptions: 89,
    redemptionRate: 2.1,
    retentionRate: 47,
    repeatPurchaseRate: 31,
    avgOrderValue: 385,
    revenue: 34265,
    cost: 78400,
    roi: -56,
    needsAttention: true,
    attentionReason: "Member engagement declining rapidly - 68% drop in participation over 60 days with rising operational costs",
    recommendations: [
      {
        id: "rec-p11-1",
        title: "Program Structure Redesign",
        description: "Redesign premium tier structure to address low engagement rates. Current high-threshold exclusive access model creates barriers for members. Transition to milestone-based rewards with more frequent, tangible benefits. This approach has shown 40% higher completion rates in similar premium programs.",
        difficulty: "hard",
        impact: "high",
        type: "restructure"
      },
      {
        id: "rec-p11-2",
        title: "Member Re-engagement Campaign",
        description: "Launch targeted outreach to 2,890 inactive members who joined but never engaged. Offer simplified benefit structure with guaranteed first reward within 30 days. Include enhanced customer support and program education. Similar recovery campaigns achieve 42% reactivation rates.",
        difficulty: "medium",
        impact: "high",
        type: "recovery"
      },
      {
        id: "rec-p11-3",
        title: "Cost Structure Optimization",
        description: "Review operational costs which are 129% above program revenue due to complex fulfillment processes and premium vendor partnerships. Audit vendor contracts, shipping costs, and product sourcing. Implement hybrid digital-physical reward model to reduce costs by 45% while maintaining value perception.",
        difficulty: "medium",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-p11-4",
        title: "Member Experience Enhancement",
        description: "Improve program clarity and member engagement through better progress tracking and clearer value communication. Add progress visualization, member success stories, and achievement recognition features. These improvements typically increase program satisfaction by 35% and boost retention.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  // === TRAIL ESSENTIALS (SECOND) ===
  {
    id: 2,
    title: "Trail Essentials Punch Card",
    type: "Punch Card", 
    status: "Active",
    audience: "Hiking Enthusiasts",
    participants: 12673,
    punchesEarned: 38019,
    cardsCompleted: 1267,
    completionRate: 10.0,
    bonusOfferRedemption: 8.3,
    retentionRate: 34,
    repeatPurchaseRate: 18,
    avgOrderValue: 98,
    revenue: 124196,
    cost: 76039,
    roi: -39,
    needsAttention: true,
    attentionReason: "Low completion rate (10%) indicates program structure needs optimization",
    punchTarget: 5,
    averagePunchesPerCard: 3.0,
    recommendations: [
      {
        id: "rec-p2-1",
        title: "Program Structure Optimization & Redesign",
        description: "Current 5-punch requirement shows 67% abandonment after 2nd punch, indicating the completion threshold may be too high for this audience. Analysis of successful punch card programs suggests a 3-punch structure with progressive rewards would significantly improve completion rates while maintaining member engagement throughout the journey.",
        difficulty: "medium",
        impact: "high",
        type: "restructure"
      },
      {
        id: "rec-p2-2",
        title: "Member Re-engagement and Value Recovery Campaign",
        description: "Deploy targeted intervention campaigns for members showing early abandonment signals (>45 days since last punch). Implement progressive engagement strategy: milestone celebrations at 30 days, bonus opportunities at 45 days, and value reminder campaigns at 60 days. Recovery protocols could re-engage 23-30% of inactive participants.",
        difficulty: "medium",
        impact: "high",
        type: "recovery"
      },
      {
        id: "rec-p2-3",
        title: "Best Practice Integration Based on Success Models",
        description: "Analysis shows opportunities for improvement compared to Adventure Gear success (48% completion, 900% ROI). Integrate proven elements from successful programs including simplified progression paths, relevant milestone rewards, and clear value communication to enhance member experience and program performance.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      }
    ]
  },
  // === ATTENTION NEEDED PROGRAMS (by ROI desc) ===
  {
    id: 6,
    title: "Summer Outdoor Bundle",
    type: "Purchase Incentive",
    status: "Active",
    audience: "All Tiers",
    participants: 3827,
    pointsIssued: 382700,
    redemptions: 187,
    redemptionRate: 4.9,
    retentionRate: 68,
    repeatPurchaseRate: 32,
    avgOrderValue: 150,
    revenue: 28050,
    cost: 18900,
    roi: 48,
    needsAttention: true,
    attentionReason: "Low redemption rate (4.9%) - member engagement optimization needed",
    recommendations: [
      {
        id: "rec-p6-1",
        title: "Member Experience Optimization & UX Enhancement",
        description: "Implement comprehensive user experience optimization using behavioral psychology principles and A/B testing. Includes simplified redemption flows, progress visualization, clear value communication, and friction-reducing design elements. UX research shows that reducing cognitive load in loyalty programs can increase redemption rates by 340% while improving member satisfaction.",
        difficulty: "medium",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-p6-2",
        title: "Dynamic Point Value Communication System",
        description: "Deploy real-time point value visualization that shows members exactly what their points are worth in dollars, products, and experiences. Includes gamified progress tracking, milestone celebrations, and personalized value demonstrations. Transparency in point value increases redemption likelihood by 156% and program trust by 78%.",
        difficulty: "easy",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p6-3",
        title: "Proactive Member Engagement Campaign",
        description: "Create an intelligent campaign system that automatically identifies members with unredeemed points and delivers personalized engagement messages based on their preferences and behavior patterns. Includes milestone celebrations, limited-time bonus offers, and achievement recognition. Can improve engagement rates by 45% with 67% positive response rate.",
        difficulty: "medium",
        impact: "medium",
        type: "communication"
      },
      {
        id: "rec-p6-4",
        title: "Behavioral Economics Enhancement Implementation",
        description: "Apply proven behavioral economics principles including progress visualization, social proof, and achievement recognition to increase redemption behavior. Includes point milestone celebrations, peer comparison features, and progress-based bonus rewards. Behavioral enhancements can increase redemption rates by 89% while maintaining positive program sentiment.",
        difficulty: "easy",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 7,
    title: "Hiking Gear Bonus Points",
    type: "Category Promotion",
    status: "Active",
    audience: "Explorer Tier",
    participants: 5624,
    pointsIssued: 562400,
    redemptions: 422,
    redemptionRate: 7.5,
    retentionRate: 58,
    repeatPurchaseRate: 24,
    avgOrderValue: 135,
    revenue: 56970,
    cost: 60700,
    roi: -6,
    needsAttention: true,
    attentionReason: "Program economics need adjustment for sustainable growth",
    recommendations: [
      {
        id: "rec-p7-1",
        title: "Predictive Member Value Segmentation",
        description: "Implement advanced machine learning segmentation that identifies high-potential Explorer tier members using predictive lifetime value modeling, engagement propensity scoring, and behavioral pattern analysis. Focus program resources on the top 35% of Explorer members who show 87% higher conversion potential while maintaining broad program appeal.",
        difficulty: "hard",
        impact: "high",
        type: "targeting"
      },
      {
        id: "rec-p7-2",
        title: "Dynamic Program Economics Optimization",
        description: "Deploy real-time program economics management using supply-demand algorithms and member behavior predictions. The system automatically adjusts point allocations based on inventory levels, member engagement patterns, and profit margins. Can improve program ROI to +23% while maintaining member satisfaction through intelligent resource allocation.",
        difficulty: "medium",
        impact: "high",
        type: "adjustment"
      },
      {
        id: "rec-p7-3",
        title: "Smart Engagement Threshold Implementation",
        description: "Use behavioral analytics to implement intelligent engagement thresholds that adapt based on member behavior, purchase history, and category affinity. Instead of fixed requirements, the system uses personalized engagement levels that optimize for both member experience and program economics. Can improve ROI to +18% while reducing member friction.",
        difficulty: "medium",
        impact: "medium",
        type: "restriction"
      },
      {
        id: "rec-p7-4",
        title: "Category Cross-Enhancement Intelligence Engine",
        description: "Implement AI-powered cross-category recommendations that identify complementary categories with higher margins and engagement rates. Machine learning analysis of purchase patterns suggests bundling hiking gear bonuses with high-margin accessories can improve program profitability by 34% while enhancing member value perception.",
        difficulty: "hard",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 10,
    title: "Loyalty Anniversary Bonus",
    type: "Retention",
    status: "Active",
    audience: "1+ Year Members",
    participants: 8923,
    pointsIssued: 892300,
    redemptions: 178,
    redemptionRate: 2,
    retentionRate: 72,
    repeatPurchaseRate: 38,
    avgOrderValue: 125,
    revenue: 22250,
    cost: 44615,
    roi: -50,
    needsAttention: true,
    attentionReason: "Program economics need rebalancing for long-term sustainability",
    recommendations: [
      {
        id: "rec-p10-1",
        title: "Predictive Lifetime Value Tier System",
        description: "Replace flat anniversary structure with AI-powered tier system based on predictive lifetime value, engagement trajectory, and churn risk assessment. High-value members receive premium anniversary experiences while growing members get targeted development campaigns. Can improve ROI to +67% while increasing overall member satisfaction through relevant rewards.",
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
  // === HIGH PERFORMING PROGRAMS (by ROI desc) ===
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
        title: "Social Sharing Progression Amplification",
        description: "Integrate social proof mechanics where members earn bonus punches for sharing adventure photos with tagged Columbia gear. User-generated content campaigns combined with punch card progression show 2.8x higher engagement rates and create authentic brand advocacy while accelerating card completion.",
        difficulty: "medium",
        impact: "medium",
        type: "enhancement"
      }
    ]
  },
  {
    id: 4,
    title: "Birthday Rewards",
    type: "Lifecycle",
    status: "Ongoing",
    audience: "All Tiers",
    participants: 4578,
    pointsIssued: 457800,
    redemptions: 2335,
    redemptionRate: 51,
    retentionRate: 92,
    repeatPurchaseRate: 68,
    avgOrderValue: 172,
    revenue: 412800,
    cost: 50500,
    roi: 717,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-p4-1",
        title: "Personalized Birthday Experience Journey",
        description: "Create an AI-powered birthday experience that extends beyond a single reward to a personalized month-long celebration. Includes predictive gift recommendations, surprise milestone rewards, social recognition features, and family/friend referral bonuses. Behavioral psychology research shows extended birthday experiences increase annual spend by 34% and emotional brand connection by 67%.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p4-2",
        title: "Birthday Cohort Analysis & Optimization",
        description: "Implement advanced cohort analysis to optimize birthday rewards based on birth month patterns, seasonal purchasing behavior, and demographic insights. Machine learning identifies that members born in certain months have different spending patterns and optimal reward structures, enabling 28% improvement in birthday campaign effectiveness.",
        difficulty: "medium",
        impact: "medium",
        type: "targeting"
      }
    ]
  },
  {
    id: 3,
    title: "Double Points Weekend",
    type: "Points Promotion",
    status: "Active",
    audience: "All Tiers",
    participants: 12463,
    pointsIssued: 1246300,
    redemptions: 3240,
    redemptionRate: 26,
    retentionRate: 84,
    repeatPurchaseRate: 42,
    avgOrderValue: 148,
    revenue: 542000,
    cost: 108400,
    roi: 400,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-p3-1",
        title: "Dynamic Points Multiplier Based on Member Lifetime Value",
        description: "Implement AI-driven variable points multipliers that automatically adjust based on member lifetime value, engagement score, and churn risk assessment. High-value members receive enhanced multipliers while developing members get growth-focused bonuses. Machine learning models show this approach can increase program ROI by 47% while improving member satisfaction across all tiers.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p3-2",
        title: "Behavioral Trigger Extension Algorithm",
        description: "Deploy predictive analytics to automatically extend successful promotions based on real-time engagement metrics and revenue impact. The system monitors participation velocity, redemption patterns, and member sentiment to determine optimal extension timing. Can capture an additional 23% revenue opportunity while maintaining program economics.",
        difficulty: "medium",
        impact: "medium",
        type: "optimization"
      }
    ]
  },
  {
    id: 5,
    title: "Refer-a-Friend",
    type: "Acquisition",
    status: "Active",
    audience: "Trailblazer & Summit",
    participants: 2134,
    pointsIssued: 213400,
    redemptions: 875,
    redemptionRate: 41,
    retentionRate: 76,
    repeatPurchaseRate: 53,
    avgOrderValue: 195,
    revenue: 170625,
    cost: 55600,
    roi: 207,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-p5-1",
        title: "AI-Powered Referral Quality Scoring",
        description: "Implement machine learning algorithms that predict referral quality and lifetime value before rewards are distributed. The system analyzes referrer behavior, social graph strength, and referred member characteristics to optimize reward distribution and prevent gaming. Can improve referral program ROI by 67% while increasing referred member retention by 43%.",
        difficulty: "hard",
        impact: "high",
        type: "optimization"
      },
      {
        id: "rec-p5-2",
        title: "Social Network Effect Amplification",
        description: "Expand referral program with network effects and multi-level rewards that create viral loops. Includes social proof mechanisms, leaderboards, and community challenges that encourage authentic sharing. Network analysis shows this approach can increase referral rates by 89% while maintaining reward economics through improved member quality.",
        difficulty: "medium",
        impact: "high",
        type: "expansion"
      }
    ]
  },
  {
    id: 8,
    title: "First Purchase Bonus",
    type: "Acquisition",
    status: "Active",
    audience: "New Members",
    participants: 1835,
    pointsIssued: 183500,
    redemptions: 156,
    redemptionRate: 8.5,
    retentionRate: 45,
    repeatPurchaseRate: 28,
    avgOrderValue: 120,
    revenue: 18720,
    cost: 7350,
    roi: 155,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-p8-1",
        title: "Progressive Onboarding Journey Architecture",
        description: "Create a sophisticated onboarding journey with progressive rewards that unlock based on member actions, engagement levels, and learning milestones. Includes educational content rewards, social integration bonuses, and achievement-based point multipliers. Progressive onboarding can increase 90-day retention by 67% and lifetime value by 45%.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p8-2",
        title: "New Member Cohort Optimization",
        description: "Implement cohort-based optimization that adjusts first purchase bonuses based on acquisition channel, member demographics, and seasonal factors. Machine learning models identify that different member types require different activation strategies, enabling 28% improvement in new member conversion and 34% increase in early-stage retention.",
        difficulty: "medium",
        impact: "medium",
        type: "targeting"
      }
    ]
  },
  {
    id: 9,
    title: "Winter Sports Challenge",
    type: "Engagement",
    status: "Scheduled",
    audience: "All Tiers",
    participants: 0,
    pointsIssued: 0,
    redemptions: 0,
    redemptionRate: 0,
    retentionRate: 0,
    repeatPurchaseRate: 0,
    avgOrderValue: 0,
    revenue: 0,
    cost: 0,
    roi: 0,
    needsAttention: false,
    recommendations: [
      {
        id: "rec-p9-1",
        title: "Gamified Social Challenge Platform",
        description: "Build a comprehensive gamification platform with team challenges, individual achievements, social leaderboards, and real-world activity integration. Includes wearable device connectivity, photo verification systems, and community celebration features. Gamified loyalty programs show 3.2x higher engagement rates and 89% improvement in social sharing.",
        difficulty: "hard",
        impact: "high",
        type: "enhancement"
      },
      {
        id: "rec-p9-2",
        title: "Viral Mechanics & Network Effects",
        description: "Implement viral sharing mechanisms with network-based rewards that create natural word-of-mouth amplification. Includes friend challenges, team formation tools, and social proof celebrations. Network effects can increase program reach by 234% while reducing acquisition costs through organic growth.",
        difficulty: "medium",
        impact: "high",
        type: "expansion"
      }
    ]
  }
];

export const monthlyStats = [
  { month: 'Jan', revenue: 423000, target: 400000 },
  { month: 'Feb', revenue: 356000, target: 350000 },
  { month: 'Mar', revenue: 498000, target: 450000 },
  { month: 'Apr', revenue: 472000, target: 460000 },
  { month: 'May', revenue: 528000, target: 500000 }
];

export const membershipData = [
  { name: 'Explorer', value: 65 },
  { name: 'Trailblazer', value: 25 },
  { name: 'Summit', value: 10 },
];

export const kpiCardsData = [
  { 
    title: 'Total Revenue', 
    value: '$2.28M', 
    change: '+12.3%', 
    icon: 'DollarSign', 
    iconBg: 'rgba(33, 150, 243, 0.25)', 
    iconColor: '#64B5F6', 
    changeColor: '#81C784',
    punchCardImpact: 'Strong growth with opportunities identified in Trail Essentials program'
  },
  { 
    title: 'Active Members', 
    value: '104.6K', 
    change: '+5.7%', 
    icon: 'Users', 
    iconBg: 'rgba(77, 152, 146, 0.25)', 
    iconColor: '#80CBC4', 
    changeColor: '#81C784',
    punchCardImpact: '18.9K members engaged in Trail Essentials optimization program'
  },
  { 
    title: 'Program ROI', 
    value: '467%', 
    change: '+24.1%', 
    icon: 'Target', 
    iconBg: 'rgba(77, 152, 146, 0.25)', 
    iconColor: '#80CBC4', 
    changeColor: '#81C784',
    punchCardImpact: 'Enhanced by Adventure Gear (900% ROI) with Trail Essentials optimization underway'
  },
  { 
    title: 'Budget Used', 
    value: '78.3%', 
    secondaryText: '$391.5K', 
    icon: 'ShoppingBag', 
    iconBg: 'rgba(77, 152, 146, 0.25)', 
    iconColor: '#80CBC4',
    punchCardImpact: 'Includes $76K investment in Trail Essentials program enhancement'
  },
  { 
    title: 'Point Redemption', 
    value: '6.5K', 
    change: '-8.3%', 
    icon: 'Award', 
    iconBg: 'rgba(76, 175, 80, 0.25)', 
    iconColor: '#81C784', 
    changeColor: '#E57373',
    punchCardImpact: 'Optimization opportunities identified to improve member engagement'
  }
];

// ===== Outdoors SPORTSWEAR SPECIFIC KPI DATA (moved from App.js) =====
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

// ===== USER PROFILES AND DASHBOARD CONFIGURATIONS (moved from App.js) =====
export const userProfiles = [
  {
    id: 'alex_morgan',
    name: 'Alex Morgan',
    title: 'Marketing Director',
    avatar: 'AM',
    dashboards: ['rfm', 'standard', 'overview'],
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
  'default': ['overview', 'standard', 'marketing', 'rfm']
};

// UPDATED: Enhanced insights data with measured approach
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
      action: 'enhance'
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
  ]
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

// Sidebar Menu Configuration with NEW STRUCTURE
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
    segment: "Your \"Can't Lose\" segment shows declining engagement, with a 4.7% decrease in activity. These are high-value customers (average spend of $720) who haven't purchased recently. I recommend creating an urgent win-back campaign with three components: 1) A personalized message from a team member acknowledging their past loyalty, 2) A substantial one-time offer (25-30% discount), and 3) Extension of their loyalty status for 6 months. Based on similar campaigns, this approach could recover 35-45% of these customers, with an ROI of approximately 315%.",
    campaign: "I've analyzed your recent campaign performance and found that your email campaigns have the highest ROI when sent on Tuesday or Wednesday mornings (7-9am), with segment-specific content. For April specifically, I'd recommend a \"Spring Adventure Essentials\" campaign targeting outdoor enthusiasts with rainwear and lighter gear options. Based on your historical data, personalizing subject lines with location-specific references (e.g., \"Your Cascade Trail Essentials\") increases open rates by 22%. Would you like me to draft some campaign options for you?",
    budget: "Looking at your marketing budget allocation, I notice 62% is going to brand campaigns with only 28% to performance marketing and 10% to loyalty programs. However, your data shows loyalty programs are generating a 467% ROI compared to 315% for performance campaigns and 215% for brand campaigns. I'd recommend reallocating 15% of your brand budget to expand your loyalty initiatives, particularly for your high-performing \"Double Points Weekend\" and \"Birthday Rewards\" programs, which show the highest engagement and conversion rates.",
    default: "Based on your question, I've analyzed your customer data and found some interesting patterns. Your most engaged customers are shopping 3.2x more frequently than average, and they tend to purchase across multiple categories. To leverage this behavior, I recommend creating bundled offers that combine your top-selling products with complementary items. This strategy has shown a 24% increase in average order value in similar retail scenarios. Would you like me to generate some specific bundle recommendations based on your product catalog?"
  }
};

// Profile Recommendations Data
export const profileRecommendationsData = [
  {
    id: 1,
    title: "Campaign Opportunity",
    description: "Your Q2 campaigns are outperforming benchmarks by 27%. Consider expanding budget allocation.",
    icon: "TrendingUp",
    color: "#4CAF50"
  },
  {
    id: 2,
    title: "Team Training Available",
    description: "New personalization masterclass available for your team - 8 spots remaining",
    icon: "Users",
    color: "#2196F3"
  },
  {
    id: 3,
    title: "Content Strategy Review",
    description: "Quarterly content review meeting scheduled for next week - prep materials ready",
    icon: "Layers",
    color: "#1A4C49"
  },
  {
    id: 4,
    title: "Budget Optimization",
    description: "Marketing budget utilization at 62% - recommendations for reallocation available",
    icon: "Zap",
    color: "#FFC107"
  },
  {
    id: 5,
    title: "Industry Report",
    description: "New customer loyalty trends report for 2025 available in your library",
    icon: "BookOpen",
    color: "#1A4C49"
  },
  {
    id: 6,
    title: "Upcoming Event",
    description: "Marketing Leadership Summit - Registration deadline in 5 days",
    icon: "Calendar",
    color: "#2196F3"
  }
];

// ===== ROUND 3 EXTRACTIONS - OVERVIEW DASHBOARD CONFIGURATIONS =====

// Overview Dashboard AI Configuration
export const overviewDashboardConfig = {
  // Sample questions for AI prompts
  sampleQuestions: [
    "Which customer segments are driving the most revenue?",
    "Why is our loyalty redemption rate declining?",
    "How can we improve our email newsletter performance?",
    "What's our most successful campaign and why?",
    "How does our RFM segmentation compare to industry benchmarks?",
    "What's the best way to re-engage our At Risk customers?",
    "Show me trends in our customer acquisition cost"
  ],

  // Default insights data for Overview Dashboard
  defaultInsights: {
    performanceInsights: [
      {
        type: 'negative',
        text: 'Premium Gear Access Program showing significant member decline with 68% participation drop in 60 days.',
        impact: 'This underperforming premium program is affecting brand perception and has cost $156K in lost revenue with escalating operational inefficiencies.'
      },
      {
        type: 'negative',
        text: 'Trail Essentials Punch Card showing 10% completion rate with -39% ROI, affecting customer retention and brand perception.',
        impact: 'This program has reduced overall customer lifetime value by an estimated $180K and is driving 23% of customer complaints.'
      },
      {
        type: 'negative',
        text: 'Loyalty program redemption rate has decreased by 8.3% month-over-month, primarily due to poor punch card program performance affecting customer engagement.',
        impact: 'This represents approximately $32,000 in unredeemed value that could drive additional purchases, with punch card frustration being the leading cause.'
      },
      {
        type: 'positive',
        text: 'Summit tier members have 3.2x higher lifetime value than Explorer tier, and those NOT enrolled in underperforming punch card programs show 45% higher satisfaction scores.',
        impact: 'Targeted Summit tier campaigns have shown an ROI of 717% compared to 155% for general audience campaigns.'
      }
    ],
    recommendedActions: [
      {
        text: 'Redesign Premium Gear Access Program to address member engagement decline and operational inefficiencies.',
        impact: 'Could prevent an estimated $200K+ in additional lost revenue and restore premium tier confidence within 60 days.',
        difficulty: 'High'
      },
      {
        text: 'Restructure Trail Essentials Punch Card program to improve completion rates and member satisfaction.',
        impact: 'Could prevent an estimated $50K in lost customer lifetime value and improve Net Promoter Score by 12 points.',
        difficulty: 'Medium'
      },
      {
        text: 'Scale Adventure Gear Punch Card success model (48% completion, 900% ROI) to replace underperforming programs.',
        impact: 'Could generate an estimated $120K in additional annual revenue per successful program rollout.',
        difficulty: 'Medium'
      }
    ]
  },

  // Apple-style summary text configuration
  summaryText: {
    headline: "Strong Growth with Loyalty Program Performance Challenges",
    mainPoints: [
      {
        label: "Revenue",
        value: "$3.24M",
        change: "+12.7%",
        detail: "Growth continues despite $336K drag from underperforming Premium Gear Access and Trail Essentials programs"
      },
      {
        label: "Customer Base",
        value: "46.5K",
        change: "+8.3%",
        detail: "Steady expansion but retention challenges due to loyalty program issues affecting 31.6K customers"
      },
      {
        label: "Engagement",
        value: "4.2%",
        change: "+1.5%",
        detail: "Email improving but loyalty engagement declining due to program performance issues and member frustration"
      }
    ],
    conclusion: "While core metrics show positive momentum, loyalty program performance issues require attention to prevent customer churn and protect brand reputation."
  },

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
    "Which customers should I be targeting more?",
    "What's the easiest way to boost my results?",
    "How do I fix my low engagement rates?",
    "What campaigns should I pause or stop?",
    "Where should I spend more budget for better results?",
    "What trends should I be worried about?",
    "How can I replicate my most successful campaign?"
  ],

  // Campaign performance narrative data
  campaignStories: [
    {
      id: 4, // Spring Adventure Newsletter
      title: "Spring Adventure Newsletter",
      status: "needs-urgent-attention",
      headline: "Your Newsletter Needs Immediate Attention",
      summary: "This campaign is significantly underperforming and affecting your overall email reputation.",
      keyMetric: "10%",
      metricLabel: "Open Rate",
      benchmark: "24%",
      impact: "negative",
      priority: "high",
      quickFix: "Change subject lines and send time",
      aiPrompt: "How can I quickly improve my newsletter open rates?"
    },
    {
      id: 1, // Winter Gear Sale
      title: "Winter Gear Sale",
      status: "star-performer",
      headline: "Your Winter Campaign is a Massive Success",
      summary: "This campaign is your top performer and should be your template for future seasonal campaigns.",
      keyMetric: "1001%",
      metricLabel: "ROI",
      benchmark: "300%",
      impact: "positive",
      priority: "maintain",
      quickFix: "Extend the campaign duration",
      aiPrompt: "How can I replicate this successful campaign for other seasons?"
    },
    {
      id: 5, // Summer Camping
      title: "Summer Camping Essentials",
      status: "moderate-performer",
      headline: "Summer Campaign Shows Promise",
      summary: "This campaign is performing adequately but has room for improvement with some optimization.",
      keyMetric: "207%",
      metricLabel: "ROI",
      benchmark: "300%",
      impact: "neutral",
      priority: "optimize",
      quickFix: "Improve product recommendations",
      aiPrompt: "How can I boost the ROI of my summer campaign?"
    }
  ],

  // Key insights with actionable recommendations
  keyInsights: [
    {
      type: "urgent",
      icon: "AlertTriangle",
      headline: "Multiple Loyalty Programs Need Attention",
      insight: "Your Premium Gear Access Program has lost 68% of members in 60 days, while Trail Essentials shows a 10% completion rate. These performance issues are affecting your loyalty ecosystem and costing over $300K in lost revenue.",
      action: "Review and redesign underperforming programs with improved member engagement strategies",
      timeframe: "Next 2 Weeks",
      difficulty: "High",
      aiPrompt: "How can I improve my loyalty program performance?"
    },
    {
      type: "urgent",
      icon: "AlertTriangle",
      headline: "Newsletter Performance Needs Improvement",
      insight: "Your Spring Adventure Newsletter has a 10% open rate — that's 60% below industry standards. This is affecting your sender reputation and could impact all your email campaigns.",
      action: "Switch to personalized subject lines and test different send times this week",
      timeframe: "This Week",
      difficulty: "Easy",
      aiPrompt: "What's the fastest way to fix my newsletter open rates?"
    },
    {
      type: "opportunity", 
      icon: "TrendingUp",
      headline: "Winter Campaign Success Formula",
      insight: "Your Winter Gear Sale achieved 1001% ROI — more than 3x your typical performance. The combination of seasonal timing, weather-based messaging, and premium audience targeting is your winning formula.",
      action: "Apply this seasonal approach to your upcoming spring and summer campaigns",
      timeframe: "Next Month",
      difficulty: "Medium", 
      aiPrompt: "How can I replicate my winter campaign success for other seasons?"
    },
    {
      type: "warning",
      icon: "Users",
      headline: "Customer Engagement Patterns Shifting",
      insight: "Your best customers are engaging 35% more on mobile, but your email designs aren't optimized for mobile viewing. You're missing engagement opportunities.",
      action: "Redesign your email templates with mobile-first approach",
      timeframe: "Next 2 Weeks",
      difficulty: "Medium",
      aiPrompt: "How should I optimize my campaigns for mobile engagement?"
    }
  ],

  // Status styling configuration
  statusStyling: {
    'star-performer': {
      iconColor: '#4CAF50',
      icon: 'TrendingUp'
    },
    'needs-urgent-attention': {
      iconColor: '#F44336',
      icon: 'AlertTriangle'
    },
    'moderate-performer': {
      iconColor: '#FFC107',
      icon: 'Target'
    }
  }
};

// ===== MEMBERSHIP DETAIL VIEW CONFIGURATIONS =====

// Membership Detail View Configuration
export const membershipDetailConfig = {
  // Additional chart data for expanded view
  tierGrowthData: [
    { month: 'Jun', explorer: 62, trailblazer: 23, summit: 8 },
    { month: 'Jul', explorer: 63, trailblazer: 23.5, summit: 8.5 },
    { month: 'Aug', explorer: 64, trailblazer: 24, summit: 9 },
    { month: 'Sep', explorer: 64.5, trailblazer: 24.5, summit: 9.5 },
    { month: 'Oct', explorer: 65, trailblazer: 25, summit: 10 }
  ],
  
  tierSpendingData: [
    { name: 'Explorer', avgSpend: 120, frequency: 2.4 },
    { name: 'Trailblazer', avgSpend: 245, frequency: 3.8 },
    { name: 'Summit', avgSpend: 480, frequency: 5.2 }
  ],
  
  tierRetentionData: [
    { name: 'Explorer', retention: 68 },
    { name: 'Trailblazer', retention: 82 },
    { name: 'Summit', retention: 94 }
  ],

  // Chart color configuration
  chartColors: ['#2196F3', '#4CAF50', '#FFC107'],

  // Animation and timing
  animations: {
    fadeInDelay: 50, // Small delay to ensure DOM is ready
    slideUpDelay: 200, // Animation close delay
    escapeKeyEnabled: true
  },

  // Tab configurations
  tabs: [
    { id: 'overview', label: 'Overview' },
    { id: 'trends', label: 'Trends' },
    { id: 'breakdown', label: 'Breakdown' },
    { id: 'recommendations', label: 'Recommendations' }
  ],

  // Filter configurations
  filterOptions: {
    dateRanges: [
      { value: 'last_30_days', label: 'Last 30 Days' },
      { value: 'last_quarter', label: 'Last Quarter' },
      { value: 'ytd', label: 'Year to Date' }
    ],
    segments: [
      { value: 'all', label: 'All Tiers' },
      { value: 'explorer', label: 'Explorer Only' },
      { value: 'trailblazer', label: 'Trailblazer Only' },
      { value: 'summit', label: 'Summit Only' }
    ]
  },

  // Membership breakdown data for breakdown tab
  membershipBreakdown: [
    { tier: 'Explorer', members: 67860, avgSpend: 120, ltv: 288, retention: 68 },
    { tier: 'Trailblazer', members: 26150, avgSpend: 245, ltv: 686, retention: 82 },
    { tier: 'Summit', members: 10460, avgSpend: 480, ltv: 1152, retention: 94 }
  ],

  // List of recommendations for the recommendations tab
  membershipRecommendations: [
    {
      id: 1,
      title: "Explorer to Trailblazer Conversion Campaign",
      description: "Create a targeted email campaign for Explorer members who are within 25% of the threshold for Trailblazer status. Offer a limited-time 2x points promotion to incentivize additional purchases needed to reach the next tier.",
      impact: "high",
      difficulty: "medium",
      tools: ["Marigold Messaging", "Marigold Loyalty"]
    },
    {
      id: 2,
      title: "Summit Tier VIP Program",
      description: "Develop an exclusive VIP program within the Summit tier for the top 20% of spenders. Include benefits like personal shopping consultations, first access to limited releases, and custom-made products. This will increase spend from your highest-value customers.",
      impact: "high",
      difficulty: "medium",
      tools: ["Marigold Loyalty", "Marigold Analytics"]
    },
    {
      id: 3,
      title: "Loyalty Point Acceleration Events",
      description: "Implement monthly double-points events specifically for Explorer members who have shown engagement with the program but have not yet reached Trailblazer status. Focus on product categories with higher margins to maintain profitability.",
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
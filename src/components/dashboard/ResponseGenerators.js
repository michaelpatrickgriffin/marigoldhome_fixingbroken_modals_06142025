// src/components/dashboard/ResponseGenerators.js

/**
 * Enhanced AI Response Generators with Dynamic Context Analysis
 * Each function generates contextual responses based on query analysis
 */

// Enhanced query analysis for more specific responses
const analyzeQuery = (query) => {
  const lowercaseQuery = query.toLowerCase();
  
  const context = {
    isSpecific: false,
    campaigns: [],
    metrics: [],
    timeframe: null,
    urgency: 'normal',
    action: null
  };

  // Detect specific campaigns
  if (lowercaseQuery.includes('winter gear') || lowercaseQuery.includes('winter sale')) {
    context.campaigns.push('Winter Gear Sale');
    context.isSpecific = true;
  }
  if (lowercaseQuery.includes('spring newsletter') || lowercaseQuery.includes('adventure newsletter')) {
    context.campaigns.push('Spring Adventure Newsletter');
    context.isSpecific = true;
  }
  if (lowercaseQuery.includes('summit') || lowercaseQuery.includes('welcome')) {
    context.campaigns.push('Summit Tier Welcome');
    context.isSpecific = true;
  }

  // Detect metrics focus
  if (lowercaseQuery.includes('open rate')) context.metrics.push('open_rate');
  if (lowercaseQuery.includes('roi') || lowercaseQuery.includes('return')) context.metrics.push('roi');
  if (lowercaseQuery.includes('conversion')) context.metrics.push('conversion');
  if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales')) context.metrics.push('revenue');
  if (lowercaseQuery.includes('budget')) context.metrics.push('budget');
  if (lowercaseQuery.includes('redemption')) context.metrics.push('redemption');

  // Detect urgency
  if (lowercaseQuery.includes('immediate') || lowercaseQuery.includes('urgent') || lowercaseQuery.includes('now') || lowercaseQuery.includes('today')) {
    context.urgency = 'high';
  }

  // Detect action intent
  if (lowercaseQuery.includes('optimize') || lowercaseQuery.includes('improve')) context.action = 'optimize';
  if (lowercaseQuery.includes('pause') || lowercaseQuery.includes('stop')) context.action = 'pause';
  if (lowercaseQuery.includes('launch') || lowercaseQuery.includes('create')) context.action = 'launch';
  if (lowercaseQuery.includes('analyze') || lowercaseQuery.includes('understand')) context.action = 'analyze';

  // Detect timeframe
  if (lowercaseQuery.includes('this month') || lowercaseQuery.includes('monthly')) context.timeframe = 'month';
  if (lowercaseQuery.includes('this week') || lowercaseQuery.includes('weekly')) context.timeframe = 'week';
  if (lowercaseQuery.includes('today') || lowercaseQuery.includes('daily')) context.timeframe = 'day';
  if (lowercaseQuery.includes('quarter') || lowercaseQuery.includes('q4')) context.timeframe = 'quarter';

  return context;
};

// Generate dynamic insights based on context
const generateContextualInsights = (context, baseMetrics) => {
  const insights = [];
  
  if (context.campaigns.includes('Winter Gear Sale')) {
    insights.push("Your Winter Gear Sale is significantly outperforming expectations with a 1001% ROI - this seasonal approach is clearly resonating with your outdoor enthusiast audience.");
  }
  
  if (context.campaigns.includes('Spring Adventure Newsletter')) {
    insights.push("The Spring Adventure Newsletter shows concerning performance with only a 10% open rate, which is 60% below your typical benchmark of 24%.");
  }
  
  if (context.metrics.includes('roi') && !context.isSpecific) {
    insights.push("Your campaign ROI varies dramatically - from 1777% (Summit Welcome) down to 68% (Spring Newsletter), indicating significant optimization opportunities.");
  }
  
  if (context.metrics.includes('budget')) {
    insights.push("You're currently at 68% budget utilization ($341K of $500K total), leaving $159K for strategic initiatives or Q4 optimization.");
  }

  return insights;
};

// Generate response for revenue-related queries
export const generateRevenueResponse = (query = '') => {
  const context = analyzeQuery(query);
  const insights = generateContextualInsights(context, { revenue: 3240000, growth: 12.7 });
  
  let baseText = "Your revenue performance shows strong momentum at $3.24M, up 12.7% month-over-month.";
  let directAnswer = "Revenue is growing strongly at $3.24M (up 12.7%) with Summit tier customers driving most growth.";
  
  // Customize based on context
  if (context.campaigns.includes('Winter Gear Sale')) {
    baseText += " The Winter Gear Sale has been your star performer, generating $137,640 with an exceptional 1001% ROI from 45,892 customers reached.";
    directAnswer = "Your Winter Gear Sale is driving exceptional revenue with $137,640 generated and 1001% ROI from 45.9K customers.";
  } else if (context.timeframe === 'month') {
    baseText += " This month's growth is primarily driven by Summit tier customers who show 3.2x higher lifetime value than Explorer tier members.";
  }

  if (insights.length > 0) {
    baseText += " " + insights.join(" ");
  }

  const recommendations = context.campaigns.includes('Winter Gear Sale') ? [
    {
      title: "Scale Winter Gear Campaign Success Model",
      description: "Apply the Winter Gear Sale's successful elements (seasonal timing, outdoor lifestyle messaging, targeted audience) to other product categories. The 1001% ROI indicates a winning formula that could work for spring hiking gear or summer camping essentials.",
      impact: "high",
      estimatedROI: "+450%"
    },
    {
      title: "Expand High-Performing Audience Segments",
      description: "The 45,892 customers who engaged with Winter Gear represent your most responsive segment. Create lookalike audiences and expand targeting to similar outdoor enthusiasts in adjacent markets.",
      impact: "medium",
      estimatedROI: "+280%"
    }
  ] : [
    {
      title: "Summit Tier Revenue Acceleration Program",
      description: "Since Summit tier customers have 3.2x higher lifetime value, create exclusive high-margin product bundles and early access offers specifically for this segment. Focus marketing spend on tier upgrades from Explorer members.",
      impact: "high",
      estimatedROI: "+320%"
    },
    {
      title: "Revenue Stream Diversification Analysis",
      description: "While total revenue is strong, analyze which products and campaigns contribute most to the 12.7% growth. Reallocate budget from lower-performing initiatives to your highest-ROI activities.",
      impact: "medium",
      estimatedROI: "+180%"
    }
  ];

  const suggestedQuestions = context.campaigns.includes('Winter Gear Sale') ? [
    "How can I replicate Winter Gear Sale's success for other seasons?",
    "What makes the Winter Gear audience so responsive?",
    "Which products should I bundle with winter gear for higher AOV?",
    "How can I extend the winter campaign's momentum into spring?"
  ] : [
    "Which specific campaigns are driving the 12.7% revenue growth?",
    "How can I upgrade more Explorer tier members to Summit tier?",
    "What's the profit margin breakdown by customer segment?",
    "Which revenue streams have the most potential for Q4?"
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions
  };
};

// Generate response for customer-related queries
export const generateCustomerResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Your customer base is growing at 8.3% month-over-month to 46.5K total customers.";
  let directAnswer = "Customer growth is healthy at 8.3% (46.5K total), but the At Risk segment needs immediate attention with 42% retention.";
  
  if (context.urgency === 'high' || context.action === 'optimize') {
    baseText += " However, your At Risk segment shows concerning trends with retention dropping to just 42% - this is critical since these are historically high-value customers.";
    directAnswer = "URGENT: At Risk customers have dropped to 42% retention. These high-value customers need immediate intervention to prevent significant revenue loss.";
  } else {
    baseText += " Retention varies significantly by segment: Champions maintain excellent 94% retention, while At Risk customers have dropped to 42% retention year-over-year.";
  }

  const recommendations = context.urgency === 'high' ? [
    {
      title: "Emergency At Risk Customer Recovery Campaign",
      description: "Deploy immediate win-back campaigns for At Risk customers with escalating incentives: 15% → 25% → 35% discount sequence over 10 days. Historical data shows this approach can recover 38% of at-risk customers within 2 weeks.",
      impact: "high",
      estimatedROI: "+280%"
    },
    {
      title: "Personal Outreach for High-Value At Risk Customers",
      description: "Identify the top 100 highest-LTV customers in the At Risk segment and initiate personal outreach via phone or personalized email from account managers. High-touch recovery shows 65% success rate for premium customers.",
      impact: "high",
      estimatedROI: "+195%"
    }
  ] : [
    {
      title: "Predictive Churn Prevention System",
      description: "Implement early warning indicators to identify customers moving toward At Risk status. Monitor engagement drops, purchase frequency changes, and email interaction patterns to intervene before churn occurs.",
      impact: "high",
      estimatedROI: "+215%"
    },
    {
      title: "Champions Segment Growth Strategy",
      description: "Your Champions segment shows 94% retention - analyze what makes them so loyal and create pathways to upgrade Loyal Customers to Champions status. This could significantly impact overall customer lifetime value.",
      impact: "medium",
      estimatedROI: "+170%"
    }
  ];

  const suggestedQuestions = context.urgency === 'high' ? [
    "What caused the At Risk segment retention to drop so dramatically?",
    "Which At Risk customers have the highest recovery potential?",
    "What's the revenue impact if I don't recover these customers?",
    "How quickly can I deploy emergency win-back campaigns?"
  ] : [
    "What behaviors distinguish Champions from other segments?",
    "Which acquisition channels bring the most loyal customers?",
    "How can I predict which customers are likely to become At Risk?",
    "What's the lifetime value difference between segments?"
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions
  };
};

// Generate response for loyalty-related queries
export const generateLoyaltyResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Your loyalty program shows mixed performance: membership growth of 5.7% is positive, but redemption rates have declined 8.3% month-over-month.";
  let directAnswer = "Loyalty membership is growing (+5.7%) but redemption rates are declining (-8.3%). Birthday Rewards performs well (51% redemption) while other programs struggle.";
  
  if (context.metrics.includes('redemption')) {
    baseText += " The redemption rate decline is particularly concerning for the Summer Outdoor Bundle (4.9% redemption) and Anniversary Bonus (-50% ROI), indicating members find limited value in current reward options.";
    directAnswer = "Your redemption rates are critically low: Summer Bundle at 4.9% and Anniversary Bonus showing -50% ROI indicate major value perception issues.";
  }

  if (context.campaigns.includes('Birthday Rewards')) {
    baseText += " However, Birthday Rewards stands out with 51% redemption rate and 92% retention, proving that personalized, timely rewards drive strong engagement.";
  }

  const recommendations = context.metrics.includes('redemption') ? [
    {
      title: "Immediate Reward Value Restructuring",
      description: "Audit all underperforming programs (Summer Bundle, Anniversary Bonus) and increase perceived value through higher-margin rewards or exclusive experiences rather than pure discounts. Focus on rewards that members actually want to redeem.",
      impact: "high",
      estimatedROI: "+340%"
    },
    {
      title: "Mobile-First Redemption Experience Redesign", 
      description: "Current 3-step redemption process shows 62% mobile abandonment. Simplify to one-tap redemption with visual progress indicators and instant gratification feedback to improve completion rates by 3.5x.",
      impact: "high",
      estimatedROI: "+280%"
    }
  ] : [
    {
      title: "Birthday Rewards Success Model Expansion",
      description: "Birthday Rewards achieves 51% redemption and 92% retention. Apply this personal milestone approach to other life events: work anniversaries, seasonal preferences, purchase anniversaries, and hobby milestones.",
      impact: "high",
      estimatedROI: "+250%"
    },
    {
      title: "Dynamic Points Value Communication",
      description: "Members may not understand point value. Implement real-time dollar value display, progress visualization, and 'points expiring soon' notifications to increase redemption urgency and perceived value.",
      impact: "medium",
      estimatedROI: "+165%"
    }
  ];

  const suggestedQuestions = context.metrics.includes('redemption') ? [
    "Why are members not redeeming points in the Summer Bundle program?",
    "What rewards do members actually want versus what we're offering?",
    "How can I fix the mobile redemption experience quickly?",
    "Which programs should I pause versus optimize?"
  ] : [
    "How can I replicate Birthday Rewards success across other programs?",
    "What's the optimal points-to-dollar ratio for member satisfaction?",
    "Which loyalty program tier has the best ROI potential?",
    "How do I prevent points from expiring unused?"
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions
  };
};

// Generate response for engagement-related queries
export const generateEngagementResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Email engagement shows improvement with click-through rates at 4.2% (up 1.5%).";
  let directAnswer = "Overall engagement is improving (4.2% CTR, +1.5%), but Spring Adventure Newsletter has critically low 10% open rate vs 24% benchmark.";
  
  if (context.campaigns.includes('Spring Adventure Newsletter') || context.metrics.includes('open_rate')) {
    baseText += " However, the Spring Adventure Newsletter presents a critical opportunity with only 10% open rate - significantly below your 24% benchmark and industry standards.";
    directAnswer = "URGENT: Spring Adventure Newsletter open rate is 10% vs 24% benchmark - you're missing 7,300+ potential customers monthly.";
  }

  const recommendations = context.campaigns.includes('Spring Adventure Newsletter') ? [
    {
      title: "Emergency Spring Newsletter Subject Line A/B Testing",
      description: "Deploy immediate A/B tests with location-specific subject lines ('Your Cascade Trail Essentials'), urgency elements, and personalization. Historical data suggests this could increase open rates by 40-60% within one send cycle.",
      impact: "high",
      estimatedROI: "+320%"
    },
    {
      title: "Send Time Optimization Based on Engagement Patterns",
      description: "Your newsletter currently sends weekend evenings when engagement is lowest. Shift to Tuesday/Wednesday 7-9am based on your audience's proven engagement patterns from other campaigns.",
      impact: "medium",
      estimatedROI: "+180%"
    }
  ] : [
    {
      title: "Cross-Campaign Engagement Analysis",
      description: "Your 4.2% CTR improvement indicates some campaigns are performing well. Identify which subject lines, send times, and content formats drive the best engagement and apply these learnings across all campaigns.",
      impact: "high",
      estimatedROI: "+250%"
    },
    {
      title: "Behavioral Trigger Email Sequences",
      description: "Capitalize on your improving engagement by implementing behavioral triggers: browse abandonment, cart abandonment, and post-purchase sequences that maintain momentum from your successful campaigns.",
      impact: "medium",
      estimatedROI: "+190%"
    }
  ];

  const suggestedQuestions = context.campaigns.includes('Spring Adventure Newsletter') ? [
    "What subject lines are working best for other campaigns?",
    "When do my subscribers typically engage with emails?",
    "Should I segment the Spring newsletter audience differently?",
    "How can I salvage this newsletter campaign quickly?"
  ] : [
    "Which campaigns are driving the 1.5% CTR improvement?",
    "What content types get the highest engagement rates?",
    "How does mobile vs desktop engagement compare?",
    "Which customer segments are most engaged?"
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions
  };
};

// Generate response for budget-related queries
export const generateBudgetResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Your marketing budget utilization is at 68% ($341K of $500K total), leaving $159K remaining for Q4 initiatives.";
  let directAnswer = "Budget utilization: 68% ($341K spent, $159K remaining). Top performers show 1001% ROI while underperformers show negative returns.";
  
  if (context.action === 'optimize' || context.urgency === 'high') {
    baseText += " With significant ROI variation (1001% for Winter Gear vs -50% for Anniversary Bonus), immediate budget reallocation could dramatically improve overall performance.";
  }

  const recommendations = [
    {
      title: "Immediate Budget Reallocation to High-ROI Campaigns",
      description: "Shift $50K from underperforming programs (Anniversary Bonus, Summer Bundle) to proven winners like Winter Gear Sale model. Could generate additional $500K revenue based on current performance ratios.",
      impact: "high",
      estimatedROI: "+420%"
    },
    {
      title: "Q4 Strategic Reserve Deployment",
      description: "Use remaining $159K budget strategically: $100K for holiday campaigns (based on Winter Gear success), $35K for At Risk customer recovery, $24K for mobile experience improvements across all campaigns.",
      impact: "high",
      estimatedROI: "+285%"
    }
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions: [
      "Which campaigns should I increase budget for immediately?",
      "How should I allocate the remaining $159K for maximum ROI?",  
      "Which underperforming campaigns should I pause to free up budget?",
      "What's my budget allocation for Q4 holiday campaigns?"
    ]
  };
};

// Generate campaign-specific responses
export const generateCampaignResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Your campaign portfolio shows extreme performance variation: Winter Gear Sale (1001% ROI) and Summit Welcome (1777% ROI) are exceptional, while Spring Newsletter (68% ROI) needs immediate attention.";
  let directAnswer = "Campaign performance ranges from 1777% ROI (Summit Welcome) to 68% ROI (Spring Newsletter) - huge optimization opportunity.";
  
  if (context.action === 'pause') {
    baseText += " Based on current performance, consider pausing the Spring Adventure Newsletter and Anniversary Bonus campaigns to reallocate budget to your proven performers.";
    directAnswer = "RECOMMENDATION: Pause Spring Newsletter (68% ROI) and Anniversary Bonus (-50% ROI) immediately. Reallocate budget to Winter Gear and Summit Welcome models.";
  }

  const recommendations = context.action === 'pause' ? [
    {
      title: "Immediate Campaign Pause and Budget Reallocation",
      description: "Pause Spring Newsletter and Anniversary Bonus campaigns immediately. Reallocate their combined $52K budget to extend Winter Gear Sale success model into spring hiking gear and summer camping categories.",
      impact: "high", 
      estimatedROI: "+380%"
    },
    {
      title: "Success Template Rapid Deployment",
      description: "Create campaign templates based on Winter Gear (seasonal, lifestyle-focused) and Summit Welcome (VIP, personalized) approaches. Deploy within 2 weeks to capitalize on proven formulas before Q4.",
      impact: "high",
      estimatedROI: "+295%"
    }
  ] : [
    {
      title: "Top Performer Success Analysis & Scaling",
      description: "Deep-dive into why Winter Gear Sale and Summit Welcome achieve such high ROI. Analyze audience segments, messaging, timing, and creative elements to create a repeatable success framework for other campaigns.",
      impact: "high",
      estimatedROI: "+340%"
    },
    {
      title: "Underperformer Recovery Strategy",
      description: "Rather than abandoning lower-performing campaigns, test rapid iterations: new subject lines for Spring Newsletter, different reward structures for loyalty programs, and audience re-segmentation based on your successful campaigns.",
      impact: "medium",
      estimatedROI: "+165%"
    }
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions: context.action === 'pause' ? [
      "How quickly can I pause underperforming campaigns?",
      "What's the process for reallocating budget mid-quarter?",
      "Which team members need to be involved in campaign pausing decisions?",
      "How do I communicate campaign changes to stakeholders?"
    ] : [
      "What makes Winter Gear Sale and Summit Welcome so successful?",
      "How can I quickly test improvements to underperforming campaigns?",
      "What's the minimum budget needed to properly test campaign changes?",
      "Which campaign elements should I standardize across all campaigns?"
    ]
  };
};

// Generate general response for other queries
export const generateGeneralResponse = (query = '') => {
  const context = analyzeQuery(query);
  
  let baseText = "Your marketing performance shows strong fundamentals with notable optimization opportunities.";
  let directAnswer = "Overall marketing performance is strong: revenue up 12.7%, customer growth 8.3%, but significant ROI variation presents major optimization opportunities.";
  
  if (context.urgency === 'high') {
    baseText += " Key priority areas needing immediate attention: Spring Newsletter (10% open rate), At Risk customers (42% retention), and loyalty redemption rates (down 8.3%).";
    directAnswer = "IMMEDIATE PRIORITIES: Fix Spring Newsletter (10% open rate), recover At Risk customers (42% retention), and address loyalty redemption decline (-8.3%).";
  } else {
    baseText += " Revenue growth of 12.7% and customer growth of 8.3% indicate strong market position, but ROI variation from 1777% to -50% across campaigns suggests significant untapped potential.";
  }

  const recommendations = [
    {
      title: "Integrated Performance Optimization Framework",
      description: "Implement systematic optimization across all channels: replicate high-ROI campaign elements (Winter Gear, Summit Welcome), fix critical issues (Spring Newsletter, loyalty redemption), and standardize successful approaches across all campaigns.",
      impact: "high",
      estimatedROI: "+285%"
    },
    {
      title: "Customer Segment-Based Campaign Orchestration",
      description: "Align all campaigns with customer segments: Champions and Summit tier get premium experiences, At Risk customers get recovery campaigns, and new customers get proven onboarding sequences based on your successful programs.",
      impact: "high",
      estimatedROI: "+320%"
    }
  ];

  return {
    text: baseText,
    directAnswer,
    recommendations,
    suggestedQuestions: [
      "What's the single most impactful change I could make this month?",
      "How do I prioritize optimization efforts across all these campaigns?",
      "Which metrics should I monitor daily vs weekly?",
      "What's realistic ROI improvement timeline for underperforming campaigns?"
    ]
  };
};

// Function to determine the appropriate response generator based on query
export const getResponseGenerator = (query) => {
  if (!query) return generateGeneralResponse;
  
  const lowercaseQuery = query.toLowerCase();
  
  // Check for specific campaign mentions first
  if (lowercaseQuery.includes('spring newsletter') || lowercaseQuery.includes('adventure newsletter')) {
    return () => generateEngagementResponse(query);
  }
  if (lowercaseQuery.includes('winter gear') || lowercaseQuery.includes('winter sale')) {
    return () => generateRevenueResponse(query);
  }
  
  // Then check for primary topic areas
  if (lowercaseQuery.includes('budget') || lowercaseQuery.includes('allocation') || lowercaseQuery.includes('spend')) {
    return () => generateBudgetResponse(query);
  } else if (lowercaseQuery.includes('pause') || lowercaseQuery.includes('optimize') || lowercaseQuery.includes('campaign')) {
    return () => generateCampaignResponse(query);
  } else if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales') || lowercaseQuery.includes('income')) {
    return () => generateRevenueResponse(query);
  } else if (lowercaseQuery.includes('customer') || lowercaseQuery.includes('churn') || lowercaseQuery.includes('retention')) {
    return () => generateCustomerResponse(query);
  } else if (lowercaseQuery.includes('loyalty') || lowercaseQuery.includes('program') || lowercaseQuery.includes('reward') || lowercaseQuery.includes('redemption')) {
    return () => generateLoyaltyResponse(query);
  } else if (lowercaseQuery.includes('engagement') || lowercaseQuery.includes('click') || lowercaseQuery.includes('email') || lowercaseQuery.includes('open rate')) {
    return () => generateEngagementResponse(query);
  }
  
  return () => generateGeneralResponse(query);
};
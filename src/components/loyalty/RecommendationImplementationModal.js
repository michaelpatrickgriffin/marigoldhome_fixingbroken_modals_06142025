// src/components/loyalty/RecommendationImplementationModal.js
import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, Target, TrendingUp, Award, 
  Users, DollarSign, ArrowUpRight, Zap, 
  Calendar, Settings, Star, ShoppingBag, Clock,
  Brain, Lightbulb, Gift, Mail, Sparkles, Edit
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import FullScreenLoyaltyProgramModal from './FullScreenLoyaltyProgramModal';
import OfferCreationModal from './OfferCreationModal';

const RecommendationImplementationModal = ({ 
  isOpen, 
  onClose, 
  recommendation, 
  programData, 
  onProgramCreated, 
  onNotificationCreated 
}) => {
  const [currentPhase, setCurrentPhase] = useState('setup'); // 'setup', 'review'
  const [setupProgress, setSetupProgress] = useState(0);
  const [implementationData, setImplementationData] = useState(null);
  const [setupStep, setSetupStep] = useState(0);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // ✅ BETTER: Format large numbers appropriately  
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;  // $1.8M
    } else if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;      // $847K  
    } else {
      return `${value}`;                          // $500
    }
  };

  // ✅ HELPER FUNCTIONS: Moved to top to fix hoisting issues
  
  // Helper function to detect At Risk Recovery Punch Card recommendations
  const isAtRiskPunchCardRecommendation = () => {
    return (
      // Check recommendation ID patterns for At Risk punch card
      (recommendation?.id && (
        recommendation.id.includes('rec-atrisk-punchcard') || 
        recommendation.id.includes('atrisk-punchcard') ||
        recommendation.id.startsWith('atrisk-') ||
        recommendation.id === 'rec-atrisk-punchcard-new'
      )) ||
      // Check recommendation title for At Risk keywords
      (recommendation?.title && (
        recommendation.title.toLowerCase().includes('at risk') && 
        recommendation.title.toLowerCase().includes('punch card')
      )) ||
      // Check if this targets the At Risk segment specifically
      (recommendation?.segment && recommendation.segment.toLowerCase() === 'at risk') ||
      // Check if program audience is At Risk
      (programData?.audience && programData.audience.toLowerCase().includes('at risk'))
    );
  };

  // Helper function to detect Trail Essentials recommendations
  const isTrailEssentialsRecommendation = () => {
    return (
      // Check recommendation ID patterns
      (recommendation?.id && (
        recommendation.id.includes('rec-p2-') || 
        recommendation.id.includes('rec-c2-') ||
        recommendation.id.startsWith('p2-') ||
        recommendation.id.startsWith('c2-')
      )) ||
      // Check program title
      (programData?.title && programData.title.toLowerCase().includes('trail essentials')) ||
      // Check recommendation title for Trail Essentials keywords
      (recommendation?.title && (
        recommendation.title.toLowerCase().includes('trail essentials') ||
        (recommendation.title.toLowerCase().includes('punch card') && 
         recommendation.title.toLowerCase().includes('optimization'))
      )) ||
      // Check if this is the Trail Essentials program (ID 2)
      (programData?.id === 2) ||
      // Check if program needs attention and has negative ROI (Trail Essentials characteristics)
      (programData?.needsAttention && programData?.roi < 0 && !isAtRiskPunchCardRecommendation())
    );
  };

  // ✅ UPDATED: Enhanced helper function to detect promotional offer recommendations
  const isOfferRecommendation = () => {
    return (
      // Check for offer-specific metadata
      (recommendation?.offerType) ||
      (recommendation?.discountType) ||
      (recommendation?.targetCategory) ||
      // Check recommendation type
      (recommendation?.type === 'Promotional Campaign') ||
      // Check for discount/offer fields in details
      (recommendation?.details?.discountPercent) ||
      (recommendation?.details?.cashbackPercent) ||
      (recommendation?.details?.minimumSpend) ||
      // Check title/description for offer keywords
      (recommendation?.title && (
        recommendation.title.toLowerCase().includes('discount') ||
        recommendation.title.toLowerCase().includes('cashback') ||
        recommendation.title.toLowerCase().includes('offer') ||
        recommendation.title.toLowerCase().includes('buy 2 get 1')
      )) ||
      // Check audience for lapsed customer patterns
      (recommendation?.audience && (
        recommendation.audience.toLowerCase().includes('lapsed') ||
        recommendation.audience.toLowerCase().includes('high-value lapsed') ||
        recommendation.audience.toLowerCase().includes('high_value_lapsed')
      )) ||
      // Check for minimum spend or discount values
      (recommendation?.minimumSpend) ||
      (recommendation?.discountValue) ||
      // ✅ NEW: Check for Walgreens-specific offer IDs
      (recommendation?.id && (
        recommendation.id.includes('walgreens-hw-') ||
        recommendation.id.includes('health-wellness') ||
        recommendation.id.includes('category-discount') ||
        recommendation.id.includes('cashback-')
      ))
    );
  };

  // ✅ UPDATED: Offer-specific setup steps
  const getSetupSteps = () => {
    if (isOfferRecommendation()) {
      return [
        'Analyzing offer requirements and target audience',
        'Calculating optimal discount levels and thresholds', 
        'Configuring offer mechanics and redemption rules',
        'Designing customer communication strategy',
        'Projecting offer performance and ROI',
        'Finalizing offer configuration'
      ];
    } else {
      return [
        'Analyzing recommendation requirements',
        'Identifying target member segments', 
        'Calculating implementation parameters',
        'Designing member communication strategy',
        'Projecting implementation timeline',
        'Finalizing program configuration'
      ];
    }
  };

  const setupSteps = getSetupSteps();

  // Debug logging for modal state
  useEffect(() => {
    console.log('Recommendation Modal State Change - Modal isOpen:', isOpen, 'Recommendation:', recommendation, 'Program Data:', programData);
  }, [isOpen, recommendation, programData]);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen && recommendation) {
      console.log('Opening implementation modal for recommendation:', recommendation);
      setCurrentPhase('setup');
      setSetupProgress(0);
      setSetupStep(0);
      setImplementationData(null);
      setShowModifyModal(false);
      setShowOfferModal(false);
      
      // Start the setup simulation with more detailed steps
      const stepInterval = setInterval(() => {
        setSetupStep(prevStep => {
          const nextStep = prevStep + 1;
          const progress = (nextStep / setupSteps.length) * 100;
          
          setSetupProgress(progress);
          
          if (nextStep >= setupSteps.length) {
            clearInterval(stepInterval);
            // Small delay before transitioning to review
            setTimeout(() => {
              console.log('Transitioning to review phase');
              setCurrentPhase('review');
              generateImplementationData();
            }, 800);
            return setupSteps.length;
          }
          return nextStep;
        });
      }, 700);

      return () => clearInterval(stepInterval);
    }
  }, [isOpen, recommendation]);

  // Generate the implementation data based on recommendation
  const generateImplementationData = () => {
    if (!recommendation) {
      console.warn('No recommendation provided for implementation data generation');
      return;
    }
    
    console.log('Generating implementation data for:', recommendation.id, recommendation.title, recommendation.type);
    
    let data = {};
    
    // Generate implementation data based on recommendation type
    if (isAtRiskPunchCardRecommendation()) {
      data = generateAtRiskPunchCardImplementation();
    } else if (isTrailEssentialsRecommendation()) {
      data = generateTrailEssentialsImplementation();
    } else if (isOfferRecommendation()) {
      data = generateOfferImplementation();
    } else if (recommendation.type === 'enhancement') {
      data = generateEnhancementImplementation();
    } else if (recommendation.type === 'targeting') {
      data = generateTargetingImplementation();
    } else if (recommendation.type === 'optimization') {
      data = generateOptimizationImplementation();
    } else if (recommendation.type === 'communication') {
      data = generateCommunicationImplementation();
    } else {
      // Default implementation for other types
      data = generateDefaultImplementation();
    }
    
    console.log('Generated implementation data:', data);
    setImplementationData(data);
  };

  // At Risk Recovery Punch Card specific implementation
  const generateAtRiskPunchCardImplementation = () => {
    return {
      title: 'At Risk Recovery Punch Card',
      type: 'Program Enhancement',
      audience: 'At Risk Segment',
      description: 'Strategic punch card program designed to improve recency and frequency patterns for At Risk customers through targeted weekly engagement requirements and milestone rewards.',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '10',
      rules: [
        '4-purchase punch card with $10 minimum purchase requirement',
        'Weekly visit requirements to boost recency patterns',
        'Milestone rewards: 100 points after 2 visits, $5 coupon after 4 visits',
        'Targeted to At Risk segment (R:3 F:3 customers)',
        'Progress tracking and completion analytics'
      ],
      rewards: [
        '100 bonus points after 2 qualifying visits',
        '$5 coupon completion reward after 4 visits',
        'Weekly engagement milestone recognition',
        'Progress tracking dashboard access',
        'Completion celebration email with exclusive offers'
      ],
      tiers: [],
      earningMechanics: [
        'Weekly purchase requirement for punch progression',
        'Milestone bonuses: 100 points at 2-visit mark',
        'Completion celebration: $5 coupon reward',
        'Engagement rewards: 50 points for feedback participation',
        'Progress sharing: 25 points for social media engagement'
      ],
      programTouchpoints: [
        'Enhanced mobile app progress tracking',
        'Personalized email milestone celebrations',
        'SMS reminders for weekly engagement opportunities',
        'In-app achievement notifications',
        'Recovery-focused member communication'
      ],
      projectedMetrics: {
        participantsRecovered: '7,650',
        revenueRecovery: '$215K',
        additionalPurchases: '12,000',
        averageOrderValue: '$17.90',
        recencyImprovement: '60%',
        frequencyImprovement: '35%',
        monetaryImprovement: '3%',
        responseRate: '40%',
        timeToPositiveROI: '6 weeks',
        programROI: '+280%'
      },
      problemSolved: {
        issue: 'At Risk Recovery Punch Card',
        impact: 'Declining frequency and recency for high value customers puts them at risk of disengaging and lowering their lifetime value.',
        solution: 'Increase recency and frequency by targeting segment members with multi-step punch card with multiple reward levels',
        outcome: 'Incentivize incremental increase in purchase frequency and recency with punch card requiring at least one purchase per week for the next month. Lower than average qualifying purchase amount makes this an attractive option for members to re-engage.'
      },
      implementationPlan: [
        {
          phase: 'Analysis & Planning (Days 1-14)',
          actions: [
            'Conduct comprehensive At Risk member behavior analysis',
            'Design 4-purchase punch card with weekly requirements',
            'Create recovery-focused communication templates',
            'Set up progress tracking and analytics systems'
          ]
        },
        {
          phase: 'Pilot Launch (Days 15-45)',
          actions: [
            'Launch punch card program with 25% of At Risk members',
            'Monitor weekly engagement and completion metrics',
            'Collect member feedback and satisfaction data',
            'Refine program elements based on early results'
          ]
        },
        {
          phase: 'Full Rollout (Days 46-120)',
          actions: [
            'Expand to all At Risk segment members',
            'Implement member re-engagement campaigns',
            'Scale successful program elements',
            'Document recovery results and best practices'
          ]
        }
      ]
    };
  };

  // Trail Essentials specific implementation
  const generateTrailEssentialsImplementation = () => {
    return {
      title: 'Trail Essentials Program Optimization',
      type: 'Program Enhancement',
      audience: 'Trail Essentials Participants',
      description: 'Comprehensive program optimization to improve member experience and engagement through data-driven enhancements, simplified progression paths, and enhanced value communication.',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '12',
      rules: [
        'Streamlined 3-punch progression for better completion rates',
        'Progressive milestone rewards at each punch level',
        'Clear value communication throughout member journey',
        'Bonus completion incentives for early engagement',
        'Simplified redemption process with guided assistance'
      ],
      rewards: [
        'Milestone celebration reward (300 points)',
        'Trail gear starter kit (750 points)',
        'Exclusive trail guide access (500 points)',
        'Premium gear discount (25% off)',
        'Completion bonus reward (1000 points)'
      ],
      tiers: [],
      earningMechanics: [
        'Simplified punch progression: 1 punch per qualifying purchase',
        'Milestone bonuses: 100 points at each punch level',
        'Completion celebration: 500 bonus points',
        'Engagement rewards: 50 points for feedback participation',
        'Progress sharing: 25 points for social media engagement'
      ],
      programTouchpoints: [
        'Enhanced mobile app progress tracking',
        'Personalized email milestone celebrations',
        'SMS reminders for progression opportunities',
        'In-app achievement notifications',
        'Member success story sharing platform'
      ],
      projectedMetrics: {
        participantsRecovered: '9,500',
        revenueRecovery: '$185K',
        customerSatisfactionIncrease: '+38%',
        brandSentimentImprovement: '+32%',
        retentionRateImprovement: '+45%',
        programROI: '+225%',
        timeToPositiveROI: '8 weeks',
        churnReduction: '42%',
        npsImprovement: '+22 points'
      },
      problemSolved: {
        issue: 'Trail Essentials Program Optimization Opportunity',
        impact: '10% completion rate indicates structure needs enhancement for better member experience',
        solution: 'Comprehensive program optimization with simplified progression and enhanced member communication',
        outcome: 'Improved member satisfaction and program performance through data-driven enhancements'
      },
      implementationPlan: [
        {
          phase: 'Analysis & Planning (Days 1-14)',
          actions: [
            'Conduct comprehensive member behavior analysis',
            'Design simplified 3-punch program structure',
            'Create enhanced communication templates',
            'Set up progress tracking and analytics systems'
          ]
        },
        {
          phase: 'Pilot Launch (Days 15-45)',
          actions: [
            'Launch optimized program with 25% of participants',
            'Monitor engagement and completion metrics',
            'Collect member feedback and satisfaction data',
            'Refine program elements based on early results'
          ]
        },
        {
          phase: 'Full Rollout (Days 46-120)',
          actions: [
            'Expand to all Trail Essentials members',
            'Implement member re-engagement campaigns',
            'Scale successful program elements',
            'Document optimization results and best practices'
          ]
        }
      ]
    };
  };

  // ✅ COMPLETELY UPDATED: Offer implementation using actual recommendation data
  const generateOfferImplementation = () => {
    console.log('Generating offer implementation with recommendation:', recommendation);
    
    const offerType = recommendation?.offerType || recommendation?.discountType || 'category_discount';
    const offerDetails = recommendation?.details || {};
    
    // ✅ NEW: Check if we have actual AI response data vs. fallback
    const hasActualData = offerDetails.participatingCustomers && offerDetails.influencedRevenue;
    
    console.log('Offer details available:', offerDetails);
    console.log('Has actual data:', hasActualData);
    
    // ✅ FIXED: Updated metrics with realistic customer counts and revenue
    const metrics = {
      participantsRecovered: hasActualData ? 
        offerDetails.participatingCustomers?.toLocaleString() : '25,490',
      revenueRecovery: hasActualData ? 
        formatCurrency(offerDetails.influencedRevenue) : '$1.85M',
      redemptionRate: hasActualData ? 
        `${offerDetails.redemptionRate}%` : '28.5%',
      averageOrderValue: hasActualData ? 
        `$${offerDetails.avgOrderValue}` : '$45',
      programROI: hasActualData ? 
        `${offerDetails.roi}%` : '567%',
      timeToPositiveROI: '2-4 weeks',
      categoryEngagementIncrease: '+45%',
      customerSatisfactionIncrease: '+32%',
      totalDiscountCost: hasActualData ? 
        `$${Math.round((offerDetails.totalDiscountValue || offerDetails.totalCashbackValue || 0) / 1000)}K` : '$277K'
    };
    
    console.log('Final projected metrics:', metrics);
    
    return {
      title: recommendation?.title || 'Category Re-engagement Offer',
      type: 'Promotional Campaign',
      audience: recommendation?.audience || 'High-Value Lapsed Customers',
      description: recommendation?.description || 'Strategic offer targeting high-value customers who have lapsed from category purchases to drive re-engagement and revenue recovery.',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '',
      offerType: offerType,
      discountType: offerType === 'category_discount' ? 'percentage' : 
                   offerType === 'cashback_reward' ? 'cashback' : 'bundle',
      discountValue: offerDetails.discountPercent || offerDetails.cashbackPercent || recommendation?.discountValue || 15,
      minimumSpend: offerDetails.minimumSpend || recommendation?.minimumSpend || 40,
      maxDiscount: offerDetails.maxCashback || offerDetails.maxDiscount || recommendation?.maxDiscount || 25,
      targetCategory: recommendation?.targetCategory || 'general',
      rules: [
        `Valid on ${recommendation?.targetCategory?.replace('_', ' ') || 'category'} purchases`,
        `Minimum purchase of $${offerDetails.minimumSpend || recommendation?.minimumSpend || 40} required`,
        offerType === 'cashback_reward' ? 
          `${offerDetails.cashbackPercent || 20}% cashback earned on eligible purchases` :
          offerType === 'bundle_discount' ?
          `Buy 2 Get 1 Free on select items $${offerDetails.minimumItemPrice || 25}+` :
          `${offerDetails.discountPercent || recommendation?.discountValue || 15}% off category purchases`,
        'Limited to one redemption per customer during offer period',
        'Cannot be combined with other promotional offers',
        'Offer valid for 90 days from launch'
      ],
      rewards: [
        offerType === 'cashback_reward' ? 
          `Up to $${offerDetails.maxCashback || 25} cashback on eligible purchases` :
          offerType === 'bundle_discount' ?
          'Free item value up to the lowest-priced item in bundle' :
          `Up to $${offerDetails.maxDiscount || 25} discount per transaction`,
        'Email confirmation of offer redemption',
        'Follow-up recommendations for related products',
        'Invitation to exclusive category events'
      ],
      tiers: [],
      earningMechanics: [
        offerType === 'cashback_reward' ? 
          'Cashback credited to account within 24-48 hours' :
          'Discount applied automatically at checkout',
        'Offer tracking via customer email and phone number',
        'Real-time offer status updates in mobile app',
        'Post-purchase satisfaction survey for program improvement'
      ],
      programTouchpoints: [
        'Personalized email campaign launch',
        'Mobile app push notification',
        'Website banner and category page highlights',
        'SMS reminder 1 week before expiration',
        'Follow-up email with related product recommendations'
      ],
      projectedMetrics: metrics,
      problemSolved: {
        issue: 'Category Re-engagement Opportunity',
        impact: 'High-value customers have stopped purchasing from target category, representing significant revenue potential',
        solution: `Strategic ${offerType === 'cashback_reward' ? 'cashback reward' : offerType === 'bundle_discount' ? 'bundle promotion' : 'category discount'} to incentivize category re-engagement`,
        outcome: 'Top Spenders purchase Health & Wellness category driving category re-engagement, revenue, and customer lifetime value'
      },
      implementationPlan: [
        {
          phase: 'Campaign Setup (Days 1-7)',
          actions: [
            'Finalize offer terms and discount mechanics',
            'Set up tracking and attribution systems',
            'Create personalized email and SMS templates',
            'Configure automatic discount application in POS systems'
          ]
        },
        {
          phase: 'Launch & Monitoring (Days 8-30)',
          actions: [
            'Deploy targeted email campaign to identified segment',
            'Monitor redemption rates and customer response',
            'Track category engagement and purchase behavior',
            'Optimize messaging based on early performance data'
          ]
        },
        {
          phase: 'Analysis & Follow-up (Days 31-90)',
          actions: [
            'Analyze campaign performance vs. projections',
            'Deploy follow-up campaigns to non-redeemers',
            'Measure long-term category engagement impact',
            'Document insights for future category campaigns'
          ]
        }
      ]
    };
  };

  // Enhancement type implementation
  const generateEnhancementImplementation = () => {
    return {
      title: `${programData?.title || 'Program'} Enhancement Initiative`,
      type: 'Program Enhancement',
      audience: programData?.audience || 'All Members',
      description: `Strategic enhancement program to improve ${programData?.title || 'the program'} through AI-powered personalization, advanced analytics, and member experience optimization.`,
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '12',
      rules: [
        'Enhanced point earning on personalized recommendations',
        'Bonus multipliers for consistent engagement',
        'Tiered rewards based on member activity',
        'Special recognition for community participation'
      ],
      rewards: [
        'Personalized product recommendations (300 points)',
        'Early access to new features (500 points)',
        'Exclusive member events (800 points)',
        'Premium customer support (400 points)',
        'Custom gear configuration (1000 points)'
      ],
      tiers: [
        { name: 'Explorer', threshold: '500 points' },
        { name: 'Adventurer', threshold: '2,000 points' },
        { name: 'Elite', threshold: '5,000 points' }
      ],
      earningMechanics: [
        'AI-recommended action completion: 50-200 points',
        'Member feedback submission: 25 points',
        'Social sharing with program hashtag: 30 points',
        'Monthly challenge participation: 100 points',
        'Referral bonuses: 250 points per successful referral'
      ],
      programTouchpoints: [
        'Personalized mobile app dashboard',
        'Weekly AI-powered recommendations email',
        'In-store QR code experiences',
        'Social media engagement campaigns',
        'Quarterly member appreciation events'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 1000) * 0.85).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 50000) * 0.25 / 1000)}K`,
        customerSatisfactionIncrease: '+28%',
        brandSentimentImprovement: '+22%',
        retentionRateImprovement: '+35%',
        programROI: '+240%',
        timeToPositiveROI: '8 weeks',
        churnReduction: '45%',
        npsImprovement: '+18 points'
      },
      problemSolved: {
        issue: 'Member Engagement Enhancement Opportunity',
        impact: 'Opportunities identified for more personalized member experiences',
        solution: 'AI-powered enhancement with personalized member journeys',
        outcome: 'Increased engagement and member lifetime value through optimization'
      },
      implementationPlan: [
        {
          phase: 'Planning & Setup (Days 1-14)',
          actions: [
            'Deploy AI personalization engine',
            'Set up advanced analytics dashboard',
            'Create member segmentation models',
            'Design new reward structures'
          ]
        },
        {
          phase: 'Pilot Launch (Days 15-45)',
          actions: [
            'Launch with 20% of member base',
            'Monitor engagement metrics',
            'Collect member feedback',
            'Optimize recommendation algorithms'
          ]
        },
        {
          phase: 'Full Rollout (Days 46-180)',
          actions: [
            'Expand to all members',
            'Launch advanced tier benefits',
            'Implement social features',
            'Measure long-term impact'
          ]
        }
      ]
    };
  };

  // Targeting type implementation
  const generateTargetingImplementation = () => {
    return {
      title: `${programData?.title || 'Program'} Precision Targeting Initiative`,
      type: 'Targeted Campaign',
      audience: 'High-Value Member Segments',
      description: `Advanced targeting program using behavioral analytics and predictive modeling to deliver personalized experiences to the most valuable ${programData?.title || 'program'} members.`,
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '10',
      rules: [
        'Segment-specific point multipliers',
        'Predictive reward recommendations',
        'Behavioral trigger-based bonuses',
        'Dynamic tier progression'
      ],
      rewards: [
        'VIP customer service (200 points)',
        'Exclusive product previews (600 points)',
        'Personal shopping sessions (1500 points)',
        'Custom product bundles (800 points)',
        'Anniversary celebration perks (400 points)'
      ],
      tiers: [],
      earningMechanics: [
        'High-value purchase bonus: 3X points',
        'Loyalty milestone rewards: 500 points',
        'Cross-category purchase incentives: 2X points',
        'Seasonal engagement bonuses: 150 points',
        'Referral success rewards: 300 points'
      ],
      programTouchpoints: [
        'Personalized email campaigns',
        'SMS alerts for relevant offers',
        'In-app targeted notifications',
        'Direct mail for VIP members',
        'Personal shopper consultations'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 1000) * 0.35).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 50000) * 0.4 / 1000)}K`,
        customerSatisfactionIncrease: '+32%',
        brandSentimentImprovement: '+25%',
        retentionRateImprovement: '+42%',
        programROI: '+320%',
        timeToPositiveROI: '5 weeks',
        churnReduction: '55%',
        npsImprovement: '+22 points'
      },
      problemSolved: {
        issue: 'Member Communication Optimization Opportunity',
        impact: 'Opportunity identified for more targeted and relevant member communications',
        solution: 'Precision targeting with personalized member journeys',
        outcome: 'Higher engagement and conversion from key member segments'
      },
      implementationPlan: [
        {
          phase: 'Segmentation (Days 1-10)',
          actions: [
            'Analyze member behavior patterns',
            'Create predictive value models',
            'Define high-value segments',
            'Set up targeting infrastructure'
          ]
        },
        {
          phase: 'Campaign Launch (Days 11-30)',
          actions: [
            'Deploy targeted campaigns',
            'Monitor segment response rates',
            'A/B test messaging variations',
            'Optimize targeting algorithms'
          ]
        },
        {
          phase: 'Scale & Optimize (Days 31-120)',
          actions: [
            'Expand successful campaigns',
            'Refine segment definitions',
            'Implement automation workflows',
            'Measure ROI and lifetime value impact'
          ]
        }
      ]
    };
  };

  // Optimization type implementation
  const generateOptimizationImplementation = () => {
    return {
      title: `${programData?.title || 'Program'} Performance Optimization`,
      type: 'Program Optimization',
      audience: programData?.audience || 'All Members',
      description: `Comprehensive optimization initiative to improve ${programData?.title || 'program'} performance through data-driven enhancements, streamlined processes, and member experience improvements.`,
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '8',
      rules: [
        'Optimized point earning rates',
        'Streamlined redemption process',
        'Performance-based bonus multipliers',
        'Simplified tier advancement'
      ],
      rewards: [
        'Fast-track redemptions (150 points)',
        'Bonus point packages (300 points)',
        'Priority processing (250 points)',
        'Member appreciation gifts (500 points)',
        'Exclusive optimization previews (400 points)'
      ],
      tiers: [],
      earningMechanics: [
        'Optimized purchase multipliers: 1.5X points',
        'Quick action bonuses: 25 points',
        'Efficiency rewards: 75 points',
        'Feedback participation: 50 points',
        'Process improvement suggestions: 100 points'
      ],
      programTouchpoints: [
        'Streamlined mobile experience',
        'Automated progress notifications',
        'Real-time point balance updates',
        'Simplified redemption interface',
        'Performance feedback surveys'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 1000) * 0.75).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 50000) * 0.3 / 1000)}K`,
        customerSatisfactionIncrease: '+25%',
        brandSentimentImprovement: '+20%',
        retentionRateImprovement: '+30%',
        programROI: '+200%',
        timeToPositiveROI: '6 weeks',
        churnReduction: '40%',
        npsImprovement: '+15 points'
      },
      problemSolved: {
        issue: 'Program Performance Enhancement Opportunity',
        impact: 'Areas identified for improved member experience and engagement',
        solution: 'Data-driven optimization and process improvements',
        outcome: 'Enhanced program performance and member satisfaction'
      },
      implementationPlan: [
        {
          phase: 'Analysis (Days 1-7)',
          actions: [
            'Comprehensive program performance audit',
            'Member journey mapping',
            'Optimization opportunity assessment',
            'Enhancement strategy development'
          ]
        },
        {
          phase: 'Implementation (Days 8-45)',
          actions: [
            'Deploy process improvements',
            'Launch optimized user interfaces',
            'Implement performance monitoring',
            'Begin member communication campaign'
          ]
        },
        {
          phase: 'Optimization (Days 46-90)',
          actions: [
            'Monitor performance improvements',
            'Fine-tune optimization parameters',
            'Collect member feedback',
            'Document success metrics'
          ]
        }
      ]
    };
  };

  // Communication type implementation
  const generateCommunicationImplementation = () => {
    return {
      title: `${programData?.title || 'Program'} Communication Enhancement`,
      type: 'Communication Strategy',
      audience: programData?.audience || 'All Members',
      description: `Strategic communication enhancement to improve member engagement through personalized messaging, multi-channel outreach, and proactive member support.`,
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '5',
      rules: [
        'Communication preference-based delivery',
        'Engagement milestone celebrations',
        'Proactive support outreach',
        'Personalized content delivery'
      ],
      rewards: [
        'Communication preferences setup (50 points)',
        'Newsletter subscription bonus (100 points)',
        'Survey participation rewards (75 points)',
        'Community engagement points (125 points)',
        'Feedback contribution recognition (200 points)'
      ],
      tiers: [],
      earningMechanics: [
        'Email engagement: 10 points per click',
        'SMS response: 15 points per reply',
        'App notification interaction: 5 points',
        'Community post engagement: 20 points',
        'Support interaction rating: 25 points'
      ],
      programTouchpoints: [
        'Personalized email campaigns',
        'Smart SMS notifications',
        'In-app messaging center',
        'Community forum participation',
        'Proactive customer support'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 1000) * 0.90).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 50000) * 0.15 / 1000)}K`,
        customerSatisfactionIncrease: '+20%',
        brandSentimentImprovement: '+28%',
        retentionRateImprovement: '+25%',
        programROI: '+150%',
        timeToPositiveROI: '4 weeks',
        churnReduction: '35%',
        npsImprovement: '+20 points'
      },
      problemSolved: {
        issue: 'Member Communication Enhancement Opportunity',
        impact: 'Opportunity to improve member understanding and engagement through better communication',
        solution: 'Enhanced multi-channel communication strategy',
        outcome: 'Improved member understanding and engagement through optimized communications'
      },
      implementationPlan: [
        {
          phase: 'Setup (Days 1-5)',
          actions: [
            'Audit current communication channels',
            'Set up personalization engine',
            'Create communication templates',
            'Establish feedback mechanisms'
          ]
        },
        {
          phase: 'Launch (Days 6-20)',
          actions: [
            'Deploy personalized campaigns',
            'Launch member preference center',
            'Begin proactive support outreach',
            'Monitor engagement metrics'
          ]
        },
        {
          phase: 'Optimize (Days 21-60)',
          actions: [
            'Refine messaging based on feedback',
            'Optimize send times and frequency',
            'Expand successful communication types',
            'Measure satisfaction improvements'
          ]
        }
      ]
    };
  };

  // Default implementation for other types
  const generateDefaultImplementation = () => {
    return {
      title: `${programData?.title || 'Program'} ${recommendation?.title || 'Enhancement'}`,
      type: 'Program Enhancement',
      audience: programData?.audience || 'All Members',
      description: `Implementation of AI recommendation to enhance ${programData?.title || 'the program'} based on member behavior analysis and performance optimization opportunities.`,
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '10',
      rules: [
        'Enhanced member experience features',
        'Performance-based rewards',
        'Automated program improvements',
        'Member feedback integration'
      ],
      rewards: [
        'Program enhancement credits (200 points)',
        'Early feature access (500 points)',
        'Member appreciation rewards (300 points)',
        'Exclusive program previews (750 points)',
        'Community recognition (150 points)'
      ],
      tiers: [],
      earningMechanics: [
        'Enhanced action completion: 50 points',
        'Member feedback participation: 25 points',
        'Program improvement suggestions: 100 points',
        'Community engagement: 30 points',
        'Milestone achievements: 200 points'
      ],
      programTouchpoints: [
        'Enhanced mobile experience',
        'Personalized communications',
        'Streamlined member portal',
        'Automated progress updates',
        'Community engagement features'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 1000) * 0.65).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 50000) * 0.2 / 1000)}K`,
        customerSatisfactionIncrease: '+22%',
        brandSentimentImprovement: '+18%',
        retentionRateImprovement: '+28%',
        programROI: '+180%',
        timeToPositiveROI: '7 weeks',
        churnReduction: '38%',
        npsImprovement: '+16 points'
      },
      problemSolved: {
        issue: recommendation?.title || 'Program Enhancement Opportunity',
        impact: 'Opportunity identified for enhanced member experience',
        solution: 'AI-recommended program improvements',
        outcome: 'Improved program performance and member satisfaction'
      },
      implementationPlan: [
        {
          phase: 'Planning (Days 1-14)',
          actions: [
            'Detailed requirement analysis',
            'Resource allocation and planning',
            'Member communication strategy',
            'Success metrics definition'
          ]
        },
        {
          phase: 'Implementation (Days 15-60)',
          actions: [
            'Deploy program enhancements',
            'Launch member communication',
            'Monitor early adoption metrics',
            'Collect member feedback'
          ]
        },
        {
          phase: 'Optimization (Days 61-120)',
          actions: [
            'Analyze performance data',
            'Optimize based on feedback',
            'Scale successful features',
            'Document lessons learned'
          ]
        }
      ]
    };
  };

  // Handle program creation
  const handleCreateProgram = () => {
    if (!implementationData) {
      console.warn('No implementation data available for program creation');
      return;
    }

    console.log('Creating program from implementation');

    const newProgram = {
      ...implementationData,
      id: Date.now(),
      status: implementationData.startDate ? 'Scheduled' : 'Draft',
      participants: 0,
      pointsIssued: 0,
      redemptions: 0,
      revenue: 0,
      cost: 0,
      roi: 0,
      needsAttention: false,
      recommendations: [],
      isRecommendationImplementation: true,
      originalRecommendation: recommendation
    };

    console.log('Creating recommendation-based program:', newProgram);

    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }

    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'success',
        title: `Enhancement Implemented: ${newProgram.title}`,
        message: `Program optimization has been created and ${newProgram.status === 'Scheduled' ? 'scheduled for launch' : 'saved as draft'}.`,
        time: 'Just now',
        icon: 'CheckCircle',
        color: COLORS.green,
        priority: 'high'
      };
      onNotificationCreated(notification);
    }

    onClose();
  };

  // Handle modify action with routing to appropriate modal
  const handleModifyRecommendation = () => {
    console.log('Opening modify modal with implementation data:', implementationData);
    
    if (implementationData) {
      // Manage body scroll and backdrop interactions
      document.body.style.overflow = 'hidden';
      
      // Route to appropriate modal based on recommendation type
      if (isOfferRecommendation()) {
        setShowOfferModal(true);
      } else {
        setShowModifyModal(true);
      }
    }
  };

  // Handle modify modal close with proper cleanup
  const handleModifyModalClose = () => {
    console.log('Modify modal closed');
    setShowModifyModal(false);
    // Don't restore body scroll here since the recommendation modal is still open
  };

  // Handle offer modal close
  const handleOfferModalClose = () => {
    console.log('Offer modal closed');
    setShowOfferModal(false);
    // Don't restore body scroll here since the recommendation modal is still open
  };

  // Handle program created from modify modal
  const handleProgramCreatedFromModify = (modifiedProgram) => {
    console.log('Program modified and created:', modifiedProgram);
    
    // Mark as modified implementation
    const finalProgram = {
      ...modifiedProgram,
      isRecommendationImplementation: true,
      isModified: true,
      originalRecommendation: recommendation
    };
    
    if (onProgramCreated) {
      onProgramCreated(finalProgram);
    }

    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'success',
        title: `Customized Enhancement Implemented: ${finalProgram.title}`,
        message: `Customized program has been created and ${finalProgram.status === 'Scheduled' ? 'scheduled for launch' : 'saved as draft'}.`,
        time: 'Just now',
        icon: 'CheckCircle',
        color: COLORS.green,
        priority: 'high'
      };
      onNotificationCreated(notification);
    }
    
    // Close both modals and restore scroll
    setShowModifyModal(false);
    document.body.style.overflow = 'unset';
    onClose();
  };

  // ✅ FIXED: Handle offer created from offer modal with proper program structure
  const handleOfferCreatedFromModal = (createdOffer) => {
    console.log('Offer created:', createdOffer);
    
    // ✅ NEW: Transform offer into program-compatible structure
    const finalProgram = {
      ...createdOffer,
      // ✅ FIXED: Use loyalty program type instead of campaign type
      type: 'Promotional Program', // ← Changed from 'Promotional Campaign' to ensure loyalty routing
      programType: 'offer', // ← Mark as offer type for filtering/display
      participants: 0,
      pointsIssued: 0,
      redemptions: 0,
      revenue: 0,
      cost: 0,
      roi: 0,
      needsAttention: false,
      recommendations: [],
      
      // ✅ NEW: Add explicit loyalty program marker
      isLoyaltyProgram: true, // ← Explicit flag for parent routing logic
      
      // Keep offer-specific fields for offer functionality
      offerType: createdOffer.offerType,
      discountType: createdOffer.discountType,
      discountValue: createdOffer.discountValue,
      discountVariants: createdOffer.discountVariants,
      minimumSpend: createdOffer.minimumSpend,
      maxDiscount: createdOffer.maxDiscount,
      targetCategory: createdOffer.targetCategory,
      redemptionLimit: createdOffer.redemptionLimit,
      validDays: createdOffer.validDays,
      
      // Track implementation origin
      isRecommendationImplementation: true,
      isModified: true,
      originalRecommendation: recommendation
    };
    
    console.log('Transformed offer into program structure:', finalProgram);
    console.log('Program type:', finalProgram.type, 'isLoyaltyProgram:', finalProgram.isLoyaltyProgram);
    
    if (onProgramCreated) {
      onProgramCreated(finalProgram); // ← Now sends program-structured data
    }

    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'success',
        title: `Customized Offer Implemented: ${finalProgram.title}`,
        message: `Customized offer has been created and ${finalProgram.status === 'Scheduled' ? 'scheduled for launch' : 'saved as draft'}.`,
        time: 'Just now',
        icon: 'CheckCircle',
        color: COLORS.green,
        priority: 'high'
      };
      onNotificationCreated(notification);
    }
    
    // Close both modals and restore scroll
    setShowOfferModal(false);
    document.body.style.overflow = 'unset';
    onClose();
  };

  // Handle main modal close with proper cleanup
  const handleMainModalClose = () => {
    console.log('Closing recommendation modal');
    
    // If offer modal is open, close it first
    if (showOfferModal) {
      setShowOfferModal(false);
    }
    
    // If modify modal is open, close it first  
    if (showModifyModal) {
      setShowModifyModal(false);
    }
    
    // Restore body scroll
    document.body.style.overflow = 'unset';
    
    // Close main modal
    onClose();
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div>
        {/* Dynamic z-index and backdrop management */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: (showModifyModal || showOfferModal) ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.8)',
            zIndex: showModifyModal || showOfferModal ? 50000 : 50000,
            backdropFilter: 'blur(4px)',
            opacity: (showModifyModal || showOfferModal) ? 0.5 : 1,
            pointerEvents: (showModifyModal || showOfferModal) ? 'none' : 'auto'
          }}
          onClick={(showModifyModal || showOfferModal) ? undefined : handleMainModalClose}
        />
        
        {/* Modal content with dynamic styling */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f5f7f8',
            zIndex: (showModifyModal || showOfferModal) ? 50001 : 50001,
            display: 'flex',
            flexDirection: 'column',
            filter: (showModifyModal || showOfferModal) ? 'blur(2px)' : 'none',
            pointerEvents: (showModifyModal || showOfferModal) ? 'none' : 'auto'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(26, 76, 73, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <Lightbulb size={20} style={{ color: COLORS.evergreen }} />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx,
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  {/* ✅ UPDATED: Conditional header text for offers */}
                  {currentPhase === 'setup' ? 
                    (isOfferRecommendation() ? 'Setting Up Offer' : 'Setting Up Enhancement Plan') : 
                    (isOfferRecommendation() ? 'Review Offer Strategy' : 'Review Implementation Strategy')
                  }
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.onyxMedium,
                  margin: 0
                }}>
                  {recommendation?.title || 'AI-Powered Program Optimization'}
                </p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleMainModalClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div style={{ 
            flex: 1, 
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              maxWidth: '80rem',
              width: '100%',
              padding: '2rem 3rem',
              overflowY: 'auto'
            }}>
              {currentPhase === 'setup' ? (
                // Setup Phase
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '60vh',
                  textAlign: 'center'
                }}>
                  {/* Setup Animation */}
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(26, 76, 73, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(26, 76, 73, 0.1)'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.evergreen,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 2s infinite',
                      boxShadow: '0 4px 20px rgba(26, 76, 73, 0.3)'
                    }}>
                      <Brain size={40} color="white" style={{
                        animation: 'float 3s ease-in-out infinite'
                      }} />
                    </div>
                    
                    {/* Progress Ring */}
                    <svg 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '140px',
                        height: '140px',
                        transform: 'rotate(-90deg)'
                      }}
                    >
                      <circle
                        cx="70"
                        cy="70"
                        r="65"
                        stroke="rgba(26, 76, 73, 0.2)"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="70"
                        cy="70"
                        r="65"
                        stroke={COLORS.evergreen}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - setupProgress / 100)}`}
                        style={{ 
                          transition: 'stroke-dashoffset 0.5s ease',
                          strokeLinecap: 'round'
                        }}
                      />
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '2.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '1rem',
                    maxWidth: '600px'
                  }}>
                    {/* ✅ UPDATED: Conditional heading for offers */}
                    {isOfferRecommendation() ? 'AI is Optimizing Your Offer Settings' : 'AI is Optimizing Your Program'}
                  </h3>
                  
                  <p style={{
                    fontSize: '1.125rem',
                    color: COLORS.onyxMedium,
                    marginBottom: '3rem',
                    maxWidth: '700px',
                    lineHeight: 1.6
                  }}>
                    {/* ✅ UPDATED: Conditional description for offers */}
                    {isOfferRecommendation() ? 
                      'Marigold AI is analyzing your program and configuring the optimal offer based on member behavior patterns and prior program and offer performance.' :
                      'Our AI is analyzing your program and designing an optimization strategy based on member behavior patterns and performance data to enhance the member experience.'
                    }
                  </p>

                  {/* Current Step Indicator */}
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1.5rem 2rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                    maxWidth: '500px',
                    width: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: COLORS.evergreen,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.75rem'
                      }}>
                        <Settings size={12} color="white" style={{
                          animation: 'spin 2s linear infinite'
                        }} />
                      </div>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: COLORS.onyx
                      }}>
                        {setupSteps[Math.min(setupStep, setupSteps.length - 1)]}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${setupProgress}%`,
                        height: '100%',
                        backgroundColor: COLORS.evergreen,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium
                      }}>
                        Step {Math.min(setupStep + 1, setupSteps.length)} of {setupSteps.length}
                      </span>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: COLORS.evergreen
                      }}>
                        {Math.round(setupProgress)}%
                      </span>
                    </div>
                  </div>

                  {/* Processing Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    opacity: 0.7
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={16} color={COLORS.onyxMedium} />
                      <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Analysis</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={16} color={COLORS.onyxMedium} />
                      <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Segmentation</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TrendingUp size={16} color={COLORS.onyxMedium} />
                      <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>ROI Projection</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Review Phase - Implementation details content
                implementationData && (
                  <div>
                    {/* Problem & Solution Summary */}
                    <div style={{
                      backgroundColor: 'white',
                      borderLeft: `4px solid ${COLORS.evergreen}`,
                      padding: '2rem',
                      borderRadius: '0.75rem',
                      marginBottom: '2rem',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(26, 76, 73, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Target size={24} style={{ color: COLORS.evergreen }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: COLORS.onyx,
                            marginBottom: '1.5rem'
                          }}>
                            {/* ✅ UPDATED: Conditional heading for offers */}
                            {isOfferRecommendation() ? 'Objective: Health & Wellness Category Re-engagement' :
                             isAtRiskPunchCardRecommendation() ? 'Segment Optimization Strategy' : 
                             'Program Optimization Strategy'}
                          </h3>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                              <h4 style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: COLORS.blue,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: '0.5rem'
                              }}>
                                {/* ✅ UPDATED: Conditional section headers for offers */}
                                {isOfferRecommendation() ? '🎯 Tactic: Offer Discount to Incentivize Category Spend' : '🎯 Opportunity Identified'}
                              </h4>
                              <p style={{
                                fontSize: '1.125rem',
                                color: COLORS.onyx,
                                marginBottom: '0.75rem',
                                fontWeight: 600
                              }}>
                                {implementationData.problemSolved.issue}
                              </p>
                              <p style={{
                                fontSize: '0.875rem',
                                color: COLORS.onyxMedium,
                                lineHeight: 1.5
                              }}>
                                {implementationData.problemSolved.impact}
                              </p>
                            </div>
                            
                            <div>
                              <h4 style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: COLORS.green,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: '0.5rem'
                              }}>
                                {/* ✅ UPDATED: Conditional section headers for offers */}
                                {isOfferRecommendation() ? '✓ Expected Outcomes' : '✓ Enhancement Solution'}
                              </h4>
                              <p style={{
                                fontSize: '1.125rem',
                                color: COLORS.onyx,
                                marginBottom: '0.75rem',
                                fontWeight: 600
                              }}>
                                {implementationData.problemSolved.solution}
                              </p>
                              <p style={{
                                fontSize: '0.875rem',
                                color: COLORS.onyxMedium,
                                lineHeight: 1.5
                              }}>
                                {implementationData.problemSolved.outcome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Projected Impact Metrics */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem'
                        }}>
                          <TrendingUp size={24} style={{ color: COLORS.green }} />
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: COLORS.onyx,
                            margin: 0,
                            marginBottom: '0.25rem'
                          }}>
                            {isAtRiskPunchCardRecommendation() ? 'Projected Impact' : 
                             isOfferRecommendation() ? 'Projected Offer Performance' :
                             'Projected Enhancement Impact'}
                          </h3>
                          <p style={{
                            fontSize: '0.875rem',
                            color: COLORS.onyxMedium,
                            margin: 0
                          }}>
                            {isAtRiskPunchCardRecommendation() ? 'Based on AI analysis of similar recommendations' : 
                             isOfferRecommendation() ? 'Based on customer segment analysis and historical offer performance' :
                             'Based on AI analysis of similar optimization programs'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Primary Metrics */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                      }}>
                        {(isAtRiskPunchCardRecommendation() ? [
                          { 
                            label: 'Participating Members', 
                            value: implementationData.projectedMetrics.participantsRecovered,
                            subtext: `~${implementationData.projectedMetrics.responseRate} Estimated Response Rate`,
                            icon: Users,
                            color: COLORS.blue,
                            highlight: false
                          },
                          { 
                            label: 'Revenue Impact', 
                            value: implementationData.projectedMetrics.revenueRecovery,
                            subtext: 'Additional Revenue',
                            icon: DollarSign,
                            color: COLORS.green,
                            highlight: false
                          },
                          { 
                            label: 'Additional Purchases', 
                            value: `Estimate ${implementationData.projectedMetrics.additionalPurchases} additional purchases`,
                            subtext: 'Incremental Activity',
                            icon: ShoppingBag,
                            color: COLORS.evergreen,
                            highlight: true
                          },
                          { 
                            label: 'Average Order Value', 
                            value: `Estimate ${implementationData.projectedMetrics.averageOrderValue} AOV`,
                            subtext: 'Per Transaction',
                            icon: DollarSign,
                            color: COLORS.yellow,
                            highlight: false
                          }
                        ] : isOfferRecommendation() ? [
                          { 
                            label: 'Target Customers', 
                            value: implementationData.projectedMetrics.participantsRecovered,
                            subtext: 'High-value lapsed customers',
                            icon: Users,
                            color: COLORS.blue,
                            highlight: false
                          },
                          { 
                            label: 'Revenue Impact', 
                            value: implementationData.projectedMetrics.revenueRecovery,
                            subtext: 'Category recovery',
                            icon: DollarSign,
                            color: COLORS.green,
                            highlight: false
                          },
                          { 
                            label: 'Redemption Rate', 
                            value: implementationData.projectedMetrics.redemptionRate,
                            subtext: 'Estimated response',
                            icon: Target,
                            color: COLORS.evergreen,
                            highlight: true
                          },
                          { 
                            label: 'Program ROI', 
                            value: implementationData.projectedMetrics.programROI,
                            subtext: 'Return on investment',
                            icon: TrendingUp,
                            color: COLORS.yellow,
                            highlight: false
                          }
                        ] : [
                          { 
                            label: 'Members Affected', 
                            value: implementationData.projectedMetrics.participantsRecovered,
                            icon: Users,
                            color: COLORS.blue,
                            highlight: false
                          },
                          { 
                            label: 'Revenue Impact', 
                            value: implementationData.projectedMetrics.revenueRecovery,
                            icon: DollarSign,
                            color: COLORS.green,
                            highlight: false
                          },
                          { 
                            label: 'Program ROI', 
                            value: implementationData.projectedMetrics.programROI,
                            icon: TrendingUp,
                            color: COLORS.evergreen,
                            highlight: true
                          },
                          { 
                            label: 'Time to ROI', 
                            value: implementationData.projectedMetrics.timeToPositiveROI,
                            icon: Clock,
                            color: COLORS.yellow,
                            highlight: false
                          }
                        ]).map((metric, index) => (
                          <div key={index} style={{
                            textAlign: 'center',
                            padding: '1.5rem',
                            backgroundColor: metric.highlight ? 'rgba(26, 76, 73, 0.05)' : 'rgba(0,0,0,0.02)',
                            borderRadius: '0.75rem',
                            border: metric.highlight ? `2px solid ${COLORS.evergreen}` : 'none'
                          }}>
                            <div style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '50%',
                              backgroundColor: `${metric.color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 1rem'
                            }}>
                              <metric.icon size={28} color={metric.color} />
                            </div>
                            <div style={{
                              fontSize: metric.highlight ? '2rem' : '1.75rem',
                              fontWeight: 700,
                              color: metric.highlight ? COLORS.evergreen : COLORS.onyx,
                              marginBottom: '0.5rem'
                            }}>
                              {metric.value}
                            </div>
                            <div style={{
                              fontSize: '0.875rem',
                              color: COLORS.onyxMedium,
                              fontWeight: 500
                            }}>
                              {metric.label}
                            </div>
                            {metric.subtext && (
                              <div style={{
                                fontSize: '0.75rem',
                                color: COLORS.onyxMedium,
                                marginTop: '0.25rem'
                              }}>
                                {metric.subtext}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Secondary Metrics */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem'
                      }}>
                        {(isAtRiskPunchCardRecommendation() ? [
                          {
                            label: 'Recency Improvement',
                            value: implementationData.projectedMetrics.recencyImprovement,
                            change: 'improvement'
                          },
                          {
                            label: 'Frequency Improvement',
                            value: implementationData.projectedMetrics.frequencyImprovement,
                            change: 'improvement'
                          },
                          {
                            label: 'Monetary Improvement',
                            value: implementationData.projectedMetrics.monetaryImprovement,
                            change: 'improvement'
                          }
                        ] : isOfferRecommendation() ? [
                          {
                            label: 'Average Order Value',
                            value: implementationData.projectedMetrics.averageOrderValue,
                            change: 'average'
                          },
                          {
                            label: 'Category Engagement',
                            value: implementationData.projectedMetrics.categoryEngagementIncrease,
                            change: 'increase'
                          },
                          {
                            label: 'Total Discount Cost',
                            value: implementationData.projectedMetrics.totalDiscountCost,
                            change: 'investment'
                          }
                        ] : [
                          {
                            label: 'Member Satisfaction',
                            value: implementationData.projectedMetrics.customerSatisfactionIncrease,
                            change: 'increase'
                          },
                          {
                            label: 'Brand Sentiment (NPS)',
                            value: implementationData.projectedMetrics.npsImprovement || implementationData.projectedMetrics.brandSentimentImprovement,
                            change: 'improvement'
                          },
                          {
                            label: 'Member Retention',
                            value: implementationData.projectedMetrics.churnReduction || implementationData.projectedMetrics.retentionRateImprovement,
                            change: 'improvement'
                          }
                        ]).map((metric, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'rgba(76, 175, 80, 0.05)',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(76, 175, 80, 0.2)'
                          }}>
                            <span style={{
                              fontSize: '0.875rem',
                              color: COLORS.onyx,
                              fontWeight: 500
                            }}>
                              {metric.label}
                            </span>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}>
                              {metric.change !== 'investment' && metric.change !== 'average' && (
                                <ArrowUpRight size={16} style={{ color: COLORS.green }} />
                              )}
                              <span style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: COLORS.green
                              }}>
                                {metric.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Simplified Program Configuration Summary */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        padding: '1.5rem',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Award size={24} style={{ color: COLORS.evergreen, marginRight: '0.75rem' }} />
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: COLORS.onyx,
                            margin: 0
                          }}>
                            {isOfferRecommendation() ? 'Offer Configuration' : 'Enhancement Configuration'}
                          </h3>
                        </div>
                      </div>

                      <div style={{ padding: '2rem' }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '2rem',
                          marginBottom: '2rem'
                        }}>
                          <div>
                            <h4 style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: COLORS.onyxMedium,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: '1rem'
                            }}>
                              {isOfferRecommendation() ? 'Offer Details' : 'Program Details'}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: COLORS.onyxMedium, fontSize: '0.875rem' }}>Title:</span>
                                <span style={{ fontWeight: 600, color: COLORS.onyx, fontSize: '0.875rem' }}>{implementationData.title}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: COLORS.onyxMedium, fontSize: '0.875rem' }}>Type:</span>
                                <span style={{ fontWeight: 600, color: COLORS.onyx, fontSize: '0.875rem' }}>{implementationData.type}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: COLORS.onyxMedium, fontSize: '0.875rem' }}>Audience:</span>
                                <span style={{ fontWeight: 600, color: COLORS.onyx, fontSize: '0.875rem' }}>{implementationData.audience}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: COLORS.onyxMedium, fontSize: '0.875rem' }}>Duration:</span>
                                <span style={{ fontWeight: 600, color: COLORS.onyx, fontSize: '0.875rem' }}>
                                  {implementationData.startDate} to {implementationData.endDate}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: COLORS.onyxMedium,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: '1rem'
                            }}>
                              {isOfferRecommendation() ? 'Offer Description' : 'Enhancement Description'}
                            </h4>
                            <div style={{
                              padding: '1rem',
                              backgroundColor: 'rgba(26, 76, 73, 0.05)',
                              borderRadius: '0.5rem',
                              borderLeft: `3px solid ${COLORS.evergreen}`
                            }}>
                              <p style={{
                                fontSize: '0.875rem',
                                color: COLORS.onyx,
                                lineHeight: 1.6,
                                margin: 0
                              }}>
                                {implementationData.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Footer */}
          {currentPhase === 'review' && (
            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                maxWidth: '80rem',
                width: '100%',
                paddingLeft: '3rem',
                paddingRight: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMainModalClose();
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: COLORS.onyxMedium,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                    e.target.style.borderColor = 'rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                  }}
                >
                  Review Later
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: COLORS.onyxMedium,
                      marginBottom: '0.25rem'
                    }}>
                      {isAtRiskPunchCardRecommendation() ? 'Projected Revenue Impact' : 
                       isOfferRecommendation() ? 'Projected Revenue Impact' :
                       'Projected Program ROI'}
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: COLORS.green
                    }}>
                      {isAtRiskPunchCardRecommendation() ? 
                        implementationData?.projectedMetrics?.revenueRecovery : 
                        isOfferRecommendation() ?
                        implementationData?.projectedMetrics?.revenueRecovery :
                        implementationData?.projectedMetrics?.programROI}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Modify button clicked');
                      handleModifyRecommendation();
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      color: COLORS.evergreen,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      border: `1px solid ${COLORS.evergreen}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                    }}
                  >
                    <Edit size={16} />
                    Modify & Customize
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Implement enhancement button clicked');
                      handleCreateProgram();
                    }}
                    style={{
                      padding: '0.875rem 2rem',
                      borderRadius: '0.5rem',
                      backgroundColor: COLORS.evergreen,
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(26, 76, 73, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#155a56';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(26, 76, 73, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = COLORS.evergreen;
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(26, 76, 73, 0.3)';
                    }}
                  >
                    <CheckCircle size={16} />
                    {isOfferRecommendation() ? 'Create Offer' : 'Implement Enhancement'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CSS Styles */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          /* Force modify modal to appear on top */
          [data-modal-type="modify"] {
            z-index: 60000 !important;
          }
          
          [data-modal-type="modify"] * {
            z-index: inherit !important;
          }

          /* Force offer modal to appear on top */
          [data-modal-type="offer"] {
            z-index: 60000 !important;
          }
          
          [data-modal-type="offer"] * {
            z-index: inherit !important;
          }
        `}</style>
      </div>

      {/* Modify Modal with proper z-index stacking */}
      {showModifyModal && implementationData && (
        <div 
          data-modal-type="modify"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60000,
            pointerEvents: 'auto'
          }}
        >
          <FullScreenLoyaltyProgramModal
            isOpen={showModifyModal}
            onClose={handleModifyModalClose}
            onProgramCreated={handleProgramCreatedFromModify}
            onNotificationCreated={onNotificationCreated}
            prepopulatedData={implementationData}
            isModifyMode={true}
            style={{ zIndex: 60001 }}
          />
        </div>
      )}

      {/* Offer Creation Modal with proper z-index stacking */}
      {showOfferModal && implementationData && (
        <div 
          data-modal-type="offer"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60000,
            pointerEvents: 'auto'
          }}
        >
          <OfferCreationModal
            isOpen={showOfferModal}
            onClose={handleOfferModalClose}
            onOfferCreated={handleOfferCreatedFromModal}
            onNotificationCreated={onNotificationCreated}
            prepopulatedData={implementationData}
            isModifyMode={true}
            style={{ zIndex: 60001 }}
          />
        </div>
      )}
    </>
  );
};

export default RecommendationImplementationModal;
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

  const setupSteps = [
    'Analyzing recommendation requirements',
    'Identifying target member segments', 
    'Calculating implementation parameters',
    'Designing member communication strategy',
    'Projecting implementation timeline',
    'Finalizing program configuration'
  ];

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
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
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

  // Cleanup on unmount or close
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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
      data = generateTrailEssentialsOptimizationImplementation();
    } else if (isPotentialLoyalistsRecommendation()) {
      data = generatePotentialLoyalistsImplementation();
    } else if (recommendation.type === 'winback' || recommendation.segment === 'At Risk') {
      data = generateWinbackImplementation();
    } else if (recommendation.type === 'retention' || recommendation.segment === 'Potential Loyalists') {
      data = generateRetentionImplementation();
    } else if (recommendation.type === 'enhancement') {
      data = generateEnhancementImplementation();
    } else if (recommendation.type === 'targeting') {
      data = generateTargetingImplementation();
    } else if (recommendation.type === 'optimization') {
      data = generateOptimizationImplementation();
    } else if (recommendation.type === 'communication') {
      data = generateCommunicationImplementation();
    } else {
      data = generateDefaultImplementation();
    }
    
    console.log('Generated implementation data:', data);
    setImplementationData(data);
  };

  // Check if this is the At Risk punch card recommendation
  const isAtRiskPunchCardRecommendation = () => {
    return recommendation?.id === "rec-atrisk-punchcard" || 
           (recommendation?.title?.includes("At Risk") && recommendation?.title?.includes("Punch Card"));
  };

  // Check if this is the Trail Essentials recommendation
  const isTrailEssentialsRecommendation = () => {
    return recommendation?.id === "rec-trail-essentials-optimization" || 
           recommendation?.title?.includes("Trail Essentials");
  };

  // Check if this is the Potential Loyalists recommendation
  const isPotentialLoyalistsRecommendation = () => {
    return recommendation?.id === "rec-potential-punchcard" || 
           (recommendation?.title?.includes("Potential Loyalists") && recommendation?.title?.includes("Re-engagement"));
  };

  // At Risk Punch Card Implementation
  const generateAtRiskPunchCardImplementation = () => {
    return {
      title: "At Risk Customer Recovery Punch Card",
      type: "Member Winback Campaign",
      audience: "At Risk",
      description: "Deploy targeted 4-purchase punch card requiring weekly visits and minimum $10 per purchase. Rewards: 100 bonus points after 2 qualifying visits, $5 coupon after 4 visits. Designed to boost recency from quarterly+ to weekly engagement patterns and maintain frequency for R:2 F:3 customers.",
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '15',
      rules: [
        'Welcome back bonus: 200 points upon re-engagement',
        'Double points for first 30 days of activity',
        'Simplified 3-punch card system for quick wins',
        'Bonus multipliers for weekend activities'
      ],
      rewards: [
        'Immediate 20% discount on next purchase (100 points)',
        'Free gear maintenance service (300 points)',
        'Exclusive early access to sales (250 points)',
        'Personal gear consultation (400 points)',
        'Premium membership upgrade trial (500 points)'
      ],
      tiers: [
        { name: 'Reconnected', threshold: '0 points' },
        { name: 'Active', threshold: '500 points' },
        { name: 'Engaged', threshold: '1,200 points' }
      ],
      earningMechanics: [
        'Store visit: 50 points',
        'Purchase completion: 10 points per $1 spent',
        'Product review: 75 points',
        'Social media engagement: 25 points',
        'Friend referral: 200 points'
      ],
      programTouchpoints: [
        'Personalized "We miss you" email series',
        'SMS notifications for exclusive offers',
        'In-store welcome back recognition',
        'Mobile app push notifications',
        'Direct mail with special offers'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 18900) * 0.65).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 890000) * 0.35 / 1000)}K`,
        customerSatisfactionIncrease: '+35%',
        brandSentimentImprovement: '+28%',
        retentionRateImprovement: '+42%',
        programROI: '+285%',
        timeToPositiveROI: '6 weeks',
        churnReduction: '58%',
        npsImprovement: '+22 points'
      },
      problemSolved: {
        issue: 'Member Churn Risk Identified',
        impact: `${programData?.participants?.toLocaleString() || '18,900'} members showing disengagement patterns`,
        solution: 'AI-powered reactivation with personalized member journeys',
        outcome: 'Reduced churn and increased member lifetime value through targeted intervention'
      },
      implementationPlan: [
        {
          phase: 'Immediate Response (Days 1-7)',
          actions: [
            'Deploy personalized outreach campaigns',
            'Set up simplified earning mechanisms',
            'Create member recovery analytics dashboard',
            'Launch welcome back bonus program'
          ]
        },
        {
          phase: 'Engagement Building (Days 8-30)',
          actions: [
            'Implement double points promotion',
            'Launch 3-punch card quick wins',
            'Deploy social media engagement campaigns',
            'Monitor reactivation metrics'
          ]
        },
        {
          phase: 'Long-term Retention (Days 31-90)',
          actions: [
            'Transition to standard loyalty program',
            'Implement tier progression rewards',
            'Launch referral incentive programs',
            'Measure program effectiveness and ROI'
          ]
        }
      ]
    };
  };

  // Trail Essentials Optimization Implementation
  const generateTrailEssentialsOptimizationImplementation = () => {
    return {
      title: "Trail Essentials Punch Card Optimization",
      type: "Program Optimization",
      audience: "Trail Essentials Participants",
      description: "Trail Essentials Punch Card shows optimization opportunity with 10% completion rate. Program structure improvements using proven success models could unlock significant revenue potential while enhancing member experience.",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '12',
      rules: [
        'Optimize punch card mechanics based on Adventure Gear success model',
        'Implement milestone rewards at 25%, 50%, 75%, and 100% completion',
        'Add bonus multipliers for seasonal gear categories',
        'Create achievement badges for completion streaks'
      ],
      rewards: [
        'Trail mix sample pack (25% completion - 200 points)',
        'Gear maintenance workshop access (50% completion - 400 points)',
        'Exclusive trail guide downloads (75% completion - 600 points)',
        'Premium trail gear discount (100% completion - 1000 points)',
        'Trail community membership upgrade (streak rewards)'
      ],
      tiers: [
        { name: 'Trail Explorer', threshold: '500 points' },
        { name: 'Trail Expert', threshold: '2,000 points' },
        { name: 'Trail Master', threshold: '5,000 points' }
      ],
      earningMechanics: [
        'Trail gear purchase: 15 points per $1 spent',
        'Workshop attendance: 300 points',
        'Trail review submission: 150 points',
        'Seasonal challenge completion: 500 points',
        'Community engagement: 75 points per interaction'
      ],
      programTouchpoints: [
        'Enhanced mobile trail tracking app',
        'Weekly trail recommendations email',
        'In-store trail gear consultation',
        'Seasonal trail challenge campaigns',
        'Trail community events and meetups'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 12673) * 0.80).toLocaleString()}`,
        revenueRecovery: `$${Math.round(180000 / 1000)}K`,
        customerSatisfactionIncrease: '+45%',
        brandSentimentImprovement: '+38%',
        retentionRateImprovement: '+52%',
        programROI: '+320%',
        timeToPositiveROI: '8 weeks',
        churnReduction: '48%',
        npsImprovement: '+28 points'
      },
      problemSolved: {
        issue: 'Program Performance Enhancement Opportunity',
        impact: 'Trail Essentials showing 10% completion rate vs 48% benchmark',
        solution: 'Structure optimization using proven Adventure Gear success model',
        outcome: 'Improved completion rates and member satisfaction through enhanced program mechanics'
      },
      implementationPlan: [
        {
          phase: 'Analysis & Planning (Days 1-14)',
          actions: [
            'Conduct comprehensive program performance audit',
            'Benchmark against Adventure Gear success model',
            'Design optimized reward structure and mechanics',
            'Create enhanced member communication strategy'
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

  // Potential Loyalists Implementation
  const generatePotentialLoyalistsImplementation = () => {
    return {
      title: "Potential Loyalists Advancement Program",
      type: "Member Retention & Growth",
      audience: "Potential Loyalists",
      description: "Strategic retention program to convert Potential Loyalists into highly engaged advocates through enhanced benefits, community building, and exclusive experiences.",
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '10',
      rules: [
        'Enhanced earning rates for frequent purchasers',
        'Bonus points for community engagement',
        'Milestone rewards for program progression',
        'Exclusive access to member-only events'
      ],
      rewards: [
        'Priority customer service (200 points)',
        'Exclusive product previews (350 points)',
        'VIP event invitations (500 points)',
        'Personalized gear recommendations (150 points)',
        'Annual member appreciation gift (800 points)'
      ],
      tiers: [
        { name: 'Rising Star', threshold: '1,000 points' },
        { name: 'Trail Advocate', threshold: '3,000 points' },
        { name: 'Elite Explorer', threshold: '6,000 points' }
      ],
      earningMechanics: [
        'Purchase activity: 12 points per $1 spent',
        'Product reviews and ratings: 100 points',
        'Community forum participation: 50 points',
        'Event attendance: 150 points',
        'Social media sharing: 40 points'
      ],
      programTouchpoints: [
        'Monthly member spotlight features',
        'Exclusive member webinars and workshops',
        'Early access to seasonal sales',
        'Personalized adventure planning tools',
        'Community forum and discussion groups'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 37200) * 0.75).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 1240000) * 0.45 / 1000)}K`,
        customerSatisfactionIncrease: '+32%',
        brandSentimentImprovement: '+25%',
        retentionRateImprovement: '+38%',
        programROI: '+320%',
        timeToPositiveROI: '10 weeks',
        churnReduction: '52%',
        npsImprovement: '+25 points'
      },
      problemSolved: {
        issue: 'Member Progression Opportunity',
        impact: `${programData?.participants?.toLocaleString() || '37,200'} members ready for enhanced engagement`,
        solution: 'Advanced tier program with community focus and exclusive benefits',
        outcome: 'Increased member advocacy and higher lifetime value through enhanced engagement'
      },
      implementationPlan: [
        {
          phase: 'Analysis & Planning (Days 1-14)',
          actions: [
            'Conduct comprehensive member behavior analysis',
            'Design enhanced tier progression system',
            'Create community engagement platforms',
            'Set up exclusive event planning and execution'
          ]
        },
        {
          phase: 'Pilot Launch (Days 15-45)',
          actions: [
            'Launch enhanced program with select member group',
            'Monitor engagement and progression metrics',
            'Collect member feedback and satisfaction data',
            'Refine tier benefits based on member preferences'
          ]
        },
        {
          phase: 'Full Rollout (Days 46-120)',
          actions: [
            'Expand to all Potential Loyalists members',
            'Implement full community platform features',
            'Launch exclusive events and experiences',
            'Measure tier advancement and advocacy impact'
          ]
        }
      ]
    };
  };

  // Winback type implementation
  const generateWinbackImplementation = () => {
    return {
      title: `${programData?.audience || 'At Risk'} Reactivation Program`,
      type: 'Member Winback Campaign',
      audience: programData?.audience || 'At Risk Members',
      description: `Targeted reactivation program designed to re-engage ${programData?.audience || 'at-risk'} members through personalized incentives, simplified earning mechanisms, and enhanced member experience.`,
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '15',
      rules: [
        'Welcome back bonus: 200 points upon re-engagement',
        'Double points for first 30 days of activity',
        'Simplified 3-punch card system for quick wins',
        'Bonus multipliers for weekend activities'
      ],
      rewards: [
        'Immediate 20% discount on next purchase (100 points)',
        'Free gear maintenance service (300 points)',
        'Exclusive early access to sales (250 points)',
        'Personal gear consultation (400 points)',
        'Premium membership upgrade trial (500 points)'
      ],
      tiers: [
        { name: 'Reconnected', threshold: '0 points' },
        { name: 'Active', threshold: '500 points' },
        { name: 'Engaged', threshold: '1,200 points' }
      ],
      earningMechanics: [
        'Store visit: 50 points',
        'Purchase completion: 10 points per $1 spent',
        'Product review: 75 points',
        'Social media engagement: 25 points',
        'Friend referral: 200 points'
      ],
      programTouchpoints: [
        'Personalized "We miss you" email series',
        'SMS notifications for exclusive offers',
        'In-store welcome back recognition',
        'Mobile app push notifications',
        'Direct mail with special offers'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 18900) * 0.65).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 890000) * 0.35 / 1000)}K`,
        customerSatisfactionIncrease: '+35%',
        brandSentimentImprovement: '+28%',
        retentionRateImprovement: '+42%',
        programROI: '+285%',
        timeToPositiveROI: '6 weeks',
        churnReduction: '58%',
        npsImprovement: '+22 points'
      },
      problemSolved: {
        issue: 'Member Churn Risk Identified',
        impact: `${programData?.participants?.toLocaleString() || '18,900'} members showing disengagement patterns`,
        solution: 'AI-powered reactivation with personalized member journeys',
        outcome: 'Reduced churn and increased member lifetime value through targeted intervention'
      },
      implementationPlan: [
        {
          phase: 'Immediate Response (Days 1-7)',
          actions: [
            'Deploy personalized outreach campaigns',
            'Set up simplified earning mechanisms',
            'Create member recovery analytics dashboard',
            'Launch welcome back bonus program'
          ]
        },
        {
          phase: 'Engagement Building (Days 8-30)',
          actions: [
            'Implement double points promotion',
            'Launch 3-punch card quick wins',
            'Deploy social media engagement campaigns',
            'Monitor reactivation metrics'
          ]
        },
        {
          phase: 'Long-term Retention (Days 31-90)',
          actions: [
            'Transition to standard loyalty program',
            'Implement tier progression rewards',
            'Launch referral incentive programs',
            'Measure program effectiveness and ROI'
          ]
        }
      ]
    };
  };

  // Retention type implementation
  const generateRetentionImplementation = () => {
    return {
      title: `${programData?.audience || 'Potential Loyalists'} Advancement Program`,
      type: 'Member Retention & Growth',
      audience: programData?.audience || 'Potential Loyalists',
      description: `Strategic retention program to convert ${programData?.audience || 'potential loyalists'} into highly engaged advocates through enhanced benefits, community building, and exclusive experiences.`,
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pointsValue: '10',
      rules: [
        'Enhanced earning rates for frequent purchasers',
        'Bonus points for community engagement',
        'Milestone rewards for program progression',
        'Exclusive access to member-only events'
      ],
      rewards: [
        'Priority customer service (200 points)',
        'Exclusive product previews (350 points)',
        'VIP event invitations (500 points)',
        'Personalized gear recommendations (150 points)',
        'Annual member appreciation gift (800 points)'
      ],
      tiers: [
        { name: 'Rising Star', threshold: '1,000 points' },
        { name: 'Trail Advocate', threshold: '3,000 points' },
        { name: 'Elite Explorer', threshold: '6,000 points' }
      ],
      earningMechanics: [
        'Purchase activity: 12 points per $1 spent',
        'Product reviews and ratings: 100 points',
        'Community forum participation: 50 points',
        'Event attendance: 150 points',
        'Social media sharing: 40 points'
      ],
      programTouchpoints: [
        'Monthly member spotlight features',
        'Exclusive member webinars and workshops',
        'Early access to seasonal sales',
        'Personalized adventure planning tools',
        'Community forum and discussion groups'
      ],
      projectedMetrics: {
        participantsRecovered: `${Math.round((programData?.participants || 37200) * 0.75).toLocaleString()}`,
        revenueRecovery: `$${Math.round((programData?.revenue || 1240000) * 0.45 / 1000)}K`,
        customerSatisfactionIncrease: '+32%',
        brandSentimentImprovement: '+25%',
        retentionRateImprovement: '+38%',
        programROI: '+320%',
        timeToPositiveROI: '10 weeks',
        churnReduction: '52%',
        npsImprovement: '+25 points'
      },
      problemSolved: {
        issue: 'Member Progression Opportunity',
        impact: `${programData?.participants?.toLocaleString() || '37,200'} members ready for enhanced engagement`,
        solution: 'Advanced tier program with community focus and exclusive benefits',
        outcome: 'Increased member advocacy and higher lifetime value through enhanced engagement'
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
            'Measure long-term impact and optimization results'
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

  // Handle implementation with full program creation
  const handleImplementRecommendation = () => {
    if (!implementationData) {
      console.error('No implementation data available');
      return;
    }

    console.log('Implementing recommendation with data:', implementationData);

    // Create a complete program object with all necessary fields
    const newProgram = {
      id: `rec-impl-${Date.now()}`,
      title: implementationData.title,
      type: implementationData.type,
      description: implementationData.description,
      audience: implementationData.audience,
      status: 'Scheduled',
      startDate: implementationData.startDate,
      endDate: implementationData.endDate,
      pointsValue: implementationData.pointsValue,
      rules: implementationData.rules,
      rewards: implementationData.rewards,
      tiers: implementationData.tiers || [],
      earningMechanics: implementationData.earningMechanics || [],
      programTouchpoints: implementationData.programTouchpoints || [],
      projectedMetrics: implementationData.projectedMetrics || {},
      problemSolved: implementationData.problemSolved || {},
      implementationPlan: implementationData.implementationPlan || [],
      category: recommendation?.category || 'loyalty',
      priority: recommendation?.impact === 'high' ? 'High' : 'Medium',
      budget: `$${Math.round(Math.random() * 50000 + 10000).toLocaleString()}`,
      expectedROI: implementationData.projectedMetrics?.programROI || '+200%',
      targetAudience: implementationData.audience,
      kpiTargets: [
        `Increase retention by ${implementationData.projectedMetrics?.retentionRateImprovement || '30%'}`,
        `Achieve ${implementationData.projectedMetrics?.programROI || '200%'} ROI`,
        `Recover ${implementationData.projectedMetrics?.participantsRecovered || '1,000'} members`
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastModified: new Date().toLocaleDateString(),
      createdBy: 'AI Recommendation Engine',
      phase: 'Implementation',
      progress: 0,
      status: 'Scheduled',
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

  // Handle modify action with proper backdrop management
  const handleModifyRecommendation = () => {
    console.log('Opening modify modal with implementation data:', implementationData);
    
    if (implementationData) {
      // Manage body scroll and backdrop interactions
      document.body.style.overflow = 'hidden';
      setShowModifyModal(true);
    }
  };

  // Handle modify modal close with proper cleanup
  const handleModifyModalClose = () => {
    console.log('Modify modal closed');
    setShowModifyModal(false);
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
    
    // Close implementation modal
    setShowModifyModal(false);
    document.body.style.overflow = 'unset';
    onClose();
  };

  // Handle main modal close with proper cleanup
  const handleMainModalClose = () => {
    console.log('Closing recommendation modal');
    
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
      {/* ✅ FIXED: Dynamic z-index and backdrop management - UPDATED z-index values */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: showModifyModal ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.8)',
          zIndex: 100010, // ✅ FIXED: Updated from 10000 to 100010 (higher than RFM modal's 100001)
          backdropFilter: 'blur(4px)',
          opacity: showModifyModal ? 0.5 : 1,
          pointerEvents: showModifyModal ? 'none' : 'auto'
        }}
        onClick={showModifyModal ? undefined : handleMainModalClose}
      />
      
      {/* ✅ FIXED: Modal content with updated z-index */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f7f8',
          zIndex: 100011, // ✅ FIXED: Updated from 10001 to 100011 (higher than backdrop)
          display: 'flex',
          flexDirection: 'column',
          filter: showModifyModal ? 'blur(2px)' : 'none',
          pointerEvents: showModifyModal ? 'none' : 'auto'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 100012 // ✅ FIXED: Updated z-index for header
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: COLORS.green,
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: currentPhase === 'setup' ? 'pulse 2s infinite' : 'none'
            }}>
              {currentPhase === 'setup' ? (
                <Zap size={20} color="white" />
              ) : (
                <CheckCircle size={20} color="white" />
              )}
            </div>
            
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: COLORS.onyx,
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                {currentPhase === 'setup' ? 'Preparing Enhancement...' : 'Enhancement Ready'}
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: COLORS.onyxMedium,
                margin: 0
              }}>
                {currentPhase === 'setup' 
                  ? `Analyzing ${recommendation?.title || 'recommendation'} requirements` 
                  : `${recommendation?.title || 'Recommendation'} implementation configured`
                }
              </p>
            </div>
          </div>
          
          <button
            onClick={handleMainModalClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              color: COLORS.onyxMedium,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              e.target.style.color = COLORS.onyx;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = COLORS.onyxMedium;
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '60rem', width: '100%' }}>
            
            {/* Setup Phase */}
            {currentPhase === 'setup' && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '8rem',
                  height: '8rem',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  marginBottom: '2rem',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  <Brain size={40} color={COLORS.blue} style={{ animation: 'spin 4s linear infinite' }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: COLORS.onyx,
                  marginBottom: '1rem'
                }}>
                  AI Enhancement Engine Active
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: COLORS.onyxMedium,
                  marginBottom: '2rem',
                  maxWidth: '32rem',
                  lineHeight: 1.6
                }}>
                  {setupSteps[setupStep] || 'Preparing enhancement configuration...'}
                </p>
                
                {/* Progress Bar */}
                <div style={{
                  width: '24rem',
                  height: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.25rem',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${setupProgress}%`,
                    height: '100%',
                    backgroundColor: COLORS.green,
                    borderRadius: '0.25rem',
                    transition: 'width 0.8s ease'
                  }} />
                </div>
                
                <div style={{
                  fontSize: '0.875rem',
                  color: COLORS.onyxMedium
                }}>
                  {Math.round(setupProgress)}% Complete
                </div>
              </div>
            )}

            {/* Review Phase */}
            {currentPhase === 'review' && implementationData && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Header Section */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'rgba(26, 76, 73, 0.1)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Lightbulb size={20} color={COLORS.evergreen} />
                    </div>
                    
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: COLORS.onyx,
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {implementationData.title}
                      </h3>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'rgba(26, 76, 73, 0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: COLORS.evergreen,
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em'
                      }}>
                        <Sparkles size={12} />
                        {implementationData.type}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: COLORS.onyxMedium,
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {implementationData.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <TrendingUp size={18} color={COLORS.green} />
                    Projected Impact Metrics
                  </h3>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '1.5rem' 
                  }}>
                    {[
                      { 
                        label: 'Members Recovered', 
                        value: implementationData.projectedMetrics.participantsRecovered,
                        icon: Users,
                        color: COLORS.blue
                      },
                      { 
                        label: 'Revenue Recovery', 
                        value: implementationData.projectedMetrics.revenueRecovery,
                        icon: DollarSign,
                        color: COLORS.green
                      },
                      { 
                        label: 'ROI Improvement', 
                        value: implementationData.projectedMetrics.programROI,
                        icon: TrendingUp,
                        color: COLORS.evergreen
                      },
                      { 
                        label: 'Time to Positive ROI', 
                        value: implementationData.projectedMetrics.timeToPositiveROI,
                        icon: Clock,
                        color: COLORS.orange
                      }
                    ].map((metric, index) => (
                      <div key={index} style={{
                        textAlign: 'center',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}>
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: `${metric.color}15`,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 0.75rem'
                        }}>
                          <metric.icon size={16} color={metric.color} />
                        </div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: COLORS.onyx,
                          marginBottom: '0.25rem'
                        }}>
                          {metric.value}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: COLORS.onyxMedium,
                          fontWeight: 500
                        }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem & Solution Section */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Target size={18} color={COLORS.blue} />
                    {recommendation?.segment ? 'Segment Optimization Strategy' : 'Program Optimization Strategy'}
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
                        🎯 Opportunity Identified
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
                        ✓ Enhancement Solution
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

                {/* Action Buttons */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={handleModifyRecommendation}
                    style={{
                      padding: '0.875rem 1.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      color: COLORS.onyx,
                      border: `2px solid ${COLORS.onyxLight}`,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = COLORS.onyx;
                      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = COLORS.onyxLight;
                      e.target.style.backgroundColor = 'white';
                    }}
                  >
                    <Edit size={16} />
                    Customize Enhancement
                  </button>
                  
                  <button
                    onClick={handleImplementRecommendation}
                    style={{
                      padding: '0.875rem 2rem',
                      borderRadius: '0.5rem',
                      backgroundColor: COLORS.evergreen,
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
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
                    Implement Enhancement
                  </button>
                </div>
              </div>
            )}
          </div>
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
        `}</style>
      </div>

      {/* ✅ FIXED: Modify Modal with proper z-index stacking (even higher than implementation modal) */}
      {showModifyModal && implementationData && (
        <FullScreenLoyaltyProgramModal
          isOpen={showModifyModal}
          onClose={handleModifyModalClose}
          onProgramCreated={handleProgramCreatedFromModify}
          onNotificationCreated={onNotificationCreated}
          prepopulatedData={implementationData}
          isModifyMode={true}
          style={{ zIndex: 100020 }} // ✅ FIXED: Highest z-index for modify modal
        />
      )}
    </>
  );
};

export default RecommendationImplementationModal;
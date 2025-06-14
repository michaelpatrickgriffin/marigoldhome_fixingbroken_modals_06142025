// src/components/loyalty/FullScreenLoyaltyProgramModal.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronRight, Target, Users, Gift, Award, 
  Zap, Tag, Calendar, Star, Settings, CheckCircle, 
  ShoppingBag, Mail, MessageSquare, Bell, Check,
  CreditCard, Percent, ArrowUpRight, BarChart2, Globe,
  Plus, Smartphone, Clock, DollarSign, TrendingUp,
  Brain, Lightbulb, AlertCircle, Eye, EyeOff, Sparkles
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const FullScreenLoyaltyProgramModal = ({ 
  isOpen, 
  onClose, 
  onProgramCreated, 
  onNotificationCreated,
  prepopulatedData = null,
  isModifyMode = false
}) => {
  const [step, setStep] = useState(1);
  const contentRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set());
  
  // Track the current recommendation to detect changes
  const [currentRecommendationId, setCurrentRecommendationId] = useState(null);
  
  const [programData, setProgramData] = useState({
    title: '',
    description: '',
    type: '',
    audience: '',
    startDate: '',
    endDate: '',
    pointsValue: '',
    rules: [],
    rewards: [],
    tiers: [],
    earningMechanics: [],
    programTouchpoints: [],
    // Punch card specific fields
    isPunchCard: false,
    requiredPunches: '',
    prize1: '',
    prize1Threshold: '',
    prize2: '',
    prize2Threshold: ''
  });
  
  // States for AI insights and predictions
  const [aiInsights, setAiInsights] = useState({});
  const [predictiveMetrics, setPredictiveMetrics] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Detect if this is an At Risk Punch Card recommendation
  const isAtRiskPunchCard = () => {
    return (
      prepopulatedData && (
        (prepopulatedData.title && prepopulatedData.title.toLowerCase().includes('at risk')) ||
        (prepopulatedData.audience && prepopulatedData.audience.toLowerCase().includes('at risk')) ||
        (prepopulatedData.type && prepopulatedData.type.includes('Segment Enhancement')) ||
        (prepopulatedData.description && prepopulatedData.description.toLowerCase().includes('punch card'))
      )
    );
  };

  // Generate a unique identifier for the current recommendation context
  const getRecommendationId = () => {
    if (!prepopulatedData) return 'default';
    return `${prepopulatedData.title || 'untitled'}-${prepopulatedData.type || 'unknown'}-${prepopulatedData.audience || 'all'}`;
  };

  // Data mapping functions for prepopulated data (keeping existing logic)
  const mapImplementationTypeToWizardType = (implementationType) => {
    // Special handling for At Risk punch card
    if (isAtRiskPunchCard()) {
      return 'Boost RFM Factors';
    }
    
    const typeMap = {
      'Crisis Recovery': 'Acquisition',
      'Program Enhancement': 'Engagement', 
      'Targeted Campaign': 'Acquisition',
      'Program Optimization': 'Points Promotion',
      'Communication Strategy': 'Engagement',
      'Program Crisis': 'Acquisition',
      'Recovery Program': 'Acquisition',
      'Segment Enhancement': 'Boost RFM Factors'
    };
    return typeMap[implementationType] || 'Points Promotion';
  };

  const parseRewardsFromImplementationData = (rewards) => {
    if (!Array.isArray(rewards)) return [];
    
    return rewards.map(reward => {
      if (typeof reward === 'string') {
        const match = reward.match(/^(.+?)\s*\((\d+)\s*points?\)$/i);
        if (match) {
          return `${match[1].trim()} (${match[2]} points)`;
        }
        return reward;
      }
      return reward;
    });
  };

  const mapImplementationAudienceToWizardAudience = (audience) => {
    // Special handling for At Risk punch card
    if (isAtRiskPunchCard()) {
      return 'At Risk';
    }
    
    const audienceMap = {
      'Trail Essentials Participants': 'Explorer Tier',
      'High-Value Member Segments': 'Trailblazer & Summit',
      'All Members': 'All Members',
      'New Members': 'New Members',
      'Best Customers': 'Trailblazer & Summit',
      'Explorer Tier': 'Explorer Tier',
      'Trailblazer & Summit': 'Trailblazer & Summit',
      '1+ Year Members': '1+ Year Members',
      'At Risk Segment': 'At Risk'
    };
    return audienceMap[audience] || 'All Members';
  };

  // Reset modal when opened and handle prepopulated data
  useEffect(() => {
    if (isOpen) {
      const newRecommendationId = getRecommendationId();
      const isNewRecommendation = newRecommendationId !== currentRecommendationId;
      
      // Always reset these states
      setStep(1);
      setAiInsights({});
      setPredictiveMetrics(null);
      setIsAnalyzing(false);
      setShowPreview(false);
      
      // Only reset applied suggestions if this is a different recommendation
      if (isNewRecommendation) {
        console.log('New recommendation detected, resetting applied suggestions');
        setAppliedSuggestions(new Set());
        setCurrentRecommendationId(newRecommendationId);
      } else {
        console.log('Same recommendation, preserving applied suggestions state');
      }
      
      if (prepopulatedData && isModifyMode) {
        console.log('Prepopulating wizard with implementation data:', prepopulatedData);
        
        const mappedData = {
          title: isAtRiskPunchCard() ? 'At Risk Segment Optimization' : (prepopulatedData.title || ''),
          description: isAtRiskPunchCard() ? 'Optimization to improve member experience and engagement through data driven enhancements, simplified progress paths, and enhanced value communication.' : (prepopulatedData.description || ''),
          type: mapImplementationTypeToWizardType(prepopulatedData.type || ''),
          audience: mapImplementationAudienceToWizardAudience(prepopulatedData.audience || ''),
          startDate: isAtRiskPunchCard() ? '2025-06-15' : (prepopulatedData.startDate || ''),
          endDate: isAtRiskPunchCard() ? '2025-07-15' : (prepopulatedData.endDate || ''),
          pointsValue: isAtRiskPunchCard() ? '' : (prepopulatedData.pointsValue || ''),
          rules: Array.isArray(prepopulatedData.rules) ? prepopulatedData.rules : [],
          rewards: parseRewardsFromImplementationData(prepopulatedData.rewards || []),
          tiers: Array.isArray(prepopulatedData.tiers) ? prepopulatedData.tiers : [],
          earningMechanics: Array.isArray(prepopulatedData.earningMechanics) ? prepopulatedData.earningMechanics : [],
          programTouchpoints: Array.isArray(prepopulatedData.programTouchpoints) ? prepopulatedData.programTouchpoints : [],
          // Punch card specific fields
          isPunchCard: isAtRiskPunchCard(),
          requiredPunches: isAtRiskPunchCard() ? '4' : '',
          prize1: isAtRiskPunchCard() ? '100 points' : '',
          prize1Threshold: isAtRiskPunchCard() ? '2' : '',
          prize2: isAtRiskPunchCard() ? '$5 off coupon' : '',
          prize2Threshold: isAtRiskPunchCard() ? '4' : ''
        };
        
        setProgramData(mappedData);
      } else {
        setProgramData({
          title: '',
          description: '',
          type: '',
          audience: '',
          startDate: '',
          endDate: '',
          pointsValue: '',
          rules: [],
          rewards: [],
          tiers: [],
          earningMechanics: [],
          programTouchpoints: [],
          isPunchCard: false,
          requiredPunches: '',
          prize1: '',
          prize1Threshold: '',
          prize2: '',
          prize2Threshold: ''
        });
      }
    }
  }, [isOpen, prepopulatedData, isModifyMode]);

  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [step]);

  // Generate AI insights when key data changes
  useEffect(() => {
    if (isOpen && programData.type && programData.audience && programData.title) {
      setIsAnalyzing(true);
      setTimeout(() => {
        generateAiInsights();
        setIsAnalyzing(false);
      }, 800);
    }
  }, [isOpen, programData.type, programData.audience, programData.title]);

  // Update program data
  const updateProgramData = (field, value) => {
    setProgramData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-detect punch card mode for "Boost RFM Factors" type
      if (field === 'type' && value === 'Boost RFM Factors') {
        newData.isPunchCard = true;
      } else if (field === 'type' && value !== 'Boost RFM Factors') {
        newData.isPunchCard = false;
      }
      
      return newData;
    });
  };
  
  // Toggle array item selection
  const toggleArrayItem = (field, item) => {
    setProgramData(prev => {
      const currentItems = prev[field] || [];
      if (currentItems.includes(item)) {
        return { ...prev, [field]: currentItems.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...currentItems, item] };
      }
    });
  };
  
  // Add a new tier
  const addTier = (tier) => {
    setProgramData(prev => ({
      ...prev,
      tiers: [...prev.tiers, tier]
    }));
  };
  
  // Remove a tier
  const removeTier = (index) => {
    setProgramData(prev => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== index)
    }));
  };

  // Apply AI suggestion with persistent feedback (FIXED: removed automatic timeout)
  const applySuggestion = (suggestionId, updates) => {
    console.log('Applying suggestion:', suggestionId, updates);
    setProgramData(prev => ({ ...prev, ...updates }));
    setAppliedSuggestions(prev => new Set([...prev, suggestionId]));
    
    // REMOVED: No longer automatically remove applied feedback after timeout
    // The applied state will persist until the user enters with a different recommendation
  };
  
  // Enhanced AI insights generation
  const generateAiInsights = () => {
    let newInsights = { ...aiInsights };
    
    if (programData.type) {
      switch (programData.type) {
        case 'Boost RFM Factors':
          newInsights.program = {
            id: 'program-suggestion-rfm',
            title: "At Risk Segment Re-Engagement June 2025",
            description: "Boost recency and frequency for At Risk segment, June 2025",
            successMetrics: "Punch card response rate, and changes to Recency, Frequency and Monetary factors for the At Risk Segment",
            bestPractices: [
              "Set up multi-step punch card with multiple reward levels",
              "Use a mix of metric and discount rewards, and a set minimum purchase level at or slightly lower than customer AOV to boost response rates",
              "Require weekly purchases to boost frequency"
            ]
          };
          break;
        case 'Points Promotion':
          newInsights.program = {
            id: 'program-suggestion-1',
            title: "Summit Rewards",
            description: "Earn points on every purchase and redeem for exclusive outdoor gear and experiences.",
            pointsStructure: "Recommend 10 points per $1 for simplicity and perceived value.",
            successMetrics: "Programs with this structure typically see 24% increase in repeat purchase rate.",
            bestPractices: [
              "Keep point values simple and easy to calculate",
              "Offer redemption options starting at 100-200 points",
              "Provide bonus point opportunities during key seasons"
            ]
          };
          break;
        case 'Tiered Rewards':
          newInsights.program = {
            id: 'program-suggestion-2',
            title: "Alpine Status",
            description: "Earn status levels through purchases and engagement to unlock increasingly valuable rewards and exclusive experiences.",
            tierStructure: "Recommend 3 tiers: Explorer, Trailblazer, and Summit with clearly differentiated benefits.",
            successMetrics: "Tiered programs drive 36% higher spending among top-tier members.",
            bestPractices: [
              "Create aspirational but achievable tier thresholds",
              "Offer exclusive experiences, not just discounts",
              "Provide clear progression visibility"
            ]
          };
          break;
        case 'Lifecycle':
          newInsights.program = {
            id: 'program-suggestion-3',
            title: "Adventure Journey",
            description: "Tailored rewards and experiences based on your relationship stage with our outdoor community.",
            tierStructure: "Recommend journey-based progression: New Explorer → Seasoned Adventurer → Outdoor Expert.",
            successMetrics: "Lifecycle programs improve member retention by 45% through relevant experiences.",
            bestPractices: [
              "Align rewards with customer lifecycle stage",
              "Provide educational content and experiences",
              "Focus on building long-term relationships"
            ]
          };
          break;
        case 'Acquisition':
          newInsights.program = {
            id: 'program-suggestion-4',
            title: "Trail Recovery Initiative",
            description: "Strategic program designed to recover and retain customers through enhanced value and transparent communication.",
            tierStructure: "Focus on immediate value delivery and trust rebuilding through premium incentives.",
            successMetrics: "Acquisition programs can recover 65% of at-risk customers with proper implementation.",
            bestPractices: [
              "Provide immediate, tangible value",
              "Communicate transparently about program changes",
              "Focus on rebuilding trust through premium experiences"
            ]
          };
          break;
        case 'Engagement':
          newInsights.program = {
            id: 'program-suggestion-5',
            title: "Adventure Engagement Hub",
            description: "Dynamic program focused on increasing customer interaction through personalized experiences and community building.",
            tierStructure: "Activity-based progression with social recognition and exclusive community access.",
            successMetrics: "Engagement programs typically increase member activity by 40% and retention by 28%.",
            bestPractices: [
              "Create multiple engagement touchpoints",
              "Reward both individual and community participation",
              "Provide clear activity-to-reward pathways"
            ]
          };
          break;
      }
      
      // Generate predictive metrics
      setPredictiveMetrics({
        estimatedEngagement: Math.round(20 + Math.random() * 25),
        estimatedRetention: Math.round(25 + Math.random() * 20),
        estimatedAOV: Math.round(10 + Math.random() * 25),
        estimatedROI: Math.round(150 + Math.random() * 100)
      });
    }

    // Audience insights with suggestion IDs
    if (programData.audience) {
      switch (programData.audience) {
        case 'At Risk':
          newInsights.audience = {
            id: 'audience-suggestion-atrisk',
            insight: "At Risk segment members have declining recency and frequency but maintain high monetary value. Targeted re-engagement is critical to prevent churn.",
            recommendation: "Use time-sensitive, high-value incentives to drive immediate action and rebuild engagement patterns.",
            impact: "At Risk recovery programs typically achieve 40% response rates and recover 65% of declining customers when properly targeted.",
            tips: [
              "Create urgency with limited-time offers",
              "Use minimum purchase thresholds close to their historical AOV",
              "Implement weekly frequency requirements to rebuild habits"
            ]
          };
          break;
        case 'All Members':
          newInsights.audience = {
            id: 'audience-suggestion-1',
            insight: "Broad programs yield higher enrollment but lower engagement. Consider segment-specific rewards within the program.",
            recommendation: "Use this approach if growing your loyalty database is the primary goal.",
            impact: "All-member programs typically see 15% higher enrollment but 10% lower per-member engagement.",
            tips: [
              "Include options for different experience levels",
              "Offer diverse reward categories",
              "Use progressive engagement strategies"
            ]
          };
          break;
        case 'Trailblazer & Summit':
          newInsights.audience = {
            id: 'audience-suggestion-2',
            insight: "Focusing on top customers delivers higher ROI and creates aspirational value for other segments.",
            recommendation: "Use VIP-only benefits that emphasize exclusivity and recognition.",
            impact: "VIP programs typically generate 35% higher spend from top customers and improve retention by 28%.",
            tips: [
              "Emphasize exclusive access and experiences",
              "Provide dedicated customer service",
              "Create community among top customers"
            ]
          };
          break;
        case 'New Members':
          newInsights.audience = {
            id: 'audience-suggestion-3',
            insight: "New member programs should focus on education, engagement, and early wins to build loyalty habits.",
            recommendation: "Provide quick early rewards and educational content about your brand and products.",
            impact: "Effective onboarding programs increase 90-day retention by 55% and lifetime value by 30%.",
            tips: [
              "Offer immediate welcome rewards",
              "Include educational content and tips",
              "Set achievable early milestones"
            ]
          };
          break;
        case 'Explorer Tier':
          newInsights.audience = {
            id: 'audience-suggestion-4',
            insight: "Explorer tier members need encouragement and clear progression paths to higher engagement levels.",
            recommendation: "Focus on education, easy wins, and clear advancement opportunities to build loyalty habits.",
            impact: "Explorer-focused programs can increase tier progression by 45% and overall engagement by 32%.",
            tips: [
              "Provide clear progression milestones",
              "Offer educational content and guidance",
              "Create achievable short-term goals"
            ]
          };
          break;
      }
    }

    // Points value insights with suggestion IDs (skip for punch cards)
    if (programData.pointsValue && !programData.isPunchCard) {
      const pointVal = parseFloat(programData.pointsValue);
      if (!isNaN(pointVal)) {
        if (pointVal >= 5 && pointVal <= 15) {
          newInsights.points = {
            id: 'points-suggestion-1',
            insight: "This point-to-dollar ratio balances perceived value with program costs effectively.",
            recommendation: "Display point balances prominently in all customer communications and show clear redemption paths.",
            impact: "Clear point values improve redemption rates by 18-24% and increase program engagement.",
            optimization: "Consider bonus point multipliers during key promotional periods to drive specific behaviors."
          };
        } else if (pointVal < 5) {
          newInsights.points = {
            id: 'points-suggestion-2',
            insight: "Lower point values may reduce perceived program value but can improve program economics.",
            recommendation: "Compensate with frequent bonus opportunities and clear value communication.",
            impact: "Programs with lower point values may see 15% lower initial engagement but better long-term profitability.",
            optimization: "Focus on experience-based rewards rather than just monetary value."
          };
        } else {
          newInsights.points = {
            id: 'points-suggestion-3',
            insight: "Higher point values create strong perceived value but require careful cost management.",
            recommendation: "Ensure redemption thresholds and reward costs align with business margins.",
            impact: "High point values can drive 22% higher enrollment but may impact overall program ROI.",
            optimization: "Use tiered redemption levels to balance high-value perception with cost control."
          };
        }
      }
    }
    
    setAiInsights(newInsights);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    const programToCreate = {
      ...programData,
      id: Date.now(),
      status: programData.startDate && programData.endDate ? 'Scheduled' : 'Draft',
      participants: 0,
      pointsIssued: 0,
      redemptions: 0,
      revenue: 0,
      cost: 0,
      roi: 0,
      needsAttention: false,
      recommendations: [],
      isModified: isModifyMode
    };
    
    console.log('Creating/modifying loyalty program:', programToCreate);
    
    if (onProgramCreated) {
      onProgramCreated(programToCreate);
    }
    
    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'event',
        title: `Loyalty Program ${isModifyMode ? 'Modified' : 'Created'}: ${programToCreate.title || 'New Program'}`,
        message: `${programToCreate.type} loyalty program has been ${programToCreate.status === 'Scheduled' ? 'scheduled' : isModifyMode ? 'updated' : 'created as draft'}.`,
        time: 'Just now',
        icon: 'Award',
        color: COLORS.green,
        priority: 'medium'
      };
      onNotificationCreated(notification);
    }
    
    onClose();
  };

  // Step validation
  const isStepValid = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return programData.title && programData.type && programData.audience;
      case 2:
        if (programData.isPunchCard) {
          return programData.requiredPunches && programData.prize1 && programData.prize2;
        }
        return programData.pointsValue || programData.tiers.length > 0;
      case 3:
        return programData.earningMechanics.length > 0 || programData.rules.length > 0;
      case 4:
        return programData.rewards.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  // Navigation handler with validation and punch card skipping
  const handleStepChange = (newStep) => {
    if (newStep > step && !isStepValid(step)) {
      return;
    }
    
    // For punch cards, skip steps 3 and 4
    if (programData.isPunchCard) {
      if (step === 2 && newStep === 3) {
        setStep(5); // Skip to review
        return;
      }
      if (step === 5 && newStep === 4) {
        setStep(2); // Go back to structure
        return;
      }
    }
    
    setStep(newStep);
  };

  // Style objects for reuse
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10500,
      backdropFilter: 'blur(4px)'
    },
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 10501,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.02) 100%)'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: COLORS.onyx,
      margin: 0
    },
    closeButton: {
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
    },
    stepsContainer: {
      padding: '1rem 1.5rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      gap: '0.25rem',
      backgroundColor: '#fafbfc',
      overflowX: 'auto'
    },
    stepItem: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      minWidth: 'fit-content',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s ease',
      cursor: 'default'
    },
    stepItemCompleted: {
      cursor: 'pointer'
    },
    stepIcon: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '1rem',
      flexShrink: 0,
      transition: 'all 0.2s ease'
    },
    stepIconCurrent: {
      backgroundColor: COLORS.evergreen,
      color: 'white',
      boxShadow: '0 2px 8px rgba(26, 76, 73, 0.3)'
    },
    stepIconCompleted: {
      backgroundColor: 'rgba(26, 76, 73, 0.1)',
      color: COLORS.evergreen
    },
    stepIconUpcoming: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: COLORS.onyxMedium
    },
    stepName: {
      marginLeft: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: COLORS.onyxMedium,
      whiteSpace: 'nowrap'
    },
    stepNameCurrent: {
      fontWeight: 600,
      color: COLORS.onyx
    },
    contentContainer: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden'
    },
    aiContainer: {
      width: showPreview ? '30%' : '40%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.02) 0%, rgba(77, 152, 146, 0.01) 100%)',
      borderRight: '1px solid rgba(26, 76, 73, 0.1)'
    },
    aiContent: {
      flex: 1,
      padding: '1.5rem',
      overflowY: 'auto',
      scrollBehavior: 'smooth'
    },
    choicesContainer: {
      width: showPreview ? '50%' : '60%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fafbfc'
    },
    choicesContent: {
      flex: 1,
      padding: '1.5rem',
      overflowY: 'auto',
      scrollBehavior: 'smooth'
    },
    previewWrapper: {
      width: '20%',
      backgroundColor: '#f5f7f8',
      borderLeft: '1px solid rgba(0, 0, 0, 0.08)'
    },
    formStep: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '2rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    },
    stepHeader: {
      marginBottom: '2rem'
    },
    stepTitle: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: COLORS.onyx,
      margin: '0 0 0.5rem 0'
    },
    stepDescription: {
      fontSize: '1rem',
      color: COLORS.onyxMedium,
      margin: 0
    },
    formSection: {
      marginBottom: '2rem'
    },
    formLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: COLORS.onyx,
      marginBottom: '0.75rem'
    },
    formInput: {
      width: '100%',
      padding: '0.875rem',
      fontSize: '0.875rem',
      borderRadius: '0.5rem',
      border: '2px solid rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'all 0.2s ease',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    formTextarea: {
      width: '100%',
      padding: '0.875rem',
      fontSize: '0.875rem',
      borderRadius: '0.5rem',
      border: '2px solid rgba(0, 0, 0, 0.1)',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'all 0.2s ease',
      backgroundColor: 'white',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    footer: {
      padding: '1rem 1.5rem',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    backButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      backgroundColor: 'transparent',
      border: '1px solid rgba(0,0,0,0.15)',
      color: COLORS.onyxMedium,
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    nextButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    }
  };

  // Generate the AI insights panel based on current step
  const renderAiInsightsPanel = () => {
    if (isAnalyzing) {
      return (
        <div style={{
          background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.02) 100%)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(26, 76, 73, 0.15)',
          boxShadow: '0 4px 20px rgba(26, 76, 73, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '120px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(26, 76, 73, 0.3)',
              borderTopColor: COLORS.evergreen,
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: COLORS.onyx,
              margin: 0
            }}>
              Analyzing program settings and generating insights...
            </p>
          </div>
        </div>
      );
    }
    
    const baseInsightStyle = {
      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.02) 100%)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid rgba(26, 76, 73, 0.15)',
      boxShadow: '0 4px 20px rgba(26, 76, 73, 0.08)'
    };

    const headerStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    };

    const titleStyle = {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: COLORS.onyx,
      margin: '0 0 0.25rem 0'
    };

    const subtitleStyle = {
      fontSize: '0.875rem',
      color: COLORS.onyxMedium,
      margin: 0
    };
    
    switch(step) {
      case 1:
        return aiInsights.program ? (
          <div style={baseInsightStyle}>
            <div style={headerStyle}>
              <Sparkles size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={titleStyle}>
                  {isAtRiskPunchCard() ? 'AI Segment Optimization' : 'AI Program Recommendations'}
                </p>
                <p style={subtitleStyle}>
                  {isAtRiskPunchCard() ? 
                    'Suggested Punch Card Name' : 
                    'Based on your selections and industry best practices'
                  }
                </p>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: COLORS.evergreen,
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {isAtRiskPunchCard() ? 'Suggested Punch Card Name' : 'Suggested Program Name'}
                </h4>
                <div style={{
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.5,
                  padding: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.08)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${COLORS.evergreen}`,
                  fontWeight: 500
                }}>
                  {aiInsights.program.title}
                </div>
                
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: COLORS.evergreen,
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Recommended Description
                </h4>
                <div style={{
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.5,
                  padding: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.08)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${COLORS.evergreen}`,
                  fontWeight: 500
                }}>
                  {aiInsights.program.description}
                </div>
                
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: COLORS.evergreen,
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Success Metrics
                </h4>
                <div style={{
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.5,
                  padding: '0.75rem',
                  backgroundColor: 'rgba(76, 175, 80, 0.08)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${COLORS.green}`
                }}>
                  {aiInsights.program.successMetrics}
                </div>

                {aiInsights.program.bestPractices && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: COLORS.evergreen,
                      margin: '0 0 0.5rem 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Best Practices
                    </h4>
                    <ul style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyxMedium,
                      paddingLeft: '1.25rem',
                      margin: 0
                    }}>
                      {aiInsights.program.bestPractices.map((practice, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {appliedSuggestions.has(aiInsights.program.id) ? (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                  color: COLORS.green,
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle size={16} />
                  <span>Suggestions Applied Successfully!</span>
                </div>
              ) : (
                <button
                  onClick={() => applySuggestion(aiInsights.program.id, {
                    title: aiInsights.program.title,
                    description: aiInsights.program.description
                  })}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.25rem',
                    background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, #4D9892 100%)`,
                    color: 'white',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(26, 76, 73, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(26, 76, 73, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(26, 76, 73, 0.2)';
                  }}
                >
                  <Check size={16} />
                  Apply AI Suggestions
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={baseInsightStyle}>
            <div style={headerStyle}>
              <Brain size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={titleStyle}>AI Assistant</p>
                <p style={subtitleStyle}>Complete the program basics to receive personalized recommendations</p>
              </div>
            </div>
          </div>
        );
      
      case 2:
        if (isAtRiskPunchCard()) {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <Target size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>Punch Card Insights</p>
                  <p style={subtitleStyle}>Optimization recommendations for your At Risk Segment</p>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Analysis
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    Segment recency and frequency are lower than target levels
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Recommendation
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    Launch multi step Punch Card with rewards and multiple levels and increase segment recency and frequency
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Business Impact
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    $215K incremental revenue, 60% increase in segment recency, 35% increase in segment frequency
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
                  borderRadius: '0.75rem',
                  borderLeft: '4px solid #FFC107',
                  marginTop: '1rem'
                }}>
                  <Lightbulb size={16} style={{ color: '#FFC107' }} />
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6
                  }}>
                    Create a limited time Punch Card to increase urgency and boost response rate
                  </p>
                </div>
              </div>
            </div>
          );
        } else if (aiInsights.points) {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <Target size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>Program Structure Insights</p>
                  <p style={subtitleStyle}>Optimization recommendations for your program economics</p>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Analysis
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    {aiInsights.points.insight}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Recommendation
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    {aiInsights.points.recommendation}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.evergreen,
                    margin: '0 0 0.5rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Business Impact
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6,
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.75rem',
                    border: `1px solid rgba(26, 76, 73, 0.1)`
                  }}>
                    {aiInsights.points.impact}
                  </p>
                </div>
                {aiInsights.points.optimization && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
                    borderRadius: '0.75rem',
                    borderLeft: '4px solid #FFC107',
                    marginTop: '1rem'
                  }}>
                    <Lightbulb size={16} style={{ color: '#FFC107' }} />
                    <p style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyx,
                      margin: 0,
                      lineHeight: 1.6
                    }}>
                      {aiInsights.points.optimization}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <Brain size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>AI Assistant</p>
                  <p style={subtitleStyle}>Set your program structure to receive optimization insights</p>
                </div>
              </div>
            </div>
          );
        }

      case 3:
        return (
          <div style={baseInsightStyle}>
            <div style={headerStyle}>
              <Settings size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={titleStyle}>Earning Mechanics Guidance</p>
                <p style={subtitleStyle}>Best practices for member engagement</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                'Start with simple, clear earning rules',
                'Include both purchase and engagement-based earning',
                'Provide bonus opportunities for key behaviors',
                'Communicate earning opportunities clearly'
              ].map((tip, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  padding: '0.5rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.03)',
                  borderRadius: '0.375rem'
                }}>
                  <CheckCircle size={16} style={{ color: COLORS.evergreen }} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={baseInsightStyle}>
            <div style={headerStyle}>
              <Gift size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={titleStyle}>Rewards Strategy</p>
                <p style={subtitleStyle}>Balance value perception with program costs</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                'Mix monetary and experiential rewards',
                'Offer low-threshold quick wins',
                'Include exclusive access and experiences',
                'Refresh rewards catalog seasonally'
              ].map((tip, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  padding: '0.5rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.03)',
                  borderRadius: '0.375rem'
                }}>
                  <Star size={16} style={{ color: COLORS.evergreen }} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        if (isAtRiskPunchCard()) {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <BarChart2 size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>At Risk Segment Recovery Impact</p>
                  <p style={subtitleStyle}>Projected outcomes from punch card implementation</p>
                </div>
              </div>
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {[
                    { label: 'Recency Improvement', value: '+60%', change: 'vs current R:2' },
                    { label: 'Frequency Improvement', value: '+35%', change: 'vs current F:3' },
                    { label: 'Revenue Impact', value: '$215K', change: 'incremental' },
                    { label: 'Response Rate', value: '40%', change: 'estimated' }
                  ].map((metric, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.08) 0%, rgba(77, 152, 146, 0.05) 100%)',
                      borderRadius: '0.5rem',
                      textAlign: 'center',
                      border: '1px solid rgba(26, 76, 73, 0.1)'
                    }}>
                      <p style={{
                        fontSize: '0.75rem',
                        color: COLORS.onyxMedium,
                        margin: '0 0 0.25rem 0'
                      }}>
                        {metric.label}
                      </p>
                      <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: COLORS.evergreen,
                        margin: '0 0 0.25rem 0'
                      }}>
                        {metric.value}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: COLORS.green
                      }}>
                        <ArrowUpRight size={12} />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: COLORS.onyx,
                  padding: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.05)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${COLORS.evergreen}`
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: COLORS.evergreen
                  }} />
                  <span>This punch card targets critical RFM factors for At Risk segment recovery</span>
                </div>
              </div>
            </div>
          );
        } else if (predictiveMetrics) {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <BarChart2 size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>Program Performance Prediction</p>
                  <p style={subtitleStyle}>AI-powered forecasts based on your configuration</p>
                </div>
              </div>
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {[
                    { label: 'Est. Engagement Lift', value: `+${predictiveMetrics.estimatedEngagement}%`, change: `+${(predictiveMetrics.estimatedEngagement - 25.2).toFixed(1)}%` },
                    { label: 'Est. Retention Lift', value: `+${predictiveMetrics.estimatedRetention}%`, change: `+${(predictiveMetrics.estimatedRetention - 22.4).toFixed(1)}%` },
                    { label: 'Est. AOV Increase', value: `+${predictiveMetrics.estimatedAOV}%`, change: `+${(predictiveMetrics.estimatedAOV - 12.5).toFixed(1)}%` },
                    { label: 'Est. Program ROI', value: `${predictiveMetrics.estimatedROI}%`, change: `+${(predictiveMetrics.estimatedROI - 165).toFixed(1)}%` }
                  ].map((metric, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.08) 0%, rgba(77, 152, 146, 0.05) 100%)',
                      borderRadius: '0.5rem',
                      textAlign: 'center',
                      border: '1px solid rgba(26, 76, 73, 0.1)'
                    }}>
                      <p style={{
                        fontSize: '0.75rem',
                        color: COLORS.onyxMedium,
                        margin: '0 0 0.25rem 0'
                      }}>
                        {metric.label}
                      </p>
                      <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: COLORS.evergreen,
                        margin: '0 0 0.25rem 0'
                      }}>
                        {metric.value}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: COLORS.green
                      }}>
                        <ArrowUpRight size={12} />
                        <span>{metric.change} vs. avg</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: COLORS.onyx,
                  padding: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.05)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${COLORS.evergreen}`
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: COLORS.evergreen
                  }} />
                  <span>This program is forecasted to perform {Math.round((predictiveMetrics.estimatedROI - 165) / 1.65)}% better than average loyalty programs</span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div style={baseInsightStyle}>
              <div style={headerStyle}>
                <Brain size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
                <div>
                  <p style={titleStyle}>Performance Prediction</p>
                  <p style={subtitleStyle}>Complete your program setup to see AI-powered performance forecasts</p>
                </div>
              </div>
            </div>
          );
        }
      
      default:
        return null;
    }
  };

  // Render form content based on the current step
  const renderFormContent = () => {
    switch(step) {
      case 1:
        return (
          <div style={styles.formStep}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>Program Basics</h3>
              <p style={styles.stepDescription}>Define the core identity and purpose of your loyalty program</p>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Program Name *</label>
              <input 
                type="text"
                value={programData.title}
                onChange={(e) => updateProgramData('title', e.target.value)}
                placeholder="Enter a memorable program name"
                style={styles.formInput}
                maxLength={50}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.evergreen;
                  e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: COLORS.onyxMedium,
                textAlign: 'right'
              }}>
                {programData.title.length}/50 characters
              </div>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Program Description *</label>
              <textarea 
                value={programData.description}
                onChange={(e) => updateProgramData('description', e.target.value)}
                placeholder="Describe the value and benefits of your program"
                style={styles.formTextarea}
                maxLength={200}
                rows={4}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.evergreen;
                  e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: COLORS.onyxMedium,
                textAlign: 'right'
              }}>
                {programData.description.length}/200 characters
              </div>
            </div>
            
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Tactic *</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { 
                    value: 'Boost RFM Factors', 
                    icon: Target, 
                    title: 'Boost RFM Factors',
                    description: 'Increase purchase recency, frequency, and monetary characteristics for target segment',
                    benefits: ['Re-engage members', 'Drive one-time and repeat purchases', 'Sustain engagement with follow-on campaigns'],
                    color: COLORS.red
                  },
                  { 
                    value: 'Points Promotion', 
                    icon: Star, 
                    title: 'Points Program',
                    description: 'Members earn points on purchases that can be redeemed for rewards',
                    benefits: ['Simple to understand', 'Flexible rewards', 'Easy to scale'],
                    color: COLORS.blue
                  },
                  { 
                    value: 'Tiered Rewards', 
                    icon: Award, 
                    title: 'Tiered Status',
                    description: 'Status levels with increasing benefits and exclusive perks',
                    benefits: ['Drives engagement', 'Creates aspirational value', 'Higher retention'],
                    color: COLORS.evergreen
                  },
                  { 
                    value: 'Lifecycle', 
                    icon: Users, 
                    title: 'Lifecycle Journey',
                    description: 'Rewards based on customer relationship stage and milestones',
                    benefits: ['Personalized experience', 'Long-term focus', 'Relationship building'],
                    color: COLORS.green
                  },
                  { 
                    value: 'Acquisition', 
                    icon: Target, 
                    title: 'Acquisition Focus',
                    description: 'Designed to attract and convert new customers',
                    benefits: ['Rapid growth', 'Targeted incentives', 'Conversion optimization'],
                    color: COLORS.red
                  },
                  { 
                    value: 'Engagement', 
                    icon: Zap, 
                    title: 'Engagement Boost',
                    description: 'Drive specific customer behaviors and interactions',
                    benefits: ['Behavior modification', 'Increased activity', 'Community building'],
                    color: COLORS.yellow
                  }
                ].map((type, index) => (
                  <div 
                    key={index}
                    onClick={() => updateProgramData('type', type.value)}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${programData.type === type.value ? type.color : 'rgba(0, 0, 0, 0.1)'}`,
                      backgroundColor: programData.type === type.value ? `${type.color}08` : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (programData.type !== type.value) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '1rem',
                      backgroundColor: `${type.color}15`,
                      color: type.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      transition: 'all 0.2s ease'
                    }}>
                      <type.icon size={24} />
                    </div>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: COLORS.onyx,
                      margin: '0 0 0.5rem 0'
                    }}>
                      {type.title}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyxMedium,
                      margin: '0 0 1rem 0',
                      lineHeight: 1.5
                    }}>
                      {type.description}
                    </p>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} style={{
                          fontSize: '0.75rem',
                          color: type.color,
                          marginBottom: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 500
                        }}>
                          <span style={{ marginRight: '0.5rem', fontWeight: 600 }}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    {programData.type === type.value && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: type.color
                      }}>
                        <CheckCircle size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Target Audience *</label>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {[
                  { value: 'At Risk', desc: 'High value members with declining recency and frequency', icon: AlertCircle, color: COLORS.red },
                  { value: 'All Members', desc: 'Broad reach across all customer segments', icon: Users, color: COLORS.blue },
                  { value: 'New Members', desc: 'Focus on onboarding and early engagement', icon: Star, color: COLORS.green },
                  { value: 'Explorer Tier', desc: 'Entry-level loyalty members', icon: Target, color: COLORS.yellow },
                  { value: 'Trailblazer & Summit', desc: 'High-engagement customer tiers', icon: Award, color: COLORS.evergreen },
                  { value: '1+ Year Members', desc: 'Long-term loyalty members', icon: TrendingUp, color: COLORS.red }
                ].map((audience, index) => (
                  <div 
                    key={index}
                    onClick={() => updateProgramData('audience', audience.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: `2px solid ${programData.audience === audience.value ? audience.color : 'rgba(0, 0, 0, 0.1)'}`,
                      backgroundColor: programData.audience === audience.value ? `${audience.color}08` : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (programData.audience !== audience.value) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <audience.icon size={20} style={{ color: audience.color }} />
                    <div>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: COLORS.onyx,
                        display: 'block',
                        marginBottom: '0.25rem'
                      }}>
                        {audience.value}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: COLORS.onyxMedium,
                        display: 'block'
                      }}>
                        {audience.desc}
                      </span>
                    </div>
                    {programData.audience === audience.value && (
                      <CheckCircle size={16} style={{ color: audience.color, marginLeft: 'auto' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div style={styles.formStep}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>
                {programData.isPunchCard ? 'Punch Card Structure' : 'Program Structure'}
              </h3>
              <p style={styles.stepDescription}>
                {programData.isPunchCard ? 
                  'Configure punch card requirements and rewards' : 
                  'Configure duration, point values, and tier structure'
                }
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ ...styles.formSection, flex: 1 }}>
                <label style={styles.formLabel}>Launch Date</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="date"
                    value={programData.startDate}
                    onChange={(e) => updateProgramData('startDate', e.target.value)}
                    style={styles.formInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.evergreen;
                      e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <Calendar size={16} style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: COLORS.onyxMedium,
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
              
              <div style={{ ...styles.formSection, flex: 1 }}>
                <label style={styles.formLabel}>End Date</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="date"
                    value={programData.endDate}
                    onChange={(e) => updateProgramData('endDate', e.target.value)}
                    style={styles.formInput}
                    min={programData.startDate}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.evergreen;
                      e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <Calendar size={16} style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: COLORS.onyxMedium,
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>

            {programData.isPunchCard ? (
              // Punch Card Configuration
              <>
                <div style={styles.formSection}>
                  <label style={styles.formLabel}>Required Punches to Complete *</label>
                  <input 
                    type="number"
                    value={programData.requiredPunches}
                    onChange={(e) => updateProgramData('requiredPunches', e.target.value)}
                    placeholder="4"
                    min="1"
                    max="20"
                    style={styles.formInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.evergreen;
                      e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ ...styles.formSection, flex: 1 }}>
                    <label style={styles.formLabel}>Prize 1 *</label>
                    <input 
                      type="text"
                      value={programData.prize1}
                      onChange={(e) => updateProgramData('prize1', e.target.value)}
                      placeholder="100 points"
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.evergreen;
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div style={{ ...styles.formSection, flex: 1 }}>
                    <label style={styles.formLabel}>Prize 1 Threshold *</label>
                    <input 
                      type="number"
                      value={programData.prize1Threshold}
                      onChange={(e) => updateProgramData('prize1Threshold', e.target.value)}
                      placeholder="2"
                      min="1"
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.evergreen;
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ ...styles.formSection, flex: 1 }}>
                    <label style={styles.formLabel}>Prize 2 *</label>
                    <input 
                      type="text"
                      value={programData.prize2}
                      onChange={(e) => updateProgramData('prize2', e.target.value)}
                      placeholder="$5 off coupon"
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.evergreen;
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div style={{ ...styles.formSection, flex: 1 }}>
                    <label style={styles.formLabel}>Prize 2 Threshold *</label>
                    <input 
                      type="number"
                      value={programData.prize2Threshold}
                      onChange={(e) => updateProgramData('prize2Threshold', e.target.value)}
                      placeholder="4"
                      min="1"
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.evergreen;
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              // Regular Program Configuration
              <>
                <div style={styles.formSection}>
                  <label style={styles.formLabel}>Point Value (per $1 spent) *</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <input 
                      type="number"
                      value={programData.pointsValue}
                      onChange={(e) => updateProgramData('pointsValue', e.target.value)}
                      placeholder="10"
                      min="0"
                      max="100"
                      step="0.5"
                      style={{ ...styles.formInput, flex: 1 }}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.evergreen;
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 76, 73, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <span style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyxMedium,
                      fontWeight: 500,
                      whiteSpace: 'nowrap'
                    }}>
                      points per $1
                    </span>
                  </div>
                  {programData.pointsValue && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(26, 76, 73, 0.05)',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      color: COLORS.evergreen,
                      fontWeight: 500
                    }}>
                      <DollarSign size={16} />
                      <span>$100 purchase = {Math.round(parseFloat(programData.pointsValue) * 100)} points</span>
                    </div>
                  )}
                </div>
                
                {programData.type === 'Tiered Rewards' && (
                  <div style={styles.formSection}>
                    <label style={styles.formLabel}>Program Tiers</label>
                    <div style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '0.75rem',
                      backgroundColor: 'white',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: COLORS.onyx,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      }}>
                        <Award size={16} />
                        <span>Define your membership tiers</span>
                      </div>
                      
                      <div style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        {programData.tiers.map((tier, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                          >
                            <div style={{
                              width: '2.5rem',
                              height: '2.5rem',
                              borderRadius: '50%',
                              backgroundColor: [COLORS.green, COLORS.blue, COLORS.evergreen][index],
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              flexShrink: 0
                            }}>
                              {index + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                              <span style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: COLORS.onyx,
                                display: 'block'
                              }}>
                                {tier.name}
                              </span>
                              <span style={{
                                fontSize: '0.75rem',
                                color: COLORS.onyxMedium,
                                display: 'block',
                                marginTop: '0.25rem'
                              }}>
                                {tier.threshold}
                              </span>
                            </div>
                            <button 
                              onClick={() => removeTier(index)}
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                color: COLORS.red,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(244, 67, 54, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                                e.target.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                                e.target.style.transform = 'scale(1)';
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        
                        {programData.tiers.length < 3 && (
                          <button 
                            onClick={() => {
                              const tierNames = ['Explorer', 'Trailblazer', 'Summit'];
                              const tierThresholds = ['1,000 points', '5,000 points', '10,000 points'];
                              const tierIndex = programData.tiers.length;
                              
                              addTier({
                                name: tierNames[tierIndex],
                                threshold: tierThresholds[tierIndex]
                              });
                            }}
                            style={{
                              width: '100%',
                              padding: '1rem',
                              borderRadius: '0.5rem',
                              border: '2px dashed rgba(26, 76, 73, 0.3)',
                              backgroundColor: 'transparent',
                              color: COLORS.evergreen,
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                              e.target.style.borderColor = COLORS.evergreen;
                              e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.borderColor = 'rgba(26, 76, 73, 0.3)';
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            <Plus size={16} />
                            Add Tier
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      case 3:
        return (
          <div style={styles.formStep}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>Earning & Rules</h3>
              <p style={styles.stepDescription}>Define how members earn points and program guidelines</p>
            </div>
            
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Purchase-Based Earning</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {[
                  { text: 'Points per dollar spent', icon: ShoppingBag, color: COLORS.blue },
                  { text: 'Bonus points for minimum purchase threshold', icon: DollarSign, color: COLORS.green },
                  { text: 'Tiered point multipliers by customer segment', icon: Award, color: COLORS.evergreen },
                  { text: 'Category-specific bonus points', icon: Tag, color: COLORS.yellow },
                  { text: 'Seasonal double points promotions', icon: Star, color: COLORS.red }
                ].map((mechanic, index) => {
                  const isSelected = programData.earningMechanics.includes(mechanic.text);
                  return (
                    <div 
                      key={index}
                      onClick={() => toggleArrayItem('earningMechanics', mechanic.text)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '0.875rem',
                        border: `2px solid ${isSelected ? mechanic.color : 'rgba(0, 0, 0, 0.08)'}`,
                        backgroundColor: isSelected ? `${mechanic.color}08` : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: isSelected ? `0 4px 20px ${mechanic.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
                        transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                          e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                        }
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.75rem',
                        backgroundColor: isSelected ? mechanic.color : `${mechanic.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'white' : mechanic.color,
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}>
                        <mechanic.icon size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          color: COLORS.onyx,
                          lineHeight: '1.4'
                        }}>
                          {mechanic.text}
                        </span>
                      </div>
                      {isSelected && (
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: mechanic.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0
                        }}>
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Engagement-Based Earning</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {[
                  { text: 'Account creation & profile completion', icon: Users, color: COLORS.blue },
                  { text: 'Newsletter signup bonus', icon: Mail, color: COLORS.green },
                  { text: 'Social media engagement rewards', icon: MessageSquare, color: COLORS.evergreen },
                  { text: 'Referral bonuses', icon: Award, color: COLORS.yellow },
                  { text: 'Review submission points', icon: Star, color: COLORS.red }
                ].map((mechanic, index) => {
                  const isSelected = programData.earningMechanics.includes(mechanic.text);
                  return (
                    <div 
                      key={index}
                      onClick={() => toggleArrayItem('earningMechanics', mechanic.text)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '0.875rem',
                        border: `2px solid ${isSelected ? mechanic.color : 'rgba(0, 0, 0, 0.08)'}`,
                        backgroundColor: isSelected ? `${mechanic.color}08` : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: isSelected ? `0 4px 20px ${mechanic.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
                        transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                          e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                        }
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.75rem',
                        backgroundColor: isSelected ? mechanic.color : `${mechanic.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'white' : mechanic.color,
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}>
                        <mechanic.icon size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          color: COLORS.onyx,
                          lineHeight: '1.4'
                        }}>
                          {mechanic.text}
                        </span>
                      </div>
                      {isSelected && (
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: mechanic.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0
                        }}>
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Program Rules</label>
              <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <Tag size={20} style={{ color: COLORS.evergreen }} />
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: COLORS.onyx
                  }}>
                    Select applicable program rules
                  </span>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {[
                    { text: 'Earn 2X points on all purchases', color: COLORS.green },
                    { text: 'Minimum purchase of $50 required', color: COLORS.blue },
                    { text: 'Limited to one redemption per customer', color: COLORS.yellow },
                    { text: 'Bonus points for first purchase', color: COLORS.evergreen },
                    { text: 'Points expire after 12 months', color: COLORS.red },
                    { text: 'Transferable points between family members', color: COLORS.blue }
                  ].map((rule, index) => {
                    const isSelected = programData.rules.includes(rule.text);
                    return (
                      <div 
                        key={index}
                        onClick={() => toggleArrayItem('rules', rule.text)}
                        style={{
                          padding: '1rem 1.25rem',
                          borderRadius: '0.75rem',
                          border: `2px solid ${isSelected ? rule.color : 'rgba(0, 0, 0, 0.08)'}`,
                          backgroundColor: isSelected ? `${rule.color}08` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: isSelected ? `0 4px 20px ${rule.color}15` : '0 2px 8px rgba(0,0,0,0.04)',
                          transform: isSelected ? 'translateY(-1px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                          }
                        }}
                      >
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '500',
                          color: COLORS.onyx,
                          flex: 1
                        }}>
                          {rule.text}
                        </span>
                        {isSelected && (
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: rule.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            marginLeft: '1rem'
                          }}>
                            <CheckCircle size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div style={styles.formStep}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>Rewards Catalog</h3>
              <p style={styles.stepDescription}>Choose rewards that will motivate and delight your members</p>
            </div>
            
            <div style={styles.formSection}>
              <label style={styles.formLabel}>Available Rewards *</label>
              <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <Gift size={20} style={{ color: COLORS.evergreen }} />
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: COLORS.onyx
                  }}>
                    Select rewards for your program
                  </span>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { name: '$10 off next purchase', points: 500, category: 'Discount', color: COLORS.green },
                    { name: '$25 off next purchase', points: 1200, category: 'Discount', color: COLORS.green },
                    { name: 'Free shipping', points: 300, category: 'Service', color: COLORS.blue },
                    { name: 'Exclusive product access', points: 800, category: 'Experience', color: COLORS.evergreen },
                    { name: '10% off entire purchase', points: 700, category: 'Discount', color: COLORS.green },
                    { name: 'Gift with purchase', points: 600, category: 'Product', color: COLORS.yellow },
                    { name: 'VIP customer service', points: 400, category: 'Service', color: COLORS.blue },
                    { name: 'Early sale access', points: 350, category: 'Experience', color: COLORS.evergreen }
                  ].map((reward, index) => {
                    const rewardString = `${reward.name} (${reward.points} points)`;
                    const isSelected = programData.rewards.includes(rewardString);
                    
                    return (
                      <div 
                        key={index}
                        onClick={() => toggleArrayItem('rewards', rewardString)}
                        style={{
                          padding: '1.5rem',
                          borderRadius: '1rem',
                          border: `2px solid ${isSelected ? reward.color : 'rgba(0, 0, 0, 0.08)'}`,
                          backgroundColor: isSelected ? `${reward.color}08` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '160px',
                          boxShadow: isSelected ? `0 8px 32px ${reward.color}20` : '0 4px 16px rgba(0,0,0,0.04)',
                          transform: isSelected ? 'translateY(-3px)' : 'translateY(0)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                          }
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            padding: '0.375rem 0.75rem',
                            backgroundColor: `${reward.color}15`,
                            color: reward.color,
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {reward.category}
                          </div>
                          {isSelected && (
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: reward.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white'
                            }}>
                              <CheckCircle size={14} />
                            </div>
                          )}
                        </div>
                        
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: COLORS.onyx,
                          margin: '0 0 auto 0',
                          lineHeight: '1.3'
                        }}>
                          {reward.name}
                        </h4>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '0.5rem',
                          marginTop: '1rem'
                        }}>
                          <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: isSelected ? reward.color : COLORS.onyxMedium
                          }}>
                            {reward.points}
                          </span>
                          <span style={{
                            fontSize: '0.875rem',
                            color: COLORS.onyxMedium,
                            fontWeight: '500'
                          }}>
                            points
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={styles.formSection}>
              <label style={styles.formLabel}>Program Touchpoints</label>
              <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <Smartphone size={20} style={{ color: COLORS.evergreen }} />
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: COLORS.onyx
                  }}>
                    Where will members interact with your program?
                  </span>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { name: 'Website integration with member dashboard', icon: Globe, color: COLORS.blue },
                    { name: 'Email campaign journey', icon: Mail, color: COLORS.green },
                    { name: 'Mobile app experience', icon: Smartphone, color: COLORS.evergreen },
                    { name: 'SMS notifications for points & rewards', icon: MessageSquare, color: COLORS.yellow },
                    { name: 'In-store POS integration', icon: CreditCard, color: COLORS.red },
                    { name: 'Social media engagement', icon: Users, color: COLORS.blue }
                  ].map((touchpoint, index) => {
                    const isSelected = programData.programTouchpoints.includes(touchpoint.name);
                    return (
                      <div 
                        key={index}
                        onClick={() => toggleArrayItem('programTouchpoints', touchpoint.name)}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '0.875rem',
                          border: `2px solid ${isSelected ? touchpoint.color : 'rgba(0, 0, 0, 0.08)'}`,
                          backgroundColor: isSelected ? `${touchpoint.color}08` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          boxShadow: isSelected ? `0 4px 20px ${touchpoint.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
                          transform: isSelected ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                            e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                          }
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '0.75rem',
                          backgroundColor: isSelected ? touchpoint.color : `${touchpoint.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? 'white' : touchpoint.color,
                          transition: 'all 0.3s ease',
                          flexShrink: 0
                        }}>
                          <touchpoint.icon size={24} />
                        </div>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          color: COLORS.onyx,
                          flex: 1,
                          lineHeight: '1.4'
                        }}>
                          {touchpoint.name}
                        </span>
                        {isSelected && (
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: touchpoint.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0
                          }}>
                            <CheckCircle size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div style={styles.formStep}>
            <div style={styles.stepHeader}>
              <h3 style={styles.stepTitle}>Review & Launch</h3>
              <p style={styles.stepDescription}>Review your program configuration and launch when ready</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Enhanced Main Program Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.02) 100%)',
                border: '1px solid rgba(26, 76, 73, 0.15)',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(26, 76, 73, 0.12)'
              }}>
                {/* Enhanced Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.03) 100%)',
                  borderBottom: '1px solid rgba(26, 76, 73, 0.1)'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '1rem',
                    background: 'linear-gradient(135deg, #1A4C49 0%, #4D9892 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0,
                    boxShadow: '0 8px 24px rgba(26, 76, 73, 0.3)'
                  }}>
                    <Award size={32} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      color: COLORS.onyx,
                      margin: '0 0 0.75rem 0',
                      lineHeight: '1.2'
                    }}>
                      {isAtRiskPunchCard() ? 'At Risk Segment Re-engagement, June 2025' : (programData.title || 'New Loyalty Program')}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        fontWeight: '500'
                      }}>
                        {isAtRiskPunchCard() ? 'RFM Optimization' : programData.type}
                      </span>
                      <span style={{ color: COLORS.onyxLight }}>•</span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        fontWeight: '500'
                      }}>
                        {programData.audience || 'All Members'}
                      </span>
                      <div style={{
                        padding: '0.375rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
                      }}>
                        {programData.startDate && programData.endDate ? 'Scheduled' : 'Draft'}
                      </div>
                    </div>
                    {programData.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        lineHeight: '1.5',
                        margin: 0,
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '0.75rem',
                        borderLeft: `4px solid ${COLORS.evergreen}`
                      }}>
                        {isAtRiskPunchCard() ? 
                          'Increase recency and frequency by targeting segment members with multi step punch card with multiple reward levels' : 
                          programData.description
                        }
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Key Details Grid */}
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {(isAtRiskPunchCard() ? [
                      { label: 'Punches to Complete', value: `${programData.requiredPunches} punches`, icon: Target },
                      { label: 'Start Date', value: programData.startDate || 'Not scheduled', icon: Calendar },
                      { label: 'End Date', value: programData.endDate || 'No end date', icon: Calendar },
                      { label: 'Prize Thresholds', value: `${programData.prize1Threshold} & ${programData.prize2Threshold} punches`, icon: Gift }
                    ] : [
                      { label: 'Point Value', value: programData.pointsValue ? `${programData.pointsValue} points per $1` : 'Not specified', icon: DollarSign },
                      { label: 'Start Date', value: programData.startDate || 'Not scheduled', icon: Calendar },
                      { label: 'End Date', value: programData.endDate || 'No end date', icon: Calendar },
                      { label: 'Program Tiers', value: programData.tiers.length > 0 ? `${programData.tiers.length} tiers` : 'No tiers', icon: Award }
                    ]).map((detail, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(26, 76, 73, 0.1)'
                      }}>
                        <detail.icon size={20} style={{ color: COLORS.evergreen }} />
                        <div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: COLORS.onyxMedium,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '600'
                          }}>
                            {detail.label}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: COLORS.onyx,
                            marginTop: '0.25rem'
                          }}>
                            {detail.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Configuration Summary with Plain White Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isAtRiskPunchCard() ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {(isAtRiskPunchCard() ? [
                  { 
                    title: 'Rules', 
                    items: [
                      '4 qualifying punches to complete the punch card',
                      'Punches are awarded on purchase of $10 or more',
                      'Must complete at least 1 purchase per week until punch card completion',
                      'Only 1 punch qualifies per day',
                      'Gift card purchases do not qualify for minimum spend'
                    ], 
                    icon: Tag, 
                    color: COLORS.blue,
                    emptyMessage: 'No specific rules defined' 
                  },
                  { 
                    title: 'Rewards', 
                    items: [
                      `${programData.prize1} at ${programData.prize1Threshold} punches`,
                      `${programData.prize2} at ${programData.prize2Threshold} punches`
                    ], 
                    icon: Gift, 
                    color: COLORS.green,
                    emptyMessage: 'No rewards selected yet'
                  },
                  { 
                    title: 'Moments', 
                    items: [
                      'Issued initiates issued moment (Optimal channel based on likelihood to engage)',
                      'Reward Initiates Punch Card Reward Earned moment (Push/SMS only)',
                      'Reminder moment when not complete and no purchase 2 days before end of the week (Push/SMS only)',
                      'Completion initiatives Punch Card Completed moment (Email only)'
                    ], 
                    icon: Bell, 
                    color: COLORS.evergreen,
                    emptyMessage: 'No moments configured'
                  }
                ] : [
                  { 
                    title: 'Earning Mechanics', 
                    items: programData.earningMechanics, 
                    icon: Zap, 
                    color: COLORS.blue,
                    emptyMessage: 'No earning mechanics defined yet' 
                  },
                  { 
                    title: 'Program Rules', 
                    items: programData.rules, 
                    icon: Tag, 
                    color: COLORS.green,
                    emptyMessage: 'No specific rules defined' 
                  },
                  { 
                    title: 'Available Rewards', 
                    items: programData.rewards, 
                    icon: Gift, 
                    color: COLORS.evergreen,
                    emptyMessage: 'No rewards selected yet'
                  },
                  { 
                    title: 'Program Touchpoints', 
                    items: programData.programTouchpoints, 
                    icon: Globe, 
                    color: COLORS.yellow,
                    emptyMessage: 'No touchpoints configured'
                  }
                ]).map((section, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)'
                  }}>
                    {/* Clean Header with No Gradients */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'white',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                    }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        backgroundColor: `${section.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: section.color
                      }}>
                        <section.icon size={18} />
                      </div>
                      <div>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: COLORS.onyx
                        }}>
                          {section.title}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: COLORS.onyxMedium,
                          marginLeft: '0.5rem'
                        }}>
                          ({section.items.length})
                        </span>
                      </div>
                    </div>
                    
                    {/* Clean Content with Plain White Background */}
                    <div style={{ 
                      padding: '1.5rem',
                      backgroundColor: 'white'
                    }}>
                      {section.items.length > 0 ? (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}>
                          {section.items.slice(0, 4).map((item, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              fontSize: '0.875rem',
                              color: COLORS.onyx,
                              lineHeight: '1.5'
                            }}>
                              <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: section.color,
                                marginTop: '0.5rem',
                                flexShrink: 0
                              }} />
                              <span>{item}</span>
                            </div>
                          ))}
                          {section.items.length > 4 && (
                            <div style={{
                              fontSize: '0.875rem',
                              color: COLORS.onyxMedium,
                              fontStyle: 'italic',
                              fontWeight: '500',
                              paddingLeft: '1.5rem',
                              marginTop: '0.25rem'
                            }}>
                              +{section.items.length - 4} more items
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{
                          fontSize: '0.875rem',
                          color: COLORS.onyxMedium,
                          fontStyle: 'italic',
                          textAlign: 'center',
                          padding: '2rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '0.75rem',
                          border: '1px dashed rgba(0, 0, 0, 0.1)'
                        }}>
                          {section.emptyMessage}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Tiers Preview - only for non-punch card programs */}
              {!isAtRiskPunchCard() && programData.tiers.length > 0 && (
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    <Award size={24} style={{ color: COLORS.evergreen }} />
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: COLORS.onyx,
                      margin: 0
                    }}>
                      Program Tiers
                    </h4>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {programData.tiers.map((tier, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(26, 76, 73, 0.1)',
                        flex: '1',
                        minWidth: '200px'
                      }}>
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          backgroundColor: [COLORS.green, COLORS.blue, COLORS.evergreen][index],
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          {index + 1}
                        </div>
                        <div>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: COLORS.onyx
                          }}>
                            {tier.name}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: COLORS.onyxMedium,
                            marginTop: '0.25rem'
                          }}>
                            {tier.threshold}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render preview content
  const renderPreviewContent = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: COLORS.onyx,
        marginBottom: '0.5rem'
      }}>
        {programData.title || "New Loyalty Program"}
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: COLORS.onyxMedium,
        marginBottom: '0.25rem'
      }}>
        {programData.type || "Program Type"}
      </p>
      <p style={{
        fontSize: '0.875rem',
        color: COLORS.onyxMedium,
        marginBottom: '0.25rem'
      }}>
        {programData.audience || "Target Audience"}
      </p>
      {programData.description && (
        <div style={{
          margin: '1rem 0',
          padding: '1rem',
          backgroundColor: 'rgba(26, 76, 73, 0.05)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: COLORS.onyx,
          lineHeight: '1.5'
        }}>
          {programData.description}
        </div>
      )}
      {programData.isPunchCard ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: COLORS.evergreen,
          fontWeight: 500
        }}>
          <Target size={16} />
          <span>Punch Card: {programData.requiredPunches} punches required</span>
        </div>
      ) : programData.pointsValue && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: COLORS.evergreen,
          fontWeight: 500
        }}>
          <DollarSign size={16} />
          <span>{programData.pointsValue} points per $1 spent</span>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;
  
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isModifyMode ? 'Modify Recommendation Implementation' : 'Create New Loyalty Program'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Preview Toggle */}
            <button 
              onClick={() => setShowPreview(!showPreview)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: showPreview ? COLORS.evergreen : 'transparent',
                color: showPreview ? 'white' : COLORS.onyxMedium,
                border: `1px solid ${showPreview ? COLORS.evergreen : 'rgba(0,0,0,0.2)'}`,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!showPreview) {
                  e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                  e.target.style.borderColor = COLORS.evergreen;
                  e.target.style.color = COLORS.evergreen;
                }
              }}
              onMouseLeave={(e) => {
                if (!showPreview) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'rgba(0,0,0,0.2)';
                  e.target.style.color = COLORS.onyxMedium;
                }
              }}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button style={styles.closeButton} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div style={styles.stepsContainer}>
          {[
            { num: 1, name: 'Program Basics', icon: Settings },
            { num: 2, name: programData.isPunchCard ? 'Punch Card Setup' : 'Structure', icon: Award },
            ...(programData.isPunchCard ? [] : [
              { num: 3, name: 'Earning & Rules', icon: Star },
              { num: 4, name: 'Rewards', icon: Gift }
            ]),
            { num: 5, name: 'Review & Launch', icon: CheckCircle }
          ].map(stepInfo => (
            <div 
              key={stepInfo.num} 
              style={{
                ...styles.stepItem,
                ...(stepInfo.num < step ? styles.stepItemCompleted : {}),
                opacity: stepInfo.num <= step ? 1 : 0.6
              }}
              onClick={() => stepInfo.num < step && handleStepChange(stepInfo.num)}
              onMouseEnter={(e) => {
                if (stepInfo.num < step) {
                  e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (stepInfo.num < step) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{
                ...styles.stepIcon,
                ...(stepInfo.num === step ? styles.stepIconCurrent : 
                   stepInfo.num < step ? styles.stepIconCompleted : 
                   styles.stepIconUpcoming)
              }}>
                {stepInfo.num < step ? (
                  <Check size={18} />
                ) : (
                  <stepInfo.icon size={18} />
                )}
              </div>
              
              <span style={{
                ...styles.stepName,
                ...(stepInfo.num === step ? styles.stepNameCurrent : {})
              }}>
                {stepInfo.name}
              </span>
              
              {stepInfo.num < (programData.isPunchCard ? 3 : 5) && (
                <ChevronRight size={16} style={{
                  color: COLORS.onyxMedium,
                  margin: '0 0.25rem',
                  flexShrink: 0
                }} />
              )}
            </div>
          ))}
        </div>
        
        {/* Content Layout */}
        <div style={styles.contentContainer}>
          {/* Left Side - AI Insights */}
          <div style={styles.aiContainer}>
            <div style={styles.aiContent} ref={contentRef}>
              {renderAiInsightsPanel()}
            </div>
          </div>
          
          {/* Right Side - Form Choices */}
          <div style={styles.choicesContainer}>
            <div style={styles.choicesContent}>
              {renderFormContent()}
            </div>
          </div>
          
          {/* Optional Preview Panel */}
          {showPreview && (
            <div style={styles.previewWrapper}>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: COLORS.onyx
                }}>
                  <span>Program Preview</span>
                </div>
                <div style={{
                  flex: 1,
                  padding: '1.5rem',
                  overflowY: 'auto'
                }}>
                  {renderPreviewContent()}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div style={styles.footer}>
          <button 
            onClick={() => step > 1 ? handleStepChange(step - 1) : onClose()}
            style={styles.backButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
              e.target.style.borderColor = 'rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'rgba(0,0,0,0.15)';
            }}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {step < 5 && !isStepValid(step) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: COLORS.red
              }}>
                <AlertCircle size={16} />
                <span>Please complete required fields to continue</span>
              </div>
            )}
            
            <button 
              onClick={() => step < 5 ? handleStepChange(step + 1) : handleSubmit()}
              disabled={!isStepValid(step) && step < 5}
              style={{
                ...styles.nextButton,
                backgroundColor: isStepValid(step) || step === 5 ? COLORS.evergreen : '#cccccc',
                cursor: (!isStepValid(step) && step < 5) ? 'not-allowed' : 'pointer',
                opacity: (!isStepValid(step) && step < 5) ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (isStepValid(step) || step === 5) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(26, 76, 73, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (isStepValid(step) || step === 5) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {step < 5 ? (
                <>
                  Continue
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  {isModifyMode ? 'Save Changes' : 'Create Program'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add keyframe for spin animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FullScreenLoyaltyProgramModal;
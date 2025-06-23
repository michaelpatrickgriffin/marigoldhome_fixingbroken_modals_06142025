// src/components/loyalty/OfferCreationModal.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronRight, Target, Users, Calendar, Settings, CheckCircle, 
  ArrowUpRight, BarChart2, Plus, Minus, DollarSign, TrendingUp,
  Brain, Lightbulb, AlertCircle, Eye, EyeOff, Sparkles, Percent,
  Tag, Edit, Clock
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { getCurrentCompany } from '../../data/CompanyDataManager';

const OfferCreationModal = ({ 
  isOpen, 
  onClose, 
  onOfferCreated, 
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
  
  const [offerData, setOfferData] = useState({
    title: '',
    description: '',
    type: '',
    audience: '',
    targetCategory: '',
    startDate: '',
    endDate: '',
    discountVariants: [],
    minimumSpend: '',
    maxDiscount: '',
    redemptionLimit: '',
    validDays: '',
    rules: [],
    touchpoints: []
  });
  
  // States for AI insights and predictions
  const [aiInsights, setAiInsights] = useState({});
  const [predictiveMetrics, setPredictiveMetrics] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Get current company context
  const currentCompany = getCurrentCompany();

  // Generate a unique identifier for the current recommendation context
  const getRecommendationId = () => {
    if (!prepopulatedData) return 'default';
    return `${prepopulatedData.title || 'untitled'}-${prepopulatedData.type || 'unknown'}-${prepopulatedData.audience || 'all'}`;
  };

  // Initialize discount variants based on recommendation data
  const initializeDiscountVariants = () => {
    if (!prepopulatedData) return [];
    
    const baseDiscount = prepopulatedData.discountValue || prepopulatedData.details?.discountPercent || 15;
    const baseMinSpend = prepopulatedData.minimumSpend || prepopulatedData.details?.minimumSpend || 40;
    
    return [
      {
        id: 'high_discount',
        name: 'High Discount Segment',
        description: 'Members needing higher incentive to re-engage',
        discountPercent: Math.min(25, Math.round(baseDiscount * 1.67)),
        minimumSpend: baseMinSpend,
        maxDiscount: Math.round(baseMinSpend * 0.4),
        targetSize: '30%'
      },
      {
        id: 'medium_discount',
        name: 'Medium Discount Segment', 
        description: 'Standard re-engagement incentive',
        discountPercent: Math.max(15, baseDiscount),
        minimumSpend: baseMinSpend,
        maxDiscount: Math.round(baseMinSpend * 0.3),
        targetSize: '50%'
      },
      {
        id: 'low_discount',
        name: 'Low Discount Segment',
        description: 'Price-sensitive but motivated members',
        discountPercent: Math.max(10, Math.round(baseDiscount * 0.67)),
        minimumSpend: baseMinSpend,
        maxDiscount: Math.round(baseMinSpend * 0.25),
        targetSize: '20%'
      }
    ];
  };

  // Calculate dynamic predictions based on discount variants
  const calculatePredictions = (variants) => {
    if (!variants.length) return null;
    
    // Base metrics from recommendation data
    const baseData = prepopulatedData?.details || {};
    const baseRedemptionRate = baseData.redemptionRate || 28.5;
    const baseRevenue = baseData.influencedRevenue || 1847000;
    const baseCustomers = baseData.participatingCustomers || 2549;
    const baseAOV = baseData.avgOrderValue || 45;
    
    // Calculate weighted averages based on segment sizes
    const weightedDiscount = variants.reduce((sum, variant) => {
      const weight = parseFloat(variant.targetSize) / 100;
      return sum + (variant.discountPercent * weight);
    }, 0);
    
    // Adjustment factors based on discount level changes
    const originalDiscount = baseData.discountPercent || 15;
    const discountDelta = weightedDiscount - originalDiscount;
    const redemptionAdjustment = discountDelta * 0.8; // 0.8% per discount point
    const revenueAdjustment = discountDelta * 1200; // $1200 per discount point
    const roiAdjustment = discountDelta * -12; // -12% ROI per discount point
    
    const adjustedRedemptionRate = Math.max(15, baseRedemptionRate + redemptionAdjustment);
    const adjustedRevenue = Math.max(baseRevenue * 0.7, baseRevenue + revenueAdjustment);
    const adjustedCustomers = Math.round(baseCustomers * (adjustedRedemptionRate / baseRedemptionRate));
    
    // Calculate total discount cost
    const totalDiscountCost = variants.reduce((sum, variant) => {
      const segmentCustomers = adjustedCustomers * (parseFloat(variant.targetSize) / 100);
      const segmentRevenue = segmentCustomers * baseAOV;
      return sum + (segmentRevenue * variant.discountPercent / 100);
    }, 0);
    
    const adjustedROI = Math.max(200, Math.round(((adjustedRevenue - totalDiscountCost) / totalDiscountCost) * 100));
    
    return {
      redemptionRate: Math.round(adjustedRedemptionRate * 10) / 10,
      participatingCustomers: adjustedCustomers.toLocaleString(),
      influencedRevenue: Math.round(adjustedRevenue / 1000),
      totalDiscountCost: Math.round(totalDiscountCost / 1000),
      avgDiscountPercent: Math.round(weightedDiscount * 10) / 10,
      estimatedROI: adjustedROI,
      avgOrderValue: baseAOV
    };
  };

  // Map recommendation data to offer structure
  const mapRecommendationToOffer = (recData) => {
    if (!recData) return {};
    
    return {
      title: recData.title || 'Category Re-engagement Offer',
      description: recData.description || 'Strategic offer targeting high-value customers for category recovery',
      type: recData.offerType || recData.discountType || 'category_discount',
      audience: recData.audience || 'High-Value Lapsed Customers',
      targetCategory: recData.targetCategory || 'general',
      startDate: recData.startDate || '',
      endDate: recData.endDate || '',
      discountVariants: initializeDiscountVariants(),
      minimumSpend: recData.minimumSpend || recData.details?.minimumSpend || 40,
      maxDiscount: recData.maxDiscount || recData.details?.maxDiscount || 25,
      redemptionLimit: '1',
      validDays: '90',
      rules: Array.isArray(recData.rules) ? recData.rules : [],
      touchpoints: Array.isArray(recData.programTouchpoints) ? recData.programTouchpoints : []
    };
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
        console.log('New offer recommendation detected, resetting applied suggestions');
        setAppliedSuggestions(new Set());
        setCurrentRecommendationId(newRecommendationId);
      }
      
      if (prepopulatedData && isModifyMode) {
        console.log('Prepopulating offer wizard with implementation data:', prepopulatedData);
        const mappedData = mapRecommendationToOffer(prepopulatedData);
        setOfferData(mappedData);
        
        // Set initial predictions
        setPredictiveMetrics(calculatePredictions(mappedData.discountVariants));
      } else {
        setOfferData({
          title: '',
          description: '',
          type: '',
          audience: '',
          targetCategory: '',
          startDate: '',
          endDate: '',
          discountVariants: [],
          minimumSpend: '',
          maxDiscount: '',
          redemptionLimit: '',
          validDays: '',
          rules: [],
          touchpoints: []
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
    if (isOpen && offerData.type && offerData.audience && offerData.title) {
      setIsAnalyzing(true);
      setTimeout(() => {
        generateAiInsights();
        setIsAnalyzing(false);
      }, 800);
    }
  }, [isOpen, offerData.type, offerData.audience, offerData.title]);

  // Update predictions when discount variants change
  useEffect(() => {
    if (offerData.discountVariants.length > 0) {
      const newPredictions = calculatePredictions(offerData.discountVariants);
      setPredictiveMetrics(newPredictions);
    }
  }, [offerData.discountVariants]);

  // Update offer data
  const updateOfferData = (field, value) => {
    setOfferData(prev => ({ ...prev, [field]: value }));
  };
  
  // Update discount variant
  const updateDiscountVariant = (variantId, field, value) => {
    setOfferData(prev => ({
      ...prev,
      discountVariants: prev.discountVariants.map(variant =>
        variant.id === variantId ? { ...variant, [field]: parseInt(value) || value } : variant
      )
    }));
  };
  
  // Apply AI suggestion
  const applySuggestion = (suggestionId, updates) => {
    console.log('Applying suggestion:', suggestionId, updates);
    setOfferData(prev => ({ ...prev, ...updates }));
    setAppliedSuggestions(prev => new Set([...prev, suggestionId]));
  };
  
  // Enhanced AI insights generation
  const generateAiInsights = () => {
    let newInsights = { ...aiInsights };
    
    if (offerData.type) {
      newInsights.offer = {
        id: 'offer-suggestion-main',
        title: `${currentCompany?.name || 'Category'} Re-engagement Offer`,
        description: `Strategic discount offer targeting high-value lapsed customers to drive category re-engagement and revenue recovery`,
        successMetrics: "Offer redemption rate, category revenue recovery, and customer lifetime value improvement",
        bestPractices: [
          "Segment discount levels based on customer propensity to respond",
          "Set minimum spend thresholds close to historical average order values", 
          "Use time-limited offers to create urgency and drive immediate action",
          "Track both immediate revenue and follow-on purchase behavior"
        ]
      };
    }

    // Audience insights
    if (offerData.audience) {
      newInsights.audience = {
        id: 'audience-suggestion-lapsed',
        insight: "High-value lapsed customers represent significant revenue recovery opportunity with strong historical spending patterns.",
        recommendation: "Use targeted discount offers with urgency to drive immediate re-engagement and category recovery.",
        impact: "Recovery offers typically achieve 25-35% redemption rates and generate 3x ROI when properly targeted.",
        tips: [
          "Segment discount levels based on historical spend patterns",
          "Create urgency with limited-time promotional windows",
          "Follow up with related product recommendations post-purchase"
        ]
      };
    }

    // Discount insights
    if (offerData.discountVariants.length > 0) {
      const avgDiscount = offerData.discountVariants.reduce((sum, variant) => 
        sum + variant.discountPercent * (parseFloat(variant.targetSize) / 100), 0
      );
      
      newInsights.discount = {
        id: 'discount-suggestion-1',
        insight: `Multi-segment discount strategy with ${avgDiscount.toFixed(1)}% weighted average provides optimal balance of redemption and profitability.`,
        recommendation: "Current discount segmentation aligns with customer value tiers and propensity to respond.",
        impact: "Segmented discounting typically improves ROI by 20-30% compared to single-discount approaches.",
        optimization: "Monitor redemption rates by segment and adjust discount levels based on performance data."
      };
    }
    
    setAiInsights(newInsights);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    const offerToCreate = {
      ...offerData,
      id: Date.now(),
      status: offerData.startDate && offerData.endDate ? 'Scheduled' : 'Draft',
      redemptions: 0,
      revenue: 0,
      cost: 0,
      roi: 0,
      isModified: isModifyMode,
      companyId: currentCompany?.id || 'default'
    };
    
    console.log('Creating/modifying offer:', offerToCreate);
    
    if (onOfferCreated) {
      onOfferCreated(offerToCreate);
    }
    
    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'event',
        title: `Offer ${isModifyMode ? 'Modified' : 'Created'}: ${offerToCreate.title || 'New Offer'}`,
        message: `Promotional offer has been ${offerToCreate.status === 'Scheduled' ? 'scheduled' : isModifyMode ? 'updated' : 'created as draft'}.`,
        time: 'Just now',
        icon: 'Tag',
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
        return offerData.title && offerData.type && offerData.audience;
      case 2:
        return offerData.discountVariants.length > 0 && offerData.minimumSpend;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Navigation handler
  const handleStepChange = (newStep) => {
    if (newStep > step && !isStepValid(step)) {
      return;
    }
    setStep(newStep);
  };

  // Style objects
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
    }
  };

  // Generate the AI insights panel
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
              Analyzing offer configuration and generating insights...
            </p>
          </div>
        </div>
      );
    }
    
    // Return insights based on current step
    const baseInsightStyle = {
      background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.02) 100%)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid rgba(26, 76, 73, 0.15)',
      boxShadow: '0 4px 20px rgba(26, 76, 73, 0.08)'
    };

    switch(step) {
      case 1:
        return aiInsights.offer ? (
          <div style={baseInsightStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Sparkles size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
                  AI Offer Optimization
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  Optimized offer configuration for maximum ROI
                </p>
              </div>
            </div>
            <div>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: COLORS.evergreen,
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Recommended Offer Title
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
                {aiInsights.offer.title}
              </div>
              
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
                {aiInsights.offer.bestPractices.map((practice, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{practice}</li>
                ))}
              </ul>
              
              {appliedSuggestions.has(aiInsights.offer.id) ? (
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
                  onClick={() => applySuggestion(aiInsights.offer.id, {
                    title: aiInsights.offer.title,
                    description: aiInsights.offer.description
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
                >
                  <CheckCircle size={16} />
                  Apply AI Suggestions
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={baseInsightStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Brain size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  Complete the offer basics to receive personalized recommendations
                </p>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return aiInsights.discount ? (
          <div style={baseInsightStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Percent size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
                  Discount Optimization
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  AI-optimized discount segments for maximum ROI
                </p>
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
                  {aiInsights.discount.insight}
                </p>
              </div>
              {aiInsights.discount.optimization && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
                  borderRadius: '0.75rem',
                  borderLeft: '4px solid #FFC107'
                }}>
                  <Lightbulb size={16} style={{ color: '#FFC107' }} />
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyx,
                    margin: 0,
                    lineHeight: 1.6
                  }}>
                    {aiInsights.discount.optimization}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={baseInsightStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Brain size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  Configure discount variants to receive optimization insights
                </p>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return predictiveMetrics ? (
          <div style={baseInsightStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <BarChart2 size={22} style={{ color: COLORS.evergreen, marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
                  Offer Performance Prediction
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                  Updated predictions based on your discount configuration
                </p>
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
                  { label: 'Redemption Rate', value: `${predictiveMetrics.redemptionRate}%`, change: 'estimated' },
                  { label: 'Revenue Impact', value: `$${predictiveMetrics.influencedRevenue}K`, change: 'projected' },
                  { label: 'Program ROI', value: `${predictiveMetrics.estimatedROI}%`, change: 'estimated' },
                  { label: 'Discount Cost', value: `$${predictiveMetrics.totalDiscountCost}K`, change: 'investment' }
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
                      color: metric.change === 'investment' ? COLORS.onyxMedium : COLORS.green
                    }}>
                      {metric.change !== 'investment' && <ArrowUpRight size={12} />}
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
                <span>Segmented discounting optimized for {predictiveMetrics.avgDiscountPercent}% average discount</span>
              </div>
            </div>
          </div>
        ) : null;
        
      default:
        return null;
    }
  };

  // Enhanced render form content function
  const renderFormContent = () => {
    switch(step) {
      case 1:
        return (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            {/* Header Section */}
            <div style={{ 
              marginBottom: '2.5rem',
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.03) 100%)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(26, 76, 73, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1A4C49 0%, #4D9892 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 8px 24px rgba(26, 76, 73, 0.3)'
              }}>
                <Tag size={32} color="white" />
              </div>
              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                margin: '0 0 0.5rem 0' 
              }}>
                Offer Configuration
              </h3>
              <p style={{ 
                fontSize: '1rem', 
                color: COLORS.onyxMedium, 
                margin: 0,
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.5
              }}>
                Define the core details of your promotional offer to drive customer re-engagement
              </p>
            </div>

            {/* Offer Title */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: COLORS.onyx,
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Offer Title *
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  value={offerData.title}
                  onChange={(e) => updateOfferData('title', e.target.value)}
                  placeholder="Enter descriptive offer title"
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = COLORS.evergreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(26, 76, 73, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }}
                  maxLength={50}
                />
                <Edit size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: COLORS.onyxMedium
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.5rem'
              }}>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Make it descriptive and compelling
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: offerData.title.length > 40 ? COLORS.orange : COLORS.onyxMedium 
                }}>
                  {offerData.title.length}/50
                </span>
              </div>
            </div>

            {/* Offer Description */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: COLORS.onyx,
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Offer Description *
              </label>
              <textarea 
                value={offerData.description}
                onChange={(e) => updateOfferData('description', e.target.value)}
                placeholder="Describe the offer benefits and value proposition for customers"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  borderRadius: '0.75rem',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'white',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  lineHeight: 1.5
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.evergreen;
                  e.target.style.boxShadow = `0 0 0 3px rgba(26, 76, 73, 0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}
                maxLength={200}
                rows={4}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.5rem'
              }}>
                <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  Explain the customer value and benefits
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: offerData.description.length > 160 ? COLORS.orange : COLORS.onyxMedium 
                }}>
                  {offerData.description.length}/200
                </span>
              </div>
            </div>
            
            {/* Offer Type Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: COLORS.onyx,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Offer Type *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {[
                  { 
                    value: 'category_discount', 
                    title: 'Category Discount', 
                    desc: 'Percentage discount on specific product category purchases', 
                    icon: Percent,
                    highlight: 'Most popular for re-engagement'
                  },
                  { 
                    value: 'cashback_reward', 
                    title: 'Cashback Reward', 
                    desc: 'Cashback credited to customer account for future purchases', 
                    icon: DollarSign,
                    highlight: 'Drives future visits'
                  },
                  { 
                    value: 'bundle_discount', 
                    title: 'Bundle Promotion', 
                    desc: 'Buy X Get Y free or discounted bundle offers', 
                    icon: Tag,
                    highlight: 'Increases basket size'
                  }
                ].map((type, index) => (
                  <div 
                    key={index}
                    onClick={() => updateOfferData('type', type.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${offerData.type === type.value ? COLORS.evergreen : 'rgba(0, 0, 0, 0.1)'}`,
                      backgroundColor: offerData.type === type.value ? `${COLORS.evergreen}08` : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: offerData.type === type.value ? `0 4px 20px rgba(26, 76, 73, 0.15)` : '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (offerData.type !== type.value) {
                        e.target.style.borderColor = 'rgba(26, 76, 73, 0.3)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (offerData.type !== type.value) {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: offerData.type === type.value ? COLORS.evergreen : 'rgba(26, 76, 73, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}>
                      <type.icon size={24} style={{ 
                        color: offerData.type === type.value ? 'white' : COLORS.evergreen 
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: COLORS.onyx,
                        marginBottom: '0.25rem'
                      }}>
                        {type.title}
                        {type.highlight && (
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: COLORS.evergreen,
                            marginLeft: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'rgba(26, 76, 73, 0.1)',
                            borderRadius: '0.375rem'
                          }}>
                            {type.highlight}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        lineHeight: 1.4
                      }}>
                        {type.desc}
                      </div>
                    </div>
                    {offerData.type === type.value && (
                      <CheckCircle size={20} style={{ 
                        color: COLORS.evergreen,
                        flexShrink: 0
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: COLORS.onyx,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Target Audience *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { 
                    value: 'High-Value Lapsed Customers', 
                    desc: 'Previous high-spending customers who haven\'t purchased recently', 
                    icon: Target,
                    badge: 'Recommended'
                  },
                  { 
                    value: 'Category Lapsed Customers', 
                    desc: 'Customers who have stopped purchasing from specific categories', 
                    icon: Users,
                    badge: null
                  },
                  { 
                    value: 'At Risk Customers', 
                    desc: 'High-value customers showing signs of declining engagement', 
                    icon: AlertCircle,
                    badge: null
                  },
                  { 
                    value: 'Price-Sensitive Customers', 
                    desc: 'Customers who respond well to discount offers', 
                    icon: DollarSign,
                    badge: null
                  }
                ].map((audience, index) => (
                  <div 
                    key={index}
                    onClick={() => updateOfferData('audience', audience.value)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${offerData.audience === audience.value ? COLORS.evergreen : 'rgba(0, 0, 0, 0.1)'}`,
                      backgroundColor: offerData.audience === audience.value ? `${COLORS.evergreen}08` : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: offerData.audience === audience.value ? `0 4px 20px rgba(26, 76, 73, 0.15)` : '0 2px 8px rgba(0, 0, 0, 0.05)',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (offerData.audience !== audience.value) {
                        e.target.style.borderColor = 'rgba(26, 76, 73, 0.3)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (offerData.audience !== audience.value) {
                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }
                    }}
                  >
                    {audience.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '1rem',
                        backgroundColor: COLORS.evergreen,
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 8px rgba(26, 76, 73, 0.3)'
                      }}>
                        {audience.badge}
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: offerData.audience === audience.value ? COLORS.evergreen : 'rgba(26, 76, 73, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}>
                        <audience.icon size={20} style={{ 
                          color: offerData.audience === audience.value ? 'white' : COLORS.evergreen 
                        }} />
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: COLORS.onyx,
                          marginBottom: '0.25rem'
                        }}>
                          {audience.value}
                        </div>
                        {offerData.audience === audience.value && (
                          <CheckCircle size={16} style={{ 
                            color: COLORS.evergreen
                          }} />
                        )}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: COLORS.onyxMedium,
                      lineHeight: 1.4
                    }}>
                      {audience.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            {/* Header Section */}
            <div style={{ 
              marginBottom: '2.5rem',
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.05) 0%, rgba(77, 152, 146, 0.03) 100%)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(26, 76, 73, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1A4C49 0%, #4D9892 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 8px 24px rgba(26, 76, 73, 0.3)'
              }}>
                <Percent size={32} color="white" />
              </div>
              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                margin: '0 0 0.5rem 0' 
              }}>
                Discount Configuration
              </h3>
              <p style={{ 
                fontSize: '1rem', 
                color: COLORS.onyxMedium, 
                margin: 0,
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.5
              }}>
                Configure smart discount variants optimized for different customer segments
              </p>
            </div>

            {/* Offer Parameters */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1.5rem', 
              marginBottom: '2.5rem' 
            }}>
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.02) 100%)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(26, 76, 73, 0.1)'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: COLORS.onyx,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <DollarSign size={16} style={{ color: COLORS.evergreen }} />
                  Minimum Spend
                </label>
                <input 
                  type="number"
                  value={offerData.minimumSpend}
                  onChange={(e) => updateOfferData('minimumSpend', e.target.value)}
                  placeholder="40"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderRadius: '0.5rem',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = COLORS.evergreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(26, 76, 73, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium,
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  Threshold to qualify for offer
                </div>
              </div>
              
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.02) 100%)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(26, 76, 73, 0.1)'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: COLORS.onyx,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <Clock size={16} style={{ color: COLORS.evergreen }} />
                  Valid Days
                </label>
                <input 
                  type="number"
                  value={offerData.validDays}
                  onChange={(e) => updateOfferData('validDays', e.target.value)}
                  placeholder="90"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderRadius: '0.5rem',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = COLORS.evergreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(26, 76, 73, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium,
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  Offer validity period
                </div>
              </div>
            </div>

            {/* Enhanced Discount Variants Section */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(26, 76, 73, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Percent size={20} style={{ color: COLORS.evergreen }} />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    Smart Discount Segments
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyxMedium,
                    margin: 0
                  }}>
                    AI-optimized discount levels for different customer propensities
                  </p>
                </div>
              </div>

              <div style={{
                border: '1px solid rgba(26, 76, 73, 0.15)',
                borderRadius: '1rem',
                backgroundColor: 'white',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid rgba(26, 76, 73, 0.1)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: COLORS.evergreen,
                  backgroundColor: 'rgba(26, 76, 73, 0.03)'
                }}>
                  <Brain size={16} />
                  <span>Configure discount levels for optimal customer targeting</span>
                </div>
                
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {offerData.discountVariants.map((variant, index) => (
                    <div key={variant.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(26, 76, 73, 0.1)',
                      backgroundColor: 'rgba(26, 76, 73, 0.02)',
                      transition: 'all 0.2s ease'
                    }}>
                      {/* Segment Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.5rem'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: variant.id === 'high_discount' ? '#E31837' : 
                                            variant.id === 'medium_discount' ? '#FFC107' : '#4CAF50'
                          }} />
                          <h5 style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: COLORS.onyx,
                            margin: 0
                          }}>
                            {variant.name}
                          </h5>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: COLORS.onyxMedium,
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'white',
                            borderRadius: '0.375rem',
                            border: '1px solid rgba(0, 0, 0, 0.1)'
                          }}>
                            {variant.targetSize} of audience
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.75rem',
                          color: COLORS.onyxMedium,
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {variant.description}
                        </p>
                      </div>
                      
                      {/* Discount Control */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(0, 0, 0, 0.1)'
                      }}>
                        <button
                          onClick={() => updateDiscountVariant(variant.id, 'discountPercent', Math.max(5, variant.discountPercent - 1))}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                            e.target.style.borderColor = COLORS.evergreen;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          <Minus size={14} style={{ color: COLORS.onyxMedium }} />
                        </button>
                        
                        <div style={{
                          minWidth: '60px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: COLORS.evergreen
                          }}>
                            {variant.discountPercent}%
                          </div>
                        </div>
                        
                        <button
                          onClick={() => updateDiscountVariant(variant.id, 'discountPercent', Math.min(50, variant.discountPercent + 1))}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.05)';
                            e.target.style.borderColor = COLORS.evergreen;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          <Plus size={14} style={{ color: COLORS.onyxMedium }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
                Review & Launch
              </h3>
              <p style={{ fontSize: '1rem', color: COLORS.onyxMedium, margin: 0 }}>
                Review your offer configuration and performance predictions
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Offer Summary */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.03) 0%, rgba(77, 152, 146, 0.02) 100%)',
                border: '1px solid rgba(26, 76, 73, 0.15)',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(26, 76, 73, 0.12)'
              }}>
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
                    <Tag size={32} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      color: COLORS.onyx,
                      margin: '0 0 0.75rem 0',
                      lineHeight: '1.2'
                    }}>
                      {offerData.title || 'New Promotional Offer'}
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
                        {offerData.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span style={{ color: COLORS.onyxLight }}>•</span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyxMedium,
                        fontWeight: '500'
                      }}>
                        {offerData.audience}
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
                        {offerData.startDate && offerData.endDate ? 'Scheduled' : 'Draft'}
                      </div>
                    </div>
                    {offerData.description && (
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
                        {offerData.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Discount Variants Summary */}
                <div style={{ padding: '2rem' }}>
                  <h5 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    margin: '0 0 1rem 0'
                  }}>
                    Discount Configuration
                  </h5>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}>
                    {offerData.discountVariants.map((variant, index) => (
                      <div key={variant.id} style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(26, 76, 73, 0.1)',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: COLORS.evergreen,
                          marginBottom: '0.5rem'
                        }}>
                          {variant.discountPercent}%
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: COLORS.onyx,
                          marginBottom: '0.25rem'
                        }}>
                          {variant.name.split(' ')[0]} Segment
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: COLORS.onyxMedium
                        }}>
                          {variant.targetSize} of audience
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isOpen) return null;
  
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isModifyMode ? 'Modify Offer Implementation' : 'Create Promotional Offer'}
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
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '0.25rem',
          backgroundColor: '#fafbfc',
          overflowX: 'auto'
        }}>
          {[
            { num: 1, name: 'Offer Basics', icon: Settings },
            { num: 2, name: 'Discount Structure', icon: Percent },
            { num: 3, name: 'Review & Launch', icon: CheckCircle }
          ].map(stepInfo => (
            <div 
              key={stepInfo.num} 
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                minWidth: 'fit-content',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
                cursor: stepInfo.num < step ? 'pointer' : 'default',
                opacity: stepInfo.num <= step ? 1 : 0.6
              }}
              onClick={() => stepInfo.num < step && handleStepChange(stepInfo.num)}
            >
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                backgroundColor: stepInfo.num === step ? COLORS.evergreen : 
                                stepInfo.num < step ? 'rgba(26, 76, 73, 0.1)' : 
                                'rgba(0, 0, 0, 0.05)',
                color: stepInfo.num === step ? 'white' : 
                       stepInfo.num < step ? COLORS.evergreen : 
                       COLORS.onyxMedium,
                boxShadow: stepInfo.num === step ? '0 2px 8px rgba(26, 76, 73, 0.3)' : 'none'
              }}>
                {stepInfo.num < step ? (
                  <CheckCircle size={18} />
                ) : (
                  <stepInfo.icon size={18} />
                )}
              </div>
              
              <span style={{
                marginLeft: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: stepInfo.num === step ? 600 : 500,
                color: stepInfo.num === step ? COLORS.onyx : COLORS.onyxMedium,
                whiteSpace: 'nowrap'
              }}>
                {stepInfo.name}
              </span>
              
              {stepInfo.num < 3 && (
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
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Side - AI Insights */}
          <div style={{
            width: showPreview ? '30%' : '40%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, rgba(26, 76, 73, 0.02) 0%, rgba(77, 152, 146, 0.01) 100%)',
            borderRight: '1px solid rgba(26, 76, 73, 0.1)'
          }}>
            <div style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }} ref={contentRef}>
              {renderAiInsightsPanel()}
            </div>
          </div>
          
          {/* Right Side - Form Content */}
          <div style={{
            width: showPreview ? '50%' : '60%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fafbfc'
          }}>
            <div style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}>
              {renderFormContent()}
            </div>
          </div>
          
          {/* Optional Preview Panel */}
          {showPreview && (
            <div style={{
              width: '20%',
              backgroundColor: '#f5f7f8',
              borderLeft: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
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
                  Offer Preview
                </div>
                <div style={{
                  flex: 1,
                  padding: '1.5rem',
                  overflowY: 'auto'
                }}>
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
                      {offerData.title || "New Promotional Offer"}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyxMedium,
                      marginBottom: '0.25rem'
                    }}>
                      {offerData.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: COLORS.onyxMedium,
                      marginBottom: '1rem'
                    }}>
                      {offerData.audience}
                    </p>
                    {offerData.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: COLORS.onyx,
                        lineHeight: '1.5',
                        margin: '1rem 0',
                        padding: '1rem',
                        backgroundColor: 'rgba(26, 76, 73, 0.05)',
                        borderRadius: '0.5rem'
                      }}>
                        {offerData.description}
                      </p>
                    )}
                    {offerData.discountVariants.length > 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        color: COLORS.evergreen,
                        fontWeight: 500
                      }}>
                        <Percent size={16} />
                        <span>
                          {Math.round(offerData.discountVariants.reduce((sum, v) => 
                            sum + v.discountPercent * (parseFloat(v.targetSize) / 100), 0
                          ))}% avg discount
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <button 
            onClick={() => step > 1 ? handleStepChange(step - 1) : onClose()}
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
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {step < 3 && !isStepValid(step) && (
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
              onClick={() => step < 3 ? handleStepChange(step + 1) : handleSubmit()}
              disabled={!isStepValid(step) && step < 3}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: 'none',
                cursor: (!isStepValid(step) && step < 3) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                backgroundColor: isStepValid(step) || step === 3 ? COLORS.evergreen : '#cccccc',
                opacity: (!isStepValid(step) && step < 3) ? 0.7 : 1
              }}
            >
              {step < 3 ? (
                <>
                  Continue
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  {isModifyMode ? 'Save Changes' : 'Create Offer'}
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

export default OfferCreationModal;
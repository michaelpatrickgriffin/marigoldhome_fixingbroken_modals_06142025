import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, Calendar, Users, Target, Zap, Award, 
  ArrowUpRight, BarChart2, Mail, Send, Bell, Instagram, 
  Facebook, MessageSquare, Smartphone, Globe, Check, Briefcase,
  Tag, AlertTriangle
} from 'lucide-react';

// Define colors directly in the component
const COLORS = {
  // Base colors
  evergreen: '#1A4C49',
  evergreenLight: '#4D9892',
  onyx: '#333333',
  onyxMedium: '#666666',
  onyxSoft: '#999999',
  shell: '#F5F7F8',
  
  // Semantic colors
  green: '#4CAF50',
  yellow: '#FFC107',
  red: '#F44336',
  blue: '#2196F3',
  
  // Dark theme colors for cards
  darkShell: '#1e2a2b',
  darkText: 'rgba(255, 255, 255, 0.95)',
  darkTextMedium: 'rgba(255, 255, 255, 0.75)',
  darkTextLight: 'rgba(255, 255, 255, 0.5)',
  darkTeal: '#4D9892',
  darkTealDark: '#1A4C49',
  darkGray: '#637381',
  darkAccent: '#7B9CFF',
  darkSuccess: '#4CAF50',
  darkDanger: '#F44336',
};

const SplitCampaignCreationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    title: '',
    type: '', // No default type selected
    audience: '',
    startDate: '',
    endDate: '',
    description: '',
    objective: '',
    budget: '',
    channels: []
  });
  
  // States for enhanced predictive analytics
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [predictiveMetrics, setPredictiveMetrics] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      // Reset to initial state when modal opens
      setStep(1);
      setCampaignData({
        title: '',
        type: '', // No default type selected
        audience: '',
        startDate: '',
        endDate: '',
        description: '',
        objective: '',
        budget: '',
        channels: []
      });
      setAiSuggestions({});
      setPredictiveMetrics(null);
      setIsAnalyzing(false);
    }
  }, [isOpen]);
  
  // Update campaign data with initial suggestions for Promotional type
  useEffect(() => {
    // Trigger initial suggestion generation when component mounts
    if (isOpen && campaignData.type === 'Promotional') {
      setIsAnalyzing(true);
      setTimeout(() => {
        generateAiSuggestions('type', 'Promotional');
        setIsAnalyzing(false);
      }, 800);
    }
  }, [isOpen, campaignData.type]);

  // Update campaign data
  const updateCampaignData = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Simulate AI analyzing the changes
    if (['audience', 'type', 'objective', 'channels'].includes(field)) {
      setIsAnalyzing(true);
      setTimeout(() => {
        generateAiSuggestions(field, value);
        setIsAnalyzing(false);
      }, 800);
    }
  };
  
  // Generate AI suggestions based on field changes
  const generateAiSuggestions = (field, value) => {
    // Simulate AI generated suggestions
    let newSuggestions = {...aiSuggestions};
    
    if (field === 'type' && value === 'Promotional') {
      newSuggestions.campaign = {
        title: "Winter Gear Flash Sale",
        description: "Limited-time promotion on our premium winter gear collection, featuring 30% off select items.",
        timing: "Recommend launching on Friday for 38% higher engagement based on historical data."
      };
      
      // Add predictive metrics for any promotional campaign
      setPredictiveMetrics({
        estimatedOpenRate: 32.4,
        estimatedClickRate: 4.8,
        estimatedConversion: 3.2,
        estimatedROI: 245
      });
    } else if (field === 'type' && value === 'Product Launch') {
      newSuggestions.campaign = {
        title: "Introducing Trailblazer Collection",
        description: "Be the first to explore our revolutionary new Trailblazer hiking gear, designed for maximum comfort and durability.",
        timing: "Recommend 2-week teaser campaign before launch for 45% higher awareness."
      };
      
      // Add predictive metrics for any product launch
      setPredictiveMetrics({
        estimatedOpenRate: 38.5,
        estimatedClickRate: 5.6,
        estimatedConversion: 4.1,
        estimatedROI: 275
      });
    } else if (field === 'audience' && value === 'Outdoor Enthusiasts') {
      newSuggestions.audience = {
        insight: "This segment shows 42% higher conversion rates for premium products and responds well to adventure-focused messaging.",
        channels: ["Email", "Instagram", "Push Notification"],
        timing: "Highest engagement on Thursdays and weekends."
      };
      
      // Update predictive metrics
      setPredictiveMetrics({
        estimatedOpenRate: 34.8,
        estimatedClickRate: 5.2,
        estimatedConversion: 3.8,
        estimatedROI: 284
      });
    } else if (field === 'audience' && value === 'Winter Sports') {
      newSuggestions.audience = {
        insight: "This segment has shown the highest loyalty program participation (68%) and highest average order value ($210).",
        channels: ["Email", "SMS", "Instagram"],
        timing: "Highest engagement on weekends and early mornings."
      };
      
      // Update predictive metrics
      setPredictiveMetrics({
        estimatedOpenRate: 42.3,
        estimatedClickRate: 6.8,
        estimatedConversion: 4.5,
        estimatedROI: 312
      });
    } else if (field === 'audience' && value === 'Summit Tier') {
      newSuggestions.audience = {
        insight: "This premium segment has 3.2x higher LTV than average members and responds best to exclusive offers and early access.",
        channels: ["Email", "SMS"],
        timing: "Evening engagement peaks between 7-9pm."
      };
      
      // Update predictive metrics for Summit Tier
      setPredictiveMetrics({
        estimatedOpenRate: 45.2,
        estimatedClickRate: 7.8,
        estimatedConversion: 5.4,
        estimatedROI: 340
      });
    } else if (field === 'objective' && value === 'Sales') {
      newSuggestions.content = {
        headline: "Time-limited offer messaging performs 35% better for 'Sales' objectives.",
        cta: "Use 'Shop Now' or 'Save Today' for 28% higher click-through rate.",
        timing: "Highest conversion periods are 8-10am and 7-9pm."
      };
    } else if (field === 'objective' && value === 'Loyalty') {
      newSuggestions.content = {
        headline: "Exclusive member benefits messaging performs 42% better for 'Loyalty' objectives.",
        cta: "Use 'Member Exclusive' or 'Unlock Benefits' for 31% higher engagement.",
        timing: "Highest engagement periods are weekends and evenings."
      };
    } else if (field === 'channels' && value.includes('Email')) {
      newSuggestions.email = {
        subject: "Subject lines with personalization increase open rates by 22%.",
        timing: "Tuesday and Thursday mornings show highest open rates for this segment.",
        content: "Including product recommendations based on past purchases increases conversion by 38%."
      };
    } else if (field === 'channels' && value.includes('SMS')) {
      newSuggestions.sms = {
        message: "Short, urgent messages with clear CTAs perform 45% better in SMS.",
        timing: "Sending between 12-2pm yields 28% higher engagement.",
        cta: "Include a simple shortened URL for 32% higher click-through rate."
      };
    }
    
    setAiSuggestions(newSuggestions);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Here would be the logic to save the new campaign
    console.log('Creating campaign:', campaignData);
    onClose();
  };
  
  // Generate the AI recommendation panel based on current step
  const renderAiRecommendationPanel = () => {
    if (isAnalyzing) {
      return (
        <div className="ai-analyzing-panel">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="loading-spinner"></div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>
              Analyzing campaign settings and generating recommendations...
            </p>
          </div>
        </div>
      );
    }
    
    switch(step) {
      case 1:
        return aiSuggestions.campaign ? (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Campaign Recommendations
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Suggested Title
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.75rem' }}>
                      {aiSuggestions.campaign.title}
                    </p>
                    
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Description
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {aiSuggestions.campaign.description}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Timing Recommendation
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.75rem' }}>
                      {aiSuggestions.campaign.timing}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.875rem',
                      color: COLORS.green,
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.25rem',
                      marginTop: '0.5rem'
                    }}>
                      <ArrowUpRight size={16} style={{ marginRight: '0.5rem' }} />
                      <span>Click "Apply Suggestions" to use these recommendations</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCampaignData(prev => ({
                      ...prev,
                      title: aiSuggestions.campaign.title,
                      description: aiSuggestions.campaign.description
                    }));
                  }}
                  className="apply-suggestion-btn"
                >
                  <Check size={16} style={{ marginRight: '0.5rem' }} />
                  Apply Suggestions
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  Select a campaign type and fill in your campaign details to receive AI-powered recommendations on naming, targeting, and optimization.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return aiSuggestions.audience ? (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Target size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Audience Insights
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Audience Behavior
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.75rem' }}>
                      {aiSuggestions.audience.insight}
                    </p>
                    
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Best Time to Engage
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {aiSuggestions.audience.timing}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Recommended Channels
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {aiSuggestions.audience.channels.map((channel, index) => (
                        <div 
                          key={index}
                          className="channel-tag"
                        >
                          {channel === 'Email' && <Mail size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'SMS' && <MessageSquare size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'Instagram' && <Instagram size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'Push Notification' && <Bell size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        setCampaignData(prev => ({
                          ...prev,
                          channels: aiSuggestions.audience.channels
                        }));
                      }}
                      className="apply-suggestion-btn"
                    >
                      <Check size={16} style={{ marginRight: '0.5rem' }} />
                      Apply Channel Recommendations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  Select an audience segment to receive targeted recommendations based on historical engagement and behavior patterns.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return aiSuggestions.content ? (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Content & Channel Recommendations
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Headline Strategy
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.75rem' }}>
                      {aiSuggestions.content.headline}
                    </p>
                    
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Call-to-Action
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {aiSuggestions.content.cta}
                    </p>
                  </div>
                  <div>
                    {aiSuggestions.email && (
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem', display: 'flex', alignItems: 'center' }}>
                          <Mail size={14} style={{ marginRight: '0.375rem' }} /> Email Recommendations
                        </p>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyx, marginBottom: '0.25rem' }}>
                          • {aiSuggestions.email.subject}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyx, marginBottom: '0.25rem' }}>
                          • {aiSuggestions.email.timing}
                        </p>
                      </div>
                    )}
                    
                    {aiSuggestions.sms && (
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginBottom: '0.25rem', display: 'flex', alignItems: 'center' }}>
                          <MessageSquare size={14} style={{ marginRight: '0.375rem' }} /> SMS Recommendations
                        </p>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyx, marginBottom: '0.25rem' }}>
                          • {aiSuggestions.sms.message}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyx }}>
                          • {aiSuggestions.sms.timing}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  Select campaign objectives and distribution channels to receive tailored content and timing recommendations.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return predictiveMetrics ? (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <BarChart2 size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
                  Campaign Performance Prediction
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Est. Open Rate
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
                      {predictiveMetrics.estimatedOpenRate}%
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem',
                      color: COLORS.green,
                      marginTop: '0.25rem'
                    }}>
                      <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                      <span>+{(predictiveMetrics.estimatedOpenRate - 28.2).toFixed(1)}% vs. avg</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Est. Click Rate
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
                      {predictiveMetrics.estimatedClickRate}%
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem',
                      color: COLORS.green,
                      marginTop: '0.25rem'
                    }}>
                      <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                      <span>+{(predictiveMetrics.estimatedClickRate - 3.4).toFixed(1)}% vs. avg</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Est. Conversion
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
                      {predictiveMetrics.estimatedConversion}%
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem',
                      color: COLORS.green,
                      marginTop: '0.25rem'
                    }}>
                      <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                      <span>+{(predictiveMetrics.estimatedConversion - 2.5).toFixed(1)}% vs. avg</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Est. ROI
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.green }}>
                      {predictiveMetrics.estimatedROI}%
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem',
                      color: COLORS.green,
                      marginTop: '0.25rem'
                    }}>
                      <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                      <span>+{(predictiveMetrics.estimatedROI - 185).toFixed(1)}% vs. avg</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%',
                    backgroundColor: COLORS.evergreen,
                    marginRight: '0.5rem'
                  }}></div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>
                    This campaign is forecasted to perform {Math.round((predictiveMetrics.estimatedROI - 185) / 1.85)}% better than average campaigns
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ai-recommendation-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Zap size={22} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  AI Performance Prediction
                </p>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  Review your campaign settings to see AI-powered performance predictions based on historical data and audience behavior.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render preview content based on current step
  const renderPreview = () => {
    // Default preview - show when no specific preview is available
    const defaultPreview = (
      <div className="preview-placeholder">
        <div style={{ textAlign: 'center', padding: '2rem', color: COLORS.onyxMedium }}>
          <Mail size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {campaignData.title || "Campaign Preview"}
          </h3>
          <p style={{ fontSize: '0.875rem' }}>
            Complete the form to see your campaign preview
          </p>
        </div>
      </div>
    );

    // Email preview
    const emailPreview = (
      <div className="preview-container">
        <div className="preview-header">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
            Email Preview
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="preview-view-btn active">
              Desktop
            </button>
            <button className="preview-view-btn">
              Mobile
            </button>
          </div>
        </div>
        
        <div className="preview-content">
          {/* Email Template */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
              {/* Email Header */}
              <div style={{ backgroundColor: '#1A4C49', padding: '20px', textAlign: 'center' }}>
                <img 
                  src="/api/placeholder/180/40" 
                  alt="Company Logo" 
                  style={{ height: '40px' }}
                />
              </div>
              
              {/* Hero Image */}
              <div style={{ position: 'relative' }}>
                <img 
                  src="/api/placeholder/600/300" 
                  alt="Campaign Hero" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  right: '0',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: '20px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '600' }}>
                    {campaignData.title || "Newton Ridge™ Plus II"}
                  </h2>
                  <p style={{ margin: '8px 0 0', fontSize: '16px' }}>
                    {campaignData.type === "Product Launch" ? "New Product Launch" : 
                     campaignData.type === "Promotional" ? "Limited Time Offer" : 
                     "Special Announcement"}
                  </p>
                </div>
              </div>
              
              {/* Main Content */}
              <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                <h1 style={{ color: '#1A4C49', fontSize: '28px', margin: '0 0 20px' }}>
                  {campaignData.type === "Product Launch" ? "Introducing Our Latest Innovation" : 
                   campaignData.type === "Promotional" ? "Special Limited-Time Offer" : 
                   "We Have News To Share"}
                </h1>
                <p style={{ color: '#444', fontSize: '16px', lineHeight: '1.5', margin: '0 0 25px' }}>
                  {campaignData.description || "With classic mountaineering style, this iconic product features waterproof-breathable construction, light cushioning for lasting comfort, and all-terrain performance."}
                </p>
                <div style={{ textAlign: 'center', margin: '30px 0' }}>
                  <a 
                    href="#" 
                    style={{ 
                      backgroundColor: '#1A4C49', 
                      color: 'white', 
                      padding: '12px 24px', 
                      textDecoration: 'none', 
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    {campaignData.objective === "Sales" ? "SHOP NOW" : 
                     campaignData.objective === "Awareness" ? "LEARN MORE" : 
                     campaignData.objective === "Loyalty" ? "MEMBER EXCLUSIVE" : 
                     "SHOP NOW"}
                  </a>
                </div>
              </div>
              
              {/* Features */}
              <div style={{ backgroundColor: '#f5f5f5', padding: '30px 20px', textAlign: 'center' }}>
                <h2 style={{ color: '#1A4C49', fontSize: '22px', margin: '0 0 20px' }}>Key Features</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ flex: '1', minWidth: '150px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ color: '#1A4C49', fontSize: '16px', margin: '0 0 10px' }}>Feature 1</h3>
                    <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                      Key benefit description highlighting the value proposition.
                    </p>
                  </div>
                  <div style={{ flex: '1', minWidth: '150px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ color: '#1A4C49', fontSize: '16px', margin: '0 0 10px' }}>Feature 2</h3>
                    <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                      Another key benefit that provides value to your customers.
                    </p>
                  </div>
                  <div style={{ flex: '1', minWidth: '150px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ color: '#1A4C49', fontSize: '16px', margin: '0 0 10px' }}>Feature 3</h3>
                    <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                      Third important benefit or feature that customers care about.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div style={{ backgroundColor: '#1A4C49', padding: '20px', textAlign: 'center', color: 'white' }}>
                <div style={{ marginBottom: '15px' }}>
                  <a href="#" style={{ color: 'white', margin: '0 10px', fontSize: '14px', textDecoration: 'none' }}>Shop</a>
                  <a href="#" style={{ color: 'white', margin: '0 10px', fontSize: '14px', textDecoration: 'none' }}>Account</a>
                  <a href="#" style={{ color: 'white', margin: '0 10px', fontSize: '14px', textDecoration: 'none' }}>Customer Service</a>
                  <a href="#" style={{ color: 'white', margin: '0 10px', fontSize: '14px', textDecoration: 'none' }}>Unsubscribe</a>
                </div>
                <p style={{ fontSize: '12px', margin: '15px 0 0', color: 'rgba(255,255,255,0.8)' }}>
                  © 2025 Company. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // SMS preview
    const smsPreview = (
      <div className="preview-container">
        <div className="preview-header">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
            SMS Preview
          </span>
        </div>
        
        <div className="preview-content sms-preview">
          <div className="phone-mockup">
            <div className="phone-header">
              <div className="contact-name">Company Name</div>
              <div className="message-time">Now</div>
            </div>
            <div className="messages">
              <div className="message">
                {campaignData.title ? 
                  `${campaignData.title}: ${campaignData.description?.substring(0, 80)}${campaignData.description?.length > 80 ? '...' : ''}` : 
                  `${campaignData.type === "Product Launch" ? "NEW LAUNCH" : "SPECIAL OFFER"}: Discover our latest products with exclusive ${campaignData.audience} benefits! ${campaignData.objective === "Sales" ? "Shop now" : "Learn more"}: link.co/promo`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Audience insights preview
    const audiencePreview = (
      <div className="preview-container">
        <div className="preview-header">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
            Audience Insights: {campaignData.audience || "Not Selected"}
          </span>
        </div>
        
        <div className="preview-content">
          {campaignData.audience ? (
            <div className="audience-insights">
              <div className="insight-metrics">
                <div className="metric">
                  <div className="metric-label">Size</div>
                  <div className="metric-value">
                    {campaignData.audience === 'All Members' ? '104.6K' : 
                     campaignData.audience === 'Outdoor Enthusiasts' ? '38.8K' : 
                     campaignData.audience === 'Casual Hikers' ? '25.1K' : 
                     campaignData.audience === 'Winter Sports' ? '23.0K' : 
                     campaignData.audience === 'Summit Tier' ? '10.5K' : 
                     '14.2K'}
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Avg. Order Value</div>
                  <div className="metric-value">
                    ${campaignData.audience === 'All Members' ? '165' : 
                      campaignData.audience === 'Outdoor Enthusiasts' ? '175' : 
                      campaignData.audience === 'Casual Hikers' ? '128' : 
                      campaignData.audience === 'Winter Sports' ? '210' : 
                      campaignData.audience === 'Summit Tier' ? '325' : 
                      '105'}
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Open Rate</div>
                  <div className="metric-value">
                    {campaignData.audience === 'All Members' ? '32.4%' : 
                      campaignData.audience === 'Outdoor Enthusiasts' ? '34.8%' : 
                      campaignData.audience === 'Casual Hikers' ? '28.5%' : 
                      campaignData.audience === 'Winter Sports' ? '38.6%' : 
                      campaignData.audience === 'Summit Tier' ? '45.2%' : 
                      '37.8%'}
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Conversion Rate</div>
                  <div className="metric-value">
                    {campaignData.audience === 'All Members' ? '3.8%' : 
                      campaignData.audience === 'Outdoor Enthusiasts' ? '4.2%' : 
                      campaignData.audience === 'Casual Hikers' ? '2.5%' : 
                      campaignData.audience === 'Winter Sports' ? '5.2%' : 
                      campaignData.audience === 'Summit Tier' ? '7.8%' : 
                      '2.2%'}
                  </div>
                </div>
              </div>
              
              <h4 className="insights-heading">Behavioral Insights</h4>
              <div className="insights-list">
                <div className="insight-item">
                  <div className="insight-bullet"></div>
                  <div className="insight-text">
                    {campaignData.audience === 'All Members' ? 'Peak engagement on weekends' : 
                     campaignData.audience === 'Outdoor Enthusiasts' ? 'Highest engagement on Thursdays and weekends' : 
                     campaignData.audience === 'Casual Hikers' ? 'Prefers email over other channels' : 
                     campaignData.audience === 'Winter Sports' ? 'Responds well to limited-time offers' : 
                     campaignData.audience === 'Summit Tier' ? 'Highly interested in new product launches' : 
                     'High responsiveness to welcome offers'}
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-bullet"></div>
                  <div className="insight-text">
                    {campaignData.audience === 'All Members' ? 'Prefers personalized messaging' : 
                     campaignData.audience === 'Outdoor Enthusiasts' ? 'Responsive to adventure-themed content' : 
                     campaignData.audience === 'Casual Hikers' ? 'Value-oriented shoppers' : 
                     campaignData.audience === 'Winter Sports' ? 'High engagement with video content' : 
                     campaignData.audience === 'Summit Tier' ? 'Values exclusivity and early access' : 
                     'Product education increases conversion 32%'}
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-bullet"></div>
                  <div className="insight-text">
                    {campaignData.audience === 'All Members' ? '58% mobile, 42% desktop' : 
                     campaignData.audience === 'Outdoor Enthusiasts' ? '62% mobile users' : 
                     campaignData.audience === 'Casual Hikers' ? '54% desktop users' : 
                     campaignData.audience === 'Winter Sports' ? '73% mobile users' : 
                     campaignData.audience === 'Summit Tier' ? '68% repeat purchasers' : 
                     '85% first-time purchasers'}
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-bullet"></div>
                  <div className="insight-text">
                    {campaignData.audience === 'All Members' ? 'Social proof increases conversions 24%' : 
                     campaignData.audience === 'Outdoor Enthusiasts' ? 'Reviews influence 68% of purchases' : 
                     campaignData.audience === 'Casual Hikers' ? 'Responds to seasonal promotions' : 
                     campaignData.audience === 'Winter Sports' ? 'Free shipping highly motivating' : 
                     campaignData.audience === 'Summit Tier' ? '3.4x higher LTV than average' : 
                     'Most active in first 15 days'}
                  </div>
                </div>
              </div>
              
              <div className="audience-impact">
                <h4 className="impact-heading">Projected Campaign Impact</h4>
                <div className="impact-metrics">
                  <div className="impact-metric">
                    <div className="impact-label">Est. Engagement</div>
                    <div className="impact-value">
                      {Math.round((
                        campaignData.audience === 'All Members' ? 32.4 : 
                        campaignData.audience === 'Outdoor Enthusiasts' ? 34.8 : 
                        campaignData.audience === 'Casual Hikers' ? 28.5 : 
                        campaignData.audience === 'Winter Sports' ? 38.6 : 
                        campaignData.audience === 'Summit Tier' ? 45.2 : 37.8) * 
                        (campaignData.audience === 'All Members' ? 1045 : 
                         campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                         campaignData.audience === 'Casual Hikers' ? 251 : 
                         campaignData.audience === 'Winter Sports' ? 230 : 
                         campaignData.audience === 'Summit Tier' ? 105 : 142) / 100
                      ).toLocaleString()}
                    </div>
                  </div>
                  <div className="impact-metric">
                    <div className="impact-label">Est. Conversions</div>
                    <div className="impact-value">
                      {Math.round((
                        campaignData.audience === 'All Members' ? 3.8 : 
                        campaignData.audience === 'Outdoor Enthusiasts' ? 4.2 : 
                        campaignData.audience === 'Casual Hikers' ? 2.5 : 
                        campaignData.audience === 'Winter Sports' ? 5.2 : 
                        campaignData.audience === 'Summit Tier' ? 7.8 : 2.2) * 
                        (campaignData.audience === 'All Members' ? 1045 : 
                         campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                         campaignData.audience === 'Casual Hikers' ? 251 : 
                         campaignData.audience === 'Winter Sports' ? 230 : 
                         campaignData.audience === 'Summit Tier' ? 105 : 142) / 100
                      ).toLocaleString()}
                    </div>
                  </div>
                  <div className="impact-metric">
                    <div className="impact-label">Est. Revenue</div>
                    <div className="impact-value highlight">
                      ${Math.round((
                        campaignData.audience === 'All Members' ? 3.8 : 
                        campaignData.audience === 'Outdoor Enthusiasts' ? 4.2 : 
                        campaignData.audience === 'Casual Hikers' ? 2.5 : 
                        campaignData.audience === 'Winter Sports' ? 5.2 : 
                        campaignData.audience === 'Summit Tier' ? 7.8 : 2.2) * 
                        (campaignData.audience === 'All Members' ? 1045 : 
                         campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                         campaignData.audience === 'Casual Hikers' ? 251 : 
                         campaignData.audience === 'Winter Sports' ? 230 : 
                         campaignData.audience === 'Summit Tier' ? 105 : 142) / 100 *
                        (campaignData.audience === 'All Members' ? 165 : 
                         campaignData.audience === 'Outdoor Enthusiasts' ? 175 : 
                         campaignData.audience === 'Casual Hikers' ? 128 : 
                         campaignData.audience === 'Winter Sports' ? 210 : 
                         campaignData.audience === 'Summit Tier' ? 325 : 105)
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="preview-placeholder">
              <div style={{ textAlign: 'center', padding: '2rem', color: COLORS.onyxMedium }}>
                <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Audience Insights
                </h3>
                <p style={{ fontSize: '0.875rem' }}>
                  Select an audience segment to see detailed insights
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );

    // Campaign summary preview
    const campaignSummaryPreview = (
      <div className="preview-container">
        <div className="preview-header">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyx }}>
            Campaign Summary
          </span>
        </div>
        
        <div className="preview-content">
          <div className="campaign-summary-card">
            <div className="summary-header">
              <h3 className="summary-title">{campaignData.title || "New Campaign"}</h3>
              <div className="status-badge">
                {campaignData.startDate && campaignData.endDate ? "Scheduled" : "Draft"}
              </div>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <div className="summary-label">Type</div>
                <div className="summary-value">{campaignData.type}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Audience</div>
                <div className="summary-value">{campaignData.audience || "Not specified"}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Duration</div>
                <div className="summary-value">
                  {campaignData.startDate && campaignData.endDate ? 
                    `${campaignData.startDate} to ${campaignData.endDate}` : 
                    "Not specified"}
                </div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Objective</div>
                <div className="summary-value">{campaignData.objective || "Not specified"}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Budget</div>
                <div className="summary-value">{campaignData.budget ? `$${campaignData.budget}` : "Not specified"}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Channels</div>
                <div className="summary-value channels-list">
                  {campaignData.channels.length > 0 ? 
                    campaignData.channels.map((channel, index) => (
                      <span key={index} className="channel-badge">
                        {channel === 'Email' && <Mail size={12} style={{ marginRight: '0.25rem' }} />}
                        {channel === 'SMS' && <MessageSquare size={12} style={{ marginRight: '0.25rem' }} />}
                        {channel === 'Push Notification' && <Bell size={12} style={{ marginRight: '0.25rem' }} />}
                        {channel === 'In-app' && <Smartphone size={12} style={{ marginRight: '0.25rem' }} />}
                        {channel === 'Social Media' && <Globe size={12} style={{ marginRight: '0.25rem' }} />}
                        {channel}
                      </span>
                    )) : 
                    "Not specified"}
                </div>
              </div>
            </div>
            
            {predictiveMetrics && (
              <div className="prediction-panel">
                <h4 className="prediction-title">Performance Prediction</h4>
                <div className="prediction-metrics">
                  <div className="prediction-metric">
                    <div className="metric-value">{predictiveMetrics.estimatedOpenRate}%</div>
                    <div className="metric-label">Open Rate</div>
                    <div className="metric-comparison positive">
                      <ArrowUpRight size={12} />
                      +{(predictiveMetrics.estimatedOpenRate - 28.2).toFixed(1)}%
                    </div>
                  </div>
                  <div className="prediction-metric">
                    <div className="metric-value">{predictiveMetrics.estimatedClickRate}%</div>
                    <div className="metric-label">Click Rate</div>
                    <div className="metric-comparison positive">
                      <ArrowUpRight size={12} />
                      +{(predictiveMetrics.estimatedClickRate - 3.4).toFixed(1)}%
                    </div>
                  </div>
                  <div className="prediction-metric">
                    <div className="metric-value">{predictiveMetrics.estimatedConversion}%</div>
                    <div className="metric-label">Conv. Rate</div>
                    <div className="metric-comparison positive">
                      <ArrowUpRight size={12} />
                      +{(predictiveMetrics.estimatedConversion - 2.5).toFixed(1)}%
                    </div>
                  </div>
                  <div className="prediction-metric highlight">
                    <div className="metric-value">{predictiveMetrics.estimatedROI}%</div>
                    <div className="metric-label">ROI</div>
                    <div className="metric-comparison positive">
                      <ArrowUpRight size={12} />
                      +{(predictiveMetrics.estimatedROI - 185).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    // Return the appropriate preview based on the current step
    switch(step) {
      case 1:
        // Basic campaign details preview
        return emailPreview;
      case 2:
        // Audience preview
        return audiencePreview;
      case 3:
        // Content preview - either email or SMS based on selected channels
        return campaignData.channels.includes('Email') ? emailPreview : 
               campaignData.channels.includes('SMS') ? smsPreview : 
               defaultPreview;
      case 4:
        // Campaign summary review
        return campaignSummaryPreview;
      default:
        return defaultPreview;
    }
  };

  // Render form content based on the current step
  const renderFormContent = () => {
    switch(step) {
      case 1:
        return (
          <div>
            <h3 className="form-section-title">Campaign Details</h3>
            
            <div className="form-group">
              <label className="form-label">Campaign Title</label>
              <input 
                type="text"
                value={campaignData.title}
                onChange={(e) => updateCampaignData('title', e.target.value)}
                placeholder="Enter campaign title"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Campaign Type</label>
              <div className="campaign-type-grid">
                {[
                  { value: 'Promotional', icon: Tag },
                  { value: 'Onboarding', icon: Users },
                  { value: 'Product Launch', icon: Briefcase },
                  { value: 'Seasonal', icon: Calendar },
                  { value: 'Loyalty', icon: Award }
                ].map((type, index) => (
                  <div 
                    key={index}
                    onClick={() => updateCampaignData('type', type.value)}
                    className={`campaign-type-option ${campaignData.type === type.value ? 'active' : ''}`}
                  >
                    <div className={`type-icon-container ${campaignData.type === type.value ? 'active' : ''}`}>
                      <type.icon size={18} />
                    </div>
                    <span className={`type-label ${campaignData.type === type.value ? 'active' : ''}`}>
                      {type.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <div className="date-input-container">
                  <input 
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => updateCampaignData('startDate', e.target.value)}
                    className="form-input"
                  />
                  <Calendar size={16} className="date-icon" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">End Date</label>
                <div className="date-input-container">
                  <input 
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => updateCampaignData('endDate', e.target.value)}
                    className="form-input"
                  />
                  <Calendar size={16} className="date-icon" />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Campaign Description</label>
              <textarea 
                value={campaignData.description}
                onChange={(e) => updateCampaignData('description', e.target.value)}
                placeholder="Enter campaign description"
                className="form-textarea"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h3 className="form-section-title">Target Audience</h3>
            
            <div className="form-group">
              <label className="form-label">Audience Segment</label>
              <div className="audience-segment-grid">
                {[
                  { value: 'All Members', count: '104.6K members', description: 'Target all active loyalty program members' },
                  { value: 'Outdoor Enthusiasts', count: '38.8K members', description: 'Members with primary interest in hiking and outdoor activities' },
                  { value: 'Casual Hikers', count: '25.1K members', description: 'Occasional hikers and outdoor activity participants' },
                  { value: 'Winter Sports', count: '23.0K members', description: 'Members focused on skiing, snowboarding and winter activities' },
                  { value: 'Summit Tier', count: '10.5K members', description: 'Members in the highest loyalty tier with highest LTV' },
                  { value: 'New Members', count: '14.2K members', description: 'Members who joined within the last 30 days' },
                ].map((segment, index) => (
                  <div 
                    key={index}
                    onClick={() => updateCampaignData('audience', segment.value)}
                    className={`audience-segment-option ${campaignData.audience === segment.value ? 'active' : ''}`}
                  >
                    <div className="segment-header">
                      <div className={`radio-button ${campaignData.audience === segment.value ? 'selected' : ''}`}>
                        {campaignData.audience === segment.value && <div className="radio-dot"></div>}
                      </div>
                      <span className={`segment-title ${campaignData.audience === segment.value ? 'active' : ''}`}>
                        {segment.value}
                      </span>
                    </div>
                    <div className="segment-details">
                      <p className="segment-count">{segment.count}</p>
                      <p className="segment-description">{segment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h3 className="form-section-title">Campaign Content & Channels</h3>
            
            <div className="form-group">
              <label className="form-label">Campaign Objective</label>
              <div className="objective-options-grid">
                {[
                  { value: 'Sales', description: 'Drive immediate revenue' },
                  { value: 'Awareness', description: 'Increase brand visibility' },
                  { value: 'Engagement', description: 'Drive customer interactions' },
                  { value: 'Loyalty', description: 'Strengthen customer relationships' },
                  { value: 'Lead Generation', description: 'Collect customer information' }
                ].map((objective, index) => (
                  <div 
                    key={index}
                    onClick={() => updateCampaignData('objective', objective.value)}
                    className={`objective-option ${campaignData.objective === objective.value ? 'active' : ''}`}
                  >
                    <span className={`objective-title ${campaignData.objective === objective.value ? 'active' : ''}`}>
                      {objective.value}
                    </span>
                    <span className="objective-description">
                      {objective.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Budget</label>
              <div className="budget-input-container">
                <span className="currency-symbol">$</span>
                <input 
                  type="number"
                  value={campaignData.budget}
                  onChange={(e) => updateCampaignData('budget', e.target.value)}
                  placeholder="Enter campaign budget"
                  className="form-input with-prefix"
                />
              </div>
              {campaignData.budget && (
                <div className="budget-roi-estimate">
                  <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                  <span>
                    Estimated ROI: {campaignData.audience === 'Summit Tier' ? '540%' : 
                                    campaignData.audience === 'Winter Sports' ? '385%' : 
                                    campaignData.audience === 'Outdoor Enthusiasts' ? '320%' : 
                                    '275%'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Distribution Channels</label>
              <div className="channel-options-grid">
                {[
                  { value: 'Email', icon: Mail, description: 'Highest ROI channel' },
                  { value: 'SMS', icon: MessageSquare, description: '95% read within 3 min' },
                  { value: 'Push Notification', icon: Bell, description: 'Immediate engagement' },
                  { value: 'In-app', icon: Smartphone, description: 'High-intent audience' },
                  { value: 'Social Media', icon: Globe, description: 'Wide reach & awareness' }
                ].map((channel, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      if (campaignData.channels.includes(channel.value)) {
                        updateCampaignData('channels', campaignData.channels.filter(c => c !== channel.value));
                      } else {
                        updateCampaignData('channels', [...campaignData.channels, channel.value]);
                      }
                    }}
                    className={`channel-option ${campaignData.channels.includes(channel.value) ? 'active' : ''}`}
                  >
                    <div className={`channel-icon-container ${campaignData.channels.includes(channel.value) ? 'active' : ''}`}>
                      <channel.icon size={18} />
                    </div>
                    <span className={`channel-title ${campaignData.channels.includes(channel.value) ? 'active' : ''}`}>
                      {channel.value}
                    </span>
                    <span className="channel-description">
                      {channel.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Channel-specific settings */}
            {campaignData.channels.includes('Email') && (
              <div className="channel-settings-container">
                <div className="channel-settings-header">
                  <Mail size={18} style={{ marginRight: '0.5rem', color: COLORS.onyxMedium }} />
                  <h4 className="channel-settings-title">Email Settings</h4>
                </div>
                
                <div className="channel-settings-content">
                  <div className="form-group">
                    <label className="form-label-small">Subject Line</label>
                    <input 
                      type="text"
                      defaultValue="Introducing Newton Ridge™ Plus II Hiking Boots | Made for Your Next Adventure"
                      placeholder="Enter email subject"
                      className="form-input-small"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label-small">Send Time</label>
                    <select className="form-input-small">
                      <option value="optimal">Send at optimal time per recipient</option>
                      <option value="morning">Morning (8am-11am)</option>
                      <option value="afternoon">Afternoon (12pm-4pm)</option>
                      <option value="evening">Evening (5pm-8pm)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label-small">Personalization</label>
                    <div className="personalization-tags">
                      <div className="personalization-tag">First Name</div>
                      <div className="personalization-tag">Last Purchase</div>
                      <div className="personalization-tag">Loyalty Tier</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {campaignData.channels.includes('SMS') && (
              <div className="channel-settings-container">
                <div className="channel-settings-header">
                  <MessageSquare size={18} style={{ marginRight: '0.5rem', color: COLORS.onyxMedium }} />
                  <h4 className="channel-settings-title">SMS Settings</h4>
                </div>
                
                <div className="channel-settings-content">
                  <div className="form-group">
                    <label className="form-label-small">Message (160 character limit)</label>
                    <textarea 
                      placeholder="Enter SMS message"
                      defaultValue="Conquer any trail with our Newton Ridge Plus II Hiking Boots! Waterproof, durable, comfortable. Shop now and get 25% off: colum.co/hiking"
                      maxLength="160"
                      className="form-textarea-small"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div>
            <h3 className="form-section-title">Review Campaign</h3>
            
            <div className="review-card">
              <div className="review-card-header">
                <h4 className="review-section-title">Campaign Details</h4>
              </div>
              
              <div className="review-card-body">
                <div className="review-details-grid">
                  <div className="review-detail">
                    <p className="review-label">Campaign Title</p>
                    <p className="review-value">{campaignData.title || 'Not specified'}</p>
                  </div>
                  <div className="review-detail">
                    <p className="review-label">Type</p>
                    <p className="review-value">{campaignData.type}</p>
                  </div>
                  <div className="review-detail">
                    <p className="review-label">Audience</p>
                    <p className="review-value">{campaignData.audience || 'Not specified'}</p>
                  </div>
                  <div className="review-detail">
                    <p className="review-label">Duration</p>
                    <p className="review-value">
                      {campaignData.startDate && campaignData.endDate ? 
                        `${campaignData.startDate} to ${campaignData.endDate}` : 
                        'Not specified'}
                    </p>
                  </div>
                  <div className="review-detail">
                    <p className="review-label">Objective</p>
                    <p className="review-value">{campaignData.objective || 'Not specified'}</p>
                  </div>
                  <div className="review-detail">
                    <p className="review-label">Budget</p>
                    <p className="review-value">{campaignData.budget ? `$${campaignData.budget}` : 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="review-description">
                  <p className="review-label">Description</p>
                  <p className="review-value">{campaignData.description || 'Not specified'}</p>
                </div>
                
                {campaignData.channels.length > 0 && (
                  <div className="review-channels">
                    <p className="review-label">Distribution Channels</p>
                    <div className="review-channels-list">
                      {campaignData.channels.map((channel, index) => (
                        <span 
                          key={index}
                          className="review-channel-tag"
                        >
                          {channel === 'Email' && <Mail size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'SMS' && <MessageSquare size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'Push Notification' && <Bell size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'In-app' && <Smartphone size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel === 'Social Media' && <Globe size={14} style={{ marginRight: '0.375rem' }} />}
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {campaignData.audience && (
              <div className="review-card">
                <div className="review-card-header">
                  <h4 className="review-section-title">Audience Impact</h4>
                </div>
                
                <div className="review-card-body">
                  <div className="audience-impact-metrics">
                    <div className="impact-metric">
                      <p className="metric-label">Estimated Reach</p>
                      <p className="metric-value">
                        {campaignData.audience === 'All Members' ? '104.6K' : 
                         campaignData.audience === 'Outdoor Enthusiasts' ? '38.8K' : 
                         campaignData.audience === 'Casual Hikers' ? '25.1K' : 
                         campaignData.audience === 'Winter Sports' ? '23.0K' : 
                         campaignData.audience === 'Summit Tier' ? '10.5K' : 
                         '14.2K'}
                      </p>
                    </div>
                    <div className="impact-metric">
                      <p className="metric-label">Projected Engagement</p>
                      <p className="metric-value">
                        {Math.round((campaignData.audience === 'All Members' ? 32.4 : 
                           campaignData.audience === 'Outdoor Enthusiasts' ? 34.8 : 
                           campaignData.audience === 'Casual Hikers' ? 28.5 : 
                           campaignData.audience === 'Winter Sports' ? 38.6 : 
                           campaignData.audience === 'Summit Tier' ? 45.2 : 
                           37.8) * 
                           (campaignData.audience === 'All Members' ? 1045 : 
                            campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                            campaignData.audience === 'Casual Hikers' ? 251 : 
                            campaignData.audience === 'Winter Sports' ? 230 : 
                            campaignData.audience === 'Summit Tier' ? 105 : 
                            142) / 100).toLocaleString()}
                      </p>
                    </div>
                    <div className="impact-metric">
                      <p className="metric-label">Est. Conversions</p>
                      <p className="metric-value">
                        {Math.round((campaignData.audience === 'All Members' ? 3.8 : 
                           campaignData.audience === 'Outdoor Enthusiasts' ? 4.2 : 
                           campaignData.audience === 'Casual Hikers' ? 2.5 : 
                           campaignData.audience === 'Winter Sports' ? 5.2 : 
                           campaignData.audience === 'Summit Tier' ? 7.8 : 
                           2.2) * 
                           (campaignData.audience === 'All Members' ? 1045 : 
                            campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                            campaignData.audience === 'Casual Hikers' ? 251 : 
                            campaignData.audience === 'Winter Sports' ? 230 : 
                            campaignData.audience === 'Summit Tier' ? 105 : 
                            142) / 100).toLocaleString()}
                      </p>
                    </div>
                    <div className="impact-metric">
                      <p className="metric-label">Est. Revenue Impact</p>
                      <p className="metric-value success">
                        ${Math.round((campaignData.audience === 'All Members' ? 3.8 : 
                           campaignData.audience === 'Outdoor Enthusiasts' ? 4.2 : 
                           campaignData.audience === 'Casual Hikers' ? 2.5 : 
                           campaignData.audience === 'Winter Sports' ? 5.2 : 
                           campaignData.audience === 'Summit Tier' ? 7.8 : 
                           2.2) * 
                           (campaignData.audience === 'All Members' ? 1045 : 
                            campaignData.audience === 'Outdoor Enthusiasts' ? 388 : 
                            campaignData.audience === 'Casual Hikers' ? 251 : 
                            campaignData.audience === 'Winter Sports' ? 230 : 
                            campaignData.audience === 'Summit Tier' ? 105 : 
                            142) / 100 *
                           (campaignData.audience === 'All Members' ? 165 : 
                            campaignData.audience === 'Outdoor Enthusiasts' ? 175 : 
                            campaignData.audience === 'Casual Hikers' ? 128 : 
                            campaignData.audience === 'Winter Sports' ? 210 : 
                            campaignData.audience === 'Summit Tier' ? 325 : 
                            105)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  // If the modal is not open, return null
  if (!isOpen) return null;
  
  return (
    <div>
      {/* Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Full-screen Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create New Campaign</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {/* Step Indicator */}
        <div className="steps-container">
          {[
            { num: 1, name: 'Basics', icon: Briefcase },
            { num: 2, name: 'Audience', icon: Users },
            { num: 3, name: 'Content', icon: Send },
            { num: 4, name: 'Review', icon: BarChart2 }
          ].map(stepInfo => (
            <div 
              key={stepInfo.num} 
              className={`step-item ${stepInfo.num <= step ? 'active' : 'inactive'} ${stepInfo.num < step ? 'clickable' : ''}`}
              onClick={() => stepInfo.num < step && setStep(stepInfo.num)}
            >
              <div className={`step-icon ${stepInfo.num === step ? 'current' : stepInfo.num < step ? 'completed' : 'incomplete'}`}>
                {stepInfo.num < step ? (
                  <Check size={18} />
                ) : (
                  <stepInfo.icon size={18} />
                )}
              </div>
              
              <span className={`step-name ${stepInfo.num === step ? 'current' : ''}`}>
                {stepInfo.name}
              </span>
              
              {stepInfo.num < 4 && (
                <ChevronRight size={16} className="step-arrow" />
              )}
            </div>
          ))}
        </div>
        
        {/* Split View Content */}
        <div className="modal-content-container">
          {/* Left Side - Form */}
          <div className="form-container">
            {/* AI Recommendation Panel */}
            {renderAiRecommendationPanel()}
            
            {/* Form Content */}
            <div className="form-content">
              {renderFormContent()}
            </div>
          </div>
          
          {/* Right Side - Preview */}
          <div className="preview-container-wrapper">
            {renderPreview()}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="back-button"
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          
          <button 
            onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
            className="next-button"
          >
            {step < 4 ? (
              <>
                Continue
                <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </>
            ) : 'Create Campaign'}
          </button>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* General Styles */
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          color: ${COLORS.onyxMedium};
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .steps-container {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 1.5rem;
        }
        
        .step-item {
          display: flex;
          align-items: center;
          opacity: 1;
        }
        
        .step-item.inactive {
          opacity: 0.5;
        }
        
        .step-item.clickable {
          cursor: pointer;
        }
        
        .step-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .step-icon.current {
          background-color: ${COLORS.evergreen};
          color: white;
        }
        
        .step-icon.completed {
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
        }
        
        .step-icon.incomplete {
          background-color: rgba(0, 0, 0, 0.05);
          color: ${COLORS.onyxMedium};
        }
        
        .step-name {
          margin-left: 0.75rem;
          font-size: 0.875rem;
          font-weight: 400;
          color: ${COLORS.onyxMedium};
        }
        
        .step-name.current {
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .step-arrow {
          color: ${COLORS.onyxMedium};
          margin: 0 0.5rem;
        }
        
        .modal-content-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .form-container {
          width: 50%;
          padding: 1.5rem;
          overflow-y: auto;
          background-color: rgba(0,0,0,0.01);
        }
        
        .preview-container-wrapper {
          width: 50%;
          padding: 1.5rem;
          overflow-y: auto;
          background-color: rgba(0,0,0,0.03);
          border-left: 1px solid rgba(0,0,0,0.08);
        }
        
        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          background-color: white;
        }
        
        .back-button {
          padding: 0.625rem 1.25rem;
          border-radius: 0.375rem;
          background-color: transparent;
          border: 1px solid rgba(0,0,0,0.15);
          color: ${COLORS.onyxMedium};
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }
        
        .next-button {
          padding: 0.625rem 1.25rem;
          border-radius: 0.375rem;
          background-color: ${COLORS.evergreen};
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        /* AI Recommendation Panel Styles */
        .ai-recommendation-panel {
          background-color: rgba(26, 76, 73, 0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 3px solid ${COLORS.evergreen};
        }
        
        .ai-analyzing-panel {
          background-color: rgba(26, 76, 73, 0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 3px solid ${COLORS.evergreen};
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100px;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(26, 76, 73, 0.3);
          border-top-color: ${COLORS.evergreen};
          margin-right: 0.75rem;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .apply-suggestion-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: ${COLORS.evergreen};
          color: white;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .channel-tag {
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        /* Form Content Styles */
        .form-content {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .form-section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.5rem;
        }
        
        .form-label-small {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.375rem;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          outline: none;
        }
        
        .form-input-small {
          width: 100%;
          padding: 0.625rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          outline: none;
          background-color: white;
        }
        
        .form-input.with-prefix {
          padding-left: 1.5rem;
        }
        
        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          outline: none;
          min-height: 120px;
          resize: vertical;
        }
        
        .form-textarea-small {
          width: 100%;
          padding: 0.625rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          outline: none;
          min-height: 80px;
          resize: vertical;
        }
        
        .form-row {
          display: flex;
          gap: 1rem;
        }
        
        .form-row .form-group {
          flex: 1;
        }
        
        .date-input-container {
          position: relative;
        }
        
        .date-icon {
          position: absolute;
          right: 0.75rem;
          top: 0.75rem;
          color: ${COLORS.onyxMedium};
        }
        
        .budget-input-container {
          position: relative;
        }
        
        .currency-symbol {
          position: absolute;
          left: 0.75rem;
          top: 0.75rem;
          color: ${COLORS.onyxMedium};
        }
        
        .budget-roi-estimate {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: ${COLORS.green};
          display: flex;
          align-items: center;
        }
        
        /* Campaign Type Options */
        .campaign-type-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        
        .campaign-type-option {
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: white;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        
        .campaign-type-option.active {
          border-color: ${COLORS.evergreen};
          background-color: rgba(26, 76, 73, 0.05);
        }
        
        .type-icon-container {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.05);
          color: ${COLORS.onyxMedium};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .type-icon-container.active {
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
        }
        
        .type-label {
          font-size: 0.75rem;
          font-weight: 400;
          color: ${COLORS.onyxMedium};
        }
        
        .type-label.active {
          font-weight: 600;
          color: ${COLORS.evergreen};
        }
        
        /* Audience Segment Options */
        .audience-segment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        
        .audience-segment-option {
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .audience-segment-option.active {
          border-color: ${COLORS.evergreen};
          background-color: rgba(26, 76, 73, 0.05);
        }
        
        .segment-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .radio-button {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border-width: 2px;
          border-style: solid;
          border-color: ${COLORS.onyxMedium};
          margin-right: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .radio-button.selected {
          border-color: ${COLORS.evergreen};
        }
        
        .radio-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: ${COLORS.evergreen};
        }
        
        .segment-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyx};
        }
        
        .segment-title.active {
          font-weight: 600;
          color: ${COLORS.evergreen};
        }
        
        .segment-details {
          padding-left: 2.25rem;
        }
        
        .segment-count {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.25rem;
        }
        
        .segment-description {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
        }
        
        /* Objective Options */
        .objective-options-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        
        .objective-option {
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .objective-option.active {
          border-color: ${COLORS.evergreen};
          background-color: rgba(26, 76, 73, 0.05);
        }
        
        .objective-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyx};
          margin-bottom: 0.25rem;
        }
        
        .objective-title.active {
          font-weight: 600;
          color: ${COLORS.evergreen};
        }
        
        .objective-description {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
        }
        
        /* Channel Options */
        .channel-options-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        
        .channel-option {
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .channel-option.active {
          border-color: ${COLORS.evergreen};
          background-color: rgba(26, 76, 73, 0.05);
        }
        
        .channel-icon-container {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.05);
          color: ${COLORS.onyxMedium};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .channel-icon-container.active {
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
        }
        
        .channel-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyx};
          margin-bottom: 0.25rem;
        }
        
        .channel-title.active {
          font-weight: 600;
          color: ${COLORS.evergreen};
        }
        
        .channel-description {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
        }
        
        /* Channel Settings */
        .channel-settings-container {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .channel-settings-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .channel-settings-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .channel-settings-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .personalization-tags {
          display: flex;
          gap: 0.5rem;
        }
        
        .personalization-tag {
          padding: 0.5rem 0.75rem;
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        
        /* Review Cards */
        .review-card {
          background-color: white;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.08);
        }
        
        .review-card-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background-color: rgba(0,0,0,0.02);
        }
        
        .review-section-title {
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .review-card-body {
          padding: 1.5rem;
        }
        
        .review-details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .review-detail {
          /* No specific styling needed */
        }
        
        .review-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.25rem;
        }
        
        .review-value {
          font-size: 0.875rem;
          color: ${COLORS.onyx};
        }
        
        .review-description {
          margin-bottom: 1.5rem;
        }
        
        .review-channels {
          /* No specific styling needed */
        }
        
        .review-channels-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .review-channel-tag {
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .audience-impact-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .impact-metric {
          /* No specific styling needed */
        }
        
        .metric-label {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.25rem;
        }
        
        .metric-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .metric-value.success {
          color: ${COLORS.green};
        }
        
        /* Preview Containers */
        .preview-container {
          background-color: white;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .preview-header {
          padding: 0.75rem 1rem;
          background-color: #f0f0f0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .preview-view-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          background-color: transparent;
          color: ${COLORS.onyxMedium};
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          cursor: pointer;
        }
        
        .preview-view-btn.active {
          background-color: ${COLORS.evergreen};
          color: white;
          border: none;
        }
        
        .preview-content {
          flex: 1;
          overflow: auto;
          max-height: calc(100vh - 280px);
        }
        
        .preview-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 300px;
        }
        
        /* SMS Preview */
        .sms-preview {
          padding: 2rem;
          display: flex;
          justify-content: center;
        }
        
        .phone-mockup {
          width: 300px;
          border: 10px solid #222;
          border-radius: 2rem;
          overflow: hidden;
          background-color: #f9f9f9;
        }
        
        .phone-header {
          padding: 1rem;
          background-color: #eee;
          border-bottom: 1px solid #ddd;
          text-align: center;
        }
        
        .contact-name {
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .message-time {
          font-size: 0.75rem;
          color: #666;
          margin-top: 0.25rem;
        }
        
        .messages {
          padding: 1rem;
        }
        
        .message {
          background-color: #2196F3;
          color: white;
          padding: 0.75rem;
          border-radius: 1rem;
          border-top-left-radius: 0.25rem;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          max-width: 80%;
          margin-left: auto;
        }
        
        /* Audience Insights */
        .audience-insights {
          padding: 1rem;
        }
        
        .insight-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .metric {
          background-color: rgba(26, 76, 73, 0.05);
          padding: 0.875rem;
          border-radius: 0.5rem;
        }
        
        .metric-label {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.25rem;
        }
        
        .metric-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .insights-heading {
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 0.75rem;
        }
        
        .insights-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .insight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        
        .insight-bullet {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: ${COLORS.green};
          margin-top: 0.25rem;
        }
        
        .insight-text {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          flex: 1;
        }
        
        .audience-impact {
          background-color: rgba(26, 76, 73, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
        }
        
        .impact-heading {
          font-size: 0.875rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 0.75rem;
        }
        
        .impact-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .impact-metric {
          text-align: center;
        }
        
        .impact-label {
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          margin-bottom: 0.25rem;
        }
        
        .impact-value {
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .impact-value.highlight {
          color: ${COLORS.green};
        }
        
        /* Campaign Summary */
        .campaign-summary-card {
          padding: 1.5rem;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .summary-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${COLORS.onyx};
        }
        
        .status-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          background-color: ${COLORS.blue};
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .summary-details {
          margin-bottom: 1.5rem;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        
        .summary-row:last-child {
          border-bottom: none;
        }
        
        .summary-label {
          font-size: 0.875rem;
          color: ${COLORS.onyxMedium};
        }
        
        .summary-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyx};
        }
        
        .channels-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        
        .channel-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          background-color: rgba(26, 76, 73, 0.1);
          color: ${COLORS.evergreen};
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .prediction-panel {
          background-color: rgba(26, 76, 73, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-top: 1.5rem;
        }
        
        .prediction-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 1rem;
        }
        
        .prediction-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        
        .prediction-metric {
          text-align: center;
        }
        
        .prediction-metric.highlight .metric-value {
          color: ${COLORS.green};
        }
        
        .metric-comparison {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        
        .metric-comparison.positive {
          color: ${COLORS.green};
        }
        
        .metric-comparison.negative {
          color: ${COLORS.red};
        }
      `}</style>
    </div>
  );
};

export default SplitCampaignCreationModal;
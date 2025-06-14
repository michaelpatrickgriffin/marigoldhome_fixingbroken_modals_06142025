// Updated SplitCampaignCreationModal.js with improved preview behavior and form flow
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, Calendar, Users, Target, Zap, Award, 
  ArrowUpRight, BarChart2, Mail, Send, Bell, Instagram, 
  Facebook, MessageSquare, Smartphone, Globe, Check, Briefcase,
  Tag, AlertTriangle, Layout, Image, Copy, Maximize
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
};

const SplitCampaignCreationModal = ({ isOpen, onClose, onCampaignCreated, onNotificationCreated }) => {
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
  
  // State for preview type selection
  const [activePreviewType, setActivePreviewType] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  
  // Template selector state (moved to component level)
  const [templateSource, setTemplateSource] = useState('library');
  const [figmaUrl, setFigmaUrl] = useState('');
  
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
      setActivePreviewType(null);
      setShowTemplateSelector(false);
      setSelectedTemplate('template1');
      setTemplateSource('suggested');
      setFigmaUrl('');
    }
  }, [isOpen]);

  // Update default preview type when channels changes
  useEffect(() => {
    if (campaignData.channels.length > 0 && !activePreviewType) {
      // Set default preview type to the first selected channel
      setActivePreviewType(campaignData.channels[0]);
    } else if (campaignData.channels.length > 0 && !campaignData.channels.includes(activePreviewType)) {
      // If active preview type is no longer in channels, reset to first channel
      setActivePreviewType(campaignData.channels[0]);
    } else if (campaignData.channels.length === 0) {
      // No channels selected, clear preview type
      setActivePreviewType(null);
    }
  }, [campaignData.channels, activePreviewType]);

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
    // Show success toast notification
    const campaignToCreate = {
      ...campaignData,
      id: Date.now(), // Generate temporary ID
      status: campaignData.startDate && campaignData.endDate ? 'Scheduled' : 'Draft',
      audience: campaignData.audience || 'All Members',
      sent: 0,
      opened: 0,
      conversion: 0,
      revenue: 0,
      cost: parseInt(campaignData.budget) || 0,
      roi: 0,
      needsAttention: false,
      recommendations: []
    };
    
    // Here would be the logic to save the new campaign
    console.log('Creating campaign:', campaignToCreate);
    
    // Pass the created campaign back to parent component to update dashboard
    if (onCampaignCreated) {
      onCampaignCreated(campaignToCreate);
    }
    
    // Create notification for the campaign
    if (onNotificationCreated) {
      const notification = {
        id: Date.now(),
        type: 'event',
        title: `Campaign Created: ${campaignToCreate.title || 'New Campaign'}`,
        message: `${campaignToCreate.type} campaign has been ${campaignToCreate.status === 'Scheduled' ? 'scheduled' : 'created as draft'}.`,
        time: 'Just now',
        icon: 'CheckCircle',
        color: '#4CAF50',
        priority: 'medium'
      };
      onNotificationCreated(notification);
    }
    
    // Close the modal
    onClose();
  };

  // Render template selector overlay
  const renderTemplateSelector = () => {
    if (!showTemplateSelector) return null;
    
    // Template library with more realistic layout previews
    const templates = [
      {
        id: 'template1',
        name: 'Standard Newsletter',
        preview: (
          <div className="template-layout-preview">
            <div className="template-header"></div>
            <div className="template-hero"></div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-text-block short"></div>
            </div>
            <div className="template-columns">
              <div className="template-column">
                <div className="template-img-placeholder"></div>
                <div className="template-text-block mini"></div>
              </div>
              <div className="template-column">
                <div className="template-img-placeholder"></div>
                <div className="template-text-block mini"></div>
              </div>
              <div className="template-column">
                <div className="template-img-placeholder"></div>
                <div className="template-text-block mini"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        )
      },
      {
        id: 'template2',
        name: 'Promotional',
        preview: (
          <div className="template-layout-preview">
            <div className="template-header"></div>
            <div className="template-hero-banner"></div>
            <div className="template-content center">
              <div className="template-text-block"></div>
              <div className="template-button"></div>
            </div>
            <div className="template-featured-products">
              <div className="template-product">
                <div className="template-product-img"></div>
                <div className="template-product-info"></div>
                <div className="template-mini-button"></div>
              </div>
              <div className="template-product">
                <div className="template-product-img"></div>
                <div className="template-product-info"></div>
                <div className="template-mini-button"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        )
      },
      {
        id: 'template3',
        name: 'Announcement',
        preview: (
          <div className="template-layout-preview">
            <div className="template-header small"></div>
            <div className="template-announcement-banner">
              <div className="template-announcement-content"></div>
            </div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-text-block short"></div>
              <div className="template-button-row">
                <div className="template-button"></div>
              </div>
            </div>
            <div className="template-footer small"></div>
          </div>
        )
      },
      {
        id: 'template4',
        name: 'Minimal',
        preview: (
          <div className="template-layout-preview minimal">
            <div className="template-header small"></div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-text-block"></div>
              <div className="template-text-block short"></div>
              <div className="template-button-row">
                <div className="template-button"></div>
              </div>
            </div>
            <div className="template-footer extra-small"></div>
          </div>
        )
      },
      {
        id: 'template5',
        name: 'Product Showcase',
        preview: (
          <div className="template-layout-preview">
            <div className="template-header"></div>
            <div className="template-content">
              <div className="template-text-block short"></div>
            </div>
            <div className="template-product-grid">
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
                <div className="template-mini-button"></div>
              </div>
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
                <div className="template-mini-button"></div>
              </div>
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
                <div className="template-mini-button"></div>
              </div>
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
                <div className="template-mini-button"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        )
      },
      {
        id: 'template6',
        name: 'Welcome Email',
        preview: (
          <div className="template-layout-preview">
            <div className="template-header"></div>
            <div className="template-welcome-hero">
              <div className="template-welcome-message"></div>
            </div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-benefits-row">
                <div className="template-benefit-item">
                  <div className="template-benefit-icon"></div>
                  <div className="template-benefit-text"></div>
                </div>
                <div className="template-benefit-item">
                  <div className="template-benefit-icon"></div>
                  <div className="template-benefit-text"></div>
                </div>
                <div className="template-benefit-item">
                  <div className="template-benefit-icon"></div>
                  <div className="template-benefit-text"></div>
                </div>
              </div>
              <div className="template-button-row">
                <div className="template-button"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        )
      }
    ];
    
    // AI suggested templates
    const suggestedTemplates = [
      {
        id: 'suggested1',
        name: 'Winter Promotion',
        type: 'AI suggested',
        preview: (
          <div className="template-layout-preview ai-suggested">
            <div className="ai-tag">AI Optimized</div>
            <div className="template-header"></div>
            <div className="template-hero winter"></div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-text-block short"></div>
              <div className="template-button-row">
                <div className="template-button primary"></div>
              </div>
            </div>
            <div className="template-winter-products">
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
              </div>
              <div className="template-product-card">
                <div className="template-card-img"></div>
                <div className="template-card-title"></div>
                <div className="template-card-price"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        ),
        matchScore: '98%'
      },
      {
        id: 'suggested2',
        name: 'Product Launch',
        type: 'AI suggested',
        preview: (
          <div className="template-layout-preview ai-suggested">
            <div className="ai-tag">AI Optimized</div>
            <div className="template-header"></div>
            <div className="template-hero-launch"></div>
            <div className="template-content center">
              <div className="template-text-block"></div>
              <div className="template-text-block short"></div>
              <div className="template-rating"></div>
              <div className="template-button primary"></div>
            </div>
            <div className="template-feature-list">
              <div className="template-feature-item">
                <div className="template-feature-icon"></div>
                <div className="template-feature-text"></div>
              </div>
              <div className="template-feature-item">
                <div className="template-feature-icon"></div>
                <div className="template-feature-text"></div>
              </div>
              <div className="template-feature-item">
                <div className="template-feature-icon"></div>
                <div className="template-feature-text"></div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        ),
        matchScore: '95%'
      },
      {
        id: 'suggested3',
        name: 'Columbia Newsletter',
        type: 'AI suggested',
        preview: (
          <div className="template-layout-preview ai-suggested">
            <div className="ai-tag">Branded</div>
            <div className="template-header columbia"></div>
            <div className="template-hero columbia"></div>
            <div className="template-content">
              <div className="template-text-block"></div>
              <div className="template-columbia-feature">
                <div className="template-feature-img"></div>
                <div className="template-feature-content">
                  <div className="template-text-block short"></div>
                  <div className="template-text-block mini"></div>
                  <div className="template-button"></div>
                </div>
              </div>
            </div>
            <div className="template-footer"></div>
          </div>
        ),
        matchScore: '92%'
      }
    ];
    
    // Figma recent imports with more realistic previews
    const recentFigmaDesigns = [
      {
        id: 'figma1',
        name: 'Winter Campaign',
        preview: (
          <div className="figma-design-preview">
            <div className="figma-design-header"></div>
            <div className="figma-design-hero winter"></div>
            <div className="figma-design-content">
              <div className="figma-text-line"></div>
              <div className="figma-text-line short"></div>
              <div className="figma-button"></div>
            </div>
            <div className="figma-design-product-grid">
              <div className="figma-product"></div>
              <div className="figma-product"></div>
              <div className="figma-product"></div>
            </div>
          </div>
        )
      },
      {
        id: 'figma2',
        name: 'Product Launch',
        preview: (
          <div className="figma-design-preview">
            <div className="figma-design-header"></div>
            <div className="figma-design-hero product"></div>
            <div className="figma-design-content center">
              <div className="figma-text-line"></div>
              <div className="figma-text-line short"></div>
              <div className="figma-button"></div>
            </div>
            <div className="figma-specs-grid">
              <div className="figma-spec-item"></div>
              <div className="figma-spec-item"></div>
              <div className="figma-spec-item"></div>
              <div className="figma-spec-item"></div>
            </div>
          </div>
        )
      },
      {
        id: 'figma3',
        name: 'Newsletter',
        preview: (
          <div className="figma-design-preview">
            <div className="figma-design-header"></div>
            <div className="figma-design-multi-column">
              <div className="figma-column">
                <div className="figma-text-line"></div>
                <div className="figma-text-line"></div>
                <div className="figma-text-line short"></div>
              </div>
              <div className="figma-column">
                <div className="figma-image"></div>
                <div className="figma-text-line short"></div>
              </div>
            </div>
            <div className="figma-footer"></div>
          </div>
        )
      }
    ];
    
    return (
      <div className="template-selector-overlay slide-in">
        <div className="modal-header">
          <div>
            <div className="modal-breadcrumb">
              <span className="breadcrumb-parent">Create New Campaign</span>
              <ChevronRight size={16} className="breadcrumb-separator" />
              <span className="breadcrumb-current">Select a Template</span>
            </div>
            <h2 className="modal-title">Choose the Perfect Template</h2>
          </div>
          <button className="close-button" onClick={() => setShowTemplateSelector(false)}>
            <X size={20} />
          </button>
        </div>
        
        {/* Template Source Toggle */}
        <div className="template-source-toggle">
          <button 
            className={`source-toggle-btn ${templateSource === 'suggested' ? 'active' : ''}`}
            onClick={() => setTemplateSource('suggested')}
          >
            AI Suggested
          </button>
          <button 
            className={`source-toggle-btn ${templateSource === 'library' ? 'active' : ''}`}
            onClick={() => setTemplateSource('library')}
          >
            Template Library
          </button>
          <button 
            className={`source-toggle-btn ${templateSource === 'figma' ? 'active' : ''}`}
            onClick={() => setTemplateSource('figma')}
          >
            Figma Import
          </button>
        </div>
        
        <div className="template-selector-content">
          {templateSource === 'suggested' ? (
            /* AI Suggested Templates */
            <div className="template-grid">
              {suggestedTemplates.map(template => (
                <div 
                  key={template.id}
                  className={`template-card ai-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setShowTemplateSelector(false);
                  }}
                >
                  <div className="template-preview">
                    {template.preview}
                    <div className="ai-match-score">{template.matchScore} match</div>
                    {selectedTemplate === template.id && (
                      <div className="template-selected-indicator">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                  <div className="template-name">{template.name}</div>
                </div>
              ))}
            </div>
          ) : templateSource === 'library' ? (
            /* Template Library Grid */
            <div className="template-grid">
              {templates.map(template => (
                <div 
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setShowTemplateSelector(false);
                  }}
                >
                  <div className="template-preview">
                    {template.preview}
                    {selectedTemplate === template.id && (
                      <div className="template-selected-indicator">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                  <div className="template-name">{template.name}</div>
                </div>
              ))}
            </div>
          ) : (
            /* Figma Import Option */
            <div className="figma-import-container">
              <div className="figma-import-content">
                <img 
                  src="/api/placeholder/120/40" 
                  alt="Emaiify + Figma Logo" 
                  className="figma-integration-logo" 
                />
                
                <h4 className="figma-import-title">Import from Figma</h4>
                <p className="figma-import-description">
                  Convert your Figma designs to responsive HTML email templates with one click.
                  Just paste your Figma file URL below.
                </p>
                
                <div className="figma-url-input-container">
                  <input 
                    type="text" 
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                    placeholder="Paste Figma URL (e.g., https://www.figma.com/file/...)" 
                    className="figma-url-input" 
                  />
                  <button 
                    className="import-figma-btn"
                    disabled={!figmaUrl}
                    onClick={() => {
                      // In a real implementation, this would call the Emaiify API
                      // to convert the Figma design to HTML
                      console.log('Importing from Figma:', figmaUrl);
                      setShowTemplateSelector(false);
                    }}
                  >
                    Import
                  </button>
                </div>
                
                <div className="figma-import-features">
                  <div className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>Responsive design</span>
                  </div>
                  <div className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>Cross-client compatible</span>
                  </div>
                  <div className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>Preserves styling & layout</span>
                  </div>
                </div>
                
                <div className="recent-figma-designs">
                  <h5 className="recent-designs-title">Recent Designs</h5>
                  <div className="recent-designs-grid">
                    {recentFigmaDesigns.map(design => (
                      <div 
                        key={design.id}
                        className="recent-design-item"
                        onClick={() => {
                          setFigmaUrl(`https://www.figma.com/file/${design.id}/${design.name}`);
                        }}
                      >
                        {design.preview}
                        <span className="recent-design-name">{design.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="back-button"
            onClick={() => setShowTemplateSelector(false)}
          >
            Cancel
          </button>
          
          <button 
            className="next-button"
            onClick={() => setShowTemplateSelector(false)}
          >
            Apply Template
          </button>
        </div>
      </div>
    );
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
      
      // Rest of the AI recommendation panels remain the same
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

  // Render preview content based on current step and selected channels
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
            {step === 3 && !campaignData.channels.length 
              ? "Select distribution channels to see preview" 
              : "Complete the form to see your campaign preview"}
          </p>
        </div>
      </div>
    );

    // Generic campaign preview for step 1
    const genericCampaignPreview = (
      <div className="preview-content">
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '1.5rem' 
            }}>
              <div>
                <div style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.1)',
                  color: '#1A4C49',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  {campaignData.type || "Campaign Type"}
                </div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: '#333',
                  margin: '0.5rem 0 0.25rem'
                }}>
                  {campaignData.title || "Campaign Title"}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#666', margin: '0' }}>
                  {campaignData.startDate && campaignData.endDate 
                    ? `${campaignData.startDate} to ${campaignData.endDate}` 
                    : "Campaign Duration"}
                </p>
              </div>
              <div style={{ 
                backgroundColor: campaignData.budget ? '#4CAF50' : '#F5F5F5', 
                color: campaignData.budget ? 'white' : '#666',
                padding: '0.625rem 1rem',
                borderRadius: '0.375rem',
                fontWeight: '600'
              }}>
                {campaignData.budget ? `${campaignData.budget}` : "Budget"}
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'rgba(0,0,0,0.02)', 
              borderRadius: '0.375rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '0.875rem', color: '#666', margin: '0 0 0.5rem' }}>
                Campaign Description
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#333', margin: '0', lineHeight: '1.5' }}>
                {campaignData.description || "Your campaign description will appear here. Add details about your campaign objectives, target audience, and key messages."}
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '1rem 0',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              fontSize: '0.75rem',
              color: '#666'
            }}>
              <div>Created by: You</div>
              <div>Status: {campaignData.startDate && campaignData.endDate ? "Scheduled" : "Draft"}</div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              textAlign: 'center', 
              fontSize: '0.875rem', 
              color: '#666',
              maxWidth: '80%'
            }}>
              <p>Complete the next steps to define your audience and select distribution channels.</p>
              <p>The preview will update based on your selections.</p>
            </div>
          </div>
        </div>
      </div>
    );

    // Email preview
    const emailPreview = (
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
    );

    // SMS preview
    const smsPreview = (
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
    );

    // Audience insights preview
    const audiencePreview = (
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
    );

    // Campaign summary preview
    const campaignSummaryPreview = (
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
              <div className="summary-value">{campaignData.budget ? `${campaignData.budget}` : "Not specified"}</div>
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
    );

    // Determine which preview to show based on step and selected channels
    let currentPreview = defaultPreview;
    let previewTitle = "Preview";
    
    // Only show channel previews if we have channels selected
    if (step === 3 && campaignData.channels.length > 0) {
      if (activePreviewType === 'Email') {
        currentPreview = emailPreview;
        previewTitle = "Email Preview";
      } else if (activePreviewType === 'SMS') {
        currentPreview = smsPreview;
        previewTitle = "SMS Preview";
      }
    } else if (step === 2 && campaignData.audience) {
      currentPreview = audiencePreview;
      previewTitle = `Audience: ${campaignData.audience}`;
    } else if (step === 4) {
      currentPreview = campaignSummaryPreview;
      previewTitle = "Campaign Summary";
    } else if (step === 1) {
      // For step 1, show a generic campaign preview instead of an email template
      if (campaignData.type && campaignData.title) {
        currentPreview = genericCampaignPreview;
        previewTitle = "Campaign Overview";
      }
    }
    
    
    // Wrap current preview in container with header
    return (
      <div className="preview-container">
        <div className="preview-header">
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx }}>{previewTitle}</span>
          
          {/* Preview actions based on context */}
          <div className="preview-actions">
            {/* Show channel selector if we have multiple channels selected in step 3 */}
            {step === 3 && campaignData.channels.length > 1 && (
              <div className="preview-channels-toggle">
                {campaignData.channels.map(channel => (
                  <button 
                    key={channel}
                    className={`preview-channel-btn ${activePreviewType === channel ? 'active' : ''}`}
                    onClick={() => setActivePreviewType(channel)}
                  >
                    {channel === 'Email' && <Mail size={14} style={{ marginRight: '0.375rem' }} />}
                    {channel === 'SMS' && <MessageSquare size={14} style={{ marginRight: '0.375rem' }} />}
                    {channel === 'Push Notification' && <Bell size={14} style={{ marginRight: '0.375rem' }} />}
                    {channel === 'In-app' && <Smartphone size={14} style={{ marginRight: '0.375rem' }} />}
                    {channel === 'Social Media' && <Globe size={14} style={{ marginRight: '0.375rem' }} />}
                    {channel}
                  </button>
                ))}
              </div>
            )}
            
            {/* Show template selector button when viewing email preview or if we have email channel selected */}
            {activePreviewType === 'Email' && (
              <button 
                className="template-selector-btn"
                onClick={() => setShowTemplateSelector(true)}
              >
                <Layout size={14} style={{ marginRight: '0.375rem' }} />
                Templates
              </button>
            )}
            
            {/* Preview actions like expand, download */}
            <button className="preview-action-btn">
              <Maximize size={14} />
            </button>
            <button className="preview-action-btn">
              <Copy size={14} />
            </button>
          </div>
        </div>
        
        {currentPreview}
        
        {/* Template selector overlay */}
        {renderTemplateSelector()}
      </div>
    );
  };

  // Render form content based on the current step
  const renderFormContent = () => {
    switch(step) {
      case 1:
        return (
          <div>
            <h3 className="form-section-title">Campaign Details</h3>
            
            {/* Campaign Type selection as the first question */}
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
              <label className="form-label">Campaign Description</label>
              <textarea 
                value={campaignData.description}
                onChange={(e) => updateCampaignData('description', e.target.value)}
                placeholder="Enter campaign description"
                className="form-textarea"
              />
            </div>
            
            {/* Moved Budget field from step 3 to step 1 */}
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
            
            {/* Moved Budget field to step 1 */}
            
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
                          {channel === 'Email' && <Mail size={12} style={{ marginRight: '0.25rem' }} />}
                          {channel === 'SMS' && <MessageSquare size={12} style={{ marginRight: '0.25rem' }} />}
                          {channel === 'Push Notification' && <Bell size={12} style={{ marginRight: '0.25rem' }} />}
                          {channel === 'In-app' && <Smartphone size={12} style={{ marginRight: '0.25rem' }} />}
                          {channel === 'Social Media' && <Globe size={12} style={{ marginRight: '0.25rem' }} />}
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
            disabled={
              (step === 1 && (!campaignData.type || !campaignData.title)) || 
              (step === 2 && !campaignData.audience) ||
              (step === 3 && campaignData.channels.length === 0)
            }
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
          display: flex;
          flex-direction: column;
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
        
        .next-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          opacity: 0.7;
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
        
        /* Preview Containers and Components */
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

        .preview-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .preview-channels-toggle {
          display: flex;
          gap: 0.25rem;
          margin-right: 0.5rem;
        }
        
        .preview-channel-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          background-color: transparent;
          color: ${COLORS.onyxMedium};
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .preview-channel-btn.active {
          background-color: ${COLORS.evergreen};
          color: white;
          border: none;
        }
        
        .template-selector-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          background-color: white;
          color: ${COLORS.onyxMedium};
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .preview-action-btn {
          width: 1.75rem;
          height: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          color: ${COLORS.onyxMedium};
          cursor: pointer;
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
        
        /* Campaign Summary Preview */
        .campaign-summary-card {
          padding: 1.5rem;
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
        
        /* Template Selector Overlay */
        .template-selector-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
          z-index: 10;
          display: flex;
          flex-direction: column;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .template-selector-header {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          background-color: #f0f0f0;
        }
        
        .template-selector-title {
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin: 0;
        }
        
        .close-selector-button {
          background: none;
          border: none;
          cursor: pointer;
          color: ${COLORS.onyxMedium};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .template-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 1rem;
          overflow-y: auto;
        }
        
        .template-card {
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          transition: all 0.2s;
        }
        
        .template-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .template-card.selected {
          border-color: ${COLORS.evergreen};
          box-shadow: 0 0 0 2px rgba(26, 76, 73, 0.2);
        }
        
        .template-preview {
          position: relative;
          background-color: #f5f5f5;
        }
        
        .template-img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .template-selected-indicator {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 1.5rem;
          height: 1.5rem;
          background-color: ${COLORS.evergreen};
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .template-name {
          padding: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: ${COLORS.onyx};
          text-align: center;
          background-color: white;
        }
        
        /* Template Source Toggle */
        .template-source-toggle {
          display: flex;
          background-color: #f0f0f0;
          padding: 0.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .source-toggle-btn {
          flex: 1;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          background-color: transparent;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          color: ${COLORS.onyxMedium};
        }
        
        .source-toggle-btn.active {
          background-color: white;
          color: ${COLORS.evergreen};
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        /* Figma Import Styles */
        .figma-import-container {
          flex: 1;
          padding: 2rem;
          display: flex;
          justify-content: center;
          overflow-y: auto;
        }
        
        .figma-import-content {
          max-width: 640px;
          width: 100%;
        }
        
        .figma-integration-logo {
          margin-bottom: 1.5rem;
        }
        
        .figma-import-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 0.75rem;
        }
        
        .figma-import-description {
          font-size: 0.875rem;
          color: ${COLORS.onyxMedium};
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .figma-url-input-container {
          display: flex;
          margin-bottom: 1.5rem;
        }
        
        .figma-url-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 0.375rem 0 0 0.375rem;
          font-size: 0.875rem;
        }
        
        .import-figma-btn {
          padding: 0.75rem 1.25rem;
          background-color: ${COLORS.evergreen};
          color: white;
          font-weight: 500;
          border: none;
          border-radius: 0 0.375rem 0.375rem 0;
          cursor: pointer;
        }
        
        .import-figma-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .figma-import-features {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: ${COLORS.onyx};
        }
        
        .feature-icon {
          color: ${COLORS.green};
          margin-right: 0.5rem;
        }
        
        .recent-designs-title {
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.onyx};
          margin-bottom: 1rem;
        }
        
        .recent-designs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .recent-design-item {
          cursor: pointer;
          border-radius: 0.375rem;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        
        .recent-design-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .recent-design-name {
          display: block;
          padding: 0.5rem;
          font-size: 0.75rem;
          color: ${COLORS.onyxMedium};
          text-align: center;
          background-color: white;
        }
        
        /* Enhanced template preview styles */
        .template-layout-preview {
          width: 100%;
          height: 150px;
          background-color: #f5f7fa;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .template-layout-preview.minimal {
          background-color: #ffffff;
        }
        
        .template-layout-preview.ai-suggested {
          background-color: #f9f9ff;
        }
        
        .ai-tag {
          position: absolute;
          top: 5px;
          left: 5px;
          padding: 2px 6px;
          background-color: ${COLORS.evergreen};
          color: white;
          font-size: 8px;
          font-weight: 600;
          border-radius: 3px;
          z-index: 2;
        }
        
        .ai-match-score {
          position: absolute;
          bottom: 5px;
          right: 5px;
          padding: 2px 6px;
          background-color: rgba(0,0,0,0.6);
          color: white;
          font-size: 8px;
          font-weight: 600;
          border-radius: 3px;
          z-index: 2;
        }
        
        .template-header {
          height: 15px;
          background-color: #1A4C49;
          width: 100%;
        }
        
        .template-header.small {
          height: 10px;
        }
        
        .template-header.columbia {
          background-color: #003366;
        }
        
        .template-hero {
          height: 40px;
          background-color: #ddd;
          width: 100%;
        }
        
        .template-hero.winter {
          background-color: #e1f5fe;
          background-image: linear-gradient(to bottom, #e1f5fe, #b3e5fc);
        }
        
        .template-hero.columbia {
          background-color: #003366;
          background-image: linear-gradient(45deg, #003366, #336699);
        }
        
        .template-hero-banner {
          height: 30px;
          background-color: #1A4C49;
          width: 100%;
        }
        
        .template-hero-launch {
          height: 40px;
          background-color: #bbdefb;
          background-image: linear-gradient(to right, #bbdefb, #90caf9);
        }
        
        .template-welcome-hero {
          height: 50px;
          background-color: #c8e6c9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .template-welcome-message {
          width: 80%;
          height: 30px;
          background-color: rgba(255,255,255,0.8);
          border-radius: 4px;
        }
        
        .template-announcement-banner {
          height: 40px;
          background-color: #ffcc80;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .template-announcement-content {
          width: 70%;
          height: 20px;
          background-color: white;
          border-radius: 3px;
        }
        
        .template-content {
          padding: 8px;
          flex: 1;
        }
        
        .template-content.center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .template-text-block {
          height: 8px;
          background-color: #e0e0e0;
          margin-bottom: 5px;
          border-radius: 2px;
          width: 100%;
        }
        
        .template-text-block.short {
          width: 70%;
        }
        
        .template-text-block.mini {
          width: 90%;
          height: 6px;
        }
        
        .template-button {
          width: 80px;
          height: 16px;
          background-color: #1A4C49;
          border-radius: 3px;
          margin: 5px 0;
        }
        
        .template-button.primary {
          background-color: #4CAF50;
        }
        
        .template-button-row {
          display: flex;
          justify-content: center;
          margin-top: 5px;
        }
        
        .template-mini-button {
          width: 50px;
          height: 12px;
          background-color: #1A4C49;
          border-radius: 2px;
          margin: 3px 0;
        }
        
        .template-columns {
          display: flex;
          padding: 0 8px 8px;
          gap: 5px;
        }
        
        .template-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .template-img-placeholder {
          width: 100%;
          height: 30px;
          background-color: #bdbdbd;
          border-radius: 2px;
          margin-bottom: 3px;
        }
        
        .template-featured-products {
          display: flex;
          padding: 0 8px 8px;
          gap: 8px;
        }
        
        .template-product {
          flex: 1;
          background-color: rgba(255,255,255,0.7);
          border-radius: 2px;
          padding: 3px;
        }
        
        .template-product-img {
          width: 100%;
          height: 25px;
          background-color: #bdbdbd;
          border-radius: 2px;
          margin-bottom: 3px;
        }
        
        .template-product-info {
          height: 6px;
          background-color: #e0e0e0;
          margin-bottom: 3px;
          border-radius: 1px;
        }
        
        .template-product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 5px;
          padding: 0 8px 8px;
        }
        
        .template-product-card {
          background-color: white;
          border-radius: 2px;
          padding: 3px;
        }
        
        .template-card-img {
          width: 100%;
          height: 20px;
          background-color: #bdbdbd;
          border-radius: 2px;
          margin-bottom: 3px;
        }
        
        .template-card-title {
          height: 5px;
          background-color: #e0e0e0;
          margin-bottom: 3px;
          border-radius: 1px;
        }
        
        .template-card-price {
          height: 5px;
          width: 30%;
          background-color: #1A4C49;
          margin-bottom: 3px;
          border-radius: 1px;
        }
        
        .template-winter-products {
          display: flex;
          padding: 0 8px 8px;
          gap: 5px;
        }
        
        .template-rating {
          display: flex;
          margin: 3px 0;
          gap: 2px;
        }
        
        .template-rating::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: #FFC107;
          display: block;
          margin-right: 1px;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        .template-rating::after {
          content: '';
          width: 32px;
          height: 8px;
          background-color: #FFC107;
          display: block;
          border-radius: 1px;
        }
        
        .template-feature-list {
          display: flex;
          flex-direction: column;
          padding: 0 8px 8px;
          gap: 3px;
        }
        
        .template-feature-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .template-feature-icon {
          width: 12px;
          height: 12px;
          background-color: #1A4C49;
          border-radius: 50%;
        }
        
        .template-feature-text {
          height: 6px;
          flex: 1;
          background-color: #e0e0e0;
          border-radius: 1px;
        }
        
        .template-benefits-row {
          display: flex;
          gap: 5px;
          margin: 5px 0;
        }
        
        .template-benefit-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        
        .template-benefit-icon {
          width: 15px;
          height: 15px;
          background-color: #1A4C49;
          border-radius: 50%;
        }
        
        .template-benefit-text {
          width: 90%;
          height: 5px;
          background-color: #e0e0e0;
          border-radius: 1px;
        }
        
        .template-columbia-feature {
          display: flex;
          gap: 5px;
          margin-top: 5px;
        }
        
        .template-feature-img {
          width: 40%;
          height: 30px;
          background-color: #bdbdbd;
          border-radius: 2px;
        }
        
        .template-feature-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .template-footer {
          height: 15px;
          background-color: #1A4C49;
          width: 100%;
          margin-top: auto;
        }
        
        .template-footer.small {
          height: 10px;
        }
        
        .template-footer.extra-small {
          height: 8px;
        }
        
        /* Figma design preview styles */
        .figma-design-preview {
          width: 100%;
          height: 80px;
          background-color: #f5f7fa;
          border-radius: 3px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .figma-design-header {
          height: 10px;
          background-color: #1A4C49;
        }
        
        .figma-design-hero {
          height: 20px;
          background-color: #ddd;
        }
        
        .figma-design-hero.winter {
          background-color: #e1f5fe;
          background-image: linear-gradient(to bottom, #e1f5fe, #b3e5fc);
        }
        
        .figma-design-hero.product {
          background-color: #bbdefb;
          background-image: linear-gradient(to right, #bbdefb, #90caf9);
        }
        
        .figma-design-content {
          padding: 4px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .figma-design-content.center {
          align-items: center;
        }
        
        .figma-text-line {
          height: 4px;
          background-color: #e0e0e0;
          width: 100%;
          border-radius: 1px;
          margin-bottom: 2px;
        }
        
        .figma-text-line.short {
          width: 60%;
        }
        
        .figma-button {
          width: 40px;
          height: 8px;
          margin-top: 2px;
          background-color: #1A4C49;
          border-radius: 2px;
        }
        
        .figma-design-product-grid {
          display: flex;
          padding: 0 4px 4px;
          gap: 3px;
        }
        
        .figma-product {
          flex: 1;
          height: 15px;
          background-color: #bdbdbd;
          border-radius: 2px;
        }
        
        .figma-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
          padding: 0 4px 4px;
        }
        
        .figma-spec-item {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 1px;
        }
        
        .figma-design-multi-column {
          display: flex;
          padding: 4px;
          gap: 4px;
          flex: 1;
        }
        
        .figma-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .figma-image {
          width: 100%;
          height: 20px;
          background-color: #bdbdbd;
          border-radius: 2px;
          margin-bottom: 2px;
        }
        
        .figma-footer {
          height: 8px;
          background-color: #1A4C49;
          margin-top: auto;
        }
        
        /* Animation for preview transitions */
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .preview-content {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default SplitCampaignCreationModal;
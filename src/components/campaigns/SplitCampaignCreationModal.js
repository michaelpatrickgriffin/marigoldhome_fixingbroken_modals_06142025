// src/components/campaigns/SplitCampaignCreationModal.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Mail, Users, Calendar, Target, Edit, Eye, EyeOff, Settings, Zap, Send, Save, AlertCircle, CheckCircle, Clock, MessageSquare, Smartphone } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const SplitCampaignCreationModal = ({ 
  isOpen, 
  onClose, 
  onCampaignCreated,
  campaign = null, // For editing existing campaigns
  // New modal system props
  onNavigate,
  onGoBack,
  currentView = 'main',
  viewData = {},
  canGoBack = false,
  modalId,
  isModal = false
}) => {
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    // Campaign Basics
    name: '',
    type: 'email',
    description: '',
    objective: 'engagement',
    
    // Audience
    audienceType: 'all',
    customAudience: '',
    segmentIds: [],
    expectedReach: 0,
    
    // Content
    subject: '',
    preheader: '',
    emailContent: '',
    smsContent: '',
    sender: {
      name: 'Your Company',
      email: 'noreply@yourcompany.com'
    },
    
    // Design
    template: 'modern',
    theme: 'blue',
    includeImages: true,
    includeButtons: true,
    
    // Scheduling
    sendType: 'immediate',
    scheduledDate: '',
    scheduledTime: '',
    timezone: 'UTC',
    
    // Testing
    enableABTest: false,
    abTestType: 'subject',
    abTestPercentage: 50,
    variantSubject: '',
    
    // Tracking
    trackOpens: true,
    trackClicks: true,
    trackConversions: true,
    utmTags: {
      source: '',
      medium: '',
      campaign: ''
    }
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data for editing
  useEffect(() => {
    if (campaign && (isOpen || isModal)) {
      setFormData({
        name: campaign.name || '',
        type: campaign.type || 'email',
        description: campaign.description || '',
        objective: campaign.objective || 'engagement',
        audienceType: campaign.audience === 'All Members' ? 'all' : 'custom',
        customAudience: campaign.audience !== 'All Members' ? campaign.audience : '',
        segmentIds: campaign.segmentIds || [],
        expectedReach: campaign.expectedReach || 0,
        subject: campaign.subject || '',
        preheader: campaign.preheader || '',
        emailContent: campaign.content || campaign.emailContent || '',
        smsContent: campaign.smsContent || '',
        sender: {
          name: campaign.sender?.name || 'Your Company',
          email: campaign.sender?.email || 'noreply@yourcompany.com'
        },
        template: campaign.template || 'modern',
        theme: campaign.theme || 'blue',
        includeImages: campaign.includeImages !== false,
        includeButtons: campaign.includeButtons !== false,
        sendType: campaign.sendType || 'immediate',
        scheduledDate: campaign.scheduledDate ? campaign.scheduledDate.split('T')[0] : '',
        scheduledTime: campaign.scheduledTime || '',
        timezone: campaign.timezone || 'UTC',
        enableABTest: campaign.enableABTest || false,
        abTestType: campaign.abTestType || 'subject',
        abTestPercentage: campaign.abTestPercentage || 50,
        variantSubject: campaign.variantSubject || '',
        trackOpens: campaign.trackOpens !== false,
        trackClicks: campaign.trackClicks !== false,
        trackConversions: campaign.trackConversions !== false,
        utmTags: {
          source: campaign.utmTags?.source || '',
          medium: campaign.utmTags?.medium || '',
          campaign: campaign.utmTags?.campaign || ''
        }
      });
    }
  }, [campaign, isOpen, isModal]);

  const steps = [
    { 
      id: 'basics', 
      title: 'Campaign Basics', 
      description: 'Name, type, and objective',
      icon: Target,
      fields: ['name', 'type', 'description', 'objective']
    },
    { 
      id: 'audience', 
      title: 'Target Audience', 
      description: 'Who will receive this campaign',
      icon: Users,
      fields: ['audienceType', 'customAudience']
    },
    { 
      id: 'content', 
      title: 'Content & Message', 
      description: 'Email content and design',
      icon: Edit,
      fields: ['subject', 'emailContent', 'smsContent']
    },
    { 
      id: 'design', 
      title: 'Design & Layout', 
      description: 'Template and visual styling',
      icon: Eye,
      fields: ['template', 'theme']
    },
    { 
      id: 'schedule', 
      title: 'Schedule & Send', 
      description: 'When to send the campaign',
      icon: Calendar,
      fields: ['sendType', 'scheduledDate']
    },
    { 
      id: 'review', 
      title: 'Review & Launch', 
      description: 'Final review before sending',
      icon: CheckCircle,
      fields: []
    }
  ];

  // Validation
  const validateStep = (stepIndex) => {
    const step = steps[stepIndex];
    const errors = {};
    
    if (step.id === 'basics') {
      if (!formData.name.trim()) {
        errors.name = 'Campaign name is required';
      }
      if (!formData.description.trim()) {
        errors.description = 'Campaign description is required';
      }
    }
    
    if (step.id === 'audience') {
      if (formData.audienceType === 'custom' && !formData.customAudience.trim()) {
        errors.customAudience = 'Custom audience description is required';
      }
    }
    
    if (step.id === 'content') {
      if (formData.type === 'email' && !formData.subject.trim()) {
        errors.subject = 'Email subject is required';
      }
      if (formData.type === 'email' && !formData.emailContent.trim()) {
        errors.emailContent = 'Email content is required';
      }
      if (formData.type === 'sms' && !formData.smsContent.trim()) {
        errors.smsContent = 'SMS content is required';
      }
    }
    
    if (step.id === 'schedule') {
      if (formData.sendType === 'scheduled') {
        if (!formData.scheduledDate) {
          errors.scheduledDate = 'Scheduled date is required';
        }
        if (!formData.scheduledTime) {
          errors.scheduledTime = 'Scheduled time is required';
        }
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  // Form submission
  const handleSubmit = async (isDraft = false) => {
    if (!isDraft && !validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCampaign = {
        id: campaign?.id || `campaign-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        description: formData.description,
        objective: formData.objective,
        audience: formData.audienceType === 'all' ? 'All Members' : formData.customAudience,
        segmentIds: formData.segmentIds,
        expectedReach: formData.expectedReach,
        subject: formData.subject,
        preheader: formData.preheader,
        content: formData.emailContent,
        emailContent: formData.emailContent,
        smsContent: formData.smsContent,
        sender: formData.sender,
        template: formData.template,
        theme: formData.theme,
        includeImages: formData.includeImages,
        includeButtons: formData.includeButtons,
        sendType: formData.sendType,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        timezone: formData.timezone,
        enableABTest: formData.enableABTest,
        abTestType: formData.abTestType,
        abTestPercentage: formData.abTestPercentage,
        variantSubject: formData.variantSubject,
        trackOpens: formData.trackOpens,
        trackClicks: formData.trackClicks,
        trackConversions: formData.trackConversions,
        utmTags: formData.utmTags,
        status: isDraft ? 'Draft' : 
                formData.sendType === 'immediate' ? 'Sent' : 'Scheduled',
        createdAt: campaign?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        launchDate: formData.sendType === 'immediate' ? new Date().toISOString() : formData.scheduledDate
      };
      
      if (onCampaignCreated) {
        onCampaignCreated(newCampaign);
      }
      
      setIsSubmitting(false);
      handleClose();
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isModal && onGoBack) {
      onGoBack();
    } else if (onClose) {
      onClose();
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basics':
        return <BasicsStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'audience':
        return <AudienceStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'content':
        return <ContentStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'design':
        return <DesignStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'schedule':
        return <ScheduleStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'review':
        return <ReviewStep formData={formData} campaign={campaign} />;
      default:
        return <BasicsStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
    }
  };

  // For legacy mode (when not using modal system)
  if (!isModal) {
    if (!isOpen) return null;
    
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 15200,
          backdropFilter: 'blur(4px)'
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 15201,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {renderModalContent()}
        </div>
      </div>
    );
  }

  // For modal system mode
  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {renderModalContent()}
    </div>
  );

  function renderModalContent() {
    return (
      <>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          flexShrink: 0
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
              {campaign ? 'Edit Campaign' : 'Create Campaign'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: '0.25rem 0 0 0' }}>
              {steps[currentStep].description}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Preview Toggle */}
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: isPreviewMode ? COLORS.evergreen : 'transparent',
                color: isPreviewMode ? 'white' : COLORS.onyxMedium,
                border: `1px solid ${isPreviewMode ? COLORS.evergreen : 'rgba(0,0,0,0.15)'}`,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
              {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </button>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
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
                transition: 'all 0.2s ease'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          gap: '0.25rem',
          backgroundColor: '#fafbfc',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isAccessible = index <= currentStep;
            
            return (
              <button
                key={step.id}
                onClick={() => isAccessible && handleStepClick(index)}
                disabled={!isAccessible}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: 'fit-content',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  backgroundColor: isActive ? 'rgba(26, 76, 73, 0.1)' : 
                                  isCompleted ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                  border: `1px solid ${isActive ? COLORS.evergreen : 
                                      isCompleted ? 'rgba(76, 175, 80, 0.3)' : 'transparent'}`,
                  color: isActive ? COLORS.evergreen : 
                         isCompleted ? '#4CAF50' : 
                         isAccessible ? COLORS.onyx : COLORS.onyxMedium,
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  opacity: isAccessible ? 1 : 0.5
                }}
              >
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  backgroundColor: isActive ? COLORS.evergreen : 
                                  isCompleted ? '#4CAF50' : 'rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  {isCompleted ? (
                    <Check size={16} color="white" />
                  ) : (
                    <IconComponent size={16} color={isActive ? 'white' : COLORS.onyxMedium} />
                  )}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.125rem' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    Step {index + 1} of {steps.length}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {isPreviewMode ? (
            <CampaignPreview formData={formData} />
          ) : (
            <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {renderStepContent()}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
            Step {currentStep + 1} of {steps.length}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Draft Save Button */}
            {currentStep === steps.length - 1 && (
              <button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  color: COLORS.onyx,
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.5 : 1
                }}
              >
                <Save size={16} />
                Save Draft
              </button>
            )}
            
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                color: currentStep === 0 ? COLORS.onyxMedium : COLORS.onyx,
                border: '1px solid rgba(0, 0, 0, 0.15)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: currentStep === 0 ? 0.5 : 1
              }}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            
            {/* Next/Submit Button */}
            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    {formData.sendType === 'immediate' ? 'Sending...' : 'Scheduling...'}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {formData.sendType === 'immediate' ? 'Send Campaign' : 'Schedule Campaign'}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Next
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* CSS for spin animation */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </>
    );
  }
};

// Step Components
const BasicsStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Campaign Basics
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Start by defining the core details of your campaign.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Campaign Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.name ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
          placeholder="e.g., Black Friday Sale 2024"
        />
        {errors.name && (
          <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
            {errors.name}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Campaign Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="email">Email Campaign</option>
            <option value="sms">SMS Campaign</option>
            <option value="push">Push Notification</option>
            <option value="multi">Multi-Channel</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Campaign Objective
          </label>
          <select
            value={formData.objective}
            onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="engagement">Engagement</option>
            <option value="conversion">Conversion</option>
            <option value="retention">Retention</option>
            <option value="awareness">Brand Awareness</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Campaign Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.description ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
          placeholder="Describe the purpose and goals of this campaign..."
        />
        {errors.description && (
          <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
            {errors.description}
          </span>
        )}
      </div>
    </div>
  </div>
);

const AudienceStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Target Audience
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Define who will receive this campaign.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '1rem' }}>
          Who should receive this campaign?
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="audienceType"
              value="all"
              checked={formData.audienceType === 'all'}
              onChange={(e) => setFormData(prev => ({ ...prev, audienceType: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>All subscribers</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="audienceType"
              value="segment"
              checked={formData.audienceType === 'segment'}
              onChange={(e) => setFormData(prev => ({ ...prev, audienceType: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Specific segments</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="audienceType"
              value="custom"
              checked={formData.audienceType === 'custom'}
              onChange={(e) => setFormData(prev => ({ ...prev, audienceType: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Custom audience</span>
          </label>
        </div>
      </div>

      {formData.audienceType === 'custom' && (
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Describe your custom audience *
          </label>
          <textarea
            value={formData.customAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, customAudience: e.target.value }))}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.customAudience ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="e.g., VIP customers who purchased in the last 30 days"
          />
          {errors.customAudience && (
            <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
              {errors.customAudience}
            </span>
          )}
        </div>
      )}

      {/* Audience Summary */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'rgba(26, 76, 73, 0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(26, 76, 73, 0.1)'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Estimated Reach
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Users size={24} color={COLORS.evergreen} />
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.onyx }}>
              {formData.expectedReach || Math.floor(Math.random() * 10000) + 1000}
            </div>
            <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
              subscribers will receive this campaign
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContentStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Content & Message
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Create compelling content for your {formData.type} campaign.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {formData.type === 'email' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                From Name
              </label>
              <input
                type="text"
                value={formData.sender.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  sender: { ...prev.sender, name: e.target.value }
                }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
                placeholder="Your Company"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                From Email
              </label>
              <input
                type="email"
                value={formData.sender.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  sender: { ...prev.sender, email: e.target.value }
                }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
                placeholder="noreply@yourcompany.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Subject Line *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.subject ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              placeholder="e.g., Don't miss out on our Black Friday deals!"
            />
            {errors.subject && (
              <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                {errors.subject}
              </span>
            )}
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem' }}>
              Keep it under 50 characters for better mobile display
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Preview Text (Optional)
            </label>
            <input
              type="text"
              value={formData.preheader}
              onChange={(e) => setFormData(prev => ({ ...prev, preheader: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              placeholder="This text appears next to the subject line in email clients"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Email Content *
            </label>
            <textarea
              value={formData.emailContent}
              onChange={(e) => setFormData(prev => ({ ...prev, emailContent: e.target.value }))}
              rows={8}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.emailContent ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              placeholder="Write your email content here..."
            />
            {errors.emailContent && (
              <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                {errors.emailContent}
              </span>
            )}
          </div>
        </>
      )}

      {formData.type === 'sms' && (
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            SMS Message *
          </label>
          <textarea
            value={formData.smsContent}
            onChange={(e) => setFormData(prev => ({ ...prev, smsContent: e.target.value }))}
            rows={4}
            maxLength={160}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.smsContent ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Keep your SMS message concise and compelling..."
          />
          {errors.smsContent && (
            <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
              {errors.smsContent}
            </span>
          )}
          <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginTop: '0.25rem' }}>
            {formData.smsContent.length}/160 characters
          </div>
        </div>
      )}
    </div>
  </div>
);

const DesignStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Design & Layout
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Choose the visual design for your campaign.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Template Selection */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Email Template
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {['modern', 'classic', 'minimal', 'bold'].map(template => (
            <button
              key={template}
              onClick={() => setFormData(prev => ({ ...prev, template }))}
              style={{
                padding: '1.5rem',
                backgroundColor: formData.template === template ? 'rgba(26, 76, 73, 0.1)' : 'white',
                border: `2px solid ${formData.template === template ? COLORS.evergreen : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '100%',
                height: '80px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Mail size={24} color={COLORS.onyxMedium} />
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: COLORS.onyx,
                textTransform: 'capitalize'
              }}>
                {template}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Color Theme
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { name: 'blue', color: COLORS.blue },
            { name: 'green', color: COLORS.evergreen },
            { name: 'purple', color: COLORS.purple },
            { name: 'orange', color: COLORS.orange },
            { name: 'red', color: COLORS.red }
          ].map(theme => (
            <button
              key={theme.name}
              onClick={() => setFormData(prev => ({ ...prev, theme: theme.name }))}
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: theme.color,
                border: `3px solid ${formData.theme === theme.name ? COLORS.onyx : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Options */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Content Options
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.includeImages}
              onChange={(e) => setFormData(prev => ({ ...prev, includeImages: e.target.checked }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Include header images</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.includeButtons}
              onChange={(e) => setFormData(prev => ({ ...prev, includeButtons: e.target.checked }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Include call-to-action buttons</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const ScheduleStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Schedule & Send
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Choose when to send your campaign.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Send Options
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="sendType"
              value="immediate"
              checked={formData.sendType === 'immediate'}
              onChange={(e) => setFormData(prev => ({ ...prev, sendType: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Send immediately</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="sendType"
              value="scheduled"
              checked={formData.sendType === 'scheduled'}
              onChange={(e) => setFormData(prev => ({ ...prev, sendType: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Schedule for later</span>
          </label>
        </div>
      </div>

      {formData.sendType === 'scheduled' && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(0, 123, 191, 0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(0, 123, 191, 0.1)'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
            Schedule Details
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                Date *
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.scheduledDate ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
              {errors.scheduledDate && (
                <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                  {errors.scheduledDate}
                </span>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                Time *
              </label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.scheduledTime ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
              {errors.scheduledTime && (
                <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                  {errors.scheduledTime}
                </span>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="CST">Central Time</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* A/B Testing */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={formData.enableABTest}
            onChange={(e) => setFormData(prev => ({ ...prev, enableABTest: e.target.checked }))}
          />
          <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
            Enable A/B Testing
          </span>
        </label>

        {formData.enableABTest && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 193, 7, 0.05)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 193, 7, 0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Test Type
                </label>
                <select
                  value={formData.abTestType}
                  onChange={(e) => setFormData(prev => ({ ...prev, abTestType: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="subject">Subject Line</option>
                  <option value="content">Email Content</option>
                  <option value="sender">Sender Name</option>
                  <option value="timing">Send Time</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Test Split
                </label>
                <select
                  value={formData.abTestPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, abTestPercentage: parseInt(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value={50}>50/50 Split</option>
                  <option value={30}>70/30 Split</option>
                  <option value={20}>80/20 Split</option>
                  <option value={10}>90/10 Split</option>
                </select>
              </div>
            </div>
            
            {formData.abTestType === 'subject' && (
              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Variant Subject Line
                </label>
                <input
                  type="text"
                  value={formData.variantSubject}
                  onChange={(e) => setFormData(prev => ({ ...prev, variantSubject: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Alternative subject line to test"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const ReviewStep = ({ formData, campaign }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Review & Launch
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Review your campaign settings before {formData.sendType === 'immediate' ? 'sending' : 'scheduling'}.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {/* Campaign Overview */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
          Campaign Overview
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Name</span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>{formData.name}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Type</span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx, textTransform: 'capitalize' }}>
              {formData.type}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Objective</span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx, textTransform: 'capitalize' }}>
              {formData.objective}
            </span>
          </div>
        </div>
      </div>

      {/* Audience & Timing */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
          Audience & Timing
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Audience</span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
              {formData.audienceType === 'all' ? 'All subscribers' : 
               formData.audienceType === 'segment' ? 'Selected segments' : 
               formData.customAudience}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Send Type</span>
            <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx, textTransform: 'capitalize' }}>
              {formData.sendType === 'immediate' ? 'Send immediately' : 'Scheduled'}
            </span>
          </div>
          {formData.sendType === 'scheduled' && (
            <div>
              <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block' }}>Schedule</span>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
                {formData.scheduledDate} at {formData.scheduledTime} ({formData.timezone})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Content Preview */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
        Content Preview
      </h3>
      {formData.type === 'email' ? (
        <div style={{
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            fontSize: '0.875rem'
          }}>
            <div><strong>From:</strong> {formData.sender.name} &lt;{formData.sender.email}&gt;</div>
            <div><strong>Subject:</strong> {formData.subject}</div>
            {formData.preheader && <div><strong>Preview:</strong> {formData.preheader}</div>}
          </div>
          <div style={{ padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
            {formData.emailContent}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          fontFamily: 'monospace'
        }}>
          {formData.smsContent}
        </div>
      )}
    </div>

    {/* Final Confirmation */}
    <div style={{
      padding: '1.5rem',
      backgroundColor: formData.sendType === 'immediate' ? 'rgba(244, 67, 54, 0.05)' : 'rgba(0, 123, 191, 0.05)',
      borderRadius: '1rem',
      border: `1px solid ${formData.sendType === 'immediate' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(0, 123, 191, 0.2)'}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: formData.sendType === 'immediate' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(0, 123, 191, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {formData.sendType === 'immediate' ? 
            <Send size={16} color="#F44336" /> : 
            <Clock size={16} color={COLORS.blue} />
          }
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.25rem 0' }}>
            Ready to {formData.sendType === 'immediate' ? 'send' : 'schedule'}?
          </h4>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
            {formData.sendType === 'immediate' ? 
              'Your campaign will be sent immediately after clicking the send button.' :
              `Your campaign will be sent on ${formData.scheduledDate} at ${formData.scheduledTime}.`
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CampaignPreview = ({ formData }) => (
  <div style={{ padding: '2rem', backgroundColor: '#fafbfc', height: '100%', overflow: 'auto' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        {formData.type === 'email' ? (
          <>
            {/* Email Header */}
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.875rem'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>From:</strong> {formData.sender.name} &lt;{formData.sender.email}&gt;
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Subject:</strong> {formData.subject || 'Your email subject'}
              </div>
              {formData.preheader && (
                <div style={{ color: COLORS.onyxMedium }}>
                  {formData.preheader}
                </div>
              )}
            </div>
            
            {/* Email Body */}
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.onyx, margin: '0 0 1rem 0' }}>
                  {formData.name || 'Your Campaign'}
                </h1>
              </div>
              
              <div style={{ fontSize: '1rem', lineHeight: '1.6', color: COLORS.onyx }}>
                {formData.emailContent ? (
                  formData.emailContent.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p style={{ color: COLORS.onyxMedium }}>
                    Your email content will appear here.
                  </p>
                )}
              </div>
              
              {formData.includeButtons && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: COLORS.evergreen,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}>
                    Call to Action
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Smartphone size={48} color={COLORS.onyxMedium} style={{ marginBottom: '1rem' }} />
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: '1.6'
            }}>
              {formData.smsContent || 'Your SMS message will appear here.'}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SplitCampaignCreationModal;
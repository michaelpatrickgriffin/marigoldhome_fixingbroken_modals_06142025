// src/components/loyalty/FullScreenLoyaltyProgramModal.js - Updated for Modal System
import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, Check, AlertCircle, Lightbulb, Target, Gift, Users, Calendar, DollarSign, Percent, Star, Zap, Settings, Eye, EyeOff, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const FullScreenLoyaltyProgramModal = ({ 
  isOpen, 
  onClose, 
  onProgramCreated,
  program = null, // For editing existing programs
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
    // Basic Details
    name: '',
    description: '',
    type: 'points',
    status: 'draft',
    
    // Audience & Targeting  
    targetAudience: 'all',
    customAudience: '',
    geographicScope: 'all',
    demographicFilters: [],
    
    // Program Structure
    pointsStructure: {
      earnRate: 1,
      spendRate: 100,
      bonusMultipliers: [],
      expirationEnabled: false,
      expirationMonths: 12
    },
    tiers: [],
    
    // Rewards & Benefits
    rewards: [],
    welcomeBonus: {
      enabled: false,
      points: 500,
      conditions: []
    },
    
    // Communications
    communications: {
      welcomeEmail: true,
      monthlyStatements: true,
      promotionalEmails: true,
      birthdayOffers: true,
      anniversaryOffers: false
    },
    
    // Launch Settings
    launchDate: new Date().toISOString().split('T')[0],
    testGroup: false,
    testPercentage: 10
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data for editing
  useEffect(() => {
    if (program && (isOpen || isModal)) {
      setFormData({
        name: program.title || program.name || '',
        description: program.description || '',
        type: program.programType || 'points',
        status: program.status?.toLowerCase() || 'draft',
        targetAudience: program.audience === 'All Members' ? 'all' : 'custom',
        customAudience: program.audience !== 'All Members' ? program.audience : '',
        geographicScope: 'all',
        demographicFilters: [],
        pointsStructure: {
          earnRate: program.earnRate || 1,
          spendRate: program.spendRate || 100,
          bonusMultipliers: program.bonusMultipliers || [],
          expirationEnabled: program.pointsExpire || false,
          expirationMonths: program.expirationMonths || 12
        },
        tiers: program.tiers || [],
        rewards: program.rewards || [],
        welcomeBonus: {
          enabled: program.welcomeBonus?.enabled || false,
          points: program.welcomeBonus?.points || 500,
          conditions: program.welcomeBonus?.conditions || []
        },
        communications: {
          welcomeEmail: true,
          monthlyStatements: true,
          promotionalEmails: true,
          birthdayOffers: true,
          anniversaryOffers: false,
          ...(program.communications || {})
        },
        launchDate: program.launchDate ? program.launchDate.split('T')[0] : new Date().toISOString().split('T')[0],
        testGroup: program.testGroup || false,
        testPercentage: program.testPercentage || 10
      });
    }
  }, [program, isOpen, isModal]);

  const steps = [
    { 
      id: 'basics', 
      title: 'Basic Details', 
      description: 'Program name and core settings',
      icon: Settings,
      fields: ['name', 'description', 'type']
    },
    { 
      id: 'audience', 
      title: 'Target Audience', 
      description: 'Define who can join the program',
      icon: Users,
      fields: ['targetAudience', 'customAudience']
    },
    { 
      id: 'structure', 
      title: 'Program Structure', 
      description: 'Points, tiers, and earning rules',
      icon: Star,
      fields: ['pointsStructure', 'tiers']
    },
    { 
      id: 'rewards', 
      title: 'Rewards & Benefits', 
      description: 'Define available rewards',
      icon: Gift,
      fields: ['rewards', 'welcomeBonus']
    },
    { 
      id: 'communications', 
      title: 'Communications', 
      description: 'Email and notification settings',
      icon: Lightbulb,
      fields: ['communications']
    },
    { 
      id: 'launch', 
      title: 'Launch Settings', 
      description: 'When and how to launch',
      icon: Zap,
      fields: ['launchDate', 'testGroup']
    }
  ];

  // Validation
  const validateStep = (stepIndex) => {
    const step = steps[stepIndex];
    const errors = {};
    
    if (step.id === 'basics') {
      if (!formData.name.trim()) {
        errors.name = 'Program name is required';
      }
      if (!formData.description.trim()) {
        errors.description = 'Program description is required';
      }
    }
    
    if (step.id === 'audience') {
      if (formData.targetAudience === 'custom' && !formData.customAudience.trim()) {
        errors.customAudience = 'Custom audience description is required';
      }
    }
    
    if (step.id === 'structure') {
      if (!formData.pointsStructure.earnRate || formData.pointsStructure.earnRate < 0.1) {
        errors.earnRate = 'Earn rate must be at least 0.1';
      }
      if (!formData.pointsStructure.spendRate || formData.pointsStructure.spendRate < 1) {
        errors.spendRate = 'Spend rate must be at least 1';
      }
    }
    
    if (step.id === 'rewards') {
      if (formData.rewards.length === 0) {
        errors.rewards = 'At least one reward must be defined';
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
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProgram = {
        id: program?.id || `loyalty-${Date.now()}`,
        title: formData.name,
        name: formData.name,
        description: formData.description,
        type: 'Loyalty Program',
        programType: formData.type,
        status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
        audience: formData.targetAudience === 'all' ? 'All Members' : formData.customAudience,
        earnRate: formData.pointsStructure.earnRate,
        spendRate: formData.pointsStructure.spendRate,
        pointsExpire: formData.pointsStructure.expirationEnabled,
        expirationMonths: formData.pointsStructure.expirationMonths,
        tiers: formData.tiers,
        rewards: formData.rewards,
        welcomeBonus: formData.welcomeBonus,
        communications: formData.communications,
        launchDate: formData.launchDate,
        testGroup: formData.testGroup,
        testPercentage: formData.testPercentage,
        createdAt: program?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (onProgramCreated) {
        onProgramCreated(newProgram);
      }
      
      setIsSubmitting(false);
      handleClose();
      
    } catch (error) {
      console.error('Error creating program:', error);
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
      case 'structure':
        return <StructureStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'rewards':
        return <RewardsStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'communications':
        return <CommunicationsStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
      case 'launch':
        return <LaunchStep formData={formData} setFormData={setFormData} errors={validationErrors} />;
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
          zIndex: 15600,
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
            zIndex: 15601,
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
              {program ? 'Edit Loyalty Program' : 'Create Loyalty Program'}
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
            <ProgramPreview formData={formData} />
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
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
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
                    {program ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {program ? 'Update Program' : 'Create Program'}
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
        Program Basics
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Start by defining the core details of your loyalty program.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Program Name *
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
          placeholder="e.g., VIP Rewards Program"
        />
        {errors.name && (
          <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Program Description *
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
          placeholder="Describe what makes your program special and what benefits members will receive..."
        />
        {errors.description && (
          <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
            {errors.description}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Program Type
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
            <option value="points">Points-Based</option>
            <option value="tiers">Tier-Based</option>
            <option value="cashback">Cashback</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Initial Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
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
        Define who is eligible to join your loyalty program.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '1rem' }}>
          Who can join this program?
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="targetAudience"
              value="all"
              checked={formData.targetAudience === 'all'}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>All customers</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="targetAudience"
              value="custom"
              checked={formData.targetAudience === 'custom'}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            />
            <span style={{ fontSize: '1rem', color: COLORS.onyx }}>Specific customer segments</span>
          </label>
        </div>
      </div>

      {formData.targetAudience === 'custom' && (
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            Describe your target audience *
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
            placeholder="e.g., High-value customers with 3+ purchases in the last 6 months"
          />
          {errors.customAudience && (
            <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
              {errors.customAudience}
            </span>
          )}
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Geographic Scope
        </label>
        <select
          value={formData.geographicScope}
          onChange={(e) => setFormData(prev => ({ ...prev, geographicScope: e.target.value }))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        >
          <option value="all">All locations</option>
          <option value="domestic">Domestic only</option>
          <option value="international">International only</option>
          <option value="specific">Specific regions</option>
        </select>
      </div>
    </div>
  </div>
);

const StructureStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Program Structure
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Configure how customers earn and spend points in your program.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Points Structure */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Points Configuration
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Earn Rate (points per $1) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={formData.pointsStructure.earnRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pointsStructure: { ...prev.pointsStructure, earnRate: parseFloat(e.target.value) || 0 }
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.earnRate ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {errors.earnRate && (
              <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                {errors.earnRate}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Spend Rate (points per $1 off) *
            </label>
            <input
              type="number"
              min="1"
              value={formData.pointsStructure.spendRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pointsStructure: { ...prev.pointsStructure, spendRate: parseInt(e.target.value) || 0 }
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.spendRate ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            {errors.spendRate && (
              <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                {errors.spendRate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Points Expiration */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.pointsStructure.expirationEnabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              pointsStructure: { ...prev.pointsStructure, expirationEnabled: e.target.checked }
            }))}
          />
          <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
            Points expire after a period of inactivity
          </span>
        </label>
        
        {formData.pointsStructure.expirationEnabled && (
          <div style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Expiration Period (months)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.pointsStructure.expirationMonths}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pointsStructure: { ...prev.pointsStructure, expirationMonths: parseInt(e.target.value) || 12 }
              }))}
              style={{
                width: '200px',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

const RewardsStep = ({ formData, setFormData, errors }) => {
  const addReward = () => {
    const newReward = {
      id: Date.now(),
      name: '',
      type: 'discount',
      value: '',
      pointsCost: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      rewards: [...prev.rewards, newReward]
    }));
  };

  const updateReward = (id, updates) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.map(reward => 
        reward.id === id ? { ...reward, ...updates } : reward
      )
    }));
  };

  const removeReward = (id) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.filter(reward => reward.id !== id)
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Rewards & Benefits
        </h2>
        <p style={{ color: COLORS.onyxMedium }}>
          Define what rewards members can earn with their points.
        </p>
      </div>

      {/* Welcome Bonus */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'rgba(26, 76, 73, 0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(26, 76, 73, 0.1)'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={formData.welcomeBonus.enabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              welcomeBonus: { ...prev.welcomeBonus, enabled: e.target.checked }
            }))}
          />
          <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
            Offer welcome bonus to new members
          </span>
        </label>

        {formData.welcomeBonus.enabled && (
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Welcome Bonus Points
            </label>
            <input
              type="number"
              min="0"
              value={formData.welcomeBonus.points}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                welcomeBonus: { ...prev.welcomeBonus, points: parseInt(e.target.value) || 0 }
              }))}
              style={{
                width: '200px',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              placeholder="500"
            />
          </div>
        )}
      </div>

      {/* Rewards List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
            Available Rewards
          </h3>
          <button
            onClick={addReward}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: COLORS.evergreen,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            Add Reward
          </button>
        </div>

        {errors.rewards && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.red }}>
              {errors.rewards}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {formData.rewards.map(reward => (
            <div key={reward.id} style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '1rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx, margin: 0 }}>
                  Reward #{formData.rewards.indexOf(reward) + 1}
                </h4>
                <button
                  onClick={() => removeReward(reward.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: COLORS.red,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Reward Name
                  </label>
                  <input
                    type="text"
                    value={reward.name}
                    onChange={(e) => updateReward(reward.id, { name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    placeholder="e.g., $5 Off Next Purchase"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Reward Type
                  </label>
                  <select
                    value={reward.type}
                    onChange={(e) => updateReward(reward.id, { type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="discount">Discount</option>
                    <option value="free_product">Free Product</option>
                    <option value="free_shipping">Free Shipping</option>
                    <option value="exclusive_access">Exclusive Access</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Points Cost
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={reward.pointsCost}
                    onChange={(e) => updateReward(reward.id, { pointsCost: parseInt(e.target.value) || 0 })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    placeholder="500"
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.rewards.length === 0 && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              border: '2px dashed rgba(0, 0, 0, 0.1)',
              borderRadius: '1rem',
              color: COLORS.onyxMedium
            }}>
              <Gift size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No rewards added yet. Click "Add Reward" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommunicationsStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Communications
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Configure how you'll communicate with program members.
      </p>
    </div>

    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
        Email Communications
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { key: 'welcomeEmail', label: 'Welcome email for new members', description: 'Send a welcome message when someone joins' },
          { key: 'monthlyStatements', label: 'Monthly points statements', description: 'Regular updates on points balance and activity' },
          { key: 'promotionalEmails', label: 'Promotional offers and campaigns', description: 'Special deals and limited-time offers' },
          { key: 'birthdayOffers', label: 'Birthday offers', description: 'Special rewards on member birthdays' },
          { key: 'anniversaryOffers', label: 'Program anniversary offers', description: 'Celebrate membership milestones' }
        ].map(comm => (
          <div key={comm.key} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <input
              type="checkbox"
              checked={formData.communications[comm.key]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                communications: { ...prev.communications, [comm.key]: e.target.checked }
              }))}
              style={{ marginTop: '0.25rem' }}
            />
            <div>
              <label style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx, display: 'block', marginBottom: '0.25rem' }}>
                {comm.label}
              </label>
              <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: 0 }}>
                {comm.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LaunchStep = ({ formData, setFormData, errors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
        Launch Settings
      </h2>
      <p style={{ color: COLORS.onyxMedium }}>
        Configure when and how your program will go live.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
          Launch Date
        </label>
        <input
          type="date"
          value={formData.launchDate}
          onChange={(e) => setFormData(prev => ({ ...prev, launchDate: e.target.value }))}
          style={{
            width: '200px',
            padding: '0.75rem',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{
        padding: '1.5rem',
        backgroundColor: 'rgba(0, 123, 191, 0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(0, 123, 191, 0.1)'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={formData.testGroup}
            onChange={(e) => setFormData(prev => ({ ...prev, testGroup: e.target.checked }))}
          />
          <span style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
            Launch with test group first
          </span>
        </label>

        {formData.testGroup && (
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
              Test Group Percentage
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.testPercentage}
              onChange={(e) => setFormData(prev => ({ ...prev, testPercentage: parseInt(e.target.value) || 10 }))}
              style={{
                width: '100px',
                padding: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginLeft: '0.5rem' }}>
              % of eligible customers
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ProgramPreview = ({ formData }) => (
  <div style={{ padding: '2rem', backgroundColor: '#fafbfc', height: '100%', overflow: 'auto' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
            {formData.name || 'Your Loyalty Program'}
          </h1>
          <p style={{ fontSize: '1rem', color: COLORS.onyxMedium, lineHeight: '1.5' }}>
            {formData.description || 'Program description will appear here.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(26, 76, 73, 0.05)', borderRadius: '0.5rem' }}>
            <Star size={24} color={COLORS.evergreen} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              {formData.pointsStructure.earnRate}
            </div>
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
              Points per $1
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(0, 123, 191, 0.05)', borderRadius: '0.5rem' }}>
            <DollarSign size={24} color={COLORS.blue} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              {formData.pointsStructure.spendRate}
            </div>
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
              Points = $1 off
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255, 193, 7, 0.05)', borderRadius: '0.5rem' }}>
            <Gift size={24} color={COLORS.amber} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              {formData.rewards.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
              Available Rewards
            </div>
          </div>
        </div>

        {formData.welcomeBonus.enabled && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <Zap size={20} color="#4CAF50" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1rem', fontWeight: 500, color: COLORS.onyx }}>
              Welcome Bonus: {formData.welcomeBonus.points} Points
            </div>
          </div>
        )}

        <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, textAlign: 'center' }}>
          This is how your program will appear to customers
        </div>
      </div>
    </div>
  </div>
);

export default FullScreenLoyaltyProgramModal;
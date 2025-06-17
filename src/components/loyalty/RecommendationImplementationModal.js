// src/components/loyalty/RecommendationImplementationModal.js - Updated for Modal System
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Edit, Trash2, Lightbulb, Target, TrendingUp, AlertCircle, Clock, Sparkles, ArrowRight, DollarSign, Users, Calendar, Star } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const RecommendationImplementationModal = ({ 
  isOpen, 
  onClose, 
  recommendation, 
  program, 
  action, 
  onProgramCreated,
  onNotificationCreated,
  // New modal system props
  onNavigate,
  onGoBack,
  currentView = 'main',
  viewData = {},
  canGoBack = false,
  modalId,
  isModal = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [customizations, setCustomizations] = useState({
    title: '',
    description: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    notes: ''
  });
  const [rejectionReason, setRejectionReason] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Use viewData when in modal system mode
  const currentRecommendation = viewData?.recommendation || recommendation;
  const currentProgram = viewData?.program || program;
  const currentAction = viewData?.action || action;

  // Reset state when modal opens or recommendation changes
  useEffect(() => {
    if ((isModal || isOpen) && currentRecommendation) {
      setIsProcessing(false);
      setIsComplete(false);
      setCustomizations({
        title: currentRecommendation.implementationDetails?.title || currentRecommendation.title || '',
        description: currentRecommendation.implementationDetails?.description || currentRecommendation.description || '',
        targetAudience: currentRecommendation.implementationDetails?.audience || 'All Members',
        budget: currentRecommendation.implementationDetails?.budget || '',
        timeline: currentRecommendation.implementationDetails?.timeline || '30 days',
        notes: ''
      });
      setRejectionReason('');
      setValidationErrors({});
    }
  }, [isOpen, isModal, currentRecommendation]);

  // Handle escape key for legacy mode
  useEffect(() => {
    const handleEscape = (e) => {
      if (!isModal && e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };

    if (!isModal && isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, isProcessing, isModal]);

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (currentAction === 'modify') {
      if (!customizations.title.trim()) {
        errors.title = 'Title is required';
      }
      if (!customizations.description.trim()) {
        errors.description = 'Description is required';
      }
      if (!customizations.targetAudience.trim()) {
        errors.targetAudience = 'Target audience is required';
      }
    }
    
    if (currentAction === 'reject' && !rejectionReason.trim()) {
      errors.rejectionReason = 'Rejection reason is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle action execution
  const handleExecuteAction = async () => {
    if (!currentRecommendation || !currentAction) return;
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Execute the action
      switch (currentAction) {
        case 'implement':
          await handleImplement();
          break;
        case 'modify':
          await handleModify();
          break;
        case 'reject':
          await handleReject();
          break;
        default:
          console.error('Unknown action:', currentAction);
      }

      setIsProcessing(false);
      setIsComplete(true);

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (error) {
      console.error('Error executing action:', error);
      setIsProcessing(false);
      // Could show error state here
    }
  };

  const handleImplement = async () => {
    console.log('Implementing recommendation:', currentRecommendation.id);
    
    // Create a new program or modify existing based on recommendation type
    if (currentRecommendation.title.toLowerCase().includes('program') || 
        currentRecommendation.implementationDetails?.type) {
      const newProgram = {
        id: `program-${Date.now()}`,
        title: customizations.title || currentRecommendation.implementationDetails?.title || currentRecommendation.title,
        type: currentRecommendation.implementationDetails?.type || 'Loyalty Program',
        status: 'Draft',
        audience: customizations.targetAudience || currentRecommendation.implementationDetails?.audience || 'All Members',
        description: customizations.description || currentRecommendation.implementationDetails?.description || currentRecommendation.description,
        budget: customizations.budget,
        timeline: customizations.timeline,
        createdFrom: 'recommendation',
        originalRecommendation: currentRecommendation,
        createdAt: new Date().toISOString()
      };
      
      if (onProgramCreated) {
        onProgramCreated(newProgram);
      }
    }
    
    // Always create a notification
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'success',
        title: 'Recommendation Implemented',
        message: `Successfully implemented: ${currentRecommendation.title}`,
        timestamp: new Date().toISOString(),
        action: 'implement',
        program: currentProgram,
        recommendation: currentRecommendation,
        customizations: customizations
      });
    }
  };

  const handleModify = async () => {
    console.log('Modifying recommendation:', currentRecommendation.id, customizations);
    
    // Create modified program/campaign
    const modifiedProgram = {
      id: `program-${Date.now()}`,
      title: customizations.title,
      type: currentRecommendation.implementationDetails?.type || 'Loyalty Program',
      status: 'Draft',
      audience: customizations.targetAudience,
      description: customizations.description,
      budget: customizations.budget,
      timeline: customizations.timeline,
      createdFrom: 'modified-recommendation',
      originalRecommendation: currentRecommendation,
      modifications: customizations.notes,
      createdAt: new Date().toISOString()
    };
    
    if (onProgramCreated) {
      onProgramCreated(modifiedProgram);
    }
    
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'info',
        title: 'Recommendation Modified',
        message: `Modified and implemented: ${customizations.title}`,
        timestamp: new Date().toISOString(),
        action: 'modify',
        program: currentProgram,
        recommendation: currentRecommendation,
        customizations: customizations
      });
    }
  };

  const handleReject = async () => {
    console.log('Rejecting recommendation:', currentRecommendation.id, rejectionReason);
    
    if (onNotificationCreated) {
      onNotificationCreated({
        id: `notification-${Date.now()}`,
        type: 'warning',
        title: 'Recommendation Rejected',
        message: `Rejected: ${currentRecommendation.title}`,
        timestamp: new Date().toISOString(),
        action: 'reject',
        program: currentProgram,
        recommendation: currentRecommendation,
        reason: rejectionReason
      });
    }
  };

  const handleClose = () => {
    if (isModal && onGoBack) {
      onGoBack();
    } else if (onClose) {
      onClose();
    }
  };

  // Get action details for UI
  const getActionDetails = () => {
    switch (currentAction) {
      case 'implement':
        return {
          title: 'Implement Recommendation',
          description: 'Deploy this recommendation as configured',
          color: COLORS.evergreen,
          icon: CheckCircle
        };
      case 'modify':
        return {
          title: 'Modify Recommendation',
          description: 'Customize before implementation',
          color: COLORS.blue,
          icon: Edit
        };
      case 'reject':
        return {
          title: 'Reject Recommendation',
          description: 'Decline this recommendation with reason',
          color: COLORS.red,
          icon: Trash2
        };
      default:
        return {
          title: 'Process Recommendation',
          description: 'Take action on this recommendation',
          color: COLORS.onyx,
          icon: Target
        };
    }
  };

  const actionDetails = getActionDetails();
  const IconComponent = actionDetails.icon;

  // Render different views based on state
  const renderCurrentView = () => {
    if (isComplete) {
      return renderSuccessView();
    }
    
    return renderActionView();
  };

  const renderSuccessView = () => (
    <div style={{ 
      padding: '3rem 2rem', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px'
    }}>
      <div style={{
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        backgroundColor: `${actionDetails.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <IconComponent size={32} color={actionDetails.color} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 1rem 0' }}>
        {currentAction === 'implement' ? 'Recommendation Implemented!' : 
         currentAction === 'modify' ? 'Changes Saved!' : 
         'Recommendation Rejected'}
      </h2>
      <p style={{ color: COLORS.onyxMedium, fontSize: '1rem', lineHeight: '1.5', maxWidth: '400px' }}>
        {currentAction === 'implement' ? 'The recommendation has been successfully implemented and will be activated shortly.' :
         currentAction === 'modify' ? 'Your modifications have been saved and the recommendation has been implemented.' :
         'The recommendation has been rejected and will not be implemented.'}
      </p>
      
      {currentAction !== 'reject' && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(26, 76, 73, 0.05)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: COLORS.onyxMedium
        }}>
          <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Changes will be reflected in your dashboard within the next few minutes
        </div>
      )}
    </div>
  );

  const renderActionView = () => (
    <div style={{ 
      height: '100%', 
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Action Header */}
      <div style={{
        padding: '2rem 2rem 1rem 2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: `${actionDetails.color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconComponent size={20} color={actionDetails.color} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
              {actionDetails.title}
            </h2>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: '0.25rem 0 0 0' }}>
              {actionDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#fafbfc' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Recommendation Summary */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(26, 76, 73, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Lightbulb size={16} color={COLORS.evergreen} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
                  {currentRecommendation?.title}
                </h3>
                <p style={{ color: COLORS.onyxMedium, fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>
                  {currentRecommendation?.description}
                </p>
              </div>
            </div>
            
            {/* Impact Metrics */}
            {currentRecommendation?.expectedROI && (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '1rem',
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '0.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <TrendingUp size={14} color={COLORS.evergreen} />
                    <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, fontWeight: 500 }}>
                      Expected ROI
                    </span>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.evergreen }}>
                    {currentRecommendation.expectedROI}
                  </span>
                </div>
                {currentRecommendation.impact && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                      <Target size={14} color={COLORS.blue} />
                      <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, fontWeight: 500 }}>
                        Impact
                      </span>
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.blue }}>
                      {currentRecommendation.impact}
                    </span>
                  </div>
                )}
                {currentRecommendation.effort && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                      <Clock size={14} color={COLORS.amber} />
                      <span style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, fontWeight: 500 }}>
                        Effort
                      </span>
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.amber }}>
                      {currentRecommendation.effort}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action-specific Forms */}
          {currentAction === 'modify' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
                Customization Details
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Program Name *
                  </label>
                  <input
                    type="text"
                    value={customizations.title}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, title: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${validationErrors.title ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter program name"
                  />
                  {validationErrors.title && (
                    <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                      {validationErrors.title}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Description *
                  </label>
                  <textarea
                    value={customizations.description}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${validationErrors.description ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    placeholder="Describe your modifications"
                  />
                  {validationErrors.description && (
                    <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                      {validationErrors.description}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      Target Audience *
                    </label>
                    <input
                      type="text"
                      value={customizations.targetAudience}
                      onChange={(e) => setCustomizations(prev => ({ ...prev, targetAudience: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `1px solid ${validationErrors.targetAudience ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                      placeholder="e.g., VIP Members"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      Timeline
                    </label>
                    <select
                      value={customizations.timeline}
                      onChange={(e) => setCustomizations(prev => ({ ...prev, timeline: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="7 days">7 days</option>
                      <option value="14 days">14 days</option>
                      <option value="30 days">30 days</option>
                      <option value="60 days">60 days</option>
                      <option value="90 days">90 days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Budget (Optional)
                  </label>
                  <input
                    type="text"
                    value={customizations.budget}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, budget: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    placeholder="e.g., $10,000"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    Additional Notes
                  </label>
                  <textarea
                    value={customizations.notes}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    placeholder="Any specific requirements or constraints"
                  />
                </div>
              </div>
            </div>
          )}

          {currentAction === 'reject' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1.5rem' }}>
                Rejection Details
              </h4>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${validationErrors.rejectionReason ? COLORS.red : 'rgba(0, 0, 0, 0.2)'}`,
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  placeholder="Please provide a detailed reason for rejecting this recommendation..."
                />
                {validationErrors.rejectionReason && (
                  <span style={{ fontSize: '0.75rem', color: COLORS.red, marginTop: '0.25rem', display: 'block' }}>
                    {validationErrors.rejectionReason}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <button
              onClick={handleClose}
              disabled={isProcessing}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: 'white',
                color: COLORS.onyx,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                opacity: isProcessing ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteAction}
              disabled={isProcessing}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: actionDetails.color,
                color: 'white',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                opacity: isProcessing ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderTopColor: 'white', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite' 
                  }} />
                  Processing...
                </>
              ) : (
                <>
                  {currentAction === 'implement' ? (
                    <>
                      <CheckCircle size={16} />
                      Implement
                    </>
                  ) : currentAction === 'modify' ? (
                    <>
                      <Edit size={16} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Reject
                    </>
                  )}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isProcessing && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              border: `3px solid ${actionDetails.color}20`,
              borderTopColor: actionDetails.color,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }} />
            <p style={{ color: COLORS.onyx, fontSize: '1rem', fontWeight: 500 }}>
              Processing your request...
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // For legacy mode (when not using modal system)
  if (!isModal) {
    if (!isOpen || !currentRecommendation) return null;
    
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 15700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backdropFilter: 'blur(4px)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isProcessing) {
            onClose();
          }
        }}
      >
        <div
          style={{
            width: 'min(90vw, 600px)',
            maxHeight: '85vh',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 15701
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Legacy Header */}
          <div style={{
            padding: '2rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            position: 'relative',
            zIndex: 15702
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: `${actionDetails.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={20} color={actionDetails.color} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                    {actionDetails.title}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, margin: '0.25rem 0 0 0' }}>
                    {actionDetails.description}
                  </p>
                </div>
              </div>
              {!isProcessing && (
                <button
                  onClick={onClose}
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
              )}
            </div>
          </div>
          
          {renderCurrentView()}
        </div>
      </div>
    );
  }

  // For modal system mode
  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {renderCurrentView()}
      
      {/* CSS for spin animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RecommendationImplementationModal;
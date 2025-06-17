// src/components/common/ModalManager.js - Complete Implementation
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

// Modal Context for global state management
const ModalContext = createContext();

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal Provider Component
export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);
  
  // Open a new modal
  const openModal = (modalConfig) => {
    const modalId = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newModal = {
      id: modalId,
      currentView: modalConfig.initialView || 'main',
      navigationHistory: [],
      viewData: modalConfig.initialViewData || {},
      ...modalConfig,
      level: modalStack.length
    };
    
    setModalStack(prev => [...prev, newModal]);
    return modalId;
  };
  
  // Close specific modal
  const closeModal = (modalId) => {
    setModalStack(prev => {
      const modalToClose = prev.find(m => m.id === modalId);
      if (modalToClose?.onClose) {
        modalToClose.onClose();
      }
      return prev.filter(modal => modal.id !== modalId);
    });
  };
  
  // Close top modal
  const closeTopModal = () => {
    if (modalStack.length > 0) {
      const topModal = modalStack[modalStack.length - 1];
      closeModal(topModal.id);
    }
  };
  
  // Close all modals
  const closeAllModals = () => {
    modalStack.forEach(modal => {
      if (modal.onClose) {
        modal.onClose();
      }
    });
    setModalStack([]);
  };
  
  // Navigate within modal (for drill-downs)
  const navigateInModal = (modalId, newView, viewData = {}) => {
    setModalStack(prev => prev.map(modal => 
      modal.id === modalId 
        ? { 
            ...modal, 
            navigationHistory: [...(modal.navigationHistory || []), modal.currentView],
            currentView: newView,
            viewData: { ...modal.viewData, ...viewData }
          }
        : modal
    ));
  };
  
  // Go back in modal navigation
  const goBackInModal = (modalId) => {
    setModalStack(prev => prev.map(modal => {
      if (modal.id === modalId && modal.navigationHistory?.length > 0) {
        const history = [...modal.navigationHistory];
        const previousView = history.pop();
        return {
          ...modal,
          currentView: previousView,
          navigationHistory: history
        };
      }
      return modal;
    }));
  };
  
  // Handle escape key globally
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        const topModal = modalStack[modalStack.length - 1];
        if (topModal.allowEscapeClose !== false) {
          closeTopModal();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalStack]);
  
  const value = {
    modalStack,
    openModal,
    closeModal,
    closeTopModal,
    closeAllModals,
    navigateInModal,
    goBackInModal,
    activeModalCount: modalStack.length
  };
  
  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRenderer modalStack={modalStack} />
    </ModalContext.Provider>
  );
};

// Modal Renderer Component
const ModalRenderer = ({ modalStack }) => {
  if (modalStack.length === 0) return null;
  
  return (
    <>
      {modalStack.map((modal, index) => (
        <ModalContainer 
          key={modal.id} 
          modal={modal} 
          level={index}
          isTopLevel={index === modalStack.length - 1}
        />
      ))}
    </>
  );
};

// Individual Modal Container
const ModalContainer = ({ modal, level, isTopLevel }) => {
  const { closeModal, navigateInModal, goBackInModal } = useModal();
  
  // Calculate z-index based on level and modal type
  const getZIndex = () => {
    const baseZIndex = 15000; // From ZIndexStandards.css
    const levelMultiplier = 100;
    const typeBonus = {
      'critical': 1000,
      'confirmation': 500,
      'detail': 400,
      'creation': 300,
      'rfm-segment': 400,
      'campaign': 300
    };
    
    return baseZIndex + (level * levelMultiplier) + (typeBonus[modal.type] || 0);
  };
  
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && modal.allowBackdropClose !== false) {
      closeModal(modal.id);
    }
  };
  
  // Handle navigation
  const handleNavigate = (newView, viewData = {}) => {
    navigateInModal(modal.id, newView, viewData);
  };
  
  const handleGoBack = () => {
    goBackInModal(modal.id);
  };
  
  const canGoBack = modal.navigationHistory && modal.navigationHistory.length > 0;
  
  // Render modal content
  const renderContent = () => {
    if (modal.component) {
      const Component = modal.component;
      return (
        <Component
          {...(modal.props || {})}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
          currentView={modal.currentView}
          viewData={modal.viewData}
          canGoBack={canGoBack}
          modalId={modal.id}
          isModal={true}
          onClose={() => closeModal(modal.id)}
        />
      );
    }
    
    if (modal.content) {
      return modal.content;
    }
    
    return <div>No content provided</div>;
  };
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isTopLevel ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        zIndex: getZIndex(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: isTopLevel ? 'blur(4px)' : 'none'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: modal.borderRadius || '0.75rem',
          width: modal.width || (modal.fullscreen ? '100%' : '90%'),
          height: modal.height || (modal.fullscreen ? '100%' : 'auto'),
          maxWidth: modal.maxWidth || (modal.fullscreen ? '100%' : '1200px'),
          maxHeight: modal.maxHeight || (modal.fullscreen ? '100%' : '90vh'),
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          border: modal.fullscreen ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        {modal.showHeader !== false && (
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {canGoBack && (
                <button
                  onClick={handleGoBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    color: COLORS.onyxMedium,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '0.75rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: COLORS.onyx,
                  margin: 0
                }}>
                  {modal.title || 'Modal'}
                </h2>
                {modal.subtitle && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyxMedium,
                    margin: '0.25rem 0 0 0'
                  }}>
                    {modal.subtitle}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => closeModal(modal.id)}
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
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Modal Content */}
        <div style={{ 
          flex: 1, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// COMPLETE useCommonModals hook with all required functions
export const useCommonModals = () => {
  const { openModal, closeModal } = useModal();
  
  // RFM Segment Modal
  const openRFMSegmentModal = (segment, options = {}) => {
    return openModal({
      type: 'rfm-segment',
      title: segment ? `${segment} Segment Analysis` : 'RFM Segment Analysis',
      component: options.component,
      props: {
        segment: segment,
        ...options.props
      },
      width: '95%',
      height: '95%',
      fullscreen: true,
      onClose: options.onClose,
      ...options
    });
  };
  
  // Detail Modal
  const openDetailModal = (item, options = {}) => {
    return openModal({
      type: 'detail',
      title: item?.title || item?.name || 'Details',
      component: options.component,
      props: {
        program: item,
        ...options.props
      },
      width: '90%',
      height: '90%',
      onClose: options.onClose,
      ...options
    });
  };
  
  // Campaign Modal
  const openCampaignModal = (campaign, options = {}) => {
    return openModal({
      type: 'campaign',
      title: campaign ? `Edit ${campaign.name}` : 'Create Campaign',
      component: options.component,
      props: {
        campaign: campaign,
        ...options.props
      },
      fullscreen: options.fullscreen || true,
      onClose: options.onClose,
      ...options
    });
  };
  
  // Creation Modal
  const openCreationModal = (type, options = {}) => {
    const titles = {
      loyalty: 'Create Loyalty Program',
      campaign: 'Create Campaign',
      notification: 'Create Notification'
    };
    
    return openModal({
      type: 'creation',
      title: titles[type] || 'Create Item',
      component: options.component,
      props: options.props || {},
      width: options.width || '80%',
      height: options.height || '80%',
      onClose: options.onClose,
      ...options
    });
  };
  
  // Confirmation Modal
  const openConfirmationModal = (title, message, onConfirm, options = {}) => {
    return openModal({
      type: 'confirmation',
      title: title,
      showHeader: true,
      width: '400px',
      height: 'auto',
      component: ({ onClose }) => (
        <div style={{ padding: '1.5rem' }}>
          <p style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1rem',
            lineHeight: '1.5',
            color: COLORS.onyx
          }}>
            {message}
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            justifyContent: 'flex-end' 
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                background: 'white',
                color: COLORS.onyx,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                background: '#dc2626',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      allowBackdropClose: false,
      allowEscapeClose: true,
      onClose: options.onClose,
      ...options
    });
  };
  
  return {
    openModal,
    closeModal,
    openRFMSegmentModal,
    openDetailModal,
    openCampaignModal,
    openCreationModal,
    openConfirmationModal
  };
};
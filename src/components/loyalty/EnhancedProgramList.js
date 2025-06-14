// src/components/loyalty/EnhancedProgramList.js
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import ProgramCard from './ProgramCard';
import LoyaltyProgramCreationHandler from './LoyaltyProgramCreationHandler';
import FullScreenLoyaltyProgramModal from './FullScreenLoyaltyProgramModal';

// Enhanced Program List Component with Creation Capability
export const EnhancedProgramList = ({ 
  initialPrograms = [], 
  onProgramClick, 
  onProgramCreated,
  onNotificationCreated 
}) => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  // Update programs when initialPrograms changes
  useEffect(() => {
    console.log('%c ENHANCED PROGRAM LIST: initialPrograms changed', 'background: blue; color: white;');
    console.log('New initialPrograms:', initialPrograms);
    setPrograms(initialPrograms);
  }, [initialPrograms]);

  // Handle creating a new program
  const handleProgramCreated = (newProgram) => {
    console.log('%c ENHANCED PROGRAM LIST: New program created', 'background: green; color: white;');
    console.log('New program:', newProgram);
    
    // Update local state
    const updatedPrograms = [newProgram, ...programs];
    console.log('Updated programs array:', updatedPrograms);
    setPrograms(updatedPrograms);
    
    // CRITICAL FIX: Always propagate the new program to the parent component
    if (typeof onProgramCreated === 'function') {
      console.log('%c ENHANCED PROGRAM LIST: Calling parent onProgramCreated', 'background: orange; color: white;');
      onProgramCreated(newProgram);
    } else {
      console.warn('No onProgramCreated callback provided to EnhancedProgramList');
    }
    
    // Show success toast
    setSuccessToast({
      message: `${newProgram.title || 'New loyalty program'} has been created successfully.`
    });
  };

  // Handle notification creation (if needed)
  const handleNotificationCreated = (notification) => {
    // Pass to parent component or handle internally
    console.log('%c NEW NOTIFICATION CREATED', 'background: blue; color: white; font-size: 14px;');
    console.log(notification);
    
    // Pass to parent if callback exists
    if (typeof onNotificationCreated === 'function') {
      onNotificationCreated(notification);
    }
  };

  // ✅ FIXED: Enhanced program click handler that can pass callbacks for deep program details
  const handleProgramClick = (program, initialTab = 'overview') => {
    console.log('Enhanced program list - program clicked:', program.id, 'Initial tab:', initialTab);
    if (onProgramClick) {
      // Pass the program and callbacks to the parent component which will handle the detail modal
      onProgramClick(program, initialTab, {
        onProgramCreated: handleProgramCreated,
        onNotificationCreated: handleNotificationCreated
      });
    }
  };

  // Filter programs based on current filter
  const filteredPrograms = () => {
    switch(filter) {
      case 'attention':
        return programs.filter(program => program.needsAttention);
      case 'positive':
        return programs.filter(program => program.roi > 0);
      case 'negative':
        return programs.filter(program => program.roi <= 0);
      default:
        return programs;
    }
  };

  // Render program grid or empty state
  const renderProgramsGrid = () => {
    const filtered = filteredPrograms();
    
    if (filtered.length === 0) {
      return (
        <div className="empty-state" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '4rem', 
            height: '4rem', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '1rem' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#999' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
            No loyalty programs found
          </h3>
          <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1.5rem' }}>
            {filter === 'all' 
              ? 'Create your first loyalty program to engage your customers'
              : `No programs match the "${filter}" filter. Try changing your filter.`}
          </p>
          {filter === 'all' && (
            <div onClick={() => setIsCreationModalOpen(true)}>
              <LoyaltyProgramCreationHandler 
                onProgramCreated={handleProgramCreated} 
                onNotificationCreated={handleNotificationCreated}
              />
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(program => (
          <ProgramCard 
            key={program.id} 
            program={program}
            onClick={handleProgramClick}
          />
        ))}
      </div>
    );
  };

  // Direct creation modal state management
  const handleOpenCreationModal = () => {
    setIsCreationModalOpen(true);
  };

  const handleCloseCreationModal = () => {
    setIsCreationModalOpen(false);
  };

  return (
    <section>
      <div className="header-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem' 
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
          Loyalty Programs 
          {programs.filter(program => program.needsAttention).length > 0 && 
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              color: COLORS.red,
              marginLeft: '0.5rem'
            }}>
              <AlertTriangle size={16} style={{ marginRight: '0.25rem' }} />
              {programs.filter(program => program.needsAttention).length} Need Attention
            </span>
          }
        </h2>
        <div className="action-buttons" style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              color: COLORS.evergreen,
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          >
            View All Programs
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.25rem' }}><path d="m9 18 6-6-6-6"/></svg>
          </button>
          
          <div onClick={handleOpenCreationModal}>
            <LoyaltyProgramCreationHandler 
              onProgramCreated={handleProgramCreated} 
              onNotificationCreated={handleNotificationCreated}
            />
          </div>
        </div>
      </div>
      
      {/* Programs grid or empty state */}
      {renderProgramsGrid()}
      
      {/* Full-screen modal for viewing all programs */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 101,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Modal Header */}
          <div style={{ 
            padding: '1.5rem', 
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
              Loyalty Programs
            </h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                color: COLORS.onyxMedium,
                transition: 'background 0.2s',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              className="hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          
          {/* Modal Body */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              maxWidth: '80rem',
              width: '100%',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem'
            }}>
              {/* Filters Bar */}
              <div className="filters-bar" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1.5rem', 
                backgroundColor: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyxMedium, marginRight: '1.5rem' }}>
                    Filter by:
                  </span>
                  <button 
                    onClick={() => setFilter('all')}
                    style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: filter === 'all' ? COLORS.evergreenLight : 'transparent',
                      color: filter === 'all' ? 'white' : COLORS.onyxMedium,
                      marginRight: '0.75rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    All Programs
                  </button>
                  <button 
                    onClick={() => setFilter('attention')}
                    style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: filter === 'attention' ? COLORS.red : 'transparent',
                      color: filter === 'attention' ? 'white' : COLORS.onyxMedium,
                      marginRight: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.375rem' }}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    Needs Attention
                  </button>
                  <button 
                    onClick={() => setFilter('positive')}
                    style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: filter === 'positive' ? COLORS.green : 'transparent',
                      color: filter === 'positive' ? 'white' : COLORS.onyxMedium,
                      marginRight: '0.75rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Positive ROI
                  </button>
                  <button 
                    onClick={() => setFilter('negative')}
                    style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: filter === 'negative' ? COLORS.yellow : 'transparent',
                      color: filter === 'negative' ? 'white' : COLORS.onyxMedium,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Negative ROI
                  </button>
                </div>
                
                <div>
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, fontWeight: 500 }}>
                    {filteredPrograms().length} programs
                  </span>
                </div>
              </div>
              
              {/* Grid of loyalty cards */}
              <div className="grid grid-cols-3 gap-6">
                {filteredPrograms().map(program => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    onClick={handleProgramClick}
                  />
                ))}
              </div>
              
              {/* Empty state if no programs */}
              {filteredPrograms().length === 0 && (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '4rem', 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  borderRadius: '0.5rem', 
                  textAlign: 'center' 
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(0,0,0,0.05)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '1rem' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#999' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                    No loyalty programs found
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1.5rem' }}>
                    {filter === 'all' 
                      ? 'Create your first loyalty program to engage your customers'
                      : `No programs match the "${filter}" filter. Try changing your filter.`}
                  </p>
                  {filter === 'all' && (
                    <div onClick={handleOpenCreationModal}>
                      <LoyaltyProgramCreationHandler 
                        onProgramCreated={handleProgramCreated} 
                        onNotificationCreated={handleNotificationCreated}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Modal Footer */}
          <div style={{ 
            padding: '1rem 1.5rem', 
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between' 
          }}>
            <button 
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.375rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(0,0,0,0.15)',
                color: COLORS.onyxMedium,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            
            <div onClick={handleOpenCreationModal}>
              <LoyaltyProgramCreationHandler 
                onProgramCreated={handleProgramCreated} 
                onNotificationCreated={handleNotificationCreated}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Direct creation modal - alternative approach */}
      <FullScreenLoyaltyProgramModal
        isOpen={isCreationModalOpen}
        onClose={handleCloseCreationModal}
        onProgramCreated={handleProgramCreated} 
        onNotificationCreated={handleNotificationCreated}
      />
      
      {/* Success Toast */}
      {successToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 1000,
          maxWidth: '90%',
          width: 'auto',
          border: `1px solid ${COLORS.green}`,
          animation: 'slideUp 0.3s ease'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <p style={{ margin: 0, color: COLORS.onyx, fontSize: '0.875rem' }}>
            {successToast.message}
          </p>
          <button 
            onClick={() => setSuccessToast(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.onyxMedium} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <style jsx>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translate(-50%, 1rem);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default EnhancedProgramList;
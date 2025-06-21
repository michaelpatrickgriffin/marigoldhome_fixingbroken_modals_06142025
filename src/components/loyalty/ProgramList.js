// src/components/loyalty/ProgramList.js
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import ProgramCard from './ProgramCard';

// Loyalty Program List Component
export const ProgramList = ({ programs, onViewAllClick, onProgramClick }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
          Loyalty
        </h2>
        <div className="flex items-center space-x-3">
        <button 
  onClick={onViewAllClick}
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
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {programs.slice(0, 3).map(program => (
          <div 
            key={program.id}
            style={{ 
              overflow: 'hidden',
              borderRadius: '0.75rem',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
            }}
          >
            <ProgramCard 
              key={program.id} 
              program={program}
              onClick={onProgramClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Full-screen Program Modal Component
export const ProgramModal = ({ 
  isOpen, 
  onClose, 
  programs, 
  filter, 
  setFilter, 
  onProgramClick
}) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [displayPrograms, setDisplayPrograms] = React.useState(programs);

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

  // Handle filter changes with animation
  React.useEffect(() => {
    if (!isOpen) return;
    
    setIsTransitioning(true);
    
    // Delay to allow fade out
    setTimeout(() => {
      setDisplayPrograms(filteredPrograms());
      setIsTransitioning(false);
    }, 200);
  }, [filter, isOpen]);

  // Initialize display programs when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setDisplayPrograms(filteredPrograms());
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
        backgroundColor: '#f5f7f8',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '80rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.onyx }}>
            Loyalty Programs
          </h2>
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
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '80rem',
          width: '100%',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          display: 'flex',
          gap: '2rem'
        }}>
          <button 
            onClick={() => setFilter('all')}
            style={{
              padding: '1rem 0',
              color: filter === 'all' ? COLORS.evergreen : COLORS.onyxMedium,
              fontWeight: filter === 'all' ? 600 : 500,
              fontSize: '0.875rem',
              borderBottom: filter === 'all' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            All Programs
          </button>
          <button 
            onClick={() => setFilter('attention')}
            style={{
              padding: '1rem 0',
              color: filter === 'attention' ? COLORS.evergreen : COLORS.onyxMedium,
              fontWeight: filter === 'attention' ? 600 : 500,
              fontSize: '0.875rem',
              borderBottom: filter === 'attention' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.375rem' }}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Needs Attention
          </button>
          <button 
            onClick={() => setFilter('positive')}
            style={{
              padding: '1rem 0',
              color: filter === 'positive' ? COLORS.evergreen : COLORS.onyxMedium,
              fontWeight: filter === 'positive' ? 600 : 500,
              fontSize: '0.875rem',
              borderBottom: filter === 'positive' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Positive ROI
          </button>
          <button 
            onClick={() => setFilter('negative')}
            style={{
              padding: '1rem 0',
              color: filter === 'negative' ? COLORS.evergreen : COLORS.onyxMedium,
              fontWeight: filter === 'negative' ? 600 : 500,
              fontSize: '0.875rem',
              borderBottom: filter === 'negative' ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Negative ROI
          </button>
        </div>
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
          {/* Program Count Display */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: COLORS.onyx, 
              margin: 0 
            }}>
              {filter === 'all' ? 'All Programs' : 
               filter === 'attention' ? 'Programs Needing Attention' :
               filter === 'positive' ? 'Programs with Positive ROI' :
               'Programs with Negative ROI'}
            </h3>
            <span style={{ 
              fontSize: '0.875rem', 
              color: COLORS.onyxMedium, 
              fontWeight: 500 
            }}>
              {displayPrograms.length} programs
            </span>
          </div>
          
          {/* Grid of program cards */}
          <div 
            className="grid grid-cols-3 gap-6"
            style={{ 
              opacity: isTransitioning ? 0.3 : 1,
              transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {displayPrograms.map((program, index) => (
              <div 
                key={program.id} 
                style={{ 
                  overflow: 'hidden',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
                  transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={(e) => {
                  if (!isTransitioning) {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isTransitioning) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                <ProgramCard 
                  key={program.id} 
                  program={program}
                  onClick={onProgramClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
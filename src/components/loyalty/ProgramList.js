// src/components/loyalty/ProgramList.js - Updated for Modal System
import React, { useState } from 'react';
import { Gift, Users, TrendingUp, TrendingDown, MoreHorizontal, Play, Pause, Edit, Trash2, Copy, Star, DollarSign, Calendar, Target, CheckCircle, AlertCircle, Clock, Award } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { useCommonModals } from '../common/ModalManager';
import DetailView from '../common/DetailView';
import FullScreenLoyaltyProgramModal from './FullScreenLoyaltyProgramModal';

export const ProgramList = ({ 
  programs = [], 
  onProgramSelect, 
  onProgramEdit,
  onProgramDuplicate,
  onProgramDelete 
}) => {
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  
  // Use the new modal system
  const { openDetailModal, openCreationModal, openConfirmationModal } = useCommonModals();

  // Handle program selection using modal system
  const handleProgramClick = (program) => {
    console.log('Opening program detail modal for:', program.title || program.name);
    
    openDetailModal(program, {
      component: DetailView,
      props: {
        program: program,
        onProgramCreated: (updatedProgram) => {
          if (onProgramEdit) {
            onProgramEdit(updatedProgram);
          }
        }
      }
    });
    
    // Call legacy handler if provided
    if (onProgramSelect) {
      onProgramSelect(program);
    }
  };

  // Handle program editing using modal system
  const handleEditProgram = (program, e) => {
    e.stopPropagation(); // Prevent triggering program click
    
    openCreationModal('loyalty', {
      component: FullScreenLoyaltyProgramModal,
      props: {
        program: program, // Pass existing program for editing
        onProgramCreated: (updatedProgram) => {
          if (onProgramEdit) {
            onProgramEdit(updatedProgram);
          }
        }
      }
    });
  };

  // Handle program duplication
  const handleDuplicateProgram = (program, e) => {
    e.stopPropagation();
    
    const duplicatedProgram = {
      ...program,
      id: `program-${Date.now()}`,
      title: `${program.title || program.name} (Copy)`,
      name: `${program.title || program.name} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    
    if (onProgramDuplicate) {
      onProgramDuplicate(duplicatedProgram);
    }
  };

  // Handle program deletion with confirmation
  const handleDeleteProgram = (program, e) => {
    e.stopPropagation();
    
    openConfirmationModal(
      'Delete Program',
      `Are you sure you want to delete "${program.title || program.name}"? This action cannot be undone.`,
      () => {
        if (onProgramDelete) {
          onProgramDelete(program.id);
        }
      }
    );
  };

  // Sort programs
  const sortedPrograms = React.useMemo(() => {
    const filtered = programs.filter(program => {
      if (filterBy === 'all') return true;
      return program.status.toLowerCase() === filterBy.toLowerCase();
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.title || a.name).localeCompare(b.title || b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'members':
          return (b.memberCount || 0) - (a.memberCount || 0);
        case 'date':
        default:
          return new Date(b.createdAt || b.launchDate || 0) - new Date(a.createdAt || a.launchDate || 0);
      }
    });
  }, [programs, sortBy, filterBy]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return COLORS.evergreen;
      case 'draft':
        return COLORS.amber;
      case 'paused':
        return COLORS.onyxMedium;
      case 'archived':
        return COLORS.red;
      default:
        return COLORS.onyxMedium;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return CheckCircle;
      case 'draft':
        return Edit;
      case 'paused':
        return Pause;
      case 'archived':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  if (programs.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Gift size={48} color={COLORS.onyxMedium} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, margin: '0 0 0.5rem 0' }}>
          No loyalty programs yet
        </h3>
        <p style={{ color: COLORS.onyxMedium, marginBottom: '2rem' }}>
          Create your first loyalty program to start rewarding your customers.
        </p>
        <button
          onClick={() => openCreationModal('loyalty', {
            component: FullScreenLoyaltyProgramModal
          })}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Create Program
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters and Sort */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Status Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              color: COLORS.onyx,
              cursor: 'pointer'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              color: COLORS.onyx,
              cursor: 'pointer'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="members">Sort by Members</option>
          </select>
        </div>

        <div style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
          {sortedPrograms.length} program{sortedPrograms.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Program Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '2rem'
      }}>
        {sortedPrograms.map((program) => {
          const StatusIcon = getStatusIcon(program.status);
          const statusColor = getStatusColor(program.status);
          
          return (
            <div
              key={program.id}
              onClick={() => handleProgramClick(program)}
              onMouseEnter={() => setHoveredProgram(program.id)}
              onMouseLeave={() => setHoveredProgram(null)}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                transform: hoveredProgram === program.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredProgram === program.id ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Status Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: statusColor,
                borderRadius: '1rem 1rem 0 0'
              }} />

              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <StatusIcon size={16} color={statusColor} />
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: statusColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {program.status}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4'
                  }}>
                    {program.title || program.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: COLORS.onyxMedium,
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {program.description || program.type || 'Loyalty Program'}
                  </p>
                </div>

                {/* Action Menu */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: hoveredProgram === program.id ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                      border: 'none',
                      color: COLORS.onyxMedium,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  
                  {/* Quick Actions */}
                  {hoveredProgram === program.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      zIndex: 10
                    }}>
                      <button
                        onClick={(e) => handleEditProgram(program, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.onyx,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDuplicateProgram(program, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.onyx,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Copy size={14} />
                        Duplicate
                      </button>
                      <button
                        onClick={(e) => handleDeleteProgram(program, e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          color: COLORS.red,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Program Type & Key Metrics */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.75rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(26, 76, 73, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {program.programType === 'points' ? <Star size={20} color={COLORS.evergreen} /> :
                   program.programType === 'tiers' ? <Award size={20} color={COLORS.evergreen} /> :
                   <Gift size={20} color={COLORS.evergreen} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.25rem' }}>
                    {program.programType === 'points' ? 'Points Program' :
                     program.programType === 'tiers' ? 'Tiered Program' :
                     program.programType === 'cashback' ? 'Cashback Program' :
                     'Loyalty Program'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                    {program.earnRate ? `${program.earnRate} pts per $1` : 'Reward structure configured'}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {program.memberCount || Math.floor(Math.random() * 5000) + 500}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Members
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {program.engagement || `${(Math.random() * 40 + 30).toFixed(1)}%`}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Engagement
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    marginBottom: '0.25rem'
                  }}>
                    {program.rewards?.length || Math.floor(Math.random() * 8) + 3}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: COLORS.onyxMedium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Rewards
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} color={COLORS.evergreen} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.evergreen }}>
                    +{Math.floor(Math.random() * 20) + 5}% this month
                  </span>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Calendar size={12} />
                  {program.launchDate ? new Date(program.launchDate).toLocaleDateString() : 
                   program.createdAt ? new Date(program.createdAt).toLocaleDateString() : 
                   'No date'}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                marginTop: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium
                }}>
                  <Target size={12} />
                  {program.audience || 'All Members'}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: COLORS.onyxMedium
                }}>
                  <DollarSign size={12} />
                  ROI: {program.roi || `${(Math.random() * 200 + 100).toFixed(0)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Legacy ProgramModal component - kept for backward compatibility
export const ProgramModal = ({ 
  isOpen, 
  onClose, 
  program,
  onSave 
}) => {
  // This component is now handled by the modal system
  // Keeping it for backward compatibility but functionality moved to DetailView
  console.warn('ProgramModal is deprecated. Use DetailView through modal system instead.');
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 15100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
          Program Details
        </h2>
        <p style={{ color: COLORS.onyxMedium, marginBottom: '2rem' }}>
          This modal has been replaced by the new modal system. Please use DetailView through the modal system instead.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
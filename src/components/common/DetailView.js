// src/components/common/DetailView.js
import React, { useState, useEffect } from 'react';
import { X, Download, Share2, ArrowLeft, ArrowRight, Clock, Users, TrendingUp, AlertTriangle, CheckCircle, ExternalLink, Star } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import RecommendationImplementationModal from '../loyalty/RecommendationImplementationModal';
import EnhancedRecommendationCard from './EnhancedRecommendationCard';
import { 
  getRecommendationById 
} from '../../data/RFMAnalyticsData';

const DetailView = ({ 
  item: program, 
  onClose, 
  onImplement, 
  onModify, 
  onReject,
  initialTab: propInitialTab = 'overview',
  setActiveTab: externalSetActiveTab = null,
  // ✅ CRITICAL: Callbacks for program creation and notifications
  onProgramCreated,
  onNotificationCreated
}) => {
  // ALL HOOKS MUST BE AT THE TOP - NO EXCEPTIONS
  const [activeTab, setActiveTab] = useState(propInitialTab);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  
  // ✅ FIXED: Session-only state management (no localStorage persistence) - matches main dashboard
  const [implementedRecommendations, setImplementedRecommendations] = useState(new Set());
  const [rejectedRecommendations, setRejectedRecommendations] = useState(new Set());
  const [archivedRecommendations, setArchivedRecommendations] = useState(new Set());
  
  // ✅ UPDATED: State for recommendation implementation modal with better debugging
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendationProgramData, setRecommendationProgramData] = useState(null);
  
  // ✅ FIXED: Proper modal behavior with body scroll prevention and escape key
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  // Sync internal activeTab with prop
  useEffect(() => {
    setActiveTab(propInitialTab);
  }, [propInitialTab]);
  
  // ✅ FIXED: Handle deep linking to recommendations tab
  useEffect(() => {
    // If program has initial tab set and it's recommendations, set it
    if (program?.initialTab === 'recommendations') {
      setActiveTab('recommendations');
    }
  }, [program?.initialTab]);
  
  // Debug logging for the current program
  useEffect(() => {
    if (program) {
      console.log('%c DETAIL VIEW DEBUG', 'background: purple; color: white; font-size: 14px;');
      console.log('Current program:', program);
      console.log('Program title:', program.title);
      console.log('Program recommendations:', program.recommendations);
      if (program.recommendations) {
        program.recommendations.forEach((rec, index) => {
          console.log(`Recommendation ${index}:`, {
            id: rec.id,
            title: rec.title,
            type: rec.type
          });
        });
      }
    }
  }, [program]);

  // Debug logging for implementation modal state changes
  useEffect(() => {
    console.log('%c IMPLEMENTATION MODAL STATE DEBUG', 'background: orange; color: white; font-size: 12px;');
    console.log('showImplementationModal:', showImplementationModal);
    console.log('selectedRecommendation:', selectedRecommendation);
    console.log('recommendationProgramData:', recommendationProgramData);
  }, [showImplementationModal, selectedRecommendation, recommendationProgramData]);
  
  // NOW ALL OTHER LOGIC AFTER ALL HOOKS
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (externalSetActiveTab) {
      externalSetActiveTab(tab);
    }
  };
  
  // ✅ ENHANCED: Improved implement action with better debugging and validation
  const handleImplementAction = (recommendation) => {
    console.log('%c IMPLEMENT ACTION TRIGGERED', 'background: red; color: white; font-size: 16px;');
    console.log('Recommendation object received:', recommendation);
    console.log('Recommendation ID:', recommendation?.id);
    console.log('Recommendation title:', recommendation?.title);
    console.log('Recommendation type:', recommendation?.type);
    console.log('Program object:', program);
    console.log('Program title:', program?.title);
    console.log('Program ID:', program?.id);
    
    // ✅ VALIDATION: Ensure we have both recommendation and program data
    if (!recommendation) {
      console.error('❌ No recommendation provided to implement action');
      return;
    }
    
    if (!program) {
      console.error('❌ No program data available for implementation');
      return;
    }
    
    // ✅ ENHANCED: Set state with comprehensive debugging
    console.log('%c SETTING IMPLEMENTATION MODAL STATE', 'background: green; color: white; font-size: 14px;');
    
    // Set the recommendation data
    console.log('Setting selected recommendation:', {
      id: recommendation.id,
      title: recommendation.title,
      type: recommendation.type,
      fullRecommendation: recommendation
    });
    setSelectedRecommendation(recommendation);
    
    // Set the program data
    console.log('Setting program data:', {
      id: program.id,
      title: program.title,
      type: program.type,
      fullProgram: program
    });
    setRecommendationProgramData(program);
    
    // Open the modal
    console.log('Opening implementation modal...');
    setShowImplementationModal(true);
    
    // ✅ VERIFICATION: Verify state was set after a brief delay
    setTimeout(() => {
      console.log('%c VERIFYING MODAL STATE AFTER SETTING', 'background: blue; color: white; font-size: 12px;');
      console.log('Modal should be open:', true);
      console.log('Selected recommendation set:', !!recommendation);
      console.log('Program data set:', !!program);
    }, 100);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Mock data for charts (in real app, this would come from program data)
  const mockPerformanceData = [
    { month: 'Jan', participants: 400, revenue: 2400 },
    { month: 'Feb', participants: 300, revenue: 1398 },
    { month: 'Mar', participants: 200, revenue: 9800 },
    { month: 'Apr', participants: 278, revenue: 3908 },
    { month: 'May', participants: 189, revenue: 4800 },
    { month: 'Jun', participants: 239, revenue: 3800 },
  ];

  const mockSegmentData = [
    { name: 'New', value: 400, fill: COLORS.evergreen },
    { name: 'Active', value: 300, fill: COLORS.sage },
    { name: 'At Risk', value: 200, fill: COLORS.mint },
    { name: 'Lost', value: 100, fill: COLORS.seafoam },
  ];

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Performance Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Users size={20} style={{ color: COLORS.evergreen, marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Total Participants</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.participants?.toLocaleString() || '0'}
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <TrendingUp size={20} style={{ color: COLORS.sage, marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>ROI</span>
                </div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 600, 
                  color: (program.roi || 0) >= 0 ? COLORS.evergreen : '#ef4444' 
                }}>
                  {program.roi ? `${program.roi}%` : '0%'}
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginBottom: '2rem' 
              }}>
                Performance Trends
              </h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" stroke={COLORS.onyxMedium} />
                    <YAxis stroke={COLORS.onyxMedium} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="participants" 
                      stroke={COLORS.evergreen} 
                      strokeWidth={3}
                      name="Participants"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={COLORS.sage} 
                      strokeWidth={3}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Audience Breakdown */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginBottom: '2rem' 
              }}>
                Audience Segments
              </h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockSegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'recommendations':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {program.recommendations && program.recommendations.length > 0 ? (
              <EnhancedRecommendationCard
                program={program}
                recommendations={program.recommendations}
                expandedRecommendation={expandedRecommendation}
                onToggleExpand={(rec) => setExpandedRecommendation(expandedRecommendation?.id === rec.id ? null : rec)}
                onImplement={handleImplementAction}
                onModify={(rec) => console.log('Modify:', rec)}
                onReject={(rec) => console.log('Reject:', rec)}
                onArchive={(rec) => console.log('Archive:', rec)}
                onBulkAction={(action, recs) => console.log('Bulk action:', action, recs)}
                onResetRecommendations={() => console.log('Reset recommendations')}
                bulkActionLoading={bulkActionLoading}
                implementedRecommendations={implementedRecommendations}
                rejectedRecommendations={rejectedRecommendations}
                archivedRecommendations={archivedRecommendations}
              />
            ) : (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <Star size={48} style={{ color: COLORS.onyxLight, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  No Recommendations Available
                </h3>
                <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                  This program doesn't have any recommendations at the moment.
                </p>
              </div>
            )}
          </div>
        );

      default: // overview
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Program Summary */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginBottom: '1rem' 
              }}>
                Program Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                    Status
                  </span>
                  <span style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: program.status === 'Active' ? COLORS.evergreen : COLORS.onyxMedium 
                  }}>
                    {program.status || 'Unknown'}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                    Type
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
                    {program.type || 'N/A'}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, display: 'block', marginBottom: '0.25rem' }}>
                    Audience
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
                    {program.audience || 'All Customers'}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Users size={20} style={{ color: COLORS.evergreen, marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Participants</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.participants?.toLocaleString() || '0'}
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: COLORS.sage, marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>Completion Rate</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 600, color: COLORS.onyx }}>
                  {program.completionRate ? `${program.completionRate}%` : '0%'}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Handle close implementation modal
  const handleCloseImplementationModal = () => {
    console.log('%c CLOSING IMPLEMENTATION MODAL', 'background: orange; color: white; font-size: 12px;');
    setShowImplementationModal(false);
    setSelectedRecommendation(null);
    setRecommendationProgramData(null);
  };

  // Handle program created from implementation
  const handleProgramCreatedFromImplementation = (newProgram) => {
    console.log('%c PROGRAM CREATED FROM IMPLEMENTATION', 'background: green; color: white; font-size: 12px;');
    console.log('New program created:', newProgram);
    
    // Close implementation modal
    handleCloseImplementationModal();
    
    // Pass to parent callback if provided
    if (onProgramCreated) {
      onProgramCreated(newProgram);
    }
  };

  // Handle notification created from implementation
  const handleNotificationCreatedFromImplementation = (notification) => {
    console.log('%c NOTIFICATION CREATED FROM IMPLEMENTATION', 'background: blue; color: white; font-size: 12px;');
    console.log('New notification created:', notification);
    
    // Pass to parent callback if provided
    if (onNotificationCreated) {
      onNotificationCreated(notification);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'audience', label: 'Audience' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  return (
    <>
      {/* ✅ FIXED: Full-screen modal overlay with proper z-index */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100005, // ✅ FIXED: Above all other modals
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0'
        }}
        onClick={handleBackdropClick}
      >
        {/* ✅ FIXED: Modal container with proper z-index */}
        <div
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            backgroundColor: '#f5f7f8',
            zIndex: 100006, // ✅ FIXED: Container above overlay
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flexShrink: 0,
            zIndex: 100007 // ✅ FIXED: Header above content
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
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600, 
                  color: COLORS.onyx, 
                  margin: 0 
                }}>
                  {program.title}
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: COLORS.onyxMedium, 
                  margin: '0.25rem 0 0 0' 
                }}>
                  {program.type} • {program.audience}
                </p>
              </div>
              
              {/* Close Button */}
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
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            flexShrink: 0,
            zIndex: 100007 // ✅ FIXED: Tabs above content
          }}>
            <div style={{
              maxWidth: '80rem',
              width: '100%',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              display: 'flex',
              gap: '2rem'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '1rem 0',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: activeTab === tab.id ? COLORS.evergreen : COLORS.onyxMedium,
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? `2px solid ${COLORS.evergreen}` : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Body - Scrollable Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100006 // ✅ FIXED: Content z-index
          }}>
            <div style={{
              maxWidth: '80rem',
              width: '100%',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem'
            }}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ENHANCED: Recommendation Implementation Modal with proper z-index stacking */}
      {showImplementationModal && selectedRecommendation && recommendationProgramData && (
        <RecommendationImplementationModal
          isOpen={showImplementationModal}
          onClose={handleCloseImplementationModal}
          recommendation={selectedRecommendation}
          programData={recommendationProgramData}
          onProgramCreated={handleProgramCreatedFromImplementation}
          onNotificationCreated={handleNotificationCreatedFromImplementation}
        />
      )}
    </>
  );
};

export default DetailView;
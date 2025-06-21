// App.js - Complete clean file with FIXED layout order and error handling
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ActionBarWithCopilot from './components/layout/ActionBarWithCopilot';
import DetailView from './components/common/DetailView';
import { ActionModal, FeedbackModal } from './components/common/ActionModals';
import { KpiCards, RevenueChart, MembershipChart, CampaignPerformanceChart } from './components/dashboard/DashboardComponents';
import { ProgramList, ProgramModal } from './components/loyalty/ProgramList';
import { CampaignList, CampaignModal } from './components/campaigns/CampaignList';
import CampaignDetailView from './components/campaigns/CampaignDetailView';
import NotificationPanel from './components/layout/NotificationPanel';
import ProfilePanel from './components/layout/ProfilePanel';
import KpiAnalyticsModal from './components/analytics/KpiAnalyticsModal';
import { COLORS, darkMeshGradient } from './styles/ColorStyles';
import SplitCampaignCreationModal from './components/campaigns/SplitCampaignCreationModal';
import CampaignSuccessToast from './components/feedback/CampaignSuccessToast';
import RFMDashboard from './components/dashboard/RFMDashboard';
import RFMInfoCard from './components/dashboard/RFMInfoCard';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import DashboardKpiCards from './components/dashboard/DashboardKpiCards';
import MarketingDashboard from './components/dashboard/MarketingDashboard';
import NarrativeMarketingDashboard from './components/dashboard/NarrativeMarketingDashboard';
import UnifiedInsightsAndRecommendations from './components/dashboard/UnifiedInsightsAndRecommendations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ChevronDown, Calendar, Download } from 'lucide-react';

// ✅ RESTORED: Import campaign and program card components
import CampaignCard from './components/campaigns/CampaignCard';
import ProgramCard from './components/loyalty/ProgramCard';

// ✅ FIX: Import modal error suppression
import './utils/modalErrorSuppression';

import './styles/DashboardToggle.css';
import './styles/OverviewDashboardStyles.css';
import './styles/AIDashboard.css';
import './styles/ProfileSwitch.css';
import './styles/NarrativeMarketing.css';
import './styles/FlyoutSidebarStyles.css';

import { 
  campaignData as initialCampaignData, 
  loyaltyProgramData as initialLoyaltyProgramData, 
  monthlyStats, 
  membershipData, 
  columbiaKpiCardsData, 
  insightsData, 
  getResponseGenerator,
  userProfiles,
  brandData,
  dashboardConfigurations, 
  profileDashboardOrder 
} from './data/SampleData';

const App = () => {
  // State management
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuPinned, setIsMenuPinned] = useState(true);
  const [campaigns, setCampaigns] = useState(initialCampaignData);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState(initialLoyaltyProgramData);
  
  // Modal state
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalData, setActionModalData] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackModalData, setFeedbackModalData] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [showSplitTestModal, setShowSplitTestModal] = useState(false);
  const [successToast, setSuccessToast] = useState(null);
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  
  // Profile and notification state
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(8);
  
  // Dashboard state
  const [dashboardView, setDashboardView] = useState('overview');
  const [showRFMInfo, setShowRFMInfo] = useState(false);
  const [hasShownPulse, setHasShownPulse] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(userProfiles[3]);
  const [selectedBrand, setSelectedBrand] = useState(brandData[0]);
  
  // ✅ NEW: Filter state for enhanced dashboard filters
  const [selectedBrands, setSelectedBrands] = useState(['all']); // Array for multi-select
  const [selectedDateRange, setSelectedDateRange] = useState('last_30_days');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  
  // AI Assistant state
  const [isAIMinimized, setIsAIMinimized] = useState(true);
  const [aiResponse, setAiResponse] = useState(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [hasCriticalNotifications, setHasCriticalNotifications] = useState(true);

  // ✅ NEW: Date range options
  const dateRangeOptions = [
    { id: 'last_7_days', label: 'Last 7 days' },
    { id: 'last_30_days', label: 'Last 30 days' },
    { id: 'last_90_days', label: 'Last 90 days' },
    { id: 'last_6_months', label: 'Last 6 months' },
    { id: 'last_year', label: 'Last year' },
    { id: 'year_to_date', label: 'Year to date' },
    { id: 'custom', label: 'Custom range...' }
  ];

  // ✅ NEW: Export options
  const exportOptions = [
    { id: 'pdf_report', label: 'PDF Report', icon: 'FileText' },
    { id: 'excel_data', label: 'Excel Data', icon: 'FileSpreadsheet' },
    { id: 'csv_data', label: 'CSV Data', icon: 'FileSpreadsheet' },
    { id: 'powerpoint', label: 'PowerPoint Slides', icon: 'Presentation' },
    { id: 'image_charts', label: 'Chart Images', icon: 'Image' }
  ];

  // ✅ NEW: Get selected brands display text
  const getSelectedBrandsText = () => {
    if (selectedBrands.includes('all') || selectedBrands.length === 0) {
      return 'All Brands';
    }
    if (selectedBrands.length === 1) {
      const brand = brandData.find(b => b.id === selectedBrands[0]);
      return brand ? brand.name : 'All Brands';
    }
    return `${selectedBrands.length} Brands Selected`;
  };

  // ✅ NEW: Get selected date range display text
  const getSelectedDateRangeText = () => {
    const option = dateRangeOptions.find(opt => opt.id === selectedDateRange);
    return option ? option.label : 'Last 30 days';
  };

  // ✅ NEW: Handle brand selection (multi-select)
  const handleBrandSelection = (brandId) => {
    if (brandId === 'all') {
      setSelectedBrands(['all']);
    } else {
      setSelectedBrands(prev => {
        const newSelection = prev.filter(id => id !== 'all');
        if (newSelection.includes(brandId)) {
          const filtered = newSelection.filter(id => id !== brandId);
          return filtered.length === 0 ? ['all'] : filtered;
        } else {
          return [...newSelection, brandId];
        }
      });
    }
  };
  
  // Profile switching handler
  const handleProfileSwitch = (newProfile) => {
    console.log('Switching to profile:', newProfile);
    setCurrentProfile(newProfile);
    setDashboardView(newProfile.defaultDashboard);
  };

  // Brand switching handler
  const handleBrandSwitch = (newBrand) => {
    console.log('Switching to brand:', newBrand);
    setSelectedBrand(newBrand);
  };
  
  // Initialize dashboard view based on current profile
  useEffect(() => {
    setDashboardView(currentProfile.defaultDashboard);
  }, [currentProfile]);
  
  // Show RFM info card when switching to RFM view for the first time
  useEffect(() => {
    if (dashboardView === 'rfm') {
      const hasSeenRFMInfo = localStorage.getItem('hasSeenRFMInfo');
      if (!hasSeenRFMInfo) {
        setShowRFMInfo(true);
        localStorage.setItem('hasSeenRFMInfo', 'true');
      }
    }
  }, [dashboardView]);
  
  // Add pulse animation to RFM button once
  useEffect(() => {
    if (!hasShownPulse && !localStorage.getItem('hasShownRFMPulse')) {
      setHasShownPulse(true);
      localStorage.setItem('hasShownRFMPulse', 'true');
      setTimeout(() => {
        setHasShownPulse(false);
      }, 5000);
    }
  }, [hasShownPulse]);

  // Contextual prompts based on dashboard view
  const getDashboardPrompts = () => {
    switch (dashboardView) {
      case 'marketing':
        return [
          "Which campaigns should I pause or optimize?",
          "What's my budget utilization vs target?",
          "Which loyalty programs need attention?",
          "What campaigns should I launch next?",
          "How can I improve my lowest performing campaign?",
          "What's my ROI across all active campaigns?",
          "Which customer segments are most profitable?",
          "What's my cost per acquisition by channel?",
          "How are my seasonal campaigns performing?",
          "What budget should I allocate to top performers?",
          "Which programs have the best engagement rates?",
          "What campaigns need immediate action today?"
        ];
      case 'narrative':
        return [
          "Tell me a story about my customer journey",
          "What narrative emerges from my campaign data?",
          "How do my metrics connect to business outcomes?",
          "What trends should I communicate to leadership?",
          "Explain my performance in simple terms",
          "What's the key message from this month's data?",
          "How do I present these insights to stakeholders?",
          "What story do my loyalty programs tell?",
          "Connect my KPIs to customer experience",
          "What narrative drives my recommendations?"
        ];
      case 'rfm':
        return [
          "Which RFM segments should I focus on first?",
          "How can I move customers between RFM segments?",
          "What campaigns work best for Champions?",
          "How do I prevent At Risk customers from churning?",
          "Which segments have the highest growth potential?",
          "What's driving my RFM segment changes?",
          "How can I optimize for high-value segments?",
          "What actions should I take for each segment?",
          "Which RFM transitions indicate success?",
          "How do segments respond to different campaigns?"
        ];
      case 'standard':
        return [
          "What KPIs need immediate attention?",
          "How can I improve my email open rates?",
          "Which customer segments are most valuable?",
          "What's causing my low redemption rates?",
          "How do my metrics compare to benchmarks?",
          "What should I focus on to increase revenue?",
          "Which campaigns are underperforming?",
          "How can I boost loyalty program engagement?",
          "What's my customer acquisition cost trend?",
          "Which marketing channels work best?"
        ];
      default:
        return [
          "What's my overall performance this month?",
          "Which metrics need my attention today?",
          "How are my campaigns performing?",
          "What opportunities can I act on now?",
          "How can I optimize my marketing spend?",
          "What trends should I be aware of?",
          "Which customer segments are growing?",
          "What's my best performing channel?",
          "How can I improve customer retention?",
          "What actions will drive the biggest impact?"
        ];
    }
  };

  // Placeholder text based on dashboard view
  const getPlaceholderText = () => {
    switch (dashboardView) {
      case 'marketing':
        return "Ask me about your campaigns, budget allocation, or optimization strategies...";
      case 'narrative':
        return "Ask me to explain your data in simple terms or create insights for presentations...";
      case 'rfm':
        return "Ask me about your customer segments, retention strategies, or RFM optimization...";
      case 'standard':
        return "Ask me about your KPIs, performance metrics, or what needs attention...";
      default:
        return 'Ask me about your marketing performance, campaigns, or customer engagement'
    }
  };

  // AI Assistant handlers
  const handleAIPromptSubmit = (query) => {
    setLastQuestion(query);
    setIsAIMinimized(true);
    
    setTimeout(() => {
      const responseGenerator = getResponseGenerator(query);
      const response = responseGenerator();
      setAiResponse(response);
      setShowAIResponse(true);
    }, 1500);
  };

  const handleAIPromptClick = (prompt) => {
    handleAIPromptSubmit(prompt);
  };

  const handleClearAIResponse = () => {
    setAiResponse(null);
    setLastQuestion('');
    setShowAIResponse(false);
    setIsAIMinimized(false);
  };
  
  // Campaign handlers
  const handleCampaignClick = useCallback((campaign) => {
    console.log('Campaign clicked:', campaign.title);
    setSelectedCampaign(campaign);
  }, []);

  const handleCampaignCreated = (newCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
    setActiveTab('campaigns');
    setSuccessToast({
      message: `${newCampaign.title || 'New campaign'} has been created successfully.`,
    });
    console.log('%c NEW CAMPAIGN CREATED', 'background: green; color: white; font-size: 14px;');
    console.log(newCampaign);
  };

  // Loyalty program handlers
  const handleProgramClick = useCallback((program, initialTab = 'overview') => {
    console.log('Program clicked:', program.title, 'Initial tab:', initialTab);
    setSelectedProgram({ ...program, initialTab });
  }, []);

  // Handle notification program clicks
  const handleNotificationProgramClick = (programId) => {
    // Find the program from loyaltyPrograms and open it
    const program = loyaltyPrograms.find(p => p.id === programId);
    if (program) {
      handleProgramClick(program, 'overview');
    }
  };

  const handleLoyaltyProgramCreated = (newProgram) => {
    console.log('%c LOYALTY PROGRAM CREATION HANDLER CALLED', 'background: blue; color: white; font-size: 14px;');
    console.log('New program data:', newProgram);
    
    const updatedPrograms = [
      {
        ...newProgram,
        id: typeof newProgram.id === 'undefined' ? 
          Math.max(...loyaltyPrograms.map(p => p.id || 0)) + 1 : 
          newProgram.id,
        roi: newProgram.roi || 0,
        status: newProgram.status || 'Active',
        needsAttention: newProgram.needsAttention || false
      },
      ...loyaltyPrograms
    ];
    
    console.log('%c UPDATED PROGRAMS ARRAY:', 'background: purple; color: white; font-size: 12px;');
    console.log(updatedPrograms);
    
    setLoyaltyPrograms(updatedPrograms);
    setActiveTab('loyalty');
    setSuccessToast({
      message: `${newProgram.title || 'New loyalty program'} has been created successfully.`,
    });
  };

  // Modal handlers
  const openActionModal = (data) => {
    setActionModalData(data);
    setShowActionModal(true);
  };

  const openFeedbackModal = (data) => {
    setFeedbackModalData(data);
    setShowFeedbackModal(true);
  };

  const openKpiAnalytics = (kpiType) => {
    // Ensure we always get a string identifier
    let kpiIdentifier;
    if (typeof kpiType === 'object' && kpiType.title) {
      // If an object with title is passed, use the title
      kpiIdentifier = kpiType.title.toLowerCase();
    } else if (typeof kpiType === 'string') {
      // If a string is passed, use it directly
      kpiIdentifier = kpiType.toLowerCase();
    } else {
      console.warn('Invalid kpiType passed to openKpiAnalytics:', kpiType);
      return;
    }
    
    // Map common title variations to standard identifiers
    const kpiMapping = {
      'revenue': 'revenue',
      'customers': 'customers', 
      'engagement': 'engagement',
      'conversion': 'conversion',
      'audience': 'audience',
      // Handle variations in titles
      'total revenue': 'revenue',
      'customer count': 'customers',
      'engagement rate': 'engagement',
      'conversion rate': 'conversion',
      'total audience': 'audience'
    };
    
    const standardKpiType = kpiMapping[kpiIdentifier] || kpiIdentifier;
    console.log('Opening KPI Analytics for:', standardKpiType, 'from input:', kpiType);
    setSelectedKpi(standardKpiType);
  };

  const closeKpiAnalytics = () => {
    setSelectedKpi(null);
  };

  // Layout handlers
  const menuPinTimeoutRef = useRef(null);
  const handleMenuPinChange = useCallback((newPinnedState) => {
    if (menuPinTimeoutRef.current) {
      clearTimeout(menuPinTimeoutRef.current);
    }
    
    menuPinTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsMenuPinned(newPinnedState);
      });
    }, 50);
  }, []);

  // Cleanup menu pin timeout
  useEffect(() => {
    return () => {
      if (menuPinTimeoutRef.current) {
        clearTimeout(menuPinTimeoutRef.current);
      }
    };
  }, []);

  // Success toast handler
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => {
        setSuccessToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoad) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: darkMeshGradient
      }}>
        <div style={{ color: 'white', fontSize: '1.125rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isMenuPinned={isMenuPinned}
        setIsMenuPinned={handleMenuPinChange}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          isMenuOpen={isMenuOpen}
          isMenuPinned={isMenuPinned}
          setIsMenuOpen={setIsMenuOpen}
          notificationCount={notificationCount}
          setIsNotificationPanelOpen={setIsNotificationPanelOpen}
          setIsProfilePanelOpen={setIsProfilePanelOpen}
          currentProfile={currentProfile}
          hasCriticalNotifications={hasCriticalNotifications}
        />
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f5f7f8' }}>
          <div className="w-full">
            {activeTab === 'dashboard' ? (
              <div className="flex justify-center" style={{ 
                marginLeft: (isMenuOpen && isMenuPinned) ? '280px' : '0',
                transition: 'margin-left 0.3s ease-in-out'
              }}>
                <div className="max-w-7xl w-full px-6 py-6">
                  {/* ✅ ENHANCED: Dashboard Header with Flexible Filters */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '1.5rem' 
                  }}>
                    {/* Left side - Title and Brand Filter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                        Marketing Performance
                      </h1>
                      
                      {/* ✅ NEW: Enhanced Brand Selector - integrated with title */}
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0.25rem 0.5rem',
                            fontSize: '1.75rem',
                            fontWeight: 400,
                            color: '#666',
                            cursor: 'pointer',
                            outline: 'none',
                            borderRadius: '0.25rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span>({getSelectedBrandsText()})</span>
                          <ChevronDown size={18} style={{ 
                            transform: showBrandDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }} />
                        </button>
                        
                        {showBrandDropdown && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: 'white',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            marginTop: '0.5rem',
                            minWidth: '200px'
                          }}>
                            <div style={{ padding: '0.75rem' }}>
                              <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.5rem',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                borderRadius: '0.25rem'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f8f9fa';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                              }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedBrands.includes('all')}
                                  onChange={() => handleBrandSelection('all')}
                                  style={{ accentColor: COLORS.evergreen }}
                                />
                                <span style={{ fontWeight: 600 }}>All Brands</span>
                              </label>
                              {brandData.filter(brand => brand.id !== 'all').map(brand => (
                                <label key={brand.id} style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  padding: '0.5rem',
                                  fontSize: '0.875rem',
                                  cursor: 'pointer',
                                  borderRadius: '0.25rem'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#f8f9fa';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() => handleBrandSelection(brand.id)}
                                    style={{ accentColor: COLORS.evergreen }}
                                  />
                                  <span>{brand.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right side - Dashboard Toggle, Date Range, and Export */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Dashboard Toggle Buttons - Only show for users with multiple dashboard access */}
                      {currentProfile.dashboards.length > 1 && (
                        <div style={{ 
                          display: 'flex', 
                          backgroundColor: '#ffffff', 
                          padding: '0.25rem', 
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                        }}>
                          {currentProfile.dashboards.map((dashboardKey) => {
                            const dashboard = dashboardConfigurations[dashboardKey];
                            if (!dashboard) return null;
                            
                            return (
                              <button 
                                key={dashboard.key}
                                style={{ 
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.875rem',
                                  fontWeight: 500,
                                  borderRadius: '0.375rem',
                                  backgroundColor: dashboardView === dashboard.key ? COLORS.evergreen : 'transparent',
                                  color: dashboardView === dashboard.key ? 'white' : COLORS.onyxMedium,
                                  border: 'none',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  whiteSpace: 'nowrap'
                                }}
                                className={`${dashboardView === dashboard.key ? 'active' : ''} ${dashboard.key === 'rfm' && !dashboardView === 'rfm' && hasShownPulse ? 'pulse' : ''}`}
                                onClick={() => setDashboardView(dashboard.key)}
                              >
                                {dashboard.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* ✅ NEW: Enhanced Date Range Selector */}
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#666666',
                            cursor: 'pointer',
                            outline: 'none',
                            borderRadius: '0.25rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Calendar size={16} />
                          <span>{getSelectedDateRangeText()}</span>
                          <ChevronDown size={14} style={{ 
                            transform: showDateRangeDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }} />
                        </button>
                        
                        {showDateRangeDropdown && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            marginTop: '0.5rem',
                            minWidth: '180px'
                          }}>
                            <div style={{ padding: '0.75rem' }}>
                              {dateRangeOptions.map(option => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedDateRange(option.id);
                                    setShowDateRangeDropdown(false);
                                  }}
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                    border: 'none',
                                    backgroundColor: selectedDateRange === option.id ? '#f0f9ff' : 'transparent',
                                    color: selectedDateRange === option.id ? COLORS.evergreen : '#333',
                                    cursor: 'pointer',
                                    borderRadius: '0.25rem',
                                    fontWeight: selectedDateRange === option.id ? 600 : 400
                                  }}
                                  onMouseEnter={(e) => {
                                    if (selectedDateRange !== option.id) {
                                      e.target.style.backgroundColor = '#f8f9fa';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (selectedDateRange !== option.id) {
                                      e.target.style.backgroundColor = 'transparent';
                                    }
                                  }}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* ✅ NEW: Enhanced Export Selector */}
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setShowExportDropdown(!showExportDropdown)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#666666',
                            cursor: 'pointer',
                            outline: 'none',
                            borderRadius: '0.25rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Download size={16} />
                          <span>Export</span>
                          <ChevronDown size={14} style={{ 
                            transform: showExportDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }} />
                        </button>
                        
                        {showExportDropdown && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            marginTop: '0.5rem',
                            minWidth: '200px'
                          }}>
                            <div style={{ padding: '0.75rem' }}>
                              {exportOptions.map(option => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    console.log('Exporting:', option.label);
                                    setShowExportDropdown(false);
                                  }}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: '#333',
                                    cursor: 'pointer',
                                    borderRadius: '0.25rem'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <Download size={16} />
                                  <span>{option.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* RFM Info Card */}
                  {dashboardView === 'rfm' && showRFMInfo && (
                    <RFMInfoCard onClose={() => setShowRFMInfo(false)} />
                  )}
                  
                  {/* Dashboard View Container with Animation */}
                  <div className="dashboard-view-container">
                    <TransitionGroup>
                      <CSSTransition
                        key={dashboardView}
                        timeout={500}
                        classNames={dashboardView === 'standard' ? 'standard-view' : 
                                  dashboardView === 'overview' ? 'standard-view' : 
                                  dashboardView === 'marketing' ? 'marketing-view' :
                                  dashboardView === 'narrative' ? 'marketing-view' :
                                  'rfm-view'}
                      >
                        <div className="dashboard-view">
                          {dashboardView === 'overview' ? (
                            <OverviewDashboard 
                              kpiData={columbiaKpiCardsData} 
                              insightsData={insightsData}
                            />
                          ) : dashboardView === 'marketing' ? (
                            <MarketingDashboard 
                              key={`marketing-${dashboardView}`}
                              aiState={{
                                isAIMinimized,
                                aiResponse,
                                lastQuestion,
                                showAIResponse
                              }}
                              aiHandlers={{
                                handleAIPromptSubmit,
                                handleAIPromptClick,
                                handleClearAIResponse,
                                setIsAIMinimized
                              }}
                              contextualPrompts={getDashboardPrompts()}
                              placeholderText={getPlaceholderText()}
                              onCampaignClick={handleCampaignClick}
                              onProgramClick={handleProgramClick}
                            />
                          ) : dashboardView === 'narrative' ? (
                            <NarrativeMarketingDashboard 
                              key={`narrative-${dashboardView}`}
                              aiState={{
                                isAIMinimized,
                                aiResponse,
                                lastQuestion,
                                showAIResponse
                              }}
                              aiHandlers={{
                                handleAIPromptSubmit,
                                handleAIPromptClick,
                                handleClearAIResponse,
                                setIsAIMinimized
                              }}
                              contextualPrompts={getDashboardPrompts()}
                              placeholderText={getPlaceholderText()}
                              onCampaignClick={handleCampaignClick}
                              onProgramClick={handleProgramClick}
                              onViewAllCampaigns={() => setShowCampaignModal(true)}
                              onRevenueClick={() => openKpiAnalytics('revenue')}
                            />
                          ) : dashboardView === 'standard' ? (
                            <>
                              {/* KPI Cards */}
                              <div style={{ marginBottom: '1.5rem' }}>
                                <DashboardKpiCards 
                                  data={columbiaKpiCardsData} 
                                  onClick={(kpiData) => {
                                    // Handle both object and string inputs
                                    if (typeof kpiData === 'object' && kpiData.title) {
                                      openKpiAnalytics(kpiData.title);
                                    } else if (typeof kpiData === 'string') {
                                      openKpiAnalytics(kpiData);
                                    } else {
                                      console.warn('Invalid KPI data:', kpiData);
                                    }
                                  }}
                                />
                              </div>
                              
                              {/* Unified Insights and Recommendations */}
                              <UnifiedInsightsAndRecommendations
                                insightsData={insightsData}
                                recommendationsData={(() => {
                                  console.log('DEBUG: insightsData:', insightsData);
                                  console.log('DEBUG: insightsData.recommendedActions:', insightsData?.recommendedActions);
                                  
                                  const transformedData = insightsData?.recommendedActions?.map((action, index) => {
                                    console.log(`DEBUG: Processing action ${index}:`, action);
                                    return {
                                      id: `rec-action-${index}`,
                                      title: action.text,
                                      description: action.impact,
                                      impact: action.priority === 'high' ? 'high' : action.priority === 'low' ? 'low' : 'medium',
                                      difficulty: action.difficulty?.toLowerCase() || 'medium',
                                      priority: action.priority || 'medium',
                                      programId: action.programId,
                                      action: action.action,
                                      type: 'optimization',
                                      expectedROI: '+25-40%',
                                      estimatedRevenue: action.impact.match(/\$(\d+[,\d]*K?)/)?.[1]?.replace('K', '000') || 0,
                                      memberImpact: action.impact.match(/(\d+[,\d]*)\s*customers/)?.[1] || 0
                                    };
                                  }) || [];
                                  
                                  console.log('DEBUG: Transformed recommendations:', transformedData);
                                  return transformedData;
                                })()}
                                onProgramClick={handleProgramClick}
                                onCampaignClick={handleCampaignClick}
                                variant="standard"
                              />
                              
                              {/* Charts Row - 3 equal columns */}
                              <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr 1fr', 
                                gap: '1.5rem',
                                marginBottom: '2rem'
                              }}>
                                <RevenueChart data={monthlyStats} />
                                <MembershipChart data={membershipData} />
                                <CampaignPerformanceChart />
                              </div>

                              {/* ✅ FIXED: Campaign Cards Section - MOVED TO BOTTOM */}
                              <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center', 
                                  marginBottom: '1rem' 
                                }}>
                                  <h3 style={{ 
                                    fontSize: '1.125rem', 
                                    fontWeight: 600, 
                                    color: COLORS.onyx, 
                                    margin: 0 
                                  }}>
                                    Active Campaigns
                                  </h3>
                                  <button 
                                    onClick={() => setShowCampaignModal(true)}
                                    style={{
                                      fontSize: '0.875rem',
                                      color: COLORS.evergreen,
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      fontWeight: 500
                                    }}
                                  >
                                    View All →
                                  </button>
                                </div>
                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                                  gap: '1rem' 
                                }}>
                                  {campaigns.slice(0, 3).map(campaign => (
                                    <CampaignCard 
                                      key={campaign.id} 
                                      campaign={campaign} 
                                      onClick={handleCampaignClick} 
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* ✅ FIXED: Program Cards Section - MOVED TO BOTTOM */}
                              <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center', 
                                  marginBottom: '1rem' 
                                }}>
                                  <h3 style={{ 
                                    fontSize: '1.125rem', 
                                    fontWeight: 600, 
                                    color: COLORS.onyx, 
                                    margin: 0 
                                  }}>
                                    Loyalty Programs
                                  </h3>
                                  <button 
                                    onClick={() => setShowLoyaltyModal(true)}
                                    style={{
                                      fontSize: '0.875rem',
                                      color: COLORS.evergreen,
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      fontWeight: 500
                                    }}
                                  >
                                    View All →
                                  </button>
                                </div>
                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                                  gap: '1rem' 
                                }}>
                                  {loyaltyPrograms.slice(0, 3).map(program => (
                                    <ProgramCard 
                                      key={program.id} 
                                      program={program} 
                                      onClick={handleProgramClick} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <RFMDashboard 
                              onSegmentClick={(segment) => {
                                console.log('RFM Segment clicked:', segment);
                                // Ensure smooth modal transitions for RFM segments
                                requestAnimationFrame(() => {
                                  // Add any specific RFM segment modal logic here
                                });
                              }}
                            />
                          )}
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  </div>
                </div>
              </div>
            ) : activeTab === 'campaigns' ? (
              <CampaignList 
                campaigns={campaigns}
                onCampaignClick={handleCampaignClick}
                onCampaignCreated={handleCampaignCreated}
                onViewAllClick={() => setShowCampaignModal(true)}
              />
            ) : activeTab === 'loyalty' ? (
              <ProgramList 
                programs={loyaltyPrograms}
                onProgramClick={handleProgramClick}
                onProgramCreated={handleLoyaltyProgramCreated}
                onViewAllClick={() => setShowLoyaltyModal(true)}
              />
            ) : (
              <ActionBarWithCopilot 
                activeTab={activeTab}
                onActionClick={openActionModal}
                onFeedbackClick={openFeedbackModal}
              />
            )}
          </div>
        </main>
      </div>

      {/* Click outside handlers for dropdowns */}
      {(showBrandDropdown || showDateRangeDropdown || showExportDropdown) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => {
            setShowBrandDropdown(false);
            setShowDateRangeDropdown(false);
            setShowExportDropdown(false);
          }}
        />
      )}

      {/* Modal Overlays */}
      
      {/* ✅ FIXED: Campaign Detail View - Pass selectedCampaign properly */}
      {selectedCampaign && (
        <CampaignDetailView
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onImplement={(recommendation) => {
            console.log(`Implementing recommendation: ${recommendation.title} for campaign: ${selectedCampaign.title}`);
          }}
          onModify={(recommendation) => {
            console.log(`Modifying recommendation: ${recommendation.title} for campaign: ${selectedCampaign.title}`);
          }}
          onReject={(recommendation) => {
            console.log(`Rejecting recommendation: ${recommendation.title} for campaign: ${selectedCampaign.title}`);
          }}
        />
      )}
      {/* ✅ FIXED: Program Detail View - Pass selectedProgram properly */}
      {selectedProgram && (
        <DetailView
          item={selectedProgram}
          type="loyalty"
          onClose={() => setSelectedProgram(null)}
          onActionClick={openActionModal}
          initialTab={selectedProgram.initialTab}
        />
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <CampaignModal
          isOpen={showCampaignModal}
          onClose={() => setShowCampaignModal(false)}
          campaigns={campaigns}
          filter={campaignFilter}           // ✅ ADD THIS
          setFilter={setCampaignFilter}     // ✅ ADD THIS
          onCampaignClick={handleCampaignClick}
          onCampaignCreated={handleCampaignCreated}
        />
      )}

      {/* Loyalty Program Modal */}
      {showLoyaltyModal && (
        <ProgramModal
          isOpen={showLoyaltyModal}
          onClose={() => setShowLoyaltyModal(false)}
          programs={loyaltyPrograms}
          filter={programFilter}            // ✅ ADD THIS
          setFilter={setProgramFilter}      // ✅ ADD THIS
          onProgramClick={handleProgramClick}
          onProgramCreated={handleLoyaltyProgramCreated}
        />
      )}

      {/* Split Test Modal */}
      {showSplitTestModal && (
        <SplitCampaignCreationModal
          isOpen={showSplitTestModal}
          onClose={() => setShowSplitTestModal(false)}
          onCampaignCreated={handleCampaignCreated}
          baseCampaign={selectedCampaign}
        />
      )}

      {/* Action Modal */}
      {showActionModal && (
        <ActionModal
          isOpen={showActionModal}
          onClose={() => setShowActionModal(false)}
          data={actionModalData}
        />
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          data={feedbackModalData}
        />
      )}

      {/* KPI Analytics Modal */}
      {selectedKpi && (
        <KpiAnalyticsModal
          isOpen={!!selectedKpi}
          onClose={closeKpiAnalytics}
          kpiType={selectedKpi}
          data={columbiaKpiCardsData.find(kpi => {
            // Handle different possible title formats
            const kpiTitle = kpi.title.toLowerCase();
            const searchKey = selectedKpi.toLowerCase();
            
            // Direct match
            if (kpiTitle === searchKey) return true;
            
            // Handle partial matches for common cases
            if (searchKey === 'revenue' && kpiTitle.includes('revenue')) return true;
            if (searchKey === 'customers' && (kpiTitle.includes('customer') || kpiTitle.includes('users'))) return true;
            if (searchKey === 'engagement' && kpiTitle.includes('engagement')) return true;
            if (searchKey === 'conversion' && kpiTitle.includes('conversion')) return true;
            if (searchKey === 'audience' && kpiTitle.includes('audience')) return true;
            
            return false;
          })}
          dateRange="last_30_days"
          setDateRange={() => {}} // Placeholder for now
        />
      )}

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notificationCount={notificationCount}
        setNotificationCount={setNotificationCount}
        onProgramClick={handleNotificationProgramClick}
        onCriticalNotificationsChange={setHasCriticalNotifications}
      />

      {/* Profile Panel */}
      <ProfilePanel 
        isOpen={isProfilePanelOpen}
        onClose={() => setIsProfilePanelOpen(false)}
        currentProfile={currentProfile}
        onProfileSwitch={handleProfileSwitch}
      />

      {/* Success Toast */}
      {successToast && (
        <CampaignSuccessToast
          message={successToast.message}
          onClose={() => setSuccessToast(null)}
        />
      )}
    </div>
  );
};

export default App;
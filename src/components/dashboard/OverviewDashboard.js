// src/components/dashboard/OverviewDashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertTriangle, ArrowUpRight, ArrowDownRight, 
  CheckCircle, TrendingUp, Send, Bot, ChevronRight,
  PieChart, BarChart2, Star, Target, Calendar, Award,
  X, MinusCircle, DollarSign, Users, Mail, ShoppingBag
} from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import KpiAnalyticsModal from '../analytics/KpiAnalyticsModal';
import { 
  overviewDashboardConfig,
  columbiaKpiCardsData 
} from '../../data/SampleData';

const OverviewDashboard = ({ kpiData = [], insightsData = {}, onOpenAnalytics }) => {
  // Import configuration from centralized data
  const {
    sampleQuestions,
    defaultInsights,
    summaryText,
    focusAreas,
    animations,
    styling
  } = overviewDashboardConfig;

  // State for AI query feature
  const [aiQuery, setAiQuery] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showKpiAnalytics, setShowKpiAnalytics] = useState(false);
  const [kpiType, setKpiType] = useState(null);
  const [dateRange, setDateRange] = useState('last_30_days');
  
  // Chat history state
  const [chatHistory, setChatHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);
  
  const inputRef = useRef(null);
  
  // Focus the input on load
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // Use provided data or defaults from configuration
  const actualInsights = Object.keys(insightsData).length > 0 ? insightsData : defaultInsights;

  // Function to highlight keywords in text
  const highlightKeywords = (text) => {
    const keywords = [
      'revenue', 'sales', 'growth', 'customer', 'engagement', 'ROI', 'conversion', 
      'retention', 'Summit tier', 'Explorer tier', 'redemption', 'open rate', 
      'benchmark', 'loyalty', 'program', 'Spring Adventure Newsletter', 'punch card',
      'Trail Essentials', 'Adventure Gear', 'completion rate', 'churn'
    ];
    
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, `<strong style="color: ${COLORS.evergreen}; font-weight: 600;">${keyword}</strong>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Handle AI query submission
  const handleAiQuerySubmit = (e) => {
    e?.preventDefault();
    if (!aiQuery.trim()) return;

    // Save the query and reset input
    const query = aiQuery;
    setLastQuestion(query);
    setAiQuery('');
    setIsAiTyping(true);
    setAiResponse(null);
    setIsMinimized(true);

    // Scroll to top of container
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate AI thinking and respond after a delay using configured timing
    setTimeout(() => {
      setIsAiTyping(false);
      
      // Generate a detailed response based on the query
      let response;
      const lowercaseQuery = query.toLowerCase();
      
      if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales')) {
        response = {
          text: "Your revenue is up 12.7% month-over-month, reaching $3.24M. However, this growth is being offset by a critical issue: the Trail Essentials Punch Card program is causing an estimated $180K revenue drag with its -39% ROI and 10% completion rate. The Winter Gear Sale campaign has generated $137,640 in revenue with a 1001% ROI, demonstrating what successful programs can achieve.",
          directAnswer: "Revenue growth is strong at $3.24M (+12.7%) but being undermined by the failing Trail Essentials Punch Card program causing $180K in losses and customer frustration.",
          recommendations: [
            {
              title: "Immediate Trail Essentials Program Suspension",
              description: "Pause the Trail Essentials Punch Card program immediately to stop the revenue hemorrhage and customer churn. Deploy customer recovery messaging and compensation for affected members. This could prevent an additional $50K in losses.",
              impact: "high",
              estimatedROI: "+280%"
            },
            {
              title: "Scale Adventure Gear Success Model",
              description: "The Adventure Gear Punch Card achieves 48% completion rate and 900% ROI. Apply this proven model to replace failing programs, potentially generating $120K in additional annual revenue per successful rollout.",
              impact: "high",
              estimatedROI: "+320%"
            }
          ],
          suggestedQuestions: [
            "What's causing the Trail Essentials punch card to fail so badly?",
            "How can we replicate Adventure Gear punch card success?",
            "Which customers are most affected by the failing program?",
            "What's the total financial impact of the punch card crisis?"
          ]
        };
      } else if (lowercaseQuery.includes('loyalty') || lowercaseQuery.includes('program') || lowercaseQuery.includes('punch card')) {
        response = {
          text: "Your loyalty program shows a critical crisis: the Trail Essentials Punch Card has a devastating 10% completion rate with -39% ROI, affecting 18.9K customers and driving 23% of customer complaints. This failing program is the primary cause of your 8.3% decline in overall redemption rates. In stark contrast, the Adventure Gear Punch Card achieves 48% completion and 900% ROI, showing what success looks like.",
          directAnswer: "CRITICAL: Trail Essentials Punch Card crisis (10% completion, -39% ROI) affecting 18.9K customers and driving overall loyalty program decline. Adventure Gear program shows 900% ROI success model.",
          recommendations: [
            {
              title: "Emergency Program Crisis Management",
              description: "Immediately suspend Trail Essentials Punch Card and deploy customer recovery campaign. 67% of customers abandon after 2nd punch, creating lasting brand damage. Emergency intervention could recover 35% of affected customers.",
              impact: "high",
              estimatedROI: "+340%"
            },
            {
              title: "Loyalty Program Architecture Overhaul",
              description: "Redesign loyalty programs using Adventure Gear success principles: achievable targets, relevant rewards, and clear value proposition. Replace all underperforming programs with proven models to restore customer trust.",
              impact: "high",
              estimatedROI: "+250%"
            }
          ],
          suggestedQuestions: [
            "Why is Trail Essentials punch card failing so dramatically?",
            "How many customers can we recover from the failed program?",
            "What makes Adventure Gear punch card so successful?",
            "Should we pause all punch card programs to reassess?"
          ]
        };
      } else {
        // Default response logic here...
        response = {
          text: "Your marketing performance shows strong fundamentals undermined by a critical loyalty program crisis. Revenue is up 12.7% ($3.24M) and customer growth is 8.3% (46.5K), but the Trail Essentials Punch Card disaster (10% completion, -39% ROI) is creating $180K in losses and affecting 18.9K customers.",
          directAnswer: "Strong performance (revenue +12.7%, customers +8.3%) but critical Trail Essentials punch card crisis causing $180K losses and threatening customer relationships across 18.9K members.",
          recommendations: [
            {
              title: "Crisis Management and Program Suspension",
              description: "Immediately suspend Trail Essentials Punch Card and deploy comprehensive crisis management including customer communication, compensation, and recovery campaigns.",
              impact: "high",
              estimatedROI: "+280%"
            }
          ],
          suggestedQuestions: sampleQuestions.slice(0, 4) // Use configured sample questions
        };
      }
      
      // Save to history
      const historyItem = {
        question: query,
        response: response,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, historyItem]);
      setCurrentHistoryIndex(chatHistory.length);
      setAiResponse(response);
    }, animations.fadeInDelay); // Use configured animation timing
  };

  // Handle clearing the AI response and returning to default view
  const handleClearResponse = () => {
    setAiResponse(null);
    setAiQuery('');
    setLastQuestion('');
    setIsMinimized(false);
  };

  // Auto-submit when a question is clicked
  const handleQuestionClick = (question) => {
    setAiQuery(question);
    
    const submitWithQuestion = () => {
      if (!question.trim()) return;
      
      setLastQuestion(question);
      setAiQuery('');
      setIsAiTyping(true);
      setAiResponse(null);
      setIsMinimized(true);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        setIsAiTyping(false);
        
        // Simplified response generation using configured data
        const response = {
          text: "Based on your question, I've analyzed your customer data and found some interesting patterns...",
          directAnswer: "Here's what I found in your data...",
          recommendations: [],
          suggestedQuestions: sampleQuestions.slice(0, 4)
        };
        
        const historyItem = {
          question: question,
          response: response,
          timestamp: new Date()
        };
        
        setChatHistory(prev => [...prev, historyItem]);
        setCurrentHistoryIndex(chatHistory.length);
        setAiResponse(response);
      }, animations.fadeInDelay);
    };
    
    submitWithQuestion();
  };

  // Open KPI Analytics Modal
  const handleKpiCardClick = (type) => {
    setKpiType(type.toLowerCase());
    setShowKpiAnalytics(true);
    
    if (onOpenAnalytics) {
      onOpenAnalytics(type.toLowerCase());
    }
  };

  // Navigate to specific history item
  const navigateToHistoryItem = (index) => {
    if (index >= 0 && index < chatHistory.length) {
      setCurrentHistoryIndex(index);
      setAiResponse(chatHistory[index].response);
      setLastQuestion(chatHistory[index].question);
      setIsMinimized(true);
      setShowHistory(false);
    }
  };
  
  // Clear chat history
  const clearChatHistory = () => {
    setChatHistory([]);
    setCurrentHistoryIndex(-1);
    setAiResponse(null);
    setLastQuestion('');
    setIsMinimized(false);
  };

  // Use configured summary text values
  const { mainPoints, conclusion } = summaryText;
  const revenueGrowth = mainPoints[0].change;
  const revenueValue = mainPoints[0].value;
  const customerGrowth = mainPoints[1].change;
  const customerCount = mainPoints[1].value;
  const engagementChange = mainPoints[2].change;
  const engagementRate = mainPoints[2].value;

  return (
    <div className="space-y-6" style={{ minHeight: '100vh' }}>
      {/* Main dashboard container */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'visible',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
        }}
      >
        {/* Minimized version of the AI Copilot */}
        {isMinimized && (
          <div 
            style={{
              backgroundColor: 'rgba(26, 76, 73, 0.05)',
              borderRadius: '1rem 1rem 0 0',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgba(26, 76, 73, 0.1)',
              transition: 'all 0.3s ease',
              width: '100%',
              marginBottom: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            {/* Bot icon */}
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              borderRadius: '0.5rem', 
              background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
              boxShadow: '0 2px 8px rgba(26, 76, 73, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={14} color="white" />
            </div>
            
            {/* Compact Input Form */}
            <form 
              onSubmit={handleAiQuerySubmit}
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                flex: 1,
                position: 'relative'
              }}
            >
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder={lastQuestion ? `"${lastQuestion}"` : "Ask a follow-up..."}
                style={{
                  flex: 1,
                  height: '2.25rem',
                  padding: '0 0.75rem',
                  paddingRight: chatHistory.length > 0 ? '6.5rem' : '5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(26, 76, 73, 0.2)',
                  backgroundColor: 'white',
                  fontSize: '0.875rem',
                  outline: 'none',
                  color: COLORS.onyx
                }}
                className="focus:border-evergreen"
              />
              
              {/* Action buttons */}
              <div style={{
                position: 'absolute',
                right: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {/* Chat history button */}
                {chatHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '1.75rem',
                      borderRadius: '0.875rem',
                      backgroundColor: 'rgba(26, 76, 73, 0.1)',
                      color: COLORS.evergreen,
                      border: 'none',
                      fontSize: '0.75rem',
                      padding: '0 0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                )}

                {/* Send button */}
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: '0.875rem',
                    backgroundColor: COLORS.evergreen,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  disabled={!aiQuery.trim() || isAiTyping}
                >
                  <Send size={14} />
                </button>
                
                {/* Expand button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: '0.875rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: COLORS.onyxMedium,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Header and input section - Only show when not minimized */}
        {!isMinimized && (
          <div
            style={{
              backgroundColor: 'rgba(26, 76, 73, 0.05)',
              borderRadius: '1rem 1rem 0 0',
              padding: '1.5rem 2rem',
              position: 'relative',
              width: '100%',
              borderBottom: '1px solid rgba(26, 76, 73, 0.08)',
              marginBottom: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '3.5rem', 
                height: '3.5rem', 
                borderRadius: '1rem', 
                background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
                boxShadow: '0 8px 20px rgba(26, 76, 73, 0.3), 0 2px 8px rgba(26, 76, 73, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.25rem',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '150%',
                  height: '150%',
                  top: '-25%',
                  left: '-25%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                  animation: 'pulse-slow 3s infinite'
                }}></div>
                
                <Bot size={24} color="white" />
              </div>
              
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: COLORS.onyx, 
                  marginBottom: '0.375rem',
                  letterSpacing: '-0.01em',
                  position: 'relative' 
                }}>
                  Marigold AI Copilot
                  <div style={{
                    position: 'absolute',
                    height: '3px',
                    width: '2.5rem',
                    background: `linear-gradient(to right, ${COLORS.evergreen}, ${COLORS.evergreenLight})`,
                    bottom: '-0.375rem',
                    left: '0',
                    borderRadius: '1rem'
                  }}></div>
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: COLORS.onyxMedium, 
                  fontWeight: 500,
                  marginTop: '0.75rem'
                }}>
                  Your intelligent marketing assistant
                </p>
              </div>

              {/* Header action buttons */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                display: 'flex',
                gap: '0.75rem',
                zIndex: 5
              }}>
                {/* Chat History Button */}
                {chatHistory.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'auto',
                      height: '2rem',
                      borderRadius: '1rem',
                      background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0 0.75rem',
                      boxShadow: '0 2px 6px rgba(26, 76, 73, 0.25)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    History ({chatHistory.length})
                  </button>
                )}

                {/* Minimize button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <MinusCircle size={16} color={COLORS.onyxMedium} />
                </button>
              </div>
            </div>
            
            {/* AI Query Input */}
            <form onSubmit={handleAiQuerySubmit}>
              <div style={{ position: 'relative' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask me anything about your marketing performance..."
                  style={{
                    width: '100%',
                    padding: '1rem 3.5rem 1rem 1.5rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(26, 76, 73, 0.2)',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    color: COLORS.onyx
                  }}
                  className="focus:border-evergreen focus:shadow-soft-glow"
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '0.75rem',
                    background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(26, 76, 73, 0.3)',
                    transition: 'all 0.2s'
                  }}
                  disabled={!aiQuery.trim() || isAiTyping}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flex: 1,
          flexWrap: 'wrap',
          padding: '2rem'
        }}>
          {/* Main content */}
          <div style={{ 
            flex: '3 1 300px',
            minWidth: '300px',
            maxWidth: '100%'
          }}>
            {/* Performance Stats Cards using configured styling */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              {/* Revenue Stat */}
              <div 
                onClick={() => handleKpiCardClick('Revenue')}
                style={{
                  borderRadius: '1rem',
                  background: styling.cardGradients.revenue,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${styling.borderColors.revenue}`,
                  boxShadow: styling.boxShadows.revenue,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={18} color={styling.iconColors.revenue} />
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: styling.iconColors.revenue }}>Revenue</div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: styling.iconColors.revenue,
                    backgroundColor: styling.borderColors.revenue,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '1rem'
                  }}>
                    <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                    {revenueGrowth}
                  </div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1B5E20' }}>{revenueValue}</div>
                <div style={{ fontSize: '0.75rem', color: '#388E3C', marginTop: '0.25rem', fontWeight: 500 }}>
                  {mainPoints[0].detail}
                </div>
              </div>
              
              {/* Similar pattern for other cards using configured values... */}
            </div>

            {/* AI is typing indicator */}
            {isAiTyping && (
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '1.5rem 0 2.5rem',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <div style={{ 
                  background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
                  color: 'white',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem',
                  boxShadow: '0 4px 12px rgba(26, 76, 73, 0.25)'
                }}>
                  <Bot size={20} />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '0.625rem',
                      height: '0.625rem',
                      borderRadius: '50%',
                      backgroundColor: COLORS.evergreen,
                      opacity: 0.6,
                      animation: 'pulse 1s infinite',
                      animationDelay: `${i * 0.2}s`
                    }}></div>
                  ))}
                </div>
                <div style={{ 
                  marginLeft: '0.5rem', 
                  fontSize: '1rem',
                  color: COLORS.onyxMedium,
                  fontWeight: 500
                }}>
                  Analyzing your marketing data...
                </div>
              </div>
            )}
            
            {/* AI Response section would go here... */}
            
            {/* Default Content - Use configured focus areas and summary */}
            {!aiResponse && !isAiTyping && (
              <div>
                {/* Focus areas using configured data */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  marginTop: '1rem'
                }}>
                  <h4 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: COLORS.onyx,
                    marginTop: 0,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    letterSpacing: '-0.01em'
                  }}>
                    <AlertTriangle size={18} color="#FF9500" />
                    {focusAreas.headline}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {focusAreas.areas.map((area, index) => (
                      <div key={index} style={{ 
                        display: 'flex',
                        gap: '1.25rem',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: area.metric === 'Trail Essentials Punch Card' ? 'rgba(244, 67, 54, 0.05)' : 'rgba(255, 149, 0, 0.05)',
                        border: area.metric === 'Trail Essentials Punch Card' ? '1px solid rgba(244, 67, 54, 0.15)' : '1px solid rgba(255, 149, 0, 0.15)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          minWidth: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '1rem',
                          backgroundColor: area.metric === 'Trail Essentials Punch Card' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                          border: area.metric === 'Trail Essentials Punch Card' ? '1px solid rgba(244, 67, 54, 0.2)' : '1px solid rgba(255, 149, 0, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          color: area.metric === 'Trail Essentials Punch Card' ? '#F44336' : '#FF9500',
                          fontSize: '1.25rem'
                        }}>
                          {area.value}
                        </div>
                        <div>
                          <h5 style={{ 
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: COLORS.onyx,
                            marginTop: 0,
                            marginBottom: '0.5rem'
                          }}>
                            {area.metric}
                          </h5>
                          <div style={{ 
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            color: area.metric === 'Trail Essentials Punch Card' ? '#F44336' : '#FF9500',
                            marginBottom: '0.5rem'
                          }}>
                            {area.insight}
                          </div>
                          <div style={{ 
                            fontSize: '0.875rem',
                            color: COLORS.onyxMedium,
                            marginBottom: '0.75rem',
                            lineHeight: 1.5
                          }}>
                            {area.impact}
                          </div>
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.875rem',
                            color: COLORS.evergreen,
                            fontWeight: 600
                          }}>
                            <CheckCircle size={14} />
                            {area.action}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: COLORS.onyxMedium,
                  fontWeight: 500,
                  marginBottom: '2rem'
                }}>
                  {conclusion}
                </div>
              </div>
            )}
          </div>

          {/* Right rail with prompt suggestions */}
          <div style={{ 
            flex: '1 1 220px',
            minWidth: '220px',
            maxWidth: '100%',
            alignSelf: 'flex-start'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(26, 76, 73, 0.03)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(26, 76, 73, 0.08)',
              position: 'sticky',
              top: '1rem'
            }}>
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: COLORS.onyx, 
                marginTop: 0,
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Bot size={20} color={COLORS.evergreen} />
                I'm here to help! Ask me about:
              </h4>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '0.75rem', 
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                {/* Use configured sample questions */}
                {(aiResponse ? (aiResponse.suggestedQuestions || sampleQuestions) : sampleQuestions).map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleQuestionClick(q)}
                    style={{ 
                      padding: '0.75rem 1rem',
                      backgroundColor: 'white',
                      border: '1px solid rgba(26, 76, 73, 0.2)',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      color: COLORS.onyx,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      animation: `fadeIn 0.3s ease-in-out ${i * 0.05 + 0.2}s`,
                      animationFillMode: 'both',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    className="prompt-suggestion-button"
                  >
                    <span style={{ flex: 1 }}>{q}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>

              {aiResponse && (
                <button
                  onClick={handleClearResponse}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '0.75rem',
                    marginTop: '1.5rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: COLORS.onyxMedium,
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <X size={14} style={{ marginRight: '0.5rem' }} />
                  Clear current response
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Chat History Sidebar */}
        {showHistory && (
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '320px',
            backgroundColor: 'white',
            boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            animation: `slideInRight ${animations.historySlideIn}ms ease-out`
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx }}>
                Conversation History
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} color={COLORS.onyxMedium} />
              </button>
            </div>
            
            <div style={{
              padding: '1rem',
              overflowY: 'auto',
              flex: 1
            }}>
              {chatHistory.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigateToHistoryItem(index)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    backgroundColor: currentHistoryIndex === index 
                      ? 'rgba(26, 76, 73, 0.1)' 
                      : 'rgba(0, 0, 0, 0.03)',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: currentHistoryIndex === index 
                      ? `1px solid ${COLORS.evergreen}` 
                      : '1px solid transparent'
                  }}
                >
                  <p style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: COLORS.onyx,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.question}
                  </p>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: COLORS.onyxMedium,
                    display: 'flex',
                    alignItems: 'center', 
                    gap: '0.25rem'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                onClick={clearChatHistory}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  color: COLORS.onyxMedium,
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Clear Conversation History
              </button>
            </div>
          </div>
        )}
      </div>

      {/* KPI Analytics Modal */}
      <KpiAnalyticsModal
        isOpen={showKpiAnalytics}
        onClose={() => setShowKpiAnalytics(false)}
        kpiType={kpiType}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.5; }
          50% { opacity: 0.2; }
          100% { opacity: 0.5; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .prompt-suggestion-button:hover {
          background-color: ${COLORS.evergreen};
          color: white;
          border-color: ${COLORS.evergreen};
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }
        
        .focus\\:border-evergreen:focus {
          border-color: #1A4C49;
        }
        
        .focus\\:shadow-soft-glow:focus {
          box-shadow: 0 0 0 4px rgba(26, 76, 73, 0.15), 0 4px 15px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
};

export default OverviewDashboard;
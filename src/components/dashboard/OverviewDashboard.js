// src/components/dashboard/OverviewDashboard.js
import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, TrendingUp, Users, DollarSign, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const OverviewDashboard = ({ kpiData, insightsData }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  // Sample questions for the AI assistant
  const sampleQuestions = [
    "What's driving my revenue growth this month?",
    "Which campaigns need immediate attention?",
    "How can I improve customer engagement?",
    "What are my top performing segments?",
    "Where should I focus my marketing efforts?"
  ];

  const handleQuestionClick = (question) => {
    setCurrentInput(question);
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const response = generateResponse(question);
      setCurrentResponse(response);
      setShowResponse(true);
      setIsLoading(false);
      
      // Add to chat history
      setChatHistory(prev => [...prev, {
        question,
        response,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1500);
  };

  const generateResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('growth')) {
      return {
        title: 'Revenue Growth Analysis',
        summary: 'Your revenue growth of 12.7% is driven by strong winter campaign performance and loyal customer engagement.',
        insights: [
          'Winter Gear Sale campaign contributing 34% of monthly growth',
          'Summit tier members showing 15% higher spend per transaction',
          'Cross-selling initiatives driving 8% basket size increase'
        ],
        recommendations: [
          'Scale successful winter campaign elements to other seasonal products',
          'Develop targeted upsell campaigns for Summit tier members',
          'Optimize cross-sell recommendations in checkout flow'
        ]
      };
    } else if (lowerQuestion.includes('campaign') || lowerQuestion.includes('attention')) {
      return {
        title: 'Campaign Performance Alerts',
        summary: 'Trail Essentials campaign requires immediate optimization while Winter Gear continues strong performance.',
        insights: [
          'Trail Essentials showing 261% ROI vs target of 400%+',
          'Winter Gear Sale achieving 1001% ROI, exceeding expectations',
          'Email open rates up 15% across all active campaigns'
        ],
        recommendations: [
          'Pause Trail Essentials for messaging analysis and optimization',
          'Expand Winter Gear budget allocation by 25%',
          'A/B test subject lines for underperforming campaigns'
        ]
      };
    } else if (lowerQuestion.includes('engagement') || lowerQuestion.includes('customer')) {
      return {
        title: 'Customer Engagement Insights',
        summary: 'Overall engagement trending positive with opportunities in loyalty program optimization.',
        insights: [
          'Email engagement up 4.2% month-over-month',
          'Loyalty program participation declining in premium tiers',
          'Mobile engagement rates 23% higher than desktop'
        ],
        recommendations: [
          'Investigate premium tier loyalty program issues',
          'Implement mobile-first campaign designs',
          'Launch re-engagement series for inactive members'
        ]
      };
    } else {
      return {
        title: 'Marketing Performance Overview',
        summary: 'Strong overall performance with selective optimization opportunities across campaigns and loyalty programs.',
        insights: [
          'Revenue growth of 12.7% exceeding quarterly targets',
          'Customer acquisition costs down 8% while retention improving',
          'Digital channel performance up 18% across all touchpoints'
        ],
        recommendations: [
          'Continue investment in high-performing winter campaigns',
          'Address loyalty program engagement challenges',
          'Expand successful digital strategies to underperforming channels'
        ]
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleQuestionClick(currentInput.trim());
      setCurrentInput('');
    }
  };

  const clearResponse = () => {
    setCurrentResponse(null);
    setShowResponse(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Main AI Assistant Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative gradient background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: `linear-gradient(135deg, ${COLORS.evergreen}15 0%, ${COLORS.evergreenLight}10 100%)`,
          zIndex: 1
        }}></div>

        {/* Header section */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* AI Icon */}
          <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '1rem',
            background: `linear-gradient(135deg, ${COLORS.evergreen} 0%, ${COLORS.evergreenLight} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(26, 76, 73, 0.3)',
            position: 'relative'
          }}>
            {/* Pulsing animation dot */}
            <div style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              backgroundColor: '#00ff88',
              borderRadius: '50%',
              top: '8px',
              right: '8px',
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
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(26, 76, 73, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 6px rgba(26, 76, 73, 0.25)';
                }}
              >
                History ({chatHistory.length})
              </button>
            )}
          </div>
        </div>

        {/* Current Response Display */}
        {showResponse && currentResponse && (
          <div style={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(26, 76, 73, 0.1)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                {currentResponse.title}
              </h3>
              <button
                onClick={clearResponse}
                style={{
                  background: 'none',
                  border: 'none',
                  color: COLORS.onyxMedium,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem'
                }}
              >
                ×
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '1rem' }}>
              {currentResponse.summary}
            </p>

            {currentResponse.insights && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Key Insights:
                </h4>
                <ul style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                  {currentResponse.insights.map((insight, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentResponse.recommendations && (
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                  Recommended Actions:
                </h4>
                <ul style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, paddingLeft: '1rem', margin: 0 }}>
                  {currentResponse.recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Chat History Panel */}
        {showHistory && chatHistory.length > 0 && (
          <div style={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: 'rgba(248, 250, 252, 0.95)',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.75rem' }}>
              Recent Conversations
            </h4>
            {chatHistory.slice(-3).reverse().map((chat, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.evergreen, marginBottom: '0.25rem' }}>
                  {chat.timestamp}
                </div>
                <div style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '0.25rem' }}>
                  Q: {chat.question}
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.onyxMedium }}>
                  {chat.response.summary}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Ask me about your marketing performance, campaigns, or customer engagement..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: 'white',
                transition: 'border-color 0.2s ease',
                opacity: isLoading ? 0.6 : 1
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.evergreen}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            />
            <button
              type="submit"
              disabled={isLoading || !currentInput.trim()}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: COLORS.evergreen,
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: isLoading || !currentInput.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !currentInput.trim() ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              {isLoading ? 'Analyzing...' : 'Ask'}
            </button>
          </div>
        </form>

        {/* Sample Questions */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h3 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            color: COLORS.onyxMedium, 
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Suggested Questions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.75rem'
          }}>
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                disabled={isLoading}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(26, 76, 73, 0.15)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: COLORS.onyx,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.6 : 1,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.borderColor = COLORS.evergreen;
                    e.target.style.backgroundColor = 'rgba(26, 76, 73, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(26, 76, 73, 0.15)';
                  e.target.style.backgroundColor = 'white';
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apple-style Focus Areas */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: COLORS.onyx, 
          marginBottom: '0.5rem',
          letterSpacing: '-0.01em'
        }}>
          Loyalty Program Performance Issues Requiring Strategic Attention
        </h2>
        <p style={{ 
          fontSize: '1rem', 
          color: COLORS.onyxMedium, 
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          Critical performance indicators show immediate intervention opportunities that could prevent revenue loss and restore member confidence.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Premium Gear Access Program */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(244, 67, 54, 0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(244, 67, 54, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                Premium Gear Access Program
              </h3>
              <div style={{
                backgroundColor: '#F44336',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                68% decline
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
              Member decline in 60 days with -56% ROI affecting premium tier perception
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '1rem' }}>
              <strong>Impact:</strong> 4,280 affected customers, $156K revenue loss, operational challenges
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.evergreen, fontWeight: 600 }}>
              <strong>Action:</strong> Redesign program structure and implement member recovery campaign
            </p>
          </div>

          {/* Trail Essentials Punch Card */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 152, 0, 0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 152, 0, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                Trail Essentials Punch Card
              </h3>
              <div style={{
                backgroundColor: '#FF9800',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                10% completion
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
              Low completion rate with -39% ROI causing customer frustration and churn
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '1rem' }}>
              <strong>Impact:</strong> 18.9K customers affected, $180K revenue drag, 23% of customer complaints
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.evergreen, fontWeight: 600 }}>
              <strong>Action:</strong> Restructure program design and deploy customer satisfaction campaign
            </p>
          </div>

          {/* Overall Program Health */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(76, 175, 80, 0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(76, 175, 80, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, margin: 0 }}>
                Overall Program Health
              </h3>
              <div style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                -8.3% redemption
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
              Loyalty redemption decline driven by cascading program performance issues and member concerns
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.onyx, marginBottom: '1rem' }}>
              <strong>Impact:</strong> Approximately $32,000 in unredeemed value, engagement declining
            </p>
            <p style={{ fontSize: '0.875rem', color: COLORS.evergreen, fontWeight: 600 }}>
              <strong>Action:</strong> Deploy comprehensive loyalty program optimization using Adventure Gear success model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, ArrowUpRight, Zap, Send, User, RefreshCw } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { aiCopilotConfig } from '../../data/SampleData';

const MarigoldAICopilot = ({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose, 
  initialQuery = '' 
}) => {
  // Use external control if provided, otherwise use internal state
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [userInput, setUserInput] = useState(initialQuery || aiCopilotConfig.defaultInput);
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  // Determine if we're externally controlled
  const isExternallyControlled = externalIsOpen !== undefined;
  const isOpen = isExternallyControlled ? externalIsOpen : internalIsOpen;
  const setIsOpen = isExternallyControlled ? externalOnClose : setInternalIsOpen;

  // Update input when initialQuery changes
  useEffect(() => {
    if (initialQuery && initialQuery !== userInput) {
      setUserInput(initialQuery);
    }
  }, [initialQuery]);

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Toggle the AI suggestions panel
  const togglePanel = () => {
    if (isExternallyControlled) {
      // If externally controlled, call the external close handler
      if (externalOnClose) {
        externalOnClose();
      }
    } else {
      // If internally controlled, toggle our own state
      setInternalIsOpen(!internalIsOpen);
    }
  };

  // Handle applying a suggestion to a journey
  const handleApplyToJourney = (suggestionId) => {
    console.log(`Applying suggestion ${suggestionId} to journey`);
    alert(`Suggestion ${suggestionId} applied to customer journey`);
  };

  // Handle launching a challenge
  const handleLaunchChallenge = (suggestionId) => {
    console.log(`Launching challenge from suggestion ${suggestionId}`);
    alert(`Challenge from suggestion ${suggestionId} launched`);
  };

  // Get appropriate AI response based on input
  const getAIResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('loyalty') && (lowercaseInput.includes('program') || lowercaseInput.includes('tier'))) {
      return aiCopilotConfig.responses.loyalty;
    } else if (lowercaseInput.includes('segment') || lowercaseInput.includes('customer')) {
      return aiCopilotConfig.responses.segment;
    } else if (lowercaseInput.includes('campaign')) {
      return aiCopilotConfig.responses.campaign;
    } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('spend')) {
      return aiCopilotConfig.responses.budget;
    } else {
      return aiCopilotConfig.responses.default;
    }
  };

  // Handle submitting a new question
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to conversation
    const newUserMessage = { type: 'user', content: userInput.trim() };
    setConversation([...conversation, newUserMessage]);
    
    // Clear input field
    const currentQuestion = userInput.trim();
    setUserInput('');
    
    // Set typing state
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      // Check if this is the initial loyalty engagement question
      if (currentQuestion.toLowerCase().includes('how can i improve april loyalty engagement')) {
        // If it's the initial question, first add the initial response without suggestions
        setIsTyping(false);
        setConversation(prev => [
          ...prev,
          { 
            type: 'ai', 
            content: aiCopilotConfig.initialResponse,
            suggestions: []
          }
        ]);

        // Define our recommendations
        const recommendations = [
          {
            id: 1,
            title: "Launch a Spring Challenge for April",
            description: "Create a limited-time challenge that rewards members for completing 3 activities in April, with bonus points for outdoor gear purchases.",
            impact: "high",
            effort: "medium",
            expectedLift: "+24%"
          },
          {
            id: 2,
            title: "Personalized Re-engagement Campaign",
            description: "Target members who haven't engaged in 30+ days with personalized offers based on previous purchase categories.",
            impact: "high",
            effort: "low",
            expectedLift: "+18%"
          },
          {
            id: 3,
            title: "Double Points Weekend Event",
            description: "Host a surprise double points weekend mid-April to drive engagement during traditionally slower periods.",
            impact: "medium",
            effort: "low",
            expectedLift: "+15%"
          }
        ];

        // Add recommendations one by one with delays
        setTimeout(() => {
          setIsTyping(true);
          
          // Add first recommendation after typing delay
          setTimeout(() => {
            setIsTyping(false);
            setConversation(prev => {
              const updatedConversation = [...prev];
              const lastMessage = {...updatedConversation[updatedConversation.length - 1]};
              lastMessage.suggestions = [recommendations[0]];
              updatedConversation[updatedConversation.length - 1] = lastMessage;
              return updatedConversation;
            });
            
            // Start typing for second recommendation
            setTimeout(() => {
              setIsTyping(true);
              
              // Add second recommendation after typing delay
              setTimeout(() => {
                setIsTyping(false);
                setConversation(prev => {
                  const updatedConversation = [...prev];
                  const lastMessage = {...updatedConversation[updatedConversation.length - 1]};
                  lastMessage.suggestions = [recommendations[0], recommendations[1]];
                  updatedConversation[updatedConversation.length - 1] = lastMessage;
                  return updatedConversation;
                });
                
                // Start typing for third recommendation
                setTimeout(() => {
                  setIsTyping(true);
                  
                  // Add third recommendation after typing delay
                  setTimeout(() => {
                    setIsTyping(false);
                    setConversation(prev => {
                      const updatedConversation = [...prev];
                      const lastMessage = {...updatedConversation[updatedConversation.length - 1]};
                      lastMessage.suggestions = recommendations;
                      updatedConversation[updatedConversation.length - 1] = lastMessage;
                      return updatedConversation;
                    });
                  }, 1500); // Time to "type" third recommendation
                }, 500); // Pause before typing third recommendation
              }, 1500); // Time to "type" second recommendation
            }, 500); // Pause before typing second recommendation
          }, 1500); // Time to "type" first recommendation
        }, 500); // Initial pause before starting to type first recommendation
      } else {
        // For other questions, use the standard response logic
        setTimeout(() => {
          setIsTyping(false);
          
          const aiResponseContent = getAIResponse(currentQuestion);
          const aiResponse = {
            type: 'ai',
            content: aiResponseContent
          };
          
          setConversation(prev => [...prev, aiResponse]);
        }, 2000);
      }
    }, 1000); // Initial thinking time
  };

  // Clear conversation and restart
  const handleRestartConversation = () => {
    setConversation([]);
    setSuggestions(null);
    setUserInput(initialQuery || aiCopilotConfig.defaultInput);
    if (!isExternallyControlled) {
      setInternalIsOpen(false);
      setTimeout(() => {
        setInternalIsOpen(true);
      }, 100);
    }
  };

  // Close handler
  const handleClose = () => {
    if (isExternallyControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Position for floating button (only show if not externally controlled)
  const buttonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '6.5rem',
    zIndex: 100
  };

  // Position for modal overlay (when externally controlled)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    pointerEvents: 'all'
  };

  // Panel position style
  const panelPositionStyle = isExternallyControlled ? {
    position: 'relative',
    bottom: 'auto',
    right: 'auto'
  } : {
    position: 'absolute',
    bottom: '5rem',
    right: '0'
  };

  if (!isOpen) {
    return isExternallyControlled ? null : (
      <div style={buttonStyle}>
        {/* AI Copilot Button */}
        <button
          onClick={togglePanel}
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: COLORS.evergreen,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <Bot size={24} />
          <div style={{
            position: 'absolute',
            top: '-0.25rem',
            right: '-0.25rem',
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#FF9800',
            border: '2px solid white'
          }} />
        </button>
      </div>
    );
  }

  const chatPanel = (
    <div style={{
      ...panelPositionStyle,
      width: '380px',
      height: '550px',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Panel Header */}
      <div style={{ 
        padding: '1rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.evergreen,
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Bot size={18} style={{ marginRight: '0.5rem' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
            {aiCopilotConfig.panelTitle}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={handleRestartConversation}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.25rem'
            }}
            title={aiCopilotConfig.buttonLabels.restart}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.25rem'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Conversation Messages Area */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {conversation.map((message, index) => (
          <div key={index}>
            {/* User message */}
            {message.type === 'user' && (
              <div style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <div style={{ 
                  backgroundColor: '#F0F0F0',
                  color: COLORS.onyx,
                  minWidth: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <User size={16} />
                </div>
                <div style={{ 
                  backgroundColor: '#F0F0F0',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem 1rem 1rem 0',
                  maxWidth: '75%',
                  fontSize: '0.875rem'
                }}>
                  {message.content}
                </div>
              </div>
            )}

            {/* AI message */}
            {message.type === 'ai' && (
              <div style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: message.suggestions ? '1rem' : '0.5rem'
              }}>
                <div style={{ 
                  backgroundColor: COLORS.evergreen,
                  color: 'white',
                  minWidth: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <Bot size={16} />
                </div>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  maxWidth: '85%',
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(26, 76, 73, 0.08)',
                    color: COLORS.onyx,
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem 1rem 0 1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.4'
                  }}>
                    {message.content}
                  </div>

                  {/* If there are suggestions, render them */}
                  {message.suggestions && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {message.suggestions.map((suggestion) => (
                        <div 
                          key={suggestion.id}
                          style={{ 
                            backgroundColor: 'white',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            borderLeft: `3px solid ${
                              suggestion.impact === 'high' ? '#4CAF50' : 
                              suggestion.impact === 'medium' ? '#2196F3' : 
                              '#FFC107'
                            }`,
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                            fontSize: '0.75rem'
                          }}
                        >
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            gap: '0.5rem'
                          }}>
                            <h5 style={{ 
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: COLORS.onyx,
                              margin: 0
                            }}>
                              {suggestion.title}
                            </h5>
                            <div style={{ 
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              color: suggestion.impact === 'high' ? '#4CAF50' : '#2196F3',
                              backgroundColor: suggestion.impact === 'high' 
                                ? 'rgba(76, 175, 80, 0.1)' 
                                : 'rgba(33, 150, 243, 0.1)',
                              padding: '0.125rem 0.375rem',
                              borderRadius: '0.25rem',
                              whiteSpace: 'nowrap'
                            }}>
                              {suggestion.expectedLift}
                            </div>
                          </div>
                          
                          <p style={{ 
                            fontSize: '0.75rem',
                            color: COLORS.onyxMedium,
                            margin: '0 0 0.75rem 0'
                          }}>
                            {suggestion.description}
                          </p>
                          
                          <div style={{ 
                            display: 'flex',
                            gap: '0.5rem'
                          }}>
                            <button
                              onClick={() => handleApplyToJourney(suggestion.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.5rem 0.75rem',
                                backgroundColor: COLORS.evergreen,
                                color: 'white',
                                borderRadius: '0.375rem',
                                border: 'none',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                cursor: 'pointer'
                              }}
                            >
                              <ArrowUpRight size={14} style={{ marginRight: '0.25rem' }} />
                              {aiCopilotConfig.buttonLabels.apply}
                            </button>
                            
                            <button
                              onClick={() => handleLaunchChallenge(suggestion.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.5rem 0.75rem',
                                backgroundColor: 'white',
                                color: COLORS.evergreen,
                                borderRadius: '0.375rem',
                                border: `1px solid ${COLORS.evergreen}`,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                cursor: 'pointer'
                              }}
                            >
                              <Zap size={14} style={{ marginRight: '0.25rem' }} />
                              {aiCopilotConfig.buttonLabels.launch}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0.5rem 0'
          }}>
            <div style={{ 
              backgroundColor: COLORS.evergreen,
              color: 'white',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem'
            }}>
              <Bot size={16} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite'
              }}></div>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite',
                animationDelay: '0.2s'
              }}></div>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite',
                animationDelay: '0.4s'
              }}></div>
            </div>
          </div>
        )}

        {/* AI typing indicator */}
        {isTyping && !loading && (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0.5rem 0'
          }}>
            <div style={{ 
              backgroundColor: COLORS.evergreen,
              color: 'white',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem'
            }}>
              <Bot size={16} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite'
              }}></div>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite',
                animationDelay: '0.2s'
              }}></div>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: COLORS.evergreen,
                opacity: 0.6,
                animation: 'pulse 1s infinite',
                animationDelay: '0.4s'
              }}></div>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        style={{ 
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        <input
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={aiCopilotConfig.placeholders.input}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            fontSize: '0.875rem',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button
          type="submit"
          disabled={!userInput.trim() || loading || isTyping}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: userInput.trim() && !loading && !isTyping ? COLORS.evergreen : '#E0E0E0',
            color: userInput.trim() && !loading && !isTyping ? 'white' : '#999999',
            border: 'none',
            cursor: userInput.trim() && !loading && !isTyping ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={16} />
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return isExternallyControlled ? (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      {chatPanel}
    </div>
  ) : (
    <div style={buttonStyle}>
      {chatPanel}
    </div>
  );
};

export default MarigoldAICopilot;
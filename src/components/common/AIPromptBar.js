// src/components/common/AIPromptBar.js
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ChevronDown, ChevronUp, Sparkles, RefreshCw } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const AIPromptBar = ({ 
  onSubmit, 
  isMinimized, 
  onToggleMinimize, 
  placeholderText = "Ask me anything about your marketing performance...", 
  suggestedPrompts = [] 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [promptsTransitioning, setPromptsTransitioning] = useState(false);
  const [currentPrompts, setCurrentPrompts] = useState([]);
  const [isRefreshedView, setIsRefreshedView] = useState(false);
  const [promptSet, setPromptSet] = useState(0);
  const [lastGeneratedTime, setLastGeneratedTime] = useState(Date.now());
  const inputRef = useRef(null);
  const previousPromptsRef = useRef(suggestedPrompts);

  // Enhanced prompt generation with context awareness and variety - only used on refresh
  const generateContextualPrompts = (basePrompts, variationSeed = 0) => {
    const promptVariations = {
      // Marketing Performance Variations
      "Which campaigns should I pause or optimize?": [
        "Which campaigns should I pause or optimize?",
        "What campaigns are underperforming and need immediate attention?",
        "Which of my current campaigns should I stop or improve?",
        "What marketing initiatives should I discontinue or enhance?"
      ],
      "What's my budget utilization vs target?": [
        "What's my budget utilization vs target?", 
        "How am I tracking against my marketing budget goals?",
        "What's my current spend rate compared to quarterly targets?",
        "Am I on track with my marketing budget allocation?"
      ],
      "How can I improve my lowest performing campaign?": [
        "How can I improve my lowest performing campaign?",
        "What's wrong with my worst-performing marketing campaign?",
        "How do I fix my underperforming campaigns quickly?",
        "What changes would boost my lowest ROI campaign?"
      ],
      "Which customer segments are most profitable?": [
        "Which customer segments are most profitable?",
        "What customer groups generate the highest lifetime value?",
        "Which audience segments should I focus marketing spend on?",
        "What customer types give me the best return on investment?"
      ],
      // RFM Specific Variations
      "Which RFM segments should I focus on first?": [
        "Which RFM segments should I focus on first?",
        "What customer segments need my immediate attention?", 
        "Which RFM groups offer the biggest opportunity?",
        "What segments should I prioritize for revenue growth?"
      ],
      "How can I improve retention for At Risk customers?": [
        "How can I improve retention for At Risk customers?",
        "What's the best strategy to win back At Risk customers?",
        "How do I prevent At Risk customers from churning?",
        "What tactics work best for recovering high-value At Risk customers?"
      ],
      "What's the best strategy for Champions segment?": [
        "What's the best strategy for Champions segment?",
        "How do I maximize value from my Champions customers?",
        "What tactics work best for high-value Champions?",
        "How can I get Champions to advocate for my brand?"
      ],
      "How do I convert Potential Loyalists to Champions?": [
        "How do I convert Potential Loyalists to Champions?",
        "What's the best way to upgrade Potential Loyalists?",
        "How can I move customers from Potential Loyalists to Champions?",
        "What strategies help Potential Loyalists become Champions?"
      ],
      "Why are my Can't Lose customers declining in value?": [
        "Why are my Can't Lose customers declining in value?",
        "What's causing my Can't Lose segment to underperform?",
        "How can I re-engage my Can't Lose customers?",
        "What's wrong with my Can't Lose customer strategy?"
      ],
      // Standard Dashboard Variations  
      "How are my campaigns performing this month?": [
        "How are my campaigns performing this month?",
        "What's my campaign performance summary for this month?",
        "Which campaigns are hitting their monthly targets?",
        "How do this month's campaign results compare to last month?"
      ],
      "What KPIs need immediate attention?": [
        "What KPIs need immediate attention?",
        "Which metrics are concerning and require action?",
        "What performance indicators are below benchmark?",
        "Which KPIs should I focus on improving first?"
      ]
    };

    // Add time-based context
    const timeContextPrompts = [
      "What should be my marketing priorities for the rest of this month?",
      "What trends am I seeing in customer behavior this quarter?", 
      "How do my current metrics compare to the same period last year?",
      "What seasonal opportunities should I be preparing for?"
    ];

    // Add urgency-based prompts based on time of day
    const hour = new Date().getHours();
    const urgencyPrompts = hour < 12 ? [
      "What are the top 3 things I should focus on today?",
      "What campaigns need my attention this morning?",
      "What's the most important marketing task for today?"
    ] : [
      "What can I accomplish before end of day to improve performance?",
      "What quick wins can I implement this afternoon?", 
      "What should I prioritize for tomorrow morning?"
    ];

    // Generate varied prompts
    const variedPrompts = basePrompts.map(prompt => {
      const variations = promptVariations[prompt];
      if (variations) {
        const variationIndex = (variationSeed + basePrompts.indexOf(prompt)) % variations.length;
        return variations[variationIndex];
      }
      return prompt;
    });

    // Mix in contextual prompts based on variation seed
    const contextualMix = [...variedPrompts];
    if (variationSeed % 3 === 0) {
      contextualMix.splice(2, 0, timeContextPrompts[variationSeed % timeContextPrompts.length]);
    }
    if (variationSeed % 4 === 0) {
      contextualMix.splice(4, 0, urgencyPrompts[variationSeed % urgencyPrompts.length]);
    }

    return contextualMix.slice(0, 6); // Always return exactly 6 prompts
  };

  // Initialize prompts - just show first 6 items as-is
  useEffect(() => {
    if (suggestedPrompts.length > 0) {
      // Always show first 6 items from the array as-is initially
      const initialPrompts = suggestedPrompts.slice(0, 6);
      setCurrentPrompts(initialPrompts);
      setIsRefreshedView(false);
      previousPromptsRef.current = suggestedPrompts;
    }
  }, [suggestedPrompts]);

  // Handle smooth prompt transitions when suggestedPrompts change
  useEffect(() => {
    if (JSON.stringify(suggestedPrompts) !== JSON.stringify(previousPromptsRef.current)) {
      // Start transition
      setPromptsTransitioning(true);
      
      // Reset to initial view (first 6 items) when props change
      const newPrompts = suggestedPrompts.slice(0, 6);
      
      // After a brief delay, swap the prompts with animation
      setTimeout(() => {
        setCurrentPrompts(newPrompts);
        setIsRefreshedView(false);
        previousPromptsRef.current = suggestedPrompts;
        
        // End transition after animation completes
        setTimeout(() => {
          setPromptsTransitioning(false);
        }, 300);
      }, 100);
    }
  }, [suggestedPrompts]);

  // Focus input when expanded
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
      // Show suggestions when expanded
      if (currentPrompts.length > 0) {
        setShowSuggestions(true);
      }
    }
  }, [isMinimized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery('');
    }
  };

  const handlePromptClick = (prompt) => {
    setQuery(prompt);
    onSubmit(prompt);
  };

  const handleMinimizedInputClick = (e) => {
    e.stopPropagation();
    onToggleMinimize();
  };

  const handleMinimizedInputSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (query.trim()) {
      onSubmit(query);
      setQuery('');
    }
  };

  // Enhanced prompt generation with smarter variety - only on refresh click
  const generateNewPrompts = () => {
    if (suggestedPrompts.length >= 6) {
      setPromptsTransitioning(true);
      
      // Use time-based seed for better variety
      const timeSeed = Math.floor(Date.now() / 10000); // Changes every 10 seconds
      const newSet = (promptSet + 1) % 4; // Cycle through 4 different variation sets
      
      setTimeout(() => {
        // Now use the contextual generation with variations
        const newPrompts = generateContextualPrompts(suggestedPrompts, timeSeed + newSet);
        setCurrentPrompts(newPrompts);
        setPromptSet(newSet);
        setIsRefreshedView(true);
        setLastGeneratedTime(Date.now());
        
        setTimeout(() => {
          setPromptsTransitioning(false);
        }, 300);
      }, 100);
    }
  };

  // Reset to original prompts
  const resetToOriginal = () => {
    if (isRefreshedView && suggestedPrompts.length > 0) {
      setPromptsTransitioning(true);
      
      setTimeout(() => {
        const originalPrompts = suggestedPrompts.slice(0, 6);
        setCurrentPrompts(originalPrompts);
        setIsRefreshedView(false);
        setPromptSet(0);
        
        setTimeout(() => {
          setPromptsTransitioning(false);
        }, 300);
      }, 100);
    }
  };

  // Check if enough time has passed to allow regeneration (prevent spam)
  const canRegenerate = Date.now() - lastGeneratedTime > 2000; // 2 second cooldown

  if (isMinimized) {
    return (
      <div className="ai-prompt-bar-minimized">
        <div className="ai-prompt-minimized-content">
          <div className="ai-prompt-minimized-icon">
            <Bot size={16} />
          </div>
          
          <form onSubmit={handleMinimizedInputSubmit} className="ai-prompt-minimized-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={handleMinimizedInputClick}
              placeholder="Ask AI Assistant..."
              className="ai-prompt-minimized-input"
            />
            <button 
              type="submit" 
              className="ai-prompt-minimized-submit"
              disabled={!query.trim()}
              onClick={(e) => e.stopPropagation()}
            >
              <Send size={14} />
            </button>
          </form>
          
          <button 
            className="ai-prompt-minimized-expand"
            onClick={onToggleMinimize}
            aria-label="Expand AI Assistant"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-prompt-bar-expanded">
      <div className="ai-prompt-header">
        <div className="ai-prompt-header-content">
          <div className="ai-prompt-header-icon">
            <Bot size={20} />
          </div>
          <div className="ai-prompt-header-text">
            <h3 className="ai-prompt-title">AI Marketing Assistant</h3>
            <p className="ai-prompt-subtitle">Get insights and recommendations</p>
          </div>
        </div>
        <button 
          className="ai-prompt-toggle-btn"
          onClick={onToggleMinimize}
          aria-label="Minimize AI Assistant"
        >
          <ChevronUp size={16} />
        </button>
      </div>

      <div className="ai-prompt-input-container">
        <form onSubmit={handleSubmit} className="ai-prompt-form">
          <div className="ai-prompt-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholderText}
              className="ai-prompt-input"
            />
            <button 
              type="submit" 
              className="ai-prompt-submit-btn"
              disabled={!query.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </form>

        {/* Always show suggestions when expanded and have prompts */}
        {currentPrompts.length > 0 && (
          <div className="ai-prompt-suggestions ai-prompt-suggestions-visible">
            <div className="ai-prompt-suggestions-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={14} />
                <span>Suggested questions</span>
                {promptsTransitioning && (
                  <div className="ai-prompt-transition-indicator">
                    <div className="ai-prompt-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              {suggestedPrompts.length >= 6 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                  {isRefreshedView && (
                    <button 
                      className="ai-prompt-generate-new"
                      onClick={resetToOriginal}
                      disabled={promptsTransitioning}
                      title="Reset to original prompts"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      Reset
                    </button>
                  )}
                  <button 
                    className="ai-prompt-generate-new"
                    onClick={generateNewPrompts}
                    disabled={promptsTransitioning || !canRegenerate}
                    title={!canRegenerate ? "Please wait a moment before generating new prompts" : "Generate new contextual prompts"}
                  >
                    <RefreshCw size={12} style={{ marginRight: '0.25rem' }} />
                    {promptsTransitioning ? 'Generating...' : 'Refresh'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Fixed grid with reserved slots - now 3 columns */}
            <div className="ai-prompt-suggestions-list">
              {Array.from({ length: 6 }).map((_, index) => {
                const prompt = currentPrompts[index];
                const isTransitioning = promptsTransitioning && index < Math.max(currentPrompts.length, 6);
                
                return (
                  <div 
                    key={`slot-${index}-${lastGeneratedTime}-${isRefreshedView}`} // Include refresh state to force re-render
                    className={`ai-prompt-suggestion-slot ${prompt ? 'ai-prompt-slot-filled' : 'ai-prompt-slot-empty'} ${isTransitioning ? 'ai-prompt-slot-transitioning' : ''}`}
                  >
                    {prompt && (
                      <button
                        className={`ai-prompt-suggestion-btn ${isTransitioning ? 'ai-prompt-btn-transitioning' : ''}`}
                        onClick={() => handlePromptClick(prompt)}
                        style={{
                          animationDelay: `${index * 0.05}s`
                        }}
                      >
                        {prompt}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPromptBar;
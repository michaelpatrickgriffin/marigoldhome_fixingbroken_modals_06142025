// src/components/dashboard/SuggestedQuestions.js
import React from 'react';
import { Bot, ChevronRight, X } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';
import { suggestedQuestionsConfig } from '../../data/SampleData';

const SuggestedQuestions = ({ 
  questions, 
  handleQuestionClick, 
  aiResponse, 
  handleClearResponse 
}) => {
  // Import configuration from centralized data
  const {
    header,
    questionButton,
    clearButton,
    container,
    animations
  } = suggestedQuestionsConfig;

  // Get icon components based on configuration
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'Bot': return Bot;
      case 'ChevronRight': return ChevronRight;
      case 'X': return X;
      default: return ChevronRight;
    }
  };

  const HeaderIcon = getIconComponent(header.icon);
  const QuestionIcon = getIconComponent(questionButton.icon);
  const ClearIcon = getIconComponent(clearButton.icon);

  return (
    <div className={container.className}>
      <h4 
        className={container.titleClassName}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.125rem', 
          fontWeight: 600, 
          color: COLORS.onyx, 
          marginTop: 0,
          marginBottom: '1.25rem'
        }}
      >
        <HeaderIcon size={header.iconSize} color={COLORS.evergreen} />
        {header.title}
      </h4>
      
      <div 
        className={container.listClassName}
        style={{
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.75rem', 
          animation: 'fadeIn 0.5s ease-in-out'
        }}
      >
        {questions.map((q, i) => (
          <button 
            key={i}
            onClick={() => handleQuestionClick(q)}
            className={container.buttonClassName}
            style={{ 
              ...questionButton,
              color: COLORS.onyx,
              cursor: 'pointer',
              transition: 'all 0.2s',
              animation: `fadeIn ${animations.fadeInDelay}s ease-in-out ${i * animations.staggerDelay + animations.baseDelay}s`,
              animationFillMode: 'both',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = questionButton.hoverStyles.transform;
              e.target.style.boxShadow = questionButton.hoverStyles.boxShadow;
              e.target.style.backgroundColor = COLORS.evergreen;
              e.target.style.color = 'white';
              e.target.style.borderColor = COLORS.evergreen;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = '';
              e.target.style.boxShadow = questionButton.boxShadow;
              e.target.style.backgroundColor = questionButton.backgroundColor;
              e.target.style.color = COLORS.onyx;
              e.target.style.borderColor = questionButton.border.split(' ')[2]; // Extract border color
            }}
          >
            <span style={{ flex: 1 }}>{q}</span>
            <QuestionIcon size={questionButton.iconSize} />
          </button>
        ))}
      </div>

      {aiResponse && (
        <button
          className={container.clearButtonClassName}
          onClick={handleClearResponse}
          style={{
            ...clearButton.styling,
            color: COLORS.onyxMedium
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = clearButton.styling.backgroundColor;
          }}
        >
          <ClearIcon size={clearButton.iconSize} style={{ marginRight: '0.5rem' }} />
          {clearButton.text}
        </button>
      )}
    </div>
  );
};

export default SuggestedQuestions;
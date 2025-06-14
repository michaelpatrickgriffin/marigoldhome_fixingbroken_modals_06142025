// src/components/loyalty/LoyaltyProgramCreationModal.js
import React, { useState } from 'react';
import { X, ChevronRight, Users, Target, Zap, Award, Tag, Gift } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const LoyaltyProgramCreationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [programData, setProgramData] = useState({
    title: '',
    type: 'Points Promotion',
    audience: '',
    startDate: '',
    endDate: '',
    description: '',
    objective: '',
    pointsValue: '',
    rules: [],
    rewards: []
  });
  
  const updateProgramData = (field, value) => {
    setProgramData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = () => {
    // Here would be the logic to save the new loyalty program
    console.log('Creating loyalty program:', programData);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div>
      {/* Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          maxHeight: '90vh',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 201,
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.onyx }}>
            Create New Loyalty Program
          </h2>
          <button 
            onClick={onClose}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              color: COLORS.onyxMedium,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Step Indicator */}
        <div style={{ 
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {[1, 2, 3, 4].map(stepNumber => (
            <div 
              key={stepNumber} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                opacity: stepNumber <= step ? 1 : 0.5
              }}
            >
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: stepNumber === step ? COLORS.evergreen : (stepNumber < step ? 'rgba(26, 76, 73, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                color: stepNumber === step ? 'white' : (stepNumber < step ? COLORS.evergreen : COLORS.onyxMedium),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}>
                {stepNumber < step ? '✓' : stepNumber}
              </div>
              
              <span style={{ 
                marginLeft: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: stepNumber === step ? 600 : 400,
                color: stepNumber === step ? COLORS.onyx : COLORS.onyxMedium
              }}>
                {stepNumber === 1 ? 'Basics' : 
                 stepNumber === 2 ? 'Points & Rules' : 
                 stepNumber === 3 ? 'Rewards' : 'Review'}
              </span>
              
              {stepNumber < 4 && (
                <ChevronRight size={16} style={{ color: COLORS.onyxMedium, margin: '0 0.5rem' }} />
              )}
            </div>
          ))}
        </div>
        
        {/* Modal Body - Step Content */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Program Details
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Program Title
                </label>
                <input 
                  type="text"
                  value={programData.title}
                  onChange={(e) => updateProgramData('title', e.target.value)}
                  placeholder="Enter program title"
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Program Type
                </label>
                <select 
                  value={programData.type}
                  onChange={(e) => updateProgramData('type', e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="Points Promotion">Points Promotion</option>
                  <option value="Tiered Rewards">Tiered Rewards</option>
                  <option value="Lifecycle">Lifecycle</option>
                  <option value="Acquisition">Acquisition</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Retention">Retention</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Audience
                </label>
                <select 
                  value={programData.audience}
                  onChange={(e) => updateProgramData('audience', e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select audience</option>
                  <option value="All Tiers">All Tiers</option>
                  <option value="New Members">New Members</option>
                  <option value="Explorer Tier">Explorer Tier</option>
                  <option value="Trailblazer & Summit">Trailblazer & Summit</option>
                  <option value="1+ Year Members">1+ Year Members</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                    Start Date
                  </label>
                  <input 
                    type="date"
                    value={programData.startDate}
                    onChange={(e) => updateProgramData('startDate', e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: '0.375rem',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                    End Date
                  </label>
                  <input 
                    type="date"
                    value={programData.endDate}
                    onChange={(e) => updateProgramData('endDate', e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: '0.375rem',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Program Description
                </label>
                <textarea 
                  value={programData.description}
                  onChange={(e) => updateProgramData('description', e.target.value)}
                  placeholder="Enter program description"
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              {/* AI Suggestion Panel */}
              <div style={{
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginTop: '1rem',
                borderLeft: `3px solid ${COLORS.evergreen}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Zap size={18} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      AI Suggestion
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                      Based on historical data, double points promotions have shown the highest engagement for the Explorer Tier. Similar programs have achieved 32% higher point redemption rates when run during seasonal transitions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Points & Rules
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Point Value (per $1 spent)
                </label>
                <input 
                  type="number"
                  value={programData.pointsValue}
                  onChange={(e) => updateProgramData('pointsValue', e.target.value)}
                  placeholder="Enter points per dollar"
                  min="0"
                  step="0.1"
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Program Rules
                </label>
                <div style={{ 
                  backgroundColor: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.375rem',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                      <Tag size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                      Available Rules
                    </h4>
                    <button 
                      style={{
                        fontSize: '0.75rem',
                        color: COLORS.evergreen,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ marginRight: '0.25rem' }}>+</span> Add Custom Rule
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      'Earn 2X points on all purchases',
                      'Minimum purchase of $50 required',
                      'Limited to one redemption per customer',
                      'Bonus points for first purchase',
                      'Points expire after 90 days'
                    ].map((rule, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          if (programData.rules.includes(rule)) {
                            updateProgramData('rules', programData.rules.filter(r => r !== rule));
                          } else {
                            updateProgramData('rules', [...programData.rules, rule]);
                          }
                        }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.375rem',
                          backgroundColor: programData.rules.includes(rule) ? 'rgba(26, 76, 73, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                          color: programData.rules.includes(rule) ? COLORS.evergreen : COLORS.onyx,
                          border: programData.rules.includes(rule) ? `1px solid ${COLORS.evergreen}` : '1px solid transparent',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        {rule}
                        {programData.rules.includes(rule) && (
                          <div style={{ 
                            width: '1.25rem', 
                            height: '1.25rem', 
                            borderRadius: '50%', 
                            backgroundColor: COLORS.evergreen, 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.625rem',
                            fontWeight: 'bold'
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* AI Suggestion Panel */}
              <div style={{
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginTop: '1rem',
                borderLeft: `3px solid ${COLORS.evergreen}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Zap size={18} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      Rule Optimization
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                      Programs with 2X points and a minimum purchase threshold of $50 have shown 28% higher average order value. Consider combining these rules for optimal ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Program Rewards
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                  Available Rewards
                </label>
                <div style={{ 
                  backgroundColor: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.375rem',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx }}>
                      <Gift size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                      Select Rewards
                    </h4>
                    <button 
                      style={{
                        fontSize: '0.75rem',
                        color: COLORS.evergreen,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ marginRight: '0.25rem' }}>+</span> Add Custom Reward
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {[
                      { name: '$10 off next purchase', points: 500 },
                      { name: '$25 off next purchase', points: 1200 },
                      { name: 'Free shipping', points: 300 },
                      { name: 'Exclusive product access', points: 800 },
                      { name: '10% off entire purchase', points: 700 },
                      { name: 'Gift with purchase', points: 600 }
                    ].map((reward, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          const rewardString = `${reward.name} (${reward.points} points)`;
                          if (programData.rewards.includes(rewardString)) {
                            updateProgramData('rewards', programData.rewards.filter(r => r !== rewardString));
                          } else {
                            updateProgramData('rewards', [...programData.rewards, rewardString]);
                          }
                        }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.375rem',
                          backgroundColor: programData.rewards.includes(`${reward.name} (${reward.points} points)`) ? 'rgba(26, 76, 73, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                          color: programData.rewards.includes(`${reward.name} (${reward.points} points)`) ? COLORS.evergreen : COLORS.onyx,
                          border: programData.rewards.includes(`${reward.name} (${reward.points} points)`) ? `1px solid ${COLORS.evergreen}` : '1px solid transparent',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{reward.name}</span>
                          {programData.rewards.includes(`${reward.name} (${reward.points} points)`) && (
                            <div style={{ 
                              width: '1.25rem', 
                              height: '1.25rem', 
                              borderRadius: '50%', 
                              backgroundColor: COLORS.evergreen, 
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.625rem',
                              fontWeight: 'bold'
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: COLORS.onyxMedium }}>
                          {reward.points} points
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* AI Suggestion Panel */}
              <div style={{
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginTop: '1rem',
                borderLeft: `3px solid ${COLORS.evergreen}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Award size={18} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      Reward Optimization
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium }}>
                      For this audience, exclusive product access rewards have shown the highest redemption rate (42%). Free shipping rewards also provide a good balance of high perceived value and low program cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '1rem' }}>
                Review Program
              </h3>
              
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Program Title
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {programData.title || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Type
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {programData.type}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Audience
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {programData.audience || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Duration
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {programData.startDate && programData.endDate ? 
                        `${programData.startDate} to ${programData.endDate}` : 
                        'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                      Point Value
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                      {programData.pointsValue ? `${programData.pointsValue} points per $1` : 'Not specified'}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                    Description
                  </p>
                  <p style={{ fontSize: '0.875rem', color: COLORS.onyx }}>
                    {programData.description || 'Not specified'}
                  </p>
                </div>
                
                {programData.rules.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                      Program Rules
                    </p>
                    <ul style={{ marginLeft: '1.5rem', fontSize: '0.875rem' }}>
                      {programData.rules.map((rule, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {programData.rewards.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: COLORS.onyxMedium, marginBottom: '0.5rem' }}>
                      Available Rewards
                    </p>
                    <ul style={{ marginLeft: '1.5rem', fontSize: '0.875rem' }}>
                      {programData.rewards.map((reward, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>{reward}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* AI Insights Panel */}
              <div style={{
                backgroundColor: 'rgba(26, 76, 73, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem',
                borderLeft: `3px solid ${COLORS.evergreen}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Target size={18} style={{ color: COLORS.evergreen, marginRight: '0.75rem', marginTop: '0.25rem' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.onyx, marginBottom: '0.5rem' }}>
                      Program Performance Prediction
                    </p>
                    <p style={{ fontSize: '0.875rem', color: COLORS.onyxMedium, marginBottom: '0.75rem' }}>
                      Based on historical data, this program is predicted to achieve:
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                          Est. Participation
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
                          12.8K
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                          Est. Redemption Rate
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.onyx }}>
                          22.5%
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: COLORS.onyxMedium, marginBottom: '0.25rem' }}>
                          Est. ROI
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.green }}>
                          285%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
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
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          
          <button 
            onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.375rem',
              backgroundColor: COLORS.evergreen,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {step < 4 ? (
              <>
                Continue
                <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
              </>
            ) : 'Create Program'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramCreationModal;
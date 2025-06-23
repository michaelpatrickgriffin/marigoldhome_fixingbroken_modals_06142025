// src/contexts/MVPUIContext.js
import React, { createContext, useContext, useState } from 'react';

const MVPUIContext = createContext();

export const useMVPUI = () => {
  const context = useContext(MVPUIContext);
  if (!context) {
    throw new Error('useMVPUI must be used within a MVPUIProvider');
  }
  return context;
};

export const MVPUIProvider = ({ children }) => {
  const [isMVPMode, setIsMVPMode] = useState(false);

  const toggleMVPMode = () => {
    console.log('🔄 MVP Mode toggled from:', isMVPMode, 'to:', !isMVPMode);
    setIsMVPMode(prev => !prev);
  };

  const value = {
    isMVPMode,
    setIsMVPMode,
    toggleMVPMode
  };

  console.log('🎯 MVP Context Provider - isMVPMode:', isMVPMode);

  return (
    <MVPUIContext.Provider value={value}>
      {children}
    </MVPUIContext.Provider>
  );
};

export default MVPUIContext;
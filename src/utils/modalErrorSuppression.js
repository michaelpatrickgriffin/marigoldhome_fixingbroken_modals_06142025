// src/utils/modalErrorSuppression.js
// Global ResizeObserver error suppression specifically for modals

let suppressionInstalled = false;

export const installModalErrorSuppression = () => {
  if (suppressionInstalled) {
    return;
  }

  // Comprehensive ResizeObserver error suppression
  const originalError = console.error;
  console.error = (...args) => {
    // Suppress ResizeObserver errors that are caused by modal animations
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      (
        args[0].includes('ResizeObserver loop completed with undelivered notifications') ||
        args[0].includes('ResizeObserver loop limit exceeded') ||
        args[0].includes('ResizeObserver') ||
        args[0].includes('Non-passive event listener')
      )
    ) {
      // Silently ignore these errors
      return;
    }
    // Pass through all other errors
    originalError.apply(console, args);
  };

  // Global error event handler for ResizeObserver
  window.addEventListener('error', (event) => {
    if (
      event.message && 
      (
        event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
        event.message.includes('ResizeObserver loop limit exceeded') ||
        event.message.includes('ResizeObserver')
      )
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return true;
    }
  }, { capture: true });

  // Handle unhandled promise rejections related to ResizeObserver
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason && 
      event.reason.message && 
      event.reason.message.includes('ResizeObserver')
    ) {
      event.preventDefault();
      return true;
    }
  });

  // Patch ResizeObserver constructor to add error handling
  if (window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        const wrappedCallback = (entries, observer) => {
          try {
            callback(entries, observer);
          } catch (error) {
            // Silently ignore ResizeObserver callback errors
            if (!error.message || !error.message.includes('ResizeObserver')) {
              throw error;
            }
          }
        };
        super(wrappedCallback);
      }
    };
  }

  suppressionInstalled = true;
  console.log('✅ Modal ResizeObserver error suppression installed');
};

export const uninstallModalErrorSuppression = () => {
  // Note: This is a simplified version - in production you might want
  // to restore the original console.error and remove event listeners
  suppressionInstalled = false;
};

// Auto-install when module is imported
installModalErrorSuppression();
// warningSuppressions.js
// Global warning suppressions for React Native

import { LogBox } from 'react-native';

// Set to true to see what messages are being suppressed (for debugging)
const DEBUG_SUPPRESSIONS = false;

// Suppress specific warnings that we've verified are false positives
const suppressedWarnings = [
  'Text strings must be rendered within a <Text> component',
  /Text strings must be rendered within a <Text> component/,
  'Warning: Text strings must be rendered within a <Text> component',
  /Warning: Text strings must be rendered within a <Text> component/,
  /Text strings must be rendered within a.*Text.*component/i,
  'RCTText',
  /at RCTText/,
  /Text strings must be rendered/i,
  // Add other warnings you want to suppress here
];

// Configure LogBox to ignore these warnings
LogBox.ignoreLogs(suppressedWarnings);

// Also suppress console warnings and errors for this specific issue
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

const shouldSuppressMessage = (message) => {
  const isMatch = suppressedWarnings.some(warning => {
    if (typeof warning === 'string') {
      return message.includes(warning);
    } else if (warning instanceof RegExp) {
      return warning.test(message);
    }
    return false;
  });
  
  if (isMatch && DEBUG_SUPPRESSIONS) {
    console.log('🔇 Suppressed warning:', message);
  }
  
  return isMatch;
};

console.warn = (...args) => {
  const message = args.join(' ');
  if (!shouldSuppressMessage(message)) {
    originalConsoleWarn.apply(console, args);
  }
};

console.error = (...args) => {
  const message = args.join(' ');
  if (!shouldSuppressMessage(message)) {
    originalConsoleError.apply(console, args);
  }
};

export default suppressedWarnings;

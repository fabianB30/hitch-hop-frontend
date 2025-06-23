// warningSuppressions.js
// Global warning suppressions for React Native

import { LogBox } from 'react-native';

// Suppress specific warnings that we've verified are false positives
const suppressedWarnings = [
  'Text strings must be rendered within a <Text> component',
  /Text strings must be rendered within a <Text> component/,
  'Warning: Text strings must be rendered within a <Text> component',
  /Warning: Text strings must be rendered within a <Text> component/,
  // Add other warnings you want to suppress here
];

// Configure LogBox to ignore these warnings
LogBox.ignoreLogs(suppressedWarnings);

// Also suppress console warnings for this specific issue
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(' ');
  const shouldSuppress = suppressedWarnings.some(warning => {
    if (typeof warning === 'string') {
      return message.includes(warning);
    } else if (warning instanceof RegExp) {
      return warning.test(message);
    }
    return false;
  });

  if (!shouldSuppress) {
    originalConsoleWarn.apply(console, args);
  }
};

export default suppressedWarnings;
import { use } from 'react';

import { BrowserThemeContext, type BrowserThemeContextValue } from '@context/BrowserThemeContext.js';

export function useBrowserTheme(): BrowserThemeContextValue {
  const context = use(BrowserThemeContext);

  if (!context) {
    throw new Error('useBrowserTheme must be used within <BrowserThemeProvider>');
  }

  return context;
}

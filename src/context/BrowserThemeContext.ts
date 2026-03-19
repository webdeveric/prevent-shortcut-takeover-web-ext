import { createContext } from 'react';

import type { ThemeColors } from '@src/types.js';

export type BrowserThemeContextValue = {
  colors: ThemeColors | null;
};

export const BrowserThemeContext = createContext<BrowserThemeContextValue>(
  {
    colors: null,
  },
  // @ts-expect-error - displayName as second arg is a React 19.2+ feature,
  'BrowserThemeContext',
);

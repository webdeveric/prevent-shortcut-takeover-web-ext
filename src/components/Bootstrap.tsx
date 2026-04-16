import { StrictMode, type FunctionComponent, type PropsWithChildren } from 'react';

import { ActiveTabProvider } from '@components/ActiveTabProvider/ActiveTabProvider.js';
import { BrowserThemeProvider } from '@components/BrowserThemeProvider/BrowserThemeProvider.js';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.jsx';

export const Bootstrap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserThemeProvider>
          <ActiveTabProvider>{children}</ActiveTabProvider>
        </BrowserThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
};

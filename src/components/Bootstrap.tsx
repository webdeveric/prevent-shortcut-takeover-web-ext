import { StrictMode, type FunctionComponent, type PropsWithChildren } from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.jsx';

export const Bootstrap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </StrictMode>
  );
};

import React, { FunctionComponent } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

export const Bootstrap: FunctionComponent<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.StrictMode>
  );
};

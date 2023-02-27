import React, { FunctionComponent, PropsWithChildren } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

export const Bootstrap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.StrictMode>
  );
};

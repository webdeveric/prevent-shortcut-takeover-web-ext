import { use } from 'react';

import { ActiveTabContext, type ActiveTabContextValue } from '@context/ActiveTabContext.js';

export function useActiveTab(): ActiveTabContextValue {
  const context = use(ActiveTabContext);

  if (!context) {
    throw new Error('useActiveTab must be used within <ActiveTabProvider>');
  }

  return context;
}

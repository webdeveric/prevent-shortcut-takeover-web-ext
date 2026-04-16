import { createContext } from 'react';

export type ActiveTabContextValue = {
  tabId: number | undefined;
  url: URL | null;
  isInternal: boolean;
  favIconUrl: string | undefined;
  title: string | undefined;
};

export const defaultContextValue: ActiveTabContextValue = {
  tabId: undefined,
  url: null,
  isInternal: true,
  favIconUrl: undefined,
  title: undefined,
};

export const ActiveTabContext = createContext<ActiveTabContextValue>(
  defaultContextValue,
  // @ts-expect-error - displayName as second arg is a React 19.2+ feature,
  'ActiveTabContext',
);

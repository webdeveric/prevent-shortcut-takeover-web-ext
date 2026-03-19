import { useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { tabs } from 'webextension-polyfill';

import { ActiveTabContext, defaultContextValue, type ActiveTabContextValue } from '@context/ActiveTabContext.js';
import { isActiveTabChanged } from '@utils/isActiveTabChanged.js';
import { isInternalPage } from '@utils/isInternalPage.js';
import { onRuntimeMessage } from '@utils/onRuntimeMessage.js';

export const ActiveTabProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<ActiveTabContextValue>(defaultContextValue);

  useEffect(() => {
    tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then(([tab]) => {
        setValue({
          tabId: tab.id,
          url: tab.url ? new URL(tab.url) : null,
          isInternal: isInternalPage(tab.url),
          favIconUrl: tab.favIconUrl,
          title: tab.title,
        });
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      });

    return onRuntimeMessage((message: unknown): void => {
      if (process.env.NODE_ENV === 'development') {
        console.dir({ message });
      }

      if (isActiveTabChanged(message)) {
        setValue({
          tabId: message.payload.tabId,
          url: message.payload.url ? new URL(message.payload.url) : null,
          isInternal: isInternalPage(message.payload.url),
          favIconUrl: message.payload.favIconUrl,
          title: message.payload.title,
        });
      }
    });
  }, []);

  return <ActiveTabContext value={value}>{children}</ActiveTabContext>;
};

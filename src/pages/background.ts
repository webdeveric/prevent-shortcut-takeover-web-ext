import { runtime, storage, tabs, type Runtime } from 'webextension-polyfill';

import { BrowserStorageKey, type StorageData } from '@models/storage.js';
import { debug } from '@utils/logging.js';
import { sendMessageToRuntime } from '@utils/sendMessageToRuntime.js';
import type { ActiveTabChanged } from '@src/types.js';

async function getDefaultData(): Promise<StorageData> {
  const platform = await runtime.getPlatformInfo();

  const isMac = platform.os === 'mac';

  return {
    [BrowserStorageKey.DisabledHosts]: [],
    [BrowserStorageKey.Shortcuts]: [
      {
        altKey: false,
        ctrlKey: !isMac,
        metaKey: isMac,
        shiftKey: false,
        key: 'k',
      },
      {
        altKey: false,
        ctrlKey: !isMac,
        metaKey: isMac,
        shiftKey: false,
        key: 'l',
      },
    ],
  };
}

async function handleInstalled(details: Runtime.OnInstalledDetailsType): Promise<void> {
  console.info(
    `Installed reason: ${details.reason} - previousVersion: ${details.previousVersion} - temporary: ${details.temporary}`,
  );

  const defaultData = await getDefaultData();
  const currentData = await storage.local.get(null);

  // Enure the current shape of the data is present in `Storage`.
  await storage.local.set({
    ...defaultData,
    ...currentData,
  });

  if (process.env['NODE_ENV'] === 'development') {
    if (details.previousVersion === undefined) {
      await runtime.openOptionsPage();
    }
  }
}

runtime.onInstalled.addListener((details: Runtime.OnInstalledDetailsType) => {
  handleInstalled(details).catch(console.error);
});

tabs.onActivated.addListener((activeInfo) => {
  tabs
    .get(activeInfo.tabId)
    .then((tab) =>
      sendMessageToRuntime<ActiveTabChanged>({
        type: 'ACTIVE_TAB_CHANGED',
        payload: {
          tabId: activeInfo.tabId,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
          title: tab.title,
        },
      }),
    )
    .catch((error) => debug('Error occurred while handling active tab activation', error));
});

tabs.onUpdated.addListener((tabId, _changeInfo, tab) => {
  sendMessageToRuntime<ActiveTabChanged>({
    type: 'ACTIVE_TAB_CHANGED',
    payload: {
      tabId,
      url: tab.url,
      favIconUrl: tab.favIconUrl,
      title: tab.title,
    },
  }).catch((error) => debug('Error occurred while updating tab', error));
});

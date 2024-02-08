import { runtime, type Runtime, storage } from 'webextension-polyfill';

import { BrowserStorageKey } from '@models/storage.js';
import type { Shortcut } from '@models/shortcut.js';

async function getDefaultData(): Promise<Record<BrowserStorageKey.Shortcuts, Shortcut[]>> {
  const platform = await runtime.getPlatformInfo();

  const isMac = platform.os === 'mac';

  return {
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

  const missingStorage = Object.keys(await storage.local.get(null)).length === 0;

  if (missingStorage) {
    console.info('Using default data');

    await storage.local.set(await getDefaultData());
  }

  if (process.env.NODE_ENV === 'development') {
    if (details.previousVersion === undefined) {
      await runtime.openOptionsPage();
    }
  }
}

runtime.onInstalled.addListener((details: Runtime.OnInstalledDetailsType) => {
  void handleInstalled(details);
});

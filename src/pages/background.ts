import browser, { Runtime } from 'webextension-polyfill';
import type { Shortcut } from '../models';

import { BrowserStorageKey } from '../models/storage';

async function getDefaultData(): Promise<Record<BrowserStorageKey.Shortcuts, Shortcut[]>> {
  const platform = await browser.runtime.getPlatformInfo();

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

  const missingStorage = Object.keys(await browser.storage.local.get(null)).length === 0;

  if (missingStorage) {
    console.info('Using default data');

    await browser.storage.local.set(await getDefaultData());
  }

  if (process.env.NODE_ENV === 'development') {
    if (details.previousVersion === undefined) {
      await browser.runtime.openOptionsPage();
    }
  }
}

browser.runtime.onInstalled.addListener(handleInstalled);

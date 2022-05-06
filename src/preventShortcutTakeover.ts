import browser, { Storage } from 'webextension-polyfill';

import { BrowserStorageKey, Shortcut, StorageArea } from './models';
import { eventIsShortcut } from './util';

let shortcuts: Shortcut[] = [];

// Keep `shortcuts` array up-to-date with data in browser storage.
browser.storage.onChanged.addListener((changes: Record<string, Storage.StorageChange>, areaName: string) => {
  if (areaName === StorageArea.Local && changes[BrowserStorageKey.Shortcuts]) {
    shortcuts = changes[BrowserStorageKey.Shortcuts].newValue ?? [];

    if (process.env.NODE_ENV === 'development') {
      console.info('Shortcuts changed', shortcuts);
    }
  }
});

async function loadShortcuts(): Promise<void> {
  const { [BrowserStorageKey.Shortcuts]: data } = await browser.storage.local.get(BrowserStorageKey.Shortcuts);

  if (Array.isArray(data)) {
    shortcuts = data;

    if (process.env.NODE_ENV === 'development') {
      console.info('Shortcuts loaded', shortcuts);
    }
  }
}

loadShortcuts().catch(error => console.error(error));

document.addEventListener(
  'keydown',
  event => {
    if (shortcuts.some(shortcut => eventIsShortcut(event, shortcut))) {
      event.stopPropagation();
    }
  },
  {
    capture: true,
    passive: true,
  },
);

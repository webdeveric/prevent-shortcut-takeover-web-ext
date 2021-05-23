import { browser, Storage } from 'webextension-polyfill-ts';

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

browser.storage.local.get(BrowserStorageKey.Shortcuts).then(storage => {
  const data = storage[BrowserStorageKey.Shortcuts];

  if (Array.isArray(data)) {
    shortcuts = data;

    if (process.env.NODE_ENV === 'development') {
      console.info('Shortcuts loaded', shortcuts);
    }
  }
});

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

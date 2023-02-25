import browser, { Storage } from 'webextension-polyfill';

import { BrowserStorageKey, Shortcut, StorageArea } from './models';
import { eventIsShortcut } from './util/eventIsShortcut';
import { isShortcutArray } from './util/type-predicate';

export class PreventShortcutTakeover {
  constructor(protected shortcuts: Shortcut[] = []) {}

  handleStorageChanged = (changes: Record<string, Storage.StorageChange>, areaName: string): void => {
    if (areaName === StorageArea.Local && changes[BrowserStorageKey.Shortcuts]) {
      this.shortcuts = changes[BrowserStorageKey.Shortcuts].newValue ?? [];

      if (process.env.NODE_ENV === 'development') {
        console.info('Shortcuts changed', this.shortcuts);
      }
    }
  };

  handleKeyboardEvent = (event: KeyboardEvent): void => {
    if (this.shortcuts.some(shortcut => eventIsShortcut(event, shortcut))) {
      event.stopPropagation();
    }
  };

  async load(): Promise<this> {
    console.log('Loading data from storage');
    const { [BrowserStorageKey.Shortcuts]: data } = await browser.storage.local.get(BrowserStorageKey.Shortcuts);

    if (isShortcutArray(data)) {
      this.shortcuts = data;

      if (process.env.NODE_ENV === 'development') {
        console.info('Shortcuts loaded', this.shortcuts);
      }
    }

    return this;
  }

  setup(): this {
    console.log('Setting up PST');

    browser.storage.onChanged.addListener(this.handleStorageChanged);

    document.addEventListener('keydown', this.handleKeyboardEvent, {
      capture: true,
      passive: true,
    });

    return this;
  }

  teardown(): this {
    browser.storage.onChanged.removeListener(this.handleStorageChanged);

    document.removeEventListener('keydown', this.handleKeyboardEvent, {
      capture: true,
    });

    return this;
  }
}

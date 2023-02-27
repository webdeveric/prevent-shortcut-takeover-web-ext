import browser, { Storage } from 'webextension-polyfill';

import { BrowserStorageKey, Shortcut } from './models';

import { eventIsShortcut } from './util/eventIsShortcut';
import { isShortcutArray } from './util/type-predicate';

export class PreventShortcutTakeover {
  constructor(
    protected storageArea: Storage.StorageArea = browser.storage.local,
    protected document: Document = globalThis.document,
    protected shortcuts: Shortcut[] = [],
  ) {}

  handleStorageChanged = (changes: Record<string, Storage.StorageChange>): void => {
    if (changes[BrowserStorageKey.Shortcuts]) {
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
    this.storageArea.onChanged.addListener(this.handleStorageChanged);

    this.document.addEventListener('keydown', this.handleKeyboardEvent, {
      capture: true,
      passive: true,
    });

    return this;
  }

  teardown(): this {
    this.storageArea.onChanged.removeListener(this.handleStorageChanged);

    this.document.removeEventListener('keydown', this.handleKeyboardEvent, {
      capture: true,
    });

    return this;
  }
}

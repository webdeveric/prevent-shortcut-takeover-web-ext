import { storage, type Storage } from 'webextension-polyfill';

import { BrowserStorageKey } from '@models/storage.js';
import { eventIsShortcut } from '@utils/eventIsShortcut.js';
import { isShortcutArray } from '@utils/type-predicate.js';
import type { Shortcut } from '@models/shortcut.js';

export class PreventShortcutTakeover {
  constructor(
    protected storageArea: Storage.StorageArea = storage.local,
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
    const { [BrowserStorageKey.Shortcuts]: data } = await storage.local.get(BrowserStorageKey.Shortcuts);

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

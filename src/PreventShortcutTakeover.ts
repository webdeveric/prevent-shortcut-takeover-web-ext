import { asArray } from '@webdeveric/utils/asArray';
import { storage, type Storage } from 'webextension-polyfill';

import { BrowserStorageKey } from '@models/storage.js';
import { eventIsShortcut } from '@utils/eventIsShortcut.js';
import { isShortcut, isShortcutArray } from '@utils/type-predicate.js';
import type { Shortcut } from '@models/shortcut.js';

import type { KeyboardEventName } from '@webdeveric/utils/types/dom-events';

export class PreventShortcutTakeover {
  eventNames: KeyboardEventName[] = [
    'keydown',
    //  TODO: Update the UI to have a dropdown to select which events to prevent
    // 'keypress',
    // 'keyup',
  ];

  constructor(
    protected storageArea: Storage.StorageArea = storage.local,
    protected root = globalThis.window,
    protected shortcuts: Shortcut[] = [],
  ) {}

  handleStorageChanged = (changes: Record<string, Storage.StorageChange>): void => {
    if (changes[BrowserStorageKey.Shortcuts]) {
      this.shortcuts = asArray(changes[BrowserStorageKey.Shortcuts].newValue).filter(isShortcut);

      if (process.env.NODE_ENV === 'development') {
        console.info('Shortcuts changed', this.shortcuts);
      }
    }
  };

  handleKeyboardEvent = (event: KeyboardEvent): void => {
    if (this.shortcuts.some((shortcut) => eventIsShortcut(event, shortcut))) {
      console.debug('Preventing shortcut takeover', { event });

      event.stopImmediatePropagation();
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

    this.eventNames.forEach((eventName) => {
      this.root.addEventListener(eventName, this.handleKeyboardEvent, {
        capture: true,
        passive: true,
      });
    });

    return this;
  }

  teardown(): this {
    this.storageArea.onChanged.removeListener(this.handleStorageChanged);

    this.eventNames.forEach((eventName) => {
      this.root.removeEventListener(eventName, this.handleKeyboardEvent, {
        capture: true,
      });
    });

    return this;
  }
}

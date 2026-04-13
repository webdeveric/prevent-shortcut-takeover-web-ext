import { asArray } from '@webdeveric/utils/asArray';
import { isString } from '@webdeveric/utils/predicate/isString';
import { isStringArray } from '@webdeveric/utils/predicate/isStringArray';
import { storage, type Storage } from 'webextension-polyfill';

import { BrowserStorageKey } from '@models/storage.js';
import { eventIsShortcut } from '@utils/eventIsShortcut.js';
import { debug } from '@utils/logging.js';
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

  disabledHosts: Set<string>;

  constructor(
    protected storageArea: Storage.StorageArea = storage.local,
    protected root: Window = globalThis.window,
    protected shortcuts: Shortcut[] = [],
    disabledHosts: string[] = [],
  ) {
    this.disabledHosts = new Set(disabledHosts);
  }

  handleStorageChanged = (changes: Record<string, Storage.StorageChange>): void => {
    if (changes[BrowserStorageKey.DisabledHosts]) {
      this.disabledHosts = new Set(asArray(changes[BrowserStorageKey.DisabledHosts].newValue).filter(isString));

      debug('Disabled hosts changed', this.disabledHosts);
    }

    if (changes[BrowserStorageKey.Shortcuts]) {
      this.shortcuts = asArray(changes[BrowserStorageKey.Shortcuts].newValue).filter(isShortcut);

      debug('Shortcuts changed', this.shortcuts);
    }
  };

  handleKeyboardEvent = (event: KeyboardEvent): void => {
    const host = this.root.location.host;

    if (this.disabledHosts.has(host)) {
      debug('Host is disabled for preventing shortcut takeover', { host, event });

      return;
    }

    if (this.shortcuts.some((shortcut) => eventIsShortcut(event, shortcut))) {
      debug({ event });

      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  };

  async load(): Promise<this> {
    const { [BrowserStorageKey.Shortcuts]: shortcuts, [BrowserStorageKey.DisabledHosts]: disabledHosts } =
      await this.storageArea.get({
        [BrowserStorageKey.DisabledHosts]: [],
        [BrowserStorageKey.Shortcuts]: [],
      });

    if (isShortcutArray(shortcuts)) {
      this.shortcuts = shortcuts;

      debug('Shortcuts loaded', this.shortcuts);
    }

    if (isStringArray(disabledHosts)) {
      this.disabledHosts = new Set(disabledHosts);

      debug('Disabled hosts loaded', this.disabledHosts);
    }

    return this;
  }

  setup(): this {
    debug('Setup', this.root.location.href);

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

import type { Shortcut } from '@models/shortcut.js';

export enum BrowserStorageKey {
  DisabledHosts = 'disabledHosts',
  Shortcuts = 'shortcuts',
}

export enum StorageAreaName {
  Local = 'local',
  Managed = 'managed',
  Sync = 'sync',
}

export type StorageData = {
  [BrowserStorageKey.DisabledHosts]: string[];
  [BrowserStorageKey.Shortcuts]: Shortcut[];
};

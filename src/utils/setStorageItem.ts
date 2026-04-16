import { runtime, storage } from 'webextension-polyfill';

import { StorageAreaName, type BrowserStorageKey, type StorageData } from '@models/storage.js';

export async function setStorageItem<Key extends BrowserStorageKey>(key: Key, value: StorageData[Key]): Promise<void> {
  await storage[StorageAreaName.Local].set({ [key]: value });

  if (runtime.lastError) {
    throw runtime.lastError;
  }
}

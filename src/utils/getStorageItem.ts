import { storage } from 'webextension-polyfill';

import { StorageAreaName, type BrowserStorageKey, type StorageData } from '@models/storage.js';

export async function getStorageItem<Key extends BrowserStorageKey>(key: Key): Promise<StorageData[Key] | undefined>;

export async function getStorageItem<Key extends BrowserStorageKey>(
  key: Key,
  defaultValue: StorageData[Key],
): Promise<StorageData[Key]>;

export async function getStorageItem(key: BrowserStorageKey, defaultValue?: unknown): Promise<unknown> {
  const { [key]: value } = await storage[StorageAreaName.Local].get({ [key]: defaultValue });

  return value;
}

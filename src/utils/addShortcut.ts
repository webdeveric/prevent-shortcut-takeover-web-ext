import { BrowserStorageKey } from '@models/storage.js';
import { getStorageItem } from '@utils/getStorageItem.js';
import { getUniqueShortcuts } from '@utils/getUniqueShortcuts.js';
import { setStorageItem } from '@utils/setStorageItem.js';
import type { Shortcut } from '@models/shortcut.js';

export async function addShortcut(shortcut: Shortcut): Promise<void> {
  const existingShortcuts = await getStorageItem(BrowserStorageKey.Shortcuts, []);

  await setStorageItem(BrowserStorageKey.Shortcuts, getUniqueShortcuts([...existingShortcuts, shortcut]));
}

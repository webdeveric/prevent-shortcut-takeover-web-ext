import type { Shortcut } from '@models/shortcut.js';

import type { RequireAtLeastOne } from '@webdeveric/utils/types/records';

export const createShortcutWithDefaults = (shortcut: RequireAtLeastOne<Partial<Shortcut>, 'key'>): Shortcut => ({
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  selector: undefined,
  ...shortcut,
});

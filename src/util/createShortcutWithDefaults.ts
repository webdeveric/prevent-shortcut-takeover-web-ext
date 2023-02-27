import type { RequireAtLeastOne } from '@webdeveric/utils/types';

import type { Shortcut } from '../models/shortcut';

export const createShortcutWithDefaults = (shortcut: RequireAtLeastOne<Partial<Shortcut>, 'key'>): Shortcut => ({
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  selector: undefined,
  ...shortcut,
});

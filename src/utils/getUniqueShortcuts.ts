import type { Shortcut } from '@models/shortcut.js';

export const getUniqueShortcuts = (shortcuts: Shortcut[]): Shortcut[] =>
  [...new Set(shortcuts.map((shortcut) => JSON.stringify(shortcut, null, 0)))].map((item) => JSON.parse(item));

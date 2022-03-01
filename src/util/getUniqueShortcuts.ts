import { Shortcut } from '../models/shortcut';

export const getUniqueShortcuts = (shortcuts: Shortcut[]): Shortcut[] => {
  const items = new Set(shortcuts.map(shortcut => JSON.stringify(shortcut, null, 0)));

  return [...items].map(item => JSON.parse(item));
};

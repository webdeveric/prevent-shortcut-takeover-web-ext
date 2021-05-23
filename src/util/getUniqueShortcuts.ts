import { Shortcut } from '../models/shortcut';

export const getUniqueShortcuts = (shortcuts: Shortcut[]): Shortcut[] => {
  const items = new Set(shortcuts.map(s => JSON.stringify(s, null, 0)));

  return [...items].map(item => JSON.parse(item));
};

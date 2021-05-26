import { createShortcutWithDefaults } from './createShortcutWithDefaults';
import type { Shortcut } from '../models/shortcut';

export const eventIsShortcut = (event: KeyboardEvent, shortcut: Shortcut): boolean => {
  const s = createShortcutWithDefaults(shortcut);

  if (
    s.altKey === event.altKey &&
    s.ctrlKey === event.ctrlKey &&
    s.metaKey === event.metaKey &&
    s.shiftKey === event.shiftKey &&
    s.key === event.key.toLocaleLowerCase()
  ) {
    return s.selector ? !!event.target && (event.target as Element).matches(s.selector) : true;
  }

  return false;
};

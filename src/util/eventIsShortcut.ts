import type { Shortcut } from '../models/shortcut';

export const eventIsShortcut = (event: KeyboardEvent, shortcut: Shortcut): boolean => {
  if (
    shortcut.altKey === event.altKey &&
    shortcut.ctrlKey === event.ctrlKey &&
    shortcut.metaKey === event.metaKey &&
    shortcut.shiftKey === event.shiftKey &&
    shortcut.key === event.key.toLocaleLowerCase()
  ) {
    return shortcut.selector && event.target ? (event.target as Element).matches(shortcut.selector) : true;
  }

  return false;
};

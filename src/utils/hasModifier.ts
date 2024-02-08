import type { Shortcut } from '@models/shortcut.js';

export const hasModifier = (event?: KeyboardEvent | Shortcut): boolean => {
  return event !== undefined && (!!event.altKey || !!event.ctrlKey || !!event.metaKey || !!event.shiftKey);
};

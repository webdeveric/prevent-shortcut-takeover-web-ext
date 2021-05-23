import type { Shortcut } from '../models/shortcut';

export const shortcutsEqual = (left: Shortcut, right: Shortcut): boolean =>
  left.altKey === right.altKey &&
  left.ctrlKey === right.ctrlKey &&
  left.metaKey === right.metaKey &&
  left.shiftKey === right.shiftKey &&
  left.key === right.key &&
  left.selector === right.selector;

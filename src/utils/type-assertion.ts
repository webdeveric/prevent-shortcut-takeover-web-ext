import type { Shortcut } from '@models/shortcut.js';

import { isShortcut, isShortcutArray } from './type-predicate.js';

export function assertIsShortcut(input: unknown, message = 'input is not a Shortcut'): asserts input is Shortcut {
  if (!isShortcut(input)) {
    throw new TypeError(message);
  }
}

export function assertIsShortcutArray(
  input: unknown,
  message = 'input is not a Shortcut array',
): asserts input is Shortcut[] {
  if (!isShortcutArray(input)) {
    throw new TypeError(message);
  }
}

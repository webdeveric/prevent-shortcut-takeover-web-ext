import { isShortcut, isShortcutArray } from './type-predicate';

import type { Shortcut } from '../models/shortcut';

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

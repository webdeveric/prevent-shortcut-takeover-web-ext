import { assertIsString } from '@webdeveric/utils/assertion/assertIsString';

import { isFunctionKey } from '@utils/type-predicate.js';
import type { Shortcut } from '@models/shortcut.js';

export const parseShortcut = (input: string): Shortcut | undefined => {
  const formatted = input.trim();

  if (!formatted) {
    return;
  }

  const [shortcutString = '', selectorString = ''] = formatted.split(' on ');

  const shortcutParts = shortcutString
    .trim()
    .split(' + ')
    .map((item) => item.trim());

  // Key is the last part and the rest are modifiers.
  const key = shortcutParts.pop();

  assertIsString(key, 'Invalid shortcut: key is required and must be a string');

  const shortcut: Shortcut = { key };

  // Loop over remaining parts to identify modifiers.
  // The modifiers can be in any order.
  for (const part of shortcutParts) {
    switch (part.toLowerCase()) {
      case 'ctrl':
        shortcut.ctrlKey = true;
        break;
      case 'alt':
        shortcut.altKey = true;
        break;
      case 'shift':
        shortcut.shiftKey = true;
        break;
      case 'meta':
        shortcut.metaKey = true;
        break;
    }
  }

  const selector = selectorString.trim();

  if (selector) {
    shortcut.selector = selector;
  }

  // Function keys are stored lowercased
  if (isFunctionKey(shortcut.key)) {
    shortcut.key = shortcut.key.toLowerCase();
  }

  return shortcut;
};

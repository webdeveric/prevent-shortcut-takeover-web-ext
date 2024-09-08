import { capitalize } from '@webdeveric/utils/capitalize';

import type { Shortcut } from '@models/shortcut.js';

export const formatShortcut = (shortcut?: Shortcut): string => {
  if (!shortcut) {
    return '';
  }

  const { key, selector, ...modifiers } = shortcut;

  const mod = Object.entries(modifiers)
    .filter(([, value]) => value)
    .map(([modifierKey]) => capitalize(modifierKey.replace(/Key$/, '')))
    .join(' + ');

  return `${mod ? `${mod} + ` : ''}${key}${selector ? ` on ${selector}` : ''}`;
};

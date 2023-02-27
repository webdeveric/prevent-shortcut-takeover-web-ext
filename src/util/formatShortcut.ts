import { capitalize } from '@webdeveric/utils/capitalize';

import type { Shortcut } from '../models';

export const formatShortcut = (shortcut?: Shortcut): string => {
  if (!shortcut) {
    return '';
  }

  const { key, selector, ...modifiers } = shortcut;

  const mod = Object.entries(modifiers)
    .filter(([, value]) => value)
    .map(([key]) => capitalize(key.replace(/Key$/, '')))
    .join(' + ');

  return `${mod ? `${mod} + ` : ''}${key}${selector ? ` on ${selector}` : ''}`;
};

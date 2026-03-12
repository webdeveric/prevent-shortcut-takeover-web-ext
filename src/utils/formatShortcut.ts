import { capitalize } from '@webdeveric/utils/capitalize';

import type { Shortcut } from '@models/shortcut.js';

import { isFunctionKey } from '../constants.js';

export const formatShortcut = (shortcut?: Shortcut): string => {
  if (!shortcut) {
    return '';
  }

  const { key, selector, ...modifiers } = shortcut;

  const mod = Object.entries(modifiers)
    .filter(([, value]) => value)
    .map(([modifierKey]) => capitalize(modifierKey.replace(/Key$/, '')))
    .join(' + ');

  // Function keys are stored lowercased (e.g. "f1") by getShortcutFromEvent,
  // but should display in their conventional uppercase form (e.g. "F1").
  const displayKey = isFunctionKey(key) ? key.toUpperCase() : key;

  return `${mod ? `${mod} + ` : ''}${displayKey}${selector ? ` on ${selector}` : ''}`;
};

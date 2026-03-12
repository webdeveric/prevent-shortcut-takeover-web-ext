import { describe, expect, it } from 'vitest';

import { createShortcutWithDefaults } from './createShortcutWithDefaults.js';
import { formatShortcut } from './formatShortcut.js';

describe('formatShortcut', () => {
  it('returns empty string when shortcut is undefined', () => {
    expect(formatShortcut()).toEqual('');
  });

  it('returns string containing the key', () => {
    expect(formatShortcut(createShortcutWithDefaults({ key: 'k' }))).toEqual('k');
  });

  it('returns string containing the modifiers + key', () => {
    expect(formatShortcut(createShortcutWithDefaults({ altKey: true, key: 'k' }))).toEqual('Alt + k');
    expect(formatShortcut(createShortcutWithDefaults({ altKey: true, ctrlKey: true, key: 'k' }))).toEqual(
      'Alt + Ctrl + k',
    );
  });

  it('returns string containing the modifiers + key + selector', () => {
    expect(formatShortcut(createShortcutWithDefaults({ ctrlKey: true, key: 'k', selector: 'body' }))).toEqual(
      'Ctrl + k on body',
    );
  });

  it('displays function keys in uppercase', () => {
    expect(formatShortcut(createShortcutWithDefaults({ key: 'f1' }))).toEqual('F1');
    expect(formatShortcut(createShortcutWithDefaults({ key: 'f12' }))).toEqual('F12');
  });

  it('displays function keys with modifiers in uppercase', () => {
    expect(formatShortcut(createShortcutWithDefaults({ ctrlKey: true, key: 'f5' }))).toEqual('Ctrl + F5');
  });
});

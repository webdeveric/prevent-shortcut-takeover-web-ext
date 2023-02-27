import { describe, expect, it } from 'vitest';

import { createShortcutWithDefaults } from './createShortcutWithDefaults';
import { formatShortcut } from './formatShortcut';

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
});

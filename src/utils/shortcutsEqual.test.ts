import { describe, expect, it } from 'vitest';

import { createShortcutWithDefaults } from './createShortcutWithDefaults.js';
import { shortcutsEqual } from './shortcutsEqual.js';

describe('shortcutsEqual', () => {
  it('returns false', () => {
    const s1 = createShortcutWithDefaults({ ctrlKey: true, key: 'k' });
    const s2 = createShortcutWithDefaults({ ctrlKey: true, key: 'l' });

    expect(shortcutsEqual(s1, s2)).toBe(false);
  });

  it('returns true', () => {
    const s1 = createShortcutWithDefaults({ ctrlKey: true, key: 'k', selector: 'body' });
    const s2 = createShortcutWithDefaults({ ctrlKey: true, key: 'k', selector: 'body' });

    expect(shortcutsEqual(s1, s2)).toBe(true);
  });
});

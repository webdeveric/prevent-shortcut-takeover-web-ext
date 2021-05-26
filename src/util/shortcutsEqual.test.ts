import { createShortcutWithDefaults } from './createShortcutWithDefaults';
import { shortcutsEqual } from './shortcutsEqual';

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

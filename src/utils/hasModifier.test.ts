import { describe, expect, it } from 'vitest';

import { createShortcutWithDefaults } from './createShortcutWithDefaults.js';
import { hasModifier } from './hasModifier.js';

describe('hasModifier', () => {
  it('returns false when parameter is undefined', () => {
    expect(hasModifier()).toBe(false);
  });

  it('returns true when an event contains a modifier key', () => {
    expect(hasModifier(createShortcutWithDefaults({ key: 'k', altKey: true }))).toBe(true);
    expect(hasModifier(createShortcutWithDefaults({ key: 'k', ctrlKey: true }))).toBe(true);
    expect(hasModifier(createShortcutWithDefaults({ key: 'k', metaKey: true }))).toBe(true);
    expect(hasModifier(createShortcutWithDefaults({ key: 'k', shiftKey: true }))).toBe(true);
  });
});

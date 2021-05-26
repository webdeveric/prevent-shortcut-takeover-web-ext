import { createShortcutWithDefaults } from './createShortcutWithDefaults';
import { hasModifier } from './hasModifier';

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

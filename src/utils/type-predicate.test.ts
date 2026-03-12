import { describe, expect, it } from 'vitest';

import { isShortcut, isShortcutArray } from './type-predicate.js';

describe('isShortcut', () => {
  it('returns true for a shortcut with a modifier key', () => {
    expect(isShortcut({ key: 'k', ctrlKey: true })).toBe(true);
    expect(isShortcut({ key: 'l', metaKey: true })).toBe(true);
    expect(isShortcut({ key: 'a', altKey: true, shiftKey: false })).toBe(true);
  });

  it('returns false for a shortcut without a modifier key or function key', () => {
    expect(isShortcut({ key: 'k' })).toBe(false);
    expect(isShortcut({ key: 'a' })).toBe(false);
  });

  it('returns true for a bare function key (F1-F12)', () => {
    expect(isShortcut({ key: 'f1' })).toBe(true);
    expect(isShortcut({ key: 'f12' })).toBe(true);
    expect(isShortcut({ key: 'F1' })).toBe(true);
    expect(isShortcut({ key: 'F12' })).toBe(true);
  });

  it('returns true for a function key with modifiers', () => {
    expect(isShortcut({ key: 'f1', ctrlKey: true })).toBe(true);
    expect(isShortcut({ key: 'f5', altKey: true, shiftKey: false })).toBe(true);
  });

  it('returns false for invalid function key values', () => {
    expect(isShortcut({ key: 'f0' })).toBe(false);
    expect(isShortcut({ key: 'f13' })).toBe(false);
    expect(isShortcut({ key: 'f123' })).toBe(false);
  });

  it('returns false for non-shortcut values', () => {
    expect(isShortcut(null)).toBe(false);
    expect(isShortcut(undefined)).toBe(false);
    expect(isShortcut('string')).toBe(false);
    expect(isShortcut(42)).toBe(false);
    expect(isShortcut({})).toBe(false);
    expect(isShortcut({ key: 123 })).toBe(false);
  });
});

describe('isShortcutArray', () => {
  it('returns true for an array of valid shortcuts', () => {
    expect(isShortcutArray([{ key: 'k', ctrlKey: true }, { key: 'f1' }])).toBe(true);
  });

  it('returns false if any item is invalid', () => {
    expect(isShortcutArray([{ key: 'k', ctrlKey: true }, { key: 'a' }])).toBe(false);
  });

  it('returns true for an empty array', () => {
    expect(isShortcutArray([])).toBe(true);
  });
});

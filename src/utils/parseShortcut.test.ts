import { describe, expect, it } from 'vitest';

import { formatShortcut } from '@utils/formatShortcut.js';
import { shortcutsEqual } from '@utils/shortcutsEqual.js';
import type { Shortcut } from '@models/shortcut.js';

import { parseShortcut } from './parseShortcut.js';

describe('parseShortcut', () => {
  it('returns undefined for empty string', () => {
    expect(parseShortcut('')).toBeUndefined();
    expect(parseShortcut('   ')).toBeUndefined();
  });

  it('parses a simple key', () => {
    expect(parseShortcut('A')).toEqual({ key: 'A' });
    expect(parseShortcut('Enter')).toEqual({ key: 'Enter' });
  });

  it('parses a function key', () => {
    expect(parseShortcut('F1')).toEqual({ key: 'f1' });
    expect(parseShortcut('F12')).toEqual({ key: 'f12' });
  });

  it('parses a key with single modifier', () => {
    expect(parseShortcut('Ctrl + A')).toEqual({ key: 'A', ctrlKey: true });
    expect(parseShortcut('Alt + B')).toEqual({ key: 'B', altKey: true });
    expect(parseShortcut('Shift + C')).toEqual({ key: 'C', shiftKey: true });
    expect(parseShortcut('Meta + D')).toEqual({ key: 'D', metaKey: true });
  });

  it('parses a key with multiple modifiers', () => {
    expect(parseShortcut('Ctrl + Alt + A')).toEqual({ key: 'A', ctrlKey: true, altKey: true });
    expect(parseShortcut('Ctrl + Shift + Alt + Meta + F1')).toEqual({
      key: 'f1',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    });
  });

  it('parses with selector', () => {
    expect(parseShortcut('Ctrl + A on .selector')).toEqual({ key: 'A', ctrlKey: true, selector: '.selector' });
    expect(parseShortcut('F1 on #id')).toEqual({ key: 'f1', selector: '#id' });
  });

  it('handles case insensitive modifiers', () => {
    expect(parseShortcut('CTRL + a')).toEqual({ key: 'a', ctrlKey: true });
    expect(parseShortcut('ctrl + alt + SHIFT + Enter')).toEqual({
      key: 'Enter',
      ctrlKey: true,
      altKey: true,
      shiftKey: true,
    });
  });

  it('handles extra spaces', () => {
    expect(parseShortcut('  Ctrl   +   A  ')).toEqual({ key: 'A', ctrlKey: true });
    expect(parseShortcut('Ctrl + A   on   .selector   ')).toEqual({ key: 'A', ctrlKey: true, selector: '.selector' });
  });

  it('formats back to the same string', () => {
    const shortcut: Shortcut = { key: 'k', ctrlKey: true, selector: 'body' };

    const otherShortcut = parseShortcut(formatShortcut(shortcut));

    expect(shortcutsEqual(shortcut, otherShortcut!)).toBeTruthy();
  });
});

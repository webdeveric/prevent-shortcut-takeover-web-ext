import { beforeEach, describe, expect, it } from 'vitest';

import type { Shortcut } from '@models/shortcut.js';

import { eventIsShortcut } from './eventIsShortcut.js';

describe('eventIsShortcut', () => {
  let shortcut: Shortcut;

  beforeEach(() => {
    shortcut = {
      ctrlKey: true,
      key: 'k',
    };
  });

  it('returns true', () => {
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'k',
    });

    expect(eventIsShortcut(event, shortcut)).toBe(true);
  });

  it('returns false', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'l',
    });

    expect(eventIsShortcut(event, shortcut)).toBe(false);
  });

  it('matches a bare function key shortcut', () => {
    const f1Shortcut: Shortcut = { key: 'f1' };

    const matchingEvent = new KeyboardEvent('keydown', { key: 'F1' });

    expect(eventIsShortcut(matchingEvent, f1Shortcut)).toBe(true);

    const nonMatchingEvent = new KeyboardEvent('keydown', { key: 'F2' });

    expect(eventIsShortcut(nonMatchingEvent, f1Shortcut)).toBe(false);

    const withModifierEvent = new KeyboardEvent('keydown', { key: 'F1', ctrlKey: true });

    expect(eventIsShortcut(withModifierEvent, f1Shortcut)).toBe(false);
  });

  it('checks selector', () => {
    const event = {
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
      key: 'k',
      target: document.createElement('body'),
    };

    shortcut.selector = 'body';

    expect(eventIsShortcut(event as unknown as KeyboardEvent, shortcut)).toBe(true);

    shortcut.selector = '#some-id';

    expect(eventIsShortcut(event as unknown as KeyboardEvent, shortcut)).toBe(false);
  });
});

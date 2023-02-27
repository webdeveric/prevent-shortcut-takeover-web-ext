import { beforeEach, describe, expect, it } from 'vitest';

import { eventIsShortcut } from './eventIsShortcut';
import type { Shortcut } from '../models';

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

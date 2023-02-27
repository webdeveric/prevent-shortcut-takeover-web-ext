import { describe, expect, it } from 'vitest';

import { getShortcutFromEvent } from './getShortcutFromEvent';

describe('getShortcutFromEvent', () => {
  it('returns a Shortcut when given an Event', () => {
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'k',
    });

    const shortcut = getShortcutFromEvent(event);

    expect(shortcut).toMatchObject({
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
      key: 'k',
    });
  });
});

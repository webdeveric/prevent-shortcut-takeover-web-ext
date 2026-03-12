import { describe, expect, it } from 'vitest';

import { createShortcutWithDefaults } from './createShortcutWithDefaults.js';

describe('createShortcutWithDefaults', () => {
  it('returns a Shortcut with default properties', () => {
    const shortcut = createShortcutWithDefaults({ ctrlKey: true, key: 'k' });

    expect(shortcut).toMatchObject({
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
      selector: undefined,
      key: 'k',
    });
  });

  it('returns a Shortcut for a bare function key', () => {
    const shortcut = createShortcutWithDefaults({ key: 'f1' });

    expect(shortcut).toMatchObject({
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      selector: undefined,
      key: 'f1',
    });
  });
});

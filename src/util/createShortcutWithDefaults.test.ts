import { createShortcutWithDefaults } from './createShortcutWithDefaults';

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
});

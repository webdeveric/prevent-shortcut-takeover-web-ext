import { describe, expect, it } from 'vitest';

import { getUniqueShortcuts } from './getUniqueShortcuts';
import type { Shortcut } from '../models/shortcut';

describe('getUniqueShortcuts', () => {
  it('returns an array of unique Shortcut objects', () => {
    const shortcuts: Shortcut[] = [
      {
        ctrlKey: true,
        key: 'k',
      },
      {
        ctrlKey: true,
        key: 'k',
      },
    ];

    const uniqueShortcuts = getUniqueShortcuts(shortcuts);

    expect(uniqueShortcuts.length).toEqual(1);
  });
});

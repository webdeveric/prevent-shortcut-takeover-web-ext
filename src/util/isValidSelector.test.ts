import { describe, expect, it } from 'vitest';

import { isValidSelector } from './isValidSelector';

describe('isValidSelector', () => {
  it('returns true', () => {
    expect(isValidSelector()).toBe(true);
    expect(isValidSelector('body')).toBe(true);
  });

  it('returns false', () => {
    expect(isValidSelector('.0000')).toBe(false);
  });
});

import type { RequireAtLeastOne } from '../types';

export type MetaKeys = RequireAtLeastOne<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>>;

export type ShortcutKey = Pick<KeyboardEvent, 'key'>;

export type ShortcutSelector = {
  selector?: string;
};

export type Shortcut = MetaKeys & ShortcutKey & ShortcutSelector;

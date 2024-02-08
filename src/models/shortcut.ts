import type { RequireAtLeastOne } from '@webdeveric/utils/types/records';

export type MetaKeys = RequireAtLeastOne<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>>;

export type ShortcutKey = Pick<KeyboardEvent, 'key'>;

export type ShortcutSelector = {
  selector?: string;
};

export type Shortcut = MetaKeys & ShortcutKey & ShortcutSelector;

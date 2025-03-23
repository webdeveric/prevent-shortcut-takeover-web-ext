import type { RequireAtLeastOne } from '@webdeveric/utils/types/records';
import type { Pretty } from '@webdeveric/utils/types/utils';

export type MetaKeys = RequireAtLeastOne<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>>;

export type ShortcutKey = Pick<KeyboardEvent, 'key'>;

export type ShortcutSelector = {
  selector?: string;
};

export type Shortcut = Pretty<MetaKeys & ShortcutKey & ShortcutSelector>;

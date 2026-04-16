import type { Pretty, Writable } from '@webdeveric/utils/types/utils';

// Modifier keys are all optional (not RequireAtLeastOne) so that bare function keys
// like F1 can be represented as shortcuts without any modifier. The business rule
// "must have a modifier OR be a function key" is enforced at runtime by isShortcut
// in type-predicate.ts and at the UI level in ShortcutInput.tsx.
export type MetaKeys = Partial<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>>;

export type ShortcutKey = Pick<KeyboardEvent, 'key'>;

export type ShortcutSelector = {
  selector?: string;
};

export type Shortcut = Pretty<Writable<MetaKeys & ShortcutKey & ShortcutSelector>>;

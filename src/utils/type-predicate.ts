import { isBoolean } from '@webdeveric/utils/predicate/isBoolean';
import { isObject } from '@webdeveric/utils/predicate/isObject';
import { isOptionalBoolean } from '@webdeveric/utils/predicate/isOptionalBoolean';
import { isOptionalString } from '@webdeveric/utils/predicate/isOptionalString';
import { isString } from '@webdeveric/utils/predicate/isString';
import { everyItem } from '@webdeveric/utils/predicate-factory/everyItem';

import type { MetaKeys, Shortcut } from '@models/shortcut.js';

const metaKeys: (keyof MetaKeys)[] = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'];

export const isShortcut = (input: unknown): input is Shortcut => {
  return (
    isObject(input) &&
    isString(input.key) &&
    isOptionalString(input.selector) &&
    metaKeys.some(metaKey => isBoolean(input[metaKey])) &&
    metaKeys.every(metaKey => isOptionalBoolean(input[metaKey]))
  );
};

export const isShortcutArray = everyItem(isShortcut);

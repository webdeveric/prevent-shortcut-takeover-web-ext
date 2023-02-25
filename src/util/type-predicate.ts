import { isBoolean, isObject, isOptionalBoolean, isOptionalString, isString } from '@webdeveric/utils/type-predicate';

import { everyItem } from '@webdeveric/utils/type-predicate-factory';

import type { MetaKeys, Shortcut } from '../models/shortcut';

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

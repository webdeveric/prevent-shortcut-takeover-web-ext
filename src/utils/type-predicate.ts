import { allOf } from '@webdeveric/utils/predicate/factory/allOf';
import { anyOf } from '@webdeveric/utils/predicate/factory/anyOf';
import { everyItem } from '@webdeveric/utils/predicate/factory/everyItem';
import { shape } from '@webdeveric/utils/predicate/factory/shape';
import { isBoolean } from '@webdeveric/utils/predicate/isBoolean';
import { isOptionalBoolean } from '@webdeveric/utils/predicate/isOptionalBoolean';
import { isOptionalString } from '@webdeveric/utils/predicate/isOptionalString';
import { isString } from '@webdeveric/utils/predicate/isString';

import { isFunctionKey } from '../constants.js';

// Allows bare function keys (F1-F12) to pass validation without any modifier key.
// This is needed because isFunctionKey checks the stored key value, which is lowercased.
const hasFunctionKey = (value: unknown): value is { key: string } =>
  typeof value === 'object' &&
  value !== null &&
  'key' in value &&
  typeof value.key === 'string' &&
  isFunctionKey(value.key);

const hasModifierKey = anyOf(
  shape({ altKey: isBoolean }),
  shape({ ctrlKey: isBoolean }),
  shape({ metaKey: isBoolean }),
  shape({ shiftKey: isBoolean }),
);

// A valid shortcut must have either at least one modifier key (Ctrl, Alt, etc.)
// OR be a function key (F1-F12). This prevents bare letter keys like "a" from
// being registered as shortcuts, which would break typing on every website.
export const isShortcut = allOf(
  shape({
    key: isString,
    selector: isOptionalString,
    altKey: isOptionalBoolean,
    ctrlKey: isOptionalBoolean,
    metaKey: isOptionalBoolean,
    shiftKey: isOptionalBoolean,
  }),
  anyOf(hasModifierKey, hasFunctionKey),
);

export const isShortcutArray = everyItem(isShortcut);

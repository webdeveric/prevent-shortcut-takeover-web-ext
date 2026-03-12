import { allOf } from '@webdeveric/utils/predicate/factory/allOf';
import { anyOf } from '@webdeveric/utils/predicate/factory/anyOf';
import { everyItem } from '@webdeveric/utils/predicate/factory/everyItem';
import { shape } from '@webdeveric/utils/predicate/factory/shape';
import { isBoolean } from '@webdeveric/utils/predicate/isBoolean';
import { isOptionalBoolean } from '@webdeveric/utils/predicate/isOptionalBoolean';
import { isOptionalString } from '@webdeveric/utils/predicate/isOptionalString';
import { isString } from '@webdeveric/utils/predicate/isString';

// Matches F1-F12 (case-insensitive because keys are stored lowercased via getShortcutFromEvent,
// but arrive uppercase from KeyboardEvent.key in the browser).
const functionKeyPattern = /^F([1-9]|1[0-2])$/i;

export const isFunctionKey = (value: unknown): value is string =>
  typeof value === 'string' && functionKeyPattern.test(value);

// Allows bare function keys (F1-F12) to pass validation without any modifier key.
export const hasFunctionKey = shape({
  key: isFunctionKey,
});

export const hasModifierKey = anyOf(
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

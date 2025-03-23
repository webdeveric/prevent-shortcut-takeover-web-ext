import { allOf } from '@webdeveric/utils/predicate/factory/allOf';
import { anyOf } from '@webdeveric/utils/predicate/factory/anyOf';
import { everyItem } from '@webdeveric/utils/predicate/factory/everyItem';
import { shape } from '@webdeveric/utils/predicate/factory/shape';
import { isBoolean } from '@webdeveric/utils/predicate/isBoolean';
import { isOptionalBoolean } from '@webdeveric/utils/predicate/isOptionalBoolean';
import { isOptionalString } from '@webdeveric/utils/predicate/isOptionalString';
import { isString } from '@webdeveric/utils/predicate/isString';

export const isShortcut = allOf(
  shape({
    key: isString,
    selector: isOptionalString,
    altKey: isOptionalBoolean,
    ctrlKey: isOptionalBoolean,
    metaKey: isOptionalBoolean,
    shiftKey: isOptionalBoolean,
  }),
  anyOf(
    shape({ altKey: isBoolean }),
    shape({ ctrlKey: isBoolean }),
    shape({ metaKey: isBoolean }),
    shape({ shiftKey: isBoolean }),
  ),
);

export const isShortcutArray = everyItem(isShortcut);

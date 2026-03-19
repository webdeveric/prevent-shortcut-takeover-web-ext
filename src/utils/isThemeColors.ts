import { anyOf } from '@webdeveric/utils/predicate/factory/anyOf';
import { nullish } from '@webdeveric/utils/predicate/factory/nullish';
import { isObject } from '@webdeveric/utils/predicate/isObject';
import { isString } from '@webdeveric/utils/predicate/isString';

import { isRgbaTuple, isRgbTuple } from '@utils/isRgbTuple.js';
import type { ThemeColors } from '@src/types.js';

import type { TypePredicateFn } from '@webdeveric/utils/types/functions';

export const isThemeColor = anyOf(isString, isRgbTuple, isRgbaTuple);

export const isThemeColors: TypePredicateFn<ThemeColors> = (input: unknown): input is ThemeColors => {
  const valuePredicate = nullish(isThemeColor);

  return isObject(input)
    ? Reflect.ownKeys(input).every((key) => isString(key) && valuePredicate(Reflect.get(input, key)))
    : false;
};

import { range } from '@webdeveric/utils/predicate/factory/range';
import { tuple } from '@webdeveric/utils/predicate/factory/tuple';

const isRgbInt = range(0, 255);

export const isRgbTuple = tuple([isRgbInt, isRgbInt, isRgbInt]);

export const isRgbaTuple = tuple([isRgbInt, isRgbInt, isRgbInt, isRgbInt]);

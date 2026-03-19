import { shape } from '@webdeveric/utils/predicate/factory/shape';
import { isInteger } from '@webdeveric/utils/predicate/isInteger';
import { isOptionalString } from '@webdeveric/utils/predicate/isOptionalString';

import type { ActiveTabChanged } from '@src/types.js';

export const isActiveTabChanged = shape<ActiveTabChanged>({
  type: 'ACTIVE_TAB_CHANGED',
  payload: {
    tabId: isInteger,
    url: isOptionalString,
    favIconUrl: isOptionalString,
    title: isOptionalString,
  },
});

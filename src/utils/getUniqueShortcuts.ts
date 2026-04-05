import { unique } from '@webdeveric/utils/unique';

import type { Shortcut } from '@models/shortcut.js';

export const getUniqueShortcuts = (shortcuts: Shortcut[]): Shortcut[] => [
  ...unique(shortcuts, (shortcut) => JSON.stringify(shortcut, null, 0)),
];

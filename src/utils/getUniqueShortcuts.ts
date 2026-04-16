import { unique } from '@webdeveric/utils/unique';

import { formatShortcut } from '@utils/formatShortcut.js';
import type { Shortcut } from '@models/shortcut.js';

export const getUniqueShortcuts = (shortcuts: Shortcut[]): Shortcut[] => [
  ...unique(shortcuts, (shortcut) => formatShortcut(shortcut)),
];

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import type { Shortcut } from '../models/shortcut';

export const getShortcutFromEvent = (event: KeyboardEvent | ReactKeyboardEvent): Shortcut => ({
  altKey: event.altKey,
  ctrlKey: event.ctrlKey,
  metaKey: event.metaKey,
  shiftKey: event.shiftKey,
  key: event.key.toLocaleLowerCase(),
});

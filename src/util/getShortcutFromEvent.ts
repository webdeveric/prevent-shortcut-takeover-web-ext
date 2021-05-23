import type { KeyboardEvent } from 'react';

import { Shortcut } from '../models/shortcut';

export const getShortcutFromEvent = (event: KeyboardEvent): Shortcut => ({
  altKey: event.altKey,
  ctrlKey: event.ctrlKey,
  metaKey: event.metaKey,
  shiftKey: event.shiftKey,
  key: event.key.toLocaleLowerCase(),
});

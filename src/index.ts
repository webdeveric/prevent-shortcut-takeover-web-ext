import { eventIsShortcut } from './util';

import type { Shortcut } from './models';

// TODO get these from browser storage
const shortcuts: Shortcut[] = [
  {
    code: 'KeyK',
    modifier: ['Control', 'Meta'],
  },
  {
    code: 'KeyL',
    modifier: ['Control', 'Meta'],
  },
];

document.addEventListener(
  'keydown',
  event => {
    if (shortcuts.some(shortcut => eventIsShortcut(event, shortcut))) {
      event.stopPropagation();
    }
  },
  {
    capture: true,
    passive: true,
  },
);

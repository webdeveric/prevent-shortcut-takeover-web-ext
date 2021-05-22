'use strict';

const eventIsShortcut = (event, shortcut) => {
  const eventHasModifier = mod => event.getModifierState(mod);

  if (shortcut.code === event.code && shortcut.modifier.some( eventHasModifier ) ) {
    return (
      shortcut.selector
        ? event.originalTarget.matches(shortcut.selector)
        : true
    );
  }

  return false;
};

// TODO get these from browser storage
const shortcuts = [
  {
    code: 'KeyK',
    modifier: [ 'Control', 'Meta' ],
  },
  {
    code: 'KeyL',
    modifier: [ 'Control', 'Meta' ],
  },
];

const shouldStop = event => {
  return shortcuts.some( shortcut => eventIsShortcut(event, shortcut) );
};

document.addEventListener(
  'keydown',
  event => {
    if (shouldStop(event)) {
      event.stopPropagation();
    }
  },
  {
    capture: true,
    passive: true,
  },
);

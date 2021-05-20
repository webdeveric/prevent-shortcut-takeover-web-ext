'use strict';

document.addEventListener(
  'keydown',
  event => {
    if (
      event.code === 'KeyK' &&
      (event.getModifierState('Control') || event.getModifierState('Meta'))
    ) {
      event.stopPropagation();
    }
  },
  {
    capture: true,
    passive: true,
  },
);


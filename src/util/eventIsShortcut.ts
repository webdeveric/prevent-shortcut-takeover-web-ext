import { Modifier, Shortcut } from '../models/shortcut';

export const eventIsShortcut = (event: KeyboardEvent, shortcut: Shortcut): boolean => {
  const eventHasModifier = (mod: Modifier) => event.getModifierState(mod);

  if (shortcut.code === event.code && shortcut.modifier.some(eventHasModifier)) {
    return shortcut.selector && event.target ? (event.target as Element).matches(shortcut.selector) : true;
  }

  return false;
};

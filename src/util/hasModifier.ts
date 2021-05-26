import { Shortcut } from '../models';

export const hasModifier = (event?: KeyboardEvent | Shortcut): boolean => {
  return event !== undefined && (!!event.altKey || !!event.ctrlKey || !!event.metaKey || !!event.shiftKey);
};

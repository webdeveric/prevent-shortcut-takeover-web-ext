import {
  useCallback,
  type ChangeEventHandler,
  type FunctionComponent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import { metaKeyPattern, isFunctionKey } from '@src/constants.js';
import { getShortcutFromEvent } from '@utils/getShortcutFromEvent.js';
import { hasModifier } from '@utils/hasModifier.js';
import type { Shortcut } from '@models/shortcut.js';

export interface ShortcutInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setShortcut: (shortcut?: Shortcut) => void;
}

const doNothing: ChangeEventHandler<HTMLInputElement> = (event): void => event.preventDefault();

export const ShortcutInput: FunctionComponent<ShortcutInputProps> = ({
  setShortcut,
  ...inputProps
}: ShortcutInputProps) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const hasModifierKey = hasModifier(event);

      // Clear the shortcut if Backspace is pressed without any modifier keys
      if (!hasModifierKey && event.key === 'Backspace') {
        setShortcut(undefined);

        return;
      }

      // Only set the shortcut if a non-modifier key is pressed along with at least one modifier key,
      // or if a function key (F1-F12) is pressed (modifiers optional)
      if (!metaKeyPattern.test(event.key) && (hasModifierKey || isFunctionKey(event.key))) {
        setShortcut(getShortcutFromEvent(event));
      }

      if (event.key !== 'Tab' && event.key !== 'Enter') {
        event.preventDefault();
      }
    },
    [setShortcut],
  );

  return (
    <input
      type="text"
      {...inputProps}
      onKeyDownCapture={onKeyDown}
      onChange={doNothing}
      autoComplete="off"
      spellCheck="false"
    />
  );
};

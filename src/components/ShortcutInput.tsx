import {
  useCallback,
  type ChangeEventHandler,
  type FunctionComponent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import { metaKeyPattern } from '@src/constants.js';
import { getShortcutFromEvent } from '@utils/getShortcutFromEvent.js';
import { hasModifier } from '@utils/hasModifier.js';
import type { Shortcut } from '@models/shortcut.js';

export interface ShortcutInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setShortcut: (shortcut: Shortcut) => void;
}

const doNothing: ChangeEventHandler<HTMLInputElement> = (event): void => event.preventDefault();

export const ShortcutInput: FunctionComponent<ShortcutInputProps> = ({
  setShortcut,
  ...inputProps
}: ShortcutInputProps) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!metaKeyPattern.test(event.key) && hasModifier(event)) {
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

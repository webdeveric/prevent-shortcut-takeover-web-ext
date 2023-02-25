import React, { ChangeEventHandler, FunctionComponent, InputHTMLAttributes, KeyboardEvent, useCallback } from 'react';

import { getShortcutFromEvent, hasModifier } from '../util';
import { metaKeyPattern } from '../constants';
import type { Shortcut } from '../models';

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

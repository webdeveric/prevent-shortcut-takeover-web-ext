import React, { InputHTMLAttributes, KeyboardEvent, useCallback, VoidFunctionComponent } from 'react';

import { getShortcutFromEvent, hasModifier } from '../util';
import { metaKeyPattern } from '../constants';
import { Shortcut } from '../models';

export interface ShortcutInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setShortcut: (shortcut: Shortcut) => void;
}

export const ShortcutInput: VoidFunctionComponent<ShortcutInputProps> = ({
  setShortcut,
  value = '',
  ...inputProps
}) => {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' && event.key !== 'Enter') {
      event.preventDefault();
    }
  }, []);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    if (!metaKeyPattern.test(event.key) && hasModifier(event)) {
      setShortcut(getShortcutFromEvent(event));
    }
  }, []);

  return <input type="text" {...inputProps} onKeyDown={onKeyDown} onKeyUp={onKeyUp} defaultValue={value} />;
};

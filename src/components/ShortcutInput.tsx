import { useCallback, useState, type ChangeEventHandler, type FunctionComponent, type KeyboardEvent } from 'react';

import { Input, type InputProps } from '@components/Input.js';
import { metaKeyPattern } from '@src/constants.js';
import { formatShortcut } from '@utils/formatShortcut.js';
import { getShortcutFromEvent } from '@utils/getShortcutFromEvent.js';
import { hasModifier } from '@utils/hasModifier.js';
import { isFunctionKey } from '@utils/type-predicate.js';

export type ShortcutInputProps = Omit<
  InputProps,
  'value' | 'type' | 'onChange' | 'onKeyDown' | 'onKeyDownCapture' | 'children'
>;

const doNothing: ChangeEventHandler<HTMLInputElement> = (event): void => event.preventDefault();

export const ShortcutInput: FunctionComponent<ShortcutInputProps> = (props) => {
  const [value, setValue] = useState('');

  const onKeyDownCapture = useCallback((event: KeyboardEvent) => {
    const hasModifierKey = hasModifier(event);

    // Clear the shortcut if Backspace is pressed without any modifier keys
    if (!hasModifierKey && event.key === 'Backspace') {
      return setValue('');
    }

    // Only set the shortcut if a non-modifier key is pressed along with at least one modifier key,
    // or if a function key (F1-F12) is pressed (modifiers optional)
    if (!metaKeyPattern.test(event.key) && (hasModifierKey || isFunctionKey(event.key))) {
      setValue(formatShortcut(getShortcutFromEvent(event)));
    }

    if (!hasModifierKey && (event.key === 'Tab' || event.key === 'Enter')) {
      return;
    }

    event.preventDefault();
  }, []);

  return <Input type="text" onKeyDownCapture={onKeyDownCapture} onChange={doNothing} value={value} {...props} />;
};
